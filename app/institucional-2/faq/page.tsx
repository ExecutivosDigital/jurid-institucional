"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/ui/WhatsAppFloat";

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Estou+no+site+da+Jurid+IA+e+gostaria+de+conhecer+mais+sobre+os+servi%C3%A7os.&type=phone_number&app_absent=0";

type FAQItemData = { q: string; a: string };

type FAQCategory = {
  id: string;
  label: string;
  icon: typeof Sparkles;
  items: FAQItemData[];
};

const CATEGORIES: FAQCategory[] = [
  {
    id: "geral",
    label: "Sobre a JuridIA",
    icon: Sparkles,
    items: [
      {
        q: "O que é a JuridIA?",
        a: "A JuridIA é uma plataforma de inteligência artificial jurídica brasileira. Reúne dois produtos principais — o Chat (assistente jurídico conversacional) e o Voice (gravação e transcrição inteligente de audiências e reuniões) — num único ambiente pensado para advogados.",
      },
      {
        q: "Para quem a JuridIA é indicada?",
        a: "Para advogados autônomos, escritórios de médio porte e bancas corporativas que lidam com volume de peças, atendimento a cliente ou audiências. Funciona bem em todas as áreas do direito, com coberturas dedicadas para Trabalhista, Previdenciário, Cível, Penal, Tributário, Empresarial, Família e Consumidor.",
      },
      {
        q: "Preciso instalar alguma coisa?",
        a: "Não. A JuridIA funciona no navegador — computador, tablet e celular. Para usar o Voice em audiências presenciais ou reuniões online, basta clicar em gravar dentro da própria plataforma.",
      },
      {
        q: "A IA entende direito brasileiro de verdade?",
        a: "Sim. Foi treinada com legislação, jurisprudência (STF, STJ, TST, TRTs, TRFs e tribunais estaduais) e doutrina nacional. Ela devolve fundamentação com referência, e não respostas genéricas de modelo internacional.",
      },
    ],
  },
  {
    id: "produto",
    label: "Chat e Voice",
    icon: Wrench,
    items: [
      {
        q: "O que o Chat faz?",
        a: "Gera petições iniciais, contestações, recursos, pareceres e memoriais. Faz pesquisa de jurisprudência em linguagem natural. Revisa documentos que você envia. Responde dúvidas técnicas com citação de dispositivo e súmula.",
      },
      {
        q: "O Voice grava áudio de audiências?",
        a: "Sim. Grava audiências (presenciais ou por videoconferência), reuniões com clientes e sustentações orais. A IA transcreve em tempo real, separa os falantes, destaca pontos jurídicos relevantes e gera ata, memorial ou resumo executivo.",
      },
      {
        q: "Posso gravar audiência no TRT, no fórum estadual ou em AIJ criminal?",
        a: "Sim, desde que a gravação seja para uso próprio, como apoio ao trabalho do advogado. A JuridIA é uma ferramenta de produtividade e respeita as regras de cada tribunal sobre uso de dispositivos em sala.",
      },
      {
        q: "Consigo subir um PDF de um processo para a IA analisar?",
        a: "Sim. Você pode anexar PDFs, imagens e documentos Word para que a IA extraia informações, resuma ou gere peças com base no conteúdo enviado.",
      },
      {
        q: "A JuridIA faz cálculos (rescisão, benefícios, correção)?",
        a: "Sim. O módulo de cálculo cobre rescisões trabalhistas (saldo, aviso, férias, 13º, FGTS, multa, adicionais), benefícios previdenciários e correções monetárias com os índices aplicáveis. Você confere e ajusta.",
      },
    ],
  },
  {
    id: "planos",
    label: "Planos e pagamento",
    icon: CreditCard,
    items: [
      {
        q: "Quanto custa?",
        a: "Plano Individual a R$ 169,90/mês, Plano Escritório (até 5 advogados) a R$ 199,90/mês e Plano Enterprise sob consulta para escritórios maiores. Cancele quando quiser.",
      },
      {
        q: "Tem teste grátis?",
        a: "Sim. São 4 dias de teste grátis com acesso completo ao Chat e ao Voice, sem cartão de crédito. Você testa no seu caso real e decide se faz sentido.",
      },
      {
        q: "Quais formas de pagamento?",
        a: "Cartão de crédito (com parcelamento no plano anual) e PIX. Para o Enterprise, conversamos direto pelo WhatsApp para acordar condição e emissão de documentos fiscais.",
      },
      {
        q: "Tem fidelidade ou multa se eu cancelar?",
        a: "Não. Os planos mensais não têm fidelidade. Você cancela pela própria plataforma ou pelos canais de atendimento sem multa.",
      },
    ],
  },
  {
    id: "seguranca",
    label: "Segurança e LGPD",
    icon: ShieldCheck,
    items: [
      {
        q: "Meus dados e os dos meus clientes ficam seguros?",
        a: "Sim. Servidores no Brasil, criptografia em trânsito e em repouso, controle de acesso com menor privilégio e segregação lógica por escritório. Tratamos sigilo profissional como padrão, não como opção.",
      },
      {
        q: "A JuridIA usa meus casos para treinar a IA?",
        a: "Não. Conversas, documentos e gravações da plataforma não são usados para treinar os modelos. Seu caso é seu.",
      },
      {
        q: "Como a JuridIA se enquadra na LGPD?",
        a: "Somos Controladores dos dados de conta (cadastro, cobrança) e Operadores dos dados que você coloca no produto. Temos bases legais definidas por finalidade, canal dedicado para exercício de direitos do titular e atendemos às obrigações da Lei 13.709/2018.",
      },
      {
        q: "Posso apagar tudo quando quiser?",
        a: "Sim. Você pode solicitar a exclusão dos seus dados a qualquer momento pelo e-mail privacidade@juridia.com.br. Mantemos apenas o que a lei obriga (ex.: registros fiscais).",
      },
    ],
  },
  {
    id: "suporte",
    label: "Suporte e onboarding",
    icon: HelpCircle,
    items: [
      {
        q: "Como funciona o suporte?",
        a: "Pelo WhatsApp e por e-mail em horário comercial. Planos Enterprise têm canal dedicado com SLA. Respondemos rápido porque entendemos que tempo de advogado é tempo de cliente.",
      },
      {
        q: "Tem treinamento ou material para começar?",
        a: "Sim. Ao criar a conta, você recebe um onboarding guiado com os principais casos de uso. Para escritórios, marcamos uma call de configuração conjunta.",
      },
      {
        q: "Posso integrar com meu sistema de processos?",
        a: "Integrações customizadas estão disponíveis no plano Enterprise via API dedicada. Para planos menores, você pode subir documentos manualmente e exportar o resultado em texto, PDF ou Word.",
      },
      {
        q: "Onde reporto um bug ou sugestão?",
        a: "Pelo WhatsApp de atendimento. Todo feedback vira ticket interno e entra na priorização do produto.",
      },
    ],
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("geral");
  const [openKey, setOpenKey] = useState<string | null>("geral-0");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (it) =>
          it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const categoriesToRender = query.trim()
    ? filtered
    : CATEGORIES.filter((cat) => cat.id === activeCategory);

  const allFAQsForSchema = CATEGORIES.flatMap((cat) => cat.items);

  return (
    <>
      <Navbar />
      <main className="i2-info">
        <section className="i2-info-hero">
          <div className="i2-info-hero__glow" aria-hidden />
          <div className="i2-container">
            <div className="i2-info-hero__inner">
              <span className="i2-info-hero__eyebrow">
                <HelpCircle size={14} strokeWidth={2.25} />
                Perguntas Frequentes
              </span>
              <h1 className="i2-info-hero__title">
                Tudo que você precisa saber sobre a{" "}
                <span className="i2-info-hero__title-gold">JuridIA</span>
              </h1>
              <p className="i2-info-hero__sub">
                Respostas diretas sobre produto, planos, segurança e suporte.
                Se faltar alguma coisa, o WhatsApp está aberto.
              </p>

              <div className="i2-faq-search">
                <Search size={16} strokeWidth={2} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar uma pergunta…"
                  aria-label="Buscar uma pergunta"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="i2-info-section i2-info-section--flush">
          <div className="i2-container">
            {!query.trim() && (
              <nav className="i2-faq-tabs" aria-label="Categorias de perguntas">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`i2-faq-tab ${active ? "is-active" : ""}`}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenKey(`${cat.id}-0`);
                      }}
                      aria-pressed={active}
                    >
                      <Icon size={14} strokeWidth={2.25} />
                      {cat.label}
                    </button>
                  );
                })}
              </nav>
            )}

            {categoriesToRender.length === 0 && (
              <p className="i2-faq-empty">
                Nenhuma pergunta encontrada para “{query}”. Tente outro termo
                ou fale direto com a gente pelo WhatsApp.
              </p>
            )}

            {categoriesToRender.map((cat) => (
              <div key={cat.id} className="i2-faq-block">
                {query.trim() && (
                  <h2 className="i2-faq-block__title">{cat.label}</h2>
                )}
                <div className="i2-area-faq__list">
                  {cat.items.map((item, i) => {
                    const key = `${cat.id}-${i}`;
                    const open = openKey === key;
                    return (
                      <div
                        key={key}
                        className={`i2-area-faq__item ${open ? "is-open" : ""}`}
                      >
                        <button
                          type="button"
                          className="i2-area-faq__q"
                          aria-expanded={open}
                          onClick={() =>
                            setOpenKey((prev) => (prev === key ? null : key))
                          }
                        >
                          <span>{item.q}</span>
                          {open ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                        {open && (
                          <div className="i2-area-faq__a">{item.a}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: allFAQsForSchema.map((it) => ({
                    "@type": "Question",
                    name: it.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: it.a,
                    },
                  })),
                }),
              }}
            />
          </div>
        </section>

        <section className="i2-info-cta">
          <div className="i2-container">
            <div className="i2-info-cta__card">
              <span className="i2-info-cta__eyebrow">
                <MessageCircle size={14} strokeWidth={2.25} />
                Não achou sua resposta?
              </span>
              <h2 className="i2-info-cta__title">
                Fala com a gente no{" "}
                <span className="i2-info-cta__title-gold">WhatsApp</span>
              </h2>
              <p className="i2-info-cta__sub">
                Time treinado em direito e produto. Responde na hora, sem
                formulário e sem fila de atendimento.
              </p>
              <div className="i2-info-cta__ctas">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="i2-btn i2-btn--primary"
                >
                  <MessageCircle size={16} strokeWidth={2.25} />
                  Abrir conversa
                </a>
                <Link href="/plans" className="i2-btn i2-btn--ghost">
                  Começar teste grátis
                  <ArrowRight size={18} strokeWidth={2} />
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
