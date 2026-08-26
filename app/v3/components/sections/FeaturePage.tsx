"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import {
  allFeatures,
  featureHref,
  featureOrder,
  findFeature,
  hints,
} from "../../lib/features";
import { Mockup } from "../mockups/Mockups";
import { Reveal, Stagger, staggerItem } from "../ui/Motion";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/** Vizinhos na ordem canônica, com volta ao começo. */
function neighbours(id: string) {
  const i = featureOrder.indexOf(id);
  const total = featureOrder.length;
  const prev = allFeatures[(i - 1 + total) % total];
  const next = allFeatures[(i + 1) % total];
  return { prev, next };
}

export function FeaturePage({ slug }: { slug: string }) {
  const feature = findFeature(slug);
  if (!feature) return null;

  const { prev, next } = neighbours(feature.id);
  const Icon = feature.icon;

  return (
    <>
      {/* O hero desta página também é escuro — a nav segue transparente
          no topo e vira creme depois que o creme começa. */}
      <Nav />

      <main>
        <header className="v3-fhero">
          <div className="v3-fhero__glow" aria-hidden />

          <div className="v3-wrap v3-fhero__inner">
            <Reveal>
              <span className="v3-eyebrow">
                <Icon size={14} strokeWidth={2.2} />
                {feature.tab}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="v3-display v3-fhero__title">{feature.title}</h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="v3-fhero__anchor">“{feature.anchor}”</p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="v3-lead" style={{ maxWidth: "60ch" }}>
                {feature.lead}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="v3-fhero__chips">
                {feature.proof.map((p) => (
                  <span className="v3-chip v3-chip--dark" key={p}>
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </header>

        {/* Visual do produto */}
        <section className="v3-section" style={{ paddingBottom: 0 }}>
          <div className="v3-wrap">
            <Reveal>
              <div style={{ maxWidth: 940, margin: "0 auto" }}>
                <Mockup kind={feature.mockup} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Dor → solução */}
        <section className="v3-section">
          <div className="v3-wrap">
            <div style={{ maxWidth: 560, marginBottom: 40 }}>
              <Reveal>
                <span className="v3-eyebrow">O que muda na sua rotina</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="v3-h2" style={{ marginTop: 20 }}>
                  De onde dói para{" "}
                  <span className="v3-accent">onde resolve</span>.
                </h2>
              </Reveal>
            </div>

            <Stagger className="v3-pains" step={0.07}>
              {feature.pains.map((p) => (
                <motion.div className="v3-pain" key={p.pain} variants={staggerItem}>
                  <span className="v3-pain__from">“{p.pain}”</span>
                  <MoveRight size={18} className="v3-pain__arrow" aria-hidden />
                  <span className="v3-pain__to">{p.fix}</span>
                </motion.div>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <div className="v3-metric" style={{ marginTop: 48 }}>
                <span className="v3-metric__value">{feature.metric.value}</span>
                <span className="v3-metric__label">{feature.metric.label}</span>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 40,
                }}
              >
                <Link href="/contratar" className="v3-btn v3-btn--ink">
                  Quero isso no meu escritório
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>
                <Link href="/v3#plataforma" className="v3-btn v3-btn--outline">
                  Ver todas as ferramentas
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Anterior / próxima */}
        <section className="v3-section" style={{ paddingTop: 0 }}>
          <div className="v3-wrap">
            <div className="v3-pager">
              <Link href={featureHref(prev.id)} className="v3-pager__link">
                <span className="v3-pager__dir">
                  <ArrowLeft
                    size={11}
                    strokeWidth={2.5}
                    style={{ display: "inline", marginRight: 5 }}
                  />
                  Anterior
                </span>
                <span className="v3-pager__name">{prev.tab}</span>
                <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                  {hints[prev.id]}
                </span>
              </Link>

              <Link
                href={featureHref(next.id)}
                className="v3-pager__link"
                style={{ textAlign: "right" }}
              >
                <span className="v3-pager__dir">
                  Próxima
                  <ArrowRight
                    size={11}
                    strokeWidth={2.5}
                    style={{ display: "inline", marginLeft: 5 }}
                  />
                </span>
                <span className="v3-pager__name">{next.tab}</span>
                <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                  {hints[next.id]}
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
