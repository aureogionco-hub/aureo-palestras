#!/usr/bin/env python3
"""
Gera o PDF da apresentação a partir de um slides.html.

    python3 ferramentas/gerar-pdf.py palestras/<nome>/slides.html            # modo limpo
    python3 ferramentas/gerar-pdf.py palestras/<nome>/slides.html --formador # com as notas

Renderiza cada slide e monta um PDF 16:9, uma página por slide. Serve para
mandar por e-mail, imprimir o roteiro visual e revisar longe do computador.

    pip install playwright pillow
    playwright install chromium
"""

import asyncio
import os
import pathlib
import sys

LARGURA, ALTURA = 1920, 1080


def erro(msg):
    print("erro: " + msg, file=sys.stderr)
    raise SystemExit(1)


def chromium_alternativo():
    base = os.environ.get("PLAYWRIGHT_BROWSERS_PATH")
    if not base or not pathlib.Path(base).is_dir():
        return None
    c = sorted(pathlib.Path(base).glob("chromium-*/chrome-linux/chrome"))
    return str(c[-1]) if c else None


async def abrir_navegador(p):
    try:
        return await p.chromium.launch()
    except Exception:
        alt = chromium_alternativo()
        if not alt:
            erro("Chromium não encontrado. Rode: playwright install chromium")
        return await p.chromium.launch(executable_path=alt)


async def capturar(origem, destino, formador):
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        erro("playwright não instalado. Rode: pip install playwright pillow")

    destino.mkdir(parents=True, exist_ok=True)
    imagens = []
    # no modo formador a página inteira entra (slide + notas); no limpo, só a tela
    largura = 2400 if formador else LARGURA
    altura = 1350 if formador else ALTURA

    async with async_playwright() as p:
        nav = await abrir_navegador(p)
        pg = await nav.new_page(viewport={"width": largura, "height": altura},
                                device_scale_factor=2)
        await pg.goto(origem.resolve().as_uri() + ("" if formador else "?modo=limpo"))
        await pg.wait_for_function("window.__palestra !== undefined")
        await pg.wait_for_timeout(900)

        total = await pg.evaluate("window.__palestra.total")
        print(str(total) + " slides")

        for i in range(total):
            await pg.evaluate("window.__palestra.irPara(" + str(i) + ")")
            await pg.wait_for_timeout(200)
            alvo = ".slide.ativo" if formador else ".slide.ativo .tela"
            caminho = destino / ("p-" + str(i + 1).zfill(2) + ".png")
            await pg.locator(alvo).screenshot(path=str(caminho))
            imagens.append(caminho)
            print("  " + str(i + 1) + "/" + str(total), end="\r")

        await nav.close()
    print()
    return imagens


def montar_pdf(imagens, saida):
    try:
        from PIL import Image
    except ImportError:
        erro("pillow não instalado. Rode: pip install pillow")

    paginas = []
    for caminho in imagens:
        im = Image.open(caminho).convert("RGB")
        paginas.append(im)
    if not paginas:
        erro("nenhum slide capturado")
    paginas[0].save(str(saida), save_all=True, append_images=paginas[1:],
                    resolution=150.0)
    print("✓ " + str(saida) + "  (" + str(len(paginas)) + " páginas)")


def main():
    if len(sys.argv) < 2:
        erro("uso: python3 ferramentas/gerar-pdf.py palestras/<nome>/slides.html [--formador]")

    origem = pathlib.Path(sys.argv[1])
    if not origem.exists():
        erro("não encontrei " + str(origem))

    formador = "--formador" in sys.argv
    pasta = origem.parent
    sufixo = "-formador" if formador else ""
    saida = pasta / (pasta.name + sufixo + ".pdf")
    temp = pasta / (".render" + sufixo)

    imagens = asyncio.run(capturar(origem, temp, formador))
    montar_pdf(imagens, saida)
    print("  PNGs em " + str(temp) + "/ (pode apagar)")


if __name__ == "__main__":
    main()
