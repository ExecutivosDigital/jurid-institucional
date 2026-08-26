# A Alma da Jurid.IA

> Documento consolidador das funcionalidades do sistema.
> Fonte: código-fonte dos repositórios `jurid-api`, `jurid-chat-web`, `jurid-hub-api`, `jurid-hub-web`, `jurid-portal` e `Juridia Voice`.
> Última consolidação: **26/08/2026**.
> Uso: material-base para copy, LP, VSL, treinamento comercial, onboarding e suporte.

---

## 1. O que é a Jurid.IA (a frase-mãe)

**A Jurid.IA é o escritório de advocacia inteiro dentro de uma única tela: uma inteligência artificial que conversa, pesquisa, calcula, consulta, monitora, organiza e cobra — sem que o advogado precise trocar de sistema, de aba ou de cabeça.**

O advogado brasileiro médio hoje opera com: um WhatsApp para o cliente, uma planilha para o financeiro, um caderno para os prazos, o site do tribunal para o processo, o Google para a jurisprudência, o Word para a peça, o e-mail para a proposta e a memória para o resto. **A Jurid.IA existe para acabar com essa fragmentação.**

A espinha dorsal é o **Chat**. Tudo o mais — consultas, cálculos, monitoramento, cofre, CRM, financeiro, propostas — está disponível tanto como tela própria quanto como *ferramenta que a própria IA usa sozinha durante a conversa*. Você pode pedir "calcula a rescisão desse cliente" no meio de um papo e a IA executa o motor de cálculo real, com os índices oficiais, e devolve o resultado dentro da conversa.

### As três promessas centrais

| Promessa | O que significa na prática |
|---|---|
| **Tempo** | O que levava 40 minutos (achar o processo, ler, resumir, calcular, redigir) leva 3. |
| **Segurança** | Cálculos com índices oficiais do Bacen e tabelas oficiais, consultas em fontes públicas primárias, jurisprudência real com citação — não "achismo de IA". |
| **Controle** | Nada mais se perde: prazo, publicação, documento, lead, recebimento, gravação de reunião. |

### A dor-mãe que a Jurid.IA resolve

> *"Eu sou advogado, mas passo metade do meu dia sendo secretário, contador, pesquisador e cobrador de mim mesmo."*

Todas as funcionalidades abaixo são recortes dessa mesma dor.

---

## 2. Mapa de funcionalidades

**Produto principal — Jurid.IA (plataforma web)**

1. Chat (Jurid.Ai)
2. Chat Pro (Jurid PRO)
3. Meu Juiz IA
4. Monitoramento de Processos
5. Central de Consultas
6. Calculadora Jurídica
7. Calculadora de Prazos
8. Cofre
9. Propostas
10. CRM
11. Financeiro
12. Cursos / Trilhas
13. Geração de Documentos (DOCX / XLSX / PDF)
14. Portal de Notícias Jurídicas
15. Créditos e Planos (a economia interna)

**Produto irmão — Jurid.IA Voice** (app mobile + web)

16. Voice: gravação presencial e online, transcrição, resumos e inteligência de reunião

---

# 3. Chat — o Jurid.Ai

## O que é

É o coração da plataforma: um assistente jurídico conversacional que entende Direito brasileiro, lê o que você anexa, pesquisa em bases reais e **executa ferramentas de verdade** — não só "responde texto".

Roda no modelo mais avançado da casa (`gpt-5.6-luna`, vencedor de um benchmark cego interno de 10 fluxos jurídicos multi-turno) com cadeia automática de fallback (família Gemini) para nunca deixar o advogado sem resposta.

## Para que serve

- Tirar dúvida jurídica com fundamento
- Ler e resumir petição, contrato, laudo, decisão, print de processo
- Redigir peça, cláusula, notificação, e-mail para cliente, defesa
- Pesquisar jurisprudência com citação real
- Consultar processo por número
- Rodar cálculo, calcular prazo, emitir certidão, gerar documento — tudo por conversa

## Como é útil na prática (o que ele faz que um chat comum não faz)

**1. É multimodal de verdade.** Aceita texto, **foto**, **PDF (inclusive escaneado, com OCR)**, **áudio** e **vídeo**. Mandou o áudio de 6 minutos do cliente relatando o caso? Ele transcreve automaticamente e responde sobre o conteúdo. Mandou a foto da intimação? Ele lê. PDF escaneado que um modelo recusa cai automaticamente na cadeia de fallback e é lido mesmo assim.

**2. Tem memória.** Cada conversa mantém um resumo rolante e um conjunto de "fatos canônicos" (nome do cliente, número do processo, valores, datas), mais uma memória vetorial com busca semântica, reordenação por *reranker* e fusão RRF. Traduzindo: **ele não esquece o caso no meio da conversa** e recupera o que foi dito 80 mensagens atrás.

**3. Usa ferramentas sozinho.** O chat tem acesso executável a:

