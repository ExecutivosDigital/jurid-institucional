"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  "STF · STJ · TST",
  "TRF3 · TJSP · TJRJ",
  "DataJud / CNJ",
  "DJEN — Diário de Justiça Eletrônico Nacional",
  "Séries Bacen/SGS",
  "Receita Federal · PGFN",
  "CGU — CEIS / CNEP",
  "TCU · CENPROT · INPI",
  "OFAC (EUA) · ONU",
  "Caixa — CRF do FGTS",
];

export function Marquee() {
  const reduced = useReducedMotion();
  // Duas cópias idênticas: a translação de -50% emenda sem costura visível.
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="v3-marquee" aria-hidden>
      <motion.div
        className="v3-marquee__track"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 42, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <span className="v3-marquee__item" key={`${item}-${i}`}>
            <span className="v3-marquee__dot" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
