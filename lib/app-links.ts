/**
 * Links do site para a PLATAFORMA (app.juridia.com.br).
 *
 * "Entrar" leva ao LOGIN. A aba de cadastro da plataforma (`/sign-in?register`)
 * fica de fora de propósito: hoje ela não concede o teste grátis (envia
 * trial=false e cai em /plans — F01 do plano de 08/09/2026). Quem quer testar
 * entra pelo formulário gratuito do site; quem já tem conta, pelo login.
 */
export const APP_URL = (
  process.env.NEXT_PUBLIC_JURIDIA_APP_URL || "https://app.juridia.com.br"
).replace(/\/$/, "");

export const APP_LOGIN_URL = `${APP_URL}/sign-in`;
