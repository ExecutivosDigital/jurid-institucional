"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, Reveal, Stagger, staggerItem } from "../ui/Motion";

type StatItem = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  desc: string;
};

const STATS_DATA: StatItem[] = [
  {
    prefix: "~",
    value: 95,
    suffix: "",
    label: "consultas oficiais",
    desc: "STF, STJ, TST, 6 TRFs, 24 TRTs e 27 Tribunais de Justiça estaduais integrados.",
  },
  {
    prefix: "",
    value: 13,
    suffix: "",
    label: "áreas de cálculo",
    desc: "Tabelas monetárias oficiais para liquidação trabalhista, cível e tributária.",
  },
  {
    prefix: "",
    value: 1,
    suffix: "M",
    label: "tokens de contexto",
    desc: "Capacidade para ler e cruzar processos inteiros de até 5.000 laudas sem truncamento.",
  },
  {
    prefix: "",
    value: 20,
    suffix: " GB",
    label: "de cofre por advogado",
    desc: "Espaço criptografado ponta a ponta (AES-256) para peças, laudos e áudios de audiência.",
  },
];

/**
 * Contador numérico animado acionado ao entrar na tela no scroll.
 */
function StatNumber({
  prefix = "",
  value,
  suffix = "",
}: {
  prefix?: string;
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? String(value) : "0");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(String(value));
      return;
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(Math.round(latest).toString());
      },
    });

    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="v3-kanastra-stat__number">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * Seção "Nossos Números" inspirada na Kanastra:
 * - Ocupa a tela inteira com atmosfera cinematográfica escura
 * - Silhuetas de montanhas / relevos com opacidade em camadas que se movem no scroll (parallax)
 * - Tipografia limpa com contadores animados
 */
export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax suave das montanhas conforme o scroll da página
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yMountainFar = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yMountainMid = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yMountainNear = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section ref={containerRef} className="v3-section v3-kanastra-section" id="numeros">
      <div className="v3-wrap">
        <div className="v3-kanastra-card">
          {/* ============================================================
              MONTANHAS EM MOVIMENTO COM OPACIDADE EM CAMADAS (Estilo Kanastra)
              ============================================================ */}
          <div className="v3-kanastra-mountains" aria-hidden="true">
            {/* Camada Distante */}
            <motion.div
              className="v3-kanastra-mountain v3-kanastra-mountain--far"
              style={{ y: yMountainFar }}
            >
              <svg
                viewBox="0 0 1440 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 240C160 180 320 130 500 170C680 210 820 290 1000 240C1180 190 1320 120 1440 140V460H0V240Z"
                  fill="url(#kanastraMountainGradFar)"
                />
                <defs>
                  <linearGradient id="kanastraMountainGradFar" x1="720" y1="120" x2="720" y2="460" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c9a57c" stopOpacity="0.10" />
                    <stop offset="1" stopColor="#0e0b08" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Camada Média */}
            <motion.div
              className="v3-kanastra-mountain v3-kanastra-mountain--mid"
              style={{ y: yMountainMid }}
            >
              <svg
                viewBox="0 0 1440 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 280C200 220 360 270 540 210C720 150 900 250 1080 190C1240 140 1360 210 1440 180V460H0V280Z"
                  fill="url(#kanastraMountainGradMid)"
                />
                <defs>
                  <linearGradient id="kanastraMountainGradMid" x1="720" y1="140" x2="720" y2="460" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b6cb5" stopOpacity="0.08" />
                    <stop offset="0.5" stopColor="#c9a57c" stopOpacity="0.05" />
                    <stop offset="1" stopColor="#0e0b08" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Camada Frontal com traçado de relevo sutil */}
            <motion.div
              className="v3-kanastra-mountain v3-kanastra-mountain--near"
              style={{ y: yMountainNear }}
            >
              <svg
                viewBox="0 0 1440 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 330C180 270 380 320 580 280C780 240 960 310 1160 260C1320 220 1390 270 1440 280V460H0V330Z"
                  fill="url(#kanastraMountainGradNear)"
                />
                <path
                  d="M0 330C180 270 380 320 580 280C780 240 960 310 1160 260C1320 220 1390 270 1440 280"
                  stroke="#c9a57c"
                  strokeOpacity="0.22"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient id="kanastraMountainGradNear" x1="720" y1="220" x2="720" y2="460" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#14100c" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#0e0b08" stopOpacity="0.98" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Glows de iluminação atmosférica */}
            <div className="v3-kanastra-glow v3-kanastra-glow--gold" />
            <div className="v3-kanastra-glow v3-kanastra-glow--blue" />
          </div>

          {/* ============================================================
              CONTEÚDO CLEAN (Header + 4 Números)
              ============================================================ */}
          <div className="v3-kanastra-content">
            <div className="v3-kanastra-head">
              <Reveal>
                <span className="v3-eyebrow">Nossos números</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="v3-h2 v3-kanastra-title">
                  Infraestrutura de alta precisão.
                  <br />
                  <span className="v3-accent">Em escala nacional.</span>
                </h2>
              </Reveal>
            </div>

            {/* Grid dos 4 Números */}
            <Stagger className="v3-kanastra-grid" step={0.08}>
              {STATS_DATA.map((item) => (
                <motion.div
                  key={item.label}
                  className="v3-kanastra-stat"
                  variants={staggerItem}
                >
                  <div className="v3-kanastra-stat__top">
                    <StatNumber
                      prefix={item.prefix}
                      value={item.value}
                      suffix={item.suffix}
                    />
                  </div>
                  <div className="v3-kanastra-stat__label">{item.label}</div>
                  <p className="v3-kanastra-stat__desc">{item.desc}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
