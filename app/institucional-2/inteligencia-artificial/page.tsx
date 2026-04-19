import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Cpu,
  Database,
  FileSearch,
  Gavel,
  Languages,
  Layers,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Inteligência Artificial Jurídica — JuridIA",
  description:
    "Como a IA da JuridIA é treinada no direito brasileiro: legislação, jurisprudência de TST, TRTs, STJ e STF, doutrina e milhões de julgados. Fundamentação com referências, sem alucinação.",
};

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Estou+no+site+da+Jurid+IA+e+gostaria+de+conhecer+mais+sobre+os+servi%C3%A7os.&type=phone_number&app_absent=0";

const TRAINING_SOURCES = [
  {
    icon: Scale,
    title: "Legislação federal e estadual",
    description:
      "Constituição, CLT, CPC, CP, CDC, códigos tributário e civil, além das leis estaduais mais acionadas no contencioso brasileiro.",
  },
  {
    icon: Gavel,
    title: "Jurisprudência atualizada",
    description:
      "Súmulas, orientações e acórdãos do STF, STJ, TST, TRTs, TRFs e tribunais estaduais — com ponteiro para o inteiro teor quando disponível.",
  },
  {
    icon: BookOpen,
    title: "Doutrina e produção acadêmica",
    description:
      "Treinada com a bibliografia jurídica de referência, a IA consegue explicar conceitos em linguagem de advogado — não de manual genérico.",
  },
  {
    icon: Database,
    title: "Milhões de peças reais",
    description:
      "Padrões de petição inicial, contestação, recurso e memorial observados em processos reais, respeitando estilo e estrutura técnica.",
  },
];

const CAPABILITIES = [
  {
    icon: FileSearch,
    title: "Pesquisa contextualizada",
    description:
      "Pergunte em linguagem natural. A IA traz o precedente aplicável ao seu caso com a referência (tribunal, relator, número).",
  },
  {
    icon: Target,
    title: "Geração com fundamento",
    description:
      "Petições e pareceres gerados já vêm com dispositivos legais citados e jurisprudência pertinente, prontos para revisão.",
  },
  {
    icon: Languages,
    title: "Terminologia brasileira",
    description:
      "Entende jargão forense, abreviações (AIJ, RO, RR, HC, MS) e expressões regionais que modelos generalistas costumam confundir.",
  },
  {
    icon: Layers,
    title: "Múltiplos modelos sob o mesmo teto",
    description:
      "Quatro modelos de IA disponíveis — cada um otimizado para tarefas diferentes: raciocínio jurídico, resumo, escrita técnica e pesquisa.",
  },
];

const PRINCIPLES = [
  {
    title: "Fundamentação antes de opinião",
    description:
      "Toda resposta busca citar norma, súmula ou precedente. Quando não há fonte conclusiva, a IA assume isso — em vez de inventar.",
  },
  {
    title: "Revisão humana sempre",
    description:
      "A JuridIA é uma alavanca, não um substituto. A responsabilidade técnica final é sempre do advogado, e o produto é desenhado para acelerar a revisão, não para pular.",
  },
  {
    title: "Sem treinar com seus casos",
    description:
      "Documentos, conversas e gravações que você coloca na plataforma não são usados para treinar modelos. Seu caso é seu.",
  },
  {
    title: "Atualização contínua",
    description:
      "A base é reprocessada periodicamente para incorporar novas súmulas, teses repetitivas e mudanças legislativas relevantes.",
  },
];

export default function InteligenciaArtificialPage() {
  return (
    <>
      <Navbar />
      <main className="i2-info">
        <section className="i2-info-hero">
          <div className="i2-info-hero__glow" aria-hidden />
          <div className="i2-container">
            <div className="i2-info-hero__inner">
              <span className="i2-info-hero__eyebrow">
                <Cpu size={14} strokeWidth={2.25} />
                Inteligência Artificial
              </span>
              <h1 className="i2-info-hero__title">
                IA jurídica treinada no{" "}
                <span className="i2-info-hero__title-gold">
                  direito brasileiro
                </span>
              </h1>
              <p className="i2-info-hero__sub">
                Diferente de ferramentas generalistas, a JuridIA foi desenhada
                desde o primeiro token para entender legislação, jurisprudência
                e doutrina nacionais — e para responder como um colega de
                escritório, não como um chatbot.
              </p>
              <div className="i2-info-hero__ctas">
                <Link href="/plans" className="i2-btn i2-btn--primary">
                  Testar grátis por 4 dias
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="i2-btn i2-btn--ghost"
                >
                  <MessageCircle size={16} strokeWidth={2.25} />
                  Falar com especialista
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="i2-info-section">
          <div className="i2-container">
            <header className="i2-info-section__header">
              <span className="i2-info-section__eyebrow">
                <Database size={14} strokeWidth={2.25} />
                Base de treinamento
              </span>
              <h2 className="i2-info-section__title">
                O que a IA da JuridIA leu para responder sobre o seu caso
              </h2>
              <p className="i2-info-section__sub">
                Quatro camadas de conhecimento estruturadas para que a resposta
                não seja achismo e sim análise com fundamento.
              </p>
            </header>

            <div className="i2-info-grid i2-info-grid--2">
              {TRAINING_SOURCES.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="i2-info-card">
                    <span className="i2-info-card__icon">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h3 className="i2-info-card__title">{item.title}</h3>
                    <p className="i2-info-card__desc">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="i2-info-section i2-info-section--alt">
          <div className="i2-container">
            <header className="i2-info-section__header">
              <span className="i2-info-section__eyebrow">
                <Sparkles size={14} strokeWidth={2.25} />
                Capacidades
              </span>
              <h2 className="i2-info-section__title">
                O que a IA entrega no dia a dia
              </h2>
            </header>

            <div className="i2-info-grid i2-info-grid--2">
              {CAPABILITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="i2-info-card">
                    <span className="i2-info-card__icon">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h3 className="i2-info-card__title">{item.title}</h3>
                    <p className="i2-info-card__desc">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="i2-info-section">
          <div className="i2-container">
            <header className="i2-info-section__header">
              <span className="i2-info-section__eyebrow">
                <ShieldCheck size={14} strokeWidth={2.25} />
                Princípios
              </span>
              <h2 className="i2-info-section__title">
                Como a JuridIA pensa sobre responsabilidade e confiança
              </h2>
              <p className="i2-info-section__sub">
                IA jurídica que serve para advogado real tem que respeitar
                limites claros. Estes são os nossos.
              </p>
            </header>

            <ul className="i2-info-principles">
              {PRINCIPLES.map((p) => (
                <li key={p.title} className="i2-info-principle">
                  <span className="i2-info-principle__check">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="i2-info-principle__title">{p.title}</h3>
                    <p className="i2-info-principle__desc">{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="i2-info-cta">
          <div className="i2-container">
            <div className="i2-info-cta__card">
              <span className="i2-info-cta__eyebrow">
                <Brain size={14} strokeWidth={2.25} />
                Experimente no seu caso
              </span>
              <h2 className="i2-info-cta__title">
                Veja a IA responder sobre{" "}
                <span className="i2-info-cta__title-gold">o seu processo</span>
              </h2>
              <p className="i2-info-cta__sub">
                4 dias grátis, sem cartão de crédito. Teste com um caso real do
                seu escritório e compare com a sua ferramenta atual.
              </p>
              <div className="i2-info-cta__ctas">
                <Link href="/plans" className="i2-btn i2-btn--primary">
                  Começar teste grátis
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>
                <Link href="/institucional-2/compliance" className="i2-btn i2-btn--ghost">
                  Ver segurança e compliance
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
