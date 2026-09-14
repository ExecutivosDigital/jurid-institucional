/** Primeiro contato da aquisição, independente dos scripts de analytics.
 * Guarda apenas campos de campanha permitidos nesta aba. Não envia eventos.
 * O payload conserva o contrato de atribuição já interpretado pelo Hub.
 */
export const SITE_CODE = "institucional";
export const LANDING_PAGE_CODE = SITE_CODE;
export type AcquisitionContext = Record<string, string>;
const MAX = 160;
const UTM_CHAVES = ["source", "medium", "campaign", "content", "term"] as const;
const CONTEXTO_KEY = "juridia_acquisition_v1:" + SITE_CODE;
type PrimeiroContato = {
  ref?: string;
  utm: Partial<Record<(typeof UTM_CHAVES)[number], string>>;
  fbclid?: string;
  gclid?: string;
};
let primeiroContatoEmMemoria: PrimeiroContato | null = null;

function lerStorage(store: () => Storage, chave: string): { ok: boolean; valor: string | null } {
  try { return { ok: true, valor: store().getItem(chave) }; }
  catch { return { ok: false, valor: null }; }
}
function texto(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const limpo = valor.trim();
  return limpo ? limpo.slice(0, MAX) : null;
}
function registro(valor: unknown): Record<string, unknown> | null {
  return valor !== null && typeof valor === "object" && !Array.isArray(valor)
    ? valor as Record<string, unknown> : null;
}
/** Referrer sem parâmetros, fragmentos, credenciais nem caminhos. */
function origemDoReferenciador(valor: unknown): string | undefined {
  if (typeof valor !== "string") return undefined;
  try {
    const url = new URL(valor);
    return ["http:", "https:"].includes(url.protocol) ? url.origin.slice(0, MAX) : undefined;
  } catch { return undefined; }
}
function normalizarContexto(valor: unknown): PrimeiroContato | null {
  const contexto = registro(valor);
  if (!contexto) return null;
  const utm = registro(contexto.utm);
  const out: PrimeiroContato = { utm: {} };
  for (const chave of UTM_CHAVES) {
    const valor = texto(utm?.[chave]);
    if (valor) out.utm[chave] = valor;
  }
  const ref = origemDoReferenciador(contexto.ref);
  if (ref) out.ref = ref;
  for (const chave of ["fbclid", "gclid"] as const) {
    const valor = texto(contexto[chave]);
    if (valor) out[chave] = valor;
  }
  return out;
}
function lerContexto(chave: string, exigirVersao = false): PrimeiroContato | null {
  try {
    const raw = lerStorage(() => sessionStorage, chave).valor;
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (exigirVersao && registro(parsed)?.version !== 1) return null;
    return normalizarContexto(parsed);
  } catch { return null; }
}
function contextoDaChegada(): PrimeiroContato {
  const out: PrimeiroContato = { utm: {} };
  try {
    const params = new URLSearchParams(location.search);
    for (const chave of UTM_CHAVES) {
      const valor = texto(params.get("utm_" + chave));
      if (valor) out.utm[chave] = valor;
    }
    for (const chave of ["fbclid", "gclid"] as const) {
      const valor = texto(params.get(chave));
      if (valor) out[chave] = valor;
    }
  } catch {}
  try {
    const ref = origemDoReferenciador(document.referrer);
    if (ref) out.ref = ref;
  } catch {}
  return out;
}
/** Chamar na entrada do site, antes de navegar ao formulário.
 * Repetir não sobrescreve a primeira campanha, nem a visita direta.
 * Reaproveita j.js se ele já guardou o primeiro contato nesta aba.
 * Sem storage, mantém em memória; o cadastro continua disponível.
 */
export function capturarPrimeiroContato(): void {
  if (typeof window === "undefined" || primeiroContatoEmMemoria) return;
  const salvo = lerContexto(CONTEXTO_KEY, true);
  primeiroContatoEmMemoria = salvo ?? lerContexto("jlp_ctx") ?? contextoDaChegada();
  if (!salvo) {
    try {
      sessionStorage.setItem(CONTEXTO_KEY, JSON.stringify({ version: 1, ...primeiroContatoEmMemoria }));
    } catch {}
  }
}
/** Último CTA informado pelo snippet, quando disponível. */
export function ultimoCta(): string | null {
  return texto(lerStorage(() => sessionStorage, "jlp_ultimo_cta").valor);
}
export function contextoDeAquisicao(input: {
  formulario: string;
  ctaEntrada: string | null;
}): AcquisitionContext {
  const out: AcquisitionContext = {
    site: SITE_CODE,
    landing_page_code: LANDING_PAGE_CODE,
    formulario: input.formulario,
    cta_entrada: input.ctaEntrada ?? "nenhum",
  };
  if (typeof window === "undefined") return out;
  capturarPrimeiroContato();
  const vid = lerStorage(() => localStorage, "jlp_vid");
  const sid = lerStorage(() => sessionStorage, "jlp_sid");
  const salvo = lerStorage(() => sessionStorage, CONTEXTO_KEY);
  const snippetAtivo = typeof window.jlp === "function";
  const visitor = texto(vid.valor);
  if (visitor) out.visitor_id = visitor;
  const sessao = texto(sid.valor);
  if (sessao) out.session_key = sessao;
  try { out.pagina = location.pathname.slice(0, MAX); } catch {}
  // Não mistura o primeiro contato com UTMs de uma navegação posterior.
  const ctx = primeiroContatoEmMemoria;
  for (const chave of UTM_CHAVES) {
    const valor = ctx?.utm[chave];
    if (valor) out["utm_" + chave] = valor;
  }
  if (ctx?.fbclid) out.fbclid = ctx.fbclid;
  if (ctx?.gclid) out.gclid = ctx.gclid;
  if (ctx?.ref) out.referrer = ctx.ref;
  out.snippet = snippetAtivo ? "ativo" : "ausente";
  out.atribuicao = vid.ok && sid.ok && salvo.ok && snippetAtivo && visitor && sessao ? "completa" : "incompleta";
  return out;
}
