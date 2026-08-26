"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calculator,
  Check,
  FileText,
  Folder,
  Landmark,
  Mic,
  Radar,
  Scale,
  Search,
  Sparkles,
} from "lucide-react";
import { EASE } from "../ui/Motion";
import type { MockupKind } from "../../lib/features";

/** Moldura comum: barra de janela + corpo. */
function Frame({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="v3-mock">
      <div className="v3-mock__bar">
        <div className="v3-mock__dots">
          <span className="v3-mock__dot" />
          <span className="v3-mock__dot" />
          <span className="v3-mock__dot" />
        </div>
        <span className="v3-mock__name">{name}</span>
      </div>
      <div className="v3-mock__body">{children}</div>
    </div>
  );
}

/** Entrada escalonada dos elementos internos do mockup. */
function Item({
  children,
  i = 0,
  className,
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Bars({ values }: { values: number[] }) {
  const reduced = useReducedMotion();
  return (
    <div className="v3-bars">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="v3-bars__bar"
          initial={reduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  );
}

function Meter({ pct }: { pct: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="v3-meter">
      <motion.div
        className="v3-meter__fill"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: pct / 100 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ width: "100%" }}
      />
    </div>
  );
}

/* ============================ Mockups ============================ */

function ChatMock() {
  return (
    <Frame name="Jurid.Ai — conversa">
      <Item i={0}>
        <div className="v3-bubble v3-bubble--user">
          Anexei a intimação. Calcula a rescisão desse cliente e me diz o prazo.
        </div>
      </Item>
      <Item i={1}>
        <div className="v3-bubble v3-bubble--ai">
          <span className="v3-bubble__tool">
            <Calculator size={11} /> motor de cálculo
          </span>
          <br />
          Rescisão apurada com aviso indenizado e FGTS + 40%. Total bruto de{" "}
          <strong style={{ color: "var(--gold-hi)" }}>R$ 18.472,90</strong>.
        </div>
      </Item>
      <Item i={2}>
        <div className="v3-bubble v3-bubble--ai">
          <span className="v3-bubble__tool">
            <Scale size={11} /> calculadora de prazos
          </span>
          <br />
          Intimação em 12/08. Contestação de 15 dias úteis vence em{" "}
          <strong style={{ color: "var(--gold-hi)" }}>02/09</strong> — 07/09 é
          feriado e já foi descontado.
        </div>
      </Item>
      <Item i={3}>
        <div className="v3-row" style={{ marginTop: "auto" }}>
          <Sparkles size={14} style={{ color: "var(--gold)", flex: "none" }} />
          <span className="v3-row__meta">
            Memória do caso ativa · 3 anexos lidos · PDF escaneado via OCR
          </span>
        </div>
      </Item>
    </Frame>
  );
}

function ProMock() {
  return (
    <Frame name="Jurid PRO — caso grande">
      <Item i={0}>
        <div className="v3-kpis">
          <div className="v3-kpi">
            <div className="v3-kpi__label">Contexto</div>
            <div className="v3-kpi__value">1M tokens</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">Janela</div>
            <div className="v3-kpi__value">200 msg</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">Custo</div>
            <div className="v3-kpi__value">10 cr.</div>
          </div>
        </div>
      </Item>
      <Item i={1}>
        <div style={{ display: "grid", gap: 6 }}>
          <div className="v3-kpi__label">Consumo do contexto</div>
          <Meter pct={38} />
          <span className="v3-row__meta">
            382.400 de 1.000.000 tokens · processo com 412 páginas carregado
          </span>
        </div>
      </Item>
      <Item i={2}>
        <div className="v3-row">
          <FileText size={14} style={{ color: "var(--gold)", flex: "none" }} />
          <div>
            <div className="v3-row__title">Dossiê completo — Acme S/A</div>
            <div className="v3-row__meta">412 páginas · 38 documentos</div>
          </div>
          <span className="v3-row__badge v3-badge--ok">na memória</span>
        </div>
      </Item>
      <Item i={3}>
        <div className="v3-bubble v3-bubble--ai">
          Sobre a cláusula 47 que você mencionou na página 8: ela conflita com o
          aditivo de 2023 juntado na página 291.
        </div>
      </Item>
    </Frame>
  );
}

function JuizMock() {
  const rows = [
    { t: "Tese central identificada", b: "ok" as const, m: "Responsabilidade objetiva" },
    { t: "Ponto fraco", b: "warn" as const, m: "Nexo causal pouco demonstrado" },
    { t: "Pergunta provável do juiz", b: "info" as const, m: "Onde está a prova do dano?" },
  ];
  return (
    <Frame name="Meu Juiz IA — parecer">
      <Item i={0}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "14px 4px",
          }}
        >
          <div className="v3-gauge">
            <span className="v3-gauge__value">7.4</span>
            <span className="v3-kpi__label">score geral</span>
          </div>
          <div style={{ flex: 1, display: "grid", gap: 8 }}>
            <Meter pct={74} />
            <span className="v3-row__meta">
              Petição inicial · Cível · Fase de conhecimento · confiança 96%
            </span>
          </div>
        </div>
      </Item>
      {rows.map((r, i) => (
        <Item key={r.t} i={i + 1}>
          <div className="v3-row">
            <div>
              <div className="v3-row__title">{r.t}</div>
              <div className="v3-row__meta">{r.m}</div>
            </div>
            <span className={`v3-row__badge v3-badge--${r.b}`}>
              {r.b === "ok" ? "forte" : r.b === "warn" ? "revisar" : "blindar"}
            </span>
          </div>
        </Item>
      ))}
    </Frame>
  );
}

