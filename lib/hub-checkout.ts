/**
 * Ponte do institucional com o CHECKOUT PÚBLICO do Hub (jurid-hub-api) — o
 * MESMO sistema da LP da VSL: Pix Automático (autorização + 1ª cobrança num QR
 * só), cartão tokenizado no gateway, e entrega por e-mail via webhook.
 *
 * Regras que o SERVIDOR mantém — e por isso não estão aqui:
 *  · o preço vem do catálogo do Hub pelo apelido (`plan`), nunca do cliente;
 *  · o PAN do cartão atravessa em direção ao gateway e nunca é persistido;
 *  · o acesso só é liberado quando o pagamento confirma (webhook);
 *  · o teste grátis é uma CORTESIA criada no Hub — a senha é gerada lá e
 *    entregue só por e-mail (por isso o formulário não tem campo de senha).
 */

const API = (
  process.env.NEXT_PUBLIC_HUB_CHECKOUT_API ?? "https://hub.juridia.com.br"
).replace(/\/$/, "");

/** Apelidos públicos (`Price.metadata.checkoutCode`) das ofertas do institucional. */
export const HUB_PLAN_CODES = {
  individual: "inst-individual",
  escritorio: "inst-escritorio",
  trial: "inst-trial",
  /** Oferta de TESTE (R$ 6) — só aparece em /plans?plano=<este código>. */
  teste: "t6pix-9f4k2q81x",
} as const;

/**
 * O institucional NÃO tem checkout próprio: quem compra é levado ao checkout
 * da VSL (o mesmo motor, a mesma tela) já com o plano selecionado.
 * `voltar=planos` acende lá o botão "Voltar aos planos" → /plans daqui.
 */
const VSL_CHECKOUT_URL = (
  process.env.NEXT_PUBLIC_VSL_CHECKOUT_URL ?? "https://vsl.juridia.com.br/checkout"
).replace(/\/$/, "");

export function vslCheckoutHref(planCode: string): string {
  return `${VSL_CHECKOUT_URL}?plano=${encodeURIComponent(planCode)}&voltar=planos`;
}

export type HubCheckoutResult = {
  checkoutId: string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELED";
  amountCents: number;
  pix?: { copiaECola: string; qrBase64?: string; expiraEmSegundos: number };
  invoiceUrl?: string;
};

export type HubCheckoutPayload = {
  plan: string;
  method: "pix" | "card";
  name: string;
  email: string;
  doc: string;
  phone: string;
  card?: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
    postalCode: string;
    addressNumber: string;
  };
  attribution?: Record<string, string>;
};

async function erroDoCorpo(res: Response): Promise<never> {
  const body = (await res.json().catch(() => null)) as
    | { message?: string | string[] }
    | null;
  const msg = Array.isArray(body?.message) ? body?.message[0] : body?.message;
  throw new Error(msg ?? "Não foi possível concluir. Tente novamente.");
}

export async function submitHubCheckout(
  payload: HubCheckoutPayload,
): Promise<HubCheckoutResult> {
  const res = await fetch(`${API}/public/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return erroDoCorpo(res);
  return res.json();
}

/** Polling do pagamento — `null` = "ainda não sei" (rede/5xx), nunca "falhou". */
export async function hubCheckoutStatus(
  checkoutId: string,
): Promise<HubCheckoutResult | null> {
  try {
    const res = await fetch(`${API}/public/checkout/${checkoutId}`);
    if (!res.ok) return null;
    return (await res.json()) as HubCheckoutResult;
  } catch {
    return null;
  }
}

/**
 * Teste grátis: cortesia criada no Hub, ativa na hora, senha por e-mail.
 * O servidor recusa e-mail que já tem conta (um teste por pessoa).
 */
export async function submitHubTrial(payload: {
  name: string;
  email: string;
  doc: string;
  phone: string;
  attribution?: Record<string, string>;
}): Promise<{ status: "ACTIVE"; email: string; trialDays: number }> {
  const res = await fetch(`${API}/public/checkout/trial`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan: HUB_PLAN_CODES.trial, ...payload }),
  });
  if (!res.ok) return erroDoCorpo(res);
  return res.json();
}

/**
 * A oferta existe/está ativa no Hub? `false` só com 404 confirmado — na
 * dúvida (rede, 5xx) deixa seguir e o submit dá a resposta final.
 */
export async function hubOfferDisponivel(plan: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${API}/public/checkout/offer?plan=${encodeURIComponent(plan)}`,
    );
    return res.status === 404 ? false : true;
  } catch {
    return true;
  }
}
