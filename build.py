import os
import subprocess
import glob
import shutil
from pathlib import Path

def run_cmd(cmd):
    try:
        subprocess.run(cmd, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Błąd podczas wykonywania: {cmd}")
        print(e)
        return False
    return True

def get_size(path):
    return os.path.getsize(path)

def main():
    print("=== TIMEFLOW build (Python) ===")
    
    # --- CSS ---
    print("\n[CSS] Minifikacja style.css")
    if os.path.exists("style.css"):
        size_before = get_size("style.css")
        if run_cmd("npx --yes lightningcss-cli --minify style.css -o style.css.tmp"):
            shutil.move("style.css.tmp", "style.css")
            size_after = get_size("style.css")
            print(f"  {size_before} -> {size_after} bytes (zminifikowano)")
    
    # --- JS ---
    js_files = [
        ("script.js", "script.min.js"),
        ("en/script.js", "en/script.min.js"),
        ("consent.js", "consent.min.js")
    ]
    
    print("\n[JS] Minifikacja plików JavaScript...")
    for src, out in js_files:
        if os.path.exists(src):
            size_before = get_size(src)
            if run_cmd(f"npx --yes terser {src} -o {out} --compress --mangle"):
                size_after = get_size(out)
                print(f"  {src}: {size_before} -> {size_after} bytes")

    # --- Obrazy ---
    print("\n[IMG] Generowanie wariantów responsywnych (screens/*.webp)...")
    images = glob.glob("screens/*_wynik.webp")
    for img in images:
        # Konwersja na forward slashes dla kompatybilności z npx/sharp-cli
        img = img.replace("\\", "/")
        path = Path(img)
        base_name = path.stem.replace("_wynik", "")
        
        out480 = str(path.with_name(f"{base_name}_480.webp")).replace("\\", "/")
        out960 = str(path.with_name(f"{base_name}_960.webp")).replace("\\", "/")
        
        # 480w
        run_cmd(f'npx --yes sharp-cli -i "{img}" -o "{out480}" -q 80 -f webp -- resize 480 --withoutEnlargement')
        # 960w
        run_cmd(f'npx --yes sharp-cli -i "{img}" -o "{out960}" -q 80 -f webp -- resize 960 --withoutEnlargement')
        
        print(f"  {base_name}: wygenerowano warianty 480w i 960w")

    print("\n=== Build zakończony ===")

if __name__ == "__main__":
    main()
