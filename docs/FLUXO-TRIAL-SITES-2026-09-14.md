# Jornada de teste pelos sites — 14/09/2026

Trabalho exclusivo na branch `codex/trial-7-dias-comunicacao`. Nenhuma publicação em produção.

## Entrada e confirmação

Os botões de teste do institucional, inclusive os cards do Voice e páginas de áreas, levam a `/#experimente`. O formulário tem uma única etapa: nome completo, e-mail, telefone e CPF. As máscaras são reutilizadas do checkout. CPF é validado com dígito verificador; o trial de aquisição não aceita CNPJ.

O cadastro usa `POST /public/checkout/trial` no Hub, plano `inst-trial` e origem `institucional-trial`. É a mesma jornada da VSL, com prazo de 168 horas e direitos de Chat + Voice definidos pelo Hub.

Após cadastro aceito, `/teste/obrigado` acompanha o provisionamento real e mostra o prazo do servidor. Há estados de preparação, acesso pronto, demora com nova consulta e expiração. Atualizar a página não reinicia o teste.

A confirmação fica na aba em sessionStorage: e-mail, prazo e token de consulta de status. CPF, telefone, senha e token de login não são armazenados ali. A visita direta sem confirmação orienta consultar o e-mail, sem afirmar que houve cadastro. Armazenamento bloqueado não transforma cadastro aceito em falha de negócio.

## Configuração

- `NEXT_PUBLIC_HUB_CHECKOUT_API`: origem do Hub.
- `NEXT_PUBLIC_JURIDIA_APP_URL`: plataforma para entrar.
- `NEXT_PUBLIC_VSL_CHECKOUT_URL`: checkout pago da VSL.
- `NEXT_PUBLIC_TRIAL_MARIA_WHATSAPP_URL`: WhatsApp pessoal da Maria, **pendente**. Vazio ou sem número válido omite o botão.
- O contato por IA do e-mail de 10 minutos é outra configuração, no Hub, e permanece placeholder `https://wa.me/`.
- Desenvolvimento desliga tracking externo. `NEXT_PUBLIC_ANALYTICS_ENABLED=false` também o desliga no build.

## Campanhas e operação local

Quatro criativos podem compartilhar a LP e o formulário, cada um com seu `utm_content`. Exemplo local:

`http://127.0.0.1:3442/?utm_source=meta&utm_medium=paid&utm_campaign=trial_setembro&utm_content=criativo_02#experimente`

A captura de primeiro contato conserva campanha/criativo mesmo sem scripts de publicidade. Uma visita posterior na mesma aba não sobrescreve a campanha inicial. Com armazenamento bloqueado, a preservação após recarga não é garantida.

O runner das aplicações completas fica em `jurid-hub-api/scripts/local-runtime`; as instruções pela tela estão em `GUIA-VALIDACAO-MANUAL-TRIAL-SITES.md` no Hub. Os bancos e a caixa postal são locais e duráveis; não há conta de cenário criada pelo bootstrap.

A unificação futura de **qualquer nova concessão com trial**, inclusive portas diretas dos produtos e administrativas, está inventariada no Hub e foi adiada pelo Victor. Reunir os botões dos sites não equivale a concluir essa unificação.

