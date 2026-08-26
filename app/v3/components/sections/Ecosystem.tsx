"use client";

import { motion } from "framer-motion";
import { ecosystem } from "../../lib/features";
import { Reveal, Stagger, staggerItem } from "../ui/Motion";

/** O ciclo fechado (ALMA §19) em versão enxuta — só os nomes e o papel. */
export function Ecosystem() {
  return (
    <section className="v3-section" id="ecossistema" style={{ paddingTop: 0 }}>
      <div className="v3-wrap">
        <div style={{ maxWidth: 620, marginBottom: 48 }}>
          <Reveal>
            <span className="v3-eyebrow">O ciclo fechado</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="v3-h2" style={{ marginTop: 20 }}>
              O valor não está na peça. Está na{" "}
              <span className="v3-accent">costura</span>.
            </h2>
          </Reveal>
        </div>

        <Stagger
          step={0.04}
          className="v3-eco-grid"
        >
          {ecosystem.map((e, i) => (
            <motion.div key={e.step} variants={staggerItem} className="v3-eco-item">
              <span className="v3-card__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="v3-eco-item__name">{e.step}</span>
              <span className="v3-eco-item__role">{e.role}</span>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p
            className="v3-display"
            style={{
              marginTop: 52,
              fontStyle: "italic",
              fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
              color: "var(--gold-ink)",
              maxWidth: 520,
            }}
          >
            E custa menos que a maioria deles isoladamente.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
