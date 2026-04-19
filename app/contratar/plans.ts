import { User, Building2, Crown, type LucideIcon } from "lucide-react";

export type PlanKey = "individual" | "escritorio" | "enterprise";

export type Plan = {
  key: PlanKey;
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
  isEnterprise?: boolean;
};

export const PLANS: Record<PlanKey, Plan> = {
  individual: {
    key: "individual",
    name: "Individual",
    tagline: "Para o advogado autônomo começar agora",
    icon: User,
    originalPrice: "117,00",
    promoPrice: "117,00",
    priceSuffix: "/mês",
    promoBadge: "Plano mensal",
    promoNote: "Cobrado mensalmente · cancele quando quiser",
    features: [
      "1 usuário",
      "Chat ilimitado com IA",
      "4 modelos de IA",
      "Biblioteca jurídica completa",
      "Upload de documentos",
    ],
  },
  escritorio: {
    key: "escritorio",
    name: "Escritório",
    tagline: "Para equipes que querem escalar a rotina jurídica",
    icon: Building2,
    originalPrice: "147,00",
    promoPrice: "147,00",
    priceSuffix: "/mês",
    promoBadge: "Plano mensal",
    promoNote: "Cobrado mensalmente · cancele quando quiser",
    featured: true,
    features: [
      "Até 5 advogados",
      "Tudo do Individual +",
      "Prioridade nos modelos de IA",
      "Análise avançada de documentos",
      "Suporte prioritário",
    ],
  },
  enterprise: {
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
    features: [
      "Usuários ilimitados",
      "API dedicada",
      "Treinamento personalizado",
      "SLA garantido",
      "Gerente de conta",
    ],
  },
};