function ConsultasMock() {
  const rows = [
    { t: "CNDT — Certidão de débitos trabalhistas", b: "ok" as const, m: "TST · 1 crédito" },
    { t: "Protestos em cartório", b: "warn" as const, m: "CENPROT-SP · 2 protestos" },
    { t: "CEIS / CNEP — sanções", b: "ok" as const, m: "CGU · nada consta" },
    { t: "Sanções internacionais OFAC", b: "ok" as const, m: "EUA · nada consta" },
  ];
  return (
    <Frame name="Central de Consultas">
      <Item i={0}>
        <div className="v3-row">
          <Search size={14} style={{ color: "var(--gold)", flex: "none" }} />
          <span className="v3-row__meta">
            CNPJ 12.345.678/0001-90 · executando 4 de ~95 consultas
          </span>
        </div>
      </Item>
      {rows.map((r, i) => (
        <Item key={r.t} i={i + 1}>
          <div className="v3-row">
            <Landmark size={13} style={{ color: "var(--gold-deep)", flex: "none" }} />
            <div>
              <div className="v3-row__title">{r.t}</div>
              <div className="v3-row__meta">{r.m}</div>
            </div>
            <span className={`v3-row__badge v3-badge--${r.b}`}>
              {r.b === "ok" ? "nada consta" : "atenção"}
            </span>
          </div>
        </Item>
      ))}
    </Frame>
  );
}

function MonitorMock() {
  const hits = [
    { t: "0801234-55.2025.8.26.0100", m: "TJSP · intimação para réplica", b: "warn" as const },
    { t: "OAB 209127/SP", m: "DJEN · 3 publicações novas hoje", b: "info" as const },
    { t: "Acme Comércio Ltda.", m: "radar de cliente · nova ação como ré", b: "warn" as const },
  ];
  return (
    <Frame name="Monitoramento — DJEN">
      <Item i={0}>
        <div className="v3-row">
          <Radar size={14} style={{ color: "var(--gold)", flex: "none" }} />
          <span className="v3-row__meta">
            Varredura de hoje concluída · 3 alvos · 4 publicações novas
          </span>
        </div>
      </Item>
      {hits.map((h, i) => (
        <Item key={h.t} i={i + 1}>
          <div className="v3-row">
            <div>
              <div className="v3-row__title">{h.t}</div>
              <div className="v3-row__meta">{h.m}</div>
            </div>
            <span className={`v3-row__badge v3-badge--${h.b}`}>
              {h.b === "warn" ? "não lida" : "novo"}
            </span>
          </div>
        </Item>
      ))}
      <Item i={4}>
        <div className="v3-bubble v3-bubble--ai" style={{ maxWidth: "100%" }}>
          <span className="v3-bubble__tool">
            <Sparkles size={11} /> leitura por IA
          </span>
          <br />
          Publicação intima para réplica em 15 dias úteis. Prazo sugerido:{" "}
          <strong style={{ color: "var(--gold-hi)" }}>16/09</strong>.
        </div>
      </Item>
    </Frame>
  );
}

