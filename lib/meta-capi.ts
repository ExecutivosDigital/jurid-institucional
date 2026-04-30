import crypto from "crypto";

// Hash SHA-256 com lowercase + trim (formato que a Meta exige).
// Retorna undefined para inputs vazios — Meta aceita campos faltando.
export function hashUserData(data: string | undefined | null): string | undefined {
  if (!data || typeof data !== "string") return undefined;
  const normalized = data.toLowerCase().trim();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

// Normaliza telefone: só dígitos, com código do país. Ex: "5541963475328".
export function normalizePhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits;
}

// Gera event_id único. O MESMO id vai para Pixel (cliente) e CAPI (servidor)
// para a Meta deduplicar dentro da janela de 48h. Sempre string.
export function generateEventId(eventName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `${eventName}_${timestamp}_${random}`;
}

export function getFbp(cookieString: string | null | undefined): string | undefined {
  if (!cookieString) return undefined;
  const match = cookieString.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
}

export function getFbc(cookieString: string | null | undefined): string | undefined {
  if (!cookieString) return undefined;
  const match = cookieString.match(/_fbc=([^;]+)/);
  return match ? match[1] : undefined;
}
