#!/usr/bin/env bash
# Cria a pasta de uma palestra nova a partir dos templates.
#   bash ferramentas/nova-palestra.sh <nome-curto-sem-espaco>
set -euo pipefail

nome="${1:-}"
if [[ -z "$nome" ]]; then
  echo "uso: bash ferramentas/nova-palestra.sh <nome-curto-sem-espaco>" >&2
  echo "ex.:  bash ferramentas/nova-palestra.sh medir-o-que-importa" >&2
  exit 1
fi

raiz="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
destino="$raiz/palestras/$nome"

if [[ -e "$destino" ]]; then
  echo "erro: $destino já existe" >&2
  exit 1
fi

cp -r "$raiz/palestras/_template" "$destino"
cp "$raiz/_metodologia-palestras/templates/briefing.md"        "$destino/00-pre-producao/"
cp "$raiz/_metodologia-palestras/templates/case-e-ancoras.md"  "$destino/00-pre-producao/"
cp "$raiz/_metodologia-palestras/templates/arco.md"            "$destino/00-pre-producao/"
cp "$raiz/_metodologia-palestras/templates/PALESTRA-base.md"   "$destino/"

echo "✓ palestras/$nome criada"
echo
echo "próximo passo: chame a skill (\"vamos montar uma palestra\") e comece pela Fase 0."
echo "abra $destino/00-pre-producao/briefing.md — é por ali que tudo começa."
