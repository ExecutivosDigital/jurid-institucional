import type { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso — JuridIA",
  description:
    "Termos de Uso da JuridIA: condições aplicáveis ao uso da plataforma e dos produtos JuridIA Chat e JuridIA Voice.",
};

export default function TermosPage() {
  return (
    <>
      <Navbar showAnnounce={false} />
      <main className="i2-legal">
        <div className="i2-container">
          <header className="i2-legal__header">
            <span className="i2-legal__eyebrow">Legal</span>
            <h1 className="i2-legal__title">Termos de Uso</h1>
            <p className="i2-legal__sub">
              Última atualização: {new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </header>

          <article className="i2-legal__content">
            <h2>1. Aceitação dos termos</h2>
            <p>
              Ao criar uma conta ou utilizar a plataforma JuridIA, o usuário
              declara ter lido, compreendido e aceitado integralmente estes
              Termos de Uso e a Política de Privacidade correspondente. Caso
              não concorde com qualquer disposição, o usuário não deve
              utilizar a plataforma.
            </p>

            <h2>2. Objeto</h2>
            <p>
              A JuridIA oferece soluções baseadas em inteligência artificial
              voltadas à advocacia, incluindo o JuridIA Chat (assistente
              jurídico) e o JuridIA Voice (gravação, transcrição e resumo de
              audiências, reuniões e sustentações). Os produtos podem ser
              contratados em planos mensais ou anuais.
            </p>

            <h2>3. Cadastro e conta</h2>
            <p>
              O usuário compromete-se a fornecer informações verdadeiras,
              completas e atualizadas. É de responsabilidade exclusiva do
              usuário manter em sigilo as credenciais de acesso e responder
              por todas as atividades realizadas em sua conta.
            </p>

            <h2>4. Uso aceitável</h2>
            <p>
              O usuário compromete-se a utilizar a JuridIA em conformidade com
              a legislação brasileira e com o Estatuto da Advocacia,
              abstendo-se de empregar a plataforma para finalidades ilícitas,
              fraudulentas ou contrárias à ética profissional. É vedada a
              engenharia reversa, a revenda não autorizada e o uso indevido
              das funcionalidades de IA.
            </p>

            <h2>5. Responsabilidade profissional</h2>
            <p>
              Os conteúdos gerados pela JuridIA (petições, pareceres,
              resumos, transcrições) têm caráter de apoio à atividade
              profissional. A revisão e a responsabilidade técnica final pelo
              material utilizado em processos ou entregue a clientes são
              exclusivamente do advogado usuário.
            </p>

            <h2>6. Planos, pagamentos e cancelamento</h2>
            <p>
              Os planos vigentes e seus respectivos valores estão descritos na
              página de contratação. A cobrança é recorrente e pode ser
              cancelada a qualquer momento pelo próprio painel do usuário ou
              pelos canais oficiais de atendimento. Não há multa por
              cancelamento nos planos mensais.
            </p>

            <h2>7. Propriedade intelectual</h2>
            <p>
              Todos os direitos sobre a marca JuridIA, o software e os
              conteúdos proprietários são reservados. O conteúdo produzido
              pelo usuário dentro da plataforma permanece de titularidade
              dele, respeitadas as licenças necessárias para a prestação do
              serviço.
            </p>

            <h2>8. Privacidade e dados</h2>
            <p>
              O tratamento de dados pessoais é regido pela{" "}
              <a href="/institucional-2/privacidade">Política de Privacidade</a>
              , parte integrante destes Termos. A JuridIA adota as medidas
              técnicas e organizacionais adequadas para proteger os dados
              tratados em seu ambiente.
            </p>

            <h2>9. Suporte e disponibilidade</h2>
            <p>
              A JuridIA envida os melhores esforços para manter a plataforma
              disponível e estável. Manutenções programadas e incidentes
              serão comunicados pelos canais oficiais. Eventuais
              indisponibilidades pontuais não geram direito a reembolso fora
              das hipóteses previstas na legislação aplicável.
            </p>

            <h2>10. Alterações</h2>
            <p>
              Estes Termos podem ser atualizados periodicamente. Mudanças
              relevantes serão comunicadas com antecedência razoável e, no
              caso de alterações contratuais, o usuário poderá rescindir o
              contrato caso não concorde com a nova versão.
            </p>

            <h2>11. Foro</h2>
            <p>
              Para dirimir quaisquer controvérsias oriundas destes Termos,
              fica eleito o foro da comarca de Curitiba/PR, com renúncia
              expressa a qualquer outro, por mais privilegiado que seja.
            </p>

            <h2>12. Contato</h2>
            <p>
              Em caso de dúvidas sobre estes Termos, escreva para{" "}
              <a href="mailto:contato@juridia.com.br">contato@juridia.com.br</a>
              .
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
