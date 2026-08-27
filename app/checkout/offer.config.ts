/**
 * ============================================================
 *  CONTEÚDO DA PÁGINA /checkout — SITE INSTITUCIONAL
 * ------------------------------------------------------------
 *  Checkout PORTADO da LP da VSL (27/08/2026): mesma tela, mesmo
 *  motor (checkout público do Hub). O que muda é a vitrine: as
 *  ofertas daqui são as do institucional, escolhidas por `?plano=`.
 *
 *  ATENÇÃO: estes valores são só de EXIBIÇÃO — o preço cobrado vem
 *  do catálogo do Hub pelo apelido (`checkoutCode`), nunca do cliente.
 * ============================================================
 */

const PLANOS = {
  /** Sem `?plano=` (ou com apelido desconhecido) cai no Escritório — o mais vendido. */
  "inst-escritorio": { checkoutCode: "inst-escritorio", priceCents: 19990, maxInstallments: 1 },
  "inst-individual": { checkoutCode: "inst-individual", priceCents: 16990, maxInstallments: 1 },
  /**
   * OFERTA DE TESTE (R$ 6) — mesmo apelido obscuro da VSL. Só chega nela quem
   * sabe o código; e mesmo sabendo, é o preço ATIVO no catálogo do Hub que
   * decide se ela vende (inativo → 404 e a página volta à oferta padrão).
   */
  "t6pix-9f4k2q81x": { checkoutCode: "t6pix-9f4k2q81x", priceCents: 600, maxInstallments: 1 },
} as const;

export type PlanoId = keyof typeof PLANOS;

const PADRAO: PlanoId = "inst-escritorio";

/** Qual oferta esta visita está comprando. Padrão quando o apelido é desconhecido. */
export function planoAtual(): PlanoId {
  if (typeof window === "undefined") return PADRAO;
  const pedido = new URLSearchParams(window.location.search).get("plano");
  return pedido && pedido in PLANOS ? (pedido as PlanoId) : PADRAO;
}

const plano = PLANOS[planoAtual()];

/**
 * O caminho de volta do checkout: a página de planos do site (/contratar).
 * Mantém o nome `voltaExterna` da VSL para o CheckoutPage portado não
 * divergir — aqui o destino é interno e fixo, sem parâmetro de URL.
 */
export function voltaExterna(): { href: string; label: string } {
  return { href: "/contratar", label: "Voltar aos planos" };
}

export const offer = {
  productName: "JuridIA — Inteligência Artificial para Advogados",
  seller: "JURIDIA TECNOLOGIA",
  /** Apelido público da oferta — vai no corpo do POST /public/checkout. */
  checkoutCode: plano.checkoutCode,
  /** Valor em centavos: evita erro de ponto flutuante nas contas. */
  priceCents: plano.priceCents,
  maxInstallments: plano.maxInstallments,
  /** Juros ao mês a partir da 2ª parcela (só exibição; hoje é 1x). */
  monthlyInterest: 0.0199,
  /** Validade do código Pix, em minutos — o gateway manda o valor real. */
  pixExpiresMinutes: 60,
  guaranteeDays: 7,
  description:
    "Seu escritório com IA jurídica. Pare de perder horas redigindo peças, pesquisando jurisprudência e monitorando publicações: a JuridIA faz isso com você e multiplica a produtividade do escritório.",
  highlights: [
    "Peças e pareceres com fundamento citado",
    "Jurisprudência dos tribunais brasileiros",
    "Monitoramento de publicações e prazos",
  ],
  support: "https://wa.me/5541984080011?text=Preciso%20de%20ajuda%20no%20checkout",
  terms: "/institucional-2/termos",
  privacy: "/institucional-2/privacidade",
} as const;

/** Formata centavos no padrão brasileiro: 19700 → "R$ 197,00". */
export function brl(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export type Installment = { n: number; cents: number; totalCents: number };

/** Tabela de parcelas — 1x sempre à vista; demais só exibição com juros. */
export function installments(): Installment[] {
  const out: Installment[] = [{ n: 1, cents: offer.priceCents, totalCents: offer.priceCents }];
  for (let n = 2; n <= offer.maxInstallments; n++) {
    const i = offer.monthlyInterest;
    const total =
      Math.round((offer.priceCents * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1)) * n;
    out.push({ n, cents: Math.round(total / n), totalCents: total });
  }
  return out;
}
