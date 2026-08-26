"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { allFeatures, featureHref, hints } from "../../lib/features";
import { Mockup } from "../mockups/Mockups";
import { EASE, Reveal } from "../ui/Motion";

const DWELL_MS = 4600;

/**
 * Palco escuro: percorre as 16 funcionalidades sozinho, uma de cada vez,
 * em tamanho grande. Pausa ao passar o mouse ou ao focar pelo teclado.
 */
export function PlatformStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const feature = allFeatures[active];

  const select = useCallback((i: number) => {
    setActive(i);
  }, []);

  // Avanço automático — a vitrine se apresenta sem exigir interação.
  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % allFeatures.length),
      DWELL_MS
    );
    return () => clearTimeout(id);
  }, [active, paused, reduced]);

  // Mantém o item ativo visível quando o trilho rola (mobile).
  useEffect(() => {
    const rail = railRef.current;
    const item = rail?.querySelector<HTMLElement>('[data-active="true"]');
    if (!rail || !item) return;
    item.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i + 1) % allFeatures.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i - 1 + allFeatures.length) % allFeatures.length);
    }
  };

  return (
    <section className="v3-section" id="plataforma">
      <div className="v3-wrap">
        <Reveal>
          <div
            className="v3-dark v3-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="v3-stage__glow" aria-hidden />

            <div className="v3-stage__head">
              <span className="v3-eyebrow">A plataforma</span>
              <h2 className="v3-h2 v3-stage__title">
                Dezesseis ferramentas.
                <br />
                <span className="v3-accent">Uma única cabeça.</span>
              </h2>
            </div>

            <div className="v3-stage__body">
              {/* Trilho numerado */}
              <div
                className="v3-stage__rail"
                ref={railRef}
                role="tablist"
                aria-orientation="vertical"
                aria-label="Funcionalidades da plataforma"
                onKeyDown={onKeyDown}
              >
                {allFeatures.map((f, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      tabIndex={on ? 0 : -1}
                      data-active={on}
                      className="v3-stage__item"
                      onClick={() => select(i)}
                      onMouseEnter={() => select(i)}
                    >
                      <span className="v3-stage__idx">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="v3-stage__name">{f.tab}</span>
                      {on && (
                        <motion.span
                          layoutId="v3-stage-bar"
                          className="v3-stage__bar"
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Vitrine */}
              <div className="v3-stage__show">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feature.id}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.42, ease: EASE }}
                  >
                    <div className="v3-stage__mock">
                      <Mockup kind={feature.mockup} />
                    </div>

                    <div className="v3-stage__caption">
                      <div>
                        <h3 className="v3-stage__ftitle">{feature.title}</h3>
                        <p className="v3-stage__fhint">{hints[feature.id]}</p>
                      </div>
                      <Link
                        href={featureHref(feature.id)}
                        className="v3-btn v3-btn--gold"
                        style={{ minHeight: 46, padding: "0 22px", fontSize: 14 }}
                      >
                        Abrir
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Régua de progresso do avanço automático */}
                {!reduced && (
                  <div className="v3-stage__progress" aria-hidden>
                    <motion.span
                      key={`${feature.id}-${paused}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{
                        duration: paused ? 0 : DWELL_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