function CalcMock() {
  return (
    <Frame name="Calculadora Jurídica — trabalhista">
      <Item i={0}>
        <div className="v3-kpis">
          <div className="v3-kpi">
            <div className="v3-kpi__label">Verbas</div>
            <div className="v3-kpi__value">R$ 12.840</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">FGTS + 40%</div>
            <div className="v3-kpi__value">R$ 4.112</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">Correção</div>
            <div className="v3-kpi__value">R$ 1.520</div>
          </div>
        </div>
      </Item>
      <Item i={1}>
        <Bars values={[34, 52, 41, 68, 59, 77, 71, 88]} />
      </Item>
      <Item i={2}>
        <div className="v3-row">
          <div>
            <div className="v3-row__title">Total apurado · R$ 18.472,90</div>
            <div className="v3-row__meta">
              Índices oficiais Bacen/SGS · hash 8f3a·c02e·71bd
            </div>
          </div>
          <span className="v3-row__badge v3-badge--ok">auditável</span>
        </div>
      </Item>
    </Frame>
  );
}

function PrazosMock() {
  return (
    <Frame name="Calculadora de Prazos">
      <Item i={0}>
        <div className="v3-row">
          <div>
            <div className="v3-row__title">Contestação · CPC art. 335</div>
            <div className="v3-row__meta">15 dias úteis · intimado em 12/08</div>
          </div>
          <span className="v3-row__badge v3-badge--info">cível</span>
        </div>
      </Item>
      <Item i={1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 5,
          }}
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const weekend = i % 7 === 5 || i % 7 === 6;
            const holiday = i === 19;
            const isEnd = i === 21;
            return (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  borderRadius: 6,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 10,
                  fontWeight: 600,
                  border: "1px solid",
                  borderColor: isEnd
                    ? "var(--gold-hi)"
                    : "rgba(201,165,124,0.12)",
                  background: isEnd
                    ? "linear-gradient(135deg, var(--gold-hi), var(--gold-mid))"
                    : holiday
                    ? "rgba(206,154,96,0.14)"
                    : weekend
                    ? "rgba(255,250,244,0.02)"
                    : "rgba(255,250,244,0.045)",
                  color: isEnd
                    ? "#0d0a07"
                    : weekend || holiday
                    ? "var(--tx-mute)"
                    : "var(--tx-soft)",
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </Item>
      <Item i={2}>
        <div className="v3-row">
          <div>
            <div className="v3-row__title">Vence em 02/09</div>
            <div className="v3-row__meta">
              Fins de semana e o feriado de 07/09 já descontados
            </div>
          </div>
          <span className="v3-row__badge v3-badge--ok">calendário oficial</span>
        </div>
      </Item>
    </Frame>
  );
}

