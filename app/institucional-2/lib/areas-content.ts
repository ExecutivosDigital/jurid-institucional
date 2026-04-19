import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  ShieldCheck,
  Scale,
  Gavel,
  Landmark,
  Building2,
  HeartHandshake,
  Users,
  FileText,
  Calculator,
  Mic,
  MessageSquare,
  Clock,
  Target,
  Search,
  BookOpen,
  AlertTriangle,
  TrendingDown,
  FileWarning,
  Timer,
  Headphones,
  UserCheck,
  Handshake,
  FileSignature,
  FileSearch,
  Brain,
  Coins,
  Building,
  Banknote,
  HeartPulse,
  Baby,
  ShoppingBag,
  PhoneCall,
} from "lucide-react";

export type AreaSlug =
  | "trabalhista"
  | "previdenciario"
  | "civel"
  | "penal"
  | "tributario"
  | "empresarial"
  | "familia"
  | "consumidor";

export type PainCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type UseCase = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  oab: string;
  rating: number;
};

export type BeforeAfterRow = {
  metric: string;
  before: string;
  after: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type AreaContent = {
  slug: AreaSlug;
  icon: LucideIcon;
  name: string;
  metadata: Metadata;
  hero: {
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    subtitle: string;
    badges: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    stats: { number: string; label: string }[];
  };
  pains: {
    title: string;
    subtitle: string;
    items: PainCard[];
  };
  chat: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cases: UseCase[];
    ctaLabel: string;
  };
  voice: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cases: UseCase[];
    ctaLabel: string;
  };
  beforeAfter: {
    title: string;
    subtitle: string;
    rows: BeforeAfterRow[];
  };
  testimonials: {
    title: string;
    main: Testimonial;
    extras: Testimonial[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: { label: string; caption: string }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
  megaCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  whatsapp: {
    message: string;
    buttonLabel: string;
  };
};

const baseMeta = (
  slug: AreaSlug,
  title: string,
  description: string
): Metadata => ({
  title,
  description,
  alternates: { canonical: `/institucional-2/${slug}` },
  openGraph: {
    title,
    description,
    url: `/institucional-2/${slug}`,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
});

export const AREAS_CONTENT: Record<AreaSlug, AreaContent> = {
  // ============================================================
  // TRABALHISTA
  // ============================================================
  trabalhista: {
    slug: "trabalhista",
    icon: Briefcase,
    name: "Trabalhista",
    metadata: baseMeta(
      "trabalhista",
      "JuridIA para Advogado Trabalhista — IA que faz petição, cálculo e grava audiência",
      "Automatize reclamações trabalhistas, cálculos de rescisão, contestações e grave suas audiências com a IA jurídica mais usada por advogados trabalhistas no Brasil."
    ),
    hero: {
      eyebrow: "JuridIA para Direito do Trabalho",
      headline: "A IA que entende",
      headlineHighlight: "de CLT e de TRT",
      subtitle:
        "Petição inicial em minutos, cálculo de rescisão sem planilha e audiência gravada e transcrita automaticamente. A JuridIA é o copiloto do advogado trabalhista que quer atender mais e trabalhar menos.",
      badges: [
        "Treinada na CLT, Súmulas do TST e jurisprudência dos 24 TRTs",
        "Usada por +800 advogados trabalhistas",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "87%", label: "do tempo economizado em petições" },
        { number: "4h", label: "de audiência gravada em 1 clique" },
        { number: "+800", label: "trabalhistas na plataforma" },
      ],
    },
    pains: {
      title: "Se você é trabalhista, já sentiu isso:",
      subtitle:
        "A rotina do advogado trabalhista é brutal. A gente mapeou — e construiu a IA pra resolver cada uma dessas dores.",
      items: [
        {
          icon: Timer,
          title: "Audiência atrás de audiência",
          description:
            "Três pautas na mesma semana, anotação corrida, depoimento escapando. Quando chega em casa, ainda tem que lembrar do que foi dito.",
        },
        {
          icon: Calculator,
          title: "Cálculo de rescisão virou planilha infinita",
          description:
            "Aviso prévio, multa de 40%, férias proporcionais, horas extras, adicional noturno. Uma conta errada e o cliente questiona os honorários.",
        },
        {
          icon: FileText,
          title: "Petição inicial que sempre parece igual",
          description:
            "Você copia da última, ajusta nomes, muda datas, reescreve os pedidos. Gasta 3 horas no que devia levar 20 minutos.",
        },
        {
          icon: AlertTriangle,
          title: "Contestação chegando na véspera do prazo",
          description:
            "Precisa responder 40 páginas em 24h, analisar documentos, montar preliminar e mérito. Dorme mal, entrega no sufoco.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Trabalhista",
      title: "Todo o escritório trabalhista, em uma conversa",
      subtitle:
        "Peça uma petição inicial, um cálculo, um parecer ou uma pesquisa de jurisprudência do TST em linguagem natural. A IA já conhece a CLT, as súmulas, as orientações jurisprudenciais e os padrões de cada TRT.",
      cases: [
        {
          icon: FileText,
          title: "Reclamação trabalhista em 5 minutos",
          description:
            "Descreva o caso, a IA gera a inicial com fatos, fundamentos, pedidos e valor da causa calculado.",
        },
        {
          icon: Calculator,
          title: "Cálculo de rescisão automatizado",
          description:
            "Verbas rescisórias, FGTS + 40%, férias vencidas, 13º proporcional, aviso prévio indenizado — tudo conferido.",
        },
        {
          icon: FileWarning,
          title: "Contestação fundamentada",
          description:
            "Cole a inicial do reclamante e receba uma contestação com preliminares, mérito e impugnação de valores.",
        },
        {
          icon: Search,
          title: "Jurisprudência do TST e dos TRTs",
          description:
            "Pesquisa semântica em acórdãos e súmulas. Você pergunta, a IA traz o caso parecido com o seu.",
        },
        {
          icon: BookOpen,
          title: "Pareceres e memoriais",
          description:
            "Memorial para audiência, parecer para cliente, razões finais — prontos para revisar e protocolar.",
        },
        {
          icon: FileSignature,
          title: "Recursos ordinários e revistas",
          description:
            "Estrutura de RO, RR e agravo com fundamentação em súmulas do TST e prequestionamento cuidado.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Trabalhista",
      title: "Sua audiência inteira transcrita enquanto você foca no cliente",
      subtitle:
        "Grave audiência inicial, instrução, oitiva de testemunhas ou reunião com o cliente. A IA transcreve em tempo real, identifica quem falou e gera ata, resumo e pontos de ataque pronto para o processo.",
      cases: [
        {
          icon: Mic,
          title: "Audiência de instrução gravada sem esforço",
          description:
            "Uma audiência de 3 horas vira um resumo de 2 páginas com os depoimentos destacados e os pontos favoráveis e contrários.",
        },
        {
          icon: UserCheck,
          title: "Oitiva de testemunha sem digitar nada",
          description:
            "Mantenha contato visual com a testemunha e a IA registra tudo. Depois ela separa por declarante.",
        },
        {
          icon: Handshake,
          title: "Conciliação transcrita em minutos",
          description:
            "Transcreva propostas e contrapropostas. Se o acordo fechar, a IA já monta a minuta para homologação.",
        },
        {
          icon: MessageSquare,
          title: "Reunião inicial com o cliente",
          description:
            "Grave a primeira conversa, a IA extrai os pedidos possíveis, prazos prescricionais e documentos que você precisa pedir.",
        },
        {
          icon: Clock,
          title: "Ata e memorial automáticos",
          description:
            "Ao final da audiência, a IA gera ata, memorial e sugestão de perguntas que você poderia ter feito.",
        },
        {
          icon: Target,
          title: "Identificação de pontos decisivos",
          description:
            "A IA marca os trechos onde a testemunha se contradisse ou onde o preposto confessou — prova de ouro para as razões finais.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Antes e depois da JuridIA no escritório trabalhista",
      subtitle: "Dados reais de advogados que migraram nos últimos 6 meses.",
      rows: [
        { metric: "Tempo para redigir uma inicial", before: "3h", after: "25 min" },
        { metric: "Tempo para cálculo de rescisão", before: "45 min", after: "3 min" },
        { metric: "Audiência de 3h virada em resumo", before: "Não fazia", after: "1 clique" },
        { metric: "Contestações entregues por semana", before: "4", after: "12" },
      ],
    },
    testimonials: {
      title: "Advogados trabalhistas que já viraram a chave",
      main: {
        quote:
          "Dobrei o número de reclamações trabalhistas que ajuízo por mês e ainda sobra tempo. A JuridIA gera a inicial, faz o cálculo e na audiência grava e transcreve tudo. Eu consegui contratar mais um estagiário porque o escritório cresceu — não o contrário.",
        name: "Dra. Marina Sales",
        role: "Advogada trabalhista — sócia do Sales Advocacia",
        location: "São Paulo, SP",
        oab: "OAB/SP 312.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "O cálculo de rescisão sozinho já paga a mensalidade. Antes eu passava tarde inteira conferindo planilha.",
          name: "Dr. Henrique Braga",
          role: "Advogado trabalhista autônomo",
          location: "Belo Horizonte, MG",
          oab: "OAB/MG 98.***",
          rating: 5,
        },
        {
          quote:
            "Gravar a audiência e receber a ata pronta no email mudou minha rotina. Eu saio do fórum com tudo pronto.",
          name: "Dra. Patrícia Lemos",
          role: "Trabalhista — banca especializada",
          location: "Curitiba, PR",
          oab: "OAB/PR 54.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "A JuridIA em ação no dia a dia do trabalhista",
      subtitle: "Prints reais do produto focados em tarefas do direito do trabalho.",
      images: [
        { label: "Chat · Inicial", caption: "Geração de reclamação trabalhista completa" },
        { label: "Chat · Cálculo", caption: "Cálculo de rescisão com adicional noturno" },
        { label: "Voice · Audiência", caption: "Transcrição de AIJ em tempo real" },
        { label: "Chat · TST", caption: "Pesquisa em súmulas e OJs" },
        { label: "Voice · Ata", caption: "Ata de audiência gerada automaticamente" },
      ],
    },
    faq: {
      title: "Dúvidas de advogados trabalhistas",
      subtitle: "O que os colegas mais perguntam antes de testar.",
      items: [
        {
          question: "A JuridIA calcula verbas rescisórias de verdade?",
          answer:
            "Sim. Ela calcula saldo de salário, aviso prévio indenizado, férias vencidas e proporcionais + 1/3, 13º proporcional, multa de 40% do FGTS e adicionais (noturno, insalubridade, periculosidade). Você só precisa informar os fatos — data de admissão, demissão, salário e particularidades.",
        },
        {
          question: "Posso gravar audiência no TRT com o Voice?",
          answer:
            "Sim, desde que a gravação seja para uso próprio como apoio ao trabalho do advogado. A JuridIA grava pelo celular, pelo notebook ou pelo link da audiência online, transcreve e gera ata, memorial e destaque dos pontos relevantes.",
        },
        {
          question: "A IA conhece jurisprudência do TST e dos TRTs?",
          answer:
            "Conhece. Ela foi treinada com súmulas, orientações jurisprudenciais e acórdãos dos 24 TRTs e do TST. Você pergunta em linguagem natural e ela traz o precedente aplicável ao seu caso com a referência.",
        },
        {
          question: "Funciona para reclamações em massa?",
          answer:
            "Funciona muito bem. Você pode subir uma planilha com os dados dos reclamantes e a IA gera as iniciais individualizadas, cada uma com seus fatos e pedidos específicos, mantendo o padrão técnico do escritório.",
        },
        {
          question: "Consigo contestar uma inicial que recebi do reclamante?",
          answer:
            "Sim. Você cola o texto da inicial (ou sobe o PDF) e a IA gera uma contestação com preliminares, impugnação dos fatos, impugnação dos valores e fundamentação jurídica pronta para revisão.",
        },
        {
          question: "E a LGPD? Os dados dos meus clientes ficam seguros?",
          answer:
            "Sim. A JuridIA é hospedada em servidores no Brasil, não usa suas conversas para treinar modelos e segue todos os requisitos da LGPD. O sigilo profissional é tratado como prioridade zero.",
        },
        {
          question: "Quanto tempo dura o teste grátis?",
          answer:
            "São 4 dias com acesso completo ao Chat e ao Voice, sem cartão de crédito. Você testa no seu caso real e decide se faz sentido.",
        },
        {
          question: "Preciso instalar alguma coisa?",
          answer:
            "Não. A JuridIA funciona no navegador — no computador, no tablet e no celular. Para o Voice, basta clicar em gravar, presencial ou online.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Comece hoje",
      title: "Pronto para dobrar a produtividade no trabalhista?",
      subtitle:
        "Teste grátis por 4 dias, sem cartão de crédito. Fale com a gente no WhatsApp e a gente configura junto com você.",
    },
    whatsapp: {
      message:
        "Olá! Sou advogado(a) trabalhista e quero entender como a JuridIA pode ajudar no meu escritório.",
      buttonLabel: "Falar com especialista em Trabalhista",
    },
  },

  // ============================================================
  // PREVIDENCIÁRIO
  // ============================================================
  previdenciario: {
    slug: "previdenciario",
    icon: ShieldCheck,
    name: "Previdenciário",
    metadata: baseMeta(
      "previdenciario",
      "JuridIA para Advogado Previdenciário — análise de CNIS, cálculo de RMI e petição automática",
      "A IA jurídica que analisa o CNIS, calcula a RMI, monta a petição de aposentadoria e grava a entrevista com o cliente sem você precisar digitar nada."
    ),
    hero: {
      eyebrow: "JuridIA para Direito Previdenciário",
      headline: "O fim da planilha e do",
      headlineHighlight: "CNIS na lupa",
      subtitle:
        "Analise o CNIS, calcule a RMI, redija a petição de aposentadoria e grave a entrevista do cliente sem encostar na caneta. A JuridIA entende INSS, EC 103/2019 e regras de transição como ninguém.",
      badges: [
        "Treinada na Lei 8.213/91, RPS e EC 103",
        "Usada por +600 previdenciaristas",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "92%", label: "menos tempo analisando CNIS" },
        { number: "100%", label: "das regras de transição cobertas" },
        { number: "+600", label: "previdenciaristas ativos" },
      ],
    },
    pains: {
      title: "A rotina do previdenciarista é puxada. A JuridIA existe pra aliviar:",
      subtitle: "",
      items: [
        {
          icon: FileSearch,
          title: "CNIS gigante, vínculos cruzados, letra pequena",
          description:
            "Você imprime, marca caneta, cruza com carteira, procura recolhimento faltante. Perde meia tarde em um único cliente.",
        },
        {
          icon: Calculator,
          title: "Regras de transição que mudam tudo",
          description:
            "Pedágio 50%, pedágio 100%, pontos, idade mínima progressiva, professora. Cada cliente precisa de uma simulação diferente.",
        },
        {
          icon: Clock,
          title: "Entrevista do cliente que dura uma hora",
          description:
            "O cliente conta a vida inteira, você anota no caderno, depois tem que lembrar o que foi relevante para montar a tese.",
        },
        {
          icon: FileText,
          title: "Petição de aposentadoria que sempre tem um pulo",
          description:
            "Cada tipo de benefício pede uma fundamentação. Aposentadoria híbrida, rural, especial, por incapacidade — e você refazendo do zero toda vez.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Previdenciário",
      title: "O CNIS entende você, não o contrário",
      subtitle:
        "Suba o CNIS, descreva o cliente e peça à IA o que fazer. Ela analisa os vínculos, simula os cenários de aposentadoria possíveis, escolhe o melhor e redige a petição.",
      cases: [
        {
          icon: FileSearch,
          title: "Análise de CNIS em segundos",
          description:
            "Suba o PDF, a IA extrai todos os vínculos, identifica períodos faltantes, contribuições em atraso e averbações pendentes.",
        },
        {
          icon: Calculator,
          title: "Cálculo de RMI e simulação de cenários",
          description:
            "Simula aposentadoria por idade, por tempo de contribuição, regras de transição e compara qual rende mais para o cliente.",
        },
        {
          icon: FileText,
          title: "Petição inicial de aposentadoria",
          description:
            "Híbrida, rural, especial, por incapacidade, BPC/LOAS — com fundamentação em súmulas do TNU e jurisprudência da TRU.",
        },
        {
          icon: Search,
          title: "Pesquisa em jurisprudência previdenciária",
          description:
            "Súmulas da TNU, acórdãos dos TRFs, IRDRs e temas repetitivos — tudo respondendo à sua pergunta em linguagem natural.",
        },
        {
          icon: FileSignature,
          title: "Recurso administrativo no INSS",
          description:
            "Da JRPS ao CRPS, a IA redige o recurso apontando onde a APS errou, com base no parecer técnico já contestado.",
        },
        {
          icon: BookOpen,
          title: "Petição de revisão da vida toda",
          description:
            "Cálculo e inicial prontos, já com o parâmetro definido pelo STF e distinguishing do caso do seu cliente.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Previdenciário",
      title: "Deixe o cliente contar a vida. A IA anota por você.",
      subtitle:
        "Seu cliente é idoso, trabalhou 40 anos, e a história dele é longa. Com o Voice, você olha nos olhos do cliente, cria rapport, e recebe no final um resumo estruturado com tudo que importa juridicamente.",
      cases: [
        {
          icon: Headphones,
          title: "Entrevista de cliente sem digitar",
          description:
            "Grave a conversa inteira com o aposentado. A IA separa por tópicos: atividades exercidas, períodos rurais, exposição a agentes nocivos, contribuições em aberto.",
        },
        {
          icon: UserCheck,
          title: "Linha do tempo automática",
          description:
            "A IA monta a linha do tempo da vida laboral do cliente a partir do que ele falou, conciliando com o que está no CNIS.",
        },
        {
          icon: Mic,
          title: "Audiência de justificação gravada",
          description:
            "Oitivas de testemunhas em ações de reconhecimento de tempo rural ou especial ficam transcritas e prontas para o memorial.",
        },
        {
          icon: Brain,
          title: "Extração de fatos relevantes",
          description:
            "De uma conversa de uma hora, a IA extrai só o que vira pedido: atividade, período, exposição, documento.",
        },
        {
          icon: FileText,
          title: "Memorial da audiência pronto",
          description:
            "Ao final da AIJ, o memorial já sai com os depoimentos destacados e a tese costurada com as provas orais.",
        },
        {
          icon: Target,
          title: "Checklist do que pedir depois",
          description:
            "A IA sugere documentos que você ainda precisa solicitar ao cliente, baseado no que ele contou.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Previdenciário antes e depois da JuridIA",
      subtitle: "",
      rows: [
        { metric: "Análise de CNIS", before: "40 min", after: "2 min" },
        { metric: "Simulação de cenários de aposentadoria", before: "1h", after: "30s" },
        { metric: "Redação da inicial", before: "2h30", after: "20 min" },
        { metric: "Entrevista estruturada com o cliente", before: "1h + 30 min de anotação", after: "1h, pronta" },
      ],
    },
    testimonials: {
      title: "Previdenciaristas que estão vivendo outra rotina",
      main: {
        quote:
          "Eu atendia no máximo 4 clientes por dia. Agora atendo 8, porque a entrevista eu gravo, o CNIS a IA analisa e a petição sai pronta. O cliente sente que eu escutei mais — e eu escutei mesmo, porque não precisei anotar.",
        name: "Dr. Rogério Matos",
        role: "Advogado previdenciarista — escritório próprio",
        location: "Goiânia, GO",
        oab: "OAB/GO 42.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "A simulação de cenários é impressionante. Em 30 segundos ela me diz qual regra é melhor para o cliente.",
          name: "Dra. Ana Lopes",
          role: "Previdenciarista",
          location: "Porto Alegre, RS",
          oab: "OAB/RS 87.***",
          rating: 5,
        },
        {
          quote:
            "Os recursos administrativos que antes eu terceirizava agora saem aqui, em meia hora, fundamentados.",
          name: "Dr. Carlos Viana",
          role: "Previdenciarista sênior",
          location: "Recife, PE",
          oab: "OAB/PE 31.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "O dia a dia do previdenciarista na JuridIA",
      subtitle: "",
      images: [
        { label: "Chat · CNIS", caption: "Upload e análise automática do CNIS" },
        { label: "Chat · RMI", caption: "Simulação com regras de transição" },
        { label: "Voice · Cliente", caption: "Entrevista de cliente idoso transcrita" },
        { label: "Chat · TNU", caption: "Súmulas e jurisprudência previdenciária" },
        { label: "Chat · Recurso", caption: "Recurso administrativo para o CRPS" },
      ],
    },
    faq: {
      title: "Dúvidas de previdenciaristas",
      subtitle: "",
      items: [
        {
          question: "A JuridIA lê o CNIS direto do PDF do Meu INSS?",
          answer:
            "Sim. Você sobe o PDF do CNIS e ela extrai os vínculos, salários de contribuição, contribuições individuais, períodos rurais declarados e identifica lacunas, divergências e atrasados.",
        },
        {
          question: "Cobre as regras de transição da EC 103/2019?",
          answer:
            "Cobre todas: idade mínima progressiva, pontos, pedágio de 50%, pedágio de 100%, regra de professor, servidor público e policial. Faz a comparação entre elas e indica qual paga mais.",
        },
        {
          question: "Funciona para aposentadoria rural e especial?",
          answer:
            "Sim. Aposentadoria rural (por idade e híbrida), aposentadoria especial por exposição a agentes nocivos, com fundamentação em PPP, LTCAT e jurisprudência da TNU.",
        },
        {
          question: "A IA redige recurso administrativo no INSS?",
          answer:
            "Sim, tanto para a JRPS quanto para o CRPS. Basta colar o teor da decisão recorrida e ela monta o recurso com os pontos de impugnação e os precedentes aplicáveis.",
        },
        {
          question: "Posso gravar a audiência de justificação com o Voice?",
          answer:
            "Sim. Ele grava a audiência no fórum ou online, identifica quem falou, transcreve e gera memorial com os pontos favoráveis ao reconhecimento da atividade ou do vínculo.",
        },
        {
          question: "A IA conhece jurisprudência da TNU e dos TRFs?",
          answer:
            "Sim. Súmulas da TNU, acórdãos das TRs, temas repetitivos dos TRFs e precedentes do STJ e STF sobre matéria previdenciária.",
        },
        {
          question: "Quanto tempo dura o teste?",
          answer:
            "4 dias com acesso total, sem cartão. Perfeito para testar em um caso real.",
        },
        {
          question: "Meus dados ficam seguros?",
          answer:
            "Sim. Hospedagem no Brasil, criptografia ponta a ponta, aderência total à LGPD e suas conversas não treinam o modelo.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Escritório previdenciário 10x",
      title: "Analise o próximo CNIS em 2 minutos",
      subtitle: "Teste grátis por 4 dias. Atenda mais clientes sem abrir mão do cuidado.",
    },
    whatsapp: {
      message:
        "Olá! Sou advogado(a) previdenciarista e quero saber mais sobre a JuridIA.",
      buttonLabel: "Falar com especialista em Previdenciário",
    },
  },

  // ============================================================
  // CÍVEL
  // ============================================================
  civel: {
    slug: "civel",
    icon: Scale,
    name: "Cível",
    metadata: baseMeta(
      "civel",
      "JuridIA para Advogado Cível — petição inicial, contestação e réplica em minutos",
      "Inicial, contestação, réplica, contratos e pesquisa de jurisprudência do STJ em linguagem natural. A IA jurídica que entende o Código Civil e o CPC como ninguém."
    ),
    hero: {
      eyebrow: "JuridIA para Direito Civil",
      headline: "A petição inicial na",
      headlineHighlight: "velocidade do cliente",
      subtitle:
        "Do contrato de locação à ação de indenização por dano moral, a JuridIA redige, fundamenta e entrega no seu padrão. Treinada no CC/2002, CPC e súmulas do STJ.",
      badges: [
        "Treinada no CC/2002, CPC/2015 e +500 súmulas do STJ",
        "Usada por advogados cíveis em todo o Brasil",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "80%", label: "menos tempo por petição" },
        { number: "3x", label: "mais ações ajuizadas por mês" },
        { number: "+1.200", label: "cíveis ativos" },
      ],
    },
    pains: {
      title: "A rotina do cível é corrida. A JuridIA alivia:",
      subtitle: "",
      items: [
        {
          icon: Timer,
          title: "Prazo de contestação na véspera",
          description:
            "A inicial chegou ontem, você precisa responder amanhã, ainda tem que analisar 30 páginas e 2 contratos.",
        },
        {
          icon: FileText,
          title: "Variedade brutal de matérias",
          description:
            "Num mesmo dia você vê cobrança, responsabilidade civil, contrato, possessória, dano moral. Cada uma com uma fundamentação diferente.",
        },
        {
          icon: Search,
          title: "Jurisprudência perdida no Google",
          description:
            "Você procura no JusBrasil, abre 20 abas, não encontra o que precisa, cai no mesmo acórdão de sempre.",
        },
        {
          icon: Clock,
          title: "Tempo é honorário perdido",
          description:
            "Cada hora redigindo do zero é uma hora que não gera novos clientes nem fecha novas causas.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Cível",
      title: "A sua petição cível, fundamentada e pronta",
      subtitle:
        "Descreva o caso. A IA traz o Código Civil aplicável, o CPC correto, as súmulas do STJ e a jurisprudência atual. Você só revisa e protocola.",
      cases: [
        {
          icon: FileText,
          title: "Petição inicial para qualquer matéria cível",
          description:
            "Cobrança, revisional de contrato, indenização por dano moral e material, possessória, usucapião, alimentos gravídicos e mais.",
        },
        {
          icon: FileWarning,
          title: "Contestação com preliminares e mérito",
          description:
            "Cole a inicial e a IA devolve uma contestação completa, com inépcia, ilegitimidade, prescrição e mérito bem amarrado.",
        },
        {
          icon: FileSignature,
          title: "Réplica e tréplica em minutos",
          description:
            "A IA identifica o que a parte contrária alegou e devolve a réplica ponto a ponto, mantendo seu padrão.",
        },
        {
          icon: FileText,
          title: "Contratos com cláusulas de proteção",
          description:
            "Locação, prestação de serviços, compra e venda, mútuo, confissão de dívida — todos com multa, rescisão e foro.",
        },
        {
          icon: Search,
          title: "Pesquisa semântica no STJ e TJs",
          description:
            "Pergunte o que precisa e receba os acórdãos relevantes com ementa e distinguishing pronto.",
        },
        {
          icon: BookOpen,
          title: "Parecer jurídico para cliente",
          description:
            "Quer orientar um cliente antes de entrar com a ação? A IA redige o parecer com riscos, chances e caminho sugerido.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Cível",
      title: "A consulta cível que vira petição automaticamente",
      subtitle:
        "Grave a reunião com o cliente. Ao final, a IA entrega um resumo jurídico, sugere pedidos, identifica a causa de pedir e já puxa a inicial correspondente no Chat.",
      cases: [
        {
          icon: MessageSquare,
          title: "Consulta com cliente gravada",
          description:
            "Ao invés de fazer anotações frenéticas, você conversa. A IA monta a ata com fatos, pedidos e dúvidas do cliente.",
        },
        {
          icon: Mic,
          title: "Audiência de conciliação transcrita",
          description:
            "Registra proposta, contraproposta, negativa e, se fechar acordo, já cria a minuta para homologação.",
        },
        {
          icon: UserCheck,
          title: "Oitiva de testemunhas pronta para memorial",
          description:
            "A IA separa por declarante, destaca contradições e marca os trechos probatórios que você usa nas razões finais.",
        },
        {
          icon: Target,
          title: "Tese de defesa que surge da conversa",
          description:
            "A IA ouve o cliente contar o lado dele e já sugere quais teses podem ser construídas a partir dos fatos narrados.",
        },
        {
          icon: Brain,
          title: "Extração dos documentos necessários",
          description:
            "Ao final da reunião, a IA lista os documentos que você precisa pedir para montar a inicial ou a defesa.",
        },
        {
          icon: FileText,
          title: "Relato do cliente virado em inicial",
          description:
            "Com um clique, o resumo da conversa vira uma minuta de inicial, com os fatos redigidos e os pedidos elencados.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Cível antes e depois da JuridIA",
      subtitle: "",
      rows: [
        { metric: "Redação de inicial cível", before: "2h30", after: "20 min" },
        { metric: "Contestação fundamentada", before: "4h", after: "35 min" },
        { metric: "Pesquisa de jurisprudência", before: "1h", after: "2 min" },
        { metric: "Contratos redigidos por semana", before: "2", after: "10" },
      ],
    },
    testimonials: {
      title: "Cíveis que passaram a dormir mais",
      main: {
        quote:
          "Eu era escravo do prazo. Contestação no domingo, réplica na madrugada. Hoje eu resolvo em uma tarde, com mais qualidade, porque a IA traz jurisprudência que eu talvez nem lembrasse. O cliente percebe a diferença.",
        name: "Dra. Beatriz Andrade",
        role: "Advogada cível — escritório generalista",
        location: "Rio de Janeiro, RJ",
        oab: "OAB/RJ 194.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "Usei em uma ação de indenização complexa e a IA trouxe um REsp que virou a tese do caso.",
          name: "Dr. Thiago Moraes",
          role: "Cível e empresarial",
          location: "Florianópolis, SC",
          oab: "OAB/SC 41.***",
          rating: 5,
        },
        {
          quote:
            "Os contratos que eu fazia em 2 horas agora saem em 15 minutos. É outro jogo.",
          name: "Dra. Luciana Prado",
          role: "Cível contratualista",
          location: "Fortaleza, CE",
          oab: "OAB/CE 29.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "Cível em ação na JuridIA",
      subtitle: "",
      images: [
        { label: "Chat · Inicial", caption: "Petição de indenização por dano moral" },
        { label: "Chat · Contrato", caption: "Contrato de locação com cláusulas" },
        { label: "Voice · Cliente", caption: "Consulta cível transcrita e resumida" },
        { label: "Chat · STJ", caption: "Pesquisa de súmulas do STJ" },
        { label: "Chat · Contestação", caption: "Contestação com preliminares" },
      ],
    },
    faq: {
      title: "Dúvidas do cível",
      subtitle: "",
      items: [
        {
          question: "A JuridIA faz qualquer tipo de petição cível?",
          answer:
            "Faz. Inicial, contestação, réplica, tréplica, memoriais, razões finais, recursos, agravos, embargos e impugnações. Em todas as matérias do Código Civil e do CPC.",
        },
        {
          question: "Ela cobre súmulas do STJ e jurisprudência dos TJs?",
          answer:
            "Sim. Mais de 500 súmulas do STJ, temas repetitivos, IACs, acórdãos dos TJs e precedentes do STF em matéria cível.",
        },
        {
          question: "Consigo montar contratos com ela?",
          answer:
            "Sim. Você descreve o que precisa, a IA redige com cláusulas de multa, rescisão, foro, confidencialidade e adequação à LGPD quando cabível.",
        },
        {
          question: "E ações de família e do consumidor?",
          answer:
            "Temos páginas dedicadas para essas áreas também. A JuridIA é uma só — muda só o foco do prompt.",
        },
        {
          question: "Funciona em recurso para o STJ e STF?",
          answer:
            "Sim. Agravo em REsp, REsp, RE, embargos de divergência — com prequestionamento cuidado e fundamentação adequada.",
        },
        {
          question: "Posso subir o PDF do processo para a IA analisar?",
          answer:
            "Pode. A IA lê o PDF, resume o processo, identifica os pontos controvertidos e sugere a estratégia de defesa ou de ataque.",
        },
        {
          question: "Quanto tempo dura o teste grátis?",
          answer: "4 dias com acesso total, sem cartão de crédito.",
        },
        {
          question: "Meus dados estão seguros?",
          answer:
            "Sim. Hospedagem no Brasil, LGPD, sigilo profissional e suas conversas não são usadas para treinar modelos.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Cível no controle",
      title: "Vire a chave no seu contencioso cível",
      subtitle: "Teste grátis por 4 dias. Fale com a gente no WhatsApp para uma demo focada no seu tipo de causa.",
    },
    whatsapp: {
      message: "Olá! Sou advogado(a) cível e quero testar a JuridIA.",
      buttonLabel: "Falar com especialista em Cível",
    },
  },

  // ============================================================
  // PENAL
  // ============================================================
  penal: {
    slug: "penal",
    icon: Gavel,
    name: "Penal",
    metadata: baseMeta(
      "penal",
      "JuridIA para Advogado Criminalista — memorial, HC, alegações finais e audiência gravada",
      "Memoriais, alegações finais, habeas corpus, defesa prévia e gravação completa de audiência criminal com transcrição e identificação de contradições."
    ),
    hero: {
      eyebrow: "JuridIA para Direito Penal",
      headline: "O criminalista com",
      headlineHighlight: "o tempo de volta",
      subtitle:
        "Grave a AIJ inteira, transcreva a oitiva, monte o memorial e redija o HC em minutos. A JuridIA é a ferramenta do criminalista que ainda acredita na ampla defesa.",
      badges: [
        "Treinada no CP, CPP, legislação extravagante e jurisprudência do STJ e STF",
        "Usada por bancas criminais de todo o Brasil",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "6h", label: "de AIJ transcrita automaticamente" },
        { number: "85%", label: "menos tempo em memorial" },
        { number: "+400", label: "criminalistas ativos" },
      ],
    },
    pains: {
      title: "Criminalista, isso aqui é a sua rotina:",
      subtitle: "",
      items: [
        {
          icon: Clock,
          title: "AIJ de 5 horas, você com a mão cansada",
          description:
            "Anotar tudo a mão em uma audiência criminal é impossível. Coisas importantes escapam — um contraditório, uma contradição, um olhar da testemunha.",
        },
        {
          icon: FileText,
          title: "Memorial de 40 páginas no prazo",
          description:
            "Você recebe o termo, precisa casar depoimentos, apontar contradições, construir a tese. Dias de trabalho.",
        },
        {
          icon: AlertTriangle,
          title: "HC que não pode esperar",
          description:
            "O cliente está preso, a família ligando, o prazo é agora. Você precisa de velocidade e fundamentação ao mesmo tempo.",
        },
        {
          icon: Search,
          title: "Jurisprudência criminal muda rápido",
          description:
            "STF mudou entendimento de novo. Você precisa estar atualizado ou sua tese cai na primeira linha da sentença.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Criminal",
      title: "Da defesa prévia ao HC, tudo fundamentado",
      subtitle:
        "A IA conhece o Código Penal, o CPP, as leis especiais, a jurisprudência atualizada do STJ e do STF e escreve no seu padrão. Você só revisa.",
      cases: [
        {
          icon: FileSignature,
          title: "Habeas Corpus em minutos",
          description:
            "Descreva a prisão, a IA redige o HC com indicação de coação ilegal, ausência de requisitos da preventiva e precedentes aplicáveis.",
        },
        {
          icon: FileText,
          title: "Memorial de alegações finais",
          description:
            "Cole os depoimentos (ou use a transcrição do Voice) e receba o memorial com análise da prova, contradições e tese de absolvição ou desclassificação.",
        },
        {
          icon: FileWarning,
          title: "Defesa prévia e resposta à acusação",
          description:
            "Resposta escrita completa, com preliminares (inépcia, incompetência, litispendência) e teses defensivas.",
        },
        {
          icon: Search,
          title: "Pesquisa em precedentes criminais",
          description:
            "STJ, STF, súmulas vinculantes, tese fixada em repetitivo — pergunte em linguagem natural, receba o precedente.",
        },
        {
          icon: FileSignature,
          title: "Recursos criminais",
          description:
            "Apelação, RESE, Agravo em Execução, RHC, REsp e RE. Todos com prequestionamento e fundamentação específica.",
        },
        {
          icon: BookOpen,
          title: "Minuta de sustentação oral",
          description:
            "Roteiro de sustentação em 15 minutos, com ordem dos argumentos, tempo por tópico e fechamento forte.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Criminal",
      title: "A audiência criminal inteira, gravada e transcrita",
      subtitle:
        "AIJ de 6 horas, oitiva de 8 testemunhas, interrogatório longo. O Voice grava, transcreve, separa por declarante, marca contradições — e entrega o memorial praticamente pronto.",
      cases: [
        {
          icon: Mic,
          title: "AIJ inteira transcrita",
          description:
            "Grava a audiência do começo ao fim, identifica juiz, promotor, defensor, testemunhas e acusado. Ao final, você tem o termo alternativo perfeito para memorial.",
        },
        {
          icon: UserCheck,
          title: "Identificação de contradições",
          description:
            "A IA compara o que a testemunha disse no inquérito com o que ela disse em juízo e destaca onde se contradisse — ouro para a defesa.",
        },
        {
          icon: Headphones,
          title: "Interrogatório do acusado organizado",
          description:
            "A versão do acusado aparece estruturada por fato, pronta para ser usada no memorial e casada com a prova material.",
        },
        {
          icon: MessageSquare,
          title: "Conversa com cliente preso transcrita",
          description:
            "Grave a conversa no parlatório, a IA transcreve e monta linha do tempo, sugere pedidos e protocolos a serem feitos.",
        },
        {
          icon: Target,
          title: "Pontos para sustentação oral",
          description:
            "Em tribunal, o Voice te dá os 5 trechos mais fortes para usar na sustentação — já cronometrados.",
        },
        {
          icon: FileText,
          title: "Memorial que sai junto",
          description:
            "Ao final da AIJ, você clica 'gerar memorial' e recebe o documento com tese costurada aos depoimentos reais.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Criminalista antes e depois da JuridIA",
      subtitle: "",
      rows: [
        { metric: "Memorial pós-AIJ", before: "2 dias", after: "2 horas" },
        { metric: "HC redigido", before: "3h", after: "25 min" },
        { metric: "Transcrição de AIJ de 5h", before: "Não fazia", after: "Automática" },
        { metric: "Defesa prévia", before: "4h", after: "30 min" },
      ],
    },
    testimonials: {
      title: "Criminalistas que recuperaram as noites",
      main: {
        quote:
          "Numa AIJ de 6 horas, a IA pegou uma contradição entre o inquérito e o juízo que eu tinha deixado passar. Virou a absolvição do meu cliente. Desde então, não abro mão do Voice em audiência.",
        name: "Dr. Eduardo Ribeiro",
        role: "Advogado criminalista — banca especializada",
        location: "São Paulo, SP",
        oab: "OAB/SP 156.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "HC com prazo de 3 horas eu hoje entrego com tempo de sobra e ainda revisado duas vezes.",
          name: "Dra. Isabela Costa",
          role: "Criminalista",
          location: "Brasília, DF",
          oab: "OAB/DF 48.***",
          rating: 5,
        },
        {
          quote:
            "O memorial pós-AIJ virou dever de casa de 2 horas em vez de 2 dias.",
          name: "Dr. Rafael Monteiro",
          role: "Criminalista",
          location: "Salvador, BA",
          oab: "OAB/BA 35.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "Criminalista em ação com a JuridIA",
      subtitle: "",
      images: [
        { label: "Voice · AIJ", caption: "Audiência de instrução gravada" },
        { label: "Chat · HC", caption: "Habeas corpus fundamentado" },
        { label: "Chat · Memorial", caption: "Memorial de alegações finais" },
        { label: "Voice · Oitiva", caption: "Oitiva de testemunha organizada" },
        { label: "Chat · STF", caption: "Pesquisa em precedentes criminais" },
      ],
    },
    faq: {
      title: "Dúvidas do criminalista",
      subtitle: "",
      items: [
        {
          question: "Posso gravar audiência criminal com o Voice?",
          answer:
            "Sim, como apoio ao trabalho do defensor. A gravação fica criptografada, disponível apenas para você, e gera transcrição, identificação de declarantes e destaque de contradições.",
        },
        {
          question: "A IA é atualizada com o entendimento do STF e STJ?",
          answer:
            "Sim. Súmulas vinculantes, teses fixadas em repetitivos, decisões monocráticas relevantes e acórdãos recentes em matéria penal.",
        },
        {
          question: "Funciona para matérias especiais (Lei de Drogas, Maria da Penha)?",
          answer:
            "Funciona. Lei de Drogas, Maria da Penha, Lei de Lavagem, Lei de Licitações, crimes contra a ordem tributária, Lei Antiterrorismo — todas cobertas.",
        },
        {
          question: "Redige HC mesmo para casos complexos?",
          answer:
            "Sim. Você pode descrever a coação (decreto, falta de requisitos, excesso de prazo) e a IA monta a peça com todos os elementos, inclusive pedido liminar.",
        },
        {
          question: "A IA identifica contradições entre inquérito e juízo?",
          answer:
            "Identifica. Ao subir o IPL e a transcrição da AIJ, ela cruza os depoimentos e marca onde a testemunha mudou a versão.",
        },
        {
          question: "Quais recursos ela redige?",
          answer:
            "Apelação criminal, RESE, agravo em execução, embargos infringentes, RHC, HC originário, REsp, RE, revisão criminal.",
        },
        {
          question: "Teste grátis?",
          answer: "4 dias com acesso completo ao Chat e ao Voice, sem cartão.",
        },
        {
          question: "Sigilo e LGPD?",
          answer:
            "Sigilo profissional tratado como prioridade. Hospedagem no Brasil, criptografia, LGPD e ausência de treinamento com suas conversas.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Defesa plena",
      title: "A ferramenta que todo criminalista merece",
      subtitle: "Teste grátis por 4 dias. Fale com a gente no WhatsApp e veja uma demo do Voice em AIJ.",
    },
    whatsapp: {
      message: "Olá! Sou advogado(a) criminalista e quero testar a JuridIA.",
      buttonLabel: "Falar com especialista em Criminal",
    },
  },

  // ============================================================
  // TRIBUTÁRIO
  // ============================================================
  tributario: {
    slug: "tributario",
    icon: Landmark,
    name: "Tributário",
    metadata: baseMeta(
      "tributario",
      "JuridIA para Advogado Tributarista — embargos, impugnação e análise de CDA com IA",
      "Embargos à execução fiscal, impugnação administrativa, análise de CDA, pareceres e pesquisa em súmulas do CARF, STJ e STF. A IA tributária que conhece o seu terreno."
    ),
    hero: {
      eyebrow: "JuridIA para Direito Tributário",
      headline: "O tributarista que",
      headlineHighlight: "pensa em tese, não em formato",
      subtitle:
        "Analise CDAs complexas, identifique nulidades, redija embargos e impugnações, monte pareceres e pesquise a jurisprudência do CARF, STJ e STF em linguagem natural.",
      badges: [
        "Treinada no CTN, LC 87, LC 116, LC 123, jurisprudência do CARF e do STJ",
        "Usada por tributaristas de M&A e contencioso",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "95%", label: "menos tempo analisando CDA" },
        { number: "CTN+CARF+STJ", label: "Base jurisprudencial" },
        { number: "+300", label: "tributaristas ativos" },
      ],
    },
    pains: {
      title: "O tributarista sabe que o pior é:",
      subtitle: "",
      items: [
        {
          icon: FileSearch,
          title: "CDA gigantesca, tributo por tributo",
          description:
            "Você abre a CDA e encontra 12 tributos diferentes, períodos diversos, múltiplas origens. Horas só para mapear o que é o quê.",
        },
        {
          icon: Calculator,
          title: "Planilha paralela para conferir cálculo do Fisco",
          description:
            "Selic, multa, juros, correção, decadência, prescrição. Uma conta errada e o embargo perde consistência.",
        },
        {
          icon: BookOpen,
          title: "Jurisprudência tributária mudando sempre",
          description:
            "STF decide tese, STJ muda entendimento, CARF flexiona. Sua tese de ontem não vale mais hoje.",
        },
        {
          icon: Building,
          title: "Cliente grande precisa de tempestividade",
          description:
            "Empresas querem parecer rápido, embargos no prazo e estratégia clara de contingência fiscal.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Tributário",
      title: "A tese tributária construída com você",
      subtitle:
        "Da análise da CDA ao parecer final, da impugnação ao REsp repetitivo. A IA tributária é o seu júnior sênior 24/7.",
      cases: [
        {
          icon: FileSearch,
          title: "Análise automática de CDA",
          description:
            "Suba a CDA e receba um relatório com os tributos, períodos, valores, origens, nulidades formais e indícios de decadência ou prescrição.",
        },
        {
          icon: FileText,
          title: "Embargos à execução fiscal",
          description:
            "Prescrição, decadência, erro de sujeito passivo, ilegitimidade da CDA, excesso de execução. Todos fundamentados em súmulas do STJ.",
        },
        {
          icon: FileWarning,
          title: "Impugnação administrativa",
          description:
            "Impugnação ao auto de infração no CARF, DRJ, TIT, FETES e demais tribunais administrativos, com tese técnica desenvolvida.",
        },
        {
          icon: BookOpen,
          title: "Parecer tributário para cliente",
          description:
            "Planejamento tributário, riscos, oportunidades e recomendações, tudo redigido em formato executivo pronto para o cliente.",
        },
        {
          icon: Search,
          title: "Pesquisa no CARF, STJ e STF",
          description:
            "Temas repetitivos, súmulas do CARF, acórdãos recentes e teses de repercussão geral — tudo pesquisável em linguagem natural.",
        },
        {
          icon: FileSignature,
          title: "Recursos tributários",
          description:
            "REsp, RE, recurso voluntário, recurso especial ao CARF, embargos de declaração — estruturados e prequestionados.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Tributário",
      title: "A reunião com o CFO, convertida em parecer",
      subtitle:
        "Reuniões com CFO, controller, contador e sócios viram automaticamente um memorando tributário com riscos, contingências e próximos passos.",
      cases: [
        {
          icon: Handshake,
          title: "Reunião com o cliente corporativo",
          description:
            "Grave a call com o CFO, a IA extrai os tributos envolvidos, os pontos de risco e as dúvidas específicas do cliente.",
        },
        {
          icon: Mic,
          title: "Sustentação no CARF gravada",
          description:
            "Sua sustentação oral no CARF fica registrada. A IA transcreve, organiza e sugere melhorias para a próxima.",
        },
        {
          icon: Brain,
          title: "Reunião interna com a equipe",
          description:
            "Reuniões de estratégia com a equipe do escritório viram ata automática com próximos passos e responsáveis.",
        },
        {
          icon: UserCheck,
          title: "Entrevista com o controller",
          description:
            "Grave a entrevista com o controller para entender as operações. A IA transforma isso em insumo para o parecer.",
        },
        {
          icon: Target,
          title: "Resumo executivo para o board",
          description:
            "Ao final, o Voice gera um resumo executivo de 1 página para você mandar ao comitê tributário do cliente.",
        },
        {
          icon: FileText,
          title: "Memorando tributário do zero",
          description:
            "Transforma a conversa em memorando técnico com capitulações legais e recomendações.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Tributário antes e depois",
      subtitle: "",
      rows: [
        { metric: "Análise de CDA complexa", before: "1 dia", after: "5 min" },
        { metric: "Embargos à execução fiscal", before: "6h", after: "40 min" },
        { metric: "Parecer tributário", before: "2 dias", after: "3h" },
        { metric: "Pesquisa CARF/STJ", before: "1h30", after: "1 min" },
      ],
    },
    testimonials: {
      title: "Tributaristas que elevaram o nível",
      main: {
        quote:
          "Fazer uma análise de CDA com 30 tributos em 5 minutos é surreal. A IA identifica decadência, prescrição e erro de sujeito passivo automaticamente. O cliente percebe a diferença na hora do parecer.",
        name: "Dr. Paulo Nakamura",
        role: "Tributarista sênior — escritório full service",
        location: "São Paulo, SP",
        oab: "OAB/SP 221.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "A pesquisa em temas repetitivos do STJ economiza minhas tardes.",
          name: "Dra. Renata Coelho",
          role: "Tributarista",
          location: "Rio de Janeiro, RJ",
          oab: "OAB/RJ 112.***",
          rating: 5,
        },
        {
          quote:
            "O Voice em reunião com cliente corporativo vira memorando que antes levava dias.",
          name: "Dr. André Cantuária",
          role: "Contencioso tributário",
          location: "Recife, PE",
          oab: "OAB/PE 58.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "Tributário na JuridIA",
      subtitle: "",
      images: [
        { label: "Chat · CDA", caption: "Análise automática de certidão de dívida ativa" },
        { label: "Chat · Embargos", caption: "Embargos à execução fiscal" },
        { label: "Chat · Parecer", caption: "Parecer tributário para M&A" },
        { label: "Voice · CFO", caption: "Reunião com cliente corporativo transcrita" },
        { label: "Chat · CARF", caption: "Pesquisa em acórdãos do CARF" },
      ],
    },
    faq: {
      title: "Dúvidas do tributarista",
      subtitle: "",
      items: [
        {
          question: "A JuridIA analisa CDAs extensas?",
          answer:
            "Sim. Você sobe o PDF da CDA e ela quebra por tributo, período, valor, origem da inscrição e identifica nulidades formais e materiais, decadência e prescrição.",
        },
        {
          question: "Cobre matéria municipal, estadual e federal?",
          answer:
            "Sim. ITBI, ISS, IPTU (municipal); ICMS, ITCMD, IPVA (estadual); IR, IPI, PIS, COFINS, CSLL, II, IE (federal), além de contribuições previdenciárias.",
        },
        {
          question: "Funciona para impugnação no CARF?",
          answer:
            "Funciona. Impugnação, recurso voluntário, recurso especial ao CARF e sustentação oral — com pesquisa em acórdãos das Câmaras.",
        },
        {
          question: "E planejamento tributário?",
          answer:
            "A IA ajuda a estruturar pareceres de planejamento, riscos de autuação, oportunidades de aproveitamento de crédito e otimização de carga.",
        },
        {
          question: "A jurisprudência está atualizada com o STF?",
          answer:
            "Sim. Incluindo teses de repercussão geral recentes em matéria tributária (IR sobre juros, exclusão de ICMS da base do PIS/COFINS etc.).",
        },
        {
          question: "Consigo subir o processo administrativo inteiro?",
          answer:
            "Sim. Você sobe os PDFs, a IA resume, identifica os pontos controvertidos e sugere a estratégia de defesa.",
        },
        {
          question: "Qual a duração do teste?",
          answer: "4 dias com acesso total.",
        },
        {
          question: "Sigilo corporativo é respeitado?",
          answer:
            "Sim. Hospedagem no Brasil, LGPD, dados criptografados, sem treinamento com suas conversas.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Tese tributária de alto nível",
      title: "Escale o seu contencioso tributário",
      subtitle: "Teste grátis por 4 dias. Demonstração focada em análise de CDA e embargos.",
    },
    whatsapp: {
      message: "Olá! Sou advogado(a) tributarista e quero entender a JuridIA.",
      buttonLabel: "Falar com especialista em Tributário",
    },
  },

  // ============================================================
  // EMPRESARIAL
  // ============================================================
  empresarial: {
    slug: "empresarial",
    icon: Building2,
    name: "Empresarial",
    metadata: baseMeta(
      "empresarial",
      "JuridIA para Advogado Empresarial — contratos, M&A, societário e due diligence",
      "Contratos, pareceres, atas, due diligence, reunião com sócios gravada e resumida. A IA empresarial que acompanha o ritmo do cliente corporativo."
    ),
    hero: {
      eyebrow: "JuridIA para Direito Empresarial",
      headline: "O braço direito do",
      headlineHighlight: "advogado corporativo",
      subtitle:
        "Contratos, pareceres, alterações societárias, atas e memorandos. A JuridIA entende Lei das S.A., Código Civil societário e contratos atípicos como um sócio sênior.",
      badges: [
        "Treinada na Lei das S.A., Código Civil, LGPD e LAI",
        "Usada por bancas de contencioso corporativo e consultivo",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "10x", label: "mais contratos redigidos por semana" },
        { number: "1 clique", label: "Reunião de board virada em ata" },
        { number: "+500", label: "empresariais ativos" },
      ],
    },
    pains: {
      title: "O consultivo corporativo cobra velocidade:",
      subtitle: "",
      items: [
        {
          icon: Timer,
          title: "Contrato para ontem",
          description:
            "Cliente fechou deal, precisa do contrato agora. Você tem 3 modelos, mas nenhum serve exatamente.",
        },
        {
          icon: FileSearch,
          title: "Due diligence em prazo absurdo",
          description:
            "Centenas de documentos para ler, red flags para encontrar, memorando para entregar — em uma semana.",
        },
        {
          icon: Handshake,
          title: "Reunião com sócios sem ata",
          description:
            "Você participa de uma reunião de alinhamento, sai com 12 tópicos na cabeça, esquece 3.",
        },
        {
          icon: FileText,
          title: "Parecer societário fundamentado",
          description:
            "Conflito entre sócios, dissolução, exclusão — e tudo precisa estar blindado juridicamente.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Empresarial",
      title: "Do NDA ao acordo de acionistas em uma conversa",
      subtitle:
        "Descreva o deal, a IA redige o contrato com as cláusulas certas. Pergunte uma tese societária, ela responde com doutrina e jurisprudência.",
      cases: [
        {
          icon: FileSignature,
          title: "Contratos corporativos complexos",
          description:
            "Acordo de acionistas, SPA, SAFE, NDA, MOU, MSA, contrato de prestação de serviços B2B, vesting, lock-up.",
        },
        {
          icon: FileText,
          title: "Atas de assembleia e reunião de sócios",
          description:
            "AGO, AGE, reunião de sócios, reunião de diretoria — com ordem do dia, deliberações e assinaturas.",
        },
        {
          icon: BookOpen,
          title: "Pareceres societários",
          description:
            "Dissolução parcial, exclusão de sócio, direito de retirada, apuração de haveres, abuso de poder de controle.",
        },
        {
          icon: FileSearch,
          title: "Due diligence assistida",
          description:
            "Suba os documentos, a IA lê tudo, aponta red flags, classifica riscos e monta o memorando do que foi encontrado.",
        },
        {
          icon: Building,
          title: "Alterações contratuais e estatutos",
          description:
            "Alteração de contrato social, consolidação, estatuto de S.A., regimento interno, políticas internas.",
        },
        {
          icon: Search,
          title: "Pesquisa em precedentes empresariais",
          description:
            "STJ, TJ paulista e carioca (câmaras empresariais especializadas), B3, CVM — tudo acessível em linguagem natural.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Empresarial",
      title: "Toda reunião vira ata. Todo call vira memorando.",
      subtitle:
        "Reunião de sócios, board meeting, negociação M&A, alinhamento com cliente — tudo gravado, transcrito e estruturado para virar documento jurídico.",
      cases: [
        {
          icon: Handshake,
          title: "Board meetings profissionais",
          description:
            "Grave a reunião de conselho, a IA entrega ata com ordem do dia, deliberações e encaminhamentos — pronta para assinatura.",
        },
        {
          icon: Mic,
          title: "Negociação M&A gravada",
          description:
            "Cada round de negociação fica registrado. A IA destaca os pontos fechados, os pendentes e os riscos.",
        },
        {
          icon: MessageSquare,
          title: "Call com o cliente corporativo",
          description:
            "A conversa vira um resumo executivo com demandas, prazos e documentos a produzir. Zero anotação.",
        },
        {
          icon: Brain,
          title: "Reunião interna da banca",
          description:
            "Reuniões de estratégia do escritório viram ata com responsáveis e próximos passos.",
        },
        {
          icon: Target,
          title: "Pontos controvertidos destacados",
          description:
            "Quando sócios divergem, a IA marca exatamente onde e sobre o quê. Útil para parecer posterior.",
        },
        {
          icon: FileText,
          title: "Memorando pós-call pronto",
          description:
            "Ao final da call, a IA devolve o memorando para enviar ao cliente no mesmo dia.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Empresarial antes e depois",
      subtitle: "",
      rows: [
        { metric: "Contrato padrão redigido", before: "2h", after: "15 min" },
        { metric: "Due diligence de docs básicos", before: "3 dias", after: "4h" },
        { metric: "Ata de reunião pronta", before: "1h", after: "Automática" },
        { metric: "Parecer societário", before: "1 dia", after: "2h" },
      ],
    },
    testimonials: {
      title: "Corporativos que soltaram o freio",
      main: {
        quote:
          "Eu tenho clientes de M&A que pedem parecer na madrugada. Com a JuridIA, eu respondo no mesmo dia, com fundamentação, doutrina e jurisprudência. Meu ticket médio subiu 30% em 4 meses.",
        name: "Dra. Camila Vasconcellos",
        role: "Sócia — contencioso e consultivo empresarial",
        location: "São Paulo, SP",
        oab: "OAB/SP 289.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "Board meetings viram ata automaticamente. A diretoria do meu cliente elogiou.",
          name: "Dr. Marcelo Pires",
          role: "Empresarial",
          location: "São Paulo, SP",
          oab: "OAB/SP 201.***",
          rating: 5,
        },
        {
          quote:
            "Due diligence que levava semana sai em dois dias com qualidade superior.",
          name: "Dra. Helena Dourado",
          role: "M&A e societário",
          location: "Rio de Janeiro, RJ",
          oab: "OAB/RJ 145.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "Empresarial em ação",
      subtitle: "",
      images: [
        { label: "Chat · SPA", caption: "Minuta de Share Purchase Agreement" },
        { label: "Chat · NDA", caption: "Acordo de confidencialidade bilateral" },
        { label: "Voice · Board", caption: "Reunião de conselho virada em ata" },
        { label: "Chat · Parecer", caption: "Parecer societário de exclusão de sócio" },
        { label: "Chat · Due Dil", caption: "Red flags de due diligence" },
      ],
    },
    faq: {
      title: "Dúvidas do empresarial",
      subtitle: "",
      items: [
        {
          question: "A IA redige contratos em inglês?",
          answer:
            "Sim. Contratos bilíngues ou apenas em inglês, incluindo SPA, SAFE, NDA, SHA e MOU em padrão internacional.",
        },
        {
          question: "Faz due diligence de documentos reais?",
          answer:
            "Faz. Você sobe contratos, estatutos, atas e documentos societários, a IA identifica cláusulas problemáticas e monta o memorando de red flags.",
        },
        {
          question: "Consegue redigir acordo de acionistas complexo?",
          answer:
            "Sim. Tag along, drag along, direito de preferência, lock-up, vesting, cláusulas de resolução de disputa, arbitragem — tudo coberto.",
        },
        {
          question: "E compliance e LGPD?",
          answer:
            "Políticas internas, códigos de conduta, canais de denúncia, DPIA, contratos com cláusulas LGPD adequadas.",
        },
        {
          question: "Grava reunião de board e negociação M&A?",
          answer:
            "Sim. Presencial ou online, com separação por orador, e entrega ata + memorando executivo.",
        },
        {
          question: "É seguro para cliente corporativo sensível?",
          answer:
            "Sim. Hospedagem no Brasil, criptografia ponta a ponta, LGPD e NDA com todos os clientes do plano corporativo.",
        },
        {
          question: "Quanto tempo de teste?",
          answer: "4 dias com acesso total, sem cartão.",
        },
        {
          question: "Tem plano corporativo para o escritório todo?",
          answer:
            "Tem. Fale com a gente no WhatsApp que mostramos as condições do plano multi-usuário.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Corporativo no ritmo do cliente",
      title: "O seu consultivo nunca mais atrasa",
      subtitle: "Teste grátis por 4 dias. Demonstração focada em contrato, due diligence e board.",
    },
    whatsapp: {
      message: "Olá! Sou advogado(a) empresarial e quero saber mais sobre a JuridIA.",
      buttonLabel: "Falar com especialista em Empresarial",
    },
  },

  // ============================================================
  // FAMÍLIA
  // ============================================================
  familia: {
    slug: "familia",
    icon: HeartHandshake,
    name: "Família",
    metadata: baseMeta(
      "familia",
      "JuridIA para Advogado de Família — divórcio, guarda, alimentos e inventário com IA",
      "Petições de divórcio, guarda, alimentos, partilha e inventário. A IA que respeita o momento delicado do cliente e te deixa focado no que importa: escutar."
    ),
    hero: {
      eyebrow: "JuridIA para Direito de Família",
      headline: "A tecnologia que te devolve",
      headlineHighlight: "o olhar no cliente",
      subtitle:
        "Divórcio, guarda, alimentos, partilha e inventário. O cliente está fragilizado — você precisa escutar, não digitar. A JuridIA grava, organiza e entrega a petição pronta.",
      badges: [
        "Treinada no CC/2002, ECA, Lei da Alienação Parental e jurisprudência dos TJs",
        "Usada por advogados de família em todo o Brasil",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "100%", label: "do tempo da consulta focado no cliente" },
        { number: "1 hora", label: "de reunião virada em petição" },
        { number: "+500", label: "familaristas ativos" },
      ],
    },
    pains: {
      title: "Família é o direito mais humano — e o mais difícil:",
      subtitle: "",
      items: [
        {
          icon: HeartPulse,
          title: "Cliente chorando, você anotando",
          description:
            "A consulta de família é emocional. Se você fica digitando, perde o rapport — e a confiança que o cliente precisa depositar em você.",
        },
        {
          icon: Baby,
          title: "Caso de guarda que envolve criança",
          description:
            "Tudo precisa ser feito com atenção, sensibilidade e fundamentação. O melhor interesse do menor não admite erro.",
        },
        {
          icon: FileText,
          title: "Petições de divórcio e inventário repetitivas",
          description:
            "A estrutura é quase sempre a mesma, mas cada caso tem nuances. Você acaba refazendo do zero ou colando e editando.",
        },
        {
          icon: Calculator,
          title: "Partilha de bens com cálculos",
          description:
            "Regime de bens, bens comuns, colação, quinhão, custas, ITCMD. Uma conta errada e o processo atrasa meses.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Família",
      title: "Petições delicadas, feitas com técnica e carinho",
      subtitle:
        "A IA conhece o Código Civil, o ECA, a Lei da Alienação Parental e a jurisprudência dos TJs. E escreve com sensibilidade, não com frieza.",
      cases: [
        {
          icon: FileText,
          title: "Divórcio litigioso e consensual",
          description:
            "Inicial com partilha, alimentos, guarda, visitas, pensão compensatória e dever de informação.",
        },
        {
          icon: Baby,
          title: "Guarda, visita e alienação parental",
          description:
            "Pedidos de guarda compartilhada, unilateral, regulamentação de visitas, direito de convivência e combate à alienação parental.",
        },
        {
          icon: Coins,
          title: "Alimentos — fixação, revisão, execução",
          description:
            "Ação de alimentos com cálculo do binômio possibilidade-necessidade, revisional, execução por rito especial e prisão civil.",
        },
        {
          icon: FileSignature,
          title: "Inventário e partilha",
          description:
            "Arrolamento comum, sumário, extrajudicial, partilha em vida, colação e sobrepartilha — com ITCMD calculado.",
        },
        {
          icon: Users,
          title: "União estável e reconhecimento post mortem",
          description:
            "Reconhecimento e dissolução de união estável, homoafetiva, concomitante e post mortem, com prova testemunhal e documental.",
        },
        {
          icon: BookOpen,
          title: "Adoção, curatela e interdição",
          description:
            "Adoção unilateral e conjunta, curatela, interdição, tomada de decisão apoiada e outros procedimentos especiais.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Família",
      title: "Olhe no olho do cliente. A IA cuida do resto.",
      subtitle:
        "Em família, a escuta é metade do trabalho. O Voice grava a consulta, separa o que é jurídico do que é desabafo, estrutura os fatos e ainda sugere a peça.",
      cases: [
        {
          icon: Headphones,
          title: "Consulta inicial sem digitar",
          description:
            "Grave a conversa inteira com o cliente. A IA separa fatos relevantes, pedidos possíveis e encaminhamentos.",
        },
        {
          icon: UserCheck,
          title: "Audiência de conciliação familiar",
          description:
            "Audiências no CEJUSC ficam transcritas, com destaque para o que foi aceito, o que foi recusado e os pontos sensíveis.",
        },
        {
          icon: HeartPulse,
          title: "Escuta ativa sem quebrar o rapport",
          description:
            "O cliente percebe que você está olhando pra ele, não pro computador. O vínculo de confiança acontece — e a petição sai igual.",
        },
        {
          icon: MessageSquare,
          title: "Reunião com a criança/adolescente (com cautela)",
          description:
            "Nos casos em que o depoimento do menor é colhido com acompanhamento, o Voice registra com sensibilidade e protocolo definido.",
        },
        {
          icon: Brain,
          title: "Resumo emocional × resumo jurídico",
          description:
            "A IA entrega dois resumos: um jurídico (pedidos, fatos, provas) e um executivo (próximos passos, documentos, prazo).",
        },
        {
          icon: FileText,
          title: "Da consulta à minuta de petição",
          description:
            "Com um clique, a conversa vira um esboço da inicial correspondente ao caso narrado pelo cliente.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Família antes e depois",
      subtitle: "",
      rows: [
        { metric: "Consulta de 1h", before: "1h + 30 min anotação", after: "1h, pronta" },
        { metric: "Divórcio litigioso", before: "3h", after: "25 min" },
        { metric: "Inventário extrajudicial", before: "4h", after: "40 min" },
        { metric: "Foco no cliente durante a consulta", before: "Parcial", after: "100%" },
      ],
    },
    testimonials: {
      title: "Familaristas que voltaram a olhar o cliente nos olhos",
      main: {
        quote:
          "Família exige presença. Eu precisava estar ali, inteira, com o cliente que vinha chorando contar de um divórcio doloroso. Hoje eu escuto, grave, e a petição sai pronta. Meu cliente sente que é ouvido de verdade.",
        name: "Dra. Juliana Mendes",
        role: "Advogada de família — escritório especializado",
        location: "Campinas, SP",
        oab: "OAB/SP 178.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "Inventário extrajudicial que eu levava um dia pra montar sai agora em 40 minutos.",
          name: "Dra. Cristina Fonseca",
          role: "Família e sucessões",
          location: "Porto Alegre, RS",
          oab: "OAB/RS 63.***",
          rating: 5,
        },
        {
          quote:
            "Consultas mais humanas, petições mais rápidas. Era exatamente o que faltava.",
          name: "Dr. Vinícius Tavares",
          role: "Família",
          location: "Natal, RN",
          oab: "OAB/RN 18.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "Família na JuridIA",
      subtitle: "",
      images: [
        { label: "Chat · Divórcio", caption: "Divórcio litigioso com guarda e partilha" },
        { label: "Chat · Alimentos", caption: "Ação de alimentos com cálculo" },
        { label: "Voice · Consulta", caption: "Consulta emocional transcrita" },
        { label: "Chat · Inventário", caption: "Inventário extrajudicial completo" },
        { label: "Chat · Guarda", caption: "Pedido de guarda compartilhada" },
      ],
    },
    faq: {
      title: "Dúvidas do familarista",
      subtitle: "",
      items: [
        {
          question: "A IA respeita o tom da matéria de família?",
          answer:
            "Sim. O prompt de família foi ajustado para redigir com sensibilidade, sem o tom agressivo comum no contencioso. Preserva a dignidade do outro lado e foca nos melhores interesses envolvidos.",
        },
        {
          question: "Faz cálculo de partilha e ITCMD?",
          answer:
            "Faz. Regime de bens, colação, partilha por quinhão, imposto estadual de transmissão causa mortis.",
        },
        {
          question: "Cobre guarda compartilhada, alienação parental e direito de convivência?",
          answer:
            "Sim. Com fundamentação na Lei 12.318/2010, no ECA e na jurisprudência dos TJs e do STJ.",
        },
        {
          question: "Inventário extrajudicial?",
          answer:
            "Redige a minuta da escritura pública de inventário, cálculos, partilha amigável e documentos necessários.",
        },
        {
          question: "Audiência de família gravada é ok?",
          answer:
            "Sim, como apoio ao trabalho do advogado. A gravação é sigilosa, criptografada e disponível apenas para você.",
        },
        {
          question: "Funciona para união homoafetiva e reconhecimento post mortem?",
          answer:
            "Funciona. Reconhecimento, dissolução, sucessão post mortem, registro tardio — tudo coberto pela IA com fundamentação.",
        },
        {
          question: "Teste grátis?",
          answer: "4 dias completos, sem cartão.",
        },
        {
          question: "LGPD e sigilo familiar?",
          answer:
            "Sigilo absoluto. Dados criptografados, hospedagem no Brasil, nunca treinamos modelo com suas conversas.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Humano no centro",
      title: "Volte a escutar o cliente sem perder petição",
      subtitle: "Teste grátis por 4 dias. Demonstração focada em consulta emocional + divórcio.",
    },
    whatsapp: {
      message: "Olá! Sou advogado(a) de família e quero saber mais sobre a JuridIA.",
      buttonLabel: "Falar com especialista em Família",
    },
  },

  // ============================================================
  // CONSUMIDOR
  // ============================================================
  consumidor: {
    slug: "consumidor",
    icon: Users,
    name: "Consumidor",
    metadata: baseMeta(
      "consumidor",
      "JuridIA para Advogado do Consumidor — petição em massa, dano moral e contestação bancária",
      "Ações massificadas contra bancos, cias aéreas e planos de saúde. A IA que redige inicial, contesta e calcula dano moral no volume que você precisa."
    ),
    hero: {
      eyebrow: "JuridIA para Direito do Consumidor",
      headline: "Escala real para",
      headlineHighlight: "o contencioso de massa",
      subtitle:
        "Ações contra bancos, cias aéreas, planos de saúde, telecom e e-commerce. A JuridIA redige iniciais massificadas com individualização, contesta e calcula dano moral de acordo com a jurisprudência atual.",
      badges: [
        "Treinada no CDC, Lei do SUS, Lei das Cias Aéreas e súmulas do STJ",
        "Usada por escritórios de massa em todo o Brasil",
      ],
      primaryCtaLabel: "Testar grátis por 4 dias",
      secondaryCtaLabel: "Falar no WhatsApp",
      stats: [
        { number: "15x", label: "mais ações ajuizadas por semana" },
        { number: "CDC+STJ", label: "Base completa" },
        { number: "+900", label: "consumeristas ativos" },
      ],
    },
    pains: {
      title: "Consumerista sabe que é volume com qualidade:",
      subtitle: "",
      items: [
        {
          icon: TrendingDown,
          title: "Ticket baixo, volume alto",
          description:
            "Cada ação rende pouco. Para viver bem, você precisa ajuizar muitas — e com qualidade. Redigir uma por vez não cabe no modelo.",
        },
        {
          icon: ShoppingBag,
          title: "Casos parecidos, fundamentos distintos",
          description:
            "Cancelamento de voo, recusa de procedimento, descontos indevidos, produto com defeito. Tudo parece igual, mas o enquadramento muda.",
        },
        {
          icon: Banknote,
          title: "Valor do dano moral sempre em xeque",
          description:
            "Juízes e turmas têm critérios diferentes. Você precisa saber quanto pedir no tribunal de cada comarca.",
        },
        {
          icon: FileWarning,
          title: "Contestação dos bancos intimidante",
          description:
            "Banco manda contestação padrão, longa, repetitiva — e você precisa rebater ponto a ponto no prazo.",
        },
      ],
    },
    chat: {
      eyebrow: "JuridIA Chat · Consumidor",
      title: "Contencioso massificado, sem ser massa burra",
      subtitle:
        "Uma planilha, centenas de iniciais individualizadas. Ou uma inicial descritiva, contestação pronta em minutos. A IA escala com você — sem abrir mão do caso concreto.",
      cases: [
        {
          icon: FileText,
          title: "Inicial contra banco, cia aérea, plano de saúde",
          description:
            "Descontos indevidos, cobrança abusiva, fraude, cancelamento de voo, atraso, recusa de procedimento, negativa de cobertura.",
        },
        {
          icon: FileWarning,
          title: "Contestação individual e em massa",
          description:
            "Você cola a inicial, a IA contesta. Ou sobe um lote de iniciais, ela contesta todas mantendo consistência.",
        },
        {
          icon: Calculator,
          title: "Cálculo de dano moral por comarca",
          description:
            "A IA sugere valor adequado ao tipo de dano, considerando a jurisprudência do tribunal onde você vai ajuizar.",
        },
        {
          icon: FileSignature,
          title: "Lote de iniciais com CSV",
          description:
            "Suba um CSV com dados dos clientes, a IA gera as iniciais individualizadas com fatos e pedidos específicos.",
        },
        {
          icon: Search,
          title: "Pesquisa em súmulas do STJ e enunciados do CJF",
          description:
            "Pergunte uma tese do CDC, receba a súmula, o enunciado e os acórdãos recentes aplicáveis.",
        },
        {
          icon: BookOpen,
          title: "Recursos ao STJ em consumidor",
          description:
            "Ag em REsp, REsp e embargos fundamentados em temas repetitivos e súmulas do STJ em consumo.",
        },
      ],
      ctaLabel: "Testar o Chat agora",
    },
    voice: {
      eyebrow: "JuridIA Voice · Consumidor",
      title: "Triagem rápida, cliente bem atendido",
      subtitle:
        "No contencioso de massa, a triagem é o gargalo. O Voice grava a conversa, extrai os dados, classifica o tipo de ação e já encaminha para a inicial certa.",
      cases: [
        {
          icon: PhoneCall,
          title: "Atendimento telefônico do novo cliente",
          description:
            "Grave a ligação (com consentimento), a IA extrai: nome, documento, fato, dano, data, valor e classifica a ação cabível.",
        },
        {
          icon: UserCheck,
          title: "Entrevista presencial padronizada",
          description:
            "Consulta presencial vira um formulário completo pronto para alimentar o CRM e o sistema de peticionamento.",
        },
        {
          icon: Mic,
          title: "Conciliação no CEJUSC transcrita",
          description:
            "Audiência de conciliação consumerista fica registrada, com destaque para proposta e aceitação.",
        },
        {
          icon: Brain,
          title: "Classificação automática do caso",
          description:
            "A IA decide se é banco, aéreo, plano, telecom ou e-commerce e já sugere qual modelo de inicial aplicar.",
        },
        {
          icon: MessageSquare,
          title: "Triagem em lote com time de captação",
          description:
            "Se você tem equipe fazendo captação, o Voice padroniza a entrevista e garante que nada fique de fora.",
        },
        {
          icon: FileText,
          title: "Ficha do caso pronta para ajuizar",
          description:
            "Ao final da triagem, a IA entrega a ficha do caso pronta para virar inicial no Chat.",
        },
      ],
      ctaLabel: "Quero o gravador inteligente",
    },
    beforeAfter: {
      title: "Consumerista antes e depois",
      subtitle: "",
      rows: [
        { metric: "Inicial contra banco", before: "1h30", after: "8 min" },
        { metric: "Contestação rebatida", before: "3h", after: "20 min" },
        { metric: "Lote de 50 iniciais", before: "1 semana", after: "1 tarde" },
        { metric: "Triagem de cliente novo", before: "30 min", after: "10 min + ficha pronta" },
      ],
    },
    testimonials: {
      title: "Consumeristas que realmente escalaram",
      main: {
        quote:
          "No consumidor é volume ou você não sobrevive. Hoje eu ajuízo por semana o que antes eu ajuizava por mês — e com mais qualidade, porque a IA traz o acórdão do STJ que eu talvez nem procurasse. Meu faturamento dobrou.",
        name: "Dr. Gustavo Almeida",
        role: "Advogado consumerista — escritório de massa",
        location: "São Paulo, SP",
        oab: "OAB/SP 265.***",
        rating: 5,
      },
      extras: [
        {
          quote:
            "Subi 40 casos em um CSV e saíram 40 iniciais prontas, cada uma individualizada. Ouro puro.",
          name: "Dra. Tatiana Ribas",
          role: "Consumidor massificado",
          location: "Goiânia, GO",
          oab: "OAB/GO 27.***",
          rating: 5,
        },
        {
          quote:
            "Contestações dos bancos eu rebato em 20 minutos com mais técnica do que antes.",
          name: "Dr. Bruno Aragão",
          role: "Consumerista bancário",
          location: "Fortaleza, CE",
          oab: "OAB/CE 44.***",
          rating: 5,
        },
      ],
    },
    gallery: {
      title: "Consumidor em ação",
      subtitle: "",
      images: [
        { label: "Chat · Banco", caption: "Inicial contra banco por descontos" },
        { label: "Chat · Aéreo", caption: "Ação por cancelamento de voo" },
        { label: "Voice · Triagem", caption: "Atendimento padronizado transcrito" },
        { label: "Chat · Lote", caption: "Lote de iniciais a partir de CSV" },
        { label: "Chat · Plano", caption: "Negativa de cobertura no plano de saúde" },
      ],
    },
    faq: {
      title: "Dúvidas do consumerista",
      subtitle: "",
      items: [
        {
          question: "Consigo gerar várias iniciais a partir de um CSV?",
          answer:
            "Sim. Você sobe um CSV com dados dos clientes (nome, CPF, endereço, fato, valor) e a IA gera as iniciais individualizadas em lote, mantendo padrão e qualidade.",
        },
        {
          question: "Cobre ações contra banco, cia aérea, plano de saúde e telecom?",
          answer:
            "Sim. Descontos indevidos, cobrança abusiva, fraude, cancelamento de voo, atraso, recusa de procedimento, negativa de cobertura, faturas indevidas, interrupção de serviço.",
        },
        {
          question: "A IA sugere valor de dano moral adequado?",
          answer:
            "Sugere. Considera o tipo de dano, a jurisprudência do tribunal onde você vai ajuizar e os critérios usados pelas turmas recursais dos juizados.",
        },
        {
          question: "Funciona em juizado especial?",
          answer:
            "Funciona muito bem. A IA ajusta a linguagem para o rito do JEC, com fundamentação enxuta e pedidos objetivos.",
        },
        {
          question: "Contestação dos bancos gigante, eu preciso rebater?",
          answer:
            "Cole a contestação e peça à IA para rebater ponto a ponto. Ela devolve a réplica com impugnação específica de cada alegação.",
        },
        {
          question: "Recursos ao STJ em consumo?",
          answer:
            "Sim. REsp, Ag em REsp, embargos — com fundamentação em súmulas e temas repetitivos em consumidor.",
        },
        {
          question: "Teste grátis?",
          answer: "4 dias com acesso total, sem cartão.",
        },
        {
          question: "LGPD e sigilo dos dados dos meus clientes?",
          answer:
            "Hospedagem no Brasil, criptografia, LGPD e nenhum treinamento de modelo com suas conversas.",
        },
      ],
    },
    megaCta: {
      eyebrow: "Escala com técnica",
      title: "Pronto para escalar o contencioso de massa?",
      subtitle: "Teste grátis por 4 dias. Demo focada em lote de iniciais e contestação bancária.",
    },
    whatsapp: {
      message: "Olá! Sou advogado(a) consumerista e quero saber mais sobre a JuridIA.",
      buttonLabel: "Falar com especialista em Consumidor",
    },
  },
};

export const AREA_SLUGS: AreaSlug[] = [
  "trabalhista",
  "previdenciario",
  "civel",
  "penal",
  "tributario",
  "empresarial",
  "familia",
  "consumidor",
];
