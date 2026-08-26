"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../ui/Motion";

export function FinalCTA() {
  return (
    <section className="v3-section" style={{ paddingTop: 0 }}>
      <div className="v3-wrap">
        <Reveal>
          <div className="v3-dark v3-cta">
            <div className="v3-cta__glow" aria-hidden />

            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="v3-eyebrow">Comece hoje</span>

              <h2 className="v3-display v3-cta__title">
                Um dia inteiro de trabalho em{" "}
                <span className="v3-accent">um minuto</span>
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 34,
                }}
              >
                <Link href="/contratar" className="v3-btn v3-btn--gold">
                  Contratar agora
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>
                <a
                  href="https://app.juridia.com.br/sign-in?register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-btn v3-btn--glass"
                >
                  Já sou cliente
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
