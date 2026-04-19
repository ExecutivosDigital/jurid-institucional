"use client";

import { useApiContext } from "context/ApiContext";
import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import type { PlanProps, ProfileProps } from "types/global";
import { CheckoutFooter } from "./components/checkout-footer";
import { CheckoutSection } from "./components/checkout-section";
import { PlansPageLayout } from "./components/plans-page-layout";
import { PlansSection } from "./components/plans-section";
import type {
  BillingCycle,
  PaymentMethod,
  Plan,
  ViewState,
} from "./components/types";
import {
  getPlanCreditPrice,
  getPlanPixPrice,
  mapPlanPropsToPlan,
  onlyDigits,
  parseExpiry,
} from "./components/utils";

function PlansPageInner() {
  const { GetAPI, PostAPI } = useApiContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewState, setViewState] = useState<ViewState>("plans");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansRaw, setPlansRaw] = useState<PlanProps[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("YEARLY");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileProps | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");

  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [pixPayload, setPixPayload] = useState<string>("");
  const [pixEncodedImage, setPixEncodedImage] = useState<string | null>(null);

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
  const [coupon, setCoupon] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  const urlSynced = useRef(false);

  const fetchPlans = useCallback(async () => {
    setLoadingPlans(true);
    try {
      const res = await GetAPI("/signature-plan", true);
      if (res.status === 200 && Array.isArray(res.body)) {
        const raw = res.body as PlanProps[];
        setPlansRaw(raw);
        setPlans(raw.map(mapPlanPropsToPlan));
        if (raw.length > 0) {
          setSelectedPlan(raw[Math.min(1, raw.length - 1)].id);
        }
      }
    } catch {
      console.error("Erro ao buscar planos");
    } finally {
      setLoadingPlans(false);
    }
  }, [GetAPI]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await GetAPI("/lawyer/profile", true);
      console.log("profile: ", res);
      if (res.status === 200 && res.body) {
        setProfile(res.body as ProfileProps);
      }
    } catch {
      /* opcional */
    }
  }, [GetAPI]);

  useEffect(() => {
    fetchPlans();
    fetchProfile();
  }, [fetchPlans, fetchProfile]);

  useEffect(() => {
    if (profile) {
      if (!cpf) setCpf(profile.paymentDoc ?? "");
      if (!cep) setCep(profile.postalCode ?? "");
      if (!address) setAddress(profile.address ?? "");
      if (!house) setHouse(profile.number ?? "");
      if (!holder) setHolder(profile.name ?? "");
      if (!email) setEmail(profile.email ?? "");
      if (!phone) setPhone(profile.phone ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

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

  useEffect(() => {
    if (urlSynced.current) return;
    const planParam = searchParams.get("plan");
    const yearlyParam = searchParams.get("yearly");
    const checkoutParam = searchParams.get("checkout");
    if (planParam) setSelectedPlan(planParam);
    if (yearlyParam === "true") setBillingCycle("YEARLY");
    if (yearlyParam === "false") setBillingCycle("MONTHLY");
    if (checkoutParam === "1") setViewState("checkout");
    urlSynced.current = true;
  }, [searchParams]);

  useEffect(() => {
    if (!selectedPlan) return;
    const params = new URLSearchParams();
    params.set("plan", selectedPlan);
    params.set("yearly", billingCycle === "YEARLY" ? "true" : "false");
    if (viewState === "checkout") params.set("checkout", "1");
    router.replace(`/plans?${params.toString()}`, { scroll: false });
  }, [selectedPlan, billingCycle, viewState, router]);

  const selectedPlanData = plans.find((p) => p.id === selectedPlan) ?? null;

  const basePrice = selectedPlanData
    ? paymentMethod === "card"
      ? getPlanCreditPrice(selectedPlanData, billingCycle)
      : getPlanPixPrice(selectedPlanData, billingCycle)
    : 0;

  const discountedPrice = basePrice * (1 - discountPercent / 100);
  const isFree = discountPercent === 100;
  const finalPrice = isFree
    ? 0
    : discountPercent > 0
      ? discountedPrice
      : basePrice;

  const canSubmit = useMemo(() => {
    if (!selectedPlan) return false;
    const cpfOk = onlyDigits(cpf).length >= 11;
    const holderOk = holder.trim().length >= 3;
    const emailOk = email.trim().length > 3 && email.includes("@");
    const phoneOk = onlyDigits(phone).length >= 10;
    const cepOk = onlyDigits(cep).length >= 8;
    const addressOk = address.trim().length > 0;
    const houseOk = house.trim().length > 0;
    const addressSectionOk = cepOk && addressOk && houseOk;

    if (isFree) return cpfOk && holderOk && emailOk && phoneOk;
    if (paymentMethod === "pix")
      return cpfOk && holderOk && emailOk && phoneOk && addressSectionOk;

    const cardOk = onlyDigits(cardNumber).length >= 12;
    const cvvOk = onlyDigits(cvv).length >= 3;
    const expOk = !!parseExpiry(exp);
    return (
      cpfOk &&
      holderOk &&
      emailOk &&
      phoneOk &&
      addressSectionOk &&
      cardOk &&
      cvvOk &&
      expOk
    );
  }, [
    cpf,
    holder,
    email,
    phone,
    cep,
    address,
    house,
    cardNumber,
    cvv,
    exp,
    isFree,
    selectedPlan,
    paymentMethod,
  ]);

  async function handleCheckCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    setIsValidatingCoupon(true);
    try {
      const resp = await GetAPI(`/partner/${code}`, true);
      if (resp.status === 200 && resp.body?.discount != null) {
        const discount = Number(resp.body.discount);
        setDiscountPercent(discount);
        toast.success(
          discount === 100
            ? "100% de desconto concedido!"
            : `${discount}% de desconto concedido!`,
        );
      } else {
        setDiscountPercent(0);
        toast.error(String(resp.body?.message || "Cupom inválido."));
      }
    } catch {
      setDiscountPercent(0);
      toast.error("Erro ao validar cupom.");
    } finally {
      setIsValidatingCoupon(false);
    }
  }

  function handleChangePaymentMethod(m: PaymentMethod) {
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
      setPixCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setPixCopied(false), 3000);
    } catch {
      toast.error("Não foi possível copiar.");
    }
  }

  async function onSubmit() {
    if (!canSubmit || !selectedPlan) {
      toast.error(
        paymentMethod === "pix" || isFree
          ? "Verifique seus dados pessoais e endereço."
          : "Verifique os dados do cartão e endereço.",
      );
      return;
    }

    const raw = plansRaw.find((p) => p.id === selectedPlan);
    if (!raw) {
      toast.error("Plano inválido.");
      return;
    }

    setSubmitLoading(true);
    try {
      console.log("entrou");
      if (isFree) {
        const res = await PostAPI(
          `/signature/pix/${selectedPlan}`,
          {
            yearly: billingCycle === "YEARLY",
            partnerCode: coupon.trim() || undefined,
          },
          true,
        );
        console.log("isFree: ", res);
        if (res.status === 200 && (res.body?.gift || !res.body?.payment)) {
          toast.success("Assinatura ativada! Bem-vindo(a).");
          router.push("/thanks");
        } else {
          toast.error(res.body?.message || "Não foi possível ativar.");
        }
        return;
      }

      if (paymentMethod === "pix" && !pixGenerated) {
        console.log("entrou pix");
        const res = await PostAPI(
          `/signature/pix/${selectedPlan}`,
          {
            yearly: billingCycle === "YEARLY",
            partnerCode: coupon.trim() || undefined,
          },
          true,
        );
        console.log("pix: ", res);
        if (res.status === 200 && res.body?.payment) {
          setPixPayload(res.body.payment.payload || "");
          setPixEncodedImage(res.body.payment.encodedImage || null);
          setPixGenerated(true);
        } else if (
          res.status === 200 &&
          (res.body?.gift || !res.body?.payment)
        ) {
          toast.success("Assinatura ativada! Bem-vindo(a).");
          router.push("/thanks");
        } else {
          toast.error(res.body?.message || "Não foi possível gerar o PIX.");
        }
        return;
      }

      if (paymentMethod === "card") {
        console.log("entrou card");
        if (!parseExpiry(exp)) {
          toast.error("Data de validade inválida.");
          return;
        }
        const expParts = exp.trim().split("/");
        const expiryMonth = expParts[0] ?? "";
        const expiryYear = expParts[1] ?? "";
        const payload = {
          planId: selectedPlan,
          yearly: billingCycle === "YEARLY",
          creditCard: {
            holderName: holder.toUpperCase(),
            number: onlyDigits(cardNumber),
            expiryMonth,
            expiryYear,
            ccv: onlyDigits(cvv),
          },
          creditCardHolderInfo: {
            name: holder,
            email: email.trim(),
            cpfCnpj: onlyDigits(cpf),
            postalCode: onlyDigits(cep),
            addressNumber: house.trim(),
            phone: onlyDigits(phone),
          },
          installmentCount: 12,
          partnerCode: coupon.trim() || undefined,
        };
        console.log("payload: ", payload);
        const res = await PostAPI("/signature/credit/new", payload, true);
        console.log("credit/new: ", res);
        if (res.status === 200) {
          toast.success("Pagamento realizado com sucesso!");
          router.push("/thanks");
        } else {
          toast.error(res.body?.message || "Erro ao processar pagamento.");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setSubmitLoading(false);
    }
  }

  function handleBack() {
    if (pixGenerated) {
      setPixGenerated(false);
      setPixPayload("");
      setPixEncodedImage(null);
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
    if (isFree) return "";
    if (paymentMethod === "card" && billingCycle === "YEARLY")
      return "Cobrança em 12x (anual)";
    if (paymentMethod === "card") return "Cobrança mensal";
    return billingCycle === "YEARLY"
      ? "Valor total anual via PIX"
      : "Pagamento via PIX";
  };

  const submitLabel = () => {
    if (submitLoading) return "Processando...";
    if (isFree) return "Confirmar inscrição gratuita";
    if (paymentMethod === "pix" && !pixGenerated) return "Gerar PIX";
    if (paymentMethod === "pix") return "Já paguei — continuar";
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
              plans={plans}
              loadingPlans={loadingPlans}
              billingCycle={billingCycle}
              selectedPlan={selectedPlan}
              onBillingCycleChange={setBillingCycle}
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
              billingCycle={billingCycle}
              paymentMethod={paymentMethod}
              isFree={isFree}
              discountPercent={discountPercent}
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
              coupon={coupon}
              pixGenerated={pixGenerated}
              pixCopied={pixCopied}
              pixPayload={pixPayload}
              pixEncodedImage={pixEncodedImage}
              isValidatingCoupon={isValidatingCoupon}
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
              onCouponChange={setCoupon}
              onCheckCoupon={handleCheckCoupon}
              onCopyPixCode={handleCopyPixCode}
              onAlreadyPaid={() => router.push("/thanks")}
            />
          )}
        </AnimatePresence>

        <CheckoutFooter
          show={showCheckoutFooter}
          priceLabel={priceLabel()}
          basePrice={basePrice}
          discountPercent={discountPercent}
          finalPrice={finalPrice}
          isFree={isFree}
          billingCycle={billingCycle}
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
