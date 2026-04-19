import { FileText, Users, Clock, Award } from "lucide-react";
import type { ReactNode } from "react";

interface Stat {
  icon: ReactNode;
  number: string;
  title: string;
  description: string;
}

const STATS: Stat[] = [
  {
    icon: <FileText size={22} strokeWidth={1.75} />,
    number: "5M+",
    title: "Peças geradas",
    description: "Documentos jurídicos criados com IA",
  },
  {
    icon: <Users size={22} strokeWidth={1.75} />,
    number: "4.500+",
    title: "Advogados ativos",
    description: "Profissionais confiam na plataforma",
  },
  {
    icon: <Clock size={22} strokeWidth={1.75} />,
    number: "95%",
    title: "Economia de tempo",
    description: "Redução no tempo de criação de peças",
  },
  {
    icon: <Award size={22} strokeWidth={1.75} />,
    number: "4.9/5",
    title: "Avaliação média",
    description: "Satisfação dos usuários",
  },
];

export function NumbersSection() {
  return (
    <section className="i2-numbers" id="numeros">
      <div className="i2-container">
        <header className="i2-numbers__header">
          <span className="i2-numbers__eyebrow">Excelência</span>
          <h2 className="i2-numbers__title">
            Números que comprovam nossa excelência
          </h2>
          <p className="i2-numbers__subtitle">
            Resultados reais de quem usa a JuridIA no dia a dia
          </p>
        </header>

        <div className="i2-numbers__grid">
          {STATS.map((stat) => (
            <div key={stat.title} className="i2-numbers__item">
              <span className="i2-numbers__icon">{stat.icon}</span>
              <span className="i2-numbers__num">{stat.number}</span>
              <span className="i2-numbers__item-title">{stat.title}</span>
              <span className="i2-numbers__desc">{stat.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
