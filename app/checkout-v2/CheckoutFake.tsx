"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  ImageIcon,
  Loader2,
  Lock,
  QrCode,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PLANS, type PlanKey } from "../contratar/plans";

type Method = "card" | "pix";

function isValidPlan(value: string | null): value is PlanKey {
  return value === "individual" || value === "escritorio" || value === "enterprise";
}

function maskCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function maskExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function CheckoutFake() {
  const router = useRouter();
  const params = useSearchParams();
  const planParam = params.get("plan");
  const plan = useMemo(
    () => (isValidPlan(planParam) ? PLANS[planParam] : PLANS.escritorio),
    [planParam]
  );
  const PlanIcon = plan.icon;

  const [method, setMethod] = useState<Method>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Fake flow — simulate processing.
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/thanks");
  }

  const totalLabel = plan.isEnterprise
    ? "Sob consulta"
    : `R$ ${plan.promoPrice}`;

  return (
    <div className="i2-checkout">
      <header className="i2-checkout__top">
        <Link href="/register-complete" className="i2-checkout__back">
          <ArrowLeft size={14} strokeWidth={2.25} />
          Voltar
        </Link>
        <Link href="/institucional-2" className="i2-checkout__brand">
          <Image
            src="/images/logo/logo-white.png"
            alt="JuridIA"
            width={120}
            height={30}
          />
        </Link>
        <span className="i2-checkout__secure">
          <ShieldCheck size={14} strokeWidth={2.25} />
          Pagamento seguro
        </span>
      </header>

      <div className="i2-checkout__grid">
        <section className="i2-checkout__form-col">
          <div className="i2-checkout__panel">
            <h1 className="i2-checkout__title">Finalizar pagamento</h1>
            <p className="i2-checkout__subtitle">
              Escolha como prefere pagar. Você pode cancelar a assinatura a
              qualquer momento.
            </p>

            <div className="i2-checkout__methods" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={method === "card"}
                className={`i2-checkout__method${
                  method === "card" ? " is-active" : ""
                }`}
                onClick={() => setMethod("card")}
              >
                <CreditCard size={18} strokeWidth={2} />
                <span>Cartão</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={method === "pix"}
                className={`i2-checkout__method${
                  method === "pix" ? " is-active" : ""
                }`}
                onClick={() => setMethod("pix")}
              >
                <QrCode size={18} strokeWidth={2} />
                <span>Pix</span>
              </button>
            </div>

            <form className="i2-checkout__form" onSubmit={handleSubmit}>
              {method === "card" && (
                <>
                  <label className="i2-checkout__field">
                    <span className="i2-checkout__label">Número do cartão</span>
                    <span className="i2-checkout__input">
                      <CreditCard size={16} strokeWidth={2} />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 1234 1234 1234"
                        value={maskCardNumber(cardNumber)}
                        onChange={(e) => setCardNumber(e.target.value)}
                        autoComplete="cc-number"
                        required
                      />
                    </span>
                  </label>

                  <label className="i2-checkout__field">
                    <span className="i2-checkout__label">Nome no cartão</span>
                    <span className="i2-checkout__input">
                      <input
                        type="text"
                        placeholder="Como aparece no cartão"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        autoComplete="cc-name"
                        required
                      />
                    </span>
                  </label>

                  <div className="i2-checkout__row">
                    <label className="i2-checkout__field">
                      <span className="i2-checkout__label">Validade</span>
                      <span className="i2-checkout__input">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM/AA"
                          value={maskExpiry(expiry)}
                          onChange={(e) => setExpiry(e.target.value)}
                          autoComplete="cc-exp"
                          maxLength={5}
                          required
                        />
                      </span>
                    </label>
                    <label className="i2-checkout__field">
                      <span className="i2-checkout__label">CVC</span>
                      <span className="i2-checkout__input">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="CVC"
                          value={cvc.replace(/\D/g, "").slice(0, 4)}
                          onChange={(e) => setCvc(e.target.value)}
                          autoComplete="cc-csc"
                          maxLength={4}
                          required
                        />
                      </span>
                    </label>
                  </div>
                </>
              )}

              {method === "pix" && (
                <div className="i2-checkout__alt">
                  <div className="i2-checkout__alt-icon">
                    <QrCode size={28} strokeWidth={1.75} />
                  </div>
                  <h3>Pagamento via Pix</h3>
                  <p>
                    Ao confirmar, geramos um QR Code válido por 30 minutos. O
                    acesso é liberado automaticamente após a confirmação.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="i2-checkout__submit"
                disabled={submitting || plan.isEnterprise}
              >
                {submitting ? (
                  <Loader2
                    size={18}
                    strokeWidth={2}
                    className="i2-checkout__spin"
                  />
                ) : (
                  <>
                    <Lock size={14} strokeWidth={2.25} />
                    Pagar {totalLabel}
                  </>
                )}
              </button>

              <p className="i2-checkout__note">
                <ShieldCheck size={12} strokeWidth={2.25} />
                Seus dados são criptografados e processados em ambiente PCI-DSS.
              </p>
            </form>
          </div>
        </section>

        <aside className="i2-checkout__summary-col">
          <div className="i2-checkout__summary">
            <div
              className="i2-checkout__hero-img"
              role="img"
              aria-label="Placeholder de imagem"
            >
              <div className="i2-checkout__hero-img-pattern" aria-hidden="true" />
              <div className="i2-checkout__hero-img-center">
                <ImageIcon size={28} strokeWidth={1.5} />
                <span>Imagem · placeholder</span>
              </div>
            </div>

            <span className="i2-checkout__summary-eyebrow">
              <Sparkles size={12} strokeWidth={2.5} />
              Resumo do pedido
            </span>

            <div className="i2-checkout__plan">
              <span className="i2-checkout__plan-icon">
                <PlanIcon size={22} strokeWidth={2} />
              </span>
              <div>
                <h3 className="i2-checkout__plan-name">JuridIA {plan.name}</h3>
                <p className="i2-checkout__plan-tagline">{plan.tagline}</p>
              </div>
            </div>

            {!plan.isEnterprise && (
              <div className="i2-checkout__lines">
                <div className="i2-checkout__line">
                  <span>Preço regular</span>
                  <span className="i2-checkout__line-old">
                    R$ {plan.originalPrice}
                  </span>
                </div>
                <div className="i2-checkout__line">
                  <span>Desconto de lançamento</span>
                  <span className="i2-checkout__line-discount">−12 meses</span>
                </div>
                <div className="i2-checkout__line">
                  <span>Cobrança hoje</span>
                  <span>R$ {plan.promoPrice}</span>
                </div>
              </div>
            )}

            <div className="i2-checkout__total">
              <span>Total</span>
              <span className="i2-checkout__total-value">
                {totalLabel}
                {!plan.isEnterprise && (
                  <small>{plan.priceSuffix}</small>
                )}
              </span>
            </div>

            <ul className="i2-checkout__features">
              {plan.features.map((f) => (
                <li key={f}>
                  <span className="i2-checkout__check">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="i2-checkout__badges">
              <span>
                <ShieldCheck size={12} strokeWidth={2.25} />
                SSL 256-bit
              </span>
              <span>
                <Lock size={12} strokeWidth={2.25} />
                PCI-DSS
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
