---
name: slides-aureo
description: Como montar slides no sistema visual próprio de Aureo Gionco, os 17 blocos, quando usar cada um, as regras de cor e contraste, e a estrutura do arquivo slides.html com modo formador e modo limpo. Use ao criar ou revisar qualquer slide deste repositório.
---

# Slides Aureo · como montar

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
referência das notas, inserir um slide no meio não obriga a renumerar nada.

## Os 17 blocos

Os quatro primeiros são os movimentos da metodologia, abertura, promessa, o
instrumento que atravessa a palestra e a pausa de trabalho. Os outros treze são
blocos de conteúdo.

| # | Bloco | Âncora | Use quando |
|---|---|---|---|
| 14 | `gancho` | mínima | **A tensão.** Primeiro slide depois da capa. Sem cabeçalho, sem fecho |
| 15 | `promessa` |, | **O que a plateia ganha**, com o instrumento nomeado. Logo após o gancho |
| 16 | `instrumento` | literal | **A assinatura da metodologia.** Reaparece ao fim de cada volta da trança |
| 17 | `pausa` (`.tela.trabalho`) |, | **Aula online.** Fica sozinho na tela enquanto a plateia preenche |
| 1 | `frase-impacto` | mínima | A frase é a ideia. Virada, encerramento |
| 2 | `contraste` | estrutural | A plateia confunde duas coisas que precisam ser separadas |
| 3 | `declaracao` | literal | O texto vale pela redação exata; a plateia vai querer copiar |
| 4 | `passos` | literal | O método reutilizável, o coração da ideia-instrumento |
| 5 | `teste` | literal | A plateia avalia o próprio material ali na cadeira |
| 6 | `fluxo` | estrutural | Um lado *vira* o outro: geral → específico, antes → depois |
| 7 | `lista` |, | O tamanho da lista **é** o argumento |
| 8 | `numeros` |, | Credencial, dimensão de um problema, resultado |
| 9 | `citacao` | metafórica | A fala de alguém diz melhor que a sua explicação |
| 10 | `chamada` |, | O momento do exercício, com a restrição explícita |
| 11 | `fecho` | apoio | O remate no pé. Nunca sozinho |
| 12 | `capa` |, | Abertura da palestra |
| 13 | `seccao` |, | Vira a página do arco. No máximo 3 por palestra |

Escolher o bloco **não é escolher um estilo. É escolher como a plateia vai
lembrar daquilo.** Se um slide não cabe em nenhum bloco, o problema quase nunca
é a biblioteca: é que o slide está tentando dizer duas coisas.

## Limites por bloco

- `passos` e `teste`: **3 linhas.** 4 só se a quarta for realmente indispensável.
- `lista`: até 7, e só porque a quantidade é o argumento. Se a plateia precisa
  reter cada item, vire `passos` e corte para três.
- `numeros`: **3.** O quarto número apaga os três primeiros.
- `citacao`: 1 por palestra, 2 no limite.
- `seccao`: **uma por parte do arco**, uma por volta da trança, ou uma por
  dimensão em aula de diagnóstico. O que a regra proíbe é `seccao` usada como
  sumário ou como respiro decorativo; usada para virar a página do arco, quatro
  são legítimas em palestra de quatro partes.
- `frase-impacto`: sem parágrafo embaixo. Se precisa explicar, não é este bloco.
- `gancho`: **1 por palestra.** Se aparece um segundo, ele não era o gancho.
- `promessa`: **1 por palestra**, sempre logo depois do gancho.
- `instrumento`: **no máximo 4 partes**, e o número vem do tempo de palco, não do
  gosto, 20 min = 2 · 45 min = 3 · 90 min = 4.
- `pausa`: só em formato ao vivo com tempo de trabalho. Um por volta da trança.

## O bloco `pausa`, o único que fica sozinho na tela

Para aula online ao vivo, onde a plateia **preenche o instrumento junto com
você**. Este slide fica na tela 5 minutos, sem ninguém falando, então ele
carrega tudo: consigna, restrição, tempo e o instrumento com a parte ativa.

**O teste:** se alguém chegar atrasado no meio da pausa, este slide sozinho tem
que bastar. Se não bastar, falta informação nele.

```html
<div class="tela trabalho">
  <div class="pausa-topo">
    <span class="pausa-selo">● Pausa de trabalho</span>
    <span class="pausa-tempo">5 min</span>
  </div>
  <div class="pausa-consigna">A consigna, com <em>realce</em> no verbo.</div>
  <div class="pausa-restricoes"><span>3 a 6 itens</span><span>um por linha</span></div>
  <div class="instrumento compacto">…</div>
</div>
```

