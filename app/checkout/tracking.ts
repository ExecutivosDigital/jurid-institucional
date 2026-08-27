/**
 * ============================================================
 *  Instrumentação do /checkout
 * ------------------------------------------------------------
 *  Responde, no Hub (seção LPs → aba Checkout):
 *   · por qual botão a pessoa chegou aqui e quanto tempo ficou na LP antes;
 *   · quanto tempo ficou no checkout e em que campo travou;
 *   · quais campos preencheu, quais errou e quantas vezes corrigiu;
 *   · que caminho seguiu: gerou Pix e sumiu? voltou e pagou no cartão?
 *     copiou o código e não pagou? deixou o Pix expirar?
 *
 *  REGRA INEGOCIÁVEL: nunca sai daqui o VALOR de um campo.
 *  Vai o nome do campo, se ficou válido, o tempo e o nº de correções.
 *  E-mail, CPF, telefone e cartão são dado pessoal — analytics não é
 *  lugar para eles, e o cartão ainda arrastaria a LP para escopo PCI.
 *
 *  ÚNICA EXCEÇÃO: o terceiro argumento de `track` (`user`) leva e-mail, nome
 *  e telefone para a correspondência avançada da Meta, e SÓ para ela — o
 *  `metaTrack` os hasheia em SHA-256 no servidor. Esse argumento nunca chega
 *  ao dataLayer, ao gtag nem ao tracking do Hub; ver `track` em lib/analytics.
 *  CPF e cartão continuam fora: a Meta não os usa e o cartão é escopo PCI.
 * ============================================================
 */

import { track, type UserInfo } from "./analytics-adapter";

/** Etapas do funil, em ordem. A maior alcançada vai no evento de abandono. */
const ETAPAS = [
  "entrou",
  "preencheu_dados",
  "escolheu_pagamento",
  "enviou",
  "gerou_pix",
  "concluiu",
] as const;
export type Etapa = (typeof ETAPAS)[number];

type EstadoCampo = { preenchido: boolean; valido: boolean; correcoes: number; msAte: number };

const estado = {
  inicio: 0,
  /** Última etapa alcançada — é o que diz ONDE o abandono aconteceu. */
  etapa: "entrou" as Etapa,
  campos: new Map<string, EstadoCampo>(),
  ultimoCampo: null as string | null,
  metodo: null as string | null,
  tentativas: 0,
  pixAtivo: false,
  pixCopiado: false,
  concluido: false,
  abandonoEnviado: false,
};

/** Milissegundos desde que a pessoa abriu o checkout. */
function ms(): number {
  return estado.inicio ? Date.now() - estado.inicio : 0;
}

function subirEtapa(nova: Etapa) {
  if (ETAPAS.indexOf(nova) > ETAPAS.indexOf(estado.etapa)) estado.etapa = nova;
}

