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
    
    success = True

    # --- CSS ---
    print("\n[CSS] Minifikacja style.css")
    if os.path.exists("style.css"):
        size_before = get_size("style.css")
        # Zmieniamy: nie nadpisujemy style.css, tylko generujemy .min.css
        # dla lepszego DX (Developer Experience)
        if run_cmd("npx --yes lightningcss-cli --minify style.css -o style.min.css"):
            size_after = get_size("style.min.css")
            print(f"  style.css -> style.min.css: {size_before} -> {size_after} bytes")
        else:
            success = False
    
    # --- JS ---
    js_files = [
        ("script.js", "script.min.js"),
        ("consent.js", "consent.min.js")
    ]
    
    print("\n[JS] Minifikacja plików JavaScript...")
    for src, out in js_files:
        if os.path.exists(src):
            size_before = get_size(src)
            if run_cmd(f"npx --yes terser {src} -o {out} --compress --mangle"):
                size_after = get_size(out)
                print(f"  {src} -> {out}: {size_before} -> {size_after} bytes")
            else:
                success = False

    # --- Obrazy ---
    print("\n[IMG] Generowanie wariantów responsywnych (screens/*.webp)...")
    all_webp = glob.glob("screens/*.webp")
    source_images = [img for img in all_webp if "_480" not in img and "_960" not in img]
    
    for img in source_images:
        img = img.replace("\\", "/")
        path = Path(img)
        base_name = path.stem
        
        out480 = str(path.with_name(f"{base_name}_480.webp")).replace("\\", "/")
        out960 = str(path.with_name(f"{base_name}_960.webp")).replace("\\", "/")
        
        print(f"  Przetwarzanie {base_name}...")
        # 480w
        if not run_cmd(f'npx --yes sharp-cli -i "{img}" -o "{out480}" -q 80 -f webp -- resize 480 --withoutEnlargement'):
            success = False
        # 960w
        if not run_cmd(f'npx --yes sharp-cli -i "{img}" -o "{out960}" -q 80 -f webp -- resize 960 --withoutEnlargement'):
            success = False
        
    if success:
        print("\n=== Build zakończony sukcesem ===")
    else:
        print("\n!!! Build zakończony z błędami !!!")
        exit(1)

if __name__ == "__main__":
    main()
