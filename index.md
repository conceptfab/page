# TIMEFLOW | Desktopowy time tracker dla freelancerów (beta)

> Desktopowy time tracker dla freelancerów. Tracking w tle, lokalne AI, sync LAN i online, sesje manualne, wyceny i raporty — dane zostają u Ciebie. Zgłoś się do bety.

Source: https://timeflow.conceptfab.com/

Algorytm Uczciwego Czasu

# Czas liczony
*uczciwie.*

Pracujesz w kilku aplikacjach naraz. TIMEFLOW deduplikuje multitasking i dzieli każdą sekundę sprawiedliwie między projekty — Twój realny czas, nie zawyżone statystyki.

Figma Photoshop Blender →1 realna godzina · podział 42 / 35 / 23
Poproś o dostęp do bety →

Dla kogo działa najlepiej

## Nie tylko mierzy czas — pomaga go *ogarnąć.*

Projektanci skaczą między Figmą, Photoshopem, przeglądarką i komunikatorem po kilkadziesiąt razy dziennie. TIMEFLOW porządkuje ten chaos i odzyskuje kontekst, którego sam byś nie odtworzył.

01

### Grafik / Brand Designer

Rozliczasz czas z klientami bez wpisywania czegokolwiek ręcznie — nawet gdy skaczesz między kilkoma apkami i folderami naraz.

projekty po folderach sesje nieprzypisane estymacje wartości

02

### UI/UX / Product Designer

Od razu widać, co zjada czas w danym tygodniu — research, makiety, iteracje czy konsultacje — heatmapa i trendy gotowe bez klikania.

dashboard + analiza CSV export manualne sesje

03

### Freelancer poza designem

TIMEFLOW sprawdzi się wszędzie tam, gdzie rozliczasz czas z klientem — w development, montażu, konsultingu, pisaniu.

AI sugeruje przypisania backup i import sync online

Jak to działa

## Od surowych sesji do gotowego *rozliczenia.*

Automatyczny tracking + ręczna kontrola tam, gdzie trzeba. Dokładność bez klikania przez cały dzień.

1

### Zbieranie danych

Daemon zbiera dane w tle, a dashboard ściąga je przy starcie i odświeża sesje z dnia.
- daemon status + autostart
- auto-import przy starcie
- archiwum plików z importu

2

### Porządkowanie i przypisania

Zakładasz projekty, przypisujesz apki, akceptujesz lub odrzucasz sugestie AI — ręcznie poprawiasz tylko to, co musi być poprawione.
- projekty + foldery + kandydaci
- AI suggest / auto_safe / rollback
- merge sesji według ustawionego gapu

3

### Analiza, wycena i backup

Na koniec masz dashboard z metrykami, wycenę godzin i narzędzia do eksportu, importu i synca między maszynami.
- heatmapa + wykresy
- estimated value per project + mnożnik sesji
- JSON export/import + online sync

Co TIMEFLOW robi już teraz

## Realne funkcje, *nie lista życzeń.*

Wszystko poniżej realnie działa w apce — auto-import, sesje, sugestie AI, sync online i kontrola demona. Nie lista życzeń, a gotowy software.

Tracking Core

### Monitoring czasu + Algorytm Uczciwego Czasu

Daemon zbiera dane w tle i matematycznie deduplikuje aktywność — multitasking nie pompuje godzin Twojemu klientowi.
- zero "podwójnego liczenia" (Unique Time)
- zasada Fair Share — podział sekund między projekty
- auto refresh + wykrywanie zmian plików
- status importu i automatyczna archiwizacja

Dashboard

### Widok dnia, tygodnia, miesiąca i all-time

Metryki, top projekty, top aplikacje, timeline i ostrzeżenie jeśli coś jest nieprzypisane.
- metryki: total, avg daily, apps, projects
- project timeline + project day timeline
- własny zakres dat (custom range) obok dzień/tydzień/miesiąc
- manualne sesje z poziomu osi czasu

Projects

### Projekty oparte o foldery i auto-detekcję

Projekt = folder. Auto-detekcja kandydatów z aktywności i sync subfolderów — nie musisz nic konfigurować przy nowym zleceniu.
- Project Folders (roots) + browse folder
- Mrożenie (Freezing) i auto-freezing nieużywanych zadań
- Folder Project Candidates + szybkie Create
- Detected Projects i Exclude (ukrywanie projektów)

