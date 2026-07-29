#!/usr/bin/env python3
"""
Gera PDF de um documento de página — material do participante, não slides.

    python3 ferramentas/gerar-pdf-pagina.py palestras/<nome>/mapa.html
    python3 ferramentas/gerar-pdf-pagina.py palestras/<nome>/mapa.html --retrato

Diferente do gerar-pdf.py, que renderiza slide por slide em 16:9, aqui o
navegador pagina sozinho usando o @media print do próprio arquivo. É isso que
permite manter uma fonte só: o mesmo HTML serve para ler na tela e para
imprimir.

Padrão: **A4 paisagem**, porque as tabelas do Mapa têm seis colunas e não
caberiam em retrato. Use --retrato para documentos de texto corrido.

    pip install playwright

O Chromium do ambiente é reaproveitado quando existe — não rode
"playwright install" sem necessidade.
"""

import asyncio
import pathlib
import sys

# Chromium já presente no ambiente. Se a versão do pacote playwright não bater
# com a do binário, é este caminho que evita o download.
CHROMIUM_LOCAL = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"

MARGENS = {"top": "11mm", "bottom": "11mm", "left": "10mm", "right": "10mm"}


def erro(msg):
    print("erro: " + msg, file=sys.stderr)
    raise SystemExit(1)


async def gerar(origem: pathlib.Path, destino: pathlib.Path, paisagem: bool):
    from playwright.async_api import async_playwright

    async with async_playwright() as p:
        local = pathlib.Path(CHROMIUM_LOCAL)
        navegador = await (
            p.chromium.launch(executable_path=str(local)) if local.exists()
            else p.chromium.launch()
        )
        pagina = await navegador.new_page()
        await pagina.goto(origem.as_uri(), wait_until="load")
        # Sem isto o Chromium ignora o @media print e pagina pelo layout de tela.
        await pagina.emulate_media(media="print")
        await pagina.pdf(
            path=str(destino),
            format="A4",
            landscape=paisagem,
            print_background=True,
            margin=MARGENS,
        )
        await navegador.close()


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    paisagem = "--retrato" not in sys.argv

    if len(args) != 1:
        erro("uso: gerar-pdf-pagina.py <arquivo.html> [--retrato]")

    origem = pathlib.Path(args[0]).resolve()
    if not origem.exists():
        erro(f"não encontrei {origem}")

    destino = origem.with_suffix(".pdf")
    asyncio.run(gerar(origem, destino, paisagem))

    paginas = "?"
    try:
        import fitz  # opcional, só para conferir

        paginas = fitz.open(destino).page_count
    except ImportError:
        pass

    orientacao = "paisagem" if paisagem else "retrato"
    print(f"gerado: {destino}  ({paginas} páginas, A4 {orientacao})")


if __name__ == "__main__":
    main()