O relógio é grande de propósito: é a informação mais consultada durante a pausa.
E a orientação de fala mais importante deste bloco é **ficar quieto**, a vontade
de preencher o silêncio explicando de novo rouba o tempo de quem está escrevendo.

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

- `vazia`, tracejada, sem conteúdo. Ainda não foi conquistada.
- `ativa`, verde, com o selo "agora". **Uma por slide**, nunca duas.
- `preenchida`, já conquistada em uma volta anterior.
- `alerta`, vermelho. A resposta que **é o problema** ("não sei", "ninguém",
  "quando dá problema"). Não use `ativa` para marcar falha: verde diz "ok" e
  briga com o que o texto está dizendo.

Repita este slide ao fim de cada volta da trança, avançando um estado. No
finale, todas preenchidas. É a série progressiva do curso da Pratika virada
dispositivo de palco.

## As oito regras de composição

Estão implementadas no `slides.css`, usando os blocos, vêm de graça. Mas você
precisa saber que existem, porque três delas dependem do que você escreve.

| # | Regra | Depende de você? |
|---|---|---|
| 1 | **Assinatura sempre no canto inferior direito**, nunca à esquerda. Paginação no canto oposto | não |
| 2 | **Na capa a assinatura é pequena e de canto** (alto à direita). Nunca grande no centro. Não use `.marca-completa` | **sim** |
| 3 | **Nunca uma palavra sozinha na linha.** `text-wrap: balance` cuida do fluxo automático, **mas não do seu `<br>`** | **sim** |
| 4 | **Tela de pilar: o nome é o slide** (7,8cqw). Use `seccao` com `h2` + `.numero-parte` + `.seccao-apoio` | **sim** |
| 5 | **Respiro de fora para dentro:** borda enxuta, ar no miolo entre cabeçalho, bloco e fecho | não |
| 6 | **✕ e ✓ não são elemento gráfico**, leem como correção de prova. No `contraste`, use `.rotulo` em caixa alta; a barra de cor no topo faz o trabalho | **sim** |
| 7 | **Frase única e citação centralizadas**, com medida curta | não |
| 8 | **Fundo azul claríssimo, nunca bege** (`--canvas-slide`) | não |

O bloco `contraste` agora é assim, **sem glifo**:

```html
<div class="contraste">
  <div class="nao"><span class="rotulo">Meta de atividade</span>
    <span class="texto">"Atender 120 jovens este ano"</span></div>
  <div class="sim"><span class="rotulo">Meta de resultado</span>
    <span class="texto">"80 dos 120 concluindo até dezembro"</span></div>
</div>
```

O rótulo **nomeia a categoria**, não julga. E se ele repetir o que o texto já diz,
corte um dos dois.

## Regras aprendidas na revisão de Aureo

Oito decisões que valem para toda palestra, não só para a que as gerou.

**1 · Elementos maiores: a altura vem de encolher a mobília, não o conteúdo.**
Quando a moldura do evento aparece, a tentação é reduzir a tipografia para caber.
Errado. O conteúdo é o que se lê a 15 metros; a mobília é o que identifica o
evento. Encolha logos, ornamentos e recuos, e **suba** a escala do texto.

**2 · O termo que abre um item de lista vem em `<b>`.** É por ele que a plateia
varre o olho. Item de lista sem hierarquia interna é parágrafo picado.

**3 · "Vazia" quer dizer não conquistada, não ilegível.** No bloco `instrumento`,
a etapa que ainda não chegou precisa de fundo, borda cheia e texto em cor de
leitura. O que a distingue da preenchida é a **ausência de cor forte**, nunca a
falta de contraste. Se a plateia não consegue ler o nome da etapa que vem, o
bloco perdeu a função.

**4 · Número precisa de cartão, não de espaço vazio.** O bloco `numeros` ganha
fundo, slot de ícone opcional e rótulo em corpo de leitura. E os cartões
**crescem** para ocupar a largura: coluna estreita faz o rótulo quebrar em três
linhas e o bloco cresce em altura sem precisar.

**5 · A promessa é a maior entrega da aula, e o slide tem que dizer isso.**
Centralizada, com peso de display. Promessa discreta faz a plateia não entender
que vai levar um objeto embora.

**6 · Comparação vai lado a lado.** O bloco `fluxo` é horizontal: dois estados
que se comparam pedem o olho varrendo na horizontal. Empilhado, sobra altura e
some a comparação.

