"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "lib/analytics";
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  LogIn,
  Briefcase,
  ShieldCheck,
  Scale,
  Gavel,
  Landmark,
  Building2,
  HeartHandshake,
  Users,
  Cpu,
  FileCheck,
  Mic,
  type LucideIcon,
} from "lucide-react";

type DropdownItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

const AREAS: DropdownItem[] = [
  {
    label: "Trabalhista",
    href: "/institucional-2/trabalhista",
    description: "CLT, reclamações e cálculos",
    icon: Briefcase,
  },
  {
    label: "Previdenciário",
    href: "/institucional-2/previdenciario",
    description: "INSS, benefícios e revisões",
    icon: ShieldCheck,
  },
  {
    label: "Cível",
    href: "/institucional-2/civel",
    description: "Contratos e responsabilidade",
    icon: Scale,
  },
  {
    label: "Penal",
    href: "/institucional-2/penal",
    description: "Defesa e processo penal",
    icon: Gavel,
  },
  {
    label: "Tributário",
    href: "/institucional-2/tributario",
    description: "Execuções e planejamento",
    icon: Landmark,
  },
  {
    label: "Empresarial",
    href: "/institucional-2/empresarial",
    description: "Societário e contratos",
    icon: Building2,
  },
  {
    label: "Família",
    href: "/institucional-2/familia",
    description: "Divórcios, guarda e alimentos",
    icon: HeartHandshake,
  },
  {
    label: "Consumidor",
    href: "/institucional-2/consumidor",
    description: "CDC e relações de consumo",
    icon: Users,
  },
];

const TECH: DropdownItem[] = [
  {
    label: "Inteligência Artificial",
    href: "#inteligencia-artificial",
    description: "IA jurídica treinada no direito brasileiro",
    icon: Cpu,
  },
  {
    label: "Compliance",
    href: "#compliance",
    description: "LGPD, segurança e auditoria",
    icon: FileCheck,
  },
];

type NavbarProps = {
  showAnnounce?: boolean;
};

export function Navbar({ showAnnounce = true }: NavbarProps = {}) {
  return (
    <>
      {showAnnounce && (
        <div className="i2-announce" role="region" aria-label="Novidade">
          <div className="i2-announce__inner">
            <span className="i2-announce__pill">
              <Sparkles size={12} strokeWidth={2.5} />
              Lançamento
            </span>
            <span className="i2-announce__text">
              <Mic size={13} strokeWidth={2.25} />
              Advogados que querem gravadores inteligentes
            </span>
            <a href="#voice" className="i2-announce__cta">
              <span className="i2-hide-sm">Saiba mais</span>
              <span className="i2-show-sm">Acesse</span>
              <ArrowRight size={13} strokeWidth={2.25} />
            </a>
          </div>
        </div>
      )}

      <header className="i2-navbar">
        <div className="i2-navbar__inner">
          <Link href="/institucional-2" className="i2-navbar__brand">
            <Image
              src="/images/logo/logo-white.png"
              alt="JuridIA"
              width={160}
              height={40}
              className="i2-navbar__brand-logo"
              priority
            />
          </Link>

          <nav className="i2-navbar__links" aria-label="Navegação principal">
            <a href="#chat" className="i2-navbar__link">
              Produto
            </a>

            <div className="i2-navbar__item">
              <button type="button" className="i2-navbar__link i2-navbar__link--trigger">
                Tecnologia
                <ChevronDown size={14} strokeWidth={2.25} />
              </button>
              <div className="i2-navbar__dropdown i2-navbar__dropdown--sm" role="menu">
                <div className="i2-navbar__dropdown-inner">
                  {TECH.map(({ label, href, description, icon: Icon }) => (
                    <a key={href} href={href} className="i2-navbar__dropdown-item" role="menuitem">
                      <span className="i2-navbar__dropdown-icon">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      <span className="i2-navbar__dropdown-text">
                        <span className="i2-navbar__dropdown-label">{label}</span>
                        <span className="i2-navbar__dropdown-desc">{description}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Link de Preços — religar junto com SHOW_PRICING em page.tsx */}
            {/* <a href="#precos" className="i2-navbar__link">Preços</a> */}

            <a href="#faq" className="i2-navbar__link">
              FAQ
            </a>

            <div className="i2-navbar__item">
              <button type="button" className="i2-navbar__link i2-navbar__link--trigger">
                Áreas do Direito
                <ChevronDown size={14} strokeWidth={2.25} />
              </button>
              <div className="i2-navbar__dropdown i2-navbar__dropdown--lg" role="menu">
                <div className="i2-navbar__dropdown-inner i2-navbar__dropdown-inner--grid">
                  {AREAS.map(({ label, href, description, icon: Icon }) => (
                    <Link key={href} href={href} className="i2-navbar__dropdown-item" role="menuitem">
                      <span className="i2-navbar__dropdown-icon">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      <span className="i2-navbar__dropdown-text">
                        <span className="i2-navbar__dropdown-label">{label}</span>
                        <span className="i2-navbar__dropdown-desc">{description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="i2-navbar__actions">
            <Link
              href="/sign-in"
              className="i2-navbar__login"
              onClick={() =>
                track("PageView", {
                  source: "navbar_login",
                  content_name: "login_click",
                })
              }
            >
              Entrar
              <LogIn size={14} strokeWidth={2.25} />
            </Link>
            <Link href="/contratar" className="i2-navbar__cta">
              <span className="i2-hide-sm">Contratar agora</span>
              <span className="i2-show-sm">Contratar</span>
              <ArrowUpRight size={15} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
