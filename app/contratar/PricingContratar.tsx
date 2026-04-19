"use client";

import Link from "next/link";
import {
  Check,
  Sparkles,
  User,
  Building2,
  Crown,
  type LucideIcon,
} from "lucide-react";

type TierKey = "individual" | "escritorio" | "enterprise";

type Tier = {
  key: TierKey;
  name: string;
  tagline: string;
  icon: LucideIcon;
  originalPrice: string;
  promoPrice: string;
  priceSuffix: string;
  promoBadge: string;
  promoNote: string;
  featured?: boolean;
  features: string[];
  cta: string;
  isEnterprise?: boolean;
};

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Gostaria+de+falar+com+um+humano+sobre+a+JuridIA.&type=phone_number&app_absent=0";

const TIERS: Tier[] = [
  {
    key: "individual",
    name: "Individual",
    tagline: "Para o advogado autônomo começar agora",
    icon: User,
    originalPrice: "129,90",
    promoPrice: "99,99",
    priceSuffix: "/mês",
    promoBadge: "Oferta de lançamento",
    promoNote: "Nos primeiros 12 meses · depois R$ 129,90/mês",
    cta: "Começar agora",
    features: [
      "1 usuário",
      "Chat ilimitado com IA",
      "4 modelos de IA",
      "Biblioteca jurídica completa",
      "Upload de documentos",
    ],
  },
  {
    key: "escritorio",
    name: "Escritório",
    tagline: "Para equipes que querem escalar a rotina jurídica",
    icon: Building2,
    originalPrice: "199,90",
    promoPrice: "149,99",
    priceSuffix: "/mês",
    promoBadge: "Oferta de lançamento",
    promoNote: "Nos primeiros 12 meses · depois R$ 199,90/mês",
    featured: true,
    cta: "Começar agora",
    features: [
      "Até 5 advogados",
      "Tudo do Individual +",
      "Prioridade nos modelos de IA",
      "Análise avançada de documentos",
      "Suporte prioritário",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "Plano sob medida para grandes escritórios",
    icon: Crown,
    originalPrice: "4.990,00",
    promoPrice: "2.990,00",
    priceSuffix: "/mês",
    promoBadge: "Condição especial",
    promoNote: "Desconto exclusivo no primeiro ano de contrato",
    isEnterprise: true,
    cta: "Falar no WhatsApp",
    features: [
      "Usuários ilimitados",
      "API dedicada",
      "Treinamento personalizado",
      "SLA garantido",
      "Gerente de conta",
    ],
  },
];

export function PricingContratar() {
  return (
    <section className="i2-pricing i2-pricing--page" id="precos">
      <div className="i2-container">
        <div className="i2-pricing__head">
          <span className="i2-pricing__eyebrow">
            <span className="i2-pricing__eyebrow-dot" />
            Planos JuridIA Chat
          </span>
          <h2 className="i2-pricing__title">
            Escolha o plano ideal para{" "}
            <span className="i2-pricing__title-gold">
              você ou seu escritório
            </span>
          </h2>
          <p className="i2-pricing__subtitle">
            Oferta de lançamento: preços promocionais garantidos por 12 meses.
            Cancele quando quiser.
          </p>
        </div>

        <div className="i2-pricing__grid">
          {TIERS.map((tier) => {
            const TierIcon = tier.icon;
            const isFeatured = Boolean(tier.featured);

            return (
              <div
                key={tier.key}
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
                    <TierIcon size={20} strokeWidth={2} />
                  </span>
                  <div className="i2-pricing__card-heading">
                    <h3 className="i2-pricing__card-name">{tier.name}</h3>
                    <p className="i2-pricing__card-tagline">{tier.tagline}</p>
                  </div>
                </div>

                {!tier.isEnterprise && (
                  <>
                    <div className="i2-pricing__promo-badge">
                      <Sparkles size={11} strokeWidth={2.5} />
                      {tier.promoBadge}
                    </div>

                    <div className="i2-pricing__price-old">
                      <span className="i2-pricing__price-old-label">De</span>
                      <span className="i2-pricing__price-old-value">
                        R$ {tier.originalPrice}
                      </span>
                    </div>
                  </>
                )}

                <div className="i2-pricing__price">
                  {tier.isEnterprise ? (
                    <span className="i2-pricing__price-custom">
                      Sob consulta
                    </span>
                  ) : (
                    <>
                      <span className="i2-pricing__price-currency">R$</span>
                      <span className="i2-pricing__price-value">
                        {tier.promoPrice}
                      </span>
                      <span className="i2-pricing__price-suffix">
                        {tier.priceSuffix}
                      </span>
                    </>
                  )}
                </div>
                <span className="i2-pricing__price-note">
                  {tier.isEnterprise
                    ? "Plano sob medida para o seu escritório"
                    : tier.promoNote}
                </span>

                <ul className="i2-pricing__features" role="list">
                  {tier.features.map((feature) => (
                    <li key={feature} className="i2-pricing__feature">
                      <span className="i2-pricing__feature-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {tier.isEnterprise ? (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`i2-pricing__cta${
                      isFeatured
                        ? " i2-pricing__cta--primary"
                        : " i2-pricing__cta--ghost"
                    }`}
                  >
                    {tier.cta}
                  </a>
                ) : (
                  <Link
                    href={`/register-complete?plan=${tier.key}`}
                    className={`i2-pricing__cta${
                      isFeatured
                        ? " i2-pricing__cta--primary"
                        : " i2-pricing__cta--ghost"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