Sessions

### Ręczne porządkowanie sesji bez chaosu

Sesje pogrupowane po projektach, zakres dzienny lub tygodniowy — prawym klikiem przypisujesz, odpinasz albo usuwasz wpis bez wychodzenia z widoku.
- filtry projektu + fokus z dashboardu
- prawy klik do przypisywania / odpinania / notatek
- mnożniki stawek (Multiplier) x2 i własne
- manualne dodawanie sesji (spotkania, telefony)
- widoki Detailed (pliki) vs Compact (sesje)

AI & Model

### AI sugestie przypisań + tryb auto_safe

Lokalny silnik ML w Rust czyta kontekst apki, porę dnia i tokeny z nazw plików i okien (najsilniejszy sygnał). 100% offline — żadnych zewnętrznych API, żadnego ChatGPT.
- Learning Center: model uczy się na Twoich korektach
- tryby: Suggest (podpowiedzi) i Auto-Safe (automatyzacja)
- Confidence Policy: parametry Confidence, Evidence i Margin
- Training reminder po zebraniu nowej wiedzy

Analysis

### Analityka i Proof of Work (dowód pracy)

Statystyki to nie tylko liczby — za każdą sekundą stoi konkretna historia plików. Masz dowód pracy, jeśli klient pyta o szczegóły.
- precyzyjny podgląd sesji i plików
- heatmapa aktywności (godzinowa i dzienna)
- analiza intensywności i najefektywniejszych godzin
- własny zakres dat na heatmapie i wykresach
- eksport do CSV dla zewnętrznych arkuszy

Estimates

### Estymacje wartości pracy dla freelancerów

Globalną stawkę ustawiasz raz, nadpisujesz per projekt albo dodajesz mnożnik do konkretnej sesji — wartość pracy za wybrany zakres widzisz od razu.
- global hourly rate + project overrides
- mnożnik stawki dla wybranej sesji i manualne wyceny
- analiza dochodowości projektów (widok miesięczny/roczny)
- estimated value per project + zarobki dzienne
- wycena dla dowolnego zakresu dat (custom range)
- zaokrąglanie czasu (interwały 5–60 min, warianty raportu)
- podgląd wartości czasu poświęconego na grupy zadań

Data & Sync

### Import/export, sync LAN i online

JSON export całości albo wybranego projektu, import z walidacją i podglądem konfliktów, sync peer-to-peer w sieci lokalnej, delta sync online albo transfer USB — dane pod Twoją kontrolą.
- ZIP Export całej bazy lub wybranych projektów
- Maintenance: czyszczenie i optymalizacja bazy SQLite
- sync LAN peer-to-peer (bez chmury i kont) + parowanie kodem
- WebUI: cały dashboard w przeglądarce telefonu (sieć lokalna)
- import z walidacją i podglądem konfliktów
- validate import + summary po imporcie
- backup/export all lub single project
- startup sync + interval sync + status/ACK

Daemon & Ops

### Kontrola demona, logi i autostart

Start, stop i restart demona prosto z apki, logi na żywo i status zbierania danych. Minimalny ślad systemowy — nie spowalnia sprzętu w codziennej pracy.
- start / stop / restart daemon
- logi z auto-refresh i status PID
- konfiguracja Working Hours i Session Management (Gap Fill)
- autostart + niskie wymagania do monitoringu w tle

Menedżer projektów

### Projekty z budżetem, terminem i strukturą folderów

Osobny moduł PM obok automatycznego trackingu — zakładasz projekty z budżetem i deadlinem, generujesz drzewo folderów z szablonu i łączysz je ze śledzonym czasem.
- auto-numeracja, status (aktywny/nieaktywny/archiwalny), budżet i termin
- drzewo folderów na dysku z szablonów ({name}) + menedżer szablonów
- TF Match — budżet i termin obok realnie zmierzonego czasu
- filtry (rok, klient, status), sortowanie i zapisywany widok

Klienci

### Czas i wartość per klient

Panel klientów agreguje czas i szacowaną wartość każdego kontrahenta, a w Wycenach filtrujesz raport po wybranych klientach.
- karty klientów: wartość, liczba projektów, zmierzony czas
- zarządzanie listą (dodaj / edytuj / archiwizuj) + przypisanie do projektów
- auto-tworzenie klientów z nazw projektów
- filtr po kliencie w Wycenach (multi-select)

WebUI / dostęp z telefonu

