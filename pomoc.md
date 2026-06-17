# Pomoc | TIMEFLOW

> Centrum pomocy TIMEFLOW: quick start, dashboard, sesje, projekty, AI, dane, daemon i ustawienia.

Source: https://timeflow.conceptfab.com/pomoc.html

Pomoc

## Centrum pomocy *TIMEFLOW.*

**TIMEFLOW** to desktopowy time tracker, który działa w tle i nie przeszkadza w pracy. Zamiast ręcznie wpisywać godziny, dostajesz automatyczne śledzenie okien, procesów i plików — apka sama dopasowuje czas do właściwych projektów. Niżej znajdziesz przewodnik po wszystkich sekcjach: quick start, dashboard, sesje, projekty, wyceny, aplikacje, analiza czasu, AI, dane, daemon i ustawienia.

[← Wróć na stronę główną](./index.html)

Pomysł / kreacja / realizacja: CONCEPTFAB Wszystkie prawa zastrzeżone

O oprogramowaniu

## Automatyczny tracking, lokalne *AI i prywatność.*

**TIMEFLOW** to desktopowy time tracker, który działa w tle i nie przeszkadza w pracy. Zamiast ręcznie wpisywać godziny, dostajesz automatyczne śledzenie okien, procesów i plików — apka sama dopasowuje czas do właściwych projektów.

### Automatyczne śledzenie

Daemon TIMEFLOW śledzi, w jakich aplikacjach i plikach pracujesz — sam, bez klikania.

Tracking

### Inteligentna kategoryzacja

Lokalny silnik ML uczy się Twoich nawyków — wszystko zostaje na komputerze, nic nie leci do chmury.

AI

### Analiza finansowa

Od razu widzisz ile warta jest Twoja praca — stawki, mnożniki i wyceny w jednym miejscu.

Finanse

### Prywatność i lokalność

Twoje dane to Twoje dane. Wszystko siedzi lokalnie w SQLite — nikt nie ma do nich dostępu.

Prywatność

Uruchom samouczek Szybki Start →

Przewodnik po sekcjach

## Quick Start, Dashboard, Sesje i *Projekty.*

Od pierwszego uruchomienia po codzienną pracę z listami sesji i strukturą projektów.

### Szybki start

Szybki setup TIMEFLOW — od instalacji do pierwszego uruchomienia. Samouczek przeprowadzi Cię krok po kroku przez cały setup.

**Kluczowe funkcjonalności:**
- Krok po kroku: od przygotowania plików .exe po uruchomienie Daemona.
- Konfiguracja folderów projektowych i procesów aplikacji do monitorowania.
- Instrukcja pierwszego przypisywania sesji i uruchomienia lokalnego AI.
- Dostęp z ikony rakiety w sidebarze oraz z poziomu ekranu pomocy.
- Automatyczne ukrycie wskaźnika „first run” po zakończeniu samouczka.

Start

### Dashboard (panel główny)

Co się dzieje teraz — metryki, aktywność i najważniejsze liczby w jednym widoku.

**Kluczowe funkcjonalności:**
- Zintegrowane karty metryk (łączny śledzony czas, liczba aplikacji, aktywne projekty).
- Interaktywna oś czasu z widokiem godzinowym (dzisiaj) lub dziennym (dłuższe okresy).
- Zestawienie „Top 5 Projektów” oraz analiza najczęściej używanych aplikacji.
- Szybkie przełączanie zakresów czasowych: Dzisiaj, Tydzień, Miesiąc, Cały okres.
- Tryb wizualizacji Timeline – pokazuje Twoje zaangażowanie w czasie rzeczywistym.
- Powiadomienia o statusie auto-importu i ewentualnych błędach odczytu danych.
- Przycisk odświeżania synchronizujący dane bezpośrednio z pracującego Daemona.

Widok

### Sesje (Sessions)

Lista zarejestrowanych bloków pracy — z filtrami, przypisaniami i podglądem AI.

**Interpretacja widoku AI Data.** Widok „AI Data” pokazuje, dlaczego model wybrał dany projekt — skąd pewność i na czym się oparł.
- **Confidence:** jak bardzo model jest pewny swojego wyboru.
- **Evidence Count:** ile podobnych sesji wcześniej zatwierdziłeś ręcznie.
- **Score & Base Log Prob:** surowe liczby z silnika ML — diagnostyka pod maskę.
- **Matched Tokens & Context Matches:** słowa kluczowe i kontekst, na których model się oparł.
- **Penalty:** punkty ujemne — model trafił na coś niejednoznacznego.

