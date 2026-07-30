/* ============================================================
   REVISÃO — aprovar e comentar slide a slide
   Inclua depois de slides.js:
     inclua a tag script apontando para _design-slides/revisao.js

   Segue o padrão validado no curso de Avaliação de Impacto da Pratika: uma
   faixa única logo abaixo do deck, no caminho natural da leitura — "este slide
   está bom?" com Aprovar, e a caixa de comentário **sempre aberta**, salvando
   sozinha enquanto se digita. Ter de clicar "comentar" a cada slide é atrito
   puro num deck de cinquenta. A faixa sempre fala do slide que está na tela;
   selo no canto e moldura colorida dizem em que pé cada um está.

   Tudo fica no navegador (localStorage). Não aparece no modo limpo nem no
   .pptx exportado.
   ============================================================ */
(function () {
  "use strict";

  var slides = [].slice.call(document.querySelectorAll(".slide"));
  if (!slides.length) return;

  /* A chave nao pode depender do nome do arquivo: slides.html e
     slides-completo.html sao a MESMA palestra, e trocar de um para o outro nao
     pode fazer a revisao sumir. Usa a pasta + o titulo. */
  var partes = location.pathname.split("/");
  var NOME = (partes[partes.length - 2] || "palestra") + "::" + (document.title || "").trim();
  var K_COM = "aureo-revisao-com::" + NOME;
  var K_OK  = "aureo-revisao-ok::" + NOME;

  /* migra revisoes gravadas pelo esquema antigo (chave por caminho de arquivo) */
  (function migrar() {
    var pasta = partes[partes.length - 2] || "";
    ["com", "ok"].forEach(function (tipo) {
      var destino = tipo === "com" ? K_COM : K_OK;
      if (localStorage.getItem(destino)) return;
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k.indexOf("aureo-revisao-" + tipo + "::") !== 0 || k === destino) continue;
        if (pasta && k.indexOf(pasta) === -1) continue;
        localStorage.setItem(destino, localStorage.getItem(k));
        break;
      }
    });
  })();

  function ler(k) { try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function gravar(k, d) { try { localStorage.setItem(k, JSON.stringify(d)); } catch (e) {} }
  function comentario(n) { return (ler(K_COM)[String(n)] || "").trim(); }
  function salvarComentario(n, txt) {
    var d = ler(K_COM);
    if (txt.trim()) d[String(n)] = txt.trim(); else delete d[String(n)];
    gravar(K_COM, d);
  }
  function aprovado(n) { return !!ler(K_OK)[String(n)]; }
  function alternarAprovado(n) {
    var d = ler(K_OK);
    if (d[String(n)]) delete d[String(n)]; else d[String(n)] = true;
    gravar(K_OK, d);
  }

  /* título do slide, para identificar o comentário na exportação */
  function tituloDe(slide, i) {
    var sel = [".titulo", ".gancho-frase", ".promessa-frase", ".pausa-consigna",
               ".frase-impacto", ".capa h1", ".seccao h2", ".declaracao .corpo", ".citacao .fala"];
    for (var s = 0; s < sel.length; s++) {
      var el = slide.querySelector(sel[s]);
      if (el && el.innerText.trim()) return el.innerText.trim().replace(/\s+/g, " ").slice(0, 80);
    }
    return "slide " + (i + 1);
  }

  var css = document.createElement("style");
  css.textContent = [
    ".rv-selo{position:absolute;top:2.4cqw;right:3.2cqw;z-index:22;font-family:inherit;font-size:1.15cqw;",
    "font-weight:800;letter-spacing:.08em;text-transform:uppercase;border-radius:4cqw;padding:.7cqw 1.8cqw;display:none}",
    ".rv-selo.ok{display:block;background:#0E625B;color:#fff}",
    ".rv-selo.com{display:block;background:#B21F35;color:#fff}",
    ".slide.rv-aprovado .tela{box-shadow:inset 0 0 0 4px #0E625B}",
    ".slide.rv-comentado .tela{box-shadow:inset 0 0 0 4px #B21F35}",

    /* fixa no rodape: com 49 slides a faixa ficava fora da tela e o body tem
       overflow hidden, entao nao havia como rolar ate os botoes de exportar */
    ".rv-faixa{position:fixed;left:0;right:0;bottom:0;z-index:120;background:#FAF7F2;",
    "border-radius:16px 16px 0 0;padding:12px 22px 14px;box-shadow:0 -8px 34px rgba(0,0,0,.45);",
    "max-height:44vh;overflow-y:auto;font-family:'Carlito',Calibri,system-ui,sans-serif}",
    /* o deck encolhe o suficiente para nunca ficar atras da faixa */
    "body.rv-on{justify-content:flex-start;padding-top:1.4vh}",
    "body.rv-on .apresentacao{max-width:min(1500px,calc((100vh - 330px) * 2.7))}",
    "body.rv-on .barra,body.rv-on .navegacao{max-width:min(1500px,calc((100vh - 330px) * 2.7))}",
    "body.rv-on .dica-teclado{display:none}",
    ".rv-cab{display:flex;align-items:center;gap:12px;flex-wrap:wrap}",
    ".rv-qual{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#55637E}",
    ".rv-perg{flex:1;min-width:180px;font-size:17px;font-weight:800;color:#132B70}",
    ".rv-bts{display:flex;gap:9px;flex-wrap:wrap}",
    ".rv-b{font-family:inherit;font-size:14.5px;font-weight:800;border-radius:12px;padding:12px 20px;",
    "cursor:pointer;border:2px solid transparent;transition:.14s;white-space:nowrap}",
    ".rv-b.ok{background:#0E625B;color:#fff}.rv-b.ok:hover{background:#14856C}",
    ".rv-b.ok.on{background:#fff;color:#0E625B;border-color:#0E625B}",
    ".rv-b.exp{background:#fff;color:#132B70;border-color:#E3D9CB;font-size:13px;padding:11px 16px}",
    ".rv-b.exp:hover{background:#F2ECE3}",

    ".rv-box{margin-top:10px;border-top:1px solid #E3D9CB;padding-top:10px}",
    ".rv-box h4{margin:0 0 8px;font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#B21F35;",
    "display:flex;align-items:baseline;gap:10px}",
    ".rv-salvo{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:none;color:#0E625B;opacity:0;transition:opacity .2s}",
    ".rv-salvo.on{opacity:1}",
    ".rv-box textarea{width:100%;min-height:64px;resize:vertical;font-family:inherit;font-size:15px;",
    "line-height:1.55;color:#14213D;background:#F2ECE3;border:1px solid #E3D9CB;border-radius:9px;padding:11px 13px;outline:none}",
    ".rv-box textarea:focus{border-color:#B21F35}",
    ".rv-row{display:flex;gap:9px;margin-top:10px;flex-wrap:wrap}",
    ".rv-x{font-family:inherit;font-size:13px;font-weight:700;border-radius:11px;padding:10px 16px;cursor:pointer;border:1px solid #E3D9CB;background:#fff;color:#55637E}",


    ".rv-rod{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:9px}",
    ".rv-cnt{font-size:13px;font-weight:700;color:#55637E}",
    ".rv-sp{flex:1}",
    ".rv-rod button{font-family:inherit;font-size:13px;font-weight:800;border-radius:11px;padding:9px 15px;",
    "cursor:pointer;border:1px solid #E3D9CB;background:#fff;color:#132B70}",
    ".rv-rod button:hover{background:#F2ECE3}",
    ".rv-dica{font-size:12px;color:#55637E;opacity:.8;width:100%;line-height:1.45}",

    /* o modo limpo tem de voltar a ocupar a tela inteira: as regras de rv-on
       tem a mesma especificidade e sao injetadas depois, entao venceriam */
    "body[data-modo='limpo'] .rv-faixa,body[data-modo='limpo'] .rv-selo{display:none!important}",
    "body[data-modo='limpo'].rv-on{justify-content:center;padding:0}",
    "body[data-modo='limpo'].rv-on .apresentacao,body[data-modo='limpo'].rv-on .barra,",
    "body[data-modo='limpo'].rv-on .navegacao{max-width:none}",
    "body[data-modo='limpo'] .slide .tela{box-shadow:none!important}",
    "@media print{.rv-faixa,.rv-selo{display:none!important}.slide .tela{box-shadow:none!important}}"
  ].join("");
  document.head.appendChild(css);

  /* selo em cada slide */
  slides.forEach(function (s) {
    var tela = s.querySelector(".tela");
    if (!tela) return;
    var selo = document.createElement("span");
    selo.className = "rv-selo";
    tela.appendChild(selo);
    s._selo = selo;
  });

  /* faixa única, logo abaixo da navegação */
  var faixa = document.createElement("section");
  faixa.className = "rv-faixa";
  faixa.innerHTML =
    '<div class="rv-cab">' +
      '<span class="rv-qual"></span>' +
      '<span class="rv-perg">Este slide está bom?</span>' +
      '<span class="rv-bts">' +
        '<button class="rv-b ok" type="button" data-ac="ok">✓ Aprovar este slide</button>' +
        '<button class="rv-b exp" type="button" data-ac="copiar">⧉ Copiar revisão</button>' +
        '<button class="rv-b exp" type="button" data-ac="baixar">⬇ Baixar</button>' +
      '</span>' +
    '</div>' +
    '<div class="rv-box"><h4><span class="rv-tit"></span><span class="rv-salvo">✓ salvo</span></h4>' +
      '<textarea placeholder="O que mudar neste slide? Pode ser o texto, o bloco, a ordem, o tempo... — vai salvando sozinho"></textarea>' +
      '<div class="rv-row"><button class="rv-x" type="button" data-ac="apagar">Apagar este comentário</button></div></div>' +
    '<div class="rv-rod"><span class="rv-cnt"></span><span class="rv-sp"></span>' +
      '<span class="rv-dica">Navegue com ← → ou pelos botões acima. Em cada slide, aprove ou comente aqui. Fica salvo neste navegador — no fim, copie ou baixe e mande de volta.</span>' +
    '</div>';

  var nav = document.querySelector(".navegacao");
  if (nav && nav.parentNode) nav.parentNode.insertBefore(faixa, nav.nextSibling);
  else document.body.appendChild(faixa);

  var box = faixa.querySelector(".rv-box");
  var ta = box.querySelector("textarea");
  var bOk = faixa.querySelector('[data-ac="ok"]');
  var selo = faixa.querySelector(".rv-salvo");
  var atual = 1, ultimo = 0;

  function indiceAtual() {
    for (var i = 0; i < slides.length; i++) if (slides[i].classList.contains("ativo")) return i;
    return 0;
  }

  function pintar() {
    atual = indiceAtual() + 1;
    var trocouDeSlide = atual !== ultimo;
    ultimo = atual;
    var txt = comentario(atual), ok = aprovado(atual);

    faixa.querySelector(".rv-qual").textContent = "Slide " + atual + " de " + slides.length;
    faixa.querySelector(".rv-tit").textContent = "Seu comentário para o slide " + atual;
    if ((trocouDeSlide || document.activeElement !== ta) && ta.value !== txt) ta.value = txt;

    bOk.classList.toggle("on", ok);
    bOk.textContent = ok ? "✓ Slide aprovado" : "✓ Aprovar este slide";

    slides.forEach(function (s, i) {
      var n = i + 1, o = aprovado(n), c = !!comentario(n);
      s.classList.toggle("rv-aprovado", o && !c);
      s.classList.toggle("rv-comentado", c);
      if (s._selo) {
        s._selo.className = "rv-selo" + (c ? " com" : (o ? " ok" : ""));
        s._selo.textContent = c ? "Comentado" : (o ? "Aprovado" : "");
      }
    });

    var nOk = 0; for (var i = 1; i <= slides.length; i++) if (aprovado(i)) nOk++;
    var nC = Object.keys(ler(K_COM)).length;
    faixa.querySelector(".rv-cnt").textContent =
      nOk + " de " + slides.length + " slides aprovados" +
      (nC ? " · " + nC + (nC === 1 ? " comentário" : " comentários") : "");
  }

  bOk.addEventListener("click", function () { alternarAprovado(atual); pintar(); });
  box.addEventListener("click", function (e) {
    if (e.target.getAttribute && e.target.getAttribute("data-ac") === "apagar") {
      ta.value = ""; salvarComentario(atual, ""); pintar();
    }
  });

  /* a caixa fica sempre aberta e salva sozinha enquanto se digita —
     clicar "comentar" cinquenta vezes é atrito puro */
  var temporizador = null;
  function marcarSalvo() {
    selo.classList.add("on");
    setTimeout(function () { selo.classList.remove("on"); }, 1400);
  }
  ta.addEventListener("input", function () {
    var n = atual;
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      salvarComentario(n, ta.value);   // o valor de agora, não o de 500ms atrás
      marcarSalvo();
      pintar();
    }, 500);
  });
  /* as setas navegam os slides — dentro do textarea, não */
  ta.addEventListener("keydown", function (e) { e.stopPropagation(); });

  /* grava na hora ao sair do campo ou ao fechar a página */
  function gravarAgora() { clearTimeout(temporizador); salvarComentario(atual, ta.value); }
  ta.addEventListener("blur", function () { gravarAgora(); pintar(); });
  window.addEventListener("beforeunload", gravarAgora);

  /* a faixa acompanha o slide que está na tela — grava o anterior antes de trocar */
  var obs = new MutationObserver(function () {
    if (indiceAtual() + 1 !== atual) { gravarAgora(); pintar(); }
  });
  slides.forEach(function (s) { obs.observe(s, { attributes: true, attributeFilter: ["class"] }); });

  /* ---- exportação ---- */
  function texto() {
    var linhas = ["# Revisão — " + document.title, ""];
    var nOk = 0;
    for (var i = 1; i <= slides.length; i++) if (aprovado(i)) nOk++;
    linhas.push(nOk + " de " + slides.length + " slides aprovados.", "");
    for (var n = 1; n <= slides.length; n++) {
      var c = comentario(n), o = aprovado(n);
      if (!c && !o) continue;
      linhas.push("## Slide " + n + " — " + tituloDe(slides[n - 1], n - 1));
      if (o && !c) linhas.push("APROVADO");
      if (c) linhas.push(o ? "APROVADO COM RESSALVA" : "COMENTADO", c);
      linhas.push("");
    }
    var pend = [];
    for (var m = 1; m <= slides.length; m++) if (!aprovado(m) && !comentario(m)) pend.push(m);
    if (pend.length) linhas.push("## Ainda sem resposta", "Slides: " + pend.join(", "));
    return linhas.join("\n");
  }

  faixa.addEventListener("click", function (e) {
    var ac = e.target.getAttribute && e.target.getAttribute("data-ac");
    if (!ac) return;
    var btn = e.target, rotulo = btn.textContent;
    if (ac === "copiar") {
      navigator.clipboard.writeText(texto()).then(function () {
        btn.textContent = "✓ copiado!";
        setTimeout(function () { btn.textContent = rotulo; }, 1800);
      });
    } else if (ac === "baixar") {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([texto()], { type: "text/plain;charset=utf-8" }));
      a.download = "revisao-" + NOME.replace(/[^a-z0-9]+/gi, "-") + ".txt";
      a.click();
      URL.revokeObjectURL(a.href);
    }
  });

  document.body.classList.add("rv-on");
  pintar();
})();
