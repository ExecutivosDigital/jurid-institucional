import type { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — JuridIA",
  description:
    "Política de Privacidade da JuridIA. Saiba como tratamos seus dados pessoais em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Navbar showAnnounce={false} />
      <main className="i2-legal">
        <div className="i2-container">
          <header className="i2-legal__header">
            <span className="i2-legal__eyebrow">Legal</span>
            <h1 className="i2-legal__title">Política de Privacidade</h1>
            <p className="i2-legal__sub">
              Última atualização: {new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </header>

          <article className="i2-legal__content">
            <h2>1. Introdução</h2>
            <p>
              A JuridIA ("nós", "nosso" ou "JuridIA") valoriza a privacidade dos
              usuários da plataforma. Esta Política de Privacidade descreve como
              coletamos, utilizamos, armazenamos e protegemos os dados pessoais
              dos advogados, escritórios e demais usuários da JuridIA, em
              conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei
              13.709/2018 — LGPD) e com as demais normas aplicáveis.
            </p>

            <h2>2. Dados que coletamos</h2>
            <p>
              Coletamos dados que você fornece diretamente (como nome, e-mail,
              telefone, OAB, CPF/CNPJ, dados de pagamento), dados gerados pelo
              uso da plataforma (histórico de conversas, documentos enviados,
              gravações e transcrições no JuridIA Voice) e dados técnicos
              (endereço IP, tipo de dispositivo, informações do navegador).
            </p>

            <h2>3. Finalidade do tratamento</h2>
            <p>
              Utilizamos seus dados para prestar os serviços contratados,
              personalizar a experiência de uso, emitir cobranças, enviar
              comunicações operacionais e de marketing (quando autorizado),
              cumprir obrigações legais e regulatórias e prevenir fraudes.
            </p>

            <h2>4. Sigilo profissional</h2>
            <p>
              A JuridIA reconhece o dever de sigilo profissional que rege a
              advocacia. Informações de clientes e casos inseridas na plataforma
              são tratadas com o mesmo zelo que o escritório dedicaria
              internamente, não são utilizadas para treinar modelos
              generalistas e permanecem acessíveis somente ao usuário titular
              da conta e à equipe que ele autorizar.
            </p>

            <h2>5. Compartilhamento de dados</h2>
            <p>
              Não comercializamos seus dados pessoais. Compartilhamos
              informações apenas com prestadores de serviços estritamente
              necessários (hospedagem, processamento de pagamento,
              infraestrutura de IA), sempre sob obrigações contratuais de
              confidencialidade e segurança compatíveis com a LGPD.
            </p>

            <h2>6. Armazenamento e segurança</h2>
            <p>
              Os dados são armazenados em servidores com criptografia em
              trânsito e em repouso. Adotamos controles de acesso baseados em
              função, monitoramento contínuo e políticas de retenção que
              limitam o uso dos dados ao tempo necessário para cumprir as
              finalidades descritas nesta política.
            </p>

            <h2>7. Seus direitos</h2>
            <p>
              A qualquer momento, você pode solicitar acesso, correção,
              portabilidade, anonimização, bloqueio ou eliminação dos seus
              dados pessoais. Para exercer qualquer um desses direitos,
              entre em contato pelo e-mail{" "}
              <a href="mailto:privacidade@juridia.com.br">
                privacidade@juridia.com.br
              </a>
              .
            </p>

            <h2>8. Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente. Alterações
              relevantes serão comunicadas pelos canais oficiais da JuridIA.
              O uso continuado da plataforma após a publicação de uma nova
              versão implica concordância com os termos atualizados.
            </p>

            <h2>9. Contato</h2>
            <p>
              Dúvidas sobre esta Política de Privacidade? Escreva para{" "}
              <a href="mailto:privacidade@juridia.com.br">
                privacidade@juridia.com.br
              </a>
              .
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