- motores de **cálculo** (trabalhista, previdenciário, bancário, atualização monetária)
- **calculadora de prazos** processuais
- **Central de Consultas** (certidões, CNPJ, CPF, processos, protestos…)
- **jurisprudência** (STF, STJ, TST, TRF3, TJPR, TJRJ, TJRS, TJSC, TJSP, CARF)
- **DataJud / CNJ** para consulta processual
- **geração de documentos** (DOCX, XLSX, PDF)
- **monitoramento** (criar alvo de acompanhamento por conversa)

**4. Conversa sabendo quem é o cliente.** Se o chat for aberto a partir de um lead do CRM, ele já entra na conversa conhecendo o lead: fase, anotações, anexos, origem.

**5. Organiza-se sozinho.** Título automático da conversa por IA, arquivamento, histórico pesquisável, botões de **Regenerar** e **Resposta aprimorada** (que reanalisa todo o contexto e valida os dados).

## Benefícios

- Reduz de horas para minutos a produção da primeira versão de qualquer peça
- Elimina a troca de contexto entre seis sistemas diferentes
- Dá fundamento e citação onde antes havia intuição
- Funciona como um "estagiário sênior" 24/7, que nunca fica doente e nunca esquece

## Dores que resolve

| Dor | Como o Chat resolve |
|---|---|
| "Não tenho tempo de ler tudo" | Anexa e pede resumo em 20 segundos |
| "Travei na hora de começar a peça" | Primeira versão pronta para editar |
| "Não sei se essa tese cola" | Jurisprudência real, com tribunal e citação |
| "Não lembro o que combinei com esse cliente" | Memória da conversa + contexto do lead |
| "Perco tempo abrindo o site do tribunal" | Consulta processual dentro da conversa |
| "IA genérica inventa lei" | Ferramentas reais + fontes primárias + fallback multimodal |

## Modelo comercial

O chat no modelo padrão é **ilimitado e gratuito dentro do plano** — é o gancho de uso diário. Só consomem crédito ações premium específicas (regenerar, resposta aprimorada, Chat Pro, consultas).

---

# 4. Chat Pro — o Jurid PRO

## O que é

Uma **modalidade de conversa premium**, aberta deliberadamente pelo advogado, para os casos que exigem fôlego. Não é "outro chat": é o mesmo chat com o motor destravado.

## O que muda em relação ao Chat normal

| | Chat | **Chat Pro** |
|---|---|---|
| Modelo | O melhor da casa, com fallback | O mesmo modelo, **forçado na conversa inteira** — o seletor é ignorado |
| Janela recente | **24 mensagens** | **200 mensagens** |
| Contexto total | Padrão | **1.000.000 de tokens acompanhados** |
| Cobrança | Grátis / por mensagem premium | **Cobrança única na abertura da conversa** (10 créditos padrão) — depois, converse à vontade até o teto |
| Uso ideal | Dúvidas, peças curtas, do dia a dia | Casos complexos, processos volumosos, análise de dossiê inteiro |
| Encerramento | Não expira | Ao atingir 1M tokens a conversa é encerrada e novos envios são recusados |

## Para que serve

Para o caso que **não cabe numa conversa comum**: um processo com 400 páginas, um contrato de 90 cláusulas, uma auditoria de dossiê, a construção de uma tese ao longo de horas, uma sessão de estratégia processual de fôlego.

## Como é útil

- Você joga o processo inteiro dentro e ele **mantém tudo na cabeça**, do começo ao fim
- Não há degradação de contexto no meio da análise
- Custo previsível: você sabe quanto custa **antes** de começar (paga uma vez, não por mensagem)

## Benefícios

- Análise profunda sem picotar o caso em várias conversas
- Consistência: a mesma inteligência do primeiro ao último turno
- Previsibilidade de custo — o advogado não fica com medo de "gastar crédito digitando"

## Dores que resolve

| Dor | Como o Pro resolve |
|---|---|
| "A IA esqueceu o que eu mandei lá atrás" | 200 mensagens recentes + 1M tokens de contexto |
| "Tive que dividir o processo em 5 conversas" | Cabe tudo em uma |
| "Fico contando quantas mensagens ainda posso mandar" | Paga na abertura, conversa livre |
| "Preciso do modelo bom, mas ele cai pro básico" | Modelo premium travado na conversa toda |

## Posicionamento comercial

Chat = **o dia a dia**. Chat Pro = **o caso grande**.
A analogia que vende: *"o Chat é o seu estagiário; o Chat Pro é o sócio que senta com você a tarde inteira num caso só."*

---

# 5. Meu Juiz IA

## O que é

Uma funcionalidade que **coloca a sua peça diante de um juiz simulado antes do juiz real**. O advogado sobe a petição (PDF ou DOCX) e recebe um parecer crítico estruturado.

## O que ele devolve

- **Tipo do documento** e o nível de confiança dessa classificação
- **Área do Direito** e **fase processual**
- **Objetivo principal** e **tese central** identificados
- **Resumo** da peça
- **Nota geral (score)** com a justificativa da nota
- **Pontos fortes**
- **Pontos fracos**
- **As perguntas que o juiz provavelmente fará**
- **Riscos estratégicos**
- **Sugestões práticas**
- **Melhorias de redação trecho a trecho** (o excerto original + a sugestão)
- **Ações recomendadas** e nota final
- **Chat sobre a análise**: depois do parecer, você discute a peça com a IA
- **Histórico** de todas as análises

