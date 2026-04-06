import os
import subprocess
import glob
import shutil
from pathlib import Path
import re
from datetime import datetime

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
    print("\n[CSS] Minifikacja plików CSS")
    css_files = [
        ("style.css", "style.min.css"),
        ("updates.css", "updates.min.css")
    ]
    
    for src, out in css_files:
        if os.path.exists(src):
            size_before = get_size(src)
            if run_cmd(f"npx --yes lightningcss-cli --minify {src} -o {out}"):
                size_after = get_size(out)
                print(f"  {src} -> {out}: {size_before} -> {size_after} bytes")
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

    # --- Sitemap ---
    print("\n[SEO] Aktualizacja sitemap.xml...")
    if os.path.exists("sitemap.xml"):
        loc_to_file = {
            "https://timeflow.conceptfab.com/": "index.html",
            "https://timeflow.conceptfab.com/en/": "en/index.html",
            "https://timeflow.conceptfab.com/aktualizacje.html": "aktualizacje.html",
            "https://timeflow.conceptfab.com/en/updates.html": "en/updates.html",
            "https://timeflow.conceptfab.com/pomoc.html": "pomoc.html",
            "https://timeflow.conceptfab.com/en/help.html": "en/help.html"
        }

        with open("sitemap.xml", "r", encoding="utf-8") as f:
            content = f.read()

        def replace_lastmod(match):
            block = match.group(0)
            for loc, filepath in loc_to_file.items():
                if f"<loc>{loc}</loc>" in block and os.path.exists(filepath):
                    mtime = os.path.getmtime(filepath)
                    date_str = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
                    block = re.sub(r'<lastmod>.*?</lastmod>', f'<lastmod>{date_str}</lastmod>', block)
                    break
            return block

        new_content = re.sub(r'<url>.*?</url>', replace_lastmod, content, flags=re.DOTALL)
        
        with open("sitemap.xml", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("  Zaktualizowano daty w sitemap.xml")

    # --- Obrazy ---
    print("\n[IMG] Konwersja PNG do WebP...")
    png_files = glob.glob("screens/*.png")
    for png_img in png_files:
        png_img = png_img.replace("\\", "/")
        path = Path(png_img)
        base_name = path.stem
        out_webp = str(path.with_suffix(".webp")).replace("\\", "/")
        
        print(f"  Konwersja {base_name}.png -> {base_name}.webp...")
        if run_cmd(f'npx --yes sharp-cli -i "{png_img}" -o "{out_webp}" -q 80 -f webp'):
            os.remove(png_img)
            print(f"  Usunięto {base_name}.png")
        else:
            success = False

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
