---
name: slides-aureo
description: Como montar slides no sistema visual próprio de Aureo Gionco — os 13 blocos, quando usar cada um, as regras de cor e contraste, e a estrutura do arquivo slides.html com modo formador e modo limpo. Use ao criar ou revisar qualquer slide deste repositório.
---

# Slides Aureo — como montar

O sistema vive em `_design-slides/`. Antes de escrever slide, abra
`biblioteca-de-blocos.html` no navegador: ele é o catálogo **e** o teste vivo do
layout.

## Estrutura de um arquivo de slides

Um arquivo por palestra: `palestras/<nome>/slides.html`. Um slide é:

```html
<section class="slide">
  <div class="tela">
    <span class="assinatura">Aureo Gionco</span>
    <span class="paginacao"></span>       <!-- vazio: o JS numera -->
    <div class="cabecalho"><div class="titulo">Título com <em>realce</em></div></div>
    <!-- UM bloco de conteúdo aqui -->
    <div class="fecho">
      <span>Primeira linha do remate.</span>
      <span>Segunda, mais curta, com <b>a palavra que fica</b>.</span>
    </div>
  </div>
  <aside class="notas">
    <div class="notas-topo"><span>O que falar</span></div>
    <span class="notas-tempo">04:30</span>
    <div class="notas-corpo">
      <p>A fala. <strong>Destaque o que não pode ser esquecido.</strong></p>
    </div>
    <div class="notas-ref"></div>          <!-- vazio: o JS numera -->
  </aside>
</section>
```

Nunca escreva número de slide à mão. `slides.js` numera a paginação e a
referência das notas — inserir um slide no meio não obriga a renumerar nada.

## Os 16 blocos

Os três primeiros são os movimentos da metodologia — abertura, promessa e o
instrumento que atravessa a palestra. Os outros treze são blocos de conteúdo.

| # | Bloco | Âncora | Use quando |
|---|---|---|---|
| 14 | `gancho` | mínima | **A tensão.** Primeiro slide depois da capa. Sem cabeçalho, sem fecho |
| 15 | `promessa` | — | **O que a plateia ganha**, com o instrumento nomeado. Logo após o gancho |
| 16 | `instrumento` | literal | **A assinatura da metodologia.** Reaparece ao fim de cada volta da trança |
| 1 | `frase-impacto` | mínima | A frase é a ideia. Virada, encerramento |
| 2 | `contraste` | estrutural | A plateia confunde duas coisas que precisam ser separadas |
| 3 | `declaracao` | literal | O texto vale pela redação exata; a plateia vai querer copiar |
| 4 | `passos` | literal | O método reutilizável — o coração da ideia-instrumento |
| 5 | `teste` | literal | A plateia avalia o próprio material ali na cadeira |
| 6 | `fluxo` | estrutural | Um lado *vira* o outro: geral → específico, antes → depois |
| 7 | `lista` | — | O tamanho da lista **é** o argumento |
| 8 | `numeros` | — | Credencial, dimensão de um problema, resultado |
| 9 | `citacao` | metafórica | A fala de alguém diz melhor que a sua explicação |
| 10 | `chamada` | — | O momento do exercício, com a restrição explícita |
| 11 | `fecho` | apoio | O remate no pé. Nunca sozinho |
| 12 | `capa` | — | Abertura da palestra |
| 13 | `seccao` | — | Vira a página do arco. No máximo 3 por palestra |

Escolher o bloco **não é escolher um estilo — é escolher como a plateia vai
lembrar daquilo.** Se um slide não cabe em nenhum bloco, o problema quase nunca
é a biblioteca: é que o slide está tentando dizer duas coisas.

## Limites por bloco

- `passos` e `teste`: **3 linhas.** 4 só se a quarta for realmente indispensável.
- `lista`: até 7 — e só porque a quantidade é o argumento. Se a plateia precisa
  reter cada item, vire `passos` e corte para três.