**Kluczowe funkcjonalności:**
- Dodawanie komentarzy i notatek przez menu kontekstowe sesji.
- Mnożniki stawek (Multiplier) dla pracy o wyższej wartości.
- AI Suggestions – zatwierdzanie lub odrzucanie propozycji AI.
- Ręczne dodawanie sesji (Add Session) dla pracy poza komputerem.
- Masowe przypisywanie (Batch Assign) wielu sesji jednym kliknięciem.
- Tryby widoku: Detailed, Compact oraz AI Data.
- Sortowanie i filtrowanie po aplikacji, projekcie, dacie i czasie trwania.

Mieszane

### Projekty (Projects)

Twoje projekty, foldery i auto-detekcja nowych kandydatów z aktywności.

**Kluczowe funkcjonalności:**
- Mrożenie (Freezing) ukrywa nieaktywne projekty przy przypisywaniu sesji.
- Automatyczne mrożenie po określonej liczbie dni bez aktywności.
- Odmrażanie (Unfreeze) przywraca projekt do listy aktywnych.
- Synchronizacja folderów wykrywa nowe projekty automatycznie.
- Detekcja kandydatów sugeruje tworzenie projektów z aktywności.
- Root folders zarządzają lokalizacjami monitorowanymi przez TIMEFLOW.
- Wykluczanie (Exclude) usuwa projekt z widoku bez kasowania z bazy.
- Wyszukiwanie filtruje projekty po nazwie i ścieżce w czasie rzeczywistym.
- Zmiana koloru projektu (presety + dowolny kolor).

Organizacja

Przewodnik po sekcjach

## Wyceny, Aplikacje i analiza *czasu.*

Wartość Twojej pracy, lista monitorowanych procesów oraz wizualizacje trendów i intensywności.

### Wyceny (Estimates)

Stawki, mnożniki i wyceny — widzisz ile zarabiasz na projekcie i w jakim okresie.

**Kluczowe funkcjonalności:**
- Globalna stawka godzinowa oraz stawki specyficzne dla projektów.
- Uwzględnianie mnożników sesji w końcowej wycenie projektu.
- Wycena sesji manualnych (spotkania, telefony, praca offline).
- Analiza dochodowości projektów w czasie (miesiąc/rok).
- Wizualny podział na zarobki dzienne i tygodniowe.
- Porównywanie wartości czasu między grupami zadań.

Finanse

### Aplikacje (Applications)

Co TIMEFLOW widzi na Twoim komputerze — lista procesów, aliasy i blokowanie śledzenia.

**Kluczowe funkcjonalności:**
- Pełna lista aplikacji ze statystykami czasu aktywności.
- Aliasy aplikacji: czytelne nazwy zamiast surowych nazw procesów.
- Blokowanie śledzenia wybranych aplikacji.
- Archiwizacja danych aplikacji bez usuwania definicji.
- Bezpośrednie przypisanie aplikacji do konkretnego projektu.

Procesy

### Analiza czasu (Time Analysis)

Heatmapy, wykresy i trendy — kiedy pracujesz najintensywniej i nad czym.

**Kluczowe funkcjonalności:**
- Heatmapy aktywności – wizualizacja godzinowa i dzienna.
- Widok miesięczny z numeracją tygodni.
- Analiza intensywności – godziny największej efektywności.
- Stacked Bar Charts – udział projektów w całkowitym czasie.
- Timeline Project View – szczegółowa oś czasu zadań.

Wizualizacje

Przewodnik po sekcjach

## AI & Model, Dane, Daemon i *Ustawienia.*

Lokalny silnik ML, operacje na bazie, proces w tle i pełna konfiguracja aplikacji.

### AI & Model

Lokalny silnik ML w Rust — czyta kontekst aplikacji, porę dnia i nazwy plików. Działa 100% offline, bez zewnętrznych API. Model klasyfikacyjny ML pisany w Rust. Żadne zewnętrzne API — obliczenia i dane zostają u Ciebie na dysku.

**1. Skąd się uczy?**
- **Kontekst aplikacji:** jakie programy przypisujesz do jakich projektów.
- **Kontekst czasowy:** o której godzinie i w jaki dzień pracujesz.
- **Tokeny z nazw:** słowa kluczowe wyciągnięte z nazw plików i okien.

