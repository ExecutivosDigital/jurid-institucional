"use client";

import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { track } from "lib/analytics";
import { submitHubTrial } from "lib/hub-checkout";
import { saveTrialConfirmation } from "lib/trial-confirmation";
import { contextoDeAquisicao, ultimoCta } from "lib/acquisition-context";
import { TRIAL_DAYS_LABEL } from "lib/trial";
import { isEmail, isFullName, isValidCpf, maskCpf, maskPhone } from "app/checkout/masks";

interface FormData { name: string; phone: string; email: string; document: string }
const INITIAL_DATA: FormData = { name: "", phone: "", email: "", document: "" };
type Errors = Partial<Record<keyof FormData, string>>;

export function TrialForm() {
  const router = useRouter();
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  // O primeiro foco preserva o CTA que trouxe a pessoa até o formulário.
  const ctaEntrada = useRef<string | null | undefined>(undefined);
  function lembrarCtaDeEntrada() {
    if (ctaEntrada.current === undefined) ctaEntrada.current = ultimoCta();
  }
  function update(key: keyof FormData, value: string) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const invalid: Errors = {};
    if (!isFullName(data.name)) invalid.name = "Informe nome e sobrenome.";
    if (!isEmail(data.email)) invalid.email = "Informe um e-mail válido.";
    if (!/^[1-9]\d{9,10}$/.test(data.phone.replace(/\D/g, ""))) invalid.phone = "Informe DDD e número.";
    if (!isValidCpf(data.document)) invalid.document = "Informe um CPF válido.";
    setErrors(invalid);
    if (Object.keys(invalid).length) return;
    setSubmitting(true);
    lembrarCtaDeEntrada();
    const contexto = contextoDeAquisicao({ formulario: "institucional-trial", ctaEntrada: ctaEntrada.current ?? null });
    try { window.jlp?.("trial_submit", { source: "institucional-trial", cta: contexto.cta_entrada }); } catch {}
    try {
      const resultado = await submitHubTrial({
        name: data.name.trim(), email: data.email.trim(),
        doc: data.document.replace(/\D/g, ""), phone: data.phone.replace(/\D/g, ""),
        attribution: { origem: "institucional-trial", ...contexto },
      });
      saveTrialConfirmation(resultado);
      const [firstName, ...lastParts] = data.name.trim().split(/\s+/);
      track("Lead", { source: "trial_form", content_name: "trial_signup_completed" }, {
        userData: { email: data.email, phone: data.phone, firstName, lastName: lastParts.join(" ") || undefined },
      });
      try { window.jlp?.("trial_result", { status: "CREATED" }); } catch {}
      router.push("/teste/obrigado");
    } catch (err) {
      try { window.jlp?.("trial_result", { status: "ERROR", message: err instanceof Error ? err.message.slice(0, 160) : "desconhecido" }); } catch {}
      toast.error(err instanceof Error ? err.message : "Não foi possível criar sua conta. Tente novamente.");
      setSubmitting(false);
    }
  }

  const fields = [
    { key: "name", label: "Nome completo", type: "text", autoComplete: "name", placeholder: "Como podemos te chamar?", maxLength: 180 },
    { key: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "seu@escritorio.com.br", maxLength: 254 },
    { key: "phone", label: "Telefone", type: "tel", autoComplete: "tel", placeholder: "(11) 99999-9999", maxLength: 15 },
    { key: "document", label: "CPF", type: "text", autoComplete: "off", placeholder: "000.000.000-00", maxLength: 14 },
  ] as const;

  return (
    <div className="i2-trial" id="experimente">
      <div className="i2-trial__card">
        <div className="i2-trial__aside">
          <span className="i2-trial__badge"><Sparkles size={14} strokeWidth={2} />Teste grátis por {TRIAL_DAYS_LABEL}</span>
          <h3 className="i2-trial__title">Experimente a JuridIA sem compromisso</h3>
          <p className="i2-trial__desc">Acesso ao Chat e ao Voice por {TRIAL_DAYS_LABEL}. Sem cartão de crédito e sem cobrança automática.</p>
          <ul className="i2-trial__list">
            <li><Check size={16} strokeWidth={2.5} />{TRIAL_DAYS_LABEL} para experimentar</li>
            <li><Check size={16} strokeWidth={2.5} />Sem cobrança automática</li>
            <li><Check size={16} strokeWidth={2.5} />Instruções de acesso por e-mail</li>
          </ul>
        </div>
        <form className="i2-trial__form" onSubmit={handleSubmit} onFocus={lembrarCtaDeEntrada} noValidate aria-busy={submitting}>
          <div className="i2-trial__fields">
            {fields.map(field => (
              <label className="i2-trial__field" key={field.key}>
                <span id={`trial-${field.key}-label`}>{field.label}</span>
                <input name={field.key} type={field.type} autoComplete={field.autoComplete}
                  inputMode={field.key === "document" ? "numeric" : field.key === "phone" ? "tel" : field.key === "email" ? "email" : "text"}
                  placeholder={field.placeholder} maxLength={field.maxLength} value={data[field.key]}
                  onChange={e => update(field.key, field.key === "phone" ? maskPhone(e.target.value) : field.key === "document" ? maskCpf(e.target.value) : e.target.value)}
                  required disabled={submitting} aria-invalid={!!errors[field.key]}
                  aria-labelledby={`trial-${field.key}-label`}
                  aria-describedby={errors[field.key] ? `trial-${field.key}-error` : undefined} />
                {errors[field.key] && <small id={`trial-${field.key}-error`} role="alert" style={{ color: "#b42318" }}>{errors[field.key]}</small>}
              </label>
            ))}
            <button type="submit" className="i2-trial__btn i2-trial__btn--primary" disabled={submitting} data-lp-cta="trial-comecar">
              {submitting ? <><Loader2 size={18} className="i2-auth__spin" aria-hidden="true" />Criando sua conta…</> : <>Começar teste grátis<ArrowRight size={18} strokeWidth={2} /></>}
            </button>
          </div>
          <p className="i2-trial__legal">Enviaremos um link de acesso por e-mail e, em outra mensagem, as orientações de senha.</p>
          <p className="i2-trial__legal">Ao continuar, você concorda com os nossos Termos de Uso e Política de Privacidade.</p>
        </form>
      </div>
    </div>
  );
}
