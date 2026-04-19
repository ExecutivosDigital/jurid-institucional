"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "lib/analytics";
import {
  Check,
  Sparkles,
  MessageSquare,
  Mic,
  Layers,
  type LucideIcon,
} from "lucide-react";

type TierKey = "solo" | "pro" | "enterprise";
type BillingKey = "monthly" | "yearly";

type Tier = {
  key: TierKey;
  label: string;
  monthly: number | null;
  features: string[];
};

type Product = {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  featured?: boolean;
  tiers: Tier[];
};

const YEARLY_DISCOUNT = 0.164;

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Gostaria+de+falar+com+um+humano+sobre+a+JuridIA.&type=phone_number&app_absent=0";

const PRODUCTS: Product[] = [
  {
    id: "chat",
    name: "JuridIA Chat",
    tagline: "IA jurídica treinada no direito brasileiro",
    icon: MessageSquare,
    tiers: [
      {
        key: "solo",
        label: "Solo",
        monthly: 97,
        features: [
          "1 usuário",
          "Chat ilimitado com IA",
          "4 modelos de IA",
          "Biblioteca jurídica completa",
          "Upload de documentos",
        ],
      },
      {
        key: "pro",
        label: "Pro",
        monthly: 197,
        features: [
          "Até 5 advogados",
          "Tudo do Solo +",
          "Prioridade nos modelos de IA",
          "Análise avançada de documentos",
          "Suporte prioritário",
        ],
      },
      {
        key: "enterprise",
        label: "Enterprise",
        monthly: null,
        features: [
          "Usuários ilimitados",
          "API dedicada",
          "Treinamento personalizado",
          "SLA garantido",
          "Gerente de conta",
        ],
      },
    ],
  },
  {
    id: "ecossistema",
    name: "Ecossistema JuridIA",
    tagline: "Chat + Voice integrados num só ambiente",
    icon: Layers,
    featured: true,
    tiers: [
      {
        key: "solo",
        label: "Solo",
        monthly: 197,
        features: [
          "Tudo do Chat Solo",
          "Tudo do Voice Solo",
          "Histórico unificado",
          "Export integrado",
          "Economize ~12% no bundle",
        ],
      },
      {
        key: "pro",
        label: "Pro",
        monthly: 347,
        features: [
          "Tudo do Chat Pro",
          "Tudo do Voice Pro",
          "Fluxos Chat ↔ Voice",
          "Painel unificado",
          "Economize ~22% no bundle",
        ],
      },
      {
        key: "enterprise",
        label: "Enterprise",
        monthly: null,
        features: [
          "Chat + Voice Enterprise",
          "Onboarding dedicado",
          "Integrações sob medida",
          "SLA + gerente de conta",
          "Multi-escritório",
        ],
      },
    ],
  },
  {
    id: "voice",
    name: "JuridIA Voice",
    tagline: "Grave, transcreva e vire ata automaticamente",
    icon: Mic,
    tiers: [
      {
        key: "solo",
        label: "Solo",
        monthly: 127,
        features: [
          "1 usuário",
          "10h de gravação/mês",
          "Transcrição em tempo real",
          "Resumos executivos",
          "Export em texto e PDF",
        ],
      },
      {
        key: "pro",
        label: "Pro",
        monthly: 247,
        features: [
          "Até 5 advogados",
          "40h de gravação/mês",
          "Tudo do Solo +",
          "Atas e memorandos prontos",
          "Suporte prioritário",
        ],
      },
      {
        key: "enterprise",
        label: "Enterprise",
        monthly: null,
        features: [
          "Horas ilimitadas",
          "Usuários ilimitados",
          "API dedicada",
          "On-premise opcional",
          "SLA garantido",
        ],
      },
    ],
  },
];

function formatPrice(monthly: number, billing: BillingKey): string {
  const value =
    billing === "yearly" ? monthly * (1 - YEARLY_DISCOUNT) : monthly;
  return Math.round(value).toString();
}

export function PricingSection() {
  const [billing, setBilling] = useState<BillingKey>("yearly");
  const [selectedTiers, setSelectedTiers] = useState<Record<string, TierKey>>({
    chat: "pro",
    ecossistema: "pro",
    voice: "pro",
  });

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
            Três produtos, três planos cada. Comece pequeno e cresça quando seu
            escritório precisar.
          </p>

          <div
            className="i2-pricing__billing"
            role="tablist"
            aria-label="Ciclo de cobrança"
          >
            <button
              type="button"
              role="tab"
              aria-selected={billing === "monthly"}
              className={`i2-pricing__billing-btn${
                billing === "monthly" ? " is-active" : ""
              }`}
              onClick={() => setBilling("monthly")}
            >
              Mensal
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billing === "yearly"}
              className={`i2-pricing__billing-btn${
                billing === "yearly" ? " is-active" : ""
              }`}
              onClick={() => setBilling("yearly")}
            >
              Anual
              <span className="i2-pricing__billing-badge">−16,4%</span>
            </button>
          </div>
        </div>

        <div className="i2-pricing__grid">
          {PRODUCTS.map((product) => {
            const ProductIcon = product.icon;
            const currentTier = product.tiers.find(
              (t) => t.key === selectedTiers[product.id]
            )!;
            const isEnterprise = currentTier.monthly === null;
            const isFeatured = Boolean(product.featured);

            return (
              <div
                key={product.id}
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
                    <ProductIcon size={20} strokeWidth={2} />
                  </span>
                  <div className="i2-pricing__card-heading">
                    <h3 className="i2-pricing__card-name">{product.name}</h3>
                    <p className="i2-pricing__card-tagline">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div
                  className="i2-pricing__tiers"
                  role="tablist"
                  aria-label={`Planos de ${product.name}`}
                >
                  {product.tiers.map((tier) => {
                    const active = selectedTiers[product.id] === tier.key;
                    return (
                      <button
                        key={tier.key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        className={`i2-pricing__tier-btn${
                          active ? " is-active" : ""
                        }`}
                        onClick={() =>
                          setSelectedTiers((prev) => ({
                            ...prev,
                            [product.id]: tier.key,
                          }))
                        }
                      >
                        {tier.label}
                      </button>
                    );
                  })}
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
                        {formatPrice(currentTier.monthly!, billing)}
                      </span>
                      <span className="i2-pricing__price-suffix">/mês</span>
                    </>
                  )}
                </div>
                <span className="i2-pricing__price-note">
                  {isEnterprise
                    ? "Plano sob medida para o seu escritório"
                    : billing === "yearly"
                    ? "Cobrado anualmente · economia de 16,4%"
                    : "Cobrado mensalmente · cancele quando quiser"}
                </span>

                <ul className="i2-pricing__features" role="list">
                  {currentTier.features.map((feature) => (
                    <li key={feature} className="i2-pricing__feature">
                      <span className="i2-pricing__feature-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isEnterprise ? (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`i2-pricing__cta${
                      isFeatured
                        ? " i2-pricing__cta--primary"
                        : " i2-pricing__cta--ghost"
                    }`}
                    onClick={() =>
                      track("Lead", {
                        source: "pricing_enterprise_whatsapp",
                        content_name: "whatsapp_pricing_enterprise",
                        product: product.id,
                      })
                    }
                  >
                    Falar no WhatsApp
                  </a>
                ) : (
                  <Link
                    href={`/plans?product=${product.id}&tier=${currentTier.key}&billing=${billing}`}
                    className={`i2-pricing__cta${
                      isFeatured
                        ? " i2-pricing__cta--primary"
                        : " i2-pricing__cta--ghost"
                    }`}
                  >
                    Começar agora
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
