/* ============================================================
   SLIDES — navegação e alternância de modo
   Sem dependência, sem build. Abrir o HTML no navegador basta.

     ?modo=limpo      abre direto na apresentação final
     tecla P          alterna formador ↔ limpo
     tecla F          tela cheia
     ← → espaço       navega
     Home / End       primeiro / último slide

   A paginação ("3 / 12") é escrita por este script, não à mão:
   inserir ou remover um slide não obriga a renumerar nada.
   ============================================================ */
(function () {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;
  const total = slides.length;
  let atual = 0;

  /* ---- modo inicial: URL manda, senão formador ---- */
  const params = new URLSearchParams(location.search);
  document.body.dataset.modo = params.get('modo') === 'limpo' ? 'limpo' : 'formador';

  /* ---- paginação e numeração das notas, geradas ---- */
  slides.forEach((slide, i) => {
    const pag = slide.querySelector('.paginacao');
    if (pag && !pag.textContent.trim()) pag.textContent = (i + 1) + ' / ' + total;
    const ref = slide.querySelector('.notas-ref');
    if (ref && !ref.textContent.trim()) ref.textContent = 'slide ' + (i + 1) + ' de ' + total;
  });

  /* ---- pontos de navegação ---- */
  const pontos = document.querySelector('.nav-pontos');
  if (pontos) {
    slides.forEach((_, i) => {
      const p = document.createElement('div');
      p.className = 'nav-ponto' + (i === 0 ? ' ativo' : '');
      p.title = 'Slide ' + (i + 1);
      p.onclick = () => irPara(i);
      pontos.appendChild(p);
    });
  }

  const btnAnt = document.querySelector('[data-nav="anterior"]');
  const btnProx = document.querySelector('[data-nav="proximo"]');
  const contador = document.querySelector('[data-contador]');
  if (btnAnt) btnAnt.onclick = () => mover(-1);
  if (btnProx) btnProx.onclick = () => mover(1);

  function irPara(n) {
    if (n < 0 || n >= total || n === atual) return;
    slides[atual].classList.remove('ativo');
    slides[n].classList.add('ativo');
    if (pontos) {
      pontos.children[atual].classList.remove('ativo');
      pontos.children[n].classList.add('ativo');
    }
    atual = n;
    if (contador) contador.textContent = (n + 1) + ' / ' + total;
    if (btnAnt) btnAnt.disabled = n === 0;
    if (btnProx) btnProx.disabled = n === total - 1;
  }

  function mover(d) { irPara(atual + d); }

  function alternarModo() {
    const limpo = document.body.dataset.modo === 'limpo';
    document.body.dataset.modo = limpo ? 'formador' : 'limpo';
    const url = new URL(location.href);
    if (limpo) url.searchParams.delete('modo'); else url.searchParams.set('modo', 'limpo');
    history.replaceState(null, '', url);
  }

  const btnModo = document.querySelector('[data-modo-toggle]');
  if (btnModo) btnModo.onclick = alternarModo;

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
        e.preventDefault(); mover(1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); mover(-1); break;
      case 'Home': e.preventDefault(); irPara(0); break;
      case 'End': e.preventDefault(); irPara(total - 1); break;
      case 'p': case 'P': alternarModo(); break;
      case 'f': case 'F':
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
    }
  });

  irPara(0);

  /* ---- porta de entrada para ferramentas/gerar-pptx.py ----
     O exportador precisa saber quantos slides existem, pular de um
     para outro e ler as notas de cada um para escrever no PowerPoint. */
  window.__palestra = {
    total,
    irPara,
    modo: (m) => { document.body.dataset.modo = m; },
    notas: () => slides.map(s => {
      const n = s.querySelector('.notas-corpo');
      return n ? n.innerText.trim() : '';
    })
  };
})();
