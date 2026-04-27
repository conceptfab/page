# Aktualizacje | TIMEFLOW

> Pełny changelog TIMEFLOW 0.1.6 (build 0.1.556) i archiwum 0.1.5: synchronizacja LAN i Online, sesje manualne, nowe funkcje i naprawione błędy.

Source: https://timeflow.conceptfab.com/aktualizacje.html

# Aktualizacje TIMEFLOW

Concept / creation / execution All rights reserved

## Wersja 0.1.6 — pełny changelog

Ten dokument zawiera kompletną listę zmian z wydania **TIMEFLOW 0.1.6** (build 0.1.556). Zakres: Dashboard, Sessions, Projects, Reports, Applications, AI & Model, Settings, Daemon, Data, Estimates, Analysis, Help, LAN Sync i Online Sync.

Nowe funkcje Usprawnienia Naprawione błędy

### Dashboard (Panel Główny)

Szybsze ładowanie widoków i nowy tryb pełnoekranowy dla raportów.
- **[Nowe]** Tryb `ReportView` bez sidebara i topbara (czysty ekran pod wydruk/PDF).
- **[Usprawnienie]** Jeden pipeline ładowania statystyk, projektów i timeline zamiast kilku osobnych przebiegów.
- **[Usprawnienie]** Wsparcie zakresu `custom` + logiczne ukrywanie strzałek poprzedni/następny, gdy zakres nie jest cykliczny.
- **[Fix]** Wykres „All Projects” pomija rekordy 0s i nieprawidłowe wartości czasu.

### Sesje (Sessions)

Duża rozbudowa pracy na listach sesji i całego pipeline splitowania.
- **[Nowe]** Tryby listy projektów przy ręcznym przypisaniu: Aktywne A-Z, Najnowsze → Top → Reszta, Top → Najnowsze → Reszta.
- **[Usprawnienie]** Smart pozycjonowanie menu kontekstowego (bez uciekania poza viewport).
- **[Usprawnienie]** Cache i prefetch `Score Breakdown` z timeoutem dla dużych list.
- **[Fix]** Ochrona przed ponownym dzieleniem już podzielonych sesji (`split_source_session_id`).
- **[Fix]** Split sesji działa transakcyjnie: zachowuje łączny czas, poprawnie dzieli `file_activities` i zapisuje feedback AI.

### Projekty (Projects)

Dokładniejsze statystyki projektowe i bezpieczniejsze operacje administracyjne.
- **[Usprawnienie]** Liczenie `Project Extra Info` w realnym zakresie dat (szybciej i bez kosztu all-time CTE).
- **[Fix]** „Wyklucz” i „Usuń projekt” wykonują czyszczenie referencji + commit w jednej transakcji.
- **[Usprawnienie]** Lepsza deduplikacja nazw kandydatów projektów z hintów plikowych.

### Raporty (Reports)

Szybsze generowanie raportów i pełna lokalizacja edytora szablonów.
- **[Usprawnienie]** Backend raportu ładuje równolegle projekty, extra info, estimates i sessions.
- **[Usprawnienie]** Edytor szablonów oraz podgląd sekcji podpięte pod klucze i18n (PL/EN), bez hardkodowanych etykiet.
- **[Fix/Usprawnienie]** Bezpieczniejsze zapisywanie i duplikowanie template (lokalizowany suffix kopii, mniej side-effectów stanu).

### Aplikacje (Applications)

Lepsza obsługa bardzo dużych list aplikacji i stabilniejsze akcje.
- **[Nowe]** Paginacja „Pokaż więcej” (batch po 100 rekordów) dla tabeli aplikacji.
- **[Usprawnienie]** Sortowanie i wyszukiwanie resetuje widok listy, co poprawia kontrolę nad wynikami.
- **[Fix]** Jawna obsługa błędów przy zmianie koloru, rename i usuwaniu aplikacji.

### Model i Sztuczna Inteligencja (AI)

