/**
 * Máscaras e validações dos campos formatados do checkout.
 *
 * Regra do time (skill `inputs-formatados`): a máscara SEMPRE roda sobre
 * os dígitos crus, nunca sobre o texto já formatado — assim apagar no meio
 * do campo não embaralha o valor.
 */

const digits = (v: string) => v.replace(/\D/g, "");

export function maskCpfCnpj(value: string): string {
  const d = digits(value).slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string): string {
  const d = digits(value).slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export const maskCep = (v: string) => digits(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

export const maskCard = (v: string) => digits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

export const maskExpiry = (v: string) => digits(v).slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");

export const maskCvv = (v: string) => digits(v).slice(0, 4);

export const maskNumber = (v: string) => digits(v).slice(0, 8);

/* ---------------------------------------------------------------- */
/* Validações — só o suficiente para não mandar lixo ao gateway      */
/* ---------------------------------------------------------------- */

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
}

export function isFullName(v: string): boolean {
  const parts = v.trim().split(/\s+/);
  return parts.length >= 2 && parts.every((p) => p.length >= 2);
}

/** CPF (11) ou CNPJ (14) com dígito verificador conferido. */
export function isCpfCnpj(v: string): boolean {
  const d = digits(v);
  if (d.length === 11) return isCpf(d);
  if (d.length === 14) return isCnpj(d);
  return false;
}

function isCpf(d: string): boolean {
  if (/^(\d)\1{10}$/.test(d)) return false;
  for (const len of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i);
    const check = ((sum * 10) % 11) % 10;
    if (check !== Number(d[len])) return false;
  }
  return true;
}

function isCnpj(d: string): boolean {
  if (/^(\d)\1{13}$/.test(d)) return false;
  const calc = (len: number) => {
    const weights = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d[i]) * weights[i];
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  return calc(12) === Number(d[12]) && calc(13) === Number(d[13]);
}

export const isPhone = (v: string) => digits(v).length >= 10;
export const isCep = (v: string) => digits(v).length === 8;
export const isCardNumber = (v: string) => digits(v).length >= 13;
export const isCvv = (v: string) => digits(v).length >= 3;

/** MM/AA no futuro (aceita o mês corrente). */
export function isExpiry(v: string): boolean {
  const d = digits(v);
  if (d.length !== 4) return false;
  const month = Number(d.slice(0, 2));
  const year = 2000 + Number(d.slice(2));
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

/** Bandeira pelo BIN — usada só para o selo visual no campo do cartão. */
export function cardBrand(v: string): "visa" | "mastercard" | "amex" | "elo" | "hipercard" | null {
  const d = digits(v);
  if (/^4/.test(d)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "mastercard";
  if (/^3[47]/.test(d)) return "amex";
  if (/^(4011|4312|4389|5041|5067|509|627780|636297|636368|650)/.test(d)) return "elo";
  if (/^(606282|3841)/.test(d)) return "hipercard";
  return null;
}
