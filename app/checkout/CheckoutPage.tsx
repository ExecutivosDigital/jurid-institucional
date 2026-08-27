/**
 * ============================================================
 *  /checkout — página de compra (tema claro)
 * ------------------------------------------------------------
 *  Layout espelhado do mockup aprovado (`hotmart checkout/index.html`):
 *  coluna única de 620px, topbar com a logo, cabeçalho do produto,
 *  dados pessoais, cupom, formas de pagamento, detalhes da compra,
 *  rodapé escuro e barra fixa de compra.
 *
 *  Diferenças pedidas em relação ao mockup:
 *   · um único campo de e-mail (sem "confirme seu e-mail");
 *   · sem número da OAB;
 *   · CEP só aparece no pagamento por cartão;
 *   · sem boleto e sem "Mostrar mais" — só cartão e Pix;
 *   · "Detalhes da compra" virou card da marca + bloco de compra segura;
 *   · cupom estilizado.
 *
 *  BACKEND: `submitCheckout` (checkout/api.ts) chama o `POST /public/checkout`
 *  do jurid-hub-api. A oferta comprada vem de `?plano=` (offer.config.ts) e o
 *  "pago" NUNCA sai do retorno do submit: quem confirma é o polling do
 *  `GET /public/checkout/:id`, alimentado pelo webhook do gateway.
 * ============================================================
 */

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Check, ChevronDown, CreditCard, Loader2, Lock, ShieldCheck, Tag, X } from "lucide-react";
import { brl, installments, offer, planoAtual, voltaExterna } from "./offer.config";
import { Field, PayOption, Section } from "./ui";
import { AcceptedBrands, MastercardMark, PixMark, VisaMark, WordMark } from "./marks";
import { CheckoutStatus } from "./Status";
import { checkoutStatus, offerDisponivel, submitCheckout, type CheckoutPayload } from "./api";
import { checkoutTracking } from "./tracking";
import {
  cardBrand,
  isCardNumber,
  isCep,
  isCpfCnpj,
  isCvv,
  isEmail,
  isExpiry,
  isFullName,
  isPhone,
  maskCard,
  maskCep,
  maskCpfCnpj,
  maskCvv,
  maskExpiry,
  maskNumber,
  maskPhone,
} from "./masks";

type Method = "card" | "pix";
type Errors = Partial<Record<string, string>>;

/** Cupons aceitos na vitrine. O desconto real é validado no servidor. */
const COUPONS: Record<string, number> = { JURIDIA10: 0.1, VSL20: 0.2 };

