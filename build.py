import os
import subprocess
import glob

def run_command(command):
    try:
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Błąd podczas wykonywania: {command}")

def get_size(path):
    return os.path.getsize(path) if os.path.exists(path) else 0

def main():
    print("=== TIMEFLOW build (Python) ===")

    # --- CSS ---
    if os.path.exists("styles.css"):
        print("\n[CSS] Minifikacja styles.css -> styles.min.css")
        size_before = get_size("styles.css")
        run_command("npx --yes lightningcss-cli --minify styles.css -o styles.min.css")
        print(f"  {size_before} -> {get_size('styles.min.css')} bytes")

    # --- JS ---
    js_files = [
        ("script.js", "script.min.js"),
        ("en/script.js", "en/script.min.js"),
        ("consent.js", "consent.min.js")
    ]

    for src, out in js_files:
        if os.path.exists(src):
            print(f"[JS] Minifikacja {src} -> {out}")
            size_before = get_size(src)
            run_command(f"npx --yes terser {src} -o {out} --compress --mangle")
            print(f"  {size_before} -> {get_size(out)} bytes")

    # --- Obrazy ---
    print("\n[IMG] Generowanie wariantów obrazów...")
    run_command("python screens/generate_variants.py")

    print("\n=== Build zakończony ===")

if __name__ == "__main__":
    main()
