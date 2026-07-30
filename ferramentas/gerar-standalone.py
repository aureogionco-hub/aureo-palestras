#!/usr/bin/env python3
"""
Gera uma versão de ARQUIVO ÚNICO do slides.html, com CSS e JS embutidos.

    python3 ferramentas/gerar-standalone.py palestras/<nome>/slides.html

O slides.html normal aponta para ../../_design-slides/ — ótimo para trabalhar
(um ajuste de layout vale para todas as palestras), péssimo para mandar por
e-mail ou WhatsApp: sozinho ele abre sem estilo nenhum.

Esta ferramenta resolve os <link> e <script> locais, embute tudo e escreve
<nome>-completo.html. Esse arquivo funciona em qualquer computador, sem
internet e sem pasta ao lado — é o que se manda para revisar.
"""

import pathlib
import re
import sys


def erro(msg):
    print("erro: " + msg, file=sys.stderr)
    raise SystemExit(1)


def resolver_css(caminho, vistos=None):
    """Lê um CSS resolvendo os @import locais, sem entrar em laço."""
    vistos = vistos or set()
    caminho = caminho.resolve()
    if caminho in vistos or not caminho.exists():
        return ""
    vistos.add(caminho)
    texto = caminho.read_text(encoding="utf-8")

    def troca(m):
        alvo = caminho.parent / m.group(1)
        return resolver_css(alvo, vistos)

    return re.sub(r"@import\s+url\(['\"]?([^'\")]+)['\"]?\);", troca, texto)


def main():
    if len(sys.argv) < 2:
        erro("uso: python3 ferramentas/gerar-standalone.py palestras/<nome>/slides.html")

    origem = pathlib.Path(sys.argv[1])
    if not origem.exists():
        erro("não encontrei " + str(origem))
    base = origem.parent
    html = origem.read_text(encoding="utf-8")

    embutidos = []

    def trocar_link(m):
        href = m.group(1)
        if href.startswith("http"):
            return m.group(0)
        alvo = (base / href)
        if not alvo.exists():
            return m.group(0)
        embutidos.append(href)
        return "<style>\n" + resolver_css(alvo) + "\n</style>"

    def trocar_script(m):
        src = m.group(1)
        if src.startswith("http"):
            return m.group(0)
        alvo = (base / src)
        if not alvo.exists():
            return m.group(0)
        embutidos.append(src)
        js = alvo.read_text(encoding="utf-8")
        # Um "</script>" dentro do JS (mesmo em comentário) fecha a tag antes da
        # hora e joga o resto do arquivo como TEXTO na página. Escapar a barra
        # resolve sem mudar o comportamento do script.
        js = js.replace("</script", "<\\/script")
        return "<script>\n" + js + "\n</script>"

    html = re.sub(r'<link[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\'][^>]*>',
                  trocar_link, html)
    html = re.sub(r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>\s*</script>',
                  trocar_script, html)

    # o link "← Repositório" não faz sentido num arquivo solto
    html = html.replace('<a href="../../README.md">← Repositório</a>', "")

    saida = base / (origem.stem + "-completo.html")
    saida.write_text(html, encoding="utf-8")

    tamanho = saida.stat().st_size / 1024
    print("✓ " + str(saida) + "  (" + str(round(tamanho)) + " KB)")
    for e in embutidos:
        print("  embutido: " + e)
    print("\nEste arquivo funciona sozinho — pode mandar por e-mail ou WhatsApp.")


if __name__ == "__main__":
    main()
