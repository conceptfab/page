# TIMEFLOW | Desktopowy time tracker dla freelancerów (beta)

> Desktopowy time tracker dla freelancerów. Tracking w tle, lokalne AI, sync LAN i online, sesje manualne, wyceny i raporty — dane zostają u Ciebie. Zgłoś się do bety.

Source: https://timeflow.conceptfab.com/

Desktopowy tracker dla freelancerów — **zajmij się tworzeniem, my zajmiemy się czasem.**

# Pracujesz i widzisz jak zarabiasz.

TIMEFLOW rejestruje aktywność w tle i stosuje **Algorytm Uczciwego Czasu** — deduplikuje multitasking, sprawiedliwie dzieli sekundy między projekty. Offline. Bez subskrypcji.

Interfejs TIMEFLOW

Dashboard, projekty, sesje i analityka w jednym workflow

1 / 6

Dashboard *widok główny*

Główny widok pokazuje dashboard pracy. Poniżej najważniejsze moduły, które budują codzienny workflow freelancera: Projects, Sessions, Analysis, Estimates i AI.

Dashboard *widok główny*

Projects *foldery + statusy*

Sessions *sesje + przypisania*

Time Analysis *wykresy + heatmapa*

Estimates *stawki + mnożniki + wyceny*

AI & Model *sugestie + model*

Najlepiej działa dla: grafików

Poproś o dostęp do bety

50+ freelancerów w programie beta

Moduły w aplikacji

10 +

Dashboard, projekty, sesje, AI, analityka, wyceny, proces w tle i więcej

Platformy desktop (teraz)

2

Windows i macOS • Linux i mobile app planowane

Tryby pracy z AI

3

sam decydujesz jak bardzo AI się angażuje — z cofnięciem zmian w razie wpadki

Zobacz możliwości ↓

Beta

TIMEFLOW jest w becie. Szukamy freelancerów, którzy chcą kształtować produkt — twój feedback trafia bezpośrednio na roadmapę.

Offline

Działa w pełni bez internetu. Dane lokalne, eksport JSON i transfer przez USB — żadnych wymagań co do połączenia.

Open source

Kod zostanie udostępniony. W przygotowaniu: menedżer projektów z własnym drzewem folderów i archiwizacją plików.

Dla kogo działa najlepiej

## Nie tylko mierzy czas — pomaga go ogarnąć.

Projektanci skaczą między Figma, Photoshopem, przeglądarką i komunikatorem po kilkadziesiąt razy dziennie. TIMEFLOW porządkuje ten chaos i odzyskuje kontekst, którego sam byś nie odtworzył.

### Grafik / Brand Designer

Rozliczasz czas z klientami bez wpisywania czegokolwiek ręcznie — nawet gdy skaczesz między kilkoma apkami i folderami naraz.

projekty po folderach sesje nieprzypisane estymacje wartości

### UI/UX / Product Designer

Od razu widać, co zjada czas w danym tygodniu — research, makiety, iteracje czy konsultacje — heatmapa i trendy gotowe bez klikania.

dashboard + analiza CSV export manualne sesje

### Freelancer poza designem

TIMEFLOW sprawdzi się wszędzie tam, gdzie rozliczasz czas z klientem — w development, montażu, konsultingu, pisaniu.

AI sugeruje przypisania backup i import sync online

Jak to działa

## Od surowych sesji do gotowego rozliczenia.

Automatyczny tracking + ręczna kontrola tam, gdzie trzeba. Dokładność bez klikania przez cały dzień.

01

### Zbieranie danych

Daemon zbiera dane w tle, a dashboard ściąga je przy starcie i odświeża sesje z dnia.
- daemon status + autostart
- auto-import przy starcie
- archiwum plików z importu

02

### Porządkowanie i przypisania

Zakładasz projekty, przypisujesz apki, akceptujesz lub odrzucasz sugestie AI — ręcznie poprawiasz tylko to, co musi być poprawione.
- projekty + foldery + kandydaci
- AI suggest / auto_safe / rollback
- merge sesji według ustawionego gapu

03

### Analiza, wycena i backup

Na koniec masz dashboard z metrykami, wycenę godzin i narzędzia do eksportu, importu i synca między maszynami.
- heatmapa + wykresy
- estimated value per project + mnożnik sesji
- JSON export/import + online sync

Co TIMEFLOW robi już teraz

## Realne funkcje, nie lista życzeń.

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

### Analityka i Proof of Work (Dowód Pracy)

Statystyki to nie tylko liczby — za każdą sekundą stoi konkretna historia plików. Masz dowód pracy, jeśli klient pyta o szczegóły.
- precyzyjny podgląd sesji i plików
- heatmapa aktywności (godzinowa i dzienna)
- analiza intensywności i najefektywniejszych godzin
- eksport do CSV dla zewnętrznych arkuszy