Największa iteracja modelu: metryki jakości, kontrola treningu i reset wiedzy.
- **[Nowe]** Panel „Postęp i jakość AI” (precision, feedback trend, auto-safe runs/rollback, coverage danych).
- **[Nowe]** `Training Horizon` 30–730 dni i blacklisty treningu (exe + foldery) dostępne z poziomu UI.
- **[Nowe]** Reset wiedzy AI jednym kliknięciem (czyszczenie modelu + historii feedbacku + auto-runów).
- **[Usprawnienie]** Trening korzysta z bogatszego kontekstu: `file_path`, `detected_path`, `window_title`, `title_history`.

### Ustawienia (Settings)

Zakładka ustawień została przebudowana na czytelne sekcje robocze.
- **[Usprawnienie]** Nowy podział „General” + „Advanced/Algorithms” z lepszym grupowaniem opcji.
- **[Nowe]** Session Management: Merge Gap, Skip short sessions, Auto-rebuild on startup i ręczny rebuild sesji.
- **[Usprawnienie]** Session Split przeniesiony do sekcji zaawansowanej (max projects, tolerance, auto-split).
- **[Nowe]** Rozbudowany Online Sync: sync on startup, auto-sync interval, logging oraz status ACK/pending/reseed.

### Demon i Tray

Stabilniejsze sterowanie procesem i bardziej „uczciwy” pomiar aktywności.
- **[Usprawnienie]** Start/Stop/Restart demona czeka na realny stan procesu (polling), bez „ślepego” opóźnienia.
- **[Usprawnienie]** Wykrywanie dashboardu przez snapshot procesów (ToolHelp), bez zależności od `tasklist`.
- **[Nowe]** Idle guard: brak naliczania foreground, gdy użytkownik jest bezczynny (>= 2 min).
- **[Nowe]** Rejestrowanie `detected_path`, `activity_type` i `title_history` dla lepszego kontekstu AI.

### Dane i Import (Data)

Rozszerzona jakość importu i większe bezpieczeństwo operacji na bazie.
- **[Nowe]** Import zapisuje rozszerzone pola aktywności: `window_title`, `detected_path`, `title_history`, `activity_type`.
- **[Usprawnienie]** Walidacja nakładających się sesji w archiwum działa jednym przejściem SQL (temp table join).
- **[Fix]** `clear_all_data` czyści też `session_manual_overrides` i `tombstones`.
- **[Fix]** Bezpieczniejsze `export_database` (kontrola ścieżki + poprawne quotowanie).

### Wyceny i Analiza (Estimates + Analysis)

Moduły finansowe i analityczne zostały dopięte do nowego systemu kluczy i stabilniejszego renderu.
- **[Usprawnienie]** Ujednolicone walidacje i komunikaty błędów/zapisu w obu modułach.
- **[Usprawnienie]** Stabilniejsze odświeżanie zakresów i mniej zbędnych rerenderów toolbarów.
- **[Fix/Usprawnienie]** Lepszy flow przejścia z wycenionych „boosted sessions” bezpośrednio do widoku sesji.

### Pomoc (Help)

Dokumentacja została rozszerzona o nowe workflowy i scenariusze diagnostyczne.
- **[Usprawnienie]** Opisane nowe flow Sessions, AI i ReportView (w tym split pipeline oraz wydruk/PDF).
- **[Usprawnienie]** Dodane scenariusze Online Sync: ACK pending, server snapshot cleanup i relacja z Demo Mode.
- **[Usprawnienie]** Uzupełnione instrukcje dla nowych ustawień: Training Horizon, blacklisty, auto-split i auto-rebuild.

### Synchronizacja LAN

