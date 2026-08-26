"use client";

import { motion } from "framer-motion";
import { promises } from "../../lib/features";
import { Reveal, Stagger, staggerItem } from "../ui/Motion";

export function Promises() {
  return (
    <section className="v3-section">
      <div className="v3-wrap">
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <Reveal>
            <span className="v3-eyebrow">Três promessas</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="v3-h2" style={{ marginTop: 20 }}>
              Tempo, segurança e <span className="v3-accent">controle</span>.
            </h2>
          </Reveal>
        </div>

        <Stagger className="v3-grid-3">
          {promises.map((p, i) => (
            <motion.article className="v3-card" key={p.id} variants={staggerItem}>
              <span className="v3-card__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="v3-card__title">{p.title}</h3>
              <p className="v3-card__claim">{p.claim}</p>
              <p className="v3-card__body">{p.body}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
