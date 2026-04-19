"use client";

import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useApiContext } from "context/ApiContext";
import { track } from "lib/analytics";
import {
  buildLawyerRegisterBody,
  getLawyerRegisterErrorMessage,
  redirectToAppWithToken,
} from "lib/lawyer-register";

type Step = 1 | 2;

interface FormData {
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_DATA: FormData = {
  name: "",
  phone: "",
  email: "",
  document: "",
  password: "",
  confirmPassword: "",
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
  const { PostAPI } = useApiContext();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const step1Valid =
    data.name.trim().length >= 3 &&
    data.phone.replace(/\D/g, "").length >= 11 &&
    /\S+@\S+\.\S+/.test(data.email);

  const step2Valid =
    data.document.replace(/\D/g, "").length >= 11 &&
    data.password.length >= 6 &&
    data.password === data.confirmPassword;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!step2Valid || submitting) return;
    setSubmitting(true);
    const phoneDigits = data.phone.replace(/\D/g, "");
    const res = await PostAPI(
      "/lawyer/register",
      buildLawyerRegisterBody({
        name: data.name,
        email: data.email,
        phoneDigits,
        password: data.password,
        trial: true,
      }),
      false
    );
    setSubmitting(false);
    if (res.status === 200 && res.body?.accessToken) {
      track("Lead", {
        source: "trial_form",
        content_name: "trial_signup_completed",
      });
      redirectToAppWithToken(res.body.accessToken as string);
      return;
    }
    if (res.status === 200) {
      track("Lead", {
        source: "trial_form",
        content_name: "trial_signup_completed",
      });
      setSubmitted(true);
      return;
    }
    toast.error(getLawyerRegisterErrorMessage(res.body));
  }

  return (
    <div className="i2-trial">
      <div className="i2-trial__card">
        <div className="i2-trial__aside">
          <span className="i2-trial__badge">
            <Sparkles size={14} strokeWidth={2} />
            Teste grátis por 4 dias
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
              <Check size={16} strokeWidth={2.5} /> 4 dias com acesso total
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} /> Sem cobrança automática
            </li>
            <li>
              <Check size={16} strokeWidth={2.5} /> Suporte humano incluso
            </li>
          </ul>
        </div>

        <form className="i2-trial__form" onSubmit={handleSubmit} noValidate>
          {submitted ? (
            <div className="i2-trial__success">
              <div className="i2-trial__success-icon">
                <Check size={28} strokeWidth={2.5} />
              </div>
              <h4>Conta criada com sucesso!</h4>
              <p>
                Enviamos um e-mail para <strong>{data.email}</strong> com os
                próximos passos. Sua avaliação gratuita começa agora.
              </p>
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
                  <label className="i2-trial__field">
                    <span>Senha</span>
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Mínimo de 6 caracteres"
                      value={data.password}
                      onChange={(e) => update("password", e.target.value)}
                      required
                      minLength={6}
                    />
                  </label>
                  <label className="i2-trial__field">
                    <span>Confirme sua senha</span>
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Repita a senha"
                      value={data.confirmPassword}
                      onChange={(e) =>
                        update("confirmPassword", e.target.value)
                      }
                      required
                    />
                    {data.confirmPassword &&
                      data.password !== data.confirmPassword && (
                        <small className="i2-trial__error">
                          As senhas não conferem.
                        </small>
                      )}
                  </label>

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
