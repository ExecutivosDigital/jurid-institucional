"use client";

import { cn } from "lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
import { EASE, fmtBRL } from "./utils";

interface CheckoutFooterProps {
  show: boolean;
  priceLabel: string;
  basePrice: number;
  discountPercent: number;
  finalPrice: number;
  isFree: boolean;
  billingCycle: "MONTHLY" | "YEARLY";
  paymentMethod: "card" | "pix";
  submitLoading: boolean;
  canSubmit: boolean;
  submitLabel: string;
  onSubmit: () => void;
}

export function CheckoutFooter({
  show,
  priceLabel,
  basePrice,
  discountPercent,
  finalPrice,
  isFree,
  billingCycle,
  paymentMethod,
  submitLoading,
  canSubmit,
  submitLabel,
  onSubmit,
}: CheckoutFooterProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="floating-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-[9999] border-t border-n-3 bg-n-1/95 px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md dark:border-n-5 dark:bg-n-8/95 sm:px-8 lg:left-[45%]"
        >
          <div className="mx-auto flex max-w-2xl items-center gap-4">
            {/* Resumo de preço */}
            <div className="min-w-0 flex-1">
              {priceLabel && (
                <p className="mb-0.5 truncate text-[11px] text-n-4 dark:text-n-3">
                  {priceLabel}
                </p>
              )}
              {discountPercent > 0 ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-n-3 line-through dark:text-n-4">
                    {fmtBRL(basePrice)}
                  </span>
                  <span className="text-lg font-bold text-n-6 dark:text-n-1">
                    {isFree ? "GRÁTIS" : fmtBRL(finalPrice)}
                  </span>
                </div>
              ) : (
                <p className="text-lg font-bold text-n-6 dark:text-n-1">
                  {billingCycle === "YEARLY" && paymentMethod === "card"
                    ? `12x de ${fmtBRL(basePrice / 12)}`
                    : fmtBRL(basePrice)}
                </p>
              )}
            </div>

            {/* Botão de ação */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitLoading || !canSubmit}
              className={cn(
                "flex shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold whitespace-nowrap shadow-lg transition-all",
                canSubmit && !submitLoading
                  ? "bg-secondary-1 text-n-1 shadow-secondary-1/25 hover:bg-secondary-2 hover:shadow-xl hover:shadow-secondary-1/30"
                  : "cursor-not-allowed bg-n-2 text-n-4 shadow-none dark:bg-n-6 dark:text-n-5",
              )}
            >
              {submitLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processando...
                </>
              ) : (
                <>
                  {submitLabel} {!isFree && <ArrowRight className="h-4 w-4" />}
                </>
              )}
            </button>
          </div>

          <p className="mt-2 text-center text-[11px] text-gray-400">
            Precisa de ajuda?{" "}
            <a
              href="https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Gostaria+de+falar+com+um+humano+sobre+a+JuridIA.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              data-tracking-id="plans-checkout-fale-conosco"
              data-tracking-destination="whatsapp"
              className="text-gray-600 underline transition-colors hover:text-black"
            >
              Fale conosco
            </a>
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
