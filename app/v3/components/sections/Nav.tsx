"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { track } from "lib/analytics";
import { allFeatures, featureHref, hints } from "../../lib/features";
import { EASE, ScrollProgress } from "../ui/Motion";

/** Nav transparente sobre o vídeo; vira creme com blur ao rolar. */
export function Nav({ transparentOnTop = true }: { transparentOnTop?: boolean }) {
  const [stuck, setStuck] = useState(!transparentOnTop);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    if (transparentOnTop) setStuck(v > 60);
  });

  return (
    <>
      <ScrollProgress />
      <header className="v3-nav" data-stuck={stuck}>
        <div className="v3-wrap v3-nav__inner">
          <Link href="/v3" className="v3-nav__brand" aria-label="JuridIA — início">
            <Image
              src="/images/logo/logo-white.png"
              alt="JuridIA"
              width={142}
              height={36}
              className="v3-nav__logo v3-nav__logo--light"
              priority
            />
            <Image
              src="/images/logo/logo.png"
              alt=""
              aria-hidden
              width={142}
              height={36}
              className="v3-nav__logo v3-nav__logo--dark"
            />
          </Link>

          <nav className="v3-nav__links" aria-label="Navegação principal">
            <div
              className="v3-menu"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                type="button"
                className="v3-nav__link"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                onClick={() => setMenuOpen((o) => !o)}
              >
                Plataforma
                <ChevronDown
                  size={14}
                  strokeWidth={2.2}
                  style={{
                    transform: menuOpen ? "rotate(180deg)" : "none",
                    transition: "transform 260ms",
                  }}
                />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="v3-menu__panel"
                    role="menu"
                    initial={{ opacity: 0, y: -8, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -8, x: "-50%" }}
                    transition={{ duration: 0.24, ease: EASE }}
                  >
                    {allFeatures.map((f) => {
                      const Icon = f.icon;
                      return (
                        <Link
                          key={f.id}
                          href={featureHref(f.id)}
                          className="v3-menu__item"
                          role="menuitem"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="v3-menu__icon">
                            <Icon size={15} strokeWidth={2} />
                          </span>
                          <span>
                            <span className="v3-menu__label">{f.tab}</span>
                            <span className="v3-menu__desc">{hints[f.id]}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href={featureHref("voice")} className="v3-nav__link">
              Voice
            </Link>
            <Link href="/institucional-2/faq" className="v3-nav__link">
              FAQ
            </Link>
          </nav>

          <div className="v3-nav__actions">
            <a
              href="https://app.juridia.com.br/sign-in?register"
              target="_blank"
              rel="noopener noreferrer"
              className="v3-nav__btn"
              onClick={() =>
                track("PageView", {
                  source: "v3_navbar_login",
                  content_name: "login_click",
                })
              }
            >
              Entrar
            </a>
            <Link href="/contratar" className="v3-nav__btn v3-nav__btn--solid">
              Contratar
              <ArrowUpRight size={15} strokeWidth={2.3} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
