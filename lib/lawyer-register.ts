/**
 * Cadastro de advogado — mesmo contrato do trial LP (POST /lawyer/register).
 */

export const JURIDIA_APP_ORIGIN = (
  process.env.NEXT_PUBLIC_JURIDIA_APP_URL || "https://app.juridia.com.br"
).replace(/\/$/, "");

export function buildLawyerRegisterBody(params: {
  name: string;
  email: string;
  phoneDigits: string;
  password: string;
  trial: boolean;
}) {
  return {
    name: params.name.trim(),
    mobilePhone: params.phoneDigits,
    email: params.email.trim(),
    phone: params.phoneDigits,
    password: params.password,
    trial: params.trial,
  };
}

export function getLawyerRegisterErrorMessage(body: unknown): string {
  if (typeof body === "string") return body;
  if (body && typeof body === "object") {
    const o = body as Record<string, unknown>;
    const msg = o.message;
    if (typeof msg === "string" && msg.length > 0) return msg;
    if (Array.isArray(msg) && msg.length > 0) {
      const last = msg[msg.length - 1];
      if (typeof last === "string") return last;
    }
  }
  return "Erro ao cadastrar, tente novamente.";
}

export function redirectToAppWithToken(accessToken: string) {
  window.location.href = `${JURIDIA_APP_ORIGIN}?token=${encodeURIComponent(accessToken)}`;
}
