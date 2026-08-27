import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const STATS = [
  { number: "4 dias", label: "Teste gratuito" },
  { number: "4.500+", label: "Usuários ativos" },
  { number: "97,5%", label: "Satisfação" },
];

export function HeroSection() {
  return (
    <section className="i2-hero">
      <div className="i2-hero__glow" aria-hidden="true" />

      <div className="i2-container">
        <div className="i2-hero__inner">
          <span className="i2-hero__badge">
            <span className="i2-hero__badge-dot" aria-hidden="true" />
            Mais de 4.500 advogados confiam na JuridIA
          </span>

          <h1 className="i2-hero__headline">
            Um dia inteiro de trabalho{" "}
            <span className="i2-hero__headline-gold">
              em 1 minuto
              <svg
                className="i2-hero__headline-underline"
                viewBox="0 0 320 14"
                fill="none"
                aria-hidden
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9 C 80 2, 160 2, 240 6 S 300 11, 317 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="i2-hero__subtitle">
            Automatize petições, consulte jurisprudências e otimize sua rotina
            jurídica com nossa IA especializada em direito brasileiro.
          </p>

          <div className="i2-hero__ctas">
            <Link
              href="/#experimente"
              className="i2-btn i2-btn--primary"
              data-lp-cta="hero-teste-gratis"
            >
              <span className="i2-hide-sm">Começar teste grátis</span>
              <span className="i2-show-sm">Testar agora</span>
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link href="#video" className="i2-btn i2-btn--ghost" data-lp-cta="hero-ver-demo">
              <Play size={16} strokeWidth={2} fill="currentColor" />
              <span className="i2-hide-sm">Ver demonstração</span>
              <span className="i2-show-sm">Ver demo</span>
            </Link>
          </div>

          <div className="i2-hero__stats" aria-label="Estatísticas">
            {STATS.map((stat) => (
              <div key={stat.label} className="i2-hero__stat">
                <span className="i2-hero__stat-num">{stat.number}</span>
                <span className="i2-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
