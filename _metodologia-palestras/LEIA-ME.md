# Metodologia de produção de palestras — Aureo Gionco

Esta pasta **não pertence a nenhuma palestra específica**. É o ponto de partida
compartilhado por todas: os templates aqui dentro são copiados para a pasta de
uma palestra nova, preenchidos, e aquela palestra segue caminho próprio a partir
dali.

Ajustes de metodologia — o que aprendemos, o que muda — são feitos **aqui, uma
vez**, e valem para a próxima palestra. Não ficam presos ao histórico de conversa
de uma palestra específica.

A lógica completa do processo (ordem das fases, checagens, regras) está na skill
**palestra** (`.claude/skills/palestra/`). A skill é o "como fazer"; esta pasta é
o "com o que preencher".

## De onde isto vem

Este método é a adaptação, para palco, do método de cursos da Pratika Social
(repositório `aureogionco-hub/pratika`, pasta `_metodologia-cursos/`, conduzido
pela skill Paulo). A disciplina é a mesma; o que muda é o tempo e o fato de a
plateia não poder rebobinar.

| Curso | Palestra |
|---|---|
| Instrumento construído ao longo de 14 aulas | Uma ideia-instrumento só |
| Módulo introdutório de 3 aulas | Abertura de 3-5 minutos |
| Uma âncora por aula | Uma âncora por parte do arco |
| `CURSO-base.md` | `PALESTRA-base.md` |

## Como começar uma palestra nova

```bash
bash ferramentas/nova-palestra.sh <nome-curto-sem-espaco>
```

Isso cria `palestras/<nome>/` com o esqueleto completo. Depois, chame a skill
("vamos montar uma palestra") e comece pela Fase 0 — sempre pela Fase 0, mesmo
quando o tema parece óbvio.

## O que fica aqui

- `templates/briefing.md` — a anamnese da palestra: objetivo, corte, plateia, contexto do convite
- `templates/case-e-ancoras.md` — instituição de referência, cases secundários e banco de âncoras
- `templates/arco.md` — o esqueleto: abertura, desenvolvimento, prática, encerramento, com tempos
- `templates/PALESTRA-base.md` — a fonte de verdade de cada palestra
- `estrutura-padrao-pastas/` — o esqueleto de pastas que cada palestra replica