### Cały dashboard w przeglądarce

Tryb headless serwuje pełny interfejs TIMEFLOW w przeglądarce — ten sam dashboard otwierasz z telefonu lub innego urządzenia w sieci lokalnej, bez okna aplikacji.
- praktycznie cały dashboard z telefonu (przeglądanie i edycja)
- responsywny layout mobilny + ustawienia wspólne z desktopem
- localhost bez hasła, LAN po 6-cyfrowym kodzie (port 47892)
- tylko zaufana sieć lokalna (nieszyfrowane HTTP)

Algorytm Uczciwego Czasu (Unique Project Time)

## Twój realny czas to nie *zawyżone statystyki.*

Większość trackerów robi ten sam błąd — sumuje czas każdej otwartej apki osobno, sztucznie pompując statystyki (3 godziny „pracy" w jednej godzinie zegarowej). TIMEFLOW deduplikuje multitasking i pokazuje Twój realny czas.

✕ Inne trackery

1 godzina pracy, 3 aplikacje otwarte naraz. Każda liczona osobno przez całą tę samą godzinę:

Figma · +1h

Photoshop · +1h

Blender · +1h

3h 00m

naliczone za 1 godzinę zegarową pracy

→

✓ TIMEFLOW

42%

35%

23%

Każda sekunda uwagi podzielona proporcjonalnie. Suma nigdy nie przekracza realnego czasu.

1h 00m

realny czas: 1h, podzielony 42 / 35 / 23 między projekty

To **Twoje prawdziwe dane** — do wycen, faktur i własnej kontroli. Co z nich powiesz klientowi, to Twoja decyzja.

### Zero "podwójnego liczenia"

Inne trackery liczą multitasking osobno (3h pracy w 1h zegarowej). TIMEFLOW deduplikuje.
- Automatyczna deduplikacja multitaskingu
- Nalicza tylko unikalne minuty nad projektem
- Najbardziej "fair" podejście na rynku

Ochrona przed zawyżaniem

### Matematyczna precyzja podziału

Backend w Rust dzieli sekundy uczciwie między projekty, kiedy używasz wielu narzędzi naraz.
- Sprawiedliwy podział każdej sekundy uwagi
- Suma czasów nigdy nie przekracza realnego czasu
- Klient płaci za czas, nie za otwarte okna

Sprawiedliwy podział

### Algorytm czasu, który wybierasz

Sposób liczenia czasu ustawiasz w aplikacji — dziś to Algorytm Uczciwego Czasu (wall-clock z deduplikacją). Architektura jest gotowa na kolejne metody, a zmiana przelicza dane z surowych sesji, niczego nie nadpisując.
- wybór metody liczenia czasu w Ustawieniach
- architektura pluggable — gotowa na kolejne algorytmy
- zmiana metody nie zmienia Twoich danych (przelicza z surowych sesji)

Wybór metody liczenia

### Przejrzystość dowodowa

Za każdą sekundą stoi historia plików — jeśli klient pyta o szczegóły, masz dowód.
- Precyzyjny podgląd sesji i plików
- Wyklucza przypadkowe naliczanie czasu
- Brak liczenia social mediów poza projektami

Dowód pracy

### Prywatność i lokalna wiarygodność

Dane przetwarzane lokalnie w SQLite — nikt nie manipuluje statystykami "w chmurze".
- 100% lokalne przetwarzanie danych
- Ty kontrolujesz dostęp do raportów

Lokalna wiarygodność

### Realne zaangażowanie

Czas unikalny, a nie czas "procesorowy" aplikacji.
- Czas pracy jest mierzony w sposób uczciwy
- Brak naliczania czasu za otwarte okna

Wartość dla klienta

### Pełna transparentność

Koniec dyskusji o stawkach — masz twarde dane, które mówią same za siebie.
- Dokładne dane o czasie pracy
- Brak manipulacji statystykami

Transparentność

Interfejs TIMEFLOW

## Dashboard, projekty, sesje i analityka w jednym *workflow.*

Główny widok pokazuje dashboard pracy. Poniżej najważniejsze moduły, które budują codzienny workflow freelancera: Projects, Sessions, Analysis, Estimates i AI.

Projects · foldery + statusy

Sessions · sesje + przypisania

Time Analysis · wykresy + heatmapa

Estimates · stawki + mnożniki + wyceny

AI & Model · sugestie + model

Platformy i status

## Desktop-first dziś. Więcej *jutro.*

Obecna wersja to stabilny desktop workflow i testy beta z realnymi użytkownikami. Nowe platformy wchodzą dopiero, gdy są zrobione porządnie.

### Windows

Desktop app + proces w tle + dashboard + zarządzanie importem i logami.
Dostępne

### macOS

Pełne wsparcie desktopowe dla użytkowników Apple — z demonem, dashboardem i natywnym monitoringiem aktywności.
Dostępne

### Linux

Desktop tracking dla użytkowników własnych środowisk — bez kompromisów.
Planowane

### Aplikacja mobilna

Natywna aplikacja mobilna jest w planach — ale cały dashboard otworzysz z telefonu już teraz przez WebUI (przeglądarka, sieć lokalna).
Planowane

Stack technologiczny

## Natywna aplikacja, nie web-app *w okienku.*

Lekki ślad i minimalne wymagania to projekt, nie przypadek. Rust na backendzie, oddzielny daemon i lokalna SQLite — szybki start i pełna kontrola nad plikami, bez ciężkiego runtima w tle.

### Rust + Tauri 2

Lekki runtime desktopowy, szybki start i natywna kontrola nad plikami i procesami — bez ciężkiego narzutu, jaki znasz z Electrona.
- lepsza wydajność pod monitoring i pracę w tle
- natywna integracja z systemem, plikami i procesami
- mocna baza pod Windows i macOS, kolejne platformy desktop w drodze

Core

### SQLite lokalnie (rusqlite, bundled)

Lokalna baza **SQLite** działa od razu po instalacji (`bundled`) — zero dodatkowego setupu, od pierwszego uruchomienia masz gotowy workflow.
- local-first: dane i dashboard dostępne od ręki
- szybki odczyt sesji, projektów i analityki
- backup oraz import/export danych bez kombinowania

Dane

### React 19 + TypeScript + Vite

Dashboard rozwijany niezależnie od backendu — nowe widoki, analityka i panele iterowane szybko.
- szybka iteracja funkcji i ekranów dashboardu
- czytelne wykresy i analityka (Recharts)
- stabilny UI stack (Zustand / Radix / Tailwind)

UI

### Daemon w Rust

Daemon w **Rust** ciągnie pipeline danych niezależnie od UI — dashboard to interfejs do pracy, a zbieranie aktywności chodzi sobie w tle.
- kontrola start / stop / restart z UI
- logi i status procesu
- archiwizacja plików i auto-import workflow
- autostart i monitoring w tle przy niskim narzucie

Proces

### Stability Engine

Trzy biblioteki pilnują, żeby dane się zgadzały — poprawne czasy, stabilny import/export i przewidywalne zadania w tle.
- Serde / serde_json: stabilny import/export i kontrakty danych
- Chrono: poprawne zakresy dat, sesje i rozliczenia czasu
- Tokio: timery, zadania cykliczne i operacje w tle

Stabilność

### Next.js sync server

Serwer na **Next.js** koordynuje sync między urządzeniami — local-first pozostaje podstawą.
- delta sync i pełna synchronizacja między urządzeniami
- API push / pull / ack / status
- fundament pod mobile i funkcje współdzielenia

Sync

Roadmapa

## Menedżer projektów już działa — co *dalej.*

Fundament i menedżer projektów są na miejscu: projekty z budżetem, klienci, foldery, sync i monitoring czasu. Kolejne kroki to raporty-załączniki, archiwizacja plików i współpraca.

Teraz / Beta

### Tracking, menedżer projektów i klienci

TIMEFLOW obsługuje monitoring czasu, projekty oparte o foldery, menedżer projektów (PM) z budżetami i klientami, manualne sesje, estymacje, AI sugestie, import/export i sync LAN/online.
- tracking, sesje i analiza
- tracking i sesje
- menedżer projektów (budżet, status, foldery) + klienci
- projekty + folder roots
- AI suggestion / auto-safe
- export/import + sync LAN i online
- export/import + sync online

Następna wersja / Kierunek rozwoju

### Raporty-załączniki i archiwizacja projektów

Generowanie raportów z sesjami jako załącznik do faktury i archiwizacja plików projektowych — domknięcie obiegu od czasu do rozliczenia.
- raporty z sesjami (PDF / CSV do faktury)
- archiwizacja plików projektowych
- presety drzewa folderów per pipeline
- dedykowane foldery projektu
- customowe drzewo folderów (template/presety)
- szybsze zakładanie i organizowanie projektów

Kolejne rozszerzenia

### Współdzielenie, współpraca i nowe platformy

Udostępnianie danych i raportów, praca zespołowa oraz kolejne platformy desktop i mobile.
- kolejne metody liczenia czasu (architektura pluggable)
- udostępnianie / współpraca zespołowa
- głębsza integracja struktury projektu z czasem
- głębsza integracja z monitoringiem czasu
- Linux i aplikacja mobilna (roadmapa)

Zaufanie i kontakt

## Kto stoi za TIMEFLOW i jak wygląda *beta.*

Wczesna wersja produktu od CONCEPTFAB. Beta jest po to, żeby iterować na realnych workflowach freelancerów i małych studiów — nie po to, żeby zbierać maile i nigdy się nie odezwać.

### O projekcie

TIMEFLOW to desktop-first time tracker do pracy rozliczanej z klientami. Priorytet: lekkość, lokalne dane i szybki workflow bez ręcznego wpisywania godzin.
- tworzone przez CONCEPTFAB
- feedback z bety wpływa bezpośrednio na roadmapę
- komunikacja przez formularz i follow-up mailowy

### Jak działa dostęp do bety

Po zgłoszeniu pytamy o kontekst pracy (branża, potrzeby), a potem wracamy z info o buildzie i kolejnych krokach. Priorytetyzujemy ludzi, którzy realnie rozliczają czas z klientami.
- krótki formularz zamiast długiego onboardingu
- potwierdzenie po wysłaniu zgłoszenia
- dostęp do builda według kolejności i dopasowania

Aktualizacje produktu

## TIMEFLOW 0.1.6 *już dostępny.*

Najnowszy build dokłada własny zakres dat, dostęp mobilny przez WebUI i wzmocnione bezpieczeństwo synchronizacji — obok zmian w Sessions, AI, Daemon i Settings. Pełna historia zmian (z 0.1.5 włącznie) jest na osobnej podstronie.

Nowe funkcje Usprawnienia Naprawione błędy

### Pełny changelog 0.1.6 (z archiwum 0.1.5)

Kompletna lista zmian pogrupowana po modułach, z ikonami i w układzie Help/Pomoc.
[Zobacz pełny changelog 0.1.6 →](./aktualizacje.html)

FAQ

## Najczęstsze pytania przed zgłoszeniem do *bety.*

Krótkie odpowiedzi na najważniejsze kwestie: platformy, dane, koszt i przebieg testów.

Jak działa Algorytm Uczciwego Czasu?

Inne programy często sumują czas każdej otwartej aplikacji (np. 3h pracy w ciągu 1h zegarowej). TIMEFLOW deduplikuje multitasking i sprawiedliwie dzieli sekundy między projekty (Fair Share). Dzięki temu statystyki są w 100% uczciwe zarówno dla Ciebie, jak i Twojego klienta.
Czy TIMEFLOW działa offline?

Tak. Dane są przechowywane lokalnie na urządzeniu, a synchronizacja online jest opcjonalna.
Kto jest priorytetem w testach beta?

Głównie freelancerzy i małe studia rozliczające czas z klientami, ale formularz jest otwarty także dla innych branż.
Na jakiej platformie działa obecna beta?

Beta działa na Windows i macOS. W roadmapie są Linux i aplikacja mobilna.
Czy beta jest płatna?

Nie. Obecne testy beta są bezpłatne i służą zbieraniu feedbacku do kolejnych iteracji.

Zgłoś się do testów beta

## Pomóż zbudować TIMEFLOW pod realny workflow *freelancerów.*

Szukamy głównie grafików — ale drzwi są otwarte dla każdego, kto rozlicza czas z klientami. Twój feedback kształtuje roadmapę: co przeszkadza, co przyspiesza, czego brakuje.

**Na czym nam zależy** prawdziwe przypadki użycia, bałagan projektowy, rozliczenia z klientami

**Co dostajesz** build w 48h od weryfikacji, Twoje feature requesty prosto do backlogu, szybkie iteracje na bazie feedbacku

**Status produktu** beta — funkcje działają, priorytety ustawiamy razem z testerami

> „W końcu wiem ile realnie zarabiam na projekcie. Przestałam zgadywać.”— Marta, freelance UI designer
