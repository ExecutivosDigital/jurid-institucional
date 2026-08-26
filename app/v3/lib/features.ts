/**
 * Fonte de verdade das funcionalidades — extraído de `public/ALMA-JURID-IA.md`.
 * Ao alterar produto, atualize a ALMA primeiro e reflita aqui.
 */
import {
  Archive,
  BadgeDollarSign,
  Brain,
  CalendarClock,
  Calculator,
  FileSignature,
  FileStack,
  Gavel,
  GraduationCap,
  KanbanSquare,
  Landmark,
  MessageSquare,
  Mic,
  Newspaper,
  Radar,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type MockupKind =
  | "chat"
  | "pro"
  | "juiz"
  | "consultas"
  | "monitor"
  | "calc"
  | "prazos"
  | "cofre"
  | "propostas"
  | "crm"
  | "financeiro"
  | "cursos"
  | "docgen"
  | "portal"
  | "creditos"
  | "voice";

export type Feature = {
  id: string;
  /** Rótulo curto da aba. */
  tab: string;
  icon: LucideIcon;
  /** Frase-âncora de vendas (ALMA §20). */
  anchor: string;
  title: string;
  lead: string;
  /** Provas objetivas — viram os chips do painel. */
  proof: string[];
  /** Pares dor → resolução. É aqui que mora a persuasão. */
  pains: { pain: string; fix: string }[];
  mockup: MockupKind;
  /** Métrica de destaque exibida no painel. */
  metric: { value: string; label: string };
};

export type Pillar = {
  id: string;
  label: string;
  headline: string;
  description: string;
  features: Feature[];
};

const chat: Feature = {
  id: "chat",
  tab: "Chat",
  icon: MessageSquare,
  anchor: "Não é uma IA que responde. É uma IA que faz.",
  title: "O escritório inteiro cabe numa conversa",
  lead: "Multimodal de verdade: texto, foto, PDF escaneado com OCR, áudio e vídeo. Tem memória do caso, entende o direito brasileiro e executa ferramentas reais — cálculo, consulta, prazo, documento — dentro do próprio diálogo.",
  proof: [
    "Texto · Foto · PDF · Áudio · Vídeo",
    "Memória vetorial com reranker",
    "Jurisprudência com citação real",
    "Ilimitado no plano",
  ],
  pains: [
    { pain: "Não tenho tempo de ler tudo", fix: "Anexa e pede resumo em 20 segundos" },
    { pain: "Travei na hora de começar a peça", fix: "Primeira versão pronta para editar" },
    { pain: "IA genérica inventa lei", fix: "Ferramentas reais e fontes primárias" },
  ],
  mockup: "chat",
  metric: { value: "24/7", label: "um estagiário sênior que nunca esquece" },
};

const chatPro: Feature = {
  id: "chat-pro",
  tab: "Chat Pro",
  icon: Brain,
  anchor: "Para o caso que não cabe numa conversa comum.",
  title: "O sócio que senta com você a tarde inteira",
  lead: "O mesmo motor, destravado. Processo de 400 páginas, contrato de 90 cláusulas, dossiê inteiro — tudo em uma conversa só, sem degradação de contexto do primeiro ao último turno.",
  proof: [
    "1.000.000 de tokens acompanhados",
    "200 mensagens na janela recente",
    "Modelo premium travado na conversa",
    "Cobrança única na abertura",
  ],
  pains: [
    { pain: "A IA esqueceu o que mandei lá atrás", fix: "200 mensagens + 1M tokens de contexto" },
    { pain: "Tive que dividir o processo em 5 conversas", fix: "Cabe tudo em uma" },
    { pain: "Fico contando quantas mensagens posso mandar", fix: "Paga na abertura, conversa livre" },
  ],
  mockup: "pro",
  metric: { value: "1M", label: "tokens de contexto numa conversa só" },
};

const meuJuiz: Feature = {
  id: "meu-juiz",
  tab: "Meu Juiz IA",
  icon: Gavel,
  anchor: "Descubra o furo da sua peça antes que o juiz descubra.",
  title: "Sua peça diante de um juiz simulado",
  lead: "Suba a petição e receba um parecer crítico estruturado: nota, tese central, pontos fortes e fracos, riscos estratégicos e — o que mais importa — as perguntas que o juiz provavelmente fará.",
  proof: [
    "Score com justificativa",
    "Perguntas prováveis do juiz",
    "Melhorias trecho a trecho",
    "Chat sobre o parecer",
  ],
  pains: [
    { pain: "Não tenho quem revise minha peça", fix: "Parecer estruturado em minutos" },
    { pain: "Protocolei e só depois vi o furo", fix: "O furo aparece antes" },
    { pain: "Está boa, mas não sei se está forte", fix: "Score + fortes e fracos" },
  ],
  mockup: "juiz",
  metric: { value: "8.4", label: "score médio antes da revisão sugerida" },
};

const consultas: Feature = {
  id: "consultas",
  tab: "Central de Consultas",
  icon: Landmark,
  anchor: "Noventa e cinco portais oficiais. Uma tela. Um clique.",
  title: "O balcão único das fontes públicas",
  lead: "Cerca de 95 consultas oficiais executáveis com um clique — ou pedidas em linguagem natural ao chat. Certidões, processos, pessoas, empresas, compliance, patrimônio, protestos e sanções internacionais.",
  proof: [
    "~95 consultas mapeadas",
    "CNDT · CND · CRF · DJEN",
    "CEIS, CNEP, TCU, OFAC, ONU",
    "Custo em créditos transparente",
  ],
  pains: [
    { pain: "Cada certidão é um site diferente", fix: "Balcão único, sem captcha e sem login" },
    { pain: "Peguei cliente que não tinha como pagar", fix: "Protestos, dívida ativa e devedores da União" },
    { pain: "Assinatura de bureau custa caro demais", fix: "Pague por consulta" },
  ],
  mockup: "consultas",
  metric: { value: "~95", label: "consultas oficiais em um só lugar" },
};

const monitoramento: Feature = {
  id: "monitoramento",
  tab: "Monitoramento",
  icon: Radar,
  anchor: "O diário oficial lê você todo dia. Agora é recíproco.",
  title: "Um radar varrendo o DJEN por você",
  lead: "Cadastre alvos por OAB, número do processo ou nome. Um worker varre o Diário de Justiça Eletrônico Nacional todo dia, interpreta a publicação com IA e manda o digest por e-mail.",
  proof: [
    "Alvos por OAB · Processo · Nome",
    "Varredura diária automática",
    "Publicação interpretada por IA",
    "Digest por e-mail + varredura sob demanda",
  ],
  pains: [
    { pain: "Perder prazo é perder o cliente", fix: "Alerta diário automático" },
    { pain: "Pago correspondente ou clipping caro", fix: "Incluído na plataforma" },
    { pain: "Descobri tarde que meu cliente virou réu", fix: "Alvo por nome — o radar de cliente" },
  ],
  mockup: "monitor",
  metric: { value: "Diário", label: "varredura do DJEN, sem você abrir nada" },
};

const calculadora: Feature = {
  id: "calculadora",
  tab: "Calculadora Jurídica",
  icon: Calculator,
  anchor: "Pare de confiar numa planilha que você não sabe quem fez.",
  title: "Treze áreas de cálculo auditável",
  lead: "Não são planilhas: são motores com índices oficiais do Bacen e tabelas oficiais. Cada resultado guarda parâmetros e hash de reprodução — dá para provar como se chegou no número.",
  proof: [
    "13 áreas do Direito",
    "Índices oficiais Bacen/SGS",
    "Hash de reprodução por cálculo",
    "Resumo jurídico pronto para a peça",
  ],
  pains: [
    { pain: "Minha planilha pode estar errada", fix: "Motor com índices oficiais" },
    { pain: "Perdi a memória de cálculo do ano passado", fix: "Histórico + hash de reprodução" },
    { pain: "Terceirizo cálculo simples e pago caro", fix: "Faz na hora, inclusive pelo chat" },
  ],
  mockup: "calc",
  metric: { value: "13", label: "áreas: do trabalhista ao valuation por FCD" },
};

const prazos: Feature = {
  id: "prazos",
  tab: "Prazos",
  icon: CalendarClock,
  anchor: "Intimado hoje. Vence quando? Em dois segundos.",
  title: "Calendário forense real, não conta de cabeça",
  lead: "Dias úteis, feriados nacionais de fonte oficial, suspensões e as regras próprias de cada rito — cível, trabalhista, penal e juizados.",
  proof: [
    "CPC · CLT · Penal · JEC",
    "Feriados de fonte oficial",
    "Regra própria por rito",
    "Disponível como ferramenta do chat",
  ],
  pains: [
    { pain: "Contei errado e o prazo caiu num feriado", fix: "Calendário forense oficial" },
    { pain: "Cada rito tem uma regra e eu não decoro", fix: "Catálogo completo por rito" },
    { pain: "Anotei o prazo no papel e perdi o papel", fix: "Fica salvo na plataforma" },
  ],
  mockup: "prazos",
  metric: { value: "2s", label: "da intimação à data de vencimento" },
};

const cofre: Feature = {
  id: "cofre",
  tab: "Cofre",
  icon: Archive,
  anchor: "Vinte gigas do seu escritório, longe do WhatsApp.",
  title: "O arquivo digital do escritório",
  lead: "Até 20 GB por advogado, com pastas hierárquicas, vínculo com cliente, upload em fila e busca por nome em todo o acervo — no mesmo lugar em que a IA trabalha.",
  proof: [
    "20 GB por advogado",
    "Pastas vinculadas ao cliente",
    "Busca em todo o cofre",
    "Consumo em tempo real",
  ],
  pains: [
    { pain: "Cadê a procuração desse cliente?", fix: "Busca no cofre" },
    { pain: "Está no Drive pessoal do estagiário", fix: "Acervo do escritório, não da pessoa" },
    { pain: "Perdi arquivo em troca de computador", fix: "Nuvem, acessível de qualquer lugar" },
  ],
  mockup: "cofre",
  metric: { value: "20 GB", label: "por advogado, com busca e vínculo" },
};

const propostas: Feature = {
  id: "propostas",
  tab: "Propostas",
  icon: FileSignature,
  anchor: "Da conversa com o cliente à proposta em PDF, no mesmo dia.",
  title: "A proposta nasce na conversa — e sai pronta",
  lead: "Grave o áudio da reunião, a IA transcreve, analisa o caso e gera a proposta em blocos estruturados. Você edita bloco a bloco e emite o PDF com a identidade do escritório.",
  proof: [
    "Áudio → transcrição → proposta",
    "Blocos editáveis",
    "PDF com a marca do escritório",
    "Status e histórico comercial",
  ],
  pains: [
    { pain: "Esqueci de mandar e perdi o cliente", fix: "Gera na hora, com status" },
    { pain: "Minha proposta é um Word feio de 2019", fix: "PDF profissional padronizado" },
    { pain: "Não sei precificar nem o que escrever", fix: "A IA estrutura escopo e entregas" },
  ],
  mockup: "propostas",
  metric: { value: "Mesmo dia", label: "da reunião à proposta na mão do cliente" },
};

const crm: Feature = {
  id: "crm",
  tab: "CRM",
  icon: KanbanSquare,
  anchor: "Seu funil deixa de ser o WhatsApp não lido.",
  title: "Um funil feito para advocacia",
  lead: "Kanban com fases customizáveis pelo escritório, anotações com autor e data, anexos por lead e chats vinculados — a IA abre a conversa já conhecendo o histórico daquele lead.",
  proof: [
    "Fases customizáveis",
    "Anotações e anexos por lead",
    "Chat que já conhece o lead",
    "Origem do lead registrada",
  ],
  pains: [
    { pain: "Meu CRM é o WhatsApp não lido", fix: "Funil visual, com fase e responsável" },
    { pain: "Esqueci de dar retorno e o cliente foi embora", fix: "Fase + anotações datadas" },
    { pain: "Cada advogado tem a própria lista", fix: "Base única do escritório" },
  ],
  mockup: "crm",
  metric: { value: "1 base", label: "o escritório inteiro enxergando o mesmo funil" },
};

const financeiro: Feature = {
  id: "financeiro",
  tab: "Financeiro",
  icon: Wallet,
  anchor: "Quanto o seu escritório realmente lucra? Agora você sabe.",
  title: "O caixa na linguagem do escritório",
  lead: "Lançamentos de receita e despesa com categorias nativas da advocacia — honorários, custas, aluguel, impostos —, KPIs, gráfico de evolução, próximos vencimentos e lista de atrasados.",
  proof: [
    "Categorias nativas da advocacia",
    "Pago · A pagar · Recebido · Atrasado",
    "Dashboard com KPIs e evolução",
    "Próximos vencimentos",
  ],
  pains: [
    { pain: "Não sei quanto o escritório lucra", fix: "KPIs e gráfico de evolução" },
    { pain: "Esqueci de cobrar o cliente", fix: "Atrasados viram lista de cobrança" },
    { pain: "Misturo o dinheiro do escritório com o meu", fix: "Lançamentos categorizados" },
  ],
  mockup: "financeiro",
  metric: { value: "Previsível", label: "quanto entrou, entra, sai e está atrasado" },
};

const docgen: Feature = {
  id: "docgen",
  tab: "Documentos",
  icon: FileStack,
  anchor: "Fim do copiar-colar da IA para o Word.",
  title: "DOCX, XLSX e PDF direto da conversa",
  lead: "Você conversa, chega no texto certo e diz “gera isso em Word”. Sai formatado, com estrutura — pronto para protocolar, anexar ou enviar.",
  proof: ["DOCX · XLSX · PDF", "Acionado pelo chat", "Sai estruturado", "Memória de cálculo em planilha"],
  pains: [
    { pain: "Perco 15 minutos formatando", fix: "Sai formatado de uma vez" },
    { pain: "Preciso mandar em Word e só tenho texto", fix: "Um pedido, um arquivo" },
    { pain: "Quero anexar a memória de cálculo", fix: "Planilha pronta para juntar" },
  ],
  mockup: "docgen",
  metric: { value: "3 formatos", label: "gerados por conversa, sem reformatar nada" },
};

const cursos: Feature = {
  id: "cursos",
  tab: "Cursos e Trilhas",
  icon: GraduationCap,
  anchor: "Comprei a ferramenta e não sei usar 80% dela.",
  title: "Educação continuada dentro da ferramenta",
  lead: "Cursos organizados em trilhas, com progresso por aula, marcação de assistido e concluído — para capacitar o advogado e a equipe sem sair de onde trabalham todo dia.",
  proof: ["Trilhas com progresso", "Marcação por aula", "Reinício de trilha", "Time no mesmo padrão"],
  pains: [
    { pain: "Não sei usar 80% da ferramenta", fix: "Trilha guiada de adoção" },
    { pain: "Meu estagiário usa a IA de qualquer jeito", fix: "Equipe treinada no mesmo padrão" },
    { pain: "Quero me atualizar e não tenho tempo", fix: "Aula curta, dentro do fluxo" },
  ],
  mockup: "cursos",
  metric: { value: "Trilhas", label: "adoção mais rápida, retenção maior" },
};

const portal: Feature = {
  id: "portal",
  tab: "Portal de Notícias",
  icon: Newspaper,
  anchor: "Autoridade de marca no nicho jurídico.",
  title: "Um ativo de mídia próprio",
  lead: "Portal público com curadoria e ingestão automática de fontes, moderação, categorias, patrocinadores e uma camada de comunidade — comentários, curtidas, favoritos e posts.",
  proof: ["Ingestão automática", "Moderação e categorias", "Comunidade e favoritos", "Espaço de patrocínio"],
  pains: [
    { pain: "Aquisição de lead está cara", fix: "Tráfego orgânico a custo marginal" },
    { pain: "Falta autoridade para a marca", fix: "Conteúdo jurídico com curadoria" },
    { pain: "Audiência não volta", fix: "Comunidade gera retenção" },
  ],
  mockup: "portal",
  metric: { value: "Topo de funil", label: "audiência jurídica qualificada e própria" },
};

const creditos: Feature = {
  id: "creditos",
  tab: "Créditos e Planos",
  icon: BadgeDollarSign,
  anchor: "Monetização por valor, não por fricção.",
  title: "Uma economia que não pune o uso diário",
  lead: "O chat no modelo padrão é ilimitado e gratuito dentro do plano — é o hábito. Crédito só aparece onde há custo real: consulta oficial, análise profunda, caso grande. Tudo com extrato nominal.",
  proof: [
    "Chat padrão ilimitado no plano",
    "Regenerar 1 · Aprimorada 2 · Pro 10",
    "Consultas de 0 a 3 créditos",
    "Extrato com nome estável",
  ],
  pains: [
    { pain: "Tenho medo de gastar crédito digitando", fix: "O dia a dia não consome crédito" },
    { pain: "Não sei onde meu saldo foi parar", fix: "Extrato com nome estável por ação" },
    { pain: "Preço muda e ninguém avisa", fix: "Preço visível antes de executar" },
  ],
  mockup: "creditos",
  metric: { value: "Ilimitado", label: "o chat do dia a dia, dentro do plano" },
};

export const voice: Feature = {
  id: "voice",
  tab: "Voice",
  icon: Mic,
  anchor: "Você passa o dia falando. Tudo isso está evaporando. Não deveria.",
  title: "Toda conversa profissional vira ativo",
  lead: "App iOS e Android para o presencial, captura de aba do navegador para Meet, Zoom e Teams. Transcrição com identificação de participantes, resumos guiados por prompts configuráveis e chat sobre a própria gravação.",
  proof: [
    "Presencial (app) e online (navegador)",
    "Speakers identificados e renomeáveis",
    "Prompts por empresa, usuário e contato",
    "Briefing pré-reunião via Google Calendar",
  ],
  pains: [
    { pain: "Saio da reunião sem lembrar metade", fix: "Transcrição completa + resumo" },
    { pain: "Anoto e perco o olho no cliente", fix: "Grava — você não anota nada" },
    { pain: "O cliente diz que combinou outra coisa", fix: "Áudio e vídeo originais guardados" },
    { pain: "O caso está na cabeça de um advogado só", fix: "Prontuário falado por cliente" },
  ],
  mockup: "voice",
  metric: { value: "0 anotações", label: "e o resumo em PDF no mesmo dia" },
};

export const pillars: Pillar[] = [
  {
    id: "inteligencia",
    label: "Inteligência",
    headline: "A IA que sabe Direito — e opera o escritório com você",
    description:
      "O chat é a espinha dorsal. Tudo o mais está disponível como tela própria e como ferramenta que a própria IA usa sozinha durante a conversa.",
    features: [chat, chatPro, meuJuiz],
  },
  {
    id: "dados",
    label: "Dados oficiais",
    headline: "Fontes primárias, índices oficiais, nada de achismo",
    description:
      "Consultas em portais públicos, varredura diária do diário oficial e motores de cálculo auditáveis com os índices do Bacen.",
    features: [consultas, monitoramento, calculadora, prazos],
  },
  {
    id: "escritorio",
    label: "Operação",
    headline: "O escritório inteiro, sem trocar de aba",
    description:
      "Documento, cliente, proposta e caixa no mesmo lugar em que a IA trabalha — porque o valor está na costura, não na peça isolada.",
    features: [cofre, crm, propostas, financeiro, docgen],
  },
  {
    id: "crescimento",
    label: "Crescimento",
    headline: "O que faz o escritório crescer depois que a rotina resolve",
    description:
      "Formação da equipe, autoridade de marca e uma economia interna desenhada para gerar hábito diário em vez de medo de usar.",
    features: [cursos, portal, creditos],
  },
];

export const allFeatures: Feature[] = [...pillars.flatMap((p) => p.features), voice];

/** Etapas do ciclo fechado — ALMA §19. */
export const ecosystem: { step: string; role: string }[] = [
  { step: "Portal de notícias", role: "atrai o advogado" },
  { step: "CRM", role: "o lead entra no funil, com origem registrada" },
  { step: "Voice", role: "a reunião com esse lead é gravada e resumida" },
  { step: "Propostas", role: "o áudio vira proposta em PDF no mesmo dia" },
  { step: "Consultas + Chat", role: "o cliente é qualificado" },
  { step: "Calculadoras", role: "o valor da causa sai auditável" },
  { step: "Meu Juiz IA", role: "a peça é testada antes de protocolar" },
  { step: "Monitoramento", role: "nenhuma publicação escapa" },
  { step: "Cofre", role: "todo documento fica no lugar certo" },
  { step: "Financeiro", role: "o honorário entra no caixa e é cobrado se atrasar" },
  { step: "Cursos", role: "o escritório aprende a usar tudo isso melhor" },
];

export const promises = [
  {
    id: "tempo",
    title: "Tempo",
    claim: "O que levava 40 minutos leva 3",
    body: "Achar o processo, ler, resumir, calcular e redigir — o ciclo inteiro colapsa numa conversa só.",
  },
  {
    id: "seguranca",
    title: "Segurança",
    claim: "Índices oficiais e fontes primárias",
    body: "Cálculos com séries do Bacen e tabelas oficiais, consultas em portais públicos, jurisprudência real com citação.",
  },
  {
    id: "controle",
    title: "Controle",
    claim: "Nada mais se perde",
    body: "Prazo, publicação, documento, lead, recebimento e gravação de reunião — tudo registrado e recuperável.",
  },
];

/** Descrição curta usada no menu da navbar e no índice da home. */
export const hints: Record<string, string> = {
  chat: "Converse, anexe e deixe a IA executar as ferramentas",
  "chat-pro": "Para o processo que não cabe numa conversa comum",
  "meu-juiz": "O parecer crítico antes do juiz de verdade",
  consultas: "~95 portais oficiais em um clique só",
  monitoramento: "O DJEN varrido todo dia no seu nome",
  calculadora: "13 áreas com índices oficiais e hash",
  prazos: "Intimado hoje, vence quando? Em segundos",
  cofre: "20 GB do escritório, longe do WhatsApp",
  propostas: "Do áudio da reunião ao PDF no mesmo dia",
  crm: "Um funil feito para advocacia, não para vendas",
  financeiro: "Quanto entrou, entra, sai e está atrasado",
  docgen: "DOCX, XLSX e PDF direto da conversa",
  cursos: "A equipe treinada sem sair da plataforma",
  portal: "Audiência jurídica própria e qualificada",
  creditos: "Uso diário sem crédito — só o extraordinário cobra",
  voice: "Toda reunião vira transcrição, resumo e prova",
};

/** Rota pública de cada funcionalidade. */
export const featureHref = (id: string) => `/v3/${id}`;

export const findFeature = (slug: string) =>
  allFeatures.find((f) => f.id === slug);

/** Ordem canônica para a navegação anterior/próxima. */
export const featureOrder = allFeatures.map((f) => f.id);