export const checkoutTracking = {
  /** Início da sessão de checkout. Chamar uma vez, na montagem da página. */
  entrou(metodoInicial: string, totalCents: number) {
    estado.inicio = Date.now();
    estado.metodo = metodoInicial;
    track("checkout_view", {
      metodoInicial,
      total: totalCents / 100,
      // De onde veio: o snippet guarda o último CTA clicado na LP, então dá
      // para saber QUAL botão trouxe esta pessoa — não só que ela veio.
      origem: sessionStorage.getItem("jlp_ultimo_cta") ?? "direto",
      msNaLp: Number(sessionStorage.getItem("jlp_ms_ate_checkout") ?? 0),
    });

    // Abandono: a pessoa fecha a aba sem concluir. Sem isto, o funil
    // simplesmente perde essas sessões e o checkout parece melhor do que é.
    addEventListener("pagehide", () => checkoutTracking.abandonou());
    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") checkoutTracking.abandonou();
    });
  },

  /**
   * Campo tocado (chamar no blur). `valido` vem da MESMA validação que a UI
   * usa — assim o relatório de erro bate com o que a pessoa viu na tela.
   */
  campo(nome: string, valido: boolean, preenchido: boolean) {
    const anterior = estado.campos.get(nome);
    const correcoes = anterior ? anterior.correcoes + 1 : 0;
    estado.campos.set(nome, { preenchido, valido, correcoes, msAte: ms() });
    if (preenchido) estado.ultimoCampo = nome;

    track("checkout_field", {
      campo: nome,
      preenchido,
      valido,
      // Nº de vezes que voltou nele: campo que exige 3 correções é campo com
      // problema de máscara ou de rótulo, não usuário desatento.
      correcoes,
      ms: ms(),
    });
  },

  /** Todos os campos obrigatórios de dados pessoais ficaram válidos. */
  dadosCompletos() {
    subirEtapa("preencheu_dados");
  },

  metodo(metodo: string, origem?: string) {
    // Trocar de método é um SINAL, não ruído: pix → cartão depois de gerar o
    // código costuma ser desconfiança do Pix; cartão → pix costuma ser recusa.
    const anterior = estado.metodo;
    estado.metodo = metodo;
    subirEtapa("escolheu_pagamento");
    track("payment_method_selected", { metodo, anterior, origem: origem ?? "form", ms: ms() });
  },

  parcelas(n: number) {
    track("installments_selected", { parcelas: n, ms: ms() });
  },

  cupom(codigo: string, aceito: boolean) {
    // O código do cupom não é dado pessoal — e saber qual cupom as pessoas
    // TENTAM (e falha) diz que campanha prometeu desconto que não existe.
    track("coupon_attempt", { codigo: codigo.slice(0, 24), aceito, ms: ms() });
  },

  /** Submit barrado pela validação do formulário. */
  erroDeValidacao(campos: string[], metodo: string) {
    track("checkout_error", {
      origem: "validacao",
      campos: campos.join(","),
      metodo,
      ms: ms(),
    });
  },

  enviou(dados: {
    metodo: string;
    parcelas: number;
    totalCents: number;
    /** Só para a Meta — ver a exceção no cabeçalho deste arquivo. */
    user?: UserInfo;
  }) {
    estado.tentativas += 1;
    subirEtapa("enviou");
    track(
      "checkout_submit",
      {
        metodo: dados.metodo,
        parcelas: dados.parcelas,
        total: dados.totalCents / 100,
        // 2ª e 3ª tentativa são a assinatura de cartão recusado.
        tentativa: estado.tentativas,
        ms: ms(),
      },
      dados.user,
    );
  },

  resultado(dados: {
    metodo: string;
    status: string;
    checkoutId?: string;
    msRequisicao: number;
    totalCents: number;
    /** Resultado fabricado pelo modo vitrine — ver CheckoutResult.demo. */
    demo?: boolean;
    /** Só para a Meta — ver a exceção no cabeçalho deste arquivo. */
    user?: UserInfo;
  }) {
    if (dados.metodo === "pix") {
      estado.pixAtivo = true;
      subirEtapa("gerou_pix");
    }
    if (dados.status === "PAID") {
      estado.concluido = true;
      subirEtapa("concluiu");
    }
    track(
      "checkout_result",
      {
        metodo: dados.metodo,
        status: dados.status,
        checkoutId: dados.checkoutId,
        // Latência do gateway: checkout lento é checkout abandonado.
        msRequisicao: dados.msRequisicao,
        ms: ms(),
        // `value` e `currency` têm esses nomes porque são o contrato de
        // custom_data do Purchase da Meta — sem eles a conversão entra sem
        // receita e o ROAS da campanha fica zerado.
        value: dados.totalCents / 100,
        currency: "BRL",
        demo: dados.demo === true,
      },
      dados.user,
    );
  },

  erroDoGateway(metodo: string, motivo: string) {
    track("checkout_error", { origem: "gateway", metodo, motivo: motivo.slice(0, 160), ms: ms() });
  },

  pixCopiado() {
    estado.pixCopiado = true;
    // Copiou o código = intenção real de pagar. Quem copia e não paga é a
    // fila de recuperação; quem nem copiou desistiu antes.
    track("pix_copied", { ms: ms() });
  },

  pixExpirou() {
    track("pix_expired", { copiado: estado.pixCopiado, ms: ms() });
  },

  pixRegenerado() {
    track("pix_regenerated", { ms: ms() });
  },

  /** Voltou da tela de Pix para o formulário (com ou sem trocar para cartão). */
  voltouAoFormulario(paraCartao: boolean) {
    track("checkout_back_to_form", {
      paraCartao,
      pixEstavaAtivo: estado.pixAtivo,
      pixCopiado: estado.pixCopiado,
      ms: ms(),
    });
  },

  /** Saiu sem concluir. Dispara no máximo uma vez por sessão de checkout. */
  abandonou() {
    if (estado.concluido || estado.abandonoEnviado || !estado.inicio) return;
    estado.abandonoEnviado = true;

    // Array.from em vez de spread: o target do tsconfig daqui é anterior ao es2015.
    const camposValidos = Array.from(estado.campos.values()).filter((c) => c.valido).length;
    track("checkout_abandon", {
      etapa: estado.etapa,
      // O campo em que parou é o "campo assassino" do formulário.
      ultimoCampo: estado.ultimoCampo ?? "nenhum",
      camposPreenchidos: camposValidos,
      metodo: estado.metodo,
      tentativas: estado.tentativas,
      pixAtivo: estado.pixAtivo,
      pixCopiado: estado.pixCopiado,
      ms: ms(),
    });
  },
};