export default function CheckoutPage() {
  /* ---------------- estado ---------------- */
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [doc, setDoc] = useState("");
  const [phone, setPhone] = useState("");

  /* Pix vem selecionado: é o meio mais usado e o de liberação imediata. */
  const [method, setMethod] = useState<Method>("pix");
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cep, setCep] = useState("");
  const [addrNumber, setAddrNumber] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const [installment, setInstallment] = useState(1);

  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; off: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | {
    method: Method;
    total: number;
    checkoutId?: string;
    pixCode?: string;
    qrBase64?: string;
    expiresIn?: number;
  }>(null);
  /* Pagamento CONFIRMADO pelo servidor — nunca pelo retorno do submit. */
  const [paid, setPaid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const payRef = useRef<HTMLDivElement>(null);
  /* Último corpo enviado — usado para gerar outro Pix quando o código expira. */
  const lastPayload = useRef<CheckoutPayload | null>(null);

  /* O <body> da LP é escuro; enquanto o checkout está montado ele fica claro. */
  useEffect(() => {
    document.body.classList.add("checkout-light");
    return () => document.body.classList.remove("checkout-light");
  }, []);

  useEffect(() => {
    checkoutTracking.entrou(method, offer.priceCents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Oferta de exceção (?plano=…) que o Hub já fechou: em vez de deixar a
     pessoa preencher tudo e levar "Plano não encontrado" no submit, volta
     agora para a oferta padrão — mesma página, sem o parâmetro. */
  useEffect(() => {
    // Sem `?plano=` explícito é a oferta padrão — verificar não faz sentido e,
    // pior, um 404 dela criaria loop de reload (o replace abaixo só tira o
    // parâmetro; sem parâmetro para tirar, recarregaria para sempre).
    if (!new URLSearchParams(window.location.search).get("plano")) return;
    let vivo = true;
    offerDisponivel().then((ok) => {
      if (!vivo || ok) return;
      const url = new URL(window.location.href);
      url.searchParams.delete("plano");
      window.location.replace(url.toString());
    });
    return () => {
      vivo = false;
    };
  }, []);

  /* ---------------- instrumentação dos campos ---------------- */
  /* Só o NOME do campo, se ficou válido e o tempo — nunca o valor digitado.
     Ver o cabeçalho de checkout/tracking.ts. */
  function blur(campo: string, valor: string, valido: (v: string) => boolean) {
    return () => {
      const preenchido = valor.trim().length > 0;
      checkoutTracking.campo(campo, preenchido && valido(valor), preenchido);
      if (isEmail(email) && isFullName(name) && isCpfCnpj(doc) && isPhone(phone)) {
        checkoutTracking.dadosCompletos();
      }
    };
  }

  /* Identidade para a correspondência avançada da Meta — e SÓ para ela.
     Quanto mais campo casado, maior o Event Match Quality e melhor a Meta
     acha públicos semelhantes a quem já comprou. */
  function metaUser() {
    const partes = name.trim().split(/\s+/);
    return {
      email,
      phone,
      firstName: partes[0] || undefined,
      lastName: partes.length > 1 ? partes[partes.length - 1] : undefined,
    };
  }

  /* ---------------- totais ---------------- */
  const discountCents = coupon ? Math.round(offer.priceCents * coupon.off) : 0;
  const totalCents = offer.priceCents - discountCents;

  const plans = useMemo(() => {
    // O cupom desconta proporcionalmente também nas parcelas.
    const ratio = totalCents / offer.priceCents;
    return installments().map((i) => ({
      n: i.n,
      cents: Math.round(i.cents * ratio),
      totalCents: Math.round(i.totalCents * ratio),
    }));
  }, [totalCents]);

  const last = plans[plans.length - 1];

  /* ---------------- CEP → endereço (ViaCEP) ---------------- */
  useEffect(() => {
    if (!isCep(cep)) {
      setAddress(null);
      return;
    }
    const controller = new AbortController();
    fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d: { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string; uf?: string }) => {
        if (d.erro) return setAddress(null);
        setAddress(
          [d.logradouro, d.bairro, d.localidade && `${d.localidade}/${d.uf}`].filter(Boolean).join(" · ")
        );
      })
      .catch(() => {
        /* Autofill é conveniência: falha de rede não pode bloquear a compra. */
      });
    return () => controller.abort();
  }, [cep]);

  /* ---------------- cupom ---------------- */
  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    const off = COUPONS[code];
    if (!off) {
      setCouponError("Cupom inválido ou expirado.");
      setCoupon(null);
      checkoutTracking.cupom(code, false);
      return;
    }
    setCoupon({ code, off });
    setCouponError(null);
    setInstallment(1);
    checkoutTracking.cupom(code, true);
  }

  /* ---------------- validação e submit ---------------- */
  function validate(): Errors {
    const e: Errors = {};
    if (!isEmail(email)) e.email = "Informe um e-mail válido — é nele que o acesso chega.";
    if (!isFullName(name)) e.name = "Informe nome e sobrenome.";
    if (!isCpfCnpj(doc)) e.doc = "CPF ou CNPJ inválido.";
    if (!isPhone(phone)) e.phone = "Informe um celular com DDD.";
    if (method === "card") {
      if (!isCardNumber(cardNum)) e.cardNum = "Número do cartão incompleto.";
      if (!isFullName(cardName)) e.cardName = "Digite o nome como está impresso no cartão.";
      if (!isExpiry(expiry)) e.expiry = "Validade inválida.";
      if (!isCvv(cvv)) e.cvv = "CVV inválido.";
      if (!isCep(cep)) e.cep = "CEP obrigatório para cobrança no cartão.";
      if (!addrNumber.trim()) e.addrNumber = "Informe o número.";
    }
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      checkoutTracking.erroDeValidacao(Object.keys(e), method);
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    checkoutTracking.enviou({
      metodo: method,
      parcelas: installment,
      totalCents,
      user: metaUser(),
    });
    const iniciouEm = Date.now();
    try {
      const payload: CheckoutPayload = {
        method,
        email,
        name,
        doc,
        phone,
        coupon: coupon?.code ?? null,
        installments: method === "card" ? installment : 1,
        card:
          method === "card"
            ? { number: cardNum, holder: cardName, expiry, cvv, cep, addrNumber }
            : null,
      };
      lastPayload.current = payload;
      const result = await submitCheckout(payload);
      checkoutTracking.resultado({
        metodo: method,
        status: result.status,
        checkoutId: result.checkoutId,
        msRequisicao: Date.now() - iniciouEm,
        totalCents,
        demo: result.demo,
        user: metaUser(),
      });
      setStatus({
        method,
        total: totalCents,
        checkoutId: result.checkoutId,
        pixCode: result.pix?.copiaECola,
        qrBase64: result.pix?.qrBase64,
        expiresIn: result.pix?.expiraEmSegundos,
      });
      setPaid(result.status === "PAID");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "Não foi possível concluir. Tente novamente.",
      });
      checkoutTracking.erroDoGateway(
        method,
        err instanceof Error ? err.message : "desconhecido"
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Polling do pagamento — o único caminho pelo qual a tela diz "pago".
   *
   * Vale para os dois métodos: no Pix a confirmação chega minutos depois, e no
   * cartão o Hub também espera o webhook (a cobrança nasce PENDING mesmo com a
   * operadora tendo aprovado). 4s é o intervalo do plano de analytics; para
   * quando confirma ou quando a tela de status sai.
   */
  useEffect(() => {
    const id = status?.checkoutId;
    if (!id || paid) return;
    let vivo = true;
    const timer = setInterval(async () => {
      const atual = await checkoutStatus(id);
      if (!vivo || atual?.status !== "PAID") return;
      setPaid(true);
      // Purchase da Meta sai AQUI, não no submit: antes disso não houve venda.
      checkoutTracking.resultado({
        metodo: status!.method,
        status: "PAID",
        checkoutId: id,
        msRequisicao: 0,
        totalCents: status!.total,
        user: metaUser(),
      });
    }, 4000);
    return () => {
      vivo = false;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status?.checkoutId, paid]);

  /** Volta ao formulário com tudo preenchido; opcionalmente já no cartão. */
  function backToForm(selectCard = false) {
    checkoutTracking.voltouAoFormulario(selectCard);
    if (selectCard) {
      setMethod("card");
      checkoutTracking.metodo("card", "tela_pix");
    }
    setStatus(null);
    // O React precisa pintar o formulário antes de podermos rolar até ele.
    requestAnimationFrame(() =>
      payRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    );
  }

  /** Pede outro código Pix reenviando exatamente o mesmo corpo. */
  async function regeneratePix() {
    const payload = lastPayload.current;
    if (!payload) return backToForm();
    checkoutTracking.pixRegenerado();
    setStatus(null);
    setLoading(true);
    try {
      const result = await submitCheckout(payload);
      setStatus({
        method: "pix",
        total: totalCents,
        checkoutId: result.checkoutId,
        pixCode: result.pix?.copiaECola,
        qrBase64: result.pix?.qrBase64,
        expiresIn: result.pix?.expiraEmSegundos,
      });
    } catch {
      setErrors({ submit: "Não foi possível gerar um novo código. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  if (status) {
    return (
      <CheckoutStatus
        method={status.method}
        totalCents={status.total}
        email={email}
        pixCode={status.pixCode}
        qrBase64={status.qrBase64}
        paid={paid}
        expiresIn={status.expiresIn}
        onBack={() => backToForm()}
        onSwitchToCard={() => backToForm(true)}
        onRegenerate={regeneratePix}
      />
    );
  }

  const brandOfCard = cardBrand(cardNum);
  const volta = voltaExterna();

  return (
    <div className="flex min-h-screen justify-center bg-ck-page font-body text-ck-ink">
      <div className="flex w-full max-w-[620px] flex-col pb-[92px]">
        <div className="overflow-hidden bg-white sm:rounded-b-xl">
          {/* ---------------- topbar ---------------- */}
          <div className="flex items-center gap-3 border-b border-ck-line px-[18px] py-3.5">
            {/* Quem chegou dos planos do institucional (?voltar=planos) tem o
                caminho de volta explícito — sem ele, o "voltar" do browser é a
                única saída e metade clica no logo e cai na VSL, outra página. */}
            {volta && (
              <a
                href={volta.href}
                className="-ml-2 flex min-h-[44px] items-center gap-1.5 rounded-md px-2 text-[13px] font-bold text-ck-ink-muted transition-colors duration-150 hover:text-ck-ink"
              >
                <span aria-hidden="true">←</span>
                {volta.label}
              </a>
            )}
            <a
              href="/"
              aria-label="Voltar para a página inicial"
              className={volta ? "ml-auto" : ""}
            >
              <img src="/media/juridia-logo.png" alt="JuridIA" className="block h-8 w-auto" />
            </a>
          </div>

          <div className="flex justify-end px-[22px] pt-2.5">
            <span className="flex items-center gap-1.5 text-[13px] font-bold text-ck-ink">
              <span className="text-[11px] font-bold text-ck-ink-muted">BR</span> Brasil (Real)
            </span>
          </div>

          {/* ---------------- produto ---------------- */}
          <div className="flex gap-4 px-[22px] pb-1.5 pt-3.5">
            <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-md bg-ck-navy">
              <img src="/media/juridia-icon.png" alt="" className="block w-16" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[17px] font-bold leading-[1.3] tracking-[-.2px] text-ck-ink">
                {offer.productName}
              </h1>
              <p className="mt-1 text-[12.5px] text-ck-ink-muted">Autor: {offer.seller}</p>
              <p className="mt-1.5 font-display text-[20px] font-extrabold text-ck-ink">
                {brl(totalCents)}
              </p>
              <p className="mt-0.5 text-[12.5px] text-ck-ink-muted">
                ou em {last.n} x de {brl(last.cents)} <span aria-hidden="true">*</span> no cartão
              </p>
              <p className="mt-2.5 text-[12.5px] leading-[1.55] text-ck-ink-muted">
                <span className="font-bold text-ck-gold-dark">JURIDIA</span> — {offer.description}
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            {/* ---------------- dados pessoais ---------------- */}
            <Section title="Dados pessoais">
              <div className="space-y-3.5">
                <Field
                  label="Seu e-mail"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Digite seu e-mail para receber a compra"
                  value={email}
                  onValueChange={setEmail}
                  onBlur={blur("email", email, isEmail)}
                  error={errors.email}
                />
                <Field
                  label="Nome completo"
                  autoComplete="name"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onValueChange={setName}
                  onBlur={blur("nome", name, isFullName)}
                  error={errors.name}
                />
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field
                    label="CPF/CNPJ"
                    inputMode="numeric"
                    placeholder="Digite o número do seu CPF ou CNPJ"
                    mask={maskCpfCnpj}
                    value={doc}
                    onValueChange={setDoc}
                    onBlur={blur("cpf_cnpj", doc, isCpfCnpj)}
                    error={errors.doc}
                  />
                  <div>
                    <label
                      htmlFor="celular"
                      className="mb-1.5 block text-[13.5px] font-semibold text-ck-ink"
                    >
                      Celular
                    </label>
                    <div className="flex gap-2">
                      <span className="flex h-[46px] w-[92px] shrink-0 items-center justify-center gap-1.5 rounded-md border border-ck-line-strong bg-white text-[13.5px] font-semibold text-ck-ink">
                        <span className="text-[10px] font-bold text-ck-ink-muted">BR</span> +55
                      </span>
                      <input
                        id="celular"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="(11) 90000-0000"
                        value={phone}
                        onChange={(e) => setPhone(maskPhone(e.target.value))}
                        onBlur={blur("celular", phone, isPhone)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "celular-erro" : undefined}
                        className={`h-[46px] w-full min-w-0 flex-1 rounded-md border bg-white px-3.5 text-[14.5px] text-ck-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#9aa3b2] ${
                          errors.phone
                            ? "border-red-500 focus:shadow-[0_0_0_3px_rgba(220,38,38,.14)]"
                            : "border-ck-line-strong focus:border-ck-gold focus:shadow-[0_0_0_3px_rgba(171,142,99,.18)]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p id="celular-erro" role="alert" className="mt-1 text-[12.5px] text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Section>

            {/* ---------------- cupom ---------------- */}
            <div className="mx-5 mt-4 overflow-hidden rounded-lg border border-ck-line sm:mx-[22px]">
              {coupon ? (
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f2fbf5] p-4">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ck-success/12 text-ck-success">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[14px] font-bold text-ck-ink">
                        Cupom {coupon.code} aplicado
                      </span>
                      <span className="block text-[12.5px] font-semibold text-ck-success">
                        Você economizou {brl(discountCents)} ({Math.round(coupon.off * 100)}% de desconto)
                      </span>
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCoupon(null);
                      setCouponInput("");
                    }}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 px-2 text-[13px] font-bold text-ck-ink-muted transition-colors duration-150 hover:text-ck-ink"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    Remover
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setCouponOpen((v) => !v)}
                    aria-expanded={couponOpen}
                    className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 px-4 text-left transition-colors duration-150 hover:bg-ck-canvas"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ck-gold/12 text-ck-gold-dark">
                        <Tag className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[14px] font-bold text-ck-ink">
                          Tem um cupom de desconto?
                        </span>
                        <span className="block text-[12.5px] text-ck-ink-muted">
                          Aplique antes de escolher o pagamento.
                        </span>
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-ck-ink-muted transition-transform duration-200 ${couponOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {couponOpen && (
                    <div className="border-t border-ck-line bg-ck-canvas p-4">
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <input
                          aria-label="Código do cupom"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="DIGITE SEU CUPOM"
                          className="h-11 w-full flex-1 rounded-md border border-ck-line-strong bg-white px-3.5 text-[14px] uppercase tracking-[.06em] text-ck-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:tracking-normal placeholder:text-[#9aa3b2] focus:border-ck-gold focus:shadow-[0_0_0_3px_rgba(171,142,99,.18)]"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="h-11 shrink-0 cursor-pointer rounded-md bg-ck-navy px-6 text-[14px] font-bold text-white transition-colors duration-150 hover:bg-ck-navy-900"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p role="alert" className="mt-2 text-[12.5px] text-red-600">
                          {couponError}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ---------------- pagamento ---------------- */}
            <div ref={payRef} className="scroll-mt-6">
              <Section title="Escolha a forma de pagamento" className="pt-5">
              <PayOption
                selected={method === "pix"}
                onSelect={() => {
                  setMethod("pix");
                  checkoutTracking.metodo("pix");
                }}
                icon={<PixMark className="h-5 w-5" />}
                name="Pix"
                note="Liberação imediata"
              >
                <div className="text-[13.5px] leading-[1.6] text-ck-ink-muted">
                  Pagamento instantâneo e liberação imediata do acesso, com renovação automática
                  pelo <strong className="text-ck-ink">Pix Automático</strong>.
                  <ul className="mt-2 list-disc space-y-1 pl-[18px]">
                    <li>O QR Code será gerado após clicar em “Comprar agora”</li>
                    <li>Você autoriza uma única vez no app do seu banco</li>
                    <li>As renovações caem sozinhas — sem gerar Pix todo mês</li>
                  </ul>
                </div>
              </PayOption>

              <PayOption
                selected={method === "card"}
                onSelect={() => {
                  setMethod("card");
                  checkoutTracking.metodo("card");
                }}
                icon={<CreditCard className="h-5 w-5" aria-hidden="true" />}
                name="Cartão de crédito"
                note={`Em até ${offer.maxInstallments}x`}
                aside={
                  <span className="hidden items-center gap-1.5 text-ck-ink-muted sm:flex">
                    <VisaMark className="h-4 w-7" />
                    <MastercardMark className="h-4 w-7" />
                    <WordMark label="ELO" className="h-4 w-8" />
                  </span>
                }
              >
                <div className="space-y-3.5">
                  <Field
                    label="Número do cartão"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="Digite o número do seu cartão"
                    mask={maskCard}
                    value={cardNum}
                    onValueChange={setCardNum}
                    onBlur={blur("cartao_numero", cardNum, isCardNumber)}
                    error={errors.cardNum}
                    adornment={
                      brandOfCard === "mastercard" ? (
                        <MastercardMark className="h-5 w-8 text-ck-navy" />
                      ) : brandOfCard === "visa" ? (
                        <VisaMark className="h-5 w-8 text-ck-navy" />
                      ) : brandOfCard ? (
                        <WordMark label={brandOfCard.toUpperCase()} className="h-5 w-10 text-ck-navy" />
                      ) : (
                        <CreditCard className="h-4 w-4 text-[#9aa3b2]" aria-hidden="true" />
                      )
                    }
                  />
                  <Field
                    label="Nome do titular"
                    autoComplete="cc-name"
                    placeholder="Digite o nome impresso no cartão"
                    value={cardName}
                    onValueChange={setCardName}
                    onBlur={blur("cartao_titular", cardName, isFullName)}
                    error={errors.cardName}
                  />
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field
                      label="Validade"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/AA"
                      mask={maskExpiry}
                      value={expiry}
                      onValueChange={setExpiry}
                      onBlur={blur("cartao_validade", expiry, isExpiry)}
                      error={errors.expiry}
                    />
                    <Field
                      label="Código de segurança"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="CVV"
                      mask={maskCvv}
                      value={cvv}
                      onValueChange={setCvv}
                      onBlur={blur("cartao_cvv", cvv, isCvv)}
                      error={errors.cvv}
                    />
                  </div>

                  {/* CEP só existe aqui: é o endereço de cobrança do cartão. */}
                  <div className="grid gap-3.5 sm:grid-cols-[1fr_130px]">
                    <Field
                      label="Código postal (CEP)"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="Digite aqui seu CEP"
                      mask={maskCep}
                      value={cep}
                      onValueChange={setCep}
                      onBlur={blur("cep", cep, isCep)}
                      error={errors.cep}
                      hint={address ?? "Endereço da fatura do cartão."}
                    />
                    <Field
                      label="Número"
                      inputMode="numeric"
                      placeholder="123"
                      mask={maskNumber}
                      value={addrNumber}
                      onValueChange={setAddrNumber}
                      onBlur={blur("endereco_numero", addrNumber, (v) => v.trim().length > 0)}
                      error={errors.addrNumber}
                    />
                  </div>

                  {/* Seletor de parcelas só aparece quando há mais de uma
                      opção. Oferta à vista com um <select> de item único é
                      ruído — e, enquanto o Hub não cobra parcelado, mostrar
                      12x seria oferecer o que o servidor recusa. */}
                  {plans.length > 1 && (
                  <div>
                    <label
                      htmlFor="parcelas"
                      className="mb-1.5 block text-[13.5px] font-semibold text-ck-ink"
                    >
                      Selecione o número de parcelas
                    </label>
                    <select
                      id="parcelas"
                      value={installment}
                      onChange={(e) => {
                        setInstallment(Number(e.target.value));
                        checkoutTracking.parcelas(Number(e.target.value));
                      }}
                      className="h-[46px] w-full cursor-pointer rounded-md border border-ck-line-strong bg-white px-3.5 text-[14.5px] text-ck-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-ck-gold focus:shadow-[0_0_0_3px_rgba(171,142,99,.18)]"
                    >
                      {plans.map((p) => (
                        <option key={p.n} value={p.n}>
                          {p.n} x de {brl(p.cents)}
                          {p.n > 1 ? " *" : ""}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[12.5px] text-ck-ink-muted">
                      * O valor parcelado possui acréscimo.
                    </p>
                  </div>
                  )}
                </div>
              </PayOption>

              </Section>
            </div>

            {errors.submit && (
              <p
                role="alert"
                className="mx-5 mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700 sm:mx-[22px]"
              >
                {errors.submit}
              </p>
            )}
          </form>

          {/* ---------------- detalhes da compra ---------------- */}
          <Section title="Detalhes da compra" className="pt-6">
            <div className="overflow-hidden rounded-xl border border-ck-line shadow-[0_6px_22px_-12px_rgba(18,29,46,.35)]">
              <div className="relative overflow-hidden bg-ck-navy px-5 py-5">
                <span
                  className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-ck-gold/25 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-between gap-4">
                  <img src="/media/juridia-logo-white.png" alt="JuridIA" className="h-6 w-auto" />
                  <span className="rounded-full border border-ck-gold/50 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.12em] text-ck-gold-light">
                    Plano Pro
                  </span>
                </div>
                <p className="relative mt-3.5 font-display text-[15px] font-bold leading-snug text-white">
                  {offer.productName}
                </p>
                <ul className="relative mt-3 space-y-1.5">
                  {offer.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-[#c8cedb]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ck-gold-light" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="space-y-2.5 bg-white px-5 py-4 text-[13.5px]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ck-ink-muted">Assinatura {offer.productName.split("—")[0].trim()}</dt>
                  <dd className="font-bold text-ck-ink">{brl(offer.priceCents)}</dd>
                </div>
                {discountCents > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ck-ink-muted">Desconto ({coupon?.code})</dt>
                    <dd className="font-bold text-ck-success">− {brl(discountCents)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4 border-t border-ck-line pt-3">
                  <dt className="text-[12px] font-bold uppercase tracking-[.1em] text-ck-ink-muted">Total</dt>
                  <dd className="text-right">
                    <span className="block font-display text-[22px] font-extrabold leading-none text-ck-ink">
                      {brl(totalCents)}
                    </span>
                    <span className="mt-1 block text-[12px] text-ck-ink-muted">
                      {method === "pix"
                        ? "à vista no Pix"
                        : installment > 1
                          ? `${installment}x de ${brl(plans[installment - 1].cents)}`
                          : "à vista no cartão"}
                    </span>
                  </dd>
                </div>
              </dl>

              <p className="border-t border-ck-line bg-ck-canvas px-5 py-3 text-[12.5px] leading-relaxed text-ck-ink-muted">
                Acesso liberado por e-mail assim que o pagamento for confirmado. Garantia incondicional de{" "}
                <strong className="font-bold text-ck-gold-dark">{offer.guaranteeDays} dias</strong>.
              </p>
            </div>
          </Section>

          {/* ---------------- compra segura ---------------- */}
          <Section className="pb-7 pt-5">
            <div className="rounded-xl border border-ck-line bg-ck-canvas p-4">
              <p className="mb-3 flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[.12em] text-ck-gold-dark">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Compra segura
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {[
                  { icon: Lock, title: "Conexão segura", desc: "Criptografia SSL 256 bits" },
                  { icon: ShieldCheck, title: "Dados protegidos", desc: "Cartão nunca fica conosco" },
                  {
                    icon: Check,
                    title: `Garantia de ${offer.guaranteeDays} dias`,
                    desc: "Devolvemos o valor integral",
                  },
                  { icon: CreditCard, title: "Pagamento oficial", desc: "Processado pela JuridIA" },
                ].map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-2.5 rounded-lg bg-white px-3 py-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ck-gold/12 text-ck-gold-dark">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12.5px] font-bold text-ck-ink">{title}</span>
                      <span className="block text-[11.5px] leading-snug text-ck-ink-muted">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-ck-line pt-3">
                <span className="text-[11px] font-bold uppercase tracking-[.1em] text-ck-ink-muted">
                  Aceitamos
                </span>
                <AcceptedBrands className="text-ck-ink-muted" />
              </div>
            </div>
          </Section>
        </div>

        {/* ---------------- rodapé ---------------- */}
        <footer className="bg-ck-navy-900 px-6 py-7 text-[12px] leading-[1.7] text-[#c8cedb] sm:rounded-b-xl">
          <p className="mb-3.5">
            <a href={offer.support} className="font-semibold text-white underline-offset-2 hover:underline">
              Tem dúvidas sobre o produto? Entre em contato com o suporte
            </a>
          </p>
          <p className="mb-3.5">
            <a href={offer.support} className="font-semibold text-white underline-offset-2 hover:underline">
              Não consegue finalizar esta compra? Acesse nossa Central de Ajuda
            </a>
          </p>
          <p className="mb-3.5">
            Ao clicar em “Comprar agora”, eu declaro que li e concordo (i) que a JuridIA está processando
            este pedido em nome de <strong className="text-white">{offer.seller}</strong>; (ii) com os{" "}
            <a href={offer.terms} className="font-semibold text-white underline-offset-2 hover:underline">
              Termos de Uso
            </a>
            ,{" "}
            <a href={offer.privacy} className="font-semibold text-white underline-offset-2 hover:underline">
              Política de Privacidade
            </a>{" "}
            e demais políticas da JuridIA; e (iii) que sou maior de idade ou autorizado e acompanhado por um
            responsável legal.
          </p>
          {plans.length > 1 && (
            <p className="text-[#8e97a8]">*O valor parcelado possui acréscimo.</p>
          )}
          <p className="text-[#8e97a8]">JuridIA © {new Date().getFullYear()} — Todos os direitos reservados</p>
        </footer>
      </div>

      {/* ---------------- barra fixa de compra ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white py-3 shadow-[0_-4px_18px_rgba(15,27,61,.12)]">
        <div className="mx-auto flex max-w-[620px] items-center justify-between gap-4 px-5 sm:px-[22px]">
          <span className="min-w-0">
            <span className="block text-[11px] uppercase tracking-[.1em] text-ck-ink-muted">Total</span>
            <span className="block truncate font-display text-[19px] font-extrabold leading-tight text-ck-ink">
              {brl(totalCents)}
            </span>
          </span>
          <button
            type="button"
            disabled={loading}
            onClick={() => formRef.current?.requestSubmit()}
            className="flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-ck-gold px-5 text-[15.5px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(171,142,99,.45)] transition-colors duration-150 hover:bg-ck-gold-dark disabled:cursor-not-allowed disabled:opacity-70 sm:max-w-[260px]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Processando…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" aria-hidden="true" />
                Comprar agora
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