function CofreMock() {
  const tree = [
    { n: "Clientes", nested: false, s: "" },
    { n: "Acme Comércio Ltda.", nested: true, s: "1,4 GB" },
    { n: "Procuração assinada.pdf", nested: true, s: "820 KB" },
    { n: "Contrato social 2023.pdf", nested: true, s: "2,1 MB" },
    { n: "Audiências gravadas", nested: false, s: "6,8 GB" },
  ];
  return (
    <Frame name="Cofre — 20 GB">
      <Item i={0}>
        <div style={{ display: "grid", gap: 7 }}>
          <div className="v3-kpi__label">Armazenamento · 9,3 GB de 20 GB</div>
          <Meter pct={46} />
        </div>
      </Item>
      <div className="v3-tree">
        {tree.map((t, i) => (
          <Item key={t.n} i={i + 1}>
            <div
              className={`v3-tree__item${
                t.nested ? " v3-tree__item--nested" : ""
              }`}
            >
              {t.nested ? (
                <FileText size={13} style={{ color: "var(--gold-deep)" }} />
              ) : (
                <Folder size={13} style={{ color: "var(--gold)" }} />
              )}
              {t.n}
              {t.s && <span className="v3-tree__size">{t.s}</span>}
            </div>
          </Item>
        ))}
      </div>
    </Frame>
  );
}

function PropostasMock() {
  return (
    <Frame name="Propostas — do áudio ao PDF">
      <Item i={0}>
        <div className="v3-row">
          <Mic size={14} style={{ color: "var(--gold)", flex: "none" }} />
          <div>
            <div className="v3-row__title">Reunião com Acme · 24 min</div>
            <div className="v3-row__meta">Transcrita e analisada pela IA</div>
          </div>
          <span className="v3-row__badge v3-badge--ok">pronto</span>
        </div>
      </Item>
      <Item i={1}>
        <div className="v3-doc">
          <span className="v3-doc__tag">Proposta de honorários</span>
          <div className="v3-doc__title">Acme Comércio Ltda. — Trabalhista</div>
          <div className="v3-doc__line" style={{ width: "100%" }} />
          <div className="v3-doc__line" style={{ width: "88%" }} />
          <div className="v3-doc__line" style={{ width: "94%" }} />
          <div className="v3-doc__line" style={{ width: "62%" }} />
          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              fontWeight: 700,
              color: "#6d5836",
            }}
          >
            Honorários: R$ 8.500 + 20% de êxito
          </div>
        </div>
      </Item>
      <Item i={2}>
        <div className="v3-row">
          <span className="v3-row__meta">
            Diagnóstico · Escopo · Entregas · Honorários · Condições
          </span>
          <span className="v3-row__badge v3-badge--info">5 blocos editáveis</span>
        </div>
      </Item>
    </Frame>
  );
}

function CrmMock() {
  const cols = [
    { h: "Novo lead", cards: [["Marina Alves", "Indicação · Família"]] },
    {
      h: "Em negociação",
      cards: [
        ["Acme Comércio", "Site · Trabalhista"],
        ["Pedro Nunes", "Instagram · Cível"],
      ],
    },
    { h: "Fechado", cards: [["Construtora Vale", "Portal · Empresarial"]] },
  ];
  return (
    <Frame name="CRM — funil do escritório">
      <div className="v3-kanban">
        {cols.map((c, ci) => (
          <div className="v3-kanban__col" key={c.h}>
            <div className="v3-kanban__head">{c.h}</div>
            {c.cards.map(([name, meta], i) => (
              <Item key={name} i={ci + i}>
                <div className="v3-kanban__card">
                  {name}
                  <span>{meta}</span>
                </div>
              </Item>
            ))}
          </div>
        ))}
      </div>
      <Item i={4}>
        <div className="v3-row">
          <Sparkles size={13} style={{ color: "var(--gold)", flex: "none" }} />
          <span className="v3-row__meta">
            Abrir chat com Acme — a IA já entra sabendo fase, anotações e anexos
          </span>
        </div>
      </Item>
    </Frame>
  );
}

