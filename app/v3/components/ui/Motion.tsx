"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Curva usada em todo o site — saída rápida, chegada macia. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Revelação por observador próprio, em vez de `whileInView`.
 *
 * Por quê: com o Lenis, uma rolagem rápida pode atravessar a seção inteira
 * entre dois ciclos do IntersectionObserver. O `whileInView` então nunca
 * dispara e o bloco fica preso em `opacity: 0` — invisível para sempre.
 * Aqui, qualquer elemento que já esteja no viewport ou acima dele na
 * montagem é revelado na hora.
 */
function useRevealed<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // Já está visível ou já foi ultrapassado? Revela sem esperar.
    const isPast = () => el.getBoundingClientRect().top < window.innerHeight - 60;

    if (isPast()) {
      setShown(true);
      return;
    }

    let raf = 0;
    const reveal = () => {
      setShown(true);
      cleanup();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) reveal();
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0 }
    );
    io.observe(el);

    // Rede de segurança: se o observador perder o evento (rolagem suave pode
    // atravessar a seção inteira entre dois ciclos), a checagem no scroll pega.
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (isPast()) reveal();
      });
    };

    function cleanup() {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return cleanup;
  }, [shown]);

  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  from?: "bottom" | "left" | "right" | "none";
  delay?: number;
  distance?: number;
  className?: string;
};

/** Revelação no scroll. Com `prefers-reduced-motion` entra já no estado final. */
export function Reveal({
  children,
  from = "bottom",
  delay = 0,
  distance = 22,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, shown } = useRevealed<HTMLDivElement>();

  const offset =
    from === "bottom"
      ? { y: distance }
      : from === "left"
      ? { x: -distance }
      : from === "right"
      ? { x: distance }
      : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, ...offset }}
      animate={shown || reduced ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Container que escalona os filhos marcados com `variants={staggerItem}`. */
export function Stagger({
  children,
  className,
  step = 0.07,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, shown } = useRevealed<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : "hidden"}
      animate={shown || reduced ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Parallax de camada decorativa. Nunca aplicar em texto ou controle —
 * atrapalha leitura e pode causar enjoo.
 */
export function useParallax(distance = 60): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [distance, -distance]
  );
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  return { ref, y };
}

/** Barra de progresso de leitura fixa no topo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return <motion.div className="v3-progress" style={{ scaleX }} aria-hidden />;
}

/** Marca visual onde entra um asset definitivo (screenshot/foto). */
export function FigurePlaceholder({
  label,
  hint,
}: {
  label: string;
  hint: string;
}) {
  return (
    <figure className="v3-figure">
      <span className="v3-figure__label">{label}</span>
      <figcaption className="v3-figure__hint">{hint}</figcaption>
    </figure>
  );
}