Pełna synchronizacja peer-to-peer w sieci lokalnej — zero chmury, zero kont, zero serwerów.
- **[Nowe]** 13-krokowy protokół synchronizacji z automatycznym wykrywaniem drugiego komputera (UDP broadcast).
- **[Nowe]** Automatyczna elekcja ról master/slave lub wymuszenie roli ręcznie w ustawieniach.
- **[Nowe]** Transfer danych po HTTP w sieci lokalnej — dane nie opuszczają sieci domowej.
- **[Nowe]** Scalanie baz SQLite z rozwiązywaniem konfliktów przez markery hashowe i system tombstone.
- **[Nowe]** Konfigurowalny interwał synchronizacji (ręcznie, co 4h, 8h, 12h, 24h lub 48h) i czas wykrywania peera.
- **[Nowe]** Automatyczny backup bazy przed każdą synchronizacją.

### Synchronizacja Online

Koordynowana synchronizacja przez internet z pełnym szyfrowaniem — dane trafiają na wydzielony storage, nie na serwery TIMEFLOW.
- **[Nowe]** Serwer koordynacji zarządza kolejnością synchronizacji (sesja, heartbeat, raportowanie kroków) — widzi tylko metadane, nigdy treść.
- **[Nowe]** Transfer przez SFTP z szyfrowaniem AES-256-GCM i jednorazowymi danymi dostępowymi per sesja.
- **[Nowe]** Delta sync — wysyłanie tylko zmienionych tabel na podstawie hashów (projekty, aplikacje, sesje, tombstones).
- **[Nowe]** Automatyczna synchronizacja przy starcie aplikacji lub w konfigurowalnych interwałach.
- **[Nowe]** Śledzenie postępu transferu w czasie rzeczywistym (13 kroków: discovery → negocjacja → transfer → scalanie → dystrybucja).
- **[Nowe]** Autoryzacja tokenowa (Bearer) z konfiguracją serwera i klucza API w ustawieniach.

### Sesje Manualne

Ręczne rejestrowanie pracy poza ekranem — spotkania, rozmowy i inne aktywności offline z pełną integracją w raportach.
- **[Nowe]** Trzy typy sesji manualnych: spotkanie, rozmowa telefoniczna, inne — z dedykowaną tabelą w bazie.
- **[Nowe]** Elastyczny zakres dat (wielodniowe sesje) z przypisaniem do projektu i aplikacji.
- **[Nowe]** Sesje manualne wliczane do statystyk projektowych, wycen i raportów na równi z sesjami automatycznymi.
- **[Nowe]** Obsługa tombstone dla sesji manualnych — pełna kompatybilność z synchronizacją LAN i Online.

To jest pełna lista zmian dla wydania **TIMEFLOW 0.1.6** (build 0.1.556) — w tym nowe moduły Synchronizacji LAN, Online Sync i Sesji Manualnych. Niżej znajdziesz zachowaną sekcję archiwalną dla wersji 0.1.5.

