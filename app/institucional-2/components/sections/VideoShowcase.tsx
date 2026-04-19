import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export function VideoShowcase() {
  return (
    <section className="i2-video" id="video">
      <div className="i2-video__inner">
        <div
          className="i2-video__frame"
          style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}
        >
          <iframe
            src="https://www.youtube.com/embed/jSjn1n02fk4?rel=0"
            title="Demo · JuridIA em ação"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "inherit",
            }}
          />
        </div>

        <div className="i2-video__cta-block">
          <span className="i2-video__cta-eyebrow">
            <span className="i2-video__cta-dot" aria-hidden="true" />
            Pronto para começar?
          </span>
          <h3 className="i2-video__cta-title">
            Experimente agora — sem cartão de crédito
          </h3>
          <p className="i2-video__cta-subtitle">
            Crie sua conta em menos de um minuto, teste a JuridIA com seus
            próprios casos e veja na prática como ela acelera sua rotina
            jurídica. Se preferir, fale com nosso time e receba uma
            demonstração personalizada para o seu escritório.
          </p>
          <div className="i2-video__ctas">
            <Link href="/plans" className="i2-btn i2-btn--primary">
              Teste grátis
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link href="#contato" className="i2-btn i2-btn--ghost">
              <MessageCircle size={16} strokeWidth={2} />
              Fale conosco
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
