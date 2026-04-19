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
  | "Purchase";

export type EventParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    ttq?: { track: (event: string, params?: EventParams) => void };
    lintrk?: (action: string, params: EventParams) => void;
  }
}

export function track(event: StandardEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  try {
    window.fbq?.("track", event, params);
  } catch {}

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
