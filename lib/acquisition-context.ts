/**
 * Contexto de aquisição que acompanha o cadastro do teste grátis até o Hub.
 *
 * O snippet j.js do Hub (app/layout.tsx) já guarda no browser quem é o
 * visitante (`jlp_vid`, localStorage), a sessão (`jlp_sid`), a campanha do
 * PRIMEIRO contato (`jlp_ctx`: referrer, UTMs, fbclid/gclid) e o ÚLTIMO botão
 * clicado (`jlp_ultimo_cta`, tudo em sessionStorage). Este módulo só lê esse
 * bastão e o coloca no payload do cadastro — é o que permite, no Hub, ligar a
 * conta criada ao CTA, à campanha e à sessão que a geraram (plano de
 * 08/09/2026, "Origem de cada usuário").
 *
 * Regras:
 *  · nunca lança: analytics bloqueado ou storage indisponível viram campos
 *    ausentes e `atribuicao: "incompleta"` — o cadastro segue igual;
 *  · nenhum dado pessoal: só identificadores opacos, rótulos e UTMs;
 *  · chaves em snake_case onde o Hub já as interpreta (`origemDoCheckout` lê
 *    utm_*, fbclid, gclid e landing_page_code para as colunas `origin*` da
 *    conta); o restante viaja no metadata da assinatura.
 */

/** Mesmo código do `data-lp` do snippet: é a LP "institucional" no Hub. */
export const SITE_CODE = "institucional";

export type AcquisitionContext = Record<string, string>;

/** Mesmo teto do snippet — atribuição é rótulo, não texto livre. */
const MAX = 160;

function lerStorage(
  store: () => Storage,
  chave: string,
): { ok: boolean; valor: string | null } {
  try {
    return { ok: true, valor: store().getItem(chave) };
  } catch {
    return { ok: false, valor: null };
  }
}

function texto(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const limpo = valor.trim();
  return limpo ? limpo.slice(0, MAX) : null;
}

/** Último CTA (`data-lp-cta`) clicado nesta aba, segundo o snippet. */
export function ultimoCta(): string | null {
  return texto(lerStorage(() => sessionStorage, "jlp_ultimo_cta").valor);
}

type ContextoDoSnippet = {
  ref?: unknown;
  utm?: Record<string, unknown>;
  fbclid?: unknown;
  gclid?: unknown;
};

const UTM_CHAVES = ["source", "medium", "campaign", "content", "term"] as const;

export function contextoDeAquisicao(input: {
  /** Nome estável do formulário — dois CTAs podem levar ao mesmo formulário. */
  formulario: string;
  /**
   * CTA que levou a pessoa ao formulário (snapshot no primeiro foco, antes de
   * os botões internos do próprio formulário sobrescreverem o último CTA).
   * `null` = chegou sem clicar em nenhum (rolou a página).
   */
  ctaEntrada: string | null;
}): AcquisitionContext {
  const out: AcquisitionContext = {
    site: SITE_CODE,
    landing_page_code: SITE_CODE,
    formulario: input.formulario,
    cta_entrada: input.ctaEntrada ?? "nenhum",
  };
  if (typeof window === "undefined") return out;

  const vid = lerStorage(() => localStorage, "jlp_vid");
  const sid = lerStorage(() => sessionStorage, "jlp_sid");
  const ctxBruto = lerStorage(() => sessionStorage, "jlp_ctx");
  const storageOk = vid.ok && sid.ok && ctxBruto.ok;
  const snippetAtivo = typeof window.jlp === "function";

  const visitor = texto(vid.valor);
  if (visitor) out.visitor_id = visitor;
  const sessao = texto(sid.valor);
  if (sessao) out.session_key = sessao;

  try {
    out.pagina = location.pathname.slice(0, MAX);
  } catch {}

  // Primeiro contato: o contexto que o snippet guardou na chegada. Sem ele
  // (snippet bloqueado), a URL atual é o que se sabe — pode ser menos do que a
  // campanha original, e por isso a atribuição é marcada como incompleta.
  let ctx: ContextoDoSnippet | null = null;
  try {
    ctx = ctxBruto.valor ? (JSON.parse(ctxBruto.valor) as ContextoDoSnippet) : null;
  } catch {
    ctx = null;
  }
  let params: URLSearchParams | null = null;
  try {
    params = new URLSearchParams(location.search);
  } catch {}

  for (const chave of UTM_CHAVES) {
    const valor = texto(ctx?.utm?.[chave]) ?? texto(params?.get(`utm_${chave}`));
    if (valor) out[`utm_${chave}`] = valor;
  }
  const fbclid = texto(ctx?.fbclid) ?? texto(params?.get("fbclid"));
  if (fbclid) out.fbclid = fbclid;
  const gclid = texto(ctx?.gclid) ?? texto(params?.get("gclid"));
  if (gclid) out.gclid = gclid;

  let referrer = texto(ctx?.ref);
  if (!referrer) {
    try {
      referrer = texto(document.referrer);
    } catch {}
  }
  if (referrer) out.referrer = referrer;

  out.snippet = snippetAtivo ? "ativo" : "ausente";
  out.atribuicao = storageOk && snippetAtivo && visitor && sessao ? "completa" : "incompleta";
  return out;
}
