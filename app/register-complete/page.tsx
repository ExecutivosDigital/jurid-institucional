import { redirect } from "next/navigation";
import { HUB_PLAN_CODES } from "lib/hub-checkout";

/**
 * /register-complete era o cadastro PRÉ-COMPRA do fluxo legado: criava a conta
 * na jurid-api (POST /lawyer/register com trial=false) e mandava "continuar
 * para pagamento". Classificação (plano de 08/09/2026): rota de COMPRA, não de
 * teste — e hoje a conta nasce dentro do próprio checkout do Hub. Links antigos
 * (?plan=individual|escritorio|enterprise) caem no fluxo de compra atual, sem
 * manter um segundo cadastro vivo no site.
 */
export default function RegisterCompleteRedirect({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const plan = searchParams.plan;
  if (plan === "individual") redirect(`/checkout?plano=${HUB_PLAN_CODES.individual}`);
  if (plan === "escritorio") redirect(`/checkout?plano=${HUB_PLAN_CODES.escritorio}`);
  redirect("/contratar");
}
