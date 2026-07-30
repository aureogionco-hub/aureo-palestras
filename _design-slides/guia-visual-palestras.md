# Guia visual dos slides de palestra de Aureo Gionco

O sistema visual da marca vive no submodule `_identidade`. Este guia é a
**tradução dele para slide de palestra**, o que muda quando a peça vai para um
telão, é vista de longe e dura 40 segundos na tela.

Fonte da verdade da marca: `_identidade/skills/skill-identidade-visual/SKILL.md`
Tradução programável: `tokens.css`
Catálogo vivo: `biblioteca-de-blocos.html`

---

## 1. O que muda do material impresso para o palco

| Na identidade | No slide |
|---|---|
| Leitura próxima, tempo livre | Leitura a 15 metros, 40 segundos |
| Texto pode ter densidade editorial | Texto é âncora, não conteúdo |
| Textura e granulação percebidas de perto | Textura some no projetor, use forma e cor |
| Paleta inteira disponível | Metade da paleta não passa em contraste como texto |

A regra de aprovação da marca ("mesma materialidade, intenção e acabamento")
continua valendo para **capas, aberturas e peças de divulgação**. Dentro do
slide de conteúdo, legibilidade ganha de acabamento, sempre.

## 2. As oito regras de composição

Estas oito não são preferência: são o que separa um slide montado de um slide
desenhado. Todas estão implementadas no `slides.css`. Se você usar os blocos,
já vêm de graça.

**1 · A assinatura fica sempre no canto inferior direito.** Nunca à esquerda: à
esquerda ela cai no começo da linha de leitura e briga com o texto. À direita ela
assina, que é a função dela. A paginação vai para o canto oposto.

**2 · Na capa a assinatura também é pequena e de canto**, no alto à direita.
Assinatura grande e centralizada no meio da capa não é composição, é logo de
abertura de vídeo.

**3 · Nunca uma palavra sozinha na linha.** Título, frase de impacto, gancho,
promessa e nome de pilar usam `text-wrap: balance`, que reparte as linhas em vez
de deixar a última órfã. **Isso não cobre `<br>` escrito à mão**. Se você quebrar
manualmente, confira se não sobrou uma palavra sozinha embaixo.

**4 · Tela de pilar: o nome é o slide.** Sem conteúdo competindo, o nome da parte
ocupa tamanho de display (7,8cqw), não de título. Um pilar com nome pequeno
desperdiça o único slide que existe só para virar a página.

**5 · O respiro vem de fora para dentro.** O erro comum é sobrar moldura em cima
e embaixo e faltar ar entre cabeçalho, bloco e fecho. A `.tela` tem borda enxuta
de propósito (3,2cqw) para que o espaço fique **no miolo**, onde a leitura
acontece.

**6 · ✕ e ✓ não são elemento gráfico.** No telão eles leem como correção de prova
de escola e roubam a atenção do texto. No bloco `contraste`, quem diz de que lado
está a linha é **a barra de cor no topo mais um rótulo em caixa alta**, e o
rótulo nomeia a categoria em vez de julgar. Se o rótulo repetir o que o texto já
diz, corte um dos dois.

**7 · Frase única e citação ficam centralizadas.** Fala solta encostada na margem
esquerda parece parágrafo cortado. No eixo do slide, com medida curta, ela
respira. O bloco `citacao` já é centrado, com um traço curto acima em vez de barra
lateral, barra lateral desloca o texto do centro.

**8 · Fundo de slide é azul claríssimo, nunca bege.** Ver a seção seguinte.

## 3. Cor