function FinanceiroMock() {
  return (
    <Frame name="Financeiro — caixa do escritório">
      <Item i={0}>
        <div className="v3-kpis">
          <div className="v3-kpi">
            <div className="v3-kpi__label">Recebido</div>
            <div className="v3-kpi__value">R$ 84.200</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">A receber</div>
            <div className="v3-kpi__value">R$ 31.750</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">Atrasado</div>
            <div className="v3-kpi__value">R$ 6.400</div>
          </div>
        </div>
      </Item>
      <Item i={1}>
        <Bars values={[42, 55, 48, 62, 58, 74, 69, 86]} />
      </Item>
      <Item i={2}>
        <div className="v3-row">
          <div>
            <div className="v3-row__title">Honorários — Acme Comércio</div>
            <div className="v3-row__meta">Venceu em 10/08 · R$ 4.250</div>
          </div>
          <span className="v3-row__badge v3-badge--warn">atrasado</span>
        </div>
      </Item>
      <Item i={3}>
        <div className="v3-row">
          <div>
            <div className="v3-row__title">Custas judiciais — TJSP</div>
            <div className="v3-row__meta">Vence em 28/08 · R$ 1.180</div>
          </div>
          <span className="v3-row__badge v3-badge--info">a pagar</span>
        </div>
      </Item>
    </Frame>
  );
}