[Dołącz do testów beta](./index.html#beta) [Wróć na stronę główną](./index.html)

## Wersja 0.1.5 — pełny changelog (archiwum)

Poniżej pozostaje kompletna, archiwalna lista zmian z wydania **TIMEFLOW 0.1.5**. Zakres: Dashboard, Sessions, Projects, Estimates, Analysis, Applications, AI & Model, Settings, Data i Help.

Nowe funkcje Usprawnienia Naprawione błędy

### Dashboard (Panel Główny)

Monitoring statusu usług i szybszy odczyt stanu całej aplikacji z poziomu głównego widoku.
- **[Nowe]** Monitoring usług w czasie rzeczywistym (Daemon, Sync, AI) bez odświeżania okna.
- **[Usprawnienie]** Odświeżony wskaźnik wersji z kontrolą niekompatybilności silnika i informacją o konieczności reloadu.
- **[Nowe]** BugHunter Widget do szybkiego reagowania na błędy z bety.
- **[Nowe]** Dynamiczne liczniki osieroconych sesji w TopBarze (czerwone badge dla czasu bez przypisania).

### Sesje (Sessions)

Duży skok wydajności list i większa kontrola nad jakością przypisań AI.
- **[Usprawnienie]** Nowy silnik renderowania list oparty o wirtualizację dla tysięcy wpisów.
- **[Nowe]** Rozbudowany interfejs AI Score z paskami breakdown i oceną pewności przypisań.
- **[Nowe]** Trening przez wzmocnienie: Thumbs Up / Thumbs Down w tabeli sesji.
- **[Usprawnienie]** Lepsze dzielenie sesji obejmujących dowody z wielu projektów.
- **[Fix]** Uspójnione formaty czasu dla języka polskiego (np. „5 sty 2025”).

### Projekty (Projects)

Czytelniejsze metryki projektowe i szybsza praca z dużą listą klientów/projektów.
- **[Nowe]** Odświeżona karta projektów z licznikiem sesji i statusem AI.
- **[Nowe]** Licznik Boosted Sessions na kartach projektów i spójność z widokiem Wycen.
- **[Nowe]** Edycja koloru projektu przez dedykowaną paletę (`color` property).
- **[Usprawnienie]** Natychmiastowe filtrowanie projektów po nazwie + lepsza paginacja „Load more”.
- **[Usprawnienie]** Solidniejsze wykrywanie struktur klientów i podsumowań stawek.

### Wyceny (Estimates)

Lepszy UX ładowania i większa wiarygodność wartości finansowych.
- **[Fix]** Backend re-fetch nie „zamraża” tabeli przy zmianach sortowania dat.
- **[Fix]** Do Boosted Estimates trafiają tylko realne, istniejące sesje.
- **[Usprawnienie]** Lepsze podliczanie stawek globalnych i walut (PLN/USD/EUR) z dokładniejszym parsowaniem `currency`.

### Analiza Czasu (Analysis)

Szybsze przeliczanie danych i płynniejsze animacje wykresów.
- **[Usprawnienie]** Memoizacja sum Daily/Weekly/Monthly (Zustand + React useMemo) redukująca narzut operacji.

### Aplikacje (Applications)

Stabilniejsze działanie statystyk po przełączaniu języka interfejsu.
- **[Fix/Usprawnienie]** Zintegrowane i18n bez pustych kluczy i bez fallbacku do kodu inline.

### Model i Sztuczna Inteligencja (AI)

Większa przewidywalność decyzji modelu i lepszy sygnał do retreningu.
- **[Nowe]** Powiadomienia o nowej porcji wiedzy (pulsująca ikona New Data).
- **[Fix]** Twarde reguły AI Reassignment: ręcznie przepięta sesja nie wraca do starego wyboru AI.
- **[Usprawnienie]** Doprecyzowane progi bezpieczeństwa `min_confidence` i zachowania auto-przypisań.

### Ustawienia (Settings)

Większa kontrola wydajności UI i elastyczniejsze stylowanie interfejsu.
- **[Nowe]** Przełącznik animacji wykresów dla słabszych komputerów.
- **[Usprawnienie]** Custom UI Alerts (toasty i okna decyzyjne) zamiast surowych `alert()` / `confirm()`.

### Dane (Data)

Bezpieczniejsza i czytelniejsza obsługa backupu i synchronizacji.
- **[Usprawnienie]** Ciche kopie zapasowe + przycisk twardego odświeżenia Sync + komunikacja o stanie zaszyfrowanego backupu tokenowego.

### Pomoc (Help)

Dokumentacja dopięta do aktualnej logiki AI i pełnej spójności językowej.
- **[Usprawnienie]** Zaktualizowana sekcja AI & Model: auto-safe criteria, minimum confidence threshold i rola ręcznych flag.
- **[Usprawnienie]** Pełne pokrycie językowe wpisów i spójność terminologii PL/EN.

To jest archiwalna lista zmian dla wydania **TIMEFLOW 0.1.5**. Najnowsza sekcja 0.1.6 znajduje się wyżej.

[Dołącz do testów beta](./index.html#beta) [Wróć na stronę główną](./index.html)
