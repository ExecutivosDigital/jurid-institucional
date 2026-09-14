import type { HubTrialResult as TrialResult } from "./hub-checkout";

const STORAGE_KEY = "juridia.trial.confirmation.v1";

/** Somente confirmação e consulta de status; nunca senha ou token de login. */
export function saveTrialConfirmation(result: TrialResult): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      status: result.status, email: result.email, trialDays: result.trialDays,
      trialEndsAt: result.trialEndsAt, provisioning: result.provisioning,
    }));
  } catch {
    // Armazenamento bloqueado não desfaz um cadastro confirmado pelo servidor.
    // A página orienta consultar o e-mail quando não há confirmação nesta aba.
  }
}

export function readTrialConfirmation(): TrialResult | null {
  try {
    const data: Partial<TrialResult> = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (!data || data.status !== "ACTIVE" || typeof data.email !== "string" ||
        typeof data.trialDays !== "number" || !Number.isFinite(data.trialDays) ||
        (data.trialEndsAt !== undefined && (typeof data.trialEndsAt !== "string" || !Number.isFinite(Date.parse(data.trialEndsAt))))) return null;
    if (data.provisioning && (typeof data.provisioning.token !== "string" || typeof data.provisioning.expiresAt !== "string")) return null;
    return data as TrialResult;
  } catch { return null; }
}

/** Sem destino definido, o contato pessoal da Maria permanece oculto. */
export function configuredWhatsApp(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password) return null;
    const phone = url.hostname === "wa.me" ? url.pathname.slice(1)
      : url.hostname === "api.whatsapp.com" && url.pathname === "/send" ? url.searchParams.get("phone") ?? "" : "";
    return /^[1-9]\d{7,14}$/.test(phone) ? url.href : null;
  } catch { return null; }
}

