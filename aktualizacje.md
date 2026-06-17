# Aktualizacje | TIMEFLOW

> Pełny changelog TIMEFLOW 0.1.6 (build 0.1.5733) i archiwum 0.1.5: macOS już dostępny obok Windows, synchronizacja LAN i Online, sesje manualne, dostęp mobilny WebUI, własny zakres dat, wzmocnione bezpieczeństwo oraz nowe funkcje i naprawione błędy.

Source: https://timeflow.conceptfab.com/aktualizacje.html

Aktualizacje produktu

## TIMEFLOW 0.1.6 *— pełny changelog.*

Kompletna lista zmian z wydania **TIMEFLOW 0.1.6** (build 0.1.5733): macOS jako równorzędna platforma obok Windows, własny zakres dat, dostęp mobilny przez WebUI, synchronizacja LAN i Online, sesje manualne oraz wzmocnione bezpieczeństwo. Niżej zachowane archiwum wersji 0.1.5.

[← Wróć na stronę główną](./index.html#start)

Nowe funkcje Usprawnienia Naprawione błędy Bezpieczeństwo

Platformy

## Windows i macOS — dwie równorzędne *platformy.*

TIMEFLOW rozwijamy **równolegle na Windows i macOS** — ta sama funkcjonalność i natywny tracking na każdej platformie, żadna nie jest dodatkiem do drugiej. To wydanie dopina natywny silnik macOS (pomiar CPU per aplikacja przez `libproc`, tytuły okien i tracking na poziomie plików przez `CGWindowList`, zlokalizowane tray menu) do poziomu wersji Windows.
- **[Fix]** Pomiar CPU per aplikacja na macOS bazuje teraz na delcie `libproc proc_pidinfo()` — spójny z FILETIME pod Windows i odporny na porównania tick-do-ticku.
- **[Fix]** Tytuły okien na macOS (potrzebne do tracking-u plikowego i sugestii AI) odczytywane przez `CGWindowList` — wcześniej zwracały pusty string.
- **[Fix]** Atrybucja tła w trybie idle używa tego samego limitu `effective_elapsed.max(1s)` co ścieżka foreground, więc minuty bezczynności nie idą już na konto aplikacji w tle.
- **[Fix]** Tracker używa `SystemTime::now()` (UTC) zamiast `Local::now()` przy detekcji luk po uśpieniu — koniec fantomowych `save_daily` przy zmianie czasu (DST).
- **[Fix]** Online-sync worker trzyma swój `JoinHandle` i jest dołączany czysto przed respawn/restart — koniec wycieków wątków.
- **[Fix]** Tombstone `sync_key` opiera się na `exe_name|start_time` (migracja `m21`), więc usunięcia nie przeskakują między maszynami.
- **[Bezpieczeństwo]** LAN `/lan/local-identity` nie zwraca już sekretu pairing — wydawany tylko przez `/lan/pair` po akceptacji kodu, z limitem 10 prób na 60 s per IP.

Wersja 0.1.6 · według modułów

## Pełna lista zmian pogrupowana po *modułach.*

Zakres: własny zakres dat, dostęp mobilny WebUI, bezpieczeństwo, Dashboard, Sessions, Projects, Reports, Applications, AI & Model, Settings, Daemon, Data, Estimates, Analysis, Help, LAN Sync i Online Sync.

### Własny zakres dat (Custom Range)

Nowy selektor dat pozwala analizować dowolny okres — nie tylko predefiniowane dzień/tydzień/miesiąc.
- **[Nowe]** Wspólny komponent wyboru zakresu dat (Custom Range) w Dashboardzie, Wycenach i Analizie czasu.
- **[Usprawnienie]** Po wybraniu własnego zakresu metryki, wykresy i wyceny przeliczają się dokładnie dla wskazanych dni.
- **[Usprawnienie]** Strzałki poprzedni/następny chowają się, gdy zakres nie jest cykliczny — mniej mylących kontrolek.

Nowe

### WebUI — cały dashboard w przeglądarce

Tryb headless serwuje cały interfejs TIMEFLOW w przeglądarce — ten sam dashboard z telefonu lub innego urządzenia w sieci lokalnej, bez otwierania okna aplikacji.
- **[Nowe]** WebUI udostępnia praktycznie cały dashboard w przeglądarce (tryb headless): przeglądasz i edytujesz dane tak jak na desktopie — z telefonu lub innego urządzenia w sieci lokalnej.
- **[Nowe]** Demon działa jako serwer w tle; WebUI uruchamiasz z menu tray po włączeniu „Web Server” w Ustawieniach (port domyślny 47892).
- **[Nowe]** Localhost (`127.0.0.1`) loguje się automatycznie — bez hasła; urządzenia w sieci lokalnej wymagają 6-cyfrowego kodu parowania z zakładki Web Server.
- **[Nowe]** Responsywny layout mobilny (górne menu, przewijane kontrolki) — tabele danych pozostają czytelne na telefonie.
- **[Usprawnienie]** Ustawienia (zaokrąglanie, waluta, godziny pracy, język) współdzielone między aplikacją desktopową a WebUI.
- **[Bezpieczeństwo]** Połączenie po nieszyfrowanym HTTP — używaj wyłącznie w zaufanej sieci lokalnej.

Nowe

### Synchronizacja LAN — parowanie i parytet

Bezpieczniejsze i bardziej przewidywalne łączenie urządzeń w sieci lokalnej.
- **[Nowe]** Kreator parowania urządzeń: jednorazowy, wygasający kod oraz możliwość rozłączenia (unpair).
- **[Bezpieczeństwo]** Synchronizacja blokowana między różnymi wersjami TIMEFLOW (version gating) — chroni przed niespójnym scalaniem danych.
- **[Bezpieczeństwo]** Lokalne czyszczenie danych nigdy nie usuwa rekordów otrzymanych od drugiego urządzenia.
- **[Fix]** macOS: opcje synchronizacji w menu tray są ukrywane, gdy sync jest niedostępny (zamiast mylących, nieaktywnych pozycji).
- **[Fix]** Pewniejsze wykrywanie statusu demona na macOS i Windows.

Mieszane

### Bezpieczeństwo i prywatność

Wewnętrzny przegląd bezpieczeństwa wzmocnił obronę aplikacji bez zmiany Twojego workflow.
- **[Bezpieczeństwo]** Endpointy wyzwalające synchronizację dostępne wyłącznie lokalnie (loopback) — nie da się ich wywołać z sieci.
- **[Bezpieczeństwo]** Lokalny interfejs (`127.0.0.1`) działa bez kodu; kod parowania wymagany tylko przy dostępie z innego urządzenia w sieci lokalnej.
- **[Bezpieczeństwo]** Ponownie włączona ochrona przed modyfikacją prototypów (prototype pollution).
- **[Bezpieczeństwo]** Plik `.env` wczytywany tylko z katalogu danych aplikacji (koniec przeszukiwania katalogów nadrzędnych).
- **[Bezpieczeństwo]** Serwer WebUI odrzuca ścieżki ze znakami `..` (ochrona przed path traversal).

Bezpieczeństwo

### Demon, autostart i pomiar czasu

Dokładniejszy pomiar aktywności w tle i niezawodniejszy start usługi.
- **[Usprawnienie]** Czas procesora (CPU) liczony jako aktywność tylko wtedy, gdy jesteś przy komputerze — renderowanie czy przeliczenia bez Twojej obecności nie pompują statystyk.
- **[Usprawnienie]** Windows: autostart demona realizowany przez wpis w rejestrze zamiast skrótu `.lnk` — eliminuje problemy z OneDrive (Known Folder Move) i ciche błędy startu.

Usprawnienia

### Stabilność i wydajność

Mniejsze pliki aplikacji i dopracowany interfejs.
- **[Usprawnienie]** Mniejsze binaria po usunięciu symboli debugowania z wersji wydaniowej.
- **[Usprawnienie]** Dopracowana typografia i spójniejszy układ danych w tabelach oraz widokach.
- **[Usprawnienie]** Optymalizacja operacji na bazie danych (backup/VACUUM) dla większej spójności.

Usprawnienia

### Menedżer projektów (PM)

Pełny moduł zarządzania projektami obok automatycznego trackingu — budżety, terminy, statusy i struktura folderów na dysku.
- **[Nowe]** Osobna zakładka „PM” z listą projektów i panelem klientów.
- **[Nowe]** Tworzenie projektów z auto-numeracją (per rok), budżetem, terminem i statusem (Aktywny / Nieaktywny / Archiwalny).
- **[Nowe]** Drzewo folderów na dysku tworzone z szablonów; menedżer szablonów (twórz, edytuj, usuwaj, placeholder `{name}`).
- **[Nowe]** TF Match — łączenie projektu PM ze śledzonym projektem TIMEFLOW: budżet i termin obok realnie zmierzonego czasu.
- **[Nowe]** Filtry (rok, klient, status), sortowanie, wyszukiwanie, zapisywany widok i wskaźnik rozmiaru folderu.

Nowe

### Klienci (panel klientów)

Nowy widok agregujący czas i szacowaną wartość per klient, z zarządzaniem listą kontrahentów.
- **[Nowe]** Karty klientów: kolor, łączna wartość, liczba projektów i zmierzony czas; klik otwiera stronę klienta.
- **[Nowe]** Zarządzanie listą klientów (dodaj, edytuj, archiwizuj) i przypisywanie ich do projektów.
- **[Nowe]** Automatyczne tworzenie listy klientów z nazw projektów jednym kliknięciem.
- **[Nowe]** Filtr po kliencie w Wycenach (multi-select) — wybierasz, czyje projekty liczą się do metryk i raportu.
- **[Nowe]** Klienci bez aktywności zwinięci pod przełącznikiem; kwoty w walucie z Ustawień.

Nowe

### Wybór metody liczenia czasu

Metodę liczenia czasu wybierasz w Ustawieniach, a architektura jest gotowa na kolejne algorytmy w przyszłości.
- **[Nowe]** Zakładka „Algorytm czasu” w Ustawieniach — wybór metody liczenia (dziś: Algorytm Uczciwego Czasu, czyli wall-clock z deduplikacją multitaskingu).
- **[Nowe]** Architektura pluggable (strategia + rejestr) — dołożenie kolejnej metody w przyszłości nie wymaga zmian w interfejsie.
- **[Usprawnienie]** Zmiana metody przelicza dane z surowych sesji — nic nie jest nadpisywane, dane źródłowe zostają nietknięte.
- **[Usprawnienie]** Wybrana metoda obowiązuje spójnie w Dashboardzie, kartach projektów, Wycenach i raportach.

Mieszane

### Zaokrąglanie czasu

Konfigurowalne zaokrąglanie czasu w raportach i wycenach — bez ruszania danych źródłowych.
- **[Nowe]** Zakładka „Zaokrąglanie” w Ustawieniach: włącz/wyłącz oraz interwał (1, 5, 6, 10, 15, 30 lub 60 min, w górę).
- **[Nowe]** Trzy warianty: zaokrąglij sumę, każdą sesję osobno, albo do pełnych godzin dziennie.
- **[Nowe]** Przełącznik „Pełny / Zaokrąglony” w raportach (także wydruk/PDF); zaokrąglony czas proporcjonalnie skaluje wartość w Wycenach.
- **[Usprawnienie]** Zaokrąglanie działa wyłącznie na warstwie prezentacji — surowy czas w bazie zostaje nienaruszony.

Mieszane

Wersja 0.1.6 · widoki i pipeline

## Dashboard, sesje, projekty, raporty i *aplikacje.*

Codzienne widoki dostały szybsze ładowanie, bezpieczniejsze operacje i lepszą obsługę dużych list.

### Dashboard (panel główny)

Szybsze ładowanie widoków i nowy tryb pełnoekranowy dla raportów.
- **[Nowe]** Tryb `ReportView` bez sidebara i topbara (czysty ekran pod wydruk/PDF).
- **[Usprawnienie]** Jeden pipeline ładowania statystyk, projektów i timeline zamiast kilku osobnych przebiegów.
- **[Usprawnienie]** Wsparcie zakresu `custom` + logiczne ukrywanie strzałek poprzedni/następny, gdy zakres nie jest cykliczny.
- **[Fix]** Wykres „All Projects” pomija rekordy 0s i nieprawidłowe wartości czasu.

Mieszane

### Sesje (Sessions)

Duża rozbudowa pracy na listach sesji i całego pipeline splitowania.
- **[Nowe]** Tryby listy projektów przy ręcznym przypisaniu: Aktywne A-Z, Najnowsze → Top → Reszta, Top → Najnowsze → Reszta.
- **[Usprawnienie]** Smart pozycjonowanie menu kontekstowego (bez uciekania poza viewport).
- **[Usprawnienie]** Cache i prefetch `Score Breakdown` z timeoutem dla dużych list.
- **[Fix]** Ochrona przed ponownym dzieleniem już podzielonych sesji (`split_source_session_id`).
- **[Fix]** Split sesji działa transakcyjnie: zachowuje łączny czas, poprawnie dzieli `file_activities` i zapisuje feedback AI.

Mieszane

### Projekty (Projects)

Dokładniejsze statystyki projektowe i bezpieczniejsze operacje administracyjne.
- **[Usprawnienie]** Liczenie `Project Extra Info` w realnym zakresie dat (szybciej i bez kosztu all-time CTE).
- **[Fix]** „Wyklucz” i „Usuń projekt” wykonują czyszczenie referencji + commit w jednej transakcji.
- **[Usprawnienie]** Lepsza deduplikacja nazw kandydatów projektów z hintów plikowych.

Mieszane

### Raporty (Reports)

Szybsze generowanie raportów i pełna lokalizacja edytora szablonów.
- **[Usprawnienie]** Backend raportu ładuje równolegle projekty, extra info, estimates i sessions.
- **[Usprawnienie]** Edytor szablonów oraz podgląd sekcji podpięte pod klucze i18n (PL/EN), bez hardkodowanych etykiet.
- **[Fix/Usprawnienie]** Bezpieczniejsze zapisywanie i duplikowanie template (lokalizowany suffix kopii, mniej side-effectów stanu).

Mieszane

### Aplikacje (Applications)

Lepsza obsługa bardzo dużych list aplikacji i stabilniejsze akcje.
- **[Nowe]** Paginacja „Pokaż więcej” (batch po 100 rekordów) dla tabeli aplikacji.
- **[Usprawnienie]** Sortowanie i wyszukiwanie resetuje widok listy, co poprawia kontrolę nad wynikami.
- **[Fix]** Jawna obsługa błędów przy zmianie koloru, rename i usuwaniu aplikacji.

Mieszane

Wersja 0.1.6 · AI, ustawienia i dane

## Model AI, demon, ustawienia, dane i *finanse.*

Największa iteracja modelu, przebudowane ustawienia oraz dopięte moduły danych, wycen i analizy.

### Model i sztuczna inteligencja (AI)

Największa iteracja modelu: metryki jakości, kontrola treningu i reset wiedzy.
- **[Nowe]** Panel „Postęp i jakość AI” (precision, feedback trend, auto-safe runs/rollback, coverage danych).
- **[Nowe]** `Training Horizon` 30–730 dni i blacklisty treningu (exe + foldery) dostępne z poziomu UI.
- **[Nowe]** Reset wiedzy AI jednym kliknięciem (czyszczenie modelu + historii feedbacku + auto-runów).
- **[Usprawnienie]** Trening korzysta z bogatszego kontekstu: `file_path`, `detected_path`, `window_title`, `title_history`.

Nowe

### Ustawienia (Settings)

Zakładka ustawień została przebudowana na czytelne sekcje robocze.
- **[Usprawnienie]** Nowy podział „General” + „Advanced/Algorithms” z lepszym grupowaniem opcji.
- **[Nowe]** Session Management: Merge Gap, Skip short sessions, Auto-rebuild on startup i ręczny rebuild sesji.
- **[Usprawnienie]** Session Split przeniesiony do sekcji zaawansowanej (max projects, tolerance, auto-split).
- **[Nowe]** Rozbudowany Online Sync: sync on startup, auto-sync interval, logging oraz status ACK/pending/reseed.

Mieszane

### Demon i tray

Stabilniejsze sterowanie procesem i bardziej „uczciwy” pomiar aktywności.
- **[Usprawnienie]** Start/Stop/Restart demona czeka na realny stan procesu (polling), bez „ślepego” opóźnienia.
- **[Usprawnienie]** Wykrywanie dashboardu przez snapshot procesów (ToolHelp), bez zależności od `tasklist`.
- **[Nowe]** Idle guard: brak naliczania foreground, gdy użytkownik jest bezczynny (>= 2 min).
- **[Nowe]** Rejestrowanie `detected_path`, `activity_type` i `title_history` dla lepszego kontekstu AI.

Mieszane

### Dane i import (Data)

Rozszerzona jakość importu i większe bezpieczeństwo operacji na bazie.
- **[Nowe]** Import zapisuje rozszerzone pola aktywności: `window_title`, `detected_path`, `title_history`, `activity_type`.
- **[Usprawnienie]** Walidacja nakładających się sesji w archiwum działa jednym przejściem SQL (temp table join).
- **[Fix]** `clear_all_data` czyści też `session_manual_overrides` i `tombstones`.
- **[Fix]** Bezpieczniejsze `export_database` (kontrola ścieżki + poprawne quotowanie).

Mieszane

### Wyceny i analiza (Estimates + Analysis)

Moduły finansowe i analityczne zostały dopięte do nowego systemu kluczy i stabilniejszego renderu.
- **[Usprawnienie]** Ujednolicone walidacje i komunikaty błędów/zapisu w obu modułach.
- **[Usprawnienie]** Stabilniejsze odświeżanie zakresów i mniej zbędnych rerenderów toolbarów.
- **[Fix/Usprawnienie]** Lepszy flow przejścia z wycenionych „boosted sessions” bezpośrednio do widoku sesji.

Mieszane

### Pomoc (Help)

Dokumentacja została rozszerzona o nowe workflowy i scenariusze diagnostyczne.
- **[Usprawnienie]** Opisane nowe flow Sessions, AI i ReportView (w tym split pipeline oraz wydruk/PDF).
- **[Usprawnienie]** Dodane scenariusze Online Sync: ACK pending, server snapshot cleanup i relacja z Demo Mode.
- **[Usprawnienie]** Uzupełnione instrukcje dla nowych ustawień: Training Horizon, blacklisty, auto-split i auto-rebuild.

Usprawnienia

Wersja 0.1.6 · synchronizacja i sesje manualne

## Sync LAN, Online Sync i sesje *manualne.*

Pełna synchronizacja peer-to-peer i online z szyfrowaniem oraz ręczne rejestrowanie pracy poza ekranem — wszystko zintegrowane z raportami i wycenami.

### Synchronizacja LAN

Pełna synchronizacja peer-to-peer w sieci lokalnej — zero chmury, zero kont, zero serwerów.
- **[Nowe]** 13-krokowy protokół synchronizacji z automatycznym wykrywaniem drugiego komputera (UDP broadcast).
- **[Nowe]** Automatyczna elekcja ról master/slave lub wymuszenie roli ręcznie w ustawieniach.
- **[Nowe]** Transfer danych po HTTP w sieci lokalnej — dane nie opuszczają sieci domowej.
- **[Nowe]** Scalanie baz SQLite z rozwiązywaniem konfliktów przez markery hashowe i system tombstone.
- **[Nowe]** Konfigurowalny interwał synchronizacji (ręcznie, co 4h, 8h, 12h, 24h lub 48h) i czas wykrywania peera.
- **[Nowe]** Automatyczny backup bazy przed każdą synchronizacją.

Nowe

### Synchronizacja online

Koordynowana synchronizacja przez internet z pełnym szyfrowaniem — dane trafiają na wydzielony storage, nie na serwery TIMEFLOW.
- **[Nowe]** Serwer koordynacji zarządza kolejnością synchronizacji (sesja, heartbeat, raportowanie kroków) — widzi tylko metadane, nigdy treść.
- **[Nowe]** Transfer przez SFTP z szyfrowaniem AES-256-GCM i jednorazowymi danymi dostępowymi per sesja.
- **[Nowe]** Delta sync — wysyłanie tylko zmienionych tabel na podstawie hashów (projekty, aplikacje, sesje, tombstones).
- **[Nowe]** Automatyczna synchronizacja przy starcie aplikacji lub w konfigurowalnych interwałach.
- **[Nowe]** Śledzenie postępu transferu w czasie rzeczywistym (13 kroków: discovery → negocjacja → transfer → scalanie → dystrybucja).
- **[Nowe]** Autoryzacja tokenowa (Bearer) z konfiguracją serwera i klucza API w ustawieniach.

Nowe

### Sesje manualne

Ręczne rejestrowanie pracy poza ekranem — spotkania, rozmowy i inne aktywności offline z pełną integracją w raportach.
- **[Nowe]** Trzy typy sesji manualnych: spotkanie, rozmowa telefoniczna, inne — z dedykowaną tabelą w bazie.
- **[Nowe]** Elastyczny zakres dat (wielodniowe sesje) z przypisaniem do projektu i aplikacji.
- **[Nowe]** Sesje manualne wliczane do statystyk projektowych, wycen i raportów na równi z sesjami automatycznymi.
- **[Nowe]** Obsługa tombstone dla sesji manualnych — pełna kompatybilność z synchronizacją LAN i Online.

Nowe

To jest pełna lista zmian dla wydania **TIMEFLOW 0.1.6** (build 0.1.5733) — w tym własny zakres dat, dostęp mobilny WebUI, wzmocnione bezpieczeństwo oraz moduły Synchronizacji LAN, Online Sync i Sesji Manualnych. Niżej znajdziesz zachowaną sekcję archiwalną dla wersji 0.1.5.

[Dołącz do testów beta →](./index.html#beta) [Wróć na stronę główną →](./index.html#start)

Archiwum · Wersja 0.1.5

## Wersja 0.1.5 — pełny changelog *(archiwum).*

Poniżej pozostaje kompletna, archiwalna lista zmian z wydania **TIMEFLOW 0.1.5**. Zakres: Dashboard, Sessions, Projects, Estimates, Analysis, Applications, AI & Model, Settings, Data i Help.

Nowe funkcje Usprawnienia Naprawione błędy

### Dashboard (panel główny)

Monitoring statusu usług i szybszy odczyt stanu całej aplikacji z poziomu głównego widoku.
- **[Nowe]** Monitoring usług w czasie rzeczywistym (Daemon, Sync, AI) bez odświeżania okna.
- **[Usprawnienie]** Odświeżony wskaźnik wersji z kontrolą niekompatybilności silnika i informacją o konieczności reloadu.
- **[Nowe]** BugHunter Widget do szybkiego reagowania na błędy z bety.
- **[Nowe]** Dynamiczne liczniki osieroconych sesji w TopBarze (czerwone badge dla czasu bez przypisania).

Mieszane

### Sesje (Sessions)

Duży skok wydajności list i większa kontrola nad jakością przypisań AI.
- **[Usprawnienie]** Nowy silnik renderowania list oparty o wirtualizację dla tysięcy wpisów.
- **[Nowe]** Rozbudowany interfejs AI Score z paskami breakdown i oceną pewności przypisań.
- **[Nowe]** Trening przez wzmocnienie: Thumbs Up / Thumbs Down w tabeli sesji.
- **[Usprawnienie]** Lepsze dzielenie sesji obejmujących dowody z wielu projektów.
- **[Fix]** Uspójnione formaty czasu dla języka polskiego (np. „5 sty 2025”).

Mieszane

### Projekty (Projects)

Czytelniejsze metryki projektowe i szybsza praca z dużą listą klientów/projektów.
- **[Nowe]** Odświeżona karta projektów z licznikiem sesji i statusem AI.
- **[Nowe]** Licznik Boosted Sessions na kartach projektów i spójność z widokiem Wycen.
- **[Nowe]** Edycja koloru projektu przez dedykowaną paletę (`color` property).
- **[Usprawnienie]** Natychmiastowe filtrowanie projektów po nazwie + lepsza paginacja „Load more”.
- **[Usprawnienie]** Solidniejsze wykrywanie struktur klientów i podsumowań stawek.

Mieszane

### Wyceny (Estimates)

Lepszy UX ładowania i większa wiarygodność wartości finansowych.
- **[Fix]** Backend re-fetch nie „zamraża” tabeli przy zmianach sortowania dat.
- **[Fix]** Do Boosted Estimates trafiają tylko realne, istniejące sesje.
- **[Usprawnienie]** Lepsze podliczanie stawek globalnych i walut (PLN/USD/EUR) z dokładniejszym parsowaniem `currency`.

Mieszane

### Analiza czasu (Analysis)

Szybsze przeliczanie danych i płynniejsze animacje wykresów.
- **[Usprawnienie]** Memoizacja sum Daily/Weekly/Monthly (Zustand + React useMemo) redukująca narzut operacji.

Usprawnienia

### Aplikacje (Applications)

Stabilniejsze działanie statystyk po przełączaniu języka interfejsu.
- **[Fix/Usprawnienie]** Zintegrowane i18n bez pustych kluczy i bez fallbacku do kodu inline.

Mieszane

### Model i sztuczna inteligencja (AI)

Większa przewidywalność decyzji modelu i lepszy sygnał do retreningu.
- **[Nowe]** Powiadomienia o nowej porcji wiedzy (pulsująca ikona New Data).
- **[Fix]** Twarde reguły AI Reassignment: ręcznie przepięta sesja nie wraca do starego wyboru AI.
- **[Usprawnienie]** Doprecyzowane progi bezpieczeństwa `min_confidence` i zachowania auto-przypisań.

Mieszane

### Ustawienia (Settings)

Większa kontrola wydajności UI i elastyczniejsze stylowanie interfejsu.
- **[Nowe]** Przełącznik animacji wykresów dla słabszych komputerów.
- **[Usprawnienie]** Custom UI Alerts (toasty i okna decyzyjne) zamiast surowych `alert()` / `confirm()`.

Mieszane

### Dane (Data)

Bezpieczniejsza i czytelniejsza obsługa backupu i synchronizacji.
- **[Usprawnienie]** Ciche kopie zapasowe + przycisk twardego odświeżenia Sync + komunikacja o stanie zaszyfrowanego backupu tokenowego.

Usprawnienia

### Pomoc (Help)

Dokumentacja dopięta do aktualnej logiki AI i pełnej spójności językowej.
- **[Usprawnienie]** Zaktualizowana sekcja AI & Model: auto-safe criteria, minimum confidence threshold i rola ręcznych flag.
- **[Usprawnienie]** Pełne pokrycie językowe wpisów i spójność terminologii PL/EN.

Usprawnienia

To jest archiwalna lista zmian dla wydania **TIMEFLOW 0.1.5**. Najnowsza sekcja 0.1.6 znajduje się wyżej.

[Dołącz do testów beta →](./index.html#beta) [Wróć na stronę główną →](./index.html#start)