function CursosMock() {
  const trilhas = [
    ["IA aplicada ao Direito", 100],
    ["Petições assistidas por IA", 62],
    ["Cálculos trabalhistas na prática", 25],
  ] as const;
  return (
    <Frame name="Cursos e Trilhas">
      {trilhas.map(([name, pct], i) => (
        <Item key={name} i={i}>
          <div style={{ display: "grid", gap: 8, padding: "4px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="v3-row__title">{name}</span>
              <span className="v3-row__meta">
                {pct === 100 ? "concluída" : `${pct}%`}
              </span>
            </div>
            <Meter pct={pct} />
          </div>
        </Item>
      ))}
      <Item i={3}>
        <div className="v3-row" style={{ marginTop: "auto" }}>
          <Check size={13} style={{ color: "#93c49a", flex: "none" }} />
          <span className="v3-row__meta">
            Equipe inteira treinada no mesmo padrão, sem sair da plataforma
          </span>
        </div>
      </Item>
    </Frame>
  );
}

function DocgenMock() {
  return (
    <Frame name="Geração de documentos">
      <Item i={0}>
        <div className="v3-bubble v3-bubble--user">
          Gera isso em Word e a memória de cálculo em planilha.
        </div>
      </Item>
      <Item i={1}>
        <div className="v3-row">
          <FileText size={14} style={{ color: "var(--gold)", flex: "none" }} />
          <div>
            <div className="v3-row__title">peticao-inicial-acme.docx</div>
            <div className="v3-row__meta">14 páginas · formatado e estruturado</div>
          </div>
          <span className="v3-row__badge v3-badge--ok">pronto</span>
        </div>
      </Item>
      <Item i={2}>
        <div className="v3-row">
          <FileText size={14} style={{ color: "var(--gold)", flex: "none" }} />
          <div>
            <div className="v3-row__title">memoria-calculo.xlsx</div>
            <div className="v3-row__meta">8 abas · pronta para juntar</div>
          </div>
          <span className="v3-row__badge v3-badge--ok">pronto</span>
        </div>
      </Item>
      <Item i={3}>
        <div className="v3-row">
          <FileText size={14} style={{ color: "var(--gold-deep)", flex: "none" }} />
          <div>
            <div className="v3-row__title">proposta-honorarios.pdf</div>
            <div className="v3-row__meta">Com a identidade do escritório</div>
          </div>
          <span className="v3-row__badge v3-badge--info">gerando</span>
        </div>
      </Item>
    </Frame>
  );
}

function PortalMock() {
  return (
    <Frame name="Portal de Notícias Jurídicas">
      <Item i={0}>
        <div className="v3-row">
          <div>
            <div className="v3-row__title">
              STJ fixa tese sobre prescrição intercorrente
            </div>
            <div className="v3-row__meta">Processual · 1.284 leituras · 32 comentários</div>
          </div>
          <span className="v3-row__badge v3-badge--ok">publicado</span>
        </div>
      </Item>
      <Item i={1}>
        <div className="v3-row">
          <div>
            <div className="v3-row__title">Reforma tributária: o que muda em 2026</div>
            <div className="v3-row__meta">Tributário · ingerido automaticamente</div>
          </div>
          <span className="v3-row__badge v3-badge--warn">moderação</span>
        </div>
      </Item>
      <Item i={2}>
        <div className="v3-kpis">
          <div className="v3-kpi">
            <div className="v3-kpi__label">Artigos</div>
            <div className="v3-kpi__value">1.940</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">Comunidade</div>
            <div className="v3-kpi__value">12,4 mil</div>
          </div>
          <div className="v3-kpi">
            <div className="v3-kpi__label">Patrocínios</div>
            <div className="v3-kpi__value">6 ativos</div>
          </div>
        </div>
      </Item>
    </Frame>
  );
}

function CreditosMock() {
  const linhas = [
    ["Chat — modelo padrão", "0 crédito", "ok"],
    ["Regenerar resposta", "1 crédito", "info"],
    ["Resposta aprimorada", "2 créditos", "info"],
    ["Jurid PRO — abertura", "10 créditos", "warn"],
    ["Consulta oficial", "0 a 3 créditos", "info"],
  ] as const;
  return (
    <Frame name="Créditos — extrato">
      {linhas.map(([acao, custo, b], i) => (
        <Item key={acao} i={i}>
          <div className="v3-row">
            <div className="v3-row__title">{acao}</div>
            <span className={`v3-row__badge v3-badge--${b}`}>{custo}</span>
          </div>
        </Item>
      ))}
      <Item i={5}>
        <div className="v3-row" style={{ marginTop: "auto" }}>
          <Check size={13} style={{ color: "#93c49a", flex: "none" }} />
          <span className="v3-row__meta">
            O uso diário não consome crédito — por isso vira hábito
          </span>
        </div>
      </Item>
    </Frame>
  );
}

function VoiceMock() {
  const reduced = useReducedMotion();
  const bars = [
    28, 46, 72, 38, 90, 55, 34, 68, 84, 42, 60, 30, 76, 52, 88, 40, 64, 26, 70,
    48,
  ];
  return (
    <Frame name="Voice — reunião gravada">
      <Item i={0}>
        <div className="v3-wave">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="v3-wave__bar"
              initial={reduced ? false : { scaleY: 0.2 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.45, delay: 0.02 * i, ease: EASE }}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </Item>
      <Item i={1}>
        <div className="v3-row">
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "rgba(201,165,124,0.18)",
              display: "grid",
              placeItems: "center",
              fontSize: 9,
              fontWeight: 700,
              color: "var(--gold-hi)",
              flex: "none",
            }}
          >
            MA
          </span>
          <div>
            <div className="v3-row__title">Dra. Marina Alves</div>
            <div className="v3-row__meta">
              “O prazo de entrega do laudo é 30 de setembro.”
            </div>
          </div>
        </div>
      </Item>
      <Item i={2}>
        <div className="v3-bubble v3-bubble--ai" style={{ maxWidth: "100%" }}>
          <span className="v3-bubble__tool">
            <Sparkles size={11} /> resumo executivo para sócios
          </span>
          <br />
          3 decisões, 2 pendências e 1 prazo crítico identificados. PDF pronto
          para enviar ao cliente.
        </div>
      </Item>
      <Item i={3}>
        <div className="v3-row">
          <span className="v3-row__meta">
            Áudio e vídeo originais guardados · briefing pré-reunião ativo
          </span>
          <span className="v3-row__badge v3-badge--ok">prova</span>
        </div>
      </Item>
    </Frame>
  );
}

const MAP: Record<MockupKind, () => JSX.Element> = {
  chat: ChatMock,
  pro: ProMock,
  juiz: JuizMock,
  consultas: ConsultasMock,
  monitor: MonitorMock,
  calc: CalcMock,
  prazos: PrazosMock,
  cofre: CofreMock,
  propostas: PropostasMock,
  crm: CrmMock,
  financeiro: FinanceiroMock,
  cursos: CursosMock,
  docgen: DocgenMock,
  portal: PortalMock,
  creditos: CreditosMock,
  voice: VoiceMock,
};

export function Mockup({ kind }: { kind: MockupKind }) {
  const Component = MAP[kind];
  return <Component />;
}
