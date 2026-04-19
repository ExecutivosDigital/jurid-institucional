"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "lib/utils";
import {
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  Crown,
  Loader2,
  MessageCircle,
  QrCode,
  Shield,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const ENTERPRISE_WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Gostaria+de+falar+com+um+humano+sobre+a+JuridIA.&type=phone_number&app_absent=0";
import { createPortal } from "react-dom";
import type { BillingCycle, Plan } from "./types";
import { EASE, fmtBRL, getPlanCreditPrice, getPlanPixPrice } from "./utils";

// ─── Static plan metadata ─────────────────────────────────────────────────────

interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface PlanStaticData {
  subtitle: string;
  displayName?: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  features: PlanFeature[];
  highlight?: boolean;
  tag?: string;
  badge?: string;
}

const PLAN_STATIC_DATA: PlanStaticData[] = [
  {
    subtitle: "Para quem está começando",
    displayName: "Advogado Solo",
    accentColor: "text-secondary-1",
    accentBg: "bg-amber-50 dark:bg-n-8",
    accentBorder: "border-secondary-1/40 dark:border-secondary-1/30",
    features: [
      { text: "1 advogado com acesso total", included: true, highlight: true },
      { text: "1 acesso de IA", included: true },
      { text: "Suporte com fila", included: true },
      { text: "Atualizações gratuitas", included: true },
    ],
  },
  {
    subtitle: "Escritório em crescimento",
    displayName: "Pro",
    accentColor: "text-secondary-1",
    accentBg: "bg-amber-50 dark:bg-n-8",
    accentBorder: "border-secondary-1/40 dark:border-secondary-1/30",
    highlight: true,
    tag: "Mais Popular",
    features: [
      { text: "5 advogados inclusos", included: true, highlight: true },
      { text: "5 acessos de IA", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Atualizações gratuitas", included: true },
    ],
  },
  {
    subtitle: "Grandes demandas",
    displayName: "Enterprise",
    accentColor: "text-secondary-1",
    accentBg: "bg-amber-50 dark:bg-n-8",
    accentBorder: "border-secondary-1/40 dark:border-secondary-1/30",
    features: [
      {
        text: "Demandas atendidas sob medida",
        included: true,
        highlight: true,
      },
      { text: "Acesso de IA ilimitado", included: true },
      { text: "Suporte humanizado e ágil", included: true },
      { text: "Consultoria dedicada", included: true },
    ],
  },
];

const COMPARISON_ROWS: { feature: string; values: (string | boolean)[] }[] = [
  {
    feature: "Inteligência artificial",
    values: ["Ilimitada", "Ilimitada", "Ilimitada"],
  },
  { feature: "Acesso a múltiplas IAs", values: [true, true, true] },
  { feature: "Suporte", values: [true, true, true] },
  { feature: "Suporte prioritário", values: [false, true, true] },
  { feature: "Usuários simultâneos", values: [false, true, true] },
  { feature: "Integração com ferramentas", values: [false, false, true] },
];

// ─── PlanSelectDot ────────────────────────────────────────────────────────────

function PlanSelectDot({ selected }: { selected: boolean }) {
  return (
    <div
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
        selected ? "border-white bg-white" : "border-gray-300 bg-transparent",
      )}
    >
      {selected && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
    </div>
  );
}

// ─── PlansSection ─────────────────────────────────────────────────────────────

interface PlansSectionProps {
  plans: Plan[];
  loadingPlans: boolean;
  billingCycle: BillingCycle;
  selectedPlan: string | null;
  onBillingCycleChange: (cycle: BillingCycle) => void;
  onPlanSelect: (planId: string) => void;
  onContinue: () => void;
}

export function PlansSection({
  plans,
  loadingPlans,
  billingCycle,
  selectedPlan,
  onBillingCycleChange,
  onPlanSelect,
  onContinue,
}: PlansSectionProps) {
  const displayPlans = plans.slice(0, 3);
  const isEnterpriseSelected = !!selectedPlan && displayPlans[2]?.id === selectedPlan;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30, scale: 0.96 }}
        transition={{ duration: 0.35 }}
        className="flex flex-1 flex-col items-center gap-10 py-10"
      >
        {/* Header */}
        <div className="w-full text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-n-6 dark:text-n-1 sm:text-4xl">
            Seu escritório com{" "}
            <span className="text-secondary-1">inteligência</span>
          </h1>
          <p className="mt-2 text-base text-n-4 dark:text-n-3">
            Invista em IA e colha resultados reais. Escolha o plano que melhor
            se adapta à sua rotina jurídica.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="inline-flex rounded-full bg-n-1 p-1.5 shadow-sm ring-1 ring-n-3 dark:bg-n-8 dark:ring-n-5">
          <button
            onClick={() => onBillingCycleChange("MONTHLY")}
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-semibold transition-all",
              billingCycle === "MONTHLY"
                ? "bg-secondary-1 text-n-1 shadow-md shadow-secondary-1/30"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            Mensal
          </button>
          <button
            onClick={() => onBillingCycleChange("YEARLY")}
            className={cn(
              "flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all",
              billingCycle === "YEARLY"
                ? "bg-secondary-1 text-n-1 shadow-md shadow-secondary-1/30"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            Anual
            <span className="rounded-full bg-secondary-2 px-2 py-0.5 text-[10px] font-bold text-n-1">
              -9.3%
            </span>
          </button>
        </div>

        {/* Plan cards */}
        {loadingPlans ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayPlans.map((plan, i) => {
              const isSelected = selectedPlan === plan.id;
              const price = getPlanCreditPrice(plan, billingCycle);
              const pixPrice = getPlanPixPrice(plan, billingCycle);
              const staticData = PLAN_STATIC_DATA[i] ?? PLAN_STATIC_DATA[0];
              const isHighlight = staticData.highlight ?? false;

              const isEnterprise = i >= 2;

              return (
                <motion.button
                  key={plan.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPlanSelect(plan.id)}
                  className={cn(
                    "group relative flex flex-col rounded-3xl p-7 text-left transition-all duration-300",
                    isSelected
                      ? "bg-gradient-to-br from-secondary-2 to-primary-100 shadow-2xl ring-2 shadow-secondary-1/30 ring-secondary-1/80"
                      : isHighlight
                        ? "bg-gradient-to-br from-n-1 to-n-2 shadow-lg ring-2 ring-secondary-1/35 hover:shadow-xl dark:from-n-8 dark:to-n-6"
                        : "bg-n-1 shadow-lg ring-1 shadow-n-3/40 ring-n-3 hover:shadow-xl hover:ring-secondary-1/35 dark:bg-n-8 dark:ring-n-5",
                  )}
                >
                  {/* Popular badge */}
                  {staticData.tag && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-b-xl px-4 py-1 text-[10px] font-bold tracking-wide text-white shadow-lg",
                          isSelected
                            ? "bg-white/30"
                            : "bg-gradient-to-r from-secondary-1 to-secondary-2 shadow-secondary-1/35",
                        )}
                      >
                        <Crown className="h-3 w-3" /> {staticData.tag}
                      </span>
                    </div>
                  )}

                  {/* Top row: icon + select dot */}
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
                        isSelected
                          ? "bg-white/20 text-white"
                          : staticData.accentBg + " " + staticData.accentColor,
                      )}
                    >
                      {i === 0 && <Zap className="h-6 w-6" />}
                      {i === 1 && <Sparkles className="h-6 w-6" />}
                      {i >= 2 && <Crown className="h-6 w-6" />}
                    </div>
                    {isEnterprise ? (
                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <MessageCircle className="h-3 w-3" /> Fale Conosco
                      </span>
                    ) : (
                      <PlanSelectDot selected={isSelected} />
                    )}
                  </div>

                  {/* Plan name + subtitle */}
                  <h3
                    className={cn(
                      "text-xl font-bold transition-colors",
                      isSelected
                        ? "text-white"
                        : "dark:text-white/50 text-black",
                    )}
                  >
                    {staticData.displayName ?? plan.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-0.5 text-sm font-medium",
                      isSelected ? "text-white/70" : "text-gray-400",
                    )}
                  >
                    {staticData.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-5">
                    {isEnterprise ? (
                      <div className="flex flex-col gap-1">
                        <span
                          className={cn(
                            "text-2xl font-extrabold tracking-tight",
                            isSelected ? "text-white" : "dark:text-white/50 text-black",
                          )}
                        >
                          Sob consulta
                        </span>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isSelected ? "text-white/60" : "text-gray-400",
                          )}
                        >
                          Precificação personalizada
                        </span>
                      </div>
                    ) : billingCycle === "YEARLY" ? (
                      <>
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            isSelected ? "text-white/60" : "text-gray-400",
                          )}
                        >
                          12x de
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={cn(
                              "text-4xl font-extrabold tracking-tight",
                              isSelected
                                ? "text-white"
                                : "dark:text-white/50 text-black",
                            )}
                          >
                            {fmtBRL((pixPrice > 0 ? pixPrice : price) / 12)}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isSelected ? "text-white/60" : "text-gray-400",
                            )}
                          >
                            /mês
                          </span>
                          {pixPrice > 0 && pixPrice < price && (
                            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-n-2 px-2 py-0.5 text-[10px] font-bold text-secondary-2 dark:bg-n-6 dark:text-secondary-1">
                              <QrCode className="h-2.5 w-2.5" /> PIX
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span
                          className={cn(
                            "text-4xl font-extrabold tracking-tight",
                            isSelected
                              ? "text-white"
                              : "dark:text-white/50 text-black",
                          )}
                        >
                          {fmtBRL(pixPrice > 0 ? pixPrice : price)}
                        </span>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isSelected ? "text-white/60" : "text-gray-400",
                          )}
                        >
                          /mês
                        </span>
                        {pixPrice > 0 && pixPrice < price && (
                          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-n-2 px-2 py-0.5 text-[10px] font-bold text-secondary-2 dark:bg-n-6 dark:text-secondary-1">
                            <QrCode className="h-2.5 w-2.5" /> PIX
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Credit card chip */}
                  {!isEnterprise && pixPrice > 0 && pixPrice < price && (
                    <div
                      className={cn(
                        "mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                        isSelected
                          ? "bg-white/15 text-white/70"
                          : "bg-n-2 text-secondary-1 dark:bg-n-6",
                      )}
                    >
                      <CreditCard className="h-3 w-3" />
                      {billingCycle === "YEARLY"
                        ? `12x de ${fmtBRL(price / 12)}`
                        : fmtBRL(price)}{" "}
                      no Cartão
                    </div>
                  )}

                  {/* Divider */}
                  <div
                    className={cn(
                      "my-5 h-px w-full",
                      isSelected ? "bg-white/15" : "bg-gray-100",
                    )}
                  />

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {staticData.features.map((feat) => (
                      <li
                        key={feat.text}
                        className={cn(
                          "flex items-start gap-2.5 text-sm",
                          !feat.included && "opacity-50",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                            feat.included
                              ? isSelected
                                ? "bg-white/20"
                                : staticData.accentBg
                              : isSelected
                                ? "bg-white/10"
                                : "bg-gray-100",
                          )}
                        >
                          {feat.included ? (
                            <Check
                              className={cn(
                                "h-2.5 w-2.5",
                                isSelected
                                  ? "text-white"
                                  : staticData.accentColor,
                              )}
                              strokeWidth={3}
                            />
                          ) : (
                            <X
                              className={cn(
                                "h-2.5 w-2.5",
                                isSelected ? "text-white/50" : "text-gray-400",
                              )}
                              strokeWidth={3}
                            />
                          )}
                        </span>
                        <span
                          className={cn(
                            feat.highlight && feat.included
                              ? isSelected
                                ? "font-semibold text-white"
                                : "font-semibold " + staticData.accentColor
                              : isSelected
                                ? "dark:text-white/80"
                                : "dark:text-white/50 text-black/50",
                          )}
                        >
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* ─── Tabela comparativa (hidden no mobile) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden w-full md:block"
        >
          <div className="mb-6 text-center">
            <span className="text-xs font-semibold tracking-widest text-secondary-1 uppercase">
              Visão Geral
            </span>
            <h3 className="mt-1 text-2xl font-extrabold text-n-6 dark:text-n-1">
              Comparação completa
            </h3>
            <p className="mt-1 text-sm text-n-4 dark:text-n-3">
              Clique em um plano para selecioná-lo e ver todos os detalhes.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-n-3 bg-n-1 shadow-sm dark:border-n-5 dark:bg-n-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-n-3 dark:border-n-5">
                  <th className="w-1/4 py-4 pl-6 pr-4 text-left text-sm font-semibold text-n-4 dark:text-n-3">
                    Recurso
                  </th>
                  {displayPlans.map((plan, i) => {
                    const sd = PLAN_STATIC_DATA[i] ?? PLAN_STATIC_DATA[0];
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <th key={plan.id} className="w-1/4 px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => onPlanSelect(plan.id)}
                          className={cn(
                            "group w-full rounded-xl px-4 py-3 transition-all duration-200",
                            isSelected
                              ? cn(
                                  // sd.accentBg,
                                  "ring-2 ring-secondary-1",
                                  // sd.accentBorder.replace("border-", "ring-"),
                                  "shadow-sm",
                                )
                              : "hover:bg-n-2 dark:hover:bg-n-6",
                          )}
                        >
                          <div className="flex flex-col items-center gap-1.5">
                            {isSelected && (
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wide",
                                  // sd.accentBg,
                                  // sd.accentColor,
                                  sd.accentBorder,
                                )}
                              >
                                <Check
                                  className="h-2.5 w-2.5"
                                  strokeWidth={3}
                                />{" "}
                                Selecionado
                              </span>
                            )}
                            <span
                              className={cn(
                                "text-sm font-bold transition-colors",
                                isSelected
                                  ? sd.accentColor
                                  : "text-n-5 group-hover:text-n-7 dark:text-n-3 dark:group-hover:text-n-1",
                              )}
                            >
                              {sd.displayName ?? plan.name}
                            </span>
                            <span
                              className={cn(
                                "text-xs",
                                isSelected
                                  ? "text-n-5 dark:text-n-3"
                                  : "text-n-4 dark:text-n-4",
                              )}
                            >
                              {sd.subtitle}
                            </span>
                          </div>
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, ri) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-n-3 last:border-0 dark:border-n-5",
                      ri % 2 === 0
                        ? "bg-n-1 dark:bg-n-8"
                        : "bg-n-2/60 dark:bg-n-6/40",
                    )}
                  >
                    <td className="py-3.5 pl-6 pr-4 text-sm font-medium text-n-6 dark:text-n-2">
                      {row.feature}
                    </td>
                    {displayPlans.map((plan, i) => {
                      const sd = PLAN_STATIC_DATA[i] ?? PLAN_STATIC_DATA[0];
                      const isSelected = selectedPlan === plan.id;
                      const val = row.values[i];
                      return (
                        <td
                          key={plan.id}
                          onClick={() => onPlanSelect(plan.id)}
                          className={cn(
                            "cursor-pointer px-6 py-3.5 text-center transition-all duration-200",
                            isSelected
                              ? "bg-secondary-1/10 ring-1 ring-secondary-1/15 dark:bg-secondary-1/15 dark:ring-secondary-1/25"
                              : "hover:bg-n-2/80 dark:hover:bg-n-6/60",
                          )}
                        >
                          {typeof val === "boolean" ? (
                            val ? (
                              <span
                                className={cn(
                                  "inline-flex h-6 w-6 items-center justify-center rounded-full border",
                                  isSelected
                                    ? cn(sd.accentBorder)
                                    : "border-n-3 bg-n-2 dark:border-n-5 dark:bg-n-6",
                                )}
                              >
                                <Check
                                  className={cn(
                                    "h-3.5 w-3.5",
                                    isSelected
                                      ? sd.accentColor
                                      : "text-n-4 dark:text-n-3",
                                  )}
                                  strokeWidth={3}
                                />
                              </span>
                            ) : (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-n-3 bg-n-2 dark:border-n-5 dark:bg-n-6">
                                <X
                                  className="h-3.5 w-3.5 text-n-3 dark:text-n-4"
                                  strokeWidth={3}
                                />
                              </span>
                            )
                          ) : (
                            <span
                              className={cn(
                                "text-sm font-semibold",
                                isSelected
                                  ? sd.accentColor
                                  : "text-n-5 dark:text-n-3",
                              )}
                            >
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Spacer para o footer fixo */}
        <div className="h-28" />
      </motion.div>

      {/* ─── Footer fixo (portal) ─── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="plans-floating-bar"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed inset-x-0 bottom-0 z-[9999]  border-t border-n-3 bg-n-1/95 px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md dark:border-n-5 dark:bg-n-8/95 sm:px-8 lg:left-[33.333%]"
            >
              <div className="mx-auto flex max-w-6xl items-center gap-4">
                {/* Selos de confiança */}
                <div className="hidden flex-1 items-center gap-5 sm:flex">
                  <span className="flex items-center gap-1.5 text-xs text-n-4 dark:text-n-3">
                    <Shield className="h-3.5 w-3.5 text-secondary-1" />{" "}
                    Pagamento seguro
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-n-4 dark:text-n-3">
                    <Zap className="h-3.5 w-3.5 text-secondary-1" /> Ativação
                    imediata
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-n-4 dark:text-n-3">
                    <Clock className="h-3.5 w-3.5 text-secondary-1" /> Cancele
                    quando quiser
                  </span>
                </div>

                {/* Botão CTA */}
                <button
                  type="button"
                  onClick={
                    isEnterpriseSelected
                      ? () => window.open(ENTERPRISE_WHATSAPP_URL, "_blank")
                      : onContinue
                  }
                  disabled={!selectedPlan || loadingPlans}
                  className={cn(
                    "flex shrink-0 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold whitespace-nowrap shadow-lg transition-all sm:ml-auto",
                    selectedPlan && !loadingPlans
                      ? isEnterpriseSelected
                        ? "bg-green-600 text-white shadow-green-600/25 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/30"
                        : "bg-secondary-1 text-n-1 shadow-secondary-1/25 hover:bg-secondary-2 hover:shadow-xl hover:shadow-secondary-1/30"
                      : "cursor-not-allowed bg-n-2 text-n-4 shadow-none dark:bg-n-6 dark:text-n-5",
                  )}
                >
                  {loadingPlans ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isEnterpriseSelected ? (
                    <>
                      <MessageCircle className="h-4 w-4" />
                      Falar com nossa equipe
                    </>
                  ) : (
                    <>
                      {selectedPlan
                        ? "Continuar para pagamento"
                        : "Selecione um plano"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
