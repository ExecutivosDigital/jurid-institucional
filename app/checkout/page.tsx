"use client";

/**
 * /checkout — o checkout da VSL PORTADO para dentro do institucional (mesma
 * tela, mesmo motor: o checkout público do Hub). A oferta vem de `?plano=`
 * (inst-individual / inst-escritorio / a de teste com apelido obscuro) e o
 * botão "Voltar aos planos" leva ao /contratar.
 *
 * `ssr: false` de propósito: a oferta é escolhida pela query string no
 * BROWSER (offer.config lê window.location) — renderizar no servidor
 * mostraria o preço padrão por um instante e hidrataria com outro.
 */

import dynamic from "next/dynamic";

const CheckoutPage = dynamic(() => import("./CheckoutPage"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f0ede8]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#AB8E63] border-t-transparent" />
      <p className="text-sm font-medium text-[#5b667a]">Carregando checkout…</p>
    </div>
  ),
});

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
