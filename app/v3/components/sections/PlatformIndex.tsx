"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { allFeatures, featureHref, hints } from "../../lib/features";
import { Reveal, Stagger, staggerItem } from "../ui/Motion";

/**
 * Índice da plataforma. Cada funcionalidade é uma porta para a própria
 * página — nada de explicar tudo aqui.
 */
export function PlatformIndex() {
  return (
    <section className="v3-section" id="plataforma">
      <div className="v3-wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <Reveal>
              <span className="v3-eyebrow">A plataforma</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="v3-h2" style={{ marginTop: 20 }}>
                Dezesseis ferramentas.
                <br />
                <span className="v3-accent">Uma única cabeça.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <p className="v3-lead" style={{ maxWidth: "38ch" }}>
              Abra qualquer uma para ver o que ela resolve na sua rotina.
            </p>
          </Reveal>
        </div>

        <Stagger className="v3-index" step={0.04}>
          {allFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.id} variants={staggerItem}>
                <Link href={featureHref(f.id)} className="v3-index__item">
                  <span className="v3-index__icon">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <span className="v3-index__name">{f.tab}</span>
                  <span className="v3-index__hint">{hints[f.id]}</span>
                  <span className="v3-index__go">
                    Ver
                    <ArrowUpRight size={13} strokeWidth={2.4} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
