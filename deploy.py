import ftplib
import os
import sys
import subprocess
import urllib.request
import time

try:
    import ftp_config
except ImportError:
    print("BŁĄD: Brak pliku konfiguracyjnego ftp_config.py")
    print("Skopiuj plik ftp_config.sample.py, zmień nazwę na ftp_config.py i uzupełnij go.")
    sys.exit(1)

# Konfiguracja lokalna
LOCAL_DIR = "."

# Pliki i foldery do pominięcia przy uploadzie
IGNORE_LIST = [
    '.git', '.vscode', '.claude', '__pycache__',
    'build.py', 'deploy.py', 'ftp_config.py', 'ftp_config.sample.py',
    '.antigravityignore', '.md', '.py',
    'node_modules', 'docs',
]

# URL strony do weryfikacji po deploy
SITE_URL = "https://timeflow.conceptfab.com/"


def should_ignore(path):
    """Sprawdź czy plik/folder powinien być pominięty."""
    for ignore in IGNORE_LIST:
        if ignore in path:
            return True
    return False


def get_local_files(local_dir):
    """Zwróć zbiór ścieżek plików lokalnych (relatywnych)."""
    files = set()
    for root, dirs, filenames in os.walk(local_dir):
        # Filtruj ignorowane katalogi
        dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d))]
        for f in filenames:
            local_path = os.path.join(root, f)
            if should_ignore(local_path):
                continue
            # Normalizuj do ścieżki relatywnej z forward slashami
            rel = os.path.relpath(local_path, local_dir).replace("\\", "/")
            files.add(rel)
    return files


def get_remote_files(ftp, remote_dir):
    """Rekurencyjnie zbierz ścieżki plików na serwerze FTP (relatywne do remote_dir)."""
    files = set()
    dirs_to_scan = [""]

    while dirs_to_scan:
        current = dirs_to_scan.pop()
        full_path = f"{remote_dir}/{current}".rstrip("/")
        entries = []
        try:
            ftp.cwd(full_path)
            ftp.retrlines("LIST", entries.append)
        except ftplib.error_perm:
            continue

        for entry in entries:
            parts = entry.split(None, 8)
            if len(parts) < 9:
                continue
            name = parts[8].strip()
            if name in (".", ".."):
                continue
            rel = f"{current}/{name}".lstrip("/") if current else name
            if entry.startswith("d"):
                dirs_to_scan.append(rel)
            else:
                files.add(rel)

    return files


def remove_remote_file(ftp, remote_dir, rel_path):
    """Usuń plik z serwera FTP."""
    full = f"{remote_dir}/{rel_path}"
    try:
        ftp.delete(full)
        return True
    except ftplib.error_perm:
        return False


def remove_empty_dirs(ftp, remote_dir, rel_dirs):
    """Próbuj usunąć puste katalogi (od najgłębszych)."""
    sorted_dirs = sorted(rel_dirs, key=lambda d: d.count("/"), reverse=True)
    for d in sorted_dirs:
        full = f"{remote_dir}/{d}"
        try:
            ftp.rmd(full)
        except ftplib.error_perm:
            pass  # Katalog nie jest pusty lub nie istnieje


def upload_file(ftp, local_path, remote_path):
    """Wyślij pojedynczy plik na FTP, tworzac katalogi w razie potrzeby."""
    # Upewnij się, że katalog docelowy istnieje
    remote_dir = "/".join(remote_path.split("/")[:-1])
    if remote_dir:
        ensure_remote_dir(ftp, remote_dir)

    with open(local_path, 'rb') as f:
        ftp.storbinary(f'STOR {remote_path}', f)


def ensure_remote_dir(ftp, remote_dir):
    """Utwórz katalog na FTP (rekurencyjnie)."""
    parts = remote_dir.split("/")
    current = ""
    for part in parts:
        current = f"{current}/{part}" if current else part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass  # Już istnieje


def verify_site(url, timeout=15):
    """Sprawdź czy strona odpowiada HTTP 200."""
    try:
        req = urllib.request.Request(url, method="HEAD")
        req.add_header("User-Agent", "TIMEFLOW-Deploy/1.0")
        resp = urllib.request.urlopen(req, timeout=timeout)
        return resp.status
    except Exception as e:
        return str(e)