## Para que serve

Para responder, antes do protocolo, à única pergunta que importa: *"isso aqui convence?"*

## Como é útil

- Substitui a "segunda leitura" de um colega que você nem sempre tem
- Transforma revisão subjetiva em **checklist objetivo**
- As "perguntas que o juiz faria" viram o roteiro de blindagem da peça

## Benefícios

- Peças mais fortes com o mesmo tempo de trabalho
- Advogado júnior produzindo com padrão de sênior
- Menos retrabalho, emenda e indeferimento por falha formal

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Não tenho quem revise a minha peça" | Parecer estruturado em minutos |
| "Protocolei e só depois vi o furo" | O furo aparece antes |
| "Sei que está boa, mas não sei se está forte" | Score + fortes e fracos |
| "Escrevo bem, mas não sei o que o juiz vai perguntar" | Lista de perguntas prováveis |

---

# 6. Central de Consultas

## O que é

Um balcão único de **cerca de 95 consultas oficiais** a fontes públicas brasileiras, executáveis com um clique — ou pedidas em linguagem natural dentro do chat.

## O que dá para consultar (catálogo real)

**Processual**
Consulta processual por nº CNJ · Processo por número (TJ estadual) · Processos do 1º grau por parte (TJSP) · Processos do 2º grau (TJSP) · Justiça Federal (TRF) · Consulta processual TRT · Consulta unificada da Justiça do Trabalho · Execução penal (SEEU/CNJ) · Processo administrativo fiscal (Comprot) · Processo no CARF · Procedimentos no MPF · Processos no CADE · Processos sancionadores (CVM)

**Publicações**
Publicações e intimações do **DJEN** (Diário de Justiça Eletrônico Nacional)

**Certidões**
CND Federal (Receita/PGFN) · CND Estadual (SEFAZ) · CND Municipal · **CNDT** (TST) e validação de CNDT · CRF do FGTS (Caixa) · Certidão Cível e Criminal (Justiça Federal/TRF) · Certidão Unificada da Justiça Federal · Certidão Negativa (STJ) · Certidão Negativa (MPF) · Certidão de feitos (MPT) · CEAT (TRT) · Certidão de débitos (IBAMA) · Validação de certidão de registro civil

**Pessoas**
Situação cadastral de CPF · Antecedentes criminais (Polícia Federal, SSP-SP, MG) e validação · Mandados de prisão (BNMP/CNJ) · Servidor público federal · Bolsa Família · BPC · Restituição do IRPF · Valores a receber (Bacen/SVR) · Registros profissionais: CFM/CRM, CFC, CFP, CFMV, SUSEP

**Empresas**
Cadastro de empresa (CNPJ) · Comprovante oficial de CNPJ · Simples Nacional · Inscrição Estadual / SINTEGRA · Falência e recuperação judicial · Participante do mercado (CVM) · Autorização de funcionamento (ANVISA) · Marcas e patentes (INPI) · RADAR comércio exterior · Transportador RNTRC (ANTT) · Cronotacógrafo (INMETRO)

**Compliance e reputação**
Improbidade e inelegibilidade (CNJ) · Lista de devedores da União (PGFN) · Sanções CEIS/CNEP/CEPIM (CGU) · Inidôneos e inabilitados (TCU) · Consulta consolidada de PJ (TCU) · Apenados (TCE-SP) · "Lista Suja" do trabalho escravo (SIT/MTE) · Acordos de leniência · Expulsões da Administração Federal (CEAF) · **Sanções internacionais OFAC (EUA) e ONU** · **Offshore Leaks (ICIJ)** · Protestos em cartório (CENPROT-SP) · Dívida ativa estadual (PGE) · CADIN-SP

**Patrimônio e imóveis**
Imóveis rurais do município (SNCR/INCRA) · CAFIR/CIB · CAR · CCIR · AVCB/CLCB (Bombeiros SP) · Cartórios extrajudiciais (CNJ) · Selo digital de cartório (TJSP) · Validação de NF-e

**Trabalhista e ambiental**
Autos de infração por empregador (MTE) · Transparência salarial (MTE) · Embargos e autuações ambientais (IBAMA) · Certificado de regularidade CTF (IBAMA)

**Utilidades**
Endereço por CEP · Feriados nacionais do ano (grátis) · Rastreamento de objeto (Correios) · Infrações PRF · DAP/PRONAF · Seguro-defeso do pescador · Registro de pescador

## Como funciona

Cada consulta tem **custo em créditos transparente** (1 a 3 créditos; algumas gratuitas), histórico completo, extrato de consumo, e o resultado fica salvo e reconsultável. Executável pela tela **ou** pedida ao chat ("consulta o CNPJ da parte contrária e me diz se tem protesto").

## Para que serve

Due diligence, qualificação de cliente, análise de solvência antes de propor a ação, instrução processual, compliance de contratação, verificação de parte contrária.

