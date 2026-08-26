"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { featureHref, voice } from "../../lib/features";
import { Reveal } from "../ui/Motion";

/** Bloco escuro cinematográfico: quebra o creme e dá respiro à página. */
export function VoiceShowcase() {
  return (
    <section className="v3-section" style={{ paddingTop: 0 }}>
      <div className="v3-wrap">
        <Reveal>
          <div className="v3-dark" style={{ padding: "clamp(40px, 6vw, 72px)" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
                gap: "clamp(32px, 5vw, 60px)",
                alignItems: "center",
              }}
              className="v3-voice__grid"
            >
              <div>
                <span className="v3-eyebrow">Jurid.IA Voice</span>

                <h2
                  className="v3-h2"
                  style={{ margin: "20px 0 20px", color: "var(--snow)" }}
                >
                  Você passa o dia falando.
                  <br />
                  Tudo isso está{" "}
                  <span className="v3-accent">evaporando</span>.
                </h2>

                <p className="v3-lead">
                  Grava a reunião — presencial pelo app ou online no Meet, Zoom
                  e Teams —, transcreve com os participantes identificados e
                  devolve o resumo em PDF no mesmo dia.
                </p>

                <Link
                  href={featureHref("voice")}
                  className="v3-btn v3-btn--gold"
                  style={{ marginTop: 32 }}
                >
                  Conhecer a Voice
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </Link>
              </div>

              <div className="v3-video" style={{ boxShadow: "none" }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  style={{ aspectRatio: "16 / 10" }}
                >
                  <source src="/videos/juridia-demo-voice.mp4" type="video/mp4" />
                </video>
                <span className="v3-video__caption">
                  <span className="v3-video__live" aria-hidden />
                  Gravando
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