def main():
    start_time = time.time()

    # ─── KROK 1: BUILD ───
    print("=" * 60)
    print("  KROK 1/4 — BUILD")
    print("=" * 60)
    result = subprocess.run([sys.executable, "build.py"], cwd=LOCAL_DIR)
    if result.returncode != 0:
        print("\n✗ Build nie powiódł się. Deploy przerwany.")
        sys.exit(1)
    print("\n✓ Build zakończony pomyślnie.\n")

    # ─── KROK 2: UPLOAD ───
    print("=" * 60)
    print("  KROK 2/4 — UPLOAD NA FTP")
    print("=" * 60)
    print(f"Łączenie z {ftp_config.FTP_HOST}...")

    try:
        ftp = ftplib.FTP(ftp_config.FTP_HOST, timeout=30)
        ftp.login(ftp_config.FTP_USER, ftp_config.FTP_PASS)
    except Exception as e:
        print(f"\n✗ Nie udało się połączyć z FTP: {e}")
        sys.exit(1)

    print("✓ Połączono.\n")
    remote_dir = ftp_config.FTP_DIR.rstrip("/")

    local_files = get_local_files(LOCAL_DIR)
    print(f"Pliki lokalne do wysłania: {len(local_files)}")

    uploaded = 0
    errors = 0
    for rel in sorted(local_files):
        local_path = os.path.join(LOCAL_DIR, rel.replace("/", os.sep))
        remote_path = f"{remote_dir}/{rel}"
        try:
            upload_file(ftp, local_path, remote_path)
            print(f"  ↑ {rel}")
            uploaded += 1
        except Exception as e:
            print(f"  ✗ {rel} — {e}")
            errors += 1

    print(f"\n✓ Wysłano {uploaded} plików" + (f" ({errors} błędów)" if errors else "") + ".\n")

    # ─── KROK 3: PORZĄDKI ───
    print("=" * 60)
    print("  KROK 3/4 — PORZĄDKI NA SERWERZE")
    print("=" * 60)
    print("Skanowanie plików na serwerze...")

    remote_files = get_remote_files(ftp, remote_dir)
    orphans = remote_files - local_files
    # Nie usuwaj plików, które byłyby ignorowane lokalnie (np. .htaccess jest wysyłany)
    # Filtruj tylko pliki, które kiedyś były częścią projektu
    orphans_to_remove = set()
    for orphan in orphans:
        # Zachowaj pliki serwera, których nie zarządzamy (logi, pliki PHP hostingu itp.)
        # Usuwaj tylko pliki w znanych katalogach projektu
        known_dirs = ("fonts/", "screens/", "icons/", "en/")
        known_extensions = (".css", ".js", ".html", ".webp", ".avif", ".woff2", ".png", ".ico", ".svg")
        is_root_asset = "/" not in orphan and any(orphan.endswith(ext) for ext in known_extensions)
        is_in_known_dir = any(orphan.startswith(d) for d in known_dirs)
        if is_root_asset or is_in_known_dir:
            orphans_to_remove.add(orphan)

    if orphans_to_remove:
        print(f"Znaleziono {len(orphans_to_remove)} osieroconych plików do usunięcia:\n")
        removed = 0
        for orphan in sorted(orphans_to_remove):
            if remove_remote_file(ftp, remote_dir, orphan):
                print(f"  ✗ {orphan}")
                removed += 1
            else:
                print(f"  ? {orphan} — nie udało się usunąć")

        # Spróbuj wyczyścić puste katalogi
        orphan_dirs = set()
        for orphan in orphans_to_remove:
            parts = orphan.split("/")
            for i in range(1, len(parts)):
                orphan_dirs.add("/".join(parts[:i]))
        if orphan_dirs:
            remove_empty_dirs(ftp, remote_dir, orphan_dirs)

        print(f"\n✓ Usunięto {removed} osieroconych plików.\n")
    else:
        print("✓ Brak osieroconych plików — serwer czysty.\n")

    ftp.quit()

    # ─── KROK 4: WERYFIKACJA ───
    print("=" * 60)
    print("  KROK 4/4 — WERYFIKACJA")
    print("=" * 60)

    urls_to_check = [
        SITE_URL,
        f"{SITE_URL}en/",
        f"{SITE_URL}screens/dashboard-main.avif",
    ]

    all_ok = True
    for url in urls_to_check:
        status = verify_site(url)
        if status == 200:
            print(f"  ✓ {url} — HTTP {status}")
        else:
            print(f"  ✗ {url} — {status}")
            all_ok = False

    elapsed = time.time() - start_time

    # ─── RAPORT ───
    print("\n" + "=" * 60)
    if all_ok and errors == 0:
        print(f"  ✓ DEPLOY ZAKOŃCZONY POMYŚLNIE ({elapsed:.1f}s)")
    elif all_ok:
        print(f"  ⚠ DEPLOY ZAKOŃCZONY Z OSTRZEŻENIAMI ({elapsed:.1f}s)")
    else:
        print(f"  ✗ DEPLOY — BŁĘDY WERYFIKACJI ({elapsed:.1f}s)")
    print("=" * 60)


if __name__ == "__main__":
    main()
