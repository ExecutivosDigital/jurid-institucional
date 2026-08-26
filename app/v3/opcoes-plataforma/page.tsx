import type { Metadata } from "next";
import { Footer } from "../components/sections/Footer";
import { Nav } from "../components/sections/Nav";
import { PlatformBento } from "../components/sections/PlatformBento";
import { PlatformIndex } from "../components/sections/PlatformIndex";
import { PlatformStage } from "../components/sections/PlatformStage";

export const metadata: Metadata = {
  title: "Opções da seção Plataforma — JuridIA",
  robots: { index: false, follow: false },
};

/** Página de comparação. Não faz parte do site — serve para escolher a versão. */
function Divider({ tag, name, note }: { tag: string; name: string; note: string }) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--line-2)",
        background: "var(--cream-2)",
        padding: "22px 0",
      }}
    >
      <div className="v3-wrap">
        <span className="v3-eyebrow">{tag}</span>
        <h2
          style={{
            marginTop: 10,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </h2>
        <p style={{ marginTop: 6, fontSize: 14.5, color: "var(--ink-2)", maxWidth: "70ch" }}>
          {note}
        </p>
      </div>
    </div>
  );
}

export default function OpcoesPlataformaPage() {
  return (
    <>
      <Nav transparentOnTop={false} />

      <main style={{ paddingTop: 78 }}>
        <Divider
          tag="Versão A"
          name="Bento editorial"
          note="Hierarquia por peso visual: Chat ocupa o dobro e mostra o produto rodando; Voice, Consultas e Meu Juiz IA ganham motivo próprio; as outras doze viram um índice compacto embaixo. Claro, arejado e assimétrico."
        />
        <PlatformBento />

        <Divider
          tag="Versão B"
          name="Palco cinematográfico"
          note="Bloco escuro que quebra o creme e vira o destaque da página. Percorre as 16 sozinho, uma por vez em tamanho grande, com trilho numerado à esquerda. Pausa quando o mouse entra."
        />
        <PlatformStage />

        <Divider
          tag="Versão atual"
          name="Grade uniforme"
          note="O que está no ar hoje: dezesseis cartões iguais. Serve de referência para comparar."
        />
        <PlatformIndex />
      </main>

      <Footer />
    </>
  );
}