Estimates

### Estymacje wartości pracy dla freelancerów

Globalną stawkę ustawiasz raz, nadpisujesz per projekt albo dodajesz mnożnik do konkretnej sesji — wartość pracy za wybrany zakres widzisz od razu.
- global hourly rate + project overrides
- mnożnik stawki dla wybranej sesji i manualne wyceny
- analiza dochodowości projektów (widok miesięczny/roczny)
- estimated value per project + zarobki dzienne
- podgląd wartości czasu poświęconego na grupy zadań

Data & Sync

### Import/export danych i online sync

JSON export całości albo wybranego projektu, import z walidacją i podglądem konfliktów, delta sync online albo transfer USB — dane pod Twoją kontrolą.
- ZIP Export całej bazy lub wybranych projektów
- Maintenance: czyszczenie i optymalizacja bazy SQLite
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

Algorytm Uczciwego Czasu (Unique Project Time)

## Twoja sprawność to nie koszt dla klienta.

Większość trackerów robi ten sam błąd — sumuje czas każdej otwartej apki osobno, sztucznie pompując statystyki. TIMEFLOW deduplikuje aktywność i dzieli sekundy uczciwie między projekty. Klient dostaje realne liczby, a Ty czyste sumienie przy fakturze.

Ochrona przed zawyżaniem

### Zero "podwójnego liczenia"

Inne trackery liczą multitasking osobno (3h pracy w 1h zegarowej). TIMEFLOW deduplikuje.
- Automatyczna deduplikacja multitaskingu
- Nalicza tylko unikalne minuty nad projektem
- Najbardziej "fair" podejście na rynku

Sprawiedliwy podział

### Matematyczna precyzja podziału

Backend w Rust dzieli sekundy uczciwie między projekty, kiedy używasz wielu narzędzi naraz.
- Sprawiedliwy podział każdej sekundy uwagi
- Suma czasów nigdy nie przekracza realnego czasu
- Klient płaci za czas, nie za otwarte okna

Dowód pracy

### Przejrzystość Dowodowa

Za każdą sekundą stoi historia plików — jeśli klient pyta o szczegóły, masz dowód.
- Precyzyjny podgląd sesji i plików
- Wyklucza przypadkowe naliczanie czasu
- Brak liczenia social mediów poza projektami

Lokalna wiarygodność

### Prywatność i Lokalna Wiarygodność

Dane przetwarzane lokalnie w SQLite — nikt nie manipuluje statystykami "w chmurze".
- 100% lokalne przetwarzanie danych
- Ty kontrolujesz dostęp do raportów

Wartość dla klienta

### Realne zaangażowanie

Czas unikalny, a nie czas "procesorowy" aplikacji.
- Czas pracy jest mierzony w sposób uczciwy
- Brak naliczania czasu za otwarte okna

Transparentność

### Pełna transparentność

Koniec dyskusji o stawkach — masz twarde dane, które mówią same za siebie.
- Dokładne dane o czasie pracy
- Brak manipulacji statystykami

Platformy i status

## Desktop-first dzisiaj. Więcej narzędzi jutro.

Obecna wersja to stabilny desktop workflow i testy beta z realnymi użytkownikami. Nowe platformy wchodzą dopiero, gdy są zrobione porządnie.

Dostępne

### Windows

Desktop app + proces w tle + dashboard + zarządzanie importem i logami.

Dostępne

### macOS

Pełne wsparcie desktopowe dla użytkowników Apple — z demonem, dashboardem i natywnym monitoringiem aktywności.

Planowane

### Linux

Desktop tracking dla użytkowników własnych środowisk — bez kompromisów.

Planowane

### Aplikacja mobilna

Dostęp do danych i sesji z telefonu — TIMEFLOW zawsze pod ręką.

Stack technologiczny

## Natywna aplikacja, nie web-app w okienku.

Lekki ślad i minimalne wymagania to projekt, nie przypadek. Rust na backendzie, oddzielny daemon i lokalna SQLite — szybki start i pełna kontrola nad plikami, bez ciężkiego runtima w tle.

Core Desktop

### Rust + Tauri 2

Lekki runtime desktopowy, szybki start i natywna kontrola nad plikami i procesami — bez ciężkiego narzutu, jaki znasz z Electrona.
- lepsza wydajność pod monitoring i pracę w tle
- natywna integracja z systemem, plikami i procesami
- mocna baza pod Windows i macOS, kolejne platformy desktop w drodze

Data Layer

### SQLite lokalnie (rusqlite, bundled)

