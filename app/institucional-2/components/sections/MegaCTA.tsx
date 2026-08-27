"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Scale, Sparkles, Check } from "lucide-react";
import { track } from "lib/analytics";

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Estou+no+site+da+Jurid+IA+e+gostaria+de+conhecer+mais+sobre+os+servi%C3%A7os.&type=phone_number&app_absent=0";

const BENEFITS = [
  "Sem cartão de crédito",
  "4 dias de teste grátis",
  "Cancele quando quiser",
];

const NODES: { top: string; left: string; delay: string; size: number }[] = [
  { top: "8%", left: "6%", delay: "0s", size: 10 },
  { top: "22%", left: "86%", delay: "0.6s", size: 8 },
  { top: "58%", left: "4%", delay: "1.1s", size: 12 },
  { top: "78%", left: "78%", delay: "1.6s", size: 9 },
  { top: "40%", left: "92%", delay: "2.1s", size: 7 },
  { top: "90%", left: "30%", delay: "2.6s", size: 8 },
];

export function MegaCTA() {
  return (
    <section className="i2-megacta" id="comecar">
      <div className="i2-container">
        <div className="i2-megacta__frame">
          <div className="i2-megacta__glow" aria-hidden="true" />
          <div className="i2-megacta__grid-pattern" aria-hidden="true" />

          <div className="i2-megacta__grid">
            {/* ---- 3D Visual ---- */}
            <div className="i2-megacta__visual" aria-hidden="true">
              <div className="i2-megacta__scene">
                <div className="i2-megacta__nodes">
                  {NODES.map((n, i) => (
                    <span
                      key={i}
                      className="i2-megacta__node"
                      style={{
                        top: n.top,
                        left: n.left,
                        width: n.size,
                        height: n.size,
                        animationDelay: n.delay,
                      }}
                    />
                  ))}
                </div>

                <svg
                  className="i2-megacta__wires"
                  viewBox="0 0 400 460"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M30 50 Q 140 120 200 160"
                    stroke="rgba(201,165,124,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                  <path
                    d="M370 90 Q 280 160 220 180"
                    stroke="rgba(201,165,124,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                  <path
                    d="M20 280 Q 120 300 200 280"
                    stroke="rgba(201,165,124,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                  <path
                    d="M380 340 Q 280 360 220 340"
                    stroke="rgba(201,165,124,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                </svg>

                <div className="i2-megacta__card-stack">
                  <div className="i2-megacta__card i2-megacta__card--back" />
                  <div className="i2-megacta__card i2-megacta__card--mid" />
                  <div className="i2-megacta__card i2-megacta__card--front">
                    <div className="i2-megacta__doc-header">
                      <span className="i2-megacta__doc-seal">
                        <Scale size={18} strokeWidth={2} />
                      </span>
                      <div className="i2-megacta__doc-heading">
                        <span className="i2-megacta__doc-title-line" />
                        <span className="i2-megacta__doc-subtitle-line" />
                      </div>
                    </div>

                    <div className="i2-megacta__doc-lines">
                      <span />
                      <span />
                      <span className="i2-megacta__doc-line--short" />
                      <span />
                      <span />
                      <span className="i2-megacta__doc-line--short" />
                      <span />
                    </div>

                    <div className="i2-megacta__doc-chip">
                      <Sparkles size={12} strokeWidth={2.5} />
                      Powered by Jurid IA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Content ---- */}
            <div className="i2-megacta__content">
              <span className="i2-megacta__eyebrow">
                <span className="i2-megacta__eyebrow-dot" />
                Pronto para começar
              </span>

              <h2 className="i2-megacta__title">
                Transforme sua advocacia com{" "}
                <span className="i2-megacta__title-gold">
                  inteligência artificial
                </span>
              </h2>

              <p className="i2-megacta__subtitle">
                Junte-se a mais de 4.5 mil advogados que já estão economizando
                horas por dia e aumentando sua produtividade com a JuridIA.
              </p>

              <div className="i2-megacta__buttons">
                <Link
                  href="#experimente"
                  className="i2-megacta__btn-primary"
                  data-lp-cta="megacta-comecar"
                >
                  <span className="i2-hide-sm">Começar Gratuitamente</span>
                  <span className="i2-show-sm">Começar agora</span>
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="i2-megacta__btn-ghost"
                  onClick={() =>
                    track("Lead", {
                      source: "megacta_whatsapp",
                      content_name: "whatsapp_megacta_especialista",
                    })
                  }
                >
                  <MessageCircle size={16} strokeWidth={2.25} />
                  <span className="i2-hide-sm">Falar com Especialista</span>
                  <span className="i2-show-sm">Falar conosco</span>
                </a>
              </div>

              <hr className="i2-megacta__divider" />

              <ul className="i2-megacta__benefits" role="list">
                {BENEFITS.map((b) => (
                  <li key={b} className="i2-megacta__benefit">
                    <span className="i2-megacta__benefit-check">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
