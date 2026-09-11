# Teste de sete dias — Institucional — 11/09/2026

Branch local `codex/trial-7-dias-comunicacao`, criada de `origin/main` em `781c74e`, sem upstream de produção. Nenhuma publicação.

O formulário confirma o cadastro e consulta a prontidão do Chat e do Voice antes de anunciar acesso pronto. Usa o token de status devolvido pelo Hub, somente no corpo de `POST /public/checkout/trial/status`. A consulta não autentica. Mostra o término real do teste em horário de Brasília; falha, espera longa ou Hub antigo sem token não são anunciados como acesso liberado. Após 12 consultas, permite verificar novamente sem cadastrar outra conta.

Validação local com Hub sintético: preenchimento, espera, confirmação e viewport de 390 × 844 sem overflow horizontal. Analytics externos bloqueados; nenhum e-mail enviado. TypeScript e build aprovados separadamente:

```sh
node node_modules/typescript/bin/tsc --noEmit --incremental false
npm run build
```

A configuração existente do Next pula validação de tipos e lint no build, por isso a verificação TypeScript separada. A simplificação para formulário em uma etapa, CPF, página de obrigado e WhatsApp da Maria continua na etapa posterior da ordem registrada.

Relatório completo e sequência: [continuidade no Hub](../jurid-hub-api/CONTINUIDADE-TRIAL-2026-09-11.md).
