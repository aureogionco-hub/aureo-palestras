# Estrutura padrão de pastas de uma palestra

Criada automaticamente por `ferramentas/nova-palestra.sh`. Este documento existe
para quem precisar montar à mão ou entender por que as coisas estão onde estão.

```
palestras/<nome-da-palestra>/
├── PALESTRA-base.md         ← a fonte de verdade. Atualizar a cada decisão aprovada
├── 00-pre-producao/
│   ├── briefing.md          ← Fase 0
│   ├── case-e-ancoras.md    ← Fases 2 e 3
│   └── arco.md              ← Fase 4
├── roteiro.md               ← Fase 5 — o que é dito, em linguagem falada
├── slides.html              ← Fase 6 — um arquivo, dois modos
├── assets/                  ← imagens da palestra (ilustrações, fotos, gráficos)
└── .render/                 ← PNGs gerados no export do .pptx (não versionado)
```

## Regras

- **A palestra é autocontida.** Roteiro, slides, pré-produção e imagens vivem
  juntos. Não existe pasta paralela de "roteiros" ou "slides" na raiz.
- **`slides.html` é um arquivo só.** O modo formador e o modo limpo são a mesma
  fonte. Nunca crie um segundo arquivo "sem notas".
- **`PALESTRA-base.md` é a fonte de verdade**, não o histórico de conversa.
- **O CSS não mora aqui.** Todo slide aponta para `../../_design-slides/`. Um
  ajuste de layout vale para todas as palestras — que é o ponto.
- Se uma palestra precisar de um bloco visual que não existe, ele entra em
  `_design-slides/` e no catálogo. Bloco que só existe dentro de uma palestra
  vira dívida.
