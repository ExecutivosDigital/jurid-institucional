"use client";

import { motion } from "framer-motion";
import { cn } from "lib/utils";
import {
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  Loader2,
  PartyPopper,
  QrCode,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { maskCardNumber } from "./utils";

// ─── Sub-components ───────────────────────────────────────────────────────────

export function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 rounded-2xl border border-n-3 bg-n-1 p-6 shadow-sm dark:border-n-5 dark:bg-n-8">
      <div className="mb-5 flex items-center gap-2.5">
        {icon && <span className="text-n-4 dark:text-n-3">{icon}</span>}
        <h3 className="text-sm font-semibold text-n-6 dark:text-n-1">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

export function Field({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  type = "text",
  maxLength,
  disabled = false,
  rightElement,
  className,
}: {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  maxLength?: number;
  disabled?: boolean;
  rightElement?: React.ReactNode;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-xs font-semibold text-n-5 dark:text-n-3">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex h-11 items-center gap-2 rounded-xl border bg-n-2 px-3.5 transition-all dark:bg-n-6",
          focused
            ? "border-secondary-1 bg-n-1 ring-2 ring-secondary-1/20 dark:bg-n-8"
            : "border-n-3 dark:border-n-5",
          disabled && "opacity-50",
        )}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => !disabled && onChange(e.target.value)}
          maxLength={maxLength}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          className="flex-1 bg-transparent text-sm text-n-6 placeholder-n-3 outline-none dark:text-n-1"
        />
        {rightElement}
      </div>
    </div>
  );
}

export function PaymentMethodTabs({
  selected,
  onChange,
}: {
  selected: "card" | "pix";
  onChange: (m: "card" | "pix") => void;
}) {
  return (
    <div className="mb-6 flex gap-1 rounded-xl bg-n-1 p-1 dark:bg-n-6">
      {(["pix", "card"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all",
            selected === m
              ? "bg-secondary-1 text-n-1 shadow-sm shadow-secondary-1/25"
              : "text-n-4 hover:text-n-6 dark:text-n-3 dark:hover:text-n-1",
          )}
        >
          {m === "pix" ? (
            <QrCode className="h-4 w-4" />
          ) : (
            <CreditCard className="h-4 w-4" />
          )}
          {m === "pix" ? "PIX" : "Cartão"}
        </button>
      ))}
    </div>
  );
}

export function CardPreview({
  holder,
  cardNumber,
  exp,
}: {
  holder: string;
  cardNumber: string;
  exp: string;
}) {
  return (
    <div
      className="relative mb-6 w-full overflow-hidden rounded-2xl p-5"
      style={{
        background:
          "linear-gradient(135deg, #75644B 0%, #ab8e63 45%, #121d2e 100%)",
        minHeight: 160,
        boxShadow: "0 10px 40px rgba(117, 100, 75, 0.35)",
      }}
    >
      <div className="mb-4 flex items-start justify-between">
        <Image
          src="/icon.png"
          alt="Jurid-IA"
          width={32}
          height={32}
          className="h-8 w-8 object-contain opacity-90"
        />
        <CreditCard className="h-5 w-5 text-white/40" />
      </div>
      <p className="mb-4 font-mono text-lg tracking-widest text-white">
        {cardNumber ? maskCardNumber(cardNumber) : "**** **** **** ****"}
      </p>
      <div className="flex items-end justify-between">
        <div>
          <p className="mb-0.5 text-[9px] font-semibold text-white/50 uppercase">
            Titular
          </p>
          <p className="text-xs font-medium text-white capitalize">
            {holder || "Seu Nome"}
          </p>
        </div>
        <div>
          <p className="mb-0.5 text-right text-[9px] font-semibold text-white/50 uppercase">
            Validade
          </p>
          <p className="text-xs font-medium text-white">{exp || "MM/AA"}</p>
        </div>
      </div>
    </div>
  );
}

export function FreePlanBanner() {
  return (
    <div
      className="mb-6 flex w-full flex-col items-center justify-center rounded-2xl p-5"
      style={{
        background: "linear-gradient(135deg, #75644B 0%, #ab8e63 100%)",
        minHeight: 120,
        boxShadow: "0 10px 40px rgba(171, 142, 99, 0.3)",
      }}
    >
      <div className="mb-2 rounded-full bg-n-1/15 p-2.5">
        <Ticket className="h-7 w-7 text-n-1" />
      </div>
      <p className="text-xl font-bold text-n-1">100% OFF</p>
      <p className="mt-0.5 text-xs text-n-1/80">
        Assinatura gratuita garantida
      </p>
    </div>
  );
}

