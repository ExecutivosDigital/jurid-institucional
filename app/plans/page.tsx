"use client";

/**
 * /plans — escolha de plano + checkout do INSTITUCIONAL, agora no MESMO motor
 * da LP da VSL: o checkout público do Hub (jurid-hub-api).
 *
 * O que mudou em relação ao fluxo legado (27/08/2026):
 *  · os planos são os da página /contratar (Individual R$ 169,90 e Escritório
 *    R$ 199,90, mensais; Enterprise segue no WhatsApp) — fixos aqui, cobrados
 *    pelo CATÁLOGO do Hub via apelido (`inst-individual` / `inst-escritorio`);
 *  · o visitante NÃO precisa estar logado: a conta nasce no Hub na compra e o
 *    acesso (login + senha) chega por E-MAIL quando o pagamento confirma;
 *  · PIX é PIX AUTOMÁTICO: um QR só autoriza a recorrência e paga a 1ª
 *    cobrança — a renovação passa a ser debitada sozinha;
 *  · "pago" NUNCA sai do retorno do submit: é o polling do status (alimentado
 *    pelo webhook do gateway) que confirma e leva para /thanks;
 *  · cupom saiu — o checkout público do Hub não o suporta (quando entrar lá,
 *    volta aqui).
 */

import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  HUB_PLAN_CODES,
  hubCheckoutStatus,
  hubOfferDisponivel,
  submitHubCheckout,
} from "lib/hub-checkout";
// registra o tipo global window.jlp (snippet j.js do Hub)
import "lib/analytics";
import { CheckoutFooter } from "./components/checkout-footer";
import { CheckoutSection } from "./components/checkout-section";
import { PlansPageLayout } from "./components/plans-page-layout";
import { PlansSection } from "./components/plans-section";
import type { PaymentMethod, Plan, ViewState } from "./components/types";
import { onlyDigits, parseExpiry } from "./components/utils";

/**
 * Vitrine — os valores REAIS vêm do catálogo do Hub na cobrança; divergir
 * daqui seria mostrar um preço e cobrar outro. O 3º card é o Enterprise
 * (sob consulta), que o PlansSection manda para o WhatsApp.
 */
const HUB_PLANS: Plan[] = [
  {
    id: HUB_PLAN_CODES.individual,
    name: "Individual",
    description: "Para o advogado autônomo começar agora",
    pixMonthlyPrice: 169.9,
    creditMonthlyPrice: 169.9,
    pixPrice: 169.9,
    yearlyDiscount: 0,
  },
  {
    id: HUB_PLAN_CODES.escritorio,
    name: "Escritório",
    description: "Para equipes que querem escalar a rotina jurídica",
    pixMonthlyPrice: 199.9,
    creditMonthlyPrice: 199.9,
    pixPrice: 199.9,
    yearlyDiscount: 0,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Plano sob medida para grandes escritórios",
    pixMonthlyPrice: 0,
    creditMonthlyPrice: 0,
    pixPrice: 0,
    yearlyDiscount: 0,
  },
];

/** Tracking do Hub (mesmos eventos do checkout da VSL) — nunca derruba a página. */
function jlp(evento: string, props?: Record<string, unknown>) {
  try {
    window.jlp?.(evento, props);
  } catch {}
}

function PlansPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewState, setViewState] = useState<ViewState>("plans");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    HUB_PLANS[1].id,
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");

  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [pixPayload, setPixPayload] = useState<string>("");
  const [pixEncodedImage, setPixEncodedImage] = useState<string | null>(null);
  /** Id devolvido pelo Hub — é ele que o polling consulta até virar PAID. */
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [holder, setHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [exp, setExp] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const urlSynced = useRef(false);

  /* CEP → endereço (conveniência de exibição; a cobrança usa CEP + número) */
  useEffect(() => {
    const cleaned = onlyDigits(cep);
    if (cleaned.length === 8) {
      fetch(`https://brasilapi.com.br/api/cep/v2/${cleaned}`)
        .then((r) => r.json())
        .then(
          (data: {
            street?: string;
            neighborhood?: string;
            city?: string;
            state?: string;
            cep?: string;
          }) => {
            if (data.cep) {
              setAddress(
                [data.street, data.neighborhood, data.city]
                  .filter(Boolean)
                  .join(", ") + (data.state ? ` - ${data.state}` : ""),
              );
            }
          },
        )
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cep]);

  /* ?plan= da URL (vem dos CTAs de preço do site) */
  useEffect(() => {
    if (urlSynced.current) return;
    const planParam = searchParams.get("plan");
    const checkoutParam = searchParams.get("checkout");
    if (planParam && HUB_PLANS.some((p) => p.id === planParam)) {
      setSelectedPlan(planParam);
    }
    if (checkoutParam === "1") setViewState("checkout");
    urlSynced.current = true;
  }, [searchParams]);

  useEffect(() => {
    if (!selectedPlan) return;
    const params = new URLSearchParams();
    params.set("plan", selectedPlan);
    if (viewState === "checkout") params.set("checkout", "1");
    router.replace(`/plans?${params.toString()}`, { scroll: false });
  }, [selectedPlan, viewState, router]);

  /* Oferta fechada no Hub não pode virar erro na cara do cliente: se o plano
     escolhido não está à venda, volta para a seleção com aviso. */
  useEffect(() => {
    if (!selectedPlan || selectedPlan === "enterprise") return;
    let vivo = true;
    hubOfferDisponivel(selectedPlan).then((ok) => {
      if (!vivo || ok) return;
      toast.error("Este plano não está disponível no momento.");
      setViewState("plans");
    });
    return () => {
      vivo = false;
    };
  }, [selectedPlan]);

  /**
   * Polling do pagamento — o ÚNICO caminho pelo qual a tela diz "pago". Vale
   * para Pix e cartão: quem confirma é o webhook do gateway, via status do Hub.
   */
  useEffect(() => {
    if (!checkoutId || paid) return;
    let vivo = true;
    const timer = setInterval(async () => {
      const atual = await hubCheckoutStatus(checkoutId);
      if (!vivo || atual?.status !== "PAID") return;
      setPaid(true);
      // o "pago" DE VERDADE — é este que vale como conversão no funil
      jlp("checkout_result", { status: "PAID", confirmadoPeloPolling: true });
      toast.success("Pagamento confirmado! Seu acesso chegou no seu e-mail.");
      router.push("/thanks");
    }, 4000);
    return () => {
      vivo = false;
      clearInterval(timer);
    };
  }, [checkoutId, paid, router]);

  const selectedPlanData =
    HUB_PLANS.find((p) => p.id === selectedPlan) ?? null;

  const basePrice = selectedPlanData?.pixMonthlyPrice ?? 0;
  const finalPrice = basePrice;

  const canSubmit = useMemo(() => {
    if (!selectedPlan || selectedPlan === "enterprise") return false;
    const cpfOk = onlyDigits(cpf).length >= 11;
    const holderOk = holder.trim().length >= 3;
    const emailOk = email.trim().length > 3 && email.includes("@");
    const phoneOk = onlyDigits(phone).length >= 10;

    // PIX Automático não precisa de endereço — só os dados da pessoa.
    if (paymentMethod === "pix") return cpfOk && holderOk && emailOk && phoneOk;

    // Cartão: o gateway exige CEP e número no holderInfo.
    const cepOk = onlyDigits(cep).length >= 8;
    const houseOk = house.trim().length > 0;
    const cardOk = onlyDigits(cardNumber).length >= 12;
    const cvvOk = onlyDigits(cvv).length >= 3;
    const expOk = !!parseExpiry(exp);
    return (
      cpfOk && holderOk && emailOk && phoneOk && cepOk && houseOk && cardOk && cvvOk && expOk
    );
  }, [cpf, holder, email, phone, cep, house, cardNumber, cvv, exp, selectedPlan, paymentMethod]);

  /* Funil do checkout na seção LPs do admin — mesmos nomes da VSL. */
  useEffect(() => {
    if (viewState === "checkout" && selectedPlan) {
      jlp("checkout_view", { plan: selectedPlan });
    }
  }, [viewState, selectedPlan]);

  function handleChangePaymentMethod(m: PaymentMethod) {
    jlp("payment_method_selected", { method: m });
    setPaymentMethod(m);
    setPixGenerated(false);
    setPixCopied(false);
    setPixPayload("");
    setPixEncodedImage(null);
  }

  async function handleCopyPixCode() {
    if (!pixPayload) return;
    try {
      await navigator.clipboard.writeText(pixPayload);
      // copiar o código é a intenção de pagar mais forte antes do pagamento
      jlp("pix_copied", { plan: selectedPlan ?? undefined });
      setPixCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setPixCopied(false), 3000);
    } catch {
      toast.error("Não foi possível copiar.");
    }
  }

  async function onSubmit() {
    if (!canSubmit || !selectedPlan || !selectedPlanData) {
      toast.error(
        paymentMethod === "pix"
          ? "Verifique seus dados pessoais."
          : "Verifique seus dados e os do cartão.",
      );
      return;
    }

    setSubmitLoading(true);
    jlp("checkout_submit", { plan: selectedPlan, method: paymentMethod });
    try {
      if (paymentMethod === "pix" && !pixGenerated) {
        const res = await submitHubCheckout({
          plan: selectedPlan,
          method: "pix",
          name: holder,
          email: email.trim(),
          doc: onlyDigits(cpf),
          phone: onlyDigits(phone),
          attribution: { origem: "institucional-plans" },
        });
        setCheckoutId(res.checkoutId);
        setPixPayload(res.pix?.copiaECola ?? "");
        setPixEncodedImage(res.pix?.qrBase64 ?? null);
        setPixGenerated(true);
        jlp("checkout_result", { plan: selectedPlan, method: "pix", status: res.status });
        return;
      }

      if (paymentMethod === "card") {
        const expiry = parseExpiry(exp);
        if (!expiry) {
          toast.error("Data de validade inválida.");
          return;
        }
        const res = await submitHubCheckout({
          plan: selectedPlan,
          method: "card",
          name: holder,
          email: email.trim(),
          doc: onlyDigits(cpf),
          phone: onlyDigits(phone),
          card: {
            holderName: holder.toUpperCase(),
            number: onlyDigits(cardNumber),
            expiryMonth: expiry.month,
            expiryYear: expiry.year,
            ccv: onlyDigits(cvv),
            postalCode: onlyDigits(cep),
            addressNumber: house.trim(),
          },
          attribution: { origem: "institucional-plans" },
        });
        setCheckoutId(res.checkoutId);
        jlp("checkout_result", { plan: selectedPlan, method: "card", status: res.status });
        if (res.status === "PAID") {
          setPaid(true);
          toast.success("Pagamento aprovado! Seu acesso chegou no seu e-mail.");
          router.push("/thanks");
        } else {
          // Cartão em análise: o polling acompanha; o acesso sai por e-mail.
          toast.success(
            "Pagamento em processamento — assim que confirmar, o acesso chega no seu e-mail.",
          );
        }
      }
    } catch (e) {
      jlp("checkout_error", {
        plan: selectedPlan,
        method: paymentMethod,
        message: e instanceof Error ? e.message.slice(0, 160) : "desconhecido",
      });
      toast.error(e instanceof Error ? e.message : "Ocorreu um erro inesperado.");
    } finally {
      setSubmitLoading(false);
    }
  }

  function handleBack() {
    if (pixGenerated) {
      setPixGenerated(false);
      setPixPayload("");
      setPixEncodedImage(null);
      setCheckoutId(null);
      return;
    }
    if (viewState === "checkout") {
      setViewState("plans");
      return;
    }
    router.push("/");
  }

  const isCheckout = viewState === "checkout";

  const priceLabel = () => {
    if (paymentMethod === "card") return "Cobrança mensal no cartão";
    return "Assinatura mensal via Pix Automático";
  };

  const submitLabel = () => {
    if (submitLoading) return "Processando...";
    if (paymentMethod === "pix" && !pixGenerated) return "Gerar PIX";
    if (paymentMethod === "pix") return "Aguardando pagamento…";
    return "Finalizar pagamento";
  };

  const showCheckoutFooter =
    isCheckout && !(pixGenerated && paymentMethod === "pix");

  return (
    <>
      <PlansPageLayout
        viewState={viewState}
        onBack={handleBack}
        submitLoading={submitLoading}
      >
        <AnimatePresence mode="wait">
          {viewState === "plans" && (
            <PlansSection
              key="plans"
              plans={HUB_PLANS}
              loadingPlans={false}
              billingCycle="MONTHLY"
              selectedPlan={selectedPlan}
              onBillingCycleChange={() => {}}
              onPlanSelect={setSelectedPlan}
              onContinue={() => {
                if (selectedPlan) setViewState("checkout");
              }}
            />
          )}

          {viewState === "checkout" && selectedPlanData && (
            <CheckoutSection
              key="checkout"
              selectedPlan={selectedPlanData}
              billingCycle="MONTHLY"
              paymentMethod={paymentMethod}
              isFree={false}
              discountPercent={0}
              finalPrice={finalPrice}
              cpf={cpf}
              holder={holder}
              email={email}
              phone={phone}
              cep={cep}
              address={address}
              house={house}
              cardNumber={cardNumber}
              cvv={cvv}
              exp={exp}
              pixGenerated={pixGenerated}
              pixCopied={pixCopied}
              pixPayload={pixPayload}
              pixEncodedImage={pixEncodedImage}
              onPaymentMethodChange={handleChangePaymentMethod}
              onCpfChange={setCpf}
              onHolderChange={setHolder}
              onEmailChange={setEmail}
              onPhoneChange={setPhone}
              onCepChange={setCep}
              onAddressChange={setAddress}
              onHouseChange={setHouse}
              onCardNumberChange={setCardNumber}
              onCvvChange={setCvv}
              onExpChange={setExp}
              onCopyPixCode={handleCopyPixCode}
              onAlreadyPaid={() => router.push("/thanks")}
            />
          )}
        </AnimatePresence>

        <CheckoutFooter
          show={showCheckoutFooter}
          priceLabel={priceLabel()}
          basePrice={basePrice}
          discountPercent={0}
          finalPrice={finalPrice}
          isFree={false}
          billingCycle="MONTHLY"
          paymentMethod={paymentMethod}
          submitLoading={submitLoading}
          canSubmit={canSubmit}
          submitLabel={submitLabel()}
          onSubmit={onSubmit}
        />
      </PlansPageLayout>
    </>
  );
}

export default function PlansPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-n-1 text-n-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary-1 border-t-transparent" />
          <p className="text-sm font-medium">Carregando…</p>
        </div>
      }
    >
      <PlansPageInner />
    </Suspense>
  );
}
