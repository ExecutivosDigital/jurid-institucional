import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  EyeOff,
  FileCheck,
  KeyRound,
  Lock,
  MessageCircle,
  Server,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Compliance e Segurança — JuridIA",
  description:
    "LGPD, sigilo profissional e segurança da informação na JuridIA. Como tratamos os dados dos seus clientes, onde eles ficam e quais controles aplicamos.",
};

const WHATSAPP_HREF =
  "https://api.whatsapp.com/send/?phone=5541984080011&text=Ol%C3%A1%21+Estou+no+site+da+Jurid+IA+e+gostaria+de+conhecer+mais+sobre+os+servi%C3%A7os.&type=phone_number&app_absent=0";

const PILLARS = [
  {
    icon: FileCheck,
    title: "Conformidade com a LGPD",
    description:
      "Tratamos dados pessoais em conformidade com a Lei 13.709/2018. Bases legais definidas por finalidade, direitos do titular garantidos e respostas em prazo.",
  },
  {
    icon: Lock,
    title: "Criptografia em trânsito e em repouso",
    description:
      "TLS 1.2+ em todas as conexões e criptografia de disco nos ambientes de armazenamento. Gravações do Voice e documentos do Chat seguem o mesmo padrão.",
  },
  {
    icon: Server,
    title: "Servidores no Brasil",
    description:
      "Infraestrutura principal hospedada em território nacional, reduzindo transferência internacional de dados e facilitando demandas regulatórias.",
  },
  {
    icon: EyeOff,
    title: "Sem treinamento com seus dados",
    description:
      "Conversas, documentos e gravações que passam pela plataforma não alimentam o treinamento dos modelos. O seu caso não vira insumo de ninguém.",
  },
];

const CONTROLS = [
  {
    icon: KeyRound,
    title: "Autenticação e controle de acesso",
    description:
      "Login com senha forte e sessão revogável. Controles administrativos para escritórios que precisam revogar acesso de colaboradores que saíram.",
  },
  {
    icon: UserCheck,
    title: "Princípio do menor privilégio",
    description:
      "Equipe técnica só acessa dados de cliente mediante demanda formal (suporte, incidente ou obrigação legal), com trilha de auditoria.",
  },
  {
    icon: Users,
    title: "Segregação por escritório",
    description:
      "Cada conta tem um contorno lógico isolado. Nenhum usuário vê dados de outro escritório, mesmo no mesmo servidor.",
  },
  {
    icon: ShieldCheck,
    title: "Monitoramento contínuo",
    description:
      "Logs de acesso, alertas de anomalia e processo definido de resposta a incidentes. Se algo acontece, a comunicação é transparente.",
  },
];

const OAB_ITEMS = [
  "Sigilo profissional tratado como padrão (não como opção)",
  "Documentos e peças permanecem de titularidade do escritório",
  "Sem acesso da equipe JuridIA ao conteúdo do cliente sem autorização",
  "Ambientes lógicos isolados por conta",
  "Possibilidade de exclusão total dos dados a pedido",
];

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <main className="i2-info">
        <section className="i2-info-hero">
          <div className="i2-info-hero__glow" aria-hidden />
          <div className="i2-container">
            <div className="i2-info-hero__inner">
              <span className="i2-info-hero__eyebrow">
                <ShieldCheck size={14} strokeWidth={2.25} />
                Compliance e Segurança
              </span>
              <h1 className="i2-info-hero__title">
                Sigilo profissional e{" "}
                <span className="i2-info-hero__title-gold">
                  LGPD como padrão
                </span>
              </h1>
              <p className="i2-info-hero__sub">
                Advocacia não tolera vazamento. A JuridIA foi construída
                entendendo que o dado do seu cliente é sagrado — e o produto
                tem que refletir isso em cada camada, do modelo de IA ao banco
                de dados.
              </p>
              <div className="i2-info-hero__ctas">
                <Link
                  href="/institucional-2/privacidade"
                  className="i2-btn i2-btn--primary"
                >
                  Ler Política de Privacidade
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
                <Sparkles size={14} strokeWidth={2.25} />
                Pilares de proteção
              </span>
              <h2 className="i2-info-section__title">
                O que sustenta a confiança dos escritórios que usam a JuridIA
              </h2>
            </header>

            <div className="i2-info-grid i2-info-grid--2">
              {PILLARS.map((item) => {
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
                <Lock size={14} strokeWidth={2.25} />
                Controles técnicos
              </span>
              <h2 className="i2-info-section__title">
                Como os dados são protegidos na prática
              </h2>
              <p className="i2-info-section__sub">
                Segurança não é marketing. Aqui estão os controles reais que
                rodam hoje na plataforma.
              </p>
            </header>

            <div className="i2-info-grid i2-info-grid--2">
              {CONTROLS.map((item) => {
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
            <div className="i2-info-highlight">
              <div>
                <span className="i2-info-section__eyebrow">
                  <UserCheck size={14} strokeWidth={2.25} />
                  Respeito ao Estatuto da OAB
                </span>
                <h2 className="i2-info-section__title">
                  Sigilo profissional tratado como pré-requisito
                </h2>
                <p className="i2-info-section__sub">
                  O Estatuto da Advocacia exige sigilo sobre fatos do cliente.
                  A JuridIA foi desenhada para que o advogado possa usá-la sem
                  comprometer esse dever.
                </p>
              </div>
              <ul className="i2-info-checklist">
                {OAB_ITEMS.map((item) => (
                  <li key={item} className="i2-info-checklist__item">
                    <span className="i2-info-principle__check">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="i2-info-cta">
          <div className="i2-container">
            <div className="i2-info-cta__card">
              <span className="i2-info-cta__eyebrow">
                <ShieldCheck size={14} strokeWidth={2.25} />
                Documentos formais
              </span>
              <h2 className="i2-info-cta__title">
                Precisa de um{" "}
                <span className="i2-info-cta__title-gold">
                  termo ou cláusula
                </span>{" "}
                específica?
              </h2>
              <p className="i2-info-cta__sub">
                Para escritórios corporativos que precisam de acordos de
                tratamento de dados, cláusulas de confidencialidade ou
                esclarecimentos formais para clientes, nosso time responde
                pelo WhatsApp.
              </p>
              <div className="i2-info-cta__ctas">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="i2-btn i2-btn--primary"
                >
                  <MessageCircle size={16} strokeWidth={2.25} />
                  Falar com o time
                </a>
                <Link
                  href="/institucional-2/termos"
                  className="i2-btn i2-btn--ghost"
                >
                  Ler Termos de Uso
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