- `numeros`: **3.** O quarto número apaga os três primeiros.
- `citacao`: 1 por palestra, 2 no limite.
- `seccao`: 3 por palestra. Mais que isso vira sumário, e sumário mata ritmo.
- `frase-impacto`: sem parágrafo embaixo. Se precisa explicar, não é este bloco.
- `gancho`: **1 por palestra.** Se aparece um segundo, ele não era o gancho.
- `promessa`: **1 por palestra**, sempre logo depois do gancho.
- `instrumento`: **no máximo 4 partes**, e o número vem do tempo de palco, não do
  gosto — 20 min = 2 · 45 min = 3 · 90 min = 4.

## O bloco `instrumento`

É o que separa esta metodologia de qualquer outra palestra: a plateia não ouve
falar de um instrumento, ela **vê o objeto sendo construído**.

Três estados por parte:

```html
<div class="instrumento">
  <div class="parte preenchida"><span class="n">1</span>
    <div class="rotulo">A mudança</div><div class="conteudo">…</div></div>
  <div class="parte ativa"><span class="agora">agora</span><span class="n">2</span>
    <div class="rotulo">O indicador</div><div class="conteudo">…</div></div>
  <div class="parte vazia"><span class="n">3</span>
    <div class="rotulo">A meta</div></div>
</div>
<div class="instrumento-legenda">Nome do instrumento · 2 de 3</div>
```

- `vazia` — tracejada, sem conteúdo. Ainda não foi conquistada.
- `ativa` — verde, com o selo "agora". **Uma por slide**, nunca duas.
- `preenchida` — já conquistada em uma volta anterior.

Repita este slide ao fim de cada volta da trança, avançando um estado. No
finale, todas preenchidas. É a série progressiva do curso da Pratika virada
dispositivo de palco.

## Cor — a parte que não é gosto

A paleta vem de `_identidade` e está traduzida em `_design-slides/tokens.css`.
**Nunca escreva hex dentro de um slide.** Use as variáveis.

O contraste sobre o fundo `--papel` foi medido (a tabela completa está no fim do
`tokens.css`). O resumo operacional:

- **Texto em qualquer tamanho:** azul-profundo, azul-assinatura, verde-petroleo,
  vermelho-profundo, tinta.
- **Só texto grande (28px+):** azul-aberto, vermelho-assinatura, coral.
- **Nunca como texto — só forma, barra, ícone, preenchimento:** turquesa,
  verde-alegre, verde-vivo, açafrão, areia, rosa.

Por isso o `<em>` de realce dentro de um título usa vermelho-**profundo** e não
o vermelho-assinatura: o realce precisa funcionar também em texto pequeno.

A identidade pede azul, verde e vermelho no núcleo, com terracota e bege apenas
para descanso visual. Um slide que virou bege com um detalhe azul inverteu o
sistema.

## Escala

Tudo dentro de `.tela` dimensiona em `cqw` (percentual da largura do slide). O
mesmo HTML serve a um notebook e a um telão de evento sem uma linha reescrita.
**Não use `px` dentro da `.tela`** — quebra exatamente no telão, que é onde não
dá para consertar.

## Modo formador e modo limpo

Um arquivo, duas saídas:

- `data-modo="formador"` — slide + coluna de notas. É como você ensaia e apresenta.
- `?modo=limpo` ou tecla **P** — só o slide, 16:9, tela cheia. É a apresentação final.

Teclas: `← →` navega · `P` alterna modo · `F` tela cheia · `Home`/`End` extremos.

**Nunca crie um segundo arquivo "sem notas".** Duas fontes desencontram na
primeira correção de última hora, que é sempre a mais importante.

## A nota do formador

A nota **não repete o slide**. O slide ancora, a nota conduz. Se a nota é a
leitura do slide, um dos dois está sobrando — e é o slide.

Use `<strong>` no que não pode ser esquecido se você travar. Use
`.notas-tempo` com o tempo acumulado, para saber, olhando de relance, se está
atrasado. Use `.notas-aviso` só para o que muda a próxima ação: uma transição
difícil, um material a distribuir, o gancho para a próxima parte.

## Exportar

```bash
python3 ferramentas/gerar-pptx.py palestras/<nome>/slides.html
```

Renderiza cada slide no modo limpo e monta um `.pptx` 16:9 com as notas do
formador no campo de anotações do PowerPoint. Para o evento que só aceita
pendrive.
