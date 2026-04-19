"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "lib/analytics";
import {
  Home,
  Mic,
  MessageSquare,
  LogIn,
  Scale,
  Briefcase,
  ShieldCheck,
  Gavel,
  Landmark,
  Building2,
  HeartHandshake,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

const APP_URL = "https://app.juridia.com.br";

type Area = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

const AREAS: Area[] = [
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

export function MobileToolbar() {
  const [hidden, setHidden] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!areasOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAreasOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [areasOpen]);

  return (
    <>
      <nav
        className={`i2-mtoolbar ${hidden ? "is-hidden" : ""}`}
        aria-label="Navegação mobile"
      >
        <Link href="/institucional-2" className="i2-mtoolbar__item">
          <Home size={18} strokeWidth={2} />
          <span>Home</span>
        </Link>
        <a href="/institucional-2#voice" className="i2-mtoolbar__item">
          <Mic size={18} strokeWidth={2} />
          <span>Voice</span>
        </a>
        <a href="/institucional-2#chat" className="i2-mtoolbar__item">
          <MessageSquare size={18} strokeWidth={2} />
          <span>Chat</span>
        </a>
        <button
          type="button"
          onClick={() => setAreasOpen(true)}
          className="i2-mtoolbar__item"
          aria-haspopup="dialog"
          aria-expanded={areasOpen}
          aria-controls="i2-areas-drawer"
        >
          <Scale size={18} strokeWidth={2} />
          <span>Áreas</span>
        </button>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="i2-mtoolbar__item i2-mtoolbar__item--login"
          onClick={() =>
            track("PageView", {
              source: "mobile_toolbar_login",
              content_name: "login_click",
            })
          }
        >
          <LogIn size={18} strokeWidth={2} />
          <span>Login</span>
        </a>
      </nav>

      <div
        id="i2-areas-drawer"
        className={`i2-drawer ${areasOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Áreas do Direito"
        aria-hidden={!areasOpen}
      >
        <button
          type="button"
          className="i2-drawer__backdrop"
          aria-label="Fechar"
          tabIndex={areasOpen ? 0 : -1}
          onClick={() => setAreasOpen(false)}
        />
        <aside className="i2-drawer__panel">
          <header className="i2-drawer__header">
            <div className="i2-drawer__heading">
              <span className="i2-drawer__eyebrow">Navegação</span>
              <h2 className="i2-drawer__title">Áreas do Direito</h2>
            </div>
            <button
              type="button"
              className="i2-drawer__close"
              aria-label="Fechar menu"
              onClick={() => setAreasOpen(false)}
            >
              <X size={20} strokeWidth={2.25} />
            </button>
          </header>
          <nav className="i2-drawer__list" aria-label="Áreas do Direito">
            {AREAS.map(({ label, href, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="i2-drawer__item"
                onClick={() => setAreasOpen(false)}
              >
                <span className="i2-drawer__icon">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="i2-drawer__text">
                  <span className="i2-drawer__label">{label}</span>
                  <span className="i2-drawer__desc">{description}</span>
                </span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
