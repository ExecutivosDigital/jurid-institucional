import { generateEventId } from "lib/meta-capi";

export type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Contact"
  | "CompleteRegistration"
  | "Schedule"
  | "Search"
  | "StartTrial"
  | "Subscribe"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase";

export type EventParams = Record<string, unknown>;

// Dados do usuário para matching da CAPI. Enviados RAW pro endpoint
// /api/meta/conversion — o servidor faz o hash SHA-256 antes de mandar
// pra Meta. Nunca exponha esses dados pra outros providers.
export interface TrackUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
}

export interface TrackOptions {
  // Quando preenchido, dispara também a CAPI (server-side) com o mesmo
  // event_id do Pixel — a Meta deduplica em até 48h. Recomendado para
  // eventos de conversão (Lead, CompleteRegistration, Purchase).
  userData?: TrackUserData;
  // Forçar CAPI mesmo sem userData (match por IP/UA/fbp/fbc).
  capi?: boolean;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    ttq?: { track: (event: string, params?: EventParams) => void };
    lintrk?: (action: string, params: EventParams) => void;
    /** Tracking próprio do Hub (snippet j.js) — ver app/layout.tsx. */
    jlp?: (event: string, props?: EventParams) => void;
  }
}

/**
 * Espelha o evento no tracking PRÓPRIO do Hub (seção LPs do admin).
 *
 * A lista de nomes do Hub é FECHADA (ingest descarta o resto), então o evento
 * padrão da Meta é traduzido para o nome que o Hub conhece — sem tradução,
 * nada é enviado. Dados pessoais NUNCA vão por aqui (regra herdada da VSL):
 * o Hub recebe só o nome do evento e rótulos.
 */
const JLP_EVENT: Partial<Record<StandardEvent, string>> = {
  Lead: "cta_click",
  InitiateCheckout: "checkout_view",
  AddPaymentInfo: "checkout_submit",
  StartTrial: "trial_submit",
};

function sendJlp(event: StandardEvent, params: EventParams) {
  try {
    const nome = JLP_EVENT[event];
    if (!nome || !window.jlp) return;
    // Só rótulos — nada de e-mail/telefone no tracking do Hub.
    window.jlp(nome, {
      ...(params.source ? { source: String(params.source) } : {}),
      ...(params.content_name ? { label: String(params.content_name) } : {}),
      ...(params.product ? { product: String(params.product) } : {}),
    });
  } catch {}
}

function sendCapi(
  event: StandardEvent,
  eventId: string,
  params: EventParams,
  userData?: TrackUserData,
) {
  try {
    fetch("/api/meta/conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: event,
        eventId,
        email: userData?.email,
        phone: userData?.phone,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        city: userData?.city,
        state: userData?.state,
        contentName: params.content_name,
        contentCategory: params.content_category,
        value: params.value,
        currency: params.currency,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export function track(
  event: StandardEvent,
  params: EventParams = {},
  options?: TrackOptions,
) {
  if (typeof window === "undefined") return;

  const useCapi = !!options?.capi || !!options?.userData;
  const eventId = useCapi ? generateEventId(event) : undefined;

  try {
    if (eventId) {
      window.fbq?.("track", event, params, { eventID: eventId });
    } else {
      window.fbq?.("track", event, params);
    }
  } catch {}

  if (useCapi && eventId) {
    sendCapi(event, eventId, params, options?.userData);
  }

  try {
    window.gtag?.("event", event, params);
  } catch {}

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {}

  try {
    window.ttq?.track(event, params);
  } catch {}

  sendJlp(event, params);
}

export function trackCustom(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  try {
    window.fbq?.("trackCustom", event, params);
  } catch {}

  try {
    window.gtag?.("event", event, params);
  } catch {}

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {}
}