export function PixGeneratedView({
  price,
  pixCode,
  pixEncodedImage,
  copied,
  onCopy,
  onAlreadyPaid,
}: {
  price: string;
  pixCode: string;
  pixEncodedImage: string | null;
  copied: boolean;
  onCopy: () => void;
  onAlreadyPaid: () => void;
}) {
  const qrUri = pixEncodedImage
    ? pixEncodedImage.startsWith("data:")
      ? pixEncodedImage
      : `data:image/png;base64,${pixEncodedImage}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div>
        <h2 className="text-2xl font-bold text-n-6 dark:text-n-1">
          Pix Automático gerado!
        </h2>
        <p className="mt-1.5 text-sm text-n-4 dark:text-n-3">
          Escaneie o QR Code ou copie o código: no app do seu banco você
          autoriza a assinatura mensal e paga a 1ª cobrança no mesmo ato — as
          renovações caem sozinhas. Assim que o pagamento confirmar, seu login
          e senha chegam por e-mail.
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 rounded-2xl border border-n-3 bg-n-1 p-6 shadow-sm dark:border-n-5 dark:bg-n-8">
        {/* QR Code */}
        <div className="flex h-48 w-48 items-center justify-center rounded-2xl border border-n-3 bg-n-1 p-4 dark:border-n-5">
          {qrUri ? (
            <img
              src={qrUri}
              alt="QR Code PIX"
              className="h-full w-full object-contain"
            />
          ) : (
            <QrCode
              className="h-36 w-36 text-n-5 dark:text-n-3"
              strokeWidth={1.2}
            />
          )}
        </div>

        {/* Price */}
        <div className="w-full rounded-xl border border-n-3 bg-n-2 px-6 py-3 text-center dark:border-n-5 dark:bg-n-6">
          <p className="mb-1 text-xs font-semibold tracking-wider text-n-4 uppercase dark:text-n-3">
            Valor
          </p>
          <p className="text-2xl font-bold text-n-6 dark:text-n-1">{price}</p>
        </div>

        {/* PIX Code */}
        <div className="w-full">
          <p className="mb-2 text-xs font-semibold tracking-wider text-n-4 uppercase dark:text-n-3">
            Código PIX Copia e Cola
          </p>
          <div className="rounded-xl border border-dashed border-n-3 bg-n-2 p-3 font-mono text-xs leading-relaxed break-all text-n-5 select-all dark:border-n-5 dark:bg-n-6 dark:text-n-3">
            {pixCode || "—"}
          </div>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={onCopy}
          disabled={!pixCode}
          className={cn(
            "flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-bold transition-all",
            copied
              ? "border border-secondary-1/40 bg-n-2 text-secondary-2 dark:bg-n-6 dark:text-secondary-1"
              : "bg-secondary-1 text-n-1 shadow-lg shadow-secondary-1/25 hover:bg-secondary-2",
            !pixCode && "cursor-not-allowed opacity-50",
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" strokeWidth={3} /> Código Copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copiar Código PIX
            </>
          )}
        </button>

        {/* Already paid */}
        <button
          type="button"
          onClick={onAlreadyPaid}
          className="w-full rounded-xl border border-n-3 py-3 text-sm font-semibold text-n-4 transition-all hover:border-secondary-1/50 hover:text-n-6 dark:border-n-5 dark:text-n-3 dark:hover:text-n-1"
        >
          Já realizei o pagamento
        </button>
      </div>

      {/* Polling indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-n-4 dark:text-n-3">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Aguardando confirmação do pagamento...
      </div>
    </motion.div>
  );
}

export function SuccessView({ onGoHome }: { onGoHome: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col items-center justify-center gap-8 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-gray-50 shadow-inner"
      >
        <PartyPopper className="h-11 w-11 text-black" strokeWidth={1.5} />
      </motion.div>

      <div className="space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-4xl font-extrabold tracking-tight text-black"
        >
          Parabéns!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-semibold text-gray-700"
        >
          Sua assinatura foi confirmada
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mx-auto max-w-sm text-sm leading-relaxed text-gray-400"
        >
          Obrigado por confiar no Jurid-IA. Seu acesso às ferramentas de IA para
          a rotina jurídica está liberado.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex w-full max-w-xs flex-col gap-3"
      >
        <button
          onClick={onGoHome}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-secondary-1 text-base font-bold text-n-1 shadow-xl shadow-secondary-1/30 transition-all hover:bg-secondary-2"
        >
          Ir para o painel{" "}
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </motion.div>
    </motion.div>
  );
}
