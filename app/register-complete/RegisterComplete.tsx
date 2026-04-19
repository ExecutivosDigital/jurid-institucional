"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { useApiContext } from "context/ApiContext";
import {
  buildLawyerRegisterBody,
  getLawyerRegisterErrorMessage,
} from "lib/lawyer-register";
import { getTokenCookieName, getTokenCookieOptions } from "lib/auth-cookies";
import { maskPhone } from "lib/masks";
import { useCookies } from "next-client-cookies";
import { PLANS, type PlanKey } from "../contratar/plans";

function isValidPlan(value: string | null): value is PlanKey {
  return value === "individual" || value === "escritorio" || value === "enterprise";
}

export function RegisterComplete() {
  const { PostAPI } = useApiContext();
  const cookies = useCookies();
  const router = useRouter();
  const params = useSearchParams();
  const planParam = params.get("plan");
  const plan = useMemo(
    () => (isValidPlan(planParam) ? PLANS[planParam] : PLANS.escritorio),
    [planParam]
  );
  const PlanIcon = plan.icon;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): string | null {
    if (name.trim().length < 2) return "Informe seu nome completo.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Email inválido.";
    if (phone.replace(/\D/g, "").length < 11)
      return "Telefone inválido — inclua DDD e o número completo (11 dígitos).";
    if (password.length < 6)
      return "Senha precisa ter pelo menos 6 caracteres.";
    if (password !== confirm) return "As senhas não coincidem.";
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubmitting(true);
    const phoneDigits = phone.replace(/\D/g, "");
    const res = await PostAPI(
      "/lawyer/register",
      buildLawyerRegisterBody({
        name,
        email,
        phoneDigits,
        password,
        trial: false,
      }),
      false
    );
    setSubmitting(false);
    if (res.status === 200) {
      const token = res.body?.accessToken;
      if (typeof token === "string" && token.length > 0) {
        cookies.set(
          getTokenCookieName(),
          token,
          getTokenCookieOptions(true)
        );
      }
      router.push(`/checkout-v2?plan=${plan.key}`);
      return;
    }
    setError(getLawyerRegisterErrorMessage(res.body));
  }

  return (
    <div className="i2-auth">
      <aside className="i2-auth__aside">
        <div className="i2-auth__aside-glow" aria-hidden="true" />
        <Link href="/institucional-2" className="i2-auth__brand">
          <Image
            src="/images/logo/logo-white.png"
            alt="JuridIA"
            width={160}
            height={40}
            priority
          />
        </Link>

        <div className="i2-auth__plan">
          <span className="i2-auth__plan-eyebrow">
            <Sparkles size={12} strokeWidth={2.5} />
            Plano selecionado
          </span>
          <div className="i2-auth__plan-head">
            <span className="i2-auth__plan-icon">
              <PlanIcon size={22} strokeWidth={2} />
            </span>
            <div>
              <h3 className="i2-auth__plan-name">{plan.name}</h3>
              <p className="i2-auth__plan-tagline">{plan.tagline}</p>
            </div>
          </div>

          {!plan.isEnterprise ? (
            <div className="i2-auth__plan-price">
              <span className="i2-auth__plan-price-old">
                De R$ {plan.originalPrice}
              </span>
              <div className="i2-auth__plan-price-new">
                <span className="i2-auth__plan-price-currency">R$</span>
                <span className="i2-auth__plan-price-value">
                  {plan.promoPrice}
                </span>
                <span className="i2-auth__plan-price-suffix">
                  {plan.priceSuffix}
                </span>
              </div>
              <span className="i2-auth__plan-note">{plan.promoNote}</span>
            </div>
          ) : (
            <div className="i2-auth__plan-price">
              <span className="i2-auth__plan-price-custom">Sob consulta</span>
              <span className="i2-auth__plan-note">{plan.promoNote}</span>
            </div>
          )}

          <ul className="i2-auth__plan-features">
            {plan.features.map((f) => (
              <li key={f}>
                <span className="i2-auth__plan-check">
                  <Check size={11} strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="i2-auth__aside-footer">
          Ambiente seguro e criptografado. Cancele quando quiser.
        </p>
      </aside>

      <main className="i2-auth__main">
        <div className="i2-auth__form-wrap">
          <Link href="/contratar" className="i2-auth__back">
            <ArrowLeft size={14} strokeWidth={2.25} />
            Voltar para planos
          </Link>

          <header className="i2-auth__header">
            <span className="i2-auth__eyebrow">
              <span className="i2-auth__eyebrow-dot" aria-hidden="true" />
              Contrate agora
            </span>
            <h1 className="i2-auth__title">Crie sua conta JuridIA</h1>
            <p className="i2-auth__subtitle">
              É rápido — em menos de 1 minuto você está no checkout para liberar
              o plano {plan.name}.
            </p>
          </header>

          <form className="i2-auth__form" onSubmit={handleSubmit} noValidate>
            <label className="i2-auth__field">
              <span className="i2-auth__label">Nome completo</span>
              <span className="i2-auth__input-wrap">
                <UserIcon size={16} strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Como aparece na OAB"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </span>
            </label>

            <label className="i2-auth__field">
              <span className="i2-auth__label">Email profissional</span>
              <span className="i2-auth__input-wrap">
                <Mail size={16} strokeWidth={2} />
                <input
                  type="email"
                  placeholder="voce@escritorio.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="i2-auth__field">
              <span className="i2-auth__label">Telefone / WhatsApp</span>
              <span className="i2-auth__input-wrap">
                <Phone size={16} strokeWidth={2} />
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={maskPhone(phone)}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  maxLength={15}
                  required
                />
              </span>
            </label>

            <div className="i2-auth__row">
              <label className="i2-auth__field">
                <span className="i2-auth__label">Senha</span>
                <span className="i2-auth__input-wrap">
                  <Lock size={16} strokeWidth={2} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mín. 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="i2-auth__input-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff size={16} strokeWidth={2} />
                    ) : (
                      <Eye size={16} strokeWidth={2} />
                    )}
                  </button>
                </span>
              </label>

              <label className="i2-auth__field">
                <span className="i2-auth__label">Confirmar senha</span>
                <span className="i2-auth__input-wrap">
                  <Lock size={16} strokeWidth={2} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repita a senha"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="i2-auth__input-toggle"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showConfirm ? (
                      <EyeOff size={16} strokeWidth={2} />
                    ) : (
                      <Eye size={16} strokeWidth={2} />
                    )}
                  </button>
                </span>
              </label>
            </div>

            {error && <div className="i2-auth__error">{error}</div>}

            <button
              type="submit"
              className="i2-auth__submit"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 size={18} strokeWidth={2} className="i2-auth__spin" />
              ) : (
                <>
                  Continuar para pagamento
                  <ArrowRight size={16} strokeWidth={2.25} />
                </>
              )}
            </button>

            <p className="i2-auth__terms">
              Ao continuar, você concorda com os{" "}
              <a href="#termos">Termos de Serviço</a> e com a{" "}
              <a href="#privacidade">Política de Privacidade</a>.
            </p>

            <p className="i2-auth__signin">
              Já tem conta?{" "}
              <a
                href="https://app.juridia.com.br/sign-in"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entre aqui
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
