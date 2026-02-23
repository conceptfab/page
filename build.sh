#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────
# TIMEFLOW Landing Page — build script
# Generuje wersje .min dla CSS i JS oraz warianty obrazów.
# Wymaga: Node.js (npx), sharp-cli, lightningcss-cli, terser
# Użycie: bash build.sh
# ──────────────────────────────────────────────────────────

set -euo pipefail
cd "$(dirname "$0")"

echo "=== TIMEFLOW build ==="

# ── CSS ──────────────────────────────────────────────────
echo ""
echo "[CSS] Minifikacja styles.css → styles.min.css"
npx --yes lightningcss-cli --minify styles.css -o styles.min.css
echo "  $(wc -c < styles.css) → $(wc -c < styles.min.css) bytes"

# ── JS ───────────────────────────────────────────────────
echo ""
echo "[JS] Minifikacja script.js → script.min.js"
npx --yes terser script.js -o script.min.js --compress --mangle
echo "  $(wc -c < script.js) → $(wc -c < script.min.js) bytes"

echo "[JS] Minifikacja en/script.js → en/script.min.js"
npx --yes terser en/script.js -o en/script.min.js --compress --mangle
echo "  $(wc -c < en/script.js) → $(wc -c < en/script.min.js) bytes"

echo "[JS] Minifikacja consent.js → consent.min.js"
npx --yes terser consent.js -o consent.min.js --compress --mangle
echo "  $(wc -c < consent.js) → $(wc -c < consent.min.js) bytes"

# ── Obrazy (responsywne warianty) ────────────────────────
echo ""
echo "[IMG] Generowanie wariantów 480w i 960w..."
for f in screens/*_wynik.webp; do
  base="${f%_wynik.webp}"
  name="$(basename "$base")"

  out480="${base}_480.webp"
  out960="${base}_960.webp"

  npx --yes sharp-cli -i "$f" -o "$out480" -q 80 -f webp -- resize 480 --withoutEnlargement
  npx --yes sharp-cli -i "$f" -o "$out960" -q 80 -f webp -- resize 960 --withoutEnlargement

  printf "  %-20s %6s → %5s (960w) / %5s (480w)\n" \
    "$name" \
    "$(du -h "$f" | cut -f1)" \
    "$(du -h "$out960" | cut -f1)" \
    "$(du -h "$out480" | cut -f1)"
done

echo ""
echo "=== Build zakończony ==="