## Benefícios

- Uma tela substitui **dezenas de portais** com login, captcha e certificado
- Custo previsível por consulta, em vez de assinatura de bureau caro
- Resultado auditável e arquivado

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Cada certidão é um site diferente" | Balcão único |
| "Perdi duas horas emitindo certidão para uma petição" | Minutos |
| "Peguei um cliente que não tinha como pagar" | Protestos, dívida ativa, devedores da União |
| "Não sei se essa empresa é idônea" | CEIS, CNEP, TCU, lista suja, OFAC, ONU |
| "Assinatura de bureau custa caro demais" | Pague por consulta |

> **Nota operacional honesta:** o catálogo tem cerca de 95 consultas mapeadas; nem todas as fontes públicas respondem com a mesma estabilidade (algumas exigem Gov.br, outras caem por indisponibilidade do órgão). Um retorno "nada consta" é resposta válida e útil.

---

# 7. Monitoramento de Processos

## O que é

Um **radar automático** que varre o **DJEN (Diário de Justiça Eletrônico Nacional)** todos os dias procurando por você.

## Como funciona

O advogado cadastra **alvos** de três tipos:

- **OAB** (ex.: `209127/SP`) — tudo que for publicado no seu nome
- **Processo** (número CNJ) — tudo daquele processo específico
- **Nome** — radar de cliente: qualquer publicação em que aquela parte apareça

Cada alvo pode ter um apelido ("Cliente Acme", "Minha OAB"). Um worker roda em cron, varre o DJEN, **extrai e interpreta a publicação com IA**, grava os "hits" novos, marca lidos e não lidos e envia **digest por e-mail** para quem criou o alvo. Também é possível forçar uma varredura sob demanda de um alvo específico.

## Para que serve

Para que **nenhuma intimação passe batida** — sem depender de olhar o diário, de escritório de correspondente ou de o cliente avisar.

## Benefícios

- Prazo nunca começa a correr sem você saber
- Feed único de movimentações, com o conteúdo já interpretado pela IA
- Radar de cliente: você descobre que seu cliente foi processado por terceiro **antes dele te contar**
- Escritório inteiro compartilha os alvos; quem criou recebe o alerta

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Perder prazo é perder o cliente e responder na OAB" | Alerta diário automático |
| "Pago correspondente ou clipping caro" | Incluído na plataforma |
| "Abro o diário e não entendo o juridiquês da publicação" | Extração e interpretação por IA |
| "Descobri tarde que meu cliente virou réu em outro processo" | Alvo por NOME |

---

# 8. Calculadora Jurídica

## O que é

Um conjunto de **motores de cálculo jurídico** — não planilhas, não estimativas: engines com índices oficiais (séries do Bacen/SGS, taxa de juros do Bacen, tabelas oficiais previdenciárias e trabalhistas), com resultado salvo, hash de reprodução e exportação.

## As 13 áreas cobertas

| Área | O que calcula |
|---|---|
| **Cível** | Atualização monetária e cumprimento de sentença |
| **Trabalhista** | Rescisão, horas extras, adicional noturno, insalubridade (10/20/40%), periculosidade, valor-hora, horas fictícias |
| **Previdenciário** | Atualização pelo INPC, teto e piso do INSS |
| **Bancário** | Financiamento, amortização, comparação de taxa, **CET**, capitalização — com taxas oficiais do Bacen |
| **Família** | Alimentos (valor fixo ou % de uma base), parcelas vencidas, correção, juros, pagamentos recebidos |
| **Consumidor** | Repetição de indébito simples (×1) ou **em dobro (×2)**, com correção e juros |
| **Danos** | Danos materiais, lucros cessantes, pensão civil vencida |
| **Imobiliário** | Aluguéis em atraso, distrato imobiliário, multa, honorários, custas |
| **Sucessões** | Partilha e quinhões, monte-mor, colação (art. 2.002), legítima e parte disponível, **ITCMD** |
| **Tributário** | Atualização de débito, parcelamento × à vista, SELIC (Fazenda Pública), modo manual justificado, multa de mora |
| **Administrativo** | Atrasados de servidor, **RPV e precatório**, correção por SELIC |
| **Empresarial** | **Valuation por fluxo de caixa descontado (FCD)** e apuração de haveres |
| **Penal** | Dias-multa por frações do salário mínimo (de 1/30 a 5×, com fração customizada) |

Mais uma aba de **Histórico**, com todos os cálculos salvos e exportáveis.

## Como é útil

- Cálculo **auditável**: cada resultado guarda os parâmetros e um hash de reprodução — dá para provar como se chegou naquele número
- Resumo jurídico do cálculo pronto para colar na petição
- Os motores estão expostos ao chat: *"calcula a rescisão de um salário de R$ 3.200 com 2 anos e 4 meses, aviso indenizado"* funciona por conversa

## Benefícios

