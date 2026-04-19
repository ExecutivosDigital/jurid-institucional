"use client";

import { track } from "lib/analytics";

const WHATSAPP_PHONE = "5541984080011";

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Gostaria de falar com um humano sobre a JuridIA.";

const WHATSAPP_HREF = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}&type=phone_number&app_absent=0`;

function whatsAppHref(message: string) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

type Props = {
  label?: string;
  message?: string;
};

export function WhatsAppFloat({
  label = "Falar com humano agora",
  message,
}: Props = {}) {
  const href = message != null ? whatsAppHref(message) : WHATSAPP_HREF;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="i2-whatsapp-float"
      aria-label="Falar pelo WhatsApp"
      onClick={() =>
        track("Lead", {
          source: "whatsapp_float",
          content_name: "whatsapp_click",
        })
      }
    >
      <span className="i2-whatsapp-float__bubble">
        {label}
        <span className="i2-whatsapp-float__bubble-tail" aria-hidden />
      </span>
      <span className="i2-whatsapp-float__button">
        <svg
          width="30"
          height="30"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden
        >
          <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.55-1.71a12.75 12.75 0 0 0 6.25 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.71 12.71 0 0 0 16 3.2Zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.89 1.02 1.04-3.79-.25-.4a10.6 10.6 0 0 1-1.63-5.68c0-5.88 4.78-10.66 10.67-10.66 2.84 0 5.52 1.11 7.53 3.13a10.6 10.6 0 0 1 3.13 7.53c0 5.88-4.79 10.56-10.8 10.56Zm5.85-7.97c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59a9.7 9.7 0 0 1-1.79-2.23c-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.72-.55l-.61-.01a1.18 1.18 0 0 0-.85.4c-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.23 3.41 5.41 4.78.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.16-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </span>
    </a>
  );
}
