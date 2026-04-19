"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { track } from "lib/analytics";

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Estou+no+site+da+Jurid+IA+e+gostaria+de+conhecer+mais+sobre+os+servi%C3%A7os.&type=phone_number&app_absent=0";

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
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="i2-btn i2-btn--ghost"
              onClick={() =>
                track("Lead", {
                  source: "video_showcase_whatsapp",
                  content_name: "whatsapp_video_showcase",
                })
              }
            >
              <MessageCircle size={16} strokeWidth={2} />
              Fale conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