- Fim da planilha herdada de um estagiário de 2019 que ninguém sabe se está certa
- Fim de pagar contador ou perito por cálculo trivial
- Argumentação numérica sólida em audiência e em acordo

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Minha planilha pode estar errada e eu nem sei" | Motor com índices oficiais |
| "Perdi a memória de cálculo do ano passado" | Histórico + hash de reprodução |
| "Terceirizo cálculo simples e pago caro" | Faz na hora |
| "Fui pra audiência sem saber o valor real do acordo" | Número na mão em minutos |

---

# 9. Calculadora de Prazos

## O que é

Motor de prazos processuais com **calendário forense real**: dias úteis, feriados nacionais (buscados de fonte oficial), suspensões e as regras próprias de cada rito.

## O que cobre (catálogo)

**Cível / CPC:** contestação, réplica e impugnação à contestação, apelação, contrarrazões de apelação, embargos de declaração, agravo de instrumento, agravo interno, recurso especial e extraordinário, cumprimento de sentença (pagamento voluntário e impugnação), prazo geral supletivo de manifestação.

**Trabalhista:** recurso ordinário (TRT), contrarrazões, embargos de declaração, recurso de revista (TST), agravo de petição, agravo de instrumento.

**Penal:** apelação criminal, razões de apelação criminal, recurso em sentido estrito, embargos de declaração.

**Juizados:** recurso inominado (JEC), embargos de declaração (JEC).

## Para que serve

Responder em segundos: *"intimado em tal dia — quando vence?"*

## Benefícios

- Elimina a conta de cabeça e o erro de contar dia útil
- Considera feriado nacional automaticamente
- Também disponível como ferramenta do chat

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Contei errado e o prazo caiu num feriado" | Calendário forense oficial |
| "Cada rito tem uma regra e eu não decoro todas" | Catálogo por rito |
| "Anotei o prazo no papel e perdi o papel" | Fica salvo |

---

# 10. Cofre

## O que é

O **arquivo digital do escritório**: até **20 GB** por advogado, com pastas hierárquicas, upload, download, busca, renomeação e vínculo com cliente.

## O que faz

- Árvore de pastas e subpastas, criadas livremente
- Pasta pode ser **vinculada a um cliente**
- Upload com fila (vários arquivos de uma vez), tela de detalhe do arquivo, exclusão
- **Busca de arquivos** por nome em todo o cofre
- Barra de armazenamento com o consumo em tempo real

## Para que serve

Guardar procuração, contrato, RG, comprovante, laudo, sentença, gravação — **no mesmo lugar em que a IA trabalha**.

## Benefícios

- Fim do "o documento está no WhatsApp de alguém"
- Fim do e-mail com anexo de 40 MB
- Acesso de qualquer lugar, sem depender do computador do escritório
- Continuidade: se um colaborador sai, o acervo fica

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Cadê a procuração desse cliente?" | Busca no cofre |
| "Está no Drive pessoal do meu estagiário" | Acervo do escritório |
| "Perdi arquivo em troca de computador" | Nuvem |
| "O cliente pede o contrato de 2023 pela terceira vez" | Acha e envia em segundos |

---

# 11. Propostas

## O que é

Um gerador de **propostas de honorários** que começa onde a proposta realmente nasce: **na conversa com o cliente**.

## O fluxo completo

1. **Grava ou envia o áudio** da conversa com o cliente → a plataforma **transcreve**
2. A IA **analisa o caso** a partir da transcrição (ou do texto que você digitar)
3. **Gera a proposta** em blocos estruturados (diagnóstico, escopo, entregas, honorários, condições)
4. Você **edita bloco a bloco** o que quiser
5. **Gera o PDF** com a identidade do escritório (perfil do advogado configurável)
6. **Acompanha o status** da proposta e mantém o histórico completo

## Para que serve

Transformar "vou te mandar uma proposta depois" — que morre — em **proposta na mão do cliente no mesmo dia**.

## Benefícios

- Aumenta a conversão pela velocidade (proposta em minutos, não em dias)
- Padroniza a apresentação do escritório
- Elimina o retrabalho de escrever a mesma proposta pela centésima vez
- O histórico vira dado comercial: quantas propostas foram feitas, quantas fecharam

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Esqueci de mandar a proposta e perdi o cliente" | Gera na hora, com status |
| "Minha proposta é um Word feio de 2019" | PDF profissional |
| "Não sei precificar nem o que escrever" | IA estrutura escopo e entregas |
| "Anotei a reunião no guardanapo" | Áudio → transcrição → proposta |

---

# 12. CRM

## O que é

Um **funil de clientes em quadro Kanban**, feito para a realidade da advocacia — não um CRM de vendas genérico adaptado na marra.

## O que faz

- **Fases customizáveis** pelo escritório (criar, renomear, reordenar, excluir)
- **Quadro (board)** com arraste entre fases
- **Lead** com nome, contato, documento, origem e descrição
- **Anotações** com autor e data
- **Anexos** por lead
- **Chats vinculados ao lead** — e o Chat abre já conhecendo o histórico daquele lead
- Configurações do CRM por escritório
- Busca e filtros

## Para que serve

Não perder cliente por esquecimento. Saber, a qualquer momento, quem está esperando resposta sua.

