/**
 * Porta de saída do checkout.
 *
 * Fala com `POST {VITE_CHECKOUT_API}/public/checkout` — o módulo público do
 * `jurid-hub-api`. Sem a variável definida, cai no MODO VITRINE: a página
 * inteira funciona sem gateway nenhum atrás (útil para mexer no layout).
 *
 * Regras que o servidor mantém — e por isso NÃO estão aqui:
 *  · o preço vem do catálogo do Hub pelo apelido da oferta (`plan`), nunca do
 *    cliente — o `priceCents` daqui é só vitrine;
 *  · o PAN do cartão atravessa em direção ao gateway e nunca é persistido;
 *  · a `Idempotency-Key` impede que duplo clique vire duas cobranças;
 *  · o acesso só é liberado quando o pagamento confirma (webhook), nunca pelo
 *    retorno síncrono.
 */

import { offer } from "./offer.config";

export type CheckoutPayload = {
  method: "card" | "pix";
  email: string;
  name: string;
  doc: string;
  phone: string;
  coupon: string | null;
  installments: number;
  card: {
    number: string;
    holder: string;
    expiry: string;
    cvv: string;
    cep: string;
    addrNumber: string;
  } | null;
};

export type CheckoutResult = {
  checkoutId: string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELED";
  /** Preenchido só no Pix. */
  pix?: { copiaECola: string; qrBase64?: string; expiraEmSegundos: number };
  /** Fatura do gateway — saída quando o cartão cai em pendência. */
  invoiceUrl?: string;
  /**
   * Resultado FABRICADO pelo modo vitrine, sem gateway nenhum por trás.
   *
   * Existe para o tracking saber que não pode contar isto como venda: o modo
   * vitrine devolve "PAID" no cartão, e sem esta marca todo teste de formulário
   * viraria um Purchase com valor no Gerenciador da Meta — receita que não
   * existiu, ensinando a campanha a buscar mais gente como quem só testou.
   */
  demo?: boolean;
};

// No institucional (Next) a env é NEXT_PUBLIC_*; sem ela vale o Hub de produção.
const API = (
  process.env.NEXT_PUBLIC_HUB_CHECKOUT_API ?? "https://hub.juridia.com.br"
).replace(/\/$/, "");

/** Chave por tentativa — o servidor usa para deduplicar retry e F5. */
function idempotencyKey(): string {
  return crypto.randomUUID();
}

/** "12/29" → { mes: "12", ano: "2029" } — o formato que o gateway aceita. */
function validade(expiry: string): { mes: string; ano: string } {
  const [mes = "", ano = ""] = expiry.split("/").map((p) => p.trim());
  return { mes: mes.padStart(2, "0"), ano: ano.length === 2 ? `20${ano}` : ano };
}

/**
 * Atribuição da venda: o que a LP já sabe sobre de onde a pessoa veio. Vai
 * junto da cobrança para que "quem trouxe" continue respondível DEPOIS do
 * pagamento — sem isso, a venda chega ao Hub sem origem e o funil pago perde
 * o elo final.
 */
function atribuicao(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const chave of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const valor = params.get(chave);
    if (valor) utm[chave] = valor.slice(0, 120);
  }
  const plano = params.get("plano");
  if (plano) utm.plano = plano.slice(0, 40);
  return utm;
}

async function erroDoCorpo(res: Response): Promise<never> {
  // A mensagem do Hub tem que chegar inteira ao usuário: recusa de cartão
  // sem motivo é conversão perdida na hora.
  const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
  const msg = Array.isArray(body?.message) ? body?.message[0] : body?.message;
  throw new Error(msg ?? "Não foi possível concluir o pagamento. Tente novamente.");
}

export async function submitCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
  if (!API) {
    // Modo vitrine: valida a UI ponta a ponta sem gateway.
    await new Promise((r) => setTimeout(r, 1200));
    return {
      demo: true,
      checkoutId: "demo-" + idempotencyKey().slice(0, 8),
      status: payload.method === "card" ? "PAID" : "PENDING",
      pix:
        payload.method === "pix"
          ? {
              copiaECola:
                "00020126580014BR.GOV.BCB.PIX0136juridia-demo-copia-e-cola-nao-pagavel5204000053039865802BR5913JURIDIA TECNO6009SAO PAULO62070503***6304DEMO",
              expiraEmSegundos: offer.pixExpiresMinutes * 60,
            }
          : undefined,
    };
  }

  const { mes, ano } = validade(payload.card?.expiry ?? "");
  const res = await fetch(`${API}/public/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey(),
    },
    body: JSON.stringify({
      plan: offer.checkoutCode,
      method: payload.method,
      name: payload.name,
      email: payload.email,
      doc: payload.doc,
      phone: payload.phone,
      installments: payload.method === "card" ? payload.installments : undefined,
      card: payload.card
        ? {
            holderName: payload.card.holder,
            number: payload.card.number.replace(/\D/g, ""),
            expiryMonth: mes,
            expiryYear: ano,
            ccv: payload.card.cvv,
            postalCode: payload.card.cep.replace(/\D/g, ""),
            addressNumber: payload.card.addrNumber,
          }
        : undefined,
      attribution: atribuicao(),
    }),
  });

  if (!res.ok) return erroDoCorpo(res);
  return res.json();
}

/**
 * A oferta escolhida EXISTE no Hub agora?
 *
 * Guarda de entrada do checkout: a oferta de exceção (`?plano=…`) vive de um
 * preço que a gente ativa e desativa no catálogo do Hub. Sem esta checagem,
 * um link antigo de plano desativado deixava a pessoa preencher o formulário
 * inteiro para só então levar "Plano não encontrado" no submit.
 *
 * Devolve `false` SOMENTE quando o Hub respondeu e disse que o plano não está
 * à venda (404). Vitrine sem API, erro de rede ou 5xx devolvem `true`: na
 * dúvida o checkout segue — recusar quem talvez pudesse comprar é pior do que
 * deixar o submit dar a resposta final.
 */
export async function offerDisponivel(): Promise<boolean> {
  if (!API) return true;
  try {
    const res = await fetch(`${API}/public/checkout/offer?plan=${encodeURIComponent(offer.checkoutCode)}`);
    return res.status === 404 ? false : true;
  } catch {
    return true;
  }
}

/**
 * Polling do Pix. Devolve `null` quando não há como consultar (modo vitrine ou
 * erro de rede) — quem chama trata como "ainda não sei", nunca como "falhou":
 * dizer "não pago" por causa de um 502 seria assustar quem acabou de pagar.
 */
export async function checkoutStatus(checkoutId: string): Promise<CheckoutResult | null> {
  if (!API || checkoutId.startsWith("demo-")) return null;
  try {
    const res = await fetch(`${API}/public/checkout/${checkoutId}`);
    if (!res.ok) return null;
    return (await res.json()) as CheckoutResult;
  } catch {
    return null;
  }
}
