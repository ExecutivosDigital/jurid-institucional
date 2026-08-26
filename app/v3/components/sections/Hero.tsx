"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { EASE } from "../ui/Motion";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // O hero desvanece e recua conforme sai — mesmo gesto das referências.
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);

  return (
    <section className="v3-hero" ref={ref}>
      <motion.div className="v3-hero__media" style={{ scale: mediaScale }} aria-hidden>
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/plans-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="v3-hero__veil" aria-hidden />

      <motion.div className="v3-hero__inner" style={{ opacity: fade, y: lift }}>
        <motion.h1
          className="v3-display v3-hero__title"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        >
          Seu escritório inteiro
          <br />
          numa <span className="v3-accent">tela só</span>
        </motion.h1>

        <motion.p
          className="v3-hero__sub"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        >
          Uma inteligência artificial que sabe Direito brasileiro e opera o
          escritório com você.
        </motion.p>

        <motion.div
          className="v3-hero__cta"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          <Link href="/contratar" className="v3-btn v3-btn--gold">
            Começar agora
            <ArrowRight size={17} strokeWidth={2.2} />
          </Link>
          <a href="#plataforma" className="v3-btn v3-btn--glass">
            Ver a plataforma
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#plataforma"
        className="v3-hero__cue"
        aria-label="Rolar para a plataforma"
        style={{ opacity: fade }}
        animate={reduced ? undefined : { y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={26} strokeWidth={1.6} />
      </motion.a>
    </section>
  );
}