## Benefícios

- Visão instantânea do pipeline do escritório
- Contexto integral do lead na hora de atender — com a IA junto
- Passagem de bastão entre sócios e colaboradores sem perda de informação
- Origem do lead registrada: você descobre o que realmente traz cliente

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Meu CRM é o WhatsApp não lido" | Funil visual |
| "Esqueci de dar retorno e o cliente foi embora" | Fase + anotações |
| "Não sei quantos clientes estão em negociação" | Board |
| "Cada advogado do escritório tem a própria lista" | Base única |

---

# 13. Financeiro

## O que é

O **controle financeiro do escritório**, na linguagem do escritório.

## O que faz

- **Lançamentos** de receita e despesa, com valor, vencimento, data de pagamento, cliente e observações
- **Status:** pago, a pagar, recebido, a receber e **atrasado**
- **Categorias nativas da advocacia:** honorários, custas judiciais, aluguel, salários, impostos, fornecedores, software, marketing e outros
- **Dashboard com KPIs**, gráfico de evolução, lista de **próximos vencimentos** e de **contas em atraso**
- **Cartão do escritório** (dados de cobrança e identidade financeira)
- Busca e filtros por tipo, status e período

## Para que serve

Saber, sem abrir planilha, **quanto entrou, quanto vai entrar, quanto vai sair e o que está atrasado**.

## Benefícios

- Previsibilidade de caixa
- Recebíveis atrasados viram lista de cobrança, não esquecimento
- Separação clara entre honorários e custas
- Base para decidir contratar, investir ou segurar

## Dores que resolve

| Dor | Como resolve |
|---|---|
| "Não sei quanto o escritório realmente lucra" | KPIs e gráfico |
| "Esqueci de cobrar o cliente" | Lista de atrasados |
| "Misturo o dinheiro do escritório com o meu" | Lançamentos categorizados |
| "Minha planilha quebrou ou ficou desatualizada" | Sistema, não planilha |

---

# 14. Cursos e Trilhas

## O que é

Área de **educação continuada** dentro da plataforma: cursos organizados em trilhas, com progresso por aula, marcação de assistido e concluído, e a possibilidade de reiniciar a trilha.

## Para que serve

Capacitar o advogado e a equipe no uso da IA aplicada ao Direito e em conteúdo técnico, sem sair da ferramenta que ele já usa todo dia.

## Benefícios

- Reduz a curva de adoção da própria plataforma
- Aumenta retenção: o cliente volta pelo conteúdo, não só pela ferramenta
- Time do escritório treinado no mesmo padrão

## Dores que resolve

"Comprei a ferramenta e não sei usar 80% dela" · "Meu estagiário usa a IA de qualquer jeito" · "Quero me atualizar mas não tenho tempo de fazer pós".

---

# 15. Geração de Documentos (Docgen)

## O que é

Motor de geração de arquivos **DOCX, XLSX e PDF** — acionado principalmente **pelo próprio chat**.

## Como é útil

Você conversa, chega no texto certo e diz: *"gera isso em Word"*. Sai o arquivo formatado, pronto para protocolar ou enviar. O mesmo vale para planilha (memória de cálculo, controle) e PDF.

## Benefícios

- Fim do copiar-colar da IA para o Word e reformatar tudo
- Documento sai com estrutura, não como bloco de texto
- Planilha de cálculo sai pronta para anexar

## Dores que resolve

"Perco 15 minutos formatando o que a IA me deu" · "Preciso mandar em Word e só tenho texto na tela" · "Quero anexar a memória de cálculo em planilha".

---

# 16. Portal de Notícias Jurídicas

## O que é

Um **portal público de conteúdo jurídico** com curadoria e ingestão automática de fontes, moderação, categorias, patrocinadores e uma camada de **comunidade**.

## O que tem

- Artigos ingeridos automaticamente de fontes cadastradas, com aprovação e moderação
- Categorias e busca
- **Comunidade:** cadastro próprio, comentários, curtidas em artigo e comentário, favoritos, posts do próprio usuário e denúncia de comentário
- Espaço de **patrocinadores e anúncios**
- Métricas de acesso

## Para que serve (na estratégia)

É o topo de funil e a prova de autoridade da marca: tráfego orgânico, audiência jurídica qualificada e um ativo de mídia próprio — que alimenta a plataforma paga.

## Benefícios

- Aquisição de leads a custo marginal
- Autoridade de marca no nicho jurídico
- Receita adicional via patrocínio
- Comunidade = retenção e conteúdo gerado por usuário

---

# 17. Créditos e Planos

## O que é

A economia interna da plataforma, desenhada para **não punir o uso diário**.

## Como funciona

- **O chat no modelo padrão é ilimitado e gratuito dentro do plano.** É o hábito.
- Consomem crédito apenas as ações de custo real:
  - Mensagem com modelo premium — **1 crédito**
  - Regenerar resposta — **1 crédito**
  - Resposta aprimorada (reanálise de contexto + validação de dados) — **2 créditos**
  - **Jurid PRO** — **10 créditos**, cobrados uma única vez na abertura da conversa
  - **Consultas** — de 0 a 3 créditos, conforme a fonte