**2. Jak podejmuje decyzje?**
- **Confidence:** pewność od 0 do 1 (sigmoid).
- **Evidence Count:** ile wcześniejszych dowodów ma w bazie.
- **Margin:** dystans między najlepszym a drugim kandydatem.

**3. Tryby pracy**
- **Suggest:** podpowiada projekt przy niższym progu pewności.
- **Auto-Safe:** automatyzuje tylko przypadki o wysokiej pewności i mocnych dowodach.

**4. Zalecane ustawienia na start**
- **Mode: suggest** — najszybciej nauczy się na Twoich korektach.
- **Suggest Min Confidence: 0.4–0.5** — więcej podpowiedzi = szybsza nauka (próg podbijesz później).
- **Feedback Weight: 10–15** — uczy się szybko, ale się nie rozkalibruje.
- **Auto-safe Min Confidence: 0.85–0.95** i **Min Evidence: 5** — bezpieczna automatyzacja.

*Dane modelu siedzą w SQLite na dysku — z każdą Twoją korektą model się uczy i trafia coraz celniej.*

**Kluczowe funkcjonalności:**
- Tryb Auto-Safe dla bezpiecznych wsadowych przypisań.
- Rollback – cofnięcie ostatniej automatycznej paczki zmian.
- Confidence Policy – kontrola progu automatyzacji.
- Learning Center – ręczne korekty zasilają trening modelu.
- Powiadomienia o gotowości do kolejnego treningu.
- Tryby: Off, Suggest, Auto-Safe.
- Prywatność 100% – brak zewnętrznych API i brak wymogu internetu.

AI

### Dane (Data)

Import, export i porządki w bazie — backup, czyszczenie, optymalizacja.

**Kluczowe funkcjonalności:**
- Eksport ZIP całej bazy lub wybranych projektów.
- Import JSON dziennych raportów z Daemona.
- System Maintenance: czyszczenie i optymalizacja danych.
- Historia operacji na danych.
- Backup i narzędzia konserwacji SQLite.

Baza

### Daemon

Start, stop, logi i status procesu w tle, który zbiera dane o aktywności.

**Kluczowe funkcjonalności:**
- Status i diagnostyka — widzisz czy daemon działa poprawnie.
- Start, stop i restart prosto z dashboardu.
- Windows Autostart przy logowaniu do systemu.
- Logi w real-time — szybko znajdziesz, co nie gra.
- Sprawdzanie czy wersja Daemona pasuje do Dashboardu.

Proces

### Ustawienia (Settings)

Godziny pracy, gap fill, sync, demo mode, optymalizacja bazy i reszta ustawień.

**Kluczowe funkcjonalności:**
- Working Hours – godziny pracy wpływające na wizualizacje.
- Session Management – gap fill i ignorowanie krótkich bloków.
- Freeze Threshold – próg automatycznego mrożenia projektów.
- Online Sync – URL, User ID, Token dla synchronizacji z serwerem.
- Demo Mode do bezpiecznego testowania.
- Auto Optimize DB i ręczne uruchamianie optymalizacji.
- Emergency Clear – awaryjne czyszczenie bazy i ustawień.
- Appearance & Performance – kontrola animacji i responsywności UI.

Konfiguracja

Samouczek

## Szybki *Start.*

Poniżej szybki plan — od uruchomienia apki po pierwsze przypisania i trening AI.

### Step 1 — Przygotowanie plików

Wrzuć **timeflow-dashboard.exe** i **timeflow-demon.exe** do jednego folderu i odpal dashboard.

Step 1

### Step 2 — Konfiguracja projektów

W **Projects** wskaż folder nadrzędny — każdy podfolder staje się osobnym projektem.

Step 2

### Step 3 — Dodawanie aplikacji

W **Applications** dodaj procesy do monitorowania (np. figma.exe) i nadaj im czytelne aliasy.

Step 3

### Step 4 — Uruchomienie Daemona

W **Daemon** odpal proces i włącz autostart — od teraz tracking chodzi w tle.

Step 4

### Step 5 — Przypisywanie sesji

W **Dashboard** prawym klikiem przypisz nieprzypisane sesje do właściwych projektów.

Step 5

### Step 6 — Szkolenie AI

Parę ręcznych przypisań w **AI & Model** wystarczy, żeby model zaczął sam podpowiadać projekty.

Step 6

Gotowe. TIMEFLOW działa i uczy się Twoich wzorców z każdą korektą.

[Dołącz do testów beta →](./index.html#beta) [Wróć na stronę główną →](./index.html)