**7 · Diálogo identifica quem fala.** Sem atribuição, a plateia não sabe o que é
pergunta e o que é resposta. Por função, sempre: a coordenadora, a educadora da
manhã, a educadora da tarde.

**8 · Não cite outros palestrantes da mesma formação.** A ponte parece elegante e
não é: ela obriga a plateia a lembrar de uma aula que talvez não tenha assistido,
e transfere autoridade para quem não está na sala. O recorte se faz pelo próprio
tema: "aqui não se fala de onde o dinheiro vem, se fala do dinheiro que já
entrou" diz a mesma coisa sem nome nenhum.

## Apresentar e voltar

Dois botões, porque depender de tecla é depender de memória:

- **⛶ Apresentar em tela inteira**, na barra: entra em tela cheia **e** em modo
  limpo de uma vez. São a mesma intenção.
- **⤺ Voltar ao modo edição**, flutuante, só existe no modo limpo. Discreto até o
  mouse chegar perto. `Esc` e `F` fazem o mesmo, e sair da tela cheia devolve ao
  modo edição junto.

## Estouro da `.tela`, meça, não confie no olho

Slide mais alto que a `.tela` fica **cortado no telão e você não vê no navegador**,
porque o overflow é escondido. `cabecalho` + bloco + `fecho` empilhados é a
combinação que estoura com mais frequência.

```js
const t = document.querySelector('.slide.ativo .tela');
t.scrollHeight > t.clientHeight   // true = cortado
```

Quando estourar, **corte texto.** Não reduza corpo de fonte: a escala foi medida
para leitura a 15 metros.

## Escrita: sem travessão

**Não use travessão (—) em texto de slide, nota, roteiro ou material do
participante.** É decisão de Aureo sobre a voz da casa, não preferência
tipográfica. No lugar dele:

| Em vez de | Use |
|---|---|
| `X — e Y` | `X, e Y` |
| `X — é Y` | `X. É Y` |
| `Rótulo — a explicação` | `Rótulo: a explicação` |
| `— fala de alguém` | `"fala de alguém"` entre aspas |
| `—` em célula vazia | a palavra que falta (`sem lugar`, `nenhum`, `nunca`) |

Trocar travessão por vírgula às cegas produz frase torta e emenda de
vírgula. Cada caso pede uma pontuação diferente: leia a frase em voz alta
antes de escolher.

## Cor, a parte que não é gosto

A paleta vem de `_identidade` e está traduzida em `_design-slides/tokens.css`.
**Nunca escreva hex dentro de um slide.** Use as variáveis.

O fundo do slide é `--canvas-slide`, azul quase branco. **`--papel` (bege) é o
papel impresso**, do material do participante, não o fundo do slide: no projetor a
granulação que dá calor no impresso desaparece e sobra o amarelado.

O contraste sobre o fundo do slide foi medido (a tabela completa está no fim do
`tokens.css`). O resumo operacional:

- **Texto em qualquer tamanho:** azul-profundo, azul-assinatura, verde-petroleo,
  vermelho-profundo, tinta.
- **Só texto grande (28px+):** azul-aberto, vermelho-assinatura, coral.
- **Nunca como texto, só forma, barra, ícone, preenchimento:** turquesa,
  verde-alegre, verde-vivo, açafrão, areia, rosa.

Por isso o `<em>` de realce dentro de um título usa vermelho-**profundo** e não
o vermelho-assinatura: o realce precisa funcionar também em texto pequeno.

A identidade pede azul, verde e vermelho no núcleo, com terracota e bege apenas
para descanso visual. Um slide que virou bege com um detalhe azul inverteu o
sistema.

## Escala

Tudo dentro de `.tela` dimensiona em `cqw` (percentual da largura do slide). O
mesmo HTML serve a um notebook e a um telão de evento sem uma linha reescrita.
**Não use `px` dentro da `.tela`**, quebra exatamente no telão, que é onde não
dá para consertar.

## Modo formador e modo limpo

Um arquivo, duas saídas:

- `data-modo="formador"`, slide + coluna de notas. É como você ensaia e apresenta.
- `?modo=limpo` ou tecla **P**, só o slide, 16:9, tela cheia. É a apresentação final.

Teclas: `← →` navega · `P` alterna modo · `F` tela cheia · `Home`/`End` extremos.

**Nunca crie um segundo arquivo "sem notas".** Duas fontes desencontram na
primeira correção de última hora, que é sempre a mais importante.

## A nota do formador

A nota **não repete o slide**. O slide ancora, a nota conduz. Se a nota é a
leitura do slide, um dos dois está sobrando, e é o slide.

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
