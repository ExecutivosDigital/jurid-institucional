"use client";

import {
  Building2,
  Check,
  Crown,
  Loader2,
  Sparkles,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { HUB_PLAN_CODES } from "lib/hub-checkout";
import type { PlanLevel } from "types/global";

type TierKey = "individual" | "escritorio" | "enterprise" | "teste";

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
  backendPlanLevel?: PlanLevel;
};

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Gostaria+de+falar+com+um+humano+sobre+a+JuridIA.&type=phone_number&app_absent=0";

/**
 * O CTA leva DIRETO ao /checkout do próprio site (o checkout da VSL portado
 * para cá, motor do Hub) já com o plano selecionado. O redirect legado para o
 * app (sign-in?register) saiu em 27/08/2026 junto com o backend antigo.
 */
const CHECKOUT_HREF: Partial<Record<TierKey, string>> = {
  individual: `/checkout?plano=${HUB_PLAN_CODES.individual}`,
  escritorio: `/checkout?plano=${HUB_PLAN_CODES.escritorio}`,
  teste: `/checkout?plano=${HUB_PLAN_CODES.teste}`,
};

/**
 * Oferta de TESTE (R$ 6) — só aparece quando a URL traz o apelido obscuro
 * (`/contratar?plano=t6pix-…`, mesmo código da VSL). É vitrine condicional:
 * quem fecha a porta de verdade é o preço ativo/inativo no catálogo do Hub.
 */
const TIER_TESTE: Tier = {
  key: "teste",
  name: "Teste (R$ 6)",
  tagline: "Oferta interna para validar o fluxo de ponta a ponta",
  icon: Zap,
  originalPrice: "6,00",
  promoPrice: "6,00",
  priceSuffix: "/mês",
  promoBadge: "Somente testes",
  promoNote: "Compra real — acesso entregue por e-mail",
  cta: "Comprar teste",
  features: [
    "Compra real de ponta a ponta",
    "Pix Automático ou cartão",
    "Acesso entregue por e-mail",
    "Só aparece com o código na URL",
  ],
};

const TIERS: Tier[] = [
  {
    key: "individual",
    name: "Individual",
    tagline: "Para o advogado autônomo começar agora",
    icon: User,
    originalPrice: "169,90",
    promoPrice: "169,90",
    priceSuffix: "/mês",
    promoBadge: "Plano mensal",
    promoNote: "Cobrado mensalmente · cancele quando quiser",
    cta: "Começar agora",
    backendPlanLevel: "SOLO",
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
    promoPrice: "199,90",
    priceSuffix: "/mês",
    promoBadge: "Plano mensal",
    promoNote: "Cobrado mensalmente · cancele quando quiser",
    featured: true,
    cta: "Começar agora",
    backendPlanLevel: "PRO",
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
  const loadingPlans = false; // planos fixos — nada a buscar no backend

  /* Revelação da oferta de teste: lida no browser (useEffect) porque a página
     é server-rendered — a URL só existe do lado de cá. */
  const [mostrarTeste, setMostrarTeste] = useState(false);
  useEffect(() => {
    const pedido = new URLSearchParams(window.location.search).get("plano");
    setMostrarTeste(pedido === HUB_PLAN_CODES.teste);
  }, []);

  const tiers = useMemo(
    () =>
      mostrarTeste
        ? [...TIERS.slice(0, 2), TIER_TESTE, ...TIERS.slice(2)]
        : TIERS,
    [mostrarTeste],
  );

  const resolveHref = (tier: Tier): string | null =>
    CHECKOUT_HREF[tier.key] ?? null;

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
            Escolha o plano que melhor se encaixa na sua rotina. Cancele quando
            quiser.
          </p>
        </div>

        <div className="i2-pricing__grid">
          {tiers.map((tier) => {
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

                {!tier.isEnterprise &&
                  tier.originalPrice !== tier.promoPrice && (
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
                ) : (() => {
                  const href = resolveHref(tier);
                  const ctaClass = `i2-pricing__cta${
                    isFeatured
                      ? " i2-pricing__cta--primary"
                      : " i2-pricing__cta--ghost"
                  }`;
                  if (!href) {
                    return (
                      <button
                        type="button"
                        disabled
                        aria-busy={loadingPlans}
                        className={ctaClass}
                        style={{ opacity: 0.65, cursor: "not-allowed" }}
                      >
                        {loadingPlans ? (
                          <Loader2
                            size={16}
                            className="animate-spin"
                            style={{ display: "inline-block" }}
                          />
                        ) : (
                          "Indisponível"
                        )}
                      </button>
                    );
                  }
                  return (
                    // destino interno (/checkout) — mesma aba, sem _blank
                    <a href={href} className={ctaClass} data-lp-cta={`contratar-${tier.key}`}>
                      {tier.cta}
                    </a>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