- Todo custo tem **nome estável e extrato**: o advogado vê exatamente onde gastou
- O admin pode sobrescrever qualquer preço pela aba de Precificação, sem deploy
- Pacotes de crédito avulsos, além dos planos por assinatura

## Planos (estrutura comercial)

| Plano | Para quem | Destaques |
|---|---|---|
| **Advogado Solo** | Quem está começando | IA ilimitada, atualizações gratuitas, suporte com fila |
| **Escritório** (mais popular) | Escritório em crescimento | IA ilimitada, acesso a múltiplas IAs, suporte prioritário, mais usuários simultâneos |
| **Enterprise** | Grandes demandas | Sob medida, consultoria dedicada, integrações, suporte humanizado |

## O benefício do desenho

O advogado **nunca tem medo de conversar com a IA** — e isso gera hábito diário. O crédito aparece só onde há valor extraordinário (consulta oficial, análise profunda, caso grande). É monetização por valor, não por fricção.

---

# 18. Jurid.IA Voice

> Produto irmão, com app próprio (iOS/Android) e versão web.

## O que é

A Jurid.IA Voice **grava, transcreve e transforma em inteligência** toda conversa profissional do advogado — reunião com cliente, audiência, alinhamento de equipe, call online, consulta presencial.

O advogado passa o dia falando. **Tudo o que ele fala hoje evapora.** A Voice existe para que não evapore.

## 18.1 Como se grava

### A) Presencial — pelo App (iOS/Android)

O advogado abre o app, aperta gravar e coloca o celular na mesa.

- Gravação de **áudio** pelo microfone do aparelho
- Grava **em segundo plano** (o celular pode ficar bloqueado, dá para usar outro app)
- Vincula a gravação a **um ou mais clientes** já no momento de gravar
- Título da reunião definido antes ou depois
- Tipos de gravação: **Cliente**, **Lembrete**, **Estudo**, **Outros** e **Chat**

**Exemplos reais de uso presencial:**

| Situação | O que a Voice entrega |
|---|---|
| Primeira consulta com cliente novo, na sala do escritório | Transcrição completa + resumo do caso + próximos passos, sem ninguém anotar nada |
| Audiência de conciliação | Registro literal do que foi proposto e por quem |
| Reunião de sócios | Ata automática, com decisões e responsáveis |
| Visita técnica a um imóvel ou obra | Relato falado vira relatório escrito |
| Você dirigindo, gravando um lembrete | Vira anotação estruturada |
| Aula, palestra, congresso | Resumo de estudo com os pontos-chave |

### B) Online — pelo navegador (web)

No modo **online**, a Voice captura a **aba do navegador com o áudio** (e o vídeo) — ou seja, grava a reunião que está acontecendo no Google Meet, Zoom, Teams ou qualquer plataforma que rode no navegador, junto com o seu microfone. O sistema detecta o navegador e orienta o usuário (Chrome e Edge capturam áudio de aba; Firefox e Safari têm limitação e o fluxo avisa antes).

**Exemplos reais de uso online:**

| Situação | O que a Voice entrega |
|---|---|
| Reunião no Meet com cliente corporativo | Vídeo + transcrição + resumo executivo para os sócios |
| Audiência virtual | Registro em vídeo e transcrição do que foi dito |
| Call de negociação de contrato | Lista de pontos acordados e pendências |
| Reunião de equipe semanal | Ata com decisões, sem ninguém fazendo de secretário |
| Mentoria ou consultoria prestada online | Entregável escrito para o cliente no fim da call |

## 18.2 O que é gerado a partir da gravação

**1. Transcrição completa**
Texto integral do que foi dito, com **identificação e nomeação dos participantes (speakers)** — você renomeia "Participante 1" para "Dra. Marina" e a transcrição inteira se ajusta.

**2. Resumos guiados por IA configurável — o grande diferencial**
A Voice não tem "um resumo". Ela tem **prompts**: modelos de análise que o escritório configura, com hierarquia (prompt global da plataforma → da empresa → do usuário → do contato). Exemplos em uso:

- **Resumo Executivo para Sócios**
- **Preparação de Reunião com Cliente**
- **Análise Contratual**
- **Estratégia Processual**
- **Risco Trabalhista**
- **Operações Societárias**

A mesma reunião gera saídas diferentes conforme quem vai ler. E há **reprocessamento**: mudou o prompt, reanalise a gravação sem regravar nada.

**3. Chat sobre a gravação**
Depois de gravada, você **conversa com a reunião**: "o que ele disse sobre o prazo de entrega?", "ele concordou com a multa?", "monta um e-mail de follow-up com o que foi combinado".

**4. Áudio e vídeo originais, guardados e baixáveis**
O arquivo fica disponível para download — e isso tem usos que a transcrição sozinha não cobre:

- **Prova do que foi acordado** em negociação
- **Defesa do advogado** em discussão sobre a orientação prestada
- **Treinamento interno:** o júnior ouve como o sócio conduz uma reunião
- **Revisão de tom e postura** (no vídeo, também expressão e apresentação)
- **Compliance:** registro de que a orientação foi dada e recebida

**5. PDF exportável** do resumo ou da análise, pronto para enviar ao cliente.

**6. Briefing pré-reunião (Pre-Meeting)**
Integrado ao **Google Calendar**: antes da reunião, a Voice gera um **briefing** do cliente daquele evento — histórico, pontos abertos, o que foi tratado da última vez. Você entra na reunião sabendo exatamente onde parou.

**7. Lembretes e agenda**
Gravações do tipo lembrete e integração de agenda para que nenhum follow-up caia.

**8. Base de clientes e contatos**
Cada gravação vinculada a um cliente constrói, sozinha, o **prontuário jurídico** daquele cliente: todo o histórico falado, pesquisável.

**9. Notificações e estatísticas**
Notificação quando a transcrição fica pronta; estatísticas de gravações por período; controle de limite por plano.

## 18.3 Benefícios da Voice

- **Ninguém mais anota em reunião.** O advogado olha no olho do cliente em vez de olhar para o caderno.
- **A memória do escritório deixa de ser humana.** Se o advogado sai, o conhecimento fica.
- **Prova.** O que foi combinado está gravado.
- **Entregável imediato.** O cliente recebe o resumo da reunião no mesmo dia — percepção de valor altíssima, esforço zero.
- **Escala do sócio.** O sênior grava uma vez; a equipe inteira aprende com aquilo.
- **Cada reunião vira ativo**, não vapor.

## 18.4 Dores que a Voice resolve

| Dor | Como resolve |
|---|---|
| "Saio da reunião sem lembrar metade" | Transcrição + resumo |
| "Anoto e perco o olho no cliente" | Grava, não anota |
| "O cliente diz que combinou outra coisa" | Áudio e vídeo originais |
| "Prometi mandar um resumo e nunca mandei" | PDF pronto na hora |
| "O caso está na cabeça de um advogado só" | Prontuário por cliente |
| "Entro na reunião sem lembrar o que ficou pendente" | Briefing pré-reunião |
| "Cada sócio quer o resumo de um jeito" | Prompts configuráveis por empresa, usuário e contato |
| "Reunião online não deixa registro nenhum" | Captura da aba com áudio e vídeo |

---

# 19. Como tudo se conecta (o argumento que vende)

Nenhuma funcionalidade da Jurid.IA existe isolada. **O valor está na costura:**

```
Portal de notícias  →  atrai o advogado
        ↓
     CRM            →  o lead entra no funil, com origem registrada
        ↓
     Voice          →  a reunião com esse lead é gravada e resumida
        ↓
   Propostas        →  o áudio da reunião vira proposta em PDF no mesmo dia
        ↓
Consultas + Chat    →  o cliente é qualificado (protesto, dívida, processos)
        ↓
 Calculadoras       →  o valor da causa sai auditável
        ↓
  Meu Juiz IA       →  a peça é testada antes de protocolar
        ↓
 Monitoramento      →  nenhuma publicação daquele processo escapa
        ↓
     Cofre          →  todo documento fica no lugar certo
        ↓
   Financeiro       →  o honorário entra no caixa e é cobrado se atrasar
        ↓
    Cursos          →  o escritório aprende a usar tudo isso melhor
```

**Um ciclo fechado.** É por isso que a Jurid.IA não compete com "um ChatGPT jurídico": ela compete com a **soma** de um chat de IA + um bureau de consultas + um sistema de monitoramento + um CRM + um financeiro + um Drive + um gravador de reuniões — e custa menos que a maioria deles isoladamente.

---

# 20. Frases-âncora (para copy, VSL e vendas)

- **Geral:** "Seu escritório inteiro numa tela só — e uma IA que sabe Direito operando ele com você."
- **Chat:** "Não é uma IA que responde. É uma IA que faz."
- **Chat Pro:** "Para o caso que não cabe numa conversa comum."
- **Meu Juiz IA:** "Descubra o furo da sua peça antes que o juiz descubra."
- **Consultas:** "Noventa e cinco portais oficiais. Uma tela. Um clique."
- **Monitoramento:** "O diário oficial lê você todo dia. Agora é recíproco."
- **Calculadoras:** "Pare de confiar numa planilha que você não sabe quem fez."
- **Prazos:** "Intimado hoje. Vence quando? Em dois segundos."
- **Cofre:** "Vinte gigas do seu escritório, longe do WhatsApp."
- **Propostas:** "Da conversa com o cliente à proposta em PDF, no mesmo dia."
- **CRM:** "Seu funil deixa de ser o WhatsApp não lido."
- **Financeiro:** "Quanto o seu escritório realmente lucra? Agora você sabe."
- **Voice:** "Você passa o dia falando. Tudo isso está evaporando. Não deveria."

---

*Documento vivo. Ao lançar, alterar ou descontinuar funcionalidade, atualize aqui primeiro — este arquivo é a fonte de verdade de produto para marketing, vendas e suporte.*
