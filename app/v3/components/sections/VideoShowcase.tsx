"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../ui/Motion";

/** O vídeo abre conforme o scroll avança — movimento preso à barra. */
export function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.4"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.9, 1]);

  return (
    <section className="v3-section" style={{ paddingTop: 0 }}>
      <div className="v3-wrap">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Reveal>
            <span className="v3-eyebrow">Em uso real</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="v3-h2" style={{ marginTop: 20 }}>
              Não é uma IA que responde.
              <br />É uma IA que <span className="v3-accent">faz</span>.
            </h2>
          </Reveal>
        </div>

        <motion.div
          ref={ref}
          className="v3-video"
          style={{ scale, maxWidth: 940, margin: "0 auto" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{ aspectRatio: "16 / 9" }}
          >
            <source src="/videos/juridia-demo-chat.mp4" type="video/mp4" />
          </video>
          <span className="v3-video__caption">
            <span className="v3-video__live" aria-hidden />
            Jurid.Ai
          </span>
        </motion.div>
      </div>
    </section>
  );
}
