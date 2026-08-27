/**
 * Tela pós-submit (tema claro).
 *
 *  · Pix    → PIX AUTOMÁTICO: o QR é uma AUTORIZAÇÃO de recorrência.
 *             No app do banco o cliente confirma a assinatura mensal e
 *             paga a 1ª cobrança no mesmo ato — as renovações passam a
 *             ser debitadas sozinhas. QR + copia e cola + contador de
 *             expiração em destaque.
 *             Tem saída: seta no topo para voltar ao formulário e um
 *             atalho para trocar direto para cartão. O acesso só é
 *             liberado quando o webhook confirma — nunca pelo retorno
 *             síncrono.
 *  · Cartão → confirmação e próximo passo por e-mail. Aqui não há volta:
 *             a cobrança já foi enviada à operadora.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, Copy, CreditCard, Mail, RefreshCcw, ShieldCheck, Timer } from "lucide-react";
import { brl, offer } from "./offer.config";
import { PixMark } from "./marks";
import { checkoutTracking } from "./tracking";

export function CheckoutStatus({
  method,
  totalCents,
  email,
  pixCode,
  qrBase64,
  paid = false,
  expiresIn = offer.pixExpiresMinutes * 60,
  onBack,
  onSwitchToCard,
  onRegenerate,
}: {
  method: "card" | "pix";
  totalCents: number;
  email: string;
  pixCode?: string;
  /** QR oficial do gateway (base64 PNG). Sem ele, cai na moldura desenhada. */
  qrBase64?: string;
  /** Pagamento CONFIRMADO pelo servidor — nunca pelo retorno do submit. */
  paid?: boolean;
  expiresIn?: number;
  /** Volta ao formulário mantendo tudo preenchido. */
  onBack?: () => void;
  /** Volta ao formulário já com o cartão selecionado. */
  onSwitchToCard?: () => void;
  /** Pede um novo código Pix quando o atual expira. */
  onRegenerate?: () => void;
}) {
  const [left, setLeft] = useState(expiresIn);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.add("checkout-light");
    return () => document.body.classList.remove("checkout-light");
  }, []);

  useEffect(() => setLeft(expiresIn), [expiresIn]);

  useEffect(() => {
    if (method !== "pix") return;
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [method]);

  // Pix que expira sem pagamento é o vazamento mais caro do checkout — vira
  // evento próprio para virar fila de recuperação depois.
  const expirouRegistrado = useRef(false);
  useEffect(() => {
    if (method === "pix" && left <= 0 && !expirouRegistrado.current) {
      expirouRegistrado.current = true;
      checkoutTracking.pixExpirou();
    }
  }, [left, method]);

  const expired = left <= 0;
  /* Abaixo de 5 minutos o contador fica âmbar: é aviso, não decoração. */
  const urgent = !expired && left <= 5 * 60;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const code = pixCode ?? "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      // Copiar o código é a intenção de pagar mais forte que existe antes do
      // pagamento em si — separa quem desistiu de quem ficou na fila do banco.
      checkoutTracking.pixCopiado();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Clipboard bloqueado: o código continua visível para seleção manual. */
    }
  }

  return (
    <div className="flex min-h-screen justify-center bg-ck-page font-body text-ck-ink">
      <div className="w-full max-w-[620px]">
        <div className="bg-white sm:rounded-b-xl">
          {/* ---------------- topbar ---------------- */}
          <div className="flex items-center gap-3 border-b border-ck-line px-[18px] py-3.5">
            {method === "pix" && onBack && (
              <button
                type="button"
                onClick={onBack}
                className="-ml-2 flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-md px-2 text-[13px] font-bold text-ck-ink-muted transition-colors duration-150 hover:text-ck-ink"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Trocar forma de pagamento</span>
                <span className="sm:hidden">Voltar</span>
              </button>
            )}
            <img src="/media/juridia-logo.png" alt="JuridIA" className="ml-auto block h-8 w-auto" />
          </div>

          <div className="px-5 py-7 sm:px-[22px]">
            {paid ? (
              /* Confirmado pelo servidor. Vale para Pix e cartão: o que muda o
                 estado é o webhook do pagamento, não a forma de pagar. */
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ck-success/12 text-ck-success">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <h1 className="mt-4 font-display text-[21px] font-extrabold leading-tight tracking-[-.3px] text-ck-ink">
                  Pagamento confirmado
                </h1>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ck-ink-muted">
                  Recebemos <strong className="text-ck-ink">{brl(totalCents)}</strong> e seu acesso já
                  está liberado. O e-mail com <strong className="text-ck-ink">login e senha</strong>{" "}
                  acabou de sair para <strong className="text-ck-ink">{email}</strong>.
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-ck-line pt-4 text-[13px] text-ck-ink-muted">
                  <li className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ck-gold-dark" aria-hidden="true" />
                    <span>
                      Não chegou em alguns minutos? Confira o spam — depois disso, fale com a gente.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ck-gold-dark" aria-hidden="true" />
                    <span>
                      Garantia de {offer.guaranteeDays} dias: não gostou, devolvemos o valor integral.
                    </span>
                  </li>
                </ul>
              </>
            ) : method === "pix" ? (
              <>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ck-gold/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-ck-gold-dark">
                  <PixMark className="h-3.5 w-3.5" />
                  Pix Automático
                </span>
                <h1 className="mt-3 font-display text-[21px] font-extrabold leading-tight tracking-[-.3px] text-ck-ink">
                  {expired
                    ? "O código Pix expirou"
                    : "Escaneie o QR Code para autorizar e liberar seu acesso"}
                </h1>
                <p className="mt-1.5 text-[13.5px] text-ck-ink-muted">
                  Valor: <strong className="text-ck-ink">{brl(totalCents)}/mês</strong>
                  {expired
                    ? " · gere um novo código para continuar."
                    : ` · autorize em até ${offer.pixExpiresMinutes} minutos.`}
                </p>
                {/* O QR é uma AUTORIZAÇÃO de Pix Automático, não um Pix comum:
                    dizer isso antes evita o susto na tela do banco — e avisa
                    quem está num banco que ainda não aderiu. */}
                {!expired && (
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ck-ink-muted">
                    No app do seu banco, você confirma a assinatura de{" "}
                    <strong className="text-ck-ink">{brl(totalCents)}/mês</strong> e paga a 1ª
                    cobrança de hoje no mesmo ato — as renovações caem sozinhas, sem gerar Pix todo
                    mês. Se o seu banco ainda não oferece Pix Automático, pague com cartão logo
                    abaixo.
                  </p>
                )}

                {/* ---------------- contador ---------------- */}
                <div
                  className={`mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 ${
                    expired
                      ? "border-red-200 bg-red-50"
                      : urgent
                        ? "border-amber-200 bg-amber-50"
                        : "border-ck-line bg-ck-canvas"
                  }`}
                >
                  <Timer
                    className={`h-5 w-5 shrink-0 ${
                      expired ? "text-red-600" : urgent ? "text-amber-600" : "text-ck-gold-dark"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[.12em] text-ck-ink-muted">
                      {expired ? "Código expirado" : "Este código expira em"}
                    </span>
                    <span
                      role="timer"
                      aria-live="off"
                      className={`block font-display text-[30px] font-extrabold leading-none tabular-nums tracking-[-.02em] sm:text-[36px] ${
                        expired ? "text-red-600" : urgent ? "text-amber-700" : "text-ck-ink"
                      }`}
                    >
                      {mm}:{ss}
                    </span>
                  </span>
                  {expired && onRegenerate && (
                    <button
                      type="button"
                      onClick={onRegenerate}
                      className="ml-auto flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-ck-navy px-4 text-[13.5px] font-bold text-white transition-colors duration-150 hover:bg-ck-navy-900"
                    >
                      <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                      Gerar novo
                    </button>
                  )}
                </div>

                {/* ---------------- QR + copia e cola ---------------- */}
                <div
                  className={`mt-4 flex justify-center rounded-xl border border-ck-line bg-white p-4 transition-opacity ${expired ? "opacity-40" : ""}`}
                >
                  {qrBase64 ? (
                    <img
                      src={qrBase64.startsWith("data:") ? qrBase64 : `data:image/png;base64,${qrBase64}`}
                      alt="QR Code do Pix"
                      className="h-44 w-44"
                    />
                  ) : (
                    <QrPlaceholder seed={code} />
                  )}
                </div>

                <p className="mb-1.5 mt-5 text-[13.5px] font-semibold text-ck-ink">Ou use o copia e cola</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <span className="min-w-0 flex-1 truncate rounded-md border border-ck-line-strong bg-ck-canvas px-3.5 py-3 font-mono text-[12.5px] text-ck-ink-muted">
                    {code || "—"}
                  </span>
                  <button
                    type="button"
                    onClick={copy}
                    disabled={expired}
                    className="flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-ck-gold px-5 text-[14.5px] font-bold text-white transition-colors duration-150 hover:bg-ck-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? "Copiado" : "Copiar"}
                  </button>
                </div>

                <p className="mt-5 flex items-start gap-2.5 rounded-lg border border-ck-line bg-ck-canvas px-4 py-3 text-[13px] text-ck-ink-muted">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ck-gold-dark" aria-hidden="true" />
                  <span className="min-w-0 break-words">
                    Assim que o pagamento cair, o acesso e a senha chegam em{" "}
                    <strong className="font-bold text-ck-ink">{email}</strong>. Pode fechar esta página.
                  </span>
                </p>

                {/* Mudou de ideia: atalho direto para o cartão, sem perder os dados. */}
                {onSwitchToCard && (
                  <button
                    type="button"
                    onClick={onSwitchToCard}
                    className="mt-4 flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-ck-line-strong bg-white px-5 text-[14px] font-bold text-ck-ink transition-colors duration-150 hover:border-ck-gold hover:text-ck-gold-dark"
                  >
                    <CreditCard className="h-4 w-4" aria-hidden="true" />
                    Prefiro pagar com cartão de crédito
                  </button>
                )}
              </>
            ) : (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ck-success/12 text-ck-success">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <h1 className="mt-4 font-display text-[21px] font-extrabold leading-tight tracking-[-.3px] text-ck-ink">
                  Pedido recebido
                </h1>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ck-ink-muted">
                  Estamos confirmando o pagamento de <strong className="text-ck-ink">{brl(totalCents)}</strong>{" "}
                  com a operadora do cartão. Em poucos minutos o acesso e a senha chegam em{" "}
                  <strong className="text-ck-ink">{email}</strong>.
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-ck-line pt-4 text-[13px] text-ck-ink-muted">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ck-gold-dark" aria-hidden="true" />
                    <span>Garantia de {offer.guaranteeDays} dias: não gostou, devolvemos o valor integral.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ck-gold-dark" aria-hidden="true" />
                    <span>Não recebeu o e-mail? Confira o spam antes de falar com o suporte.</span>
                  </li>
                </ul>
              </>
            )}

            <a
              href={offer.support}
              className="mt-6 block text-center text-[13px] font-bold text-ck-ink-muted transition-colors duration-150 hover:text-ck-gold-dark"
            >
              Precisa de ajuda? Fale com o suporte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * QR desenhado a partir do payload — sem lib extra e sem chamada externa.
 * Não é um QR válido: serve de moldura até o gateway devolver a imagem
 * oficial, que entra aqui como <img src={qrBase64}>.
 */
function QrPlaceholder({ seed }: { seed: string }) {
  const size = 25;
  let h = 2166136261;
  for (const ch of seed || "juridia") {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    cells.push((h & 7) > 3);
  }
  const isFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > size - 9 && y < 8) || (x < 8 && y > size - 9);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-44 w-44" role="img" aria-label="QR Code do Pix">
      <rect width={size} height={size} fill="#ffffff" />
      {cells.map((on, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        if (!on || isFinder(x, y)) return null;
        return <rect key={i} x={x} y={y} width="1" height="1" fill="#121D2E" />;
      })}
      {[
        [0, 0],
        [size - 7, 0],
        [0, size - 7],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="none" stroke="#121D2E" strokeWidth="1" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#121D2E" />
        </g>
      ))}
    </svg>
  );
}
