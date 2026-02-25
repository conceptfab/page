"""
Generowanie wariantów rozmiaru screenshotów.

Bazowe pliki: *_wynik.webp (bez informacji o rozmiarze w nazwie)
Warianty: domyślnie 480px i 960px szerokości, proporcjonalnie skalowane.

Użycie:
    python generate_variants.py                     # domyślne rozmiary [480, 960]
    python generate_variants.py 480 960 1200        # własne rozmiary
"""

import sys
from pathlib import Path
from PIL import Image

SCREENS_DIR = Path(__file__).parent
SUFFIX = "_wynik"
EXT = ".webp"
DEFAULT_WIDTHS = [480, 960]
WEBP_QUALITY = 80


def generate_variants(widths: list[int]) -> None:
    sources = sorted(SCREENS_DIR.glob(f"*{SUFFIX}{EXT}"))

    # Fallback: gdy nie ma plików *_wynik.webp, użyj bazowych *.webp
    # i pomiń już wygenerowane warianty (np. *_480.webp, *_960.webp).
    if not sources:
        sources = []
        for path in sorted(SCREENS_DIR.iterdir()):
            if not path.is_file() or path.suffix.lower() != EXT:
                continue
            stem = path.stem
            if "_" in stem and stem.rsplit("_", 1)[1].isdigit():
                continue
            sources.append(path)

        if sources:
            print(f"Nie znaleziono *{SUFFIX}{EXT}; używam bazowych plików {EXT}.")

    if not sources:
        print(f"Brak plików źródłowych (*{SUFFIX}{EXT}) w {SCREENS_DIR}")
        return

    for src_path in sources:
        base_name = src_path.stem.removesuffix(SUFFIX)

        with Image.open(src_path) as img:
            orig_w, orig_h = img.size
            print(f"\n{src_path.name} ({orig_w}x{orig_h})")

            for w in widths:
                if w >= orig_w:
                    print(f"  {w}px — pominięto (>= oryginał)")
                    continue

                h = round(orig_h * w / orig_w)
                out_name = f"{base_name}_{w}{EXT}"
                out_path = SCREENS_DIR / out_name

                resized = img.resize((w, h), Image.LANCZOS)
                resized.save(out_path, "webp", quality=WEBP_QUALITY)
                print(f"  -> {out_name} ({w}x{h})")


if __name__ == "__main__":
    widths = [int(a) for a in sys.argv[1:]] if len(sys.argv) > 1 else DEFAULT_WIDTHS
    generate_variants(widths)
