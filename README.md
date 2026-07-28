# aureo-palestras

Gestor de palestras e formações de **Aureo Gionco**. Um lugar só para o método,
o layout próprio de slides e a produção de cada palestra, do tema cru até os
dois arquivos finais.

## O que este repositório resolve

Trazer um tema e sair com uma palestra pronta — usando a mesma disciplina de
desenho pedagógico dos cursos da Pratika Social, comprimida para o palco, e
vestida com a identidade visual do Aureo.

No fim de cada palestra existem **duas saídas do mesmo arquivo**:

| Saída | O que é | Como abrir |
|---|---|---|
| **Modo formador** | O slide + a coluna de notas: o que falar, o tempo acumulado, os avisos | abrir `slides.html` |
| **Modo limpo** | Só o slide, 16:9, tela cheia — a apresentação final | `?modo=limpo`, ou tecla **P** |

Um arquivo, duas visões. Não existe "segundo arquivo sem notas" para manter em
sincronia — duas fontes sempre desencontram na correção de última hora, que é
justamente a mais importante.

## O método

Criado por Aureo Gionco, fundindo duas linhagens: o rigor de desenho pedagógico
dos cursos da Pratika Social (Fases 0 a 3 — briefing, instrumento, case, âncoras)
e a metodologia de palestras memoráveis do próprio Aureo (Fase 4 em diante).

Cinco movimentos:

| | Movimento | |
|---|---|---|
| 1 | **Abertura impactante** | a tensão. O case entra aqui, sem conclusão |
| 2 | **Grande promessa** | e ela nomeia o instrumento. Só depois vem quem fala |
| 3 | **A trança** | storytelling e método entrelaçados |
| 4 | **Prática** | a plateia usa o instrumento na cadeira |
| 5 | **Grande finale** | volta ao gancho → princípio → primeiro passo |

**O que separa esta metodologia:** toda palestra memorável entrega
conhecimento; esta entrega conhecimento **e um objeto**. Por isso a promessa
pode ser concreta, e por isso o finale aterrissa em algo que a pessoa está
segurando.

**A trança** é o movimento central. O erro que quase toda palestra comete é
contar a história, emocionar, e então dizer "agora vou te ensinar três passos" —
e a energia escorre pelo ralo da explicação. Aqui o instrumento **não é explicado
depois da história: ele é descoberto dentro dela.** A organização protagonista
precisa dele e o inventa por necessidade, na frente da plateia.

Uma volta da trança por parte do instrumento:

```
a história avança → bate na parede → a parte do instrumento
                                     derruba a parede → alívio
```

E ao fim de cada volta o slide do instrumento reaparece com mais uma parte
preenchida — a plateia **vê o objeto sendo construído**.

### Quase nada escala com o tempo

O núcleo fixo — abertura, promessa, finale — é de ~4 minutos em qualquer
palestra. Ganhar atenção leva o mesmo tempo num talk de 18 e numa formação de 90.
Só a trança e a prática escalam, e por volta inteira.

Consequência prática: **o tempo de palco define o tamanho do instrumento.**
Até 20 min = 2 partes · 30 a 50 min = 3 · 60 a 90 min = 4, no máximo.

> O método ainda não tem nome definitivo — isso fica para depois dos primeiros
> testes em palco. "Trança" é descrição do que o movimento faz, não marca.

## Como começar uma palestra

```bash
bash ferramentas/nova-palestra.sh medir-o-que-importa
```

Depois, peça ao Claude: *"vamos montar a palestra medir-o-que-importa"*. A skill
`palestra` assume a condução e começa pela Fase 0 — o briefing.

## Estrutura

```
aureo-palestras/
├── _identidade/               → submodule: aureogionco-hub/aureo-identidade
│                                tom de voz, paleta, tipografia, estilos gráficos
├── _metodologia-palestras/    → templates em branco (briefing, case, arco, base)
├── _design-slides/            → o layout próprio
│   ├── tokens.css               paleta e tipografia da marca em variáveis
│   ├── slides.css               os 13 blocos + modo formador/limpo
│   ├── slides.js                navegação, numeração automática, alternância
│   ├── biblioteca-de-blocos.html   catálogo vivo — abra este primeiro
│   └── guia-visual-palestras.md    as regras, inclusive as de contraste
├── .claude/skills/
│   ├── palestra/                as 7 fases do método
│   └── slides-aureo/            como montar slide dentro do sistema
├── ferramentas/
│   ├── nova-palestra.sh         cria a pasta de uma palestra
│   └── gerar-pptx.py            exporta .pptx com as notas do formador
└── palestras/
    ├── _template/               esqueleto copiado a cada palestra nova
    └── <nome-da-palestra>/
```

## De onde vem cada peça

**O método** vem de `aureogionco-hub/pratika` — a metodologia de cursos da
Pratika Social e a skill Paulo, adaptadas para palco. O que muda: o curso
constrói um instrumento ao longo de 14 aulas; a palestra entrega **uma
ideia-instrumento só**, porque a plateia está na sala uma vez e não rebobina.

**A identidade** vem de `aureogionco-hub/aureo-identidade`, conectado como
submodule em `_identidade/`. Paleta, tipografia, tom de voz e os 12 estilos
gráficos. O arco da palestra (abertura 10% · desenvolvimento 55% · prática 25% ·
encerramento 10%) sai de `skill-adaptacao-canais/palestras.md`.

**O layout** é próprio: os 13 blocos de `_design-slides/` nasceram dos slides
reais do curso de Indicadores e Metas e foram reescritos na paleta e na
tipografia do Aureo.

### Sobre o submodule

```bash
git clone --recurse-submodules <url>     # ao clonar
git submodule update --init --recursive  # se já clonou sem
```

O submodule aponta para **um commit específico** da identidade, não para o
último. Isso é proposital: uma palestra fica amarrada à versão da marca com que
foi montada.

Para trazer a identidade atualizada:

```bash
git -C _identidade pull origin main
git add _identidade && git commit -m "identidade: atualiza para <versão>"
```

Faça isso **entre palestras**, nunca no meio da produção de uma.

## Exportar o .pptx

```bash
pip install playwright python-pptx && playwright install chromium   # uma vez
python3 ferramentas/gerar-pptx.py palestras/<nome>/slides.html
```

Gera um PowerPoint 16:9 com cada slide renderizado em alta resolução e as notas
do formador no campo de anotações — para o evento que só aceita pendrive.

## Antes de subir ao palco

A checagem completa está em `_design-slides/guia-visual-palestras.md`. As três
que mais pegam:

1. Rodou no **modo limpo** e nenhum slide depende de ler a coluna de notas
2. Ensaiou **cronometrando de verdade**, e sobrou folga
3. Decidiu os **cortes de emergência antes**, não no palco
