"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  Play,
  Plus,
  Minus,
  Star,
  X,
  Sparkles,
} from "lucide-react";

import type { AreaContent, AreaSlug } from "../../lib/areas-content";
import { AREA_SLUGS, AREAS_CONTENT } from "../../lib/areas-content";
import { track } from "lib/analytics";

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Gostaria+de+falar+com+um+humano+sobre+a+JuridIA.&type=phone_number&app_absent=0";

type Props = {
  slug: AreaSlug;
};

export function AreaPageTemplate({ slug }: Props) {
  const area = AREAS_CONTENT[slug];
  const whatsappHref = WHATSAPP_HREF;

  return (
    <main className="i2-area">
      <AreaHero area={area} whatsappHref={whatsappHref} />
      <AreaBreadcrumb area={area} />
      <PainSection area={area} />
      <ChatSection area={area} />
      <VoiceSection area={area} />
      <BeforeAfterSection area={area} />
      <TestimonialsSection area={area} />
      <GallerySection area={area} />
      <FAQSection area={area} />
      <OtherAreasSection currentSlug={area.slug} />
      <AreaMegaCTA area={area} whatsappHref={whatsappHref} />
      <StickyMobileCTA whatsappHref={whatsappHref} />
    </main>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function AreaHero({
  area,
  whatsappHref,
}: {
  area: AreaContent;
  whatsappHref: string;
}) {
  const Icon = area.icon;
  return (
    <section className="i2-area-hero">
      <div className="i2-area-hero__glow" aria-hidden />
      <div className="i2-container">
        <div className="i2-area-hero__inner">
          <span className="i2-area-hero__eyebrow">
            <Icon size={14} strokeWidth={2.25} />
            {area.hero.eyebrow}
          </span>

          <h1 className="i2-area-hero__headline">
            {area.hero.headline}{" "}
            <span className="i2-area-hero__headline-gold">
              {area.hero.headlineHighlight}
            </span>
          </h1>

          <p className="i2-area-hero__subtitle">{area.hero.subtitle}</p>

          <ul className="i2-area-hero__badges" aria-label="Diferenciais">
            {area.hero.badges.map((badge) => (
              <li key={badge} className="i2-area-hero__badge">
                <Check size={14} strokeWidth={2.5} />
                {badge}
              </li>
            ))}
          </ul>

          <div className="i2-area-hero__ctas">
            <Link href="/plans" className="i2-btn i2-btn--primary">
              <span className="i2-hide-sm">{area.hero.primaryCtaLabel}</span>
              <span className="i2-show-sm">Testar agora</span>
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="i2-btn i2-btn--ghost"
              onClick={() =>
                track("Lead", {
                  source: "area_hero_whatsapp",
                  content_name: `whatsapp_${area.slug}_hero`,
                  area: area.slug,
                })
              }
            >
              <MessageCircle size={16} strokeWidth={2.25} />
              <span className="i2-hide-sm">{area.hero.secondaryCtaLabel}</span>
              <span className="i2-show-sm">WhatsApp</span>
            </a>
          </div>

          <div className="i2-area-hero__stats" aria-label="Estatísticas">
            {area.hero.stats.map((s) => (
              <div key={s.label} className="i2-area-hero__stat">
                <span className="i2-area-hero__stat-number">{s.number}</span>
                <span className="i2-area-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="i2-area-hero__visual" aria-hidden>
          <div className="i2-area-hero__visual-card">
            <div className="i2-area-hero__visual-header">
              <span className="i2-area-hero__visual-dot" />
              <span className="i2-area-hero__visual-dot" />
              <span className="i2-area-hero__visual-dot" />
              <span className="i2-area-hero__visual-label">
                JuridIA · {area.name}
              </span>
            </div>
            <div className="i2-area-hero__visual-body">
              <div className="i2-area-hero__visual-row">
                <Sparkles size={14} />
                Gerando petição de {area.name.toLowerCase()}…
              </div>
              <div className="i2-area-hero__visual-bar" />
              <div className="i2-area-hero__visual-bar i2-area-hero__visual-bar--sm" />
              <div className="i2-area-hero__visual-bar" />
              <div className="i2-area-hero__visual-bar i2-area-hero__visual-bar--md" />
              <div className="i2-area-hero__visual-row i2-area-hero__visual-row--success">
                <Check size={14} />
                Pronto em 47 segundos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BREADCRUMB
   ============================================================ */
function AreaBreadcrumb({ area }: { area: AreaContent }) {
  return (
    <nav className="i2-area-breadcrumb" aria-label="Navegação">
      <div className="i2-container">
        <ol className="i2-area-breadcrumb__list">
          <li>
            <Link href="/institucional-2">JuridIA</Link>
          </li>
          <li aria-hidden>/</li>
          <li>Áreas do Direito</li>
          <li aria-hidden>/</li>
          <li className="i2-area-breadcrumb__current">{area.name}</li>
        </ol>
      </div>
    </nav>
  );
}

/* ============================================================
   PAIN SECTION
   ============================================================ */
function PainSection({ area }: { area: AreaContent }) {
  return (
    <section className="i2-area-pains">
      <div className="i2-container">
        <header className="i2-area-section-header">
          <h2 className="i2-area-section-title">{area.pains.title}</h2>
          {area.pains.subtitle && (
            <p className="i2-area-section-sub">{area.pains.subtitle}</p>
          )}
        </header>
        <div className="i2-area-pains__grid">
          {area.pains.items.map((pain) => {
            const Icon = pain.icon;
            return (
              <article key={pain.title} className="i2-area-pain-card">
                <span className="i2-area-pain-card__icon">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="i2-area-pain-card__title">{pain.title}</h3>
                <p className="i2-area-pain-card__desc">{pain.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CHAT SECTION
   ============================================================ */
function ChatSection({ area }: { area: AreaContent }) {
  return (
    <section className="i2-area-product" id="chat">
      <div className="i2-container">
        <div className="i2-area-product__grid">
          <div className="i2-area-product__text">
            <span className="i2-area-product__eyebrow">
              <Sparkles size={14} strokeWidth={2.25} />
              {area.chat.eyebrow}
            </span>
            <h2 className="i2-area-product__title">{area.chat.title}</h2>
            <p className="i2-area-product__subtitle">{area.chat.subtitle}</p>
            <ul className="i2-area-product__cases">
              {area.chat.cases.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="i2-area-product__case">
                    <span className="i2-area-product__case-icon">
                      <Icon size={16} strokeWidth={2.25} />
                    </span>
                    <div>
                      <span className="i2-area-product__case-title">
                        {c.title}
                      </span>
                      <span className="i2-area-product__case-desc">
                        {c.description}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href="/plans" className="i2-btn i2-btn--primary">
              <span className="i2-hide-sm">{area.chat.ctaLabel}</span>
              <span className="i2-show-sm">Testar agora</span>
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>

          <div className="i2-area-product__visual" aria-hidden>
            <ChatMockup area={area} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VOICE SECTION
   ============================================================ */
function VoiceSection({ area }: { area: AreaContent }) {
  return (
    <section className="i2-area-product i2-area-product--alt" id="voice">
      <div className="i2-container">
        <div className="i2-area-product__grid i2-area-product__grid--reverse">
          <div className="i2-area-product__visual" aria-hidden>
            <VoiceMockup area={area} />
          </div>

          <div className="i2-area-product__text">
            <span className="i2-area-product__eyebrow">
              <Sparkles size={14} strokeWidth={2.25} />
              {area.voice.eyebrow}
            </span>
            <h2 className="i2-area-product__title">{area.voice.title}</h2>
            <p className="i2-area-product__subtitle">{area.voice.subtitle}</p>
            <ul className="i2-area-product__cases">
              {area.voice.cases.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="i2-area-product__case">
                    <span className="i2-area-product__case-icon">
                      <Icon size={16} strokeWidth={2.25} />
                    </span>
                    <div>
                      <span className="i2-area-product__case-title">
                        {c.title}
                      </span>
                      <span className="i2-area-product__case-desc">
                        {c.description}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href="/plans" className="i2-btn i2-btn--primary">
              <span className="i2-hide-sm">{area.voice.ctaLabel}</span>
              <span className="i2-show-sm">Testar agora</span>
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatMockup({ area }: { area: AreaContent }) {
  return (
    <div className="i2-mockup i2-mockup--chat">
      <div className="i2-mockup__topbar">
        <span className="i2-mockup__dot" />
        <span className="i2-mockup__dot" />
        <span className="i2-mockup__dot" />
        <span className="i2-mockup__title">Chat — {area.name}</span>
      </div>
      <div className="i2-mockup__body">
        <div className="i2-mockup__msg i2-mockup__msg--user">
          Preciso de uma petição para {area.name.toLowerCase()}
        </div>
        <div className="i2-mockup__msg i2-mockup__msg--ai">
          <Sparkles size={12} /> Claro, posso gerar agora.
          <div className="i2-mockup__bars">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="i2-mockup__msg i2-mockup__msg--ai i2-mockup__msg--success">
          <Check size={12} /> Pronto — 47s
        </div>
      </div>
    </div>
  );
}

function VoiceMockup({ area }: { area: AreaContent }) {
  return (
    <div className="i2-mockup i2-mockup--voice">
      <div className="i2-mockup__topbar">
        <span className="i2-mockup__rec" aria-hidden />
        <span className="i2-mockup__title">Voice — {area.name}</span>
        <span className="i2-mockup__time">02:47</span>
      </div>
      <div className="i2-mockup__body">
        <div className="i2-mockup__waveform" aria-hidden>
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} style={{ height: `${20 + ((i * 13) % 60)}%` }} />
          ))}
        </div>
        <div className="i2-mockup__voice-line">
          <strong>Advogado:</strong> Me conte como começou…
        </div>
        <div className="i2-mockup__voice-line">
          <strong>Cliente:</strong> Foi em março, quando eu cheguei pra trabalhar…
        </div>
        <div className="i2-mockup__voice-tag">
          <Check size={12} /> Transcrito · identificado · estruturado
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BEFORE / AFTER
   ============================================================ */
function BeforeAfterSection({ area }: { area: AreaContent }) {
  return (
    <section className="i2-area-ba">
      <div className="i2-container">
        <header className="i2-area-section-header i2-area-section-header--center">
          <h2 className="i2-area-section-title">{area.beforeAfter.title}</h2>
          {area.beforeAfter.subtitle && (
            <p className="i2-area-section-sub">{area.beforeAfter.subtitle}</p>
          )}
        </header>

        <div className="i2-area-ba__table">
          <div className="i2-area-ba__thead">
            <div className="i2-area-ba__th">Tarefa</div>
            <div className="i2-area-ba__th i2-area-ba__th--before">
              <X size={14} strokeWidth={2.5} /> Antes
            </div>
            <div className="i2-area-ba__th i2-area-ba__th--after">
              <Check size={14} strokeWidth={2.5} /> Com JuridIA
            </div>
          </div>
          {area.beforeAfter.rows.map((row) => (
            <div key={row.metric} className="i2-area-ba__row">
              <div className="i2-area-ba__cell i2-area-ba__cell--metric">
                {row.metric}
              </div>
              <div className="i2-area-ba__cell i2-area-ba__cell--before">
                {row.before}
              </div>
              <div className="i2-area-ba__cell i2-area-ba__cell--after">
                {row.after}
              </div>
            </div>
          ))}
        </div>

        <div className="i2-area-ba__cta">
          <Link href="/plans" className="i2-btn i2-btn--primary">
            <span className="i2-hide-sm">Começar teste grátis</span>
            <span className="i2-show-sm">Testar agora</span>
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function TestimonialsSection({ area }: { area: AreaContent }) {
  const main = area.testimonials.main;
  return (
    <section className="i2-area-testimonials">
      <div className="i2-container">
        <header className="i2-area-section-header i2-area-section-header--center">
          <h2 className="i2-area-section-title">
            {area.testimonials.title}
          </h2>
        </header>

        <article className="i2-area-testimonial i2-area-testimonial--main">
          <div className="i2-area-testimonial__rating" aria-label={`${main.rating} de 5`}>
            {Array.from({ length: main.rating }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="i2-area-testimonial__quote">
            “{main.quote}”
          </blockquote>
          <footer className="i2-area-testimonial__footer">
            <div className="i2-area-testimonial__avatar" aria-hidden>
              {main.name.charAt(0)}
            </div>
            <div>
              <div className="i2-area-testimonial__name">{main.name}</div>
              <div className="i2-area-testimonial__role">{main.role}</div>
              <div className="i2-area-testimonial__meta">
                {main.location} · {main.oab}
              </div>
            </div>
          </footer>
        </article>

        <div className="i2-area-testimonials__grid">
          {area.testimonials.extras.map((t) => (
            <article key={t.name} className="i2-area-testimonial">
              <div className="i2-area-testimonial__rating">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="i2-area-testimonial__quote">
                “{t.quote}”
              </blockquote>
              <footer className="i2-area-testimonial__footer">
                <div className="i2-area-testimonial__avatar" aria-hidden>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="i2-area-testimonial__name">{t.name}</div>
                  <div className="i2-area-testimonial__role">{t.role}</div>
                  <div className="i2-area-testimonial__meta">
                    {t.location} · {t.oab}
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY
   ============================================================ */
function GallerySection({ area }: { area: AreaContent }) {
  return (
    <section className="i2-area-gallery">
      <div className="i2-container">
        <header className="i2-area-section-header">
          <h2 className="i2-area-section-title">{area.gallery.title}</h2>
          {area.gallery.subtitle && (
            <p className="i2-area-section-sub">{area.gallery.subtitle}</p>
          )}
        </header>

        <div className="i2-area-gallery__grid">
          {area.gallery.images.map((img, i) => (
            <figure
              key={img.label}
              className={`i2-area-gallery__item ${
                i === 0 ? "i2-area-gallery__item--feature" : ""
              }`}
            >
              <div className="i2-area-gallery__placeholder" aria-hidden>
                <span className="i2-area-gallery__placeholder-label">
                  {img.label}
                </span>
                <span className="i2-area-gallery__placeholder-sub">
                  imagem em breve
                </span>
              </div>
              <figcaption className="i2-area-gallery__caption">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="i2-area-gallery__cta">
          <Link href="/plans" className="i2-btn i2-btn--ghost">
            <Play size={14} fill="currentColor" />
            Ver o produto em ação
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQSection({ area }: { area: AreaContent }) {
  return (
    <section className="i2-area-faq">
      <div className="i2-container">
        <header className="i2-area-section-header i2-area-section-header--center">
          <h2 className="i2-area-section-title">{area.faq.title}</h2>
          {area.faq.subtitle && (
            <p className="i2-area-section-sub">{area.faq.subtitle}</p>
          )}
        </header>

        <div className="i2-area-faq__list">
          {area.faq.items.map((item, i) => (
            <FAQItem key={item.question} item={item} defaultOpen={i === 0} />
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: area.faq.items.map((i) => ({
                "@type": "Question",
                name: i.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: i.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}

function FAQItem({
  item,
  defaultOpen = false,
}: {
  item: { question: string; answer: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`i2-area-faq__item ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="i2-area-faq__q"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{item.question}</span>
        {open ? <Minus size={16} /> : <Plus size={16} />}
      </button>
      {open && <div className="i2-area-faq__a">{item.answer}</div>}
    </div>
  );
}

/* ============================================================
   OTHER AREAS
   ============================================================ */
function OtherAreasSection({ currentSlug }: { currentSlug: string }) {
  const others = AREA_SLUGS.filter((s) => s !== currentSlug).map(
    (s) => AREAS_CONTENT[s]
  );
  return (
    <section className="i2-area-others">
      <div className="i2-container">
        <header className="i2-area-section-header">
          <h2 className="i2-area-section-title">
            A JuridIA também atende estas áreas
          </h2>
          <p className="i2-area-section-sub">
            Cada área tem uma página dedicada com casos de uso, prints e
            depoimentos.
          </p>
        </header>
        <div className="i2-area-others__grid">
          {others.map((o) => {
            const Icon = o.icon;
            return (
              <Link
                key={o.slug}
                href={`/institucional-2/${o.slug}`}
                className="i2-area-others__card"
              >
                <span className="i2-area-others__icon">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="i2-area-others__name">{o.name}</span>
                <span className="i2-area-others__arrow">
                  <ArrowRight size={14} strokeWidth={2.25} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MEGA CTA
   ============================================================ */
function AreaMegaCTA({
  area,
  whatsappHref,
}: {
  area: AreaContent;
  whatsappHref: string;
}) {
  return (
    <section className="i2-area-megacta">
      <div className="i2-container">
        <div className="i2-area-megacta__card">
          <span className="i2-area-megacta__eyebrow">
            {area.megaCta.eyebrow}
          </span>
          <h2 className="i2-area-megacta__title">{area.megaCta.title}</h2>
          <p className="i2-area-megacta__sub">{area.megaCta.subtitle}</p>
          <div className="i2-area-megacta__ctas">
            <Link href="/plans" className="i2-btn i2-btn--primary">
              <span className="i2-hide-sm">Testar grátis por 4 dias</span>
              <span className="i2-show-sm">Testar agora</span>
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="i2-btn i2-btn--ghost"
              onClick={() =>
                track("Lead", {
                  source: "area_megacta_whatsapp",
                  content_name: `whatsapp_${area.slug}_megacta`,
                  area: area.slug,
                })
              }
            >
              <MessageCircle size={16} strokeWidth={2.25} />
              <span className="i2-hide-sm">{area.whatsapp.buttonLabel}</span>
              <span className="i2-show-sm">Falar com especialista</span>
            </a>
            <a href="tel:+5511999999999" className="i2-area-megacta__phone">
              <Phone size={14} strokeWidth={2.25} />
              (11) 99999-9999
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STICKY MOBILE CTA
   ============================================================ */
function StickyMobileCTA({ whatsappHref }: { whatsappHref: string }) {
  return (
    <div className="i2-area-sticky" role="complementary" aria-label="Ações rápidas">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="i2-area-sticky__wa"
        onClick={() =>
          track("Lead", {
            source: "area_sticky_whatsapp",
            content_name: "whatsapp_sticky_mobile",
          })
        }
      >
        <MessageCircle size={16} strokeWidth={2.5} />
        WhatsApp
      </a>
      <Link href="/plans" className="i2-area-sticky__cta">
        Teste grátis
        <ArrowRight size={14} strokeWidth={2.5} />
      </Link>
    </div>
  );
}
