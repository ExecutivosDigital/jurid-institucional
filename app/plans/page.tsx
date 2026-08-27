import { redirect } from "next/navigation";

/**
 * /plans era o fluxo LEGADO de compra (advogado logado escolhia plano e pagava
 * aqui dentro, via jurid-api). Desde 27/08/2026 a página de planos do site é o
 * /contratar e a compra acontece no /checkout (portado da VSL, motor do Hub).
 *
 * Este redirect existe porque /plans está espalhado em links antigos (áreas do
 * site, e-mails, o próprio app) — quebrá-los seria perder quem chega por eles.
 * A query vai junto: /plans?plano=… continua revelando a oferta de teste lá.
 */
export default function PlansRedirect({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = new URLSearchParams();
  for (const [chave, valor] of Object.entries(searchParams)) {
    if (typeof valor === "string") query.set(chave, valor);
  }
  const sufixo = query.toString();
  redirect(sufixo ? `/contratar?${sufixo}` : "/contratar");
}
