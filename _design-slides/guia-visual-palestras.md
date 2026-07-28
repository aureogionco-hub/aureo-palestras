# Guia visual — slides de palestra de Aureo Gionco

O sistema visual da marca vive no submodule `_identidade`. Este guia é a
**tradução dele para slide de palestra** — o que muda quando a peça vai para um
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
| Textura e granulação percebidas de perto | Textura some no projetor — use forma e cor |
| Paleta inteira disponível | Metade da paleta não passa em contraste como texto |

A regra de aprovação da marca ("mesma materialidade, intenção e acabamento")
continua valendo para **capas, aberturas e peças de divulgação**. Dentro do
slide de conteúdo, legibilidade ganha de acabamento — sempre.

## 2. Cor

Núcleo azul/verde/vermelho, terracota e bege só para descanso. Um slide que
virou bege com um detalhe azul **inverteu o sistema**.

O contraste sobre `--papel` (#FAF7F2) foi medido. A tabela completa está no fim
do `tokens.css`; o resumo operacional:

- **Texto em qualquer tamanho** — azul-profundo, azul-assinatura, verde-petroleo, vermelho-profundo, tinta
- **Só texto grande (28px+)** — azul-aberto, vermelho-assinatura, coral
- **Nunca como texto; só forma, barra, ícone** — turquesa, verde-alegre, verde-vivo, açafrão, areia, rosa

É por isso que o `<em>` de realce usa **vermelho-profundo**: ele precisa
funcionar no título grande *e* dentro de uma linha de texto pequena.

**Nunca escreva hex dentro de um slide.** Só as variáveis do `tokens.css`. Uma
mudança de marca precisa acontecer em um arquivo, não em quarenta.

## 3. Tipografia

- **Títulos:** Sesimbra. Não é webfont pública — coloque o `.woff2` em
  `_design-slides/fontes/Sesimbra.woff2` e o `@font-face` carrega. Sem o
  arquivo, cai em **Sora**, o fallback previsto pela identidade.
- **Texto:** Carlito / Calibri.

Tudo dimensiona em `cqw` — percentual da largura do slide. O mesmo HTML serve a
um notebook e a um telão. **Não use `px` dentro da `.tela`**: quebra exatamente
no telão, que é onde não dá para consertar.

## 4. Anatomia do slide

```
┌─────────────────────────────────────────────┐
│ assinatura                                  │   ← "Aureo Gionco", 30% opacidade
│                                             │
│ Título com realce                           │   ← .cabecalho > .titulo
│ ───────────────────────────                 │
│                                             │
│         [ UM bloco de conteúdo ]            │   ← auto-centralizado
│                                             │
│ ┌─────────────────────────────────────┐     │
│ │ o fecho, duas linhas                │     │   ← .fecho, discreto de propósito
│ └─────────────────────────────────────┘     │
│                                  paginação  │
└─────────────────────────────────────────────┘
```

**Um bloco de conteúdo por slide.** Empilhar dois blocos é o sintoma de um slide
tentando dizer duas coisas.

## 5. O fecho

Duas linhas, a segunda mais curta, com uma palavra em `<b>`. Deliberadamente
pequeno e sem cor forte: ele não pode competir com o conteúdo.

**O erro mortal é usar o fecho para repetir o que você acabou de falar.** Ele
carrega o que a plateia leva embora — não o resumo do slide.

## 6. Ilustração gerada por IA

Quando um slide pedir imagem, use os estilos A1-A12 do guia da marca. Regras:

- **Um estilo principal por palestra**, no máximo um de apoio. Misturar estilo é
  o jeito mais rápido de a apresentação parecer montada por três pessoas.
- Envie **a imagem de referência junto com o prompt-base** — o prompt sozinho
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

## 7. Checagem antes de subir ao palco

- [ ] Todo slide cabe em um dos 16 blocos
- [ ] Nenhum slide tem dois blocos de conteúdo
- [ ] Nenhum hex escrito à mão; só variáveis
- [ ] Nenhum `px` dentro da `.tela`
- [ ] Nenhum número de slide escrito à mão (o JS numera)
- [ ] Passou no modo limpo: nenhum slide depende de ler a coluna de notas
- [ ] Testado na proporção da sala (16:9 quase sempre; confirme no briefing)
- [ ] `--papel` domina os slides de conteúdo; azul/verde cheios só em capa e secção
