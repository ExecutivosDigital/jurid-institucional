/**
 * Teste grátis anunciado pelo site — UMA fonte para todos os textos.
 *
 * Regra de produto (plano de 08/09/2026): sete dias completos, sem cartão e
 * sem cobrança automática. O prazo REAL é concedido pelo Hub a partir de
 * `Price.metadata.trialDays` do plano `inst-trial` — este número precisa bater
 * com aquele. O formulário mostra na confirmação o prazo devolvido pelo
 * servidor, então uma divergência aparece na tela em vez de passar despercebida.
 */
export const TRIAL_DAYS = 7;
export const TRIAL_DAYS_LABEL = `${TRIAL_DAYS} dias`;

/**
 * Onde o teste grátis começa: o formulário (#experimente) da home. Todo CTA de
 * "testar grátis" aponta para cá — nunca para a página de planos pagos
 * (/plans → /contratar), que é compra.
 */
export const TRIAL_FORM_HREF = "/#experimente";