Lokalna baza **SQLite** działa od razu po instalacji (`bundled`) — zero dodatkowego setupu, od pierwszego uruchomienia masz gotowy workflow.
- local-first: dane i dashboard dostępne od ręki
- szybki odczyt sesji, projektów i analityki
- backup oraz import/export danych bez kombinowania

UI Dashboard

### React 19 + TypeScript + Vite

Dashboard rozwijany niezależnie od backendu — nowe widoki, analityka i panele iterowane szybko.
- szybka iteracja funkcji i ekranów dashboardu
- czytelne wykresy i analityka (Recharts)
- stabilny UI stack (Zustand / Radix / Tailwind)

Daemon

### Monitoring w osobnym procesie

Daemon w **Rust** ciągnie pipeline danych niezależnie od UI — dashboard to interfejs do pracy, a zbieranie aktywności chodzi sobie w tle.

niski narzut praca w tle oddzielony od UI
- kontrola start / stop / restart z UI
- logi i status procesu
- archiwizacja plików i auto-import workflow
- autostart i monitoring w tle przy niskim narzucie

Stability Engine

### Stabilne dane, czas i zadania w tle

Trzy biblioteki pilnują, żeby dane się zgadzały — poprawne czasy, stabilny import/export i przewidywalne zadania w tle.
- Serde / serde_json: stabilny import/export i kontrakty danych
- Chrono: poprawne zakresy dat, sesje i rozliczenia czasu
- Tokio: timery, zadania cykliczne i operacje w tle

Sync / Web

### Serwer synchronizacji — już działa

Serwer na **Next.js** koordynuje sync między urządzeniami — local-first pozostaje podstawą.
- delta sync i pełna synchronizacja między urządzeniami
- API push / pull / ack / status
- fundament pod mobile i funkcje współdzielenia

Roadmapa kolejnej wersji

## Menedżer projektów jako kolejny duży krok.

Fundament jest — projekty, foldery, kandydaci, sync i monitoring czasu. Następna wersja rozbudowuje to w pełne narzędzie do zarządzania projektami, od struktury po archiwizację.

Teraz / Beta

### Tracking + analiza + porządkowanie danych

TIMEFLOW już obsługuje monitoring czasu, projekty oparte o foldery, manualne sesje, estymacje, AI sugestie, import/export i sync online.
- tracking i sesje
- projekty + folder roots
- AI suggestion / auto-safe
- export/import + sync online

Następna wersja / Kierunek rozwoju

### Menedżer projektów z customowym drzewem folderów

Dedykowane foldery projektowe i spójne drzewo katalogów dopasowane do typu projektu, klienta albo pipeline'u.
- dedykowane foldery projektu
- customowe drzewo folderów (template/presety)
- szybsze zakładanie i organizowanie projektów

Kolejne rozszerzenia

### Archiwizacja, współdzielenie i głębsza integracja

Archiwizacja plików projektowych, udostępnianie i ściślejsze połączenie struktury projektu z danymi o czasie pracy.
- generowanie raportów z sesjami (PDF / CSV jako załącznik do faktury)
- archiwizacja plików projektowych
- udostępnianie / współpraca
- głębsza integracja z monitoringiem czasu

Zaufanie i kontakt

## Kto stoi za TIMEFLOW i jak wygląda beta.

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

FAQ

## Najczęstsze pytania przed zgłoszeniem do bety.

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

## Pomóż zbudować TIMEFLOW pod realny workflow freelancerów.

Szukamy głównie grafików — ale drzwi są otwarte dla każdego, kto rozlicza czas z klientami. Twój feedback kształtuje roadmapę: co przeszkadza, co przyspiesza, czego brakuje.

**Na czym nam zależy** prawdziwe przypadki użycia, bałagan projektowy, rozliczenia z klientami

**Co dostajesz** build w 48h od weryfikacji, Twoje feature requesty prosto do backlogu, szybkie iteracje na bazie feedbacku

**Status produktu** beta — funkcje działają, priorytety ustawiamy razem z testerami

>

“W końcu wiem ile realnie zarabiam na projekcie. Przestałam zgadywać.”
— Marta, freelance UI designer

Aktualizacje produktu

## TIMEFLOW 0.1.6 już dostępny.

Sporo zmian w Sessions, AI, Daemon i Settings. Pełna historia zmian (z 0.1.5 włącznie) jest na osobnej podstronie.

Release highlight

Nowe funkcje Usprawnienia Naprawione błędy

### Pełny changelog 0.1.6 (z archiwum 0.1.5) jest na osobnej stronie.

Kompletna lista zmian pogrupowana po modułach, z ikonami i w układzie Help/Pomoc.
[Zobacz pełny changelog 0.1.6](./aktualizacje.html)
