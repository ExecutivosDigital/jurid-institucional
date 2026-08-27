"use client";

import { motion } from "framer-motion";
import { cn } from "lib/utils";
import { CreditCard, MapPin, Shield, User } from "lucide-react";
import {
  CardPreview,
  Field,
  FreePlanBanner,
  PaymentMethodTabs,
  PixGeneratedView,
  SectionCard,
} from "./sub-components";
import type { BillingCycle, PaymentMethod, Plan } from "./types";
import {
  EASE,
  fmtBRL,
  maskCardNumber,
  maskCep,
  maskCpfCnpj,
  maskExpiry,
  maskPhoneBR,
  onlyDigits,
} from "./utils";

interface CheckoutSectionProps {
  selectedPlan: Plan;
  billingCycle: BillingCycle;
  paymentMethod: PaymentMethod;
  isFree: boolean;
  discountPercent: number;
  finalPrice: number;
  // Form fields
  cpf: string;
  holder: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  house: string;
  cardNumber: string;
  cvv: string;
  exp: string;
  // State
  pixGenerated: boolean;
  pixCopied: boolean;
  pixPayload: string;
  pixEncodedImage: string | null;
  // Handlers
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onCpfChange: (value: string) => void;
  onCpfBlur?: () => void;
  onHolderChange: (value: string) => void;
  onHolderBlur?: () => void;
  onEmailChange: (value: string) => void;
  onEmailBlur?: () => void;
  onPhoneChange: (value: string) => void;
  onPhoneBlur?: () => void;
  onCepChange: (value: string) => void;
  onCepBlur?: () => void;
  onAddressChange: (value: string) => void;
  onAddressBlur?: () => void;
  onHouseChange: (value: string) => void;
  onHouseBlur?: () => void;
  onCardNumberChange: (value: string) => void;
  onCardNumberBlur?: () => void;
  onCvvChange: (value: string) => void;
  onCvvBlur?: () => void;
  onExpChange: (value: string) => void;
  onExpBlur?: () => void;
  onCopyPixCode: () => void;
  onAlreadyPaid: () => void;
}

export function CheckoutSection({
  selectedPlan,
  billingCycle,
  paymentMethod,
  isFree,
  discountPercent,
  finalPrice,
  cpf,
  holder,
  email,
  phone,
  cep,
  address,
  house,
  cardNumber,
  cvv,
  exp,
  pixGenerated,
  pixCopied,
  pixPayload,
  pixEncodedImage,
  onPaymentMethodChange,
  onCpfChange,
  onCpfBlur,
  onHolderChange,
  onHolderBlur,
  onEmailChange,
  onEmailBlur,
  onPhoneChange,
  onPhoneBlur,
  onCepChange,
  onCepBlur,
  onAddressChange,
  onAddressBlur,
  onHouseChange,
  onHouseBlur,
  onCardNumberChange,
  onCardNumberBlur,
  onCvvChange,
  onCvvBlur,
  onExpChange,
  onExpBlur,
  onCopyPixCode,
  onAlreadyPaid,
}: CheckoutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex flex-col justify-start space-y-0 pt-4 gap-2"
    >
      {/* Header */}
      <div className="mb-5">
        <div className="flex flex-row justify-between gap-2">
          <h2 className="text-2xl font-bold text-n-6 dark:text-n-1">
            Finalizar assinatura
          </h2>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden items-center gap-2 rounded-full border border-n-3 bg-n-2 px-4 py-2 text-[11px] font-semibold tracking-wider text-secondary-1 uppercase shadow-sm dark:border-n-5 dark:bg-n-8 sm:flex"
          >
            <Shield className="h-3 w-3" /> Checkout seguro
          </motion.div>
        </div>
        <p className="mt-1.5 text-sm text-n-4 dark:text-n-3">
          Plano{" "}
          <span className="font-semibold text-n-6 dark:text-n-1">
            {selectedPlan.name}
          </span>{" "}
          — {billingCycle === "YEARLY" ? "Anual" : "Mensal"}
        </p>
      </div>

      {/* Payment method tabs */}
      {!isFree && (
        <PaymentMethodTabs
          selected={paymentMethod}
          onChange={onPaymentMethodChange}
        />
      )}

      {/* PIX Generated view */}
      {pixGenerated && paymentMethod === "pix" ? (
        <PixGeneratedView
          price={fmtBRL(finalPrice)}
          pixCode={pixPayload}
          pixEncodedImage={pixEncodedImage}
          copied={pixCopied}
          onCopy={onCopyPixCode}
          onAlreadyPaid={onAlreadyPaid}
        />
      ) : (
        <>
          {/* Card preview */}
          {paymentMethod === "card" && !isFree && (
            <CardPreview holder={holder} cardNumber={cardNumber} exp={exp} />
          )}

          {/* Free plan banner */}
          {isFree && <FreePlanBanner />}

          {/* Personal info */}
          <SectionCard
            title="Informações Pessoais"
            icon={<User className="h-4 w-4" />}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                label="CPF / CNPJ"
                placeholder="000.000.000-00"
                value={maskCpfCnpj(cpf)}
                onChange={(t) => onCpfChange(onlyDigits(t))}
                onBlur={onCpfBlur}
                maxLength={18}
              />
              <Field
                label="Nome Completo"
                placeholder="Nome do titular"
                value={holder}
                onChange={onHolderChange}
                onBlur={onHolderBlur}
              />
              <Field
                label="E-mail"
                placeholder="seu@email.com"
                value={email}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                type="email"
              />
              <Field
                label="Telefone"
                placeholder="(00) 00000-0000"
                value={maskPhoneBR(phone)}
                onChange={(t) => onPhoneChange(onlyDigits(t))}
                onBlur={onPhoneBlur}
                maxLength={16}
              />
            </div>
          </SectionCard>

          {/* Billing address */}
          {!isFree && (
            <SectionCard
              title="Endereço de Cobrança"
              icon={<MapPin className="h-4 w-4" />}
            >
              <div className="mb-3 grid grid-cols-3 gap-3">
                <Field
                  label="CEP"
                  placeholder="00000-000"
                  value={maskCep(cep)}
                  onChange={(t) => onCepChange(onlyDigits(t))}
                  onBlur={onCepBlur}
                  maxLength={9}
                  className="col-span-2"
                />
                <Field
                  label="Número"
                  placeholder="123"
                  value={house}
                  onChange={onHouseChange}
                  onBlur={onHouseBlur}
                />
              </div>
              <Field
                label="Endereço"
                placeholder="Rua, bairro, cidade"
                value={address}
                onChange={onAddressChange}
                onBlur={onAddressBlur}
              />
            </SectionCard>
          )}

          {/* Card data */}
          {paymentMethod === "card" && !isFree && (
            <SectionCard
              title="Dados do Cartão"
              icon={<CreditCard className="h-4 w-4" />}
            >
              <div className="flex flex-col gap-3">
                <Field
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  value={maskCardNumber(cardNumber)}
                  onChange={onCardNumberChange}
                  onBlur={onCardNumberBlur}
                  maxLength={19}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Validade"
                    placeholder="MM/AA"
                    value={maskExpiry(exp)}
                    onChange={onExpChange}
                    onBlur={onExpBlur}
                    maxLength={5}
                  />
                  <Field
                    label="CVV"
                    placeholder="123"
                    value={onlyDigits(cvv).slice(0, 4)}
                    onChange={onCvvChange}
                    onBlur={onCvvBlur}
                    type="tel"
                    maxLength={4}
                  />
                </div>
              </div>
            </SectionCard>
          )}

        </>
      )}
    </motion.div>
  );
}
