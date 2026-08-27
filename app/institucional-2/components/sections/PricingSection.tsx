"use client";

import { track } from "lib/analytics";
import { HUB_PLAN_CODES } from "lib/hub-checkout";
import {
  Check,
  Sparkles,
  User,
  Building2,
  Crown,
  type LucideIcon,
} from "lucide-react";

/**
 * Preços da home — a MESMA tabela do /contratar, vendida pelo MESMO motor da
 * LP da VSL (checkout público do Hub): Individual R$ 169,90 e Escritório
 * R$ 199,90 mensais com Pix Automático ou cartão; Enterprise segue no
 * WhatsApp. A grade antiga (Chat/Voice/Ecossistema, com anual) saiu em
 * 27/08/2026 junto com o backend legado — mostrar preço que o checkout não
 * cobra era confusão garantida.
 */

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Gostaria+de+falar+com+um+humano+sobre+a+JuridIA.&type=phone_number&app_absent=0";

type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  price: string | null;
  featured?: boolean;
  features: string[];
  /** null = Enterprise (WhatsApp) */
  checkoutHref: string | null;
};

const PLANS: PricingPlan[] = [
  {
    id: "individual",
    name: "Individual",
    tagline: "Para o advogado autônomo começar agora",
    icon: User,
    price: "169,90",
    features: [
      "1 usuário",
      "Chat ilimitado com IA",
      "4 modelos de IA",
      "Biblioteca jurídica completa",
      "Upload de documentos",
    ],
    checkoutHref: `/checkout?plano=${HUB_PLAN_CODES.individual}`,
  },
  {
    id: "escritorio",
    name: "Escritório",
    tagline: "Para equipes que querem escalar a rotina jurídica",
    icon: Building2,
    price: "199,90",
    featured: true,
    features: [
      "Até 5 advogados",
      "Tudo do Individual +",
      "Prioridade nos modelos de IA",
      "Análise avançada de documentos",
      "Suporte prioritário",
    ],
    checkoutHref: `/checkout?plano=${HUB_PLAN_CODES.escritorio}`,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Plano sob medida para grandes escritórios",
    icon: Crown,
    price: null,
    features: [
      "Usuários ilimitados",
      "API dedicada",
      "Treinamento personalizado",
      "SLA garantido",
      "Gerente de conta",
    ],
    checkoutHref: null,
  },
];

export function PricingSection() {
  return (
    <section className="i2-pricing" id="precos">
      <div className="i2-container">
        <div className="i2-pricing__head">
          <span className="i2-pricing__eyebrow">
            <span className="i2-pricing__eyebrow-dot" />
            Planos
          </span>
          <h2 className="i2-pricing__title">
            Escolha como quer usar a{" "}
            <span className="i2-pricing__title-gold">JuridIA</span>
          </h2>
          <p className="i2-pricing__subtitle">
            Assinatura mensal, ativação imediata e renovação automática pelo
            Pix Automático ou cartão. Cancele quando quiser.
          </p>
        </div>

        <div className="i2-pricing__grid">
          {PLANS.map((plan) => {
            const PlanIcon = plan.icon;
            const isFeatured = Boolean(plan.featured);
            const isEnterprise = plan.price === null;

            return (
              <div
                key={plan.id}
                className={`i2-pricing__card${
                  isFeatured ? " i2-pricing__card--featured" : ""
                }`}
              >
                {isFeatured && (
                  <span className="i2-pricing__badge">
                    <Sparkles size={12} strokeWidth={2.5} />
                    Mais escolhido
                  </span>
                )}

                <div className="i2-pricing__card-head">
                  <span className="i2-pricing__card-icon">
                    <PlanIcon size={20} strokeWidth={2} />
                  </span>
                  <div className="i2-pricing__card-heading">
                    <h3 className="i2-pricing__card-name">{plan.name}</h3>
                    <p className="i2-pricing__card-tagline">{plan.tagline}</p>
                  </div>
                </div>

                <div className="i2-pricing__price">
                  {isEnterprise ? (
                    <span className="i2-pricing__price-custom">
                      Sob consulta
                    </span>
                  ) : (
                    <>
                      <span className="i2-pricing__price-currency">R$</span>
                      <span className="i2-pricing__price-value">
                        {plan.price}
                      </span>
                      <span className="i2-pricing__price-suffix">/mês</span>
                    </>
                  )}
                </div>
                <span className="i2-pricing__price-note">
                  {isEnterprise
                    ? "Plano sob medida para o seu escritório"
                    : "Cobrado mensalmente · cancele quando quiser"}
                </span>

                <ul className="i2-pricing__features" role="list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="i2-pricing__feature">
                      <span className="i2-pricing__feature-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.checkoutHref ? (
                  /* <a> comum: o destino é o checkout da VSL (outro domínio) */
                  <a
                    href={plan.checkoutHref}
                    data-lp-cta={`pricing-${plan.id}`}
                    className={`i2-pricing__cta${
                      isFeatured
                        ? " i2-pricing__cta--primary"
                        : " i2-pricing__cta--ghost"
                    }`}
                    onClick={() =>
                      track("InitiateCheckout", {
                        source: "pricing_home",
                        content_name: plan.id,
                      })
                    }
                  >
                    Assinar agora
                  </a>
                ) : (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-lp-cta="pricing-enterprise-whatsapp"
                    className={`i2-pricing__cta${
                      isFeatured
                        ? " i2-pricing__cta--primary"
                        : " i2-pricing__cta--ghost"
                    }`}
                    onClick={() =>
                      track("Lead", {
                        source: "pricing_enterprise_whatsapp",
                        content_name: "whatsapp_pricing_enterprise",
                        product: plan.id,
                      })
                    }
                  >
                    Falar no WhatsApp
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