O fundo da `.tela` é `--canvas-slide` (#F0F6FA), um azul quase branco. **O bege
saiu:** a granulação que dá calor no impresso desaparece no projetor e sobra o
amarelado, que lê como papel envelhecido. As caixas usam `--superficie` e as
bordas `--superficie-linha`, da mesma família.

`--papel` e `--papel-fundo` continuam existindo. São o **papel impresso**, do
material do participante, onde o bege funciona. Slide e impresso podem divergir
nisso, e devem.

Os três tons novos foram escolhidos com luminância equivalente à do bege que
substituíram, então **a tabela de contraste no fim do `tokens.css` continua
valendo integralmente.**

Núcleo azul/verde/vermelho, terracota só para acento. Um slide que virou bege com
um detalhe azul **inverteu o sistema**.

O resumo operacional de contraste:

- **Texto em qualquer tamanho**, azul-profundo, azul-assinatura, verde-petroleo, vermelho-profundo, tinta
- **Só texto grande (28px+)**, azul-aberto, vermelho-assinatura, coral
- **Nunca como texto; só forma, barra, ícone**, turquesa, verde-alegre, verde-vivo, açafrão, areia, rosa

É por isso que o `<em>` de realce usa **vermelho-profundo**: ele precisa
funcionar no título grande *e* dentro de uma linha de texto pequena.

**Nunca escreva hex dentro de um slide.** Só as variáveis do `tokens.css`. Uma
mudança de marca precisa acontecer em um arquivo, não em quarenta.

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

## 4. Tipografia

- **Títulos:** Sesimbra. Não é webfont pública, coloque o `.woff2` em
  `_design-slides/fontes/Sesimbra.woff2` e o `@font-face` carrega. Sem o
  arquivo, cai em **Sora**, o fallback previsto pela identidade.
- **Texto:** Carlito / Calibri.

Tudo dimensiona em `cqw`, percentual da largura do slide. O mesmo HTML serve a
um notebook e a um telão. **Não use `px` dentro da `.tela`**: quebra exatamente
no telão, que é onde não dá para consertar.

## 5. Anatomia do slide

```
┌─────────────────────────────────────────────┐
│ Título com realce                           │   ← .cabecalho > .titulo
│ ───────────────────────────                 │
│                                             │
│         [ UM bloco de conteúdo ]            │   ← auto-centralizado
│                                             │
│ ┌─────────────────────────────────────┐     │
│ │ o fecho, duas linhas                │     │   ← .fecho, discreto de propósito
│ └─────────────────────────────────────┘     │
│ paginação                      assinatura   │   ← assinatura SEMPRE à direita
└─────────────────────────────────────────────┘
```

**Um bloco de conteúdo por slide.** Empilhar dois blocos é o sintoma de um slide
tentando dizer duas coisas.

## 6. O fecho

Duas linhas, a segunda mais curta, com uma palavra em `<b>`. Deliberadamente
pequeno e sem cor forte: ele não pode competir com o conteúdo.

**O erro mortal é usar o fecho para repetir o que você acabou de falar.** Ele
carrega o que a plateia leva embora. Não o resumo do slide.

## 7. Ilustração gerada por IA

Quando um slide pedir imagem, use os estilos A1-A12 do guia da marca. Regras:

- **Um estilo principal por palestra**, no máximo um de apoio. Misturar estilo é
  o jeito mais rápido de a apresentação parecer montada por três pessoas.
- Envie **a imagem de referência junto com o prompt-base**, o prompt sozinho
  produz genérico.
- Registre no `PALESTRA-base.md` (seção 7) qual estilo foi escolhido.

Estilos que costumam servir a palestra:

| Estilo | Quando |
|---|---|
| A1 Abstrato orgânico | Capas, aberturas, transições entre partes |
| A5 Ilustração linear | Formação, workshop, conteúdo sobre relações |
| A9 Mapas e percursos | Metodologia, jornada, o instrumento crescendo volta a volta |
| A10 Gráficos ilustrados | Indicadores, pesquisa, resultado |
| A11 Esboços conceituais | Facilitação, pensamento em construção |

## 8. Checagem antes de subir ao palco

- [ ] Todo slide cabe em um dos 17 blocos
- [ ] Nenhum slide tem dois blocos de conteúdo
- [ ] Nenhum hex escrito à mão; só variáveis
- [ ] Nenhum `px` dentro da `.tela`
- [ ] Nenhum número de slide escrito à mão (o JS numera)
- [ ] Passou no modo limpo: nenhum slide depende de ler a coluna de notas
- [ ] Testado na proporção da sala (16:9 quase sempre; confirme no briefing)
- [ ] `--canvas-slide` domina os slides de conteúdo; azul/verde cheios só em capa,
      promessa e telas de pilar
- [ ] **Nenhum slide estoura a `.tela`**, rode a checagem automática abaixo
- [ ] Assinatura à direita em todos; nenhuma palavra sozinha em fim de linha
- [ ] Nenhum ✕ ou ✓ como elemento gráfico

### A checagem de estouro

Slide que passa da altura da `.tela` fica cortado no telão e **você não vê isso no
navegador**, porque o overflow é escondido. Meça antes:

```js
// no console, com o slide ativo
const t = document.querySelector('.slide.ativo .tela');
t.scrollHeight > t.clientHeight   // true = está cortado
```

Empilhar `cabecalho` + bloco + `fecho` é o que estoura com mais frequência. Quando
estourar, **corte texto**. Não reduza corpo de fonte.
