import ftplib
import os
import sys

try:
    import ftp_config
except ImportError:
    print("BŁĄD: Brak pliku konfiguracyjnego ftp_config.py")
    print("Skopiuj plik ftp_config.sample.py, zmień nazwę na ftp_config.py i uzupełnij go.")
    sys.exit(1)

# Konfiguracja lokalna
LOCAL_DIR = "."  # Katalog ze stroną (uruchamiamy skrypt wewnątrz c:\_cloud\__cfab_demon\__page)

# Pliki i foldery do pominięcia (nie wysyłamy np. ukrytych katalogów git, plików py itp.)
IGNORE_LIST = ['.git', '.vscode', '__pycache__', 'build.py', 'deploy.py', 'ftp_config.py', '.antigravityignore', '.md']

def should_ignore(path):
    for ignore in IGNORE_LIST:
        if ignore in path:
            return True
    return False

def upload_directory(ftp, local_path, remote_path):
    print(f"-> Tworzenie katalogu na FTP: {remote_path}")
    try:
        ftp.mkd(remote_path)
    except ftplib.error_perm:
        # Katalog docelowy prawdopodobnie już istnieje
        pass
    
    for item in os.listdir(local_path):
        local_item_path = os.path.join(local_path, item)
        remote_item_path = f"{remote_path}/{item}"
        
        if should_ignore(local_item_path):
            continue
            
        if os.path.isfile(local_item_path):
            print(f"Wysyłanie: {local_item_path} do {remote_item_path}")
            with open(local_item_path, 'rb') as f:
                ftp.storbinary(f'STOR {remote_item_path}', f)
        elif os.path.isdir(local_item_path):
            upload_directory(ftp, local_item_path, remote_item_path)

def main():
    print(f"Łączenie z serwerem FTP: {ftp_config.FTP_HOST}...")
    try:
        ftp = ftplib.FTP(ftp_config.FTP_HOST)
        ftp.login(ftp_config.FTP_USER, ftp_config.FTP_PASS)
        print("Połączono pomyślnie.")
        
        # Zmiana katalogu początkowego, jeśli trzeba założyć w nim podkatalogi
        try:
            ftp.cwd(ftp_config.FTP_DIR)
            print(f"Zmieniono katalog docelowy na: {ftp_config.FTP_DIR}")
        except ftplib.error_perm:
            print(f"Katalog docelowy {ftp_config.FTP_DIR} może nie istnieć. Wgrywanie z utworzeniem struktury...")
            
        print("Rozpoczynanie transferu z katalogu lokalnego...")
        upload_directory(ftp, LOCAL_DIR, ftp_config.FTP_DIR)
        
        ftp.quit()
        print("Transfer zakończony sukcesem. Rozłączono.")
    except Exception as e:
        print(f"Błąd transferu FTP: {e}")

if __name__ == "__main__":
    main()
