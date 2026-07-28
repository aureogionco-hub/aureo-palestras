# Contexto para o Claude

Repositório de palestras e formações de **Aureo Gionco** (sem acento no nome —
"Aureo", nunca "Áureo").

## Antes de fazer qualquer coisa

1. Se o trabalho é montar, revisar ou fechar uma palestra → **use a skill
   `palestra`** (`.claude/skills/palestra/`). Ela conduz as 7 fases.
2. Se o trabalho toca em slide → **use também a skill `slides-aureo`**.
3. A fonte de verdade de cada palestra é o `PALESTRA-base.md` dela, **não o
   histórico de conversa**. Leia antes, atualize depois de cada decisão aprovada.

## As regras que valem em tudo

- **Uma fase por vez.** Proponha, não decida. Não avance sem aprovação explícita.
- **Personagens por função**, nunca por nome próprio: "a coordenadora", "o
  educador", "a jovem participante".
- **Máximo 3 tópicos** por parte, 3 linhas por bloco de slide.
- **Um slide, uma ideia.** Se precisa de um "e também", precisa de outro slide.
- **Nenhum hex escrito à mão** em slide. Só as variáveis de
  `_design-slides/tokens.css`.
- **Nenhum `px` dentro da `.tela`.** Tudo em `cqw` — o slide precisa funcionar
  no telão do evento, e é lá que não dá para consertar.
- **Nenhum número de slide escrito à mão.** `slides.js` numera sozinho.
- **Nunca crie um segundo arquivo "sem notas".** O modo limpo é o mesmo arquivo.

## Tom

Segue `_identidade/skills/skill-tom-voz/` e
`_identidade/skills/skill-adaptacao-canais/palestras.md`: narrativo, energético
mas controlado, pedagógico. Inspirador como consequência, nunca como objetivo.
Sem motivação vazia e sem venda direta.

## Quando aprender algo novo

Ajuste de processo entra em `_metodologia-palestras/` **e** na skill — nunca só
na pasta de uma palestra específica. É isso que faz a próxima palestra já nascer
com o aprendizado, sem reexplicar nada.

## Origens

- Método: `aureogionco-hub/pratika` (`_metodologia-cursos/` + skill Paulo), adaptado para palco
- Identidade: `aureogionco-hub/aureo-identidade`, conectado em `_identidade/` como submodule
- Layout: próprio, em `_design-slides/` — derivado dos slides do curso de Indicadores e Metas
