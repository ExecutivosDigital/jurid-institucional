/**
 * Adaptador de instrumentação do /checkout portado da VSL.
 *
 * O tracking.ts (portado sem mudanças) chama `track(evento, props, user?)`.
 * Na VSL isso fanava para dataLayer/gtag/fbq/jlp; aqui a fan-out reusa o que
 * o institucional já tem:
 *  · tracking do Hub: `window.jlp` (snippet j.js do layout) — evento vai com o
 *    MESMO nome (a lista fechada do Hub já conhece todos os checkout_*);
 *  · Meta/GA: `track` de lib/analytics, traduzindo para o evento padrão
 *    (Lead/InitiateCheckout/AddPaymentInfo/Purchase) — com a MESMA regra da
 *    VSL: Purchase só quando checkout_result é PAID de verdade.
 *
 * Dados pessoais (`user`) vão SÓ para a correspondência avançada da Meta
 * (hasheados no servidor via CAPI) — nunca para o jlp.
 */

import { track as metaTrack, type StandardEvent } from "lib/analytics";

export type UserInfo = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
};

type Props = Record<string, unknown>;

const META_EVENT: Record<string, StandardEvent | undefined> = {
  checkout_view: "InitiateCheckout",
  checkout_submit: "AddPaymentInfo",
};

function eventoDaMeta(event: string, props: Props): StandardEvent | null {
  if (event === "checkout_result") {
    if (props.demo === true) return null;
    return props.status === "PAID" ? "Purchase" : null;
  }
  return META_EVENT[event] ?? null;
}

export function track(event: string, props: Props = {}, user?: UserInfo) {
  if (typeof window === "undefined") return;

  // Hub (seção LPs do admin) — nome interno, sem dado pessoal.
  try {
    window.jlp?.(event, props);
  } catch {}

  // Meta/GA — só os marcos que têm evento padrão.
  const meta = eventoDaMeta(event, props);
  if (meta) {
    metaTrack(
      meta,
      {
        content_name: `checkout_${event}`,
        ...(typeof props.value === "number" ? { value: props.value } : {}),
        ...(typeof props.currency === "string" ? { currency: props.currency } : {}),
      },
      user ? { userData: user } : undefined,
    );
  }
}
