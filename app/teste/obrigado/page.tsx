"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { hubTrialReadiness as trialReadiness, type HubTrialResult as TrialResult } from "lib/hub-checkout";
import { readTrialConfirmation, configuredWhatsApp } from "lib/trial-confirmation";
import { APP_LOGIN_URL } from "lib/app-links";
import { TRIAL_FORM_HREF as TRIAL_FORM_PATH } from "lib/trial";
import "./trial-thanks.css";

const MARIA_WHATSAPP_URL = configuredWhatsApp(process.env.NEXT_PUBLIC_TRIAL_MARIA_WHATSAPP_URL);

export default function TrialThanksPage() {
  const [result, setResult] = useState<TrialResult | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [readiness, setReadiness] = useState<"PENDING" | "READY" | "DELAYED" | "EXPIRED">("PENDING");
  const [checkRound, setCheckRound] = useState(0);

  useEffect(() => {
    setResult(readTrialConfirmation());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!result) return;
    const end = result.trialEndsAt ? Date.parse(result.trialEndsAt) : NaN;
    if (Number.isFinite(end) && end <= Date.now()) { setReadiness("EXPIRED"); return; }
    if (!result.provisioning?.token) { setReadiness("DELAYED"); return; }
    const token = result.provisioning.token;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    setReadiness("PENDING");
    const check = async () => {
      const state = await trialReadiness(token);
      if (cancelled) return;
      if (state === "READY" || state === "EXPIRED") { setReadiness(state); return; }
      if (++attempts >= 12) { setReadiness("DELAYED"); return; }
      timer = setTimeout(check, 5_000);
    };
    void check();
    // A página também respeita o prazo se ficar aberta depois da confirmação.
    const expiryTimer = Number.isFinite(end)
      ? setTimeout(() => { cancelled = true; clearTimeout(timer); setReadiness("EXPIRED"); }, Math.min(end - Date.now(), 2_147_483_647))
      : undefined;
    return () => { cancelled = true; clearTimeout(timer); clearTimeout(expiryTimer); };
  }, [result, checkRound]);

  return (
    <main className="trial-thanks">
      <div className="trial-thanks__card">
        <header className="trial-thanks__header">
          <a href="/" className="trial-thanks__brand" aria-label="JuridIA — página inicial">JuridIA</a>
          <a href={APP_LOGIN_URL}>Já tenho conta</a>
        </header>
        <div className="trial-thanks__body">
          {!loaded ? <p role="status">Carregando sua confirmação…</p> : !result ? <>
            <h1>Consulte seu e-mail</h1>
            <p>Se você já preencheu o cadastro, as instruções de acesso chegam por e-mail. Confira também a caixa de spam.</p>
            <p>A confirmação do cadastro pode ser acompanhada na aba em que você iniciou o teste.</p>
            <a className="trial-thanks__button" href={APP_LOGIN_URL}>Entrar na plataforma <ArrowRight size={18} /></a>
            <a className="trial-thanks__secondary" href={TRIAL_FORM_PATH}>Ainda não me cadastrei</a>
          </> : <>
            <div className="trial-thanks__status" role="status" aria-live="polite">
              <span className="trial-thanks__icon">
                {readiness === "PENDING" ? <Loader2 size={30} className="trial-thanks__spinner" aria-hidden="true" />
                  : readiness === "READY" ? <CheckCircle2 size={30} aria-hidden="true" />
                    : <Mail size={30} aria-hidden="true" />}
              </span>
              <h1>{readiness === "READY" ? "Seu acesso está pronto!" : readiness === "EXPIRED" ? "O período de teste terminou" : "Cadastro recebido!"}</h1>
              <p>{readiness === "READY" ? "Chat e Voice estão disponíveis para você começar."
                : readiness === "PENDING" ? "Estamos preparando seu acesso ao Chat e ao Voice."
                  : readiness === "EXPIRED" ? "Entre com sua conta para consultar as opções de assinatura."
                    : "A confirmação do acesso está demorando. Seu cadastro já foi recebido; não precisa preencher novamente."}</p>
            </div>
            {readiness !== "EXPIRED" && <div className="trial-thanks__instructions">
              <h2>Seu próximo passo está no e-mail</h2>
              <p>Enviaremos um link de acesso para <strong>{result.email}</strong>. Abra o link para entrar na plataforma; ele só pode ser usado uma vez.</p>
              <p>As orientações de senha chegam em outra mensagem. Confira também a caixa de spam.</p>
            </div>}
            <p className="trial-thanks__deadline">{result.trialEndsAt
              ? `Seu teste ${readiness === "EXPIRED" ? "terminou" : "termina"} em ${new Date(result.trialEndsAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })} (horário de Brasília).`
              : `O prazo concedido pelo Hub é de ${result.trialDays} dias.`}</p>
            {(readiness === "READY" || readiness === "EXPIRED") && <a className="trial-thanks__button" href={APP_LOGIN_URL}>Entrar na plataforma <ArrowRight size={18} /></a>}
            {readiness === "DELAYED" && result.provisioning?.token && <button className="trial-thanks__button" onClick={() => setCheckRound(round => round + 1)}>Verificar acesso novamente</button>}
            {MARIA_WHATSAPP_URL && <a className="trial-thanks__secondary" href={MARIA_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Falar com a Maria pelo WhatsApp</a>}
          </>}
        </div>
      </div>
    </main>
  );
}

