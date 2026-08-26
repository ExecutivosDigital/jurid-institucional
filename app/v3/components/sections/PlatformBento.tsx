"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  allFeatures,
  featureHref,
  hints,
  type Feature,
} from "../../lib/features";
import { Mockup } from "../mockups/Mockups";
import { Reveal, Stagger, staggerItem } from "../ui/Motion";

/** Os quatro carros-chefe ganham peso visual; o resto vira índice elegante. */
const FEATURED = ["chat", "voice", "consultas", "meu-juiz"] as const;

function byId(id: string): Feature {
  const f = allFeatures.find((x) => x.id === id);
  if (!f) throw new Error(`Funcionalidade desconhecida: ${id}`);
  return f;
}

/** Marca d'água tipográfica: a métrica da funcionalidade em corpo enorme. */
function Watermark({ text }: { text: string }) {
  return (
    <span className="v3-bento__watermark" aria-hidden>
      {text}
    </span>
  );
}

export function PlatformBento() {
  const chat = byId("chat");
  const voice = byId("voice");
  const consultas = byId("consultas");
  const juiz = byId("meu-juiz");
  const rest = allFeatures.filter(
    (f) => !FEATURED.includes(f.id as (typeof FEATURED)[number])
  );

  const ChatIcon = chat.icon;
  const VoiceIcon = voice.icon;
  const ConsultasIcon = consultas.icon;
  const JuizIcon = juiz.icon;

  return (
    <section className="v3-section" id="plataforma">
      <div className="v3-wrap">
        <div className="v3-bento__head">
          <Reveal>
            <span className="v3-eyebrow">A plataforma</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="v3-h2" style={{ marginTop: 20, maxWidth: 620 }}>
              Dezesseis ferramentas.
              <br />
              <span className="v3-accent">Uma única cabeça.</span>
            </h2>
          </Reveal>
        </div>

        {/* ---- Destaques ---- */}
        <Stagger className="v3-bento" step={0.09}>
          {/* Chat — o carro-chefe, com o produto à mostra */}
          <motion.div variants={staggerItem} className="v3-bento__cell v3-bento__cell--hero">
            <Link href={featureHref(chat.id)} className="v3-bento__tile v3-bento__tile--dark">
              <div className="v3-bento__top">
                <span className="v3-bento__icon v3-bento__icon--dark">
                  <ChatIcon size={19} strokeWidth={1.8} />
                </span>
                <span className="v3-bento__go">
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </span>
              </div>

              <div className="v3-bento__preview">
                <Mockup kind={chat.mockup} />
              </div>

              <div>
                <h3 className="v3-bento__title v3-bento__title--lg">{chat.tab}</h3>
                <p className="v3-bento__hint v3-bento__hint--dark">
                  {chat.lead.split(".")[0]}.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Voice */}
          <motion.div variants={staggerItem} className="v3-bento__cell v3-bento__cell--wide">
            <Link href={featureHref(voice.id)} className="v3-bento__tile">
              <Watermark text="Voice" />
              <div className="v3-bento__top">
                <span className="v3-bento__icon">
                  <VoiceIcon size={19} strokeWidth={1.8} />
                </span>
                <span className="v3-bento__go">
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </span>
              </div>

              {/* Onda de áudio como motivo visual, não como enfeite vazio */}
              <div className="v3-bento__wave" aria-hidden>
                {[34, 58, 82, 46, 96, 62, 40, 74, 90, 50, 68, 36, 84, 56, 92, 44].map(
                  (h, i) => (
                    <motion.span
                      key={i}
                      style={{ height: `${h}%` }}
                      initial={{ scaleY: 0.25 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.025 }}
                    />
                  )
                )}
              </div>

              <div>
                <h3 className="v3-bento__title">{voice.tab}</h3>
                <p className="v3-bento__hint">{hints[voice.id]}</p>
              </div>
            </Link>
          </motion.div>

          {/* Consultas */}
          <motion.div variants={staggerItem} className="v3-bento__cell">
            <Link href={featureHref(consultas.id)} className="v3-bento__tile">
              <Watermark text="~95" />
              <div className="v3-bento__top">
                <span className="v3-bento__icon">
                  <ConsultasIcon size={19} strokeWidth={1.8} />
                </span>
                <span className="v3-bento__go">
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </span>
              </div>
              <div>
                <h3 className="v3-bento__title">{consultas.tab}</h3>
                <p className="v3-bento__hint">{hints[consultas.id]}</p>
              </div>
            </Link>
          </motion.div>

          {/* Meu Juiz IA */}
          <motion.div variants={staggerItem} className="v3-bento__cell">
            <Link href={featureHref(juiz.id)} className="v3-bento__tile">
              <Watermark text="8.4" />
              <div className="v3-bento__top">
                <span className="v3-bento__icon">
                  <JuizIcon size={19} strokeWidth={1.8} />
                </span>
                <span className="v3-bento__go">
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </span>
              </div>
              <div>
                <h3 className="v3-bento__title">{juiz.tab}</h3>
                <p className="v3-bento__hint">{hints[juiz.id]}</p>
              </div>
            </Link>
          </motion.div>
        </Stagger>

        {/* ---- E as outras doze ---- */}
        <Reveal>
          <p className="v3-bento__divider">
            <span>E mais doze, no mesmo lugar</span>
          </p>
        </Reveal>

        <Stagger className="v3-bento__rest" step={0.035}>
          {rest.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.id} variants={staggerItem}>
                <Link href={featureHref(f.id)} className="v3-bento__mini">
                  <span className="v3-bento__mini-icon">
                    <Icon size={16} strokeWidth={1.9} />
                  </span>
                  <span className="v3-bento__mini-name">{f.tab}</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.2}
                    className="v3-bento__mini-go"
                  />
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
