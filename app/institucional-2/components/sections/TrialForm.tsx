"use client";

import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { track } from "lib/analytics"; // registra também o tipo global window.jlp
import { hubTrialReadiness, submitHubTrial } from "lib/hub-checkout";
import { contextoDeAquisicao, ultimoCta } from "lib/acquisition-context";
import { TRIAL_DAYS, TRIAL_DAYS_LABEL } from "lib/trial";

type Step = 1 | 2;

/**
 * SEM campo de senha de propósito (27/08/2026): o teste grátis virou uma
 * CORTESIA criada no Hub — a senha é gerada no servidor e entregue só por
 * e-mail, igual à compra da LP. Senha escolhida num formulário público
 * deixaria qualquer um "recadastrar" o e-mail de outra pessoa.
 */
interface FormData {
  name: string;
  phone: string;
  email: string;
  document: string;
}

const INITIAL_DATA: FormData = {
  name: "",
  phone: "",
  email: "",
  document: "",
};

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function maskDocument(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 11) {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

export function TrialForm() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  /** Prazo REAL devolvido pelo Hub — é o que a confirmação mostra. */
  const [trialDays, setTrialDays] = useState<number | null>(null);
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);
  const [readinessToken, setReadinessToken] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<"PENDING" | "READY" | "DELAYED" | "EXPIRED">("PENDING");
  const [checkRound, setCheckRound] = useState(0);
  useEffect(() => {
    if (!submitted || !readinessToken) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    setReadiness("PENDING");
    const check = async () => {
      const state = await hubTrialReadiness(readinessToken);
      if (cancelled) return;
      if (state === "READY" || state === "EXPIRED") { setReadiness(state); return; }
      if (++attempts >= 12) { setReadiness("DELAYED"); return; }
      timer = setTimeout(check, 5_000);
    };
    void check();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [submitted, readinessToken, checkRound]);
  /**
   * CTA que trouxe a pessoa até aqui. Capturado no PRIMEIRO foco no
   * formulário: depois disso os botões internos ("Continuar", "Começar") são
   * eles mesmos CTAs rastreados e sobrescreveriam o último CTA do snippet.
   * `undefined` = ainda não capturado; `null` = capturado, nenhum clicado.
   */
  const ctaEntrada = useRef<string | null | undefined>(undefined);

  function lembrarCtaDeEntrada() {
    if (ctaEntrada.current === undefined) ctaEntrada.current = ultimoCta();
  }

  const step1Valid =
    data.name.trim().length >= 3 &&
    data.phone.replace(/\D/g, "").length >= 11 &&
    /\S+@\S+\.\S+/.test(data.email);

  const step2Valid = data.document.replace(/\D/g, "").length >= 11;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!step2Valid || submitting) return;
    setSubmitting(true);
    // Autofill pode preencher sem disparar foco — garante o snapshot do CTA.
    lembrarCtaDeEntrada();
    const contexto = contextoDeAquisicao({
      formulario: "institucional-trial",
      ctaEntrada: ctaEntrada.current ?? null,
    });
    try {
      window.jlp?.("trial_submit", {
        source: "institucional-trial",
        cta: contexto.cta_entrada,
      });
    } catch {}
    try {
      // Cadastro confirmado; a prontidão dos produtos é consultada separadamente.
      // `attribution` leva o contexto de aquisição (CTA, campanha, visitante,
      // sessão) — sem isso a conta nasce no Hub sem origem rastreável.
      const resultado = await submitHubTrial({
        name: data.name.trim(),
        email: data.email.trim(),
        doc: data.document.replace(/\D/g, ""),
        phone: data.phone.replace(/\D/g, ""),
        attribution: { origem: "institucional-trial", ...contexto },
      });
      setTrialDays(resultado.trialDays);
      setTrialEndsAt(resultado.trialEndsAt ?? null);
      setReadinessToken(resultado.provisioning?.token ?? null);
      if (!resultado.provisioning?.token) setReadiness("DELAYED");
      const [firstName, ...lastParts] = data.name.trim().split(/\s+/);
      track(
        "Lead",
        { source: "trial_form", content_name: "trial_signup_completed" },
        {
          userData: {
            email: data.email,
            phone: data.phone,
            firstName,
            lastName: lastParts.join(" ") || undefined,
          },
        },
      );
      setSubmitted(true);
      try {
        window.jlp?.("trial_result", { status: "CREATED" });
      } catch {}
    } catch (err) {
      try {
        window.jlp?.("trial_result", {
          status: "ERROR",
          message: err instanceof Error ? err.message.slice(0, 160) : "desconhecido",
        });
      } catch {}
      toast.error(
        err instanceof Error
          ? err.message
          : "Não foi possível criar sua conta. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="i2-trial" id="experimente">
      <div className="i2-trial__card">
        <div className="i2-trial__aside">
          <span className="i2-trial__badge">
            <Sparkles size={14} strokeWidth={2} />
            Teste grátis por {TRIAL_DAYS_LABEL}
          </span>
          <h3 className="i2-trial__title">
            Experimente a JuridIA sem compromisso
          </h3>
          <p className="i2-trial__desc">
            Acesso completo a Chat, Voice, Financeiro e todos os módulos. Sem
            cartão de crédito. Cancele quando quiser.
          </p>
          <ul className="i2-trial__list">
            <li>
              <Check size={16} strokeWidth={2.5} /> {TRIAL_DAYS_LABEL} com acesso total
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} /> Sem cobrança automática
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} /> Suporte humano incluso
            </li>
          </ul>
        </div>

        <form
          className="i2-trial__form"
          onSubmit={handleSubmit}
          onFocus={lembrarCtaDeEntrada}
          noValidate
        >
          {submitted ? (
            <div className="i2-trial__success" role="status" aria-live="polite">
              <div className="i2-trial__success-icon">
                {readiness === "PENDING" ? <Loader2 size={28} className="animate-spin" /> : <Check size={28} strokeWidth={2.5} />}
              </div>
              <h4>{readiness === "READY" ? "Seu acesso está pronto!" : "Cadastro recebido!"}</h4>
              <p>
                {readiness === "READY" ? "Chat e Voice estão disponíveis. " : readiness === "PENDING"
                  ? "Estamos preparando seu acesso ao Chat e ao Voice. " : readiness === "EXPIRED"
                    ? "O prazo deste teste terminou. Consulte as instruções de acesso enviadas ao seu e-mail. "
                    : "A confirmação do acesso está demorando. Seu cadastro já foi recebido; não precisa preencher novamente. "}
                {readiness !== "EXPIRED" && <>As instruções de acesso serão enviadas para <strong>{data.email}</strong>.</>}
                {trialEndsAt && Number.isFinite(Date.parse(trialEndsAt))
                  ? ` Seu teste termina em ${new Date(trialEndsAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })} (Brasília).`
                  : ` Seu teste tem duração de ${trialDays ?? TRIAL_DAYS} dias.`}
              </p>
              {readiness === "DELAYED" && readinessToken && <button type="button" className="i2-trial__submit" onClick={() => setCheckRound(value => value + 1)}>Verificar acesso novamente</button>}
            </div>
          ) : (
            <>
              <div className="i2-trial__steps">
                <div
                  className={`i2-trial__step ${step >= 1 ? "is-active" : ""}`}
                >
                  <span className="i2-trial__step-num">1</span>
                  <span className="i2-trial__step-label">Seus dados</span>
                </div>
                <div className="i2-trial__step-line" aria-hidden="true" />
                <div
                  className={`i2-trial__step ${step >= 2 ? "is-active" : ""}`}
                >
                  <span className="i2-trial__step-num">2</span>
                  <span className="i2-trial__step-label">Acesso</span>
                </div>
              </div>

              {step === 1 && (
                <div className="i2-trial__fields">
                  <label className="i2-trial__field">
                    <span>Nome completo</span>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Como podemos te chamar?"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </label>
                  <label className="i2-trial__field">
                    <span>Telefone</span>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(11) 99999-9999"
                      value={data.phone}
                      onChange={(e) => update("phone", maskPhone(e.target.value))}
                      required
                    />
                  </label>
                  <label className="i2-trial__field">
                    <span>E-mail</span>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="seu@escritorio.com.br"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </label>

                  <button
                    type="button"
                    className="i2-trial__btn i2-trial__btn--primary"
                    onClick={() => step1Valid && setStep(2)}
                    disabled={!step1Valid}
                    data-lp-cta="trial-continuar"
                  >
                    Continuar
                    <ArrowRight size={18} strokeWidth={2} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="i2-trial__fields">
                  <label className="i2-trial__field">
                    <span>CPF ou CNPJ</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      value={data.document}
                      onChange={(e) =>
                        update("document", maskDocument(e.target.value))
                      }
                      required
                    />
                  </label>
                  <p className="i2-trial__legal" style={{ marginTop: 0 }}>
                    Sua senha de acesso é gerada automaticamente e chega no seu
                    e-mail junto com o link de login — nada para decorar agora.
                  </p>

                  <div className="i2-trial__row">
                    <button
                      type="button"
                      className="i2-trial__btn i2-trial__btn--ghost"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={18} strokeWidth={2} />
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="i2-trial__btn i2-trial__btn--primary"
                      disabled={!step2Valid || submitting}
                      data-lp-cta="trial-comecar"
                    >
                      {submitting ? (
                        <Loader2 size={18} strokeWidth={2} className="i2-auth__spin" />
                      ) : (
                        <>
                          Começar teste grátis
                          <ArrowRight size={18} strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <p className="i2-trial__legal">
                Ao continuar, você concorda com os nossos Termos de Uso e
                Política de Privacidade.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
