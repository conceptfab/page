# Dokumentacja Nadchodzących Funkcji - Wersja 0.1.5 (TIMEFLOW)

Poniżej znajduje się chronologiczne i tematyczne zestawienie funkcji, usprawnień oraz naprawionych błędów, które wejdą w skład nadchodzącej wersji aplikacji **TIMEFLOW 0.1.5**.

Zestawienie zostało podzielone na odpowiednie zakładki aplikacji dla łatwiejszej orientacji.

---

## 📊 Dashboard (Panel Główny)

- **Monitoring usług w czasie rzeczywistym:** Nowe wskaźniki dla procesu Demona, statusu synchronizacji chmurowej oraz stanu modułu Sztucznej Inteligencji (AI) bez konieczności odświeżania okna.
- **Szybki podgląd wersji:** Odświeżony wskaźnik wersji w lewym panelu z kontrolą niekompatybilności silnika i wymogiem odświeżenia okna.
- **BugHunter Widget:** Przycisk szybkiego reagowania na błędy do błyskawicznego weryfikowania zgłoszeń z wersji Beta z informacją o lokalizacji wewnątrz interfejsu (lewy dolny róg).
- **Zasobnik nawigacyjny (TopBar):** Dynamiczne liczniki nieprzypisanych poprawnie sesji z uwagą wizualną (\*czerwone badge) by poinformować o "osieroconym" czasie (sesjach bez przypisanego projektu dla obcenego dnia i historycznie).

## 🕒 Sesje (Sessions)

- **Wirtualizacja Pamięci (Performance Boost):** Zupełnie nowy silnik renderujący długie listy sesji bazujący na wirtualizacji. Gwarantuje płynne działanie interfejsu nawet przy rocznych podsumowaniach i tysiącach wpisów.
- **Rozbudowany interfejs "AI Score":** Dodano czytelne paski breakdown oceny i szansy przypisania poszczególnych okien do projektów z dokładnym podglądem wyników pewności od algorytmu (działa globalnie w trybach: AI Data, Detailed i Compact).
- **Trenowanie przez wzmocnienie:** Oceny sesji można weryfikować u dołu tabeli za pomocą przycisków typu "Thumbs Up" (Potwierdzenie) oraz "Thumbs Down" (Błąd / Ręczne przepięcie w menu kontekstowym). Buduje to odporność modelu na utratę wiedzy ("knowledge leaks").
- **Dzielenie Sesji:** Udoskonalone operowanie na sesjach zawierających dowody realizacji wielu projektów.
- **Poprawne formaty czasu:** Uspójnienie wyświetlania dat dla języka polskiego (np. "5 sty 2025" zamiast "sty 5, 2025").

## 📁 Projekty (Projects)

- **Licznik "Boosted Sessions":** Dodano całkowicie nowy wskaźnik na kartach poszczególnych projektów informujący podsumowująco o liczbie sesji i projektów uznanych za "Boosted" (zapobiega nieścisłościom zliczania z widoku "Wyceny/Estimates").
- **Edycja Koloru Projektu:** Pełna personalizacja karty poprzez dedykowaną paletę, wspomagająca łatwiejszą identyfikację wizualną w wykresach i panelach na podstawie customowego `color` property.
- **Wyszukiwanie Zoptymalizowane:** Natychmiastowe filtrowanie projektów w głównej liście na bazie samej nazwy (optymalizacja query backendowego i paginacja ładowania wyników list po kliknięciu "Load more").
- **Struktury klientów:** Solidniejsze wykrywanie "od nowa" list i nazw przypisanych do odgórnego katalogu klienta z uspójnionym silnikiem podsumowującym stawki.

## 💰 Wyceny (Estimates)

- **Poprawy mechanizmu ładowania (UX):** Skrypty backendowe re-fetchujące informacje nie potraktują już tabeli jako "zamrożonej" podczas zmian w dacie sortowania. Zastosowano precyzyjne animacje ładowania.
- **Konsystencja z Sesjami:** Tylko realne i istniejące nadal sesje wliczają się do widoków Boosted Estimates z pominięciem "martwych punktów" bazy.
- **Stawki Globalne:** Udoskonalony moduł podliczania ogólnego z uwzględnieniem kosztów wielowalutowych (PLN, USD, EUR) zgodnie z ustawieniami platformy. Wprowadzono precyzyjniejsze parsowanie `currency`.

## 📈 Analiza Czasu (Analysis)

- **Szybkie przeliczanie sum (Memoizacja):** Optymalizacje w tle dla zakładek Daily/Weekly/Monthly. Narzut operacji zredukowano korzystając z silnika Zustand połączonego z React useMemo z korzyścią dla szybkości animacji słupków.

## 🪟 Aplikacje (Applications)

- **Zintegrowane i18n:** Aplikacje monitorują pełny pakiet statystyk przełączając się stabilnie asynchronicznie między polskim i angielskim bez problemu z pustymi kluczami (brak fallbacku do kodu inline, spójne logiki tlumaczeń).

## 🧠 Model i Sztuczna Inteligencja (AI)

- **Powiadomienia o nowej porcji wiedzy:** Moduł poinformuje ikoną "Pulsowania" (New Data) na lewym pasku i przy samej karcie, jeśli uzbiera feedback od użytkownika wystarczający co najmniej do kolejnego odświeżenia wag algorytmu.
- **Logika przypisywania AI Reassignment:** Ustalono twarde reguły przypisywania. Cofa to problem, w którym raz przepięta ręcznie sesja wracała do poprzedniego wyboru AI. (Wpływ nowej wagi feedbackowej).
- **Zarządzanie bezpieczeństwem (`min_confidence`):** Dokładnie wyzerowane progi zachowań (np. algorytm od 85% wzwyż auto-przypisuje) oraz auto-bezpieczeństwo danych w trakcie nauki.

## ⚙️ Ustawienia (Settings)

- **Przełącznik animacji wykresów:** Zupełnie nowa funkcja dedykowana słabszym komputerom. Pozwala wyłączyć animacje interfejsu (biblioteki Recharts), by renderować aplikację z najwyższą możliwą prędkością.
- **Motyw QX-0 / QX-4 (Stylowanie menu):** Możliwość wyboru bardzo czystego tematu QX-0 (pozbawionego zaokrąglonych krawędzi, `rounded-none`) lub cieplejszej tonacji QX-4 przy nienaruszaniu estetyki głównego oprogramowania.
- **Custom UI Alerts:** Pozyskanie bezpiecznych komunikatów natywnych typu "Toast" oraz ładniejszych okien z alertem decyzyjnym UI zamiast surowych promptów pzeglądarkowych `alert()` oraz `confirm()`.

## 📦 Dane (Data)

- **Ciche kopie zapasowe:** Optyzmalizowany harmonogram z dedykowanym przyciskiem twardego odświeżenia chmurowego (Sync) oraz komunikacją co do poprawności zaszyfrowanego backupu tokenowego u góry okna.

## 💡 Pomoc (Help)

- **Zaktualizowana Dokumentacja AI:** Sekcja "Sztuczna inteligencja & Model" otrzymała nowo sformułowane wagi w instrukcjach, w tym opis "auto-safe criteria", zasady "minimum confidence threshold" oraz znaczenie ręcznych flag, żeby użytkownik wiedział dokładnie na jakich zasadach asystuje mu algorytm.
- **Pełne pokrycie językowe:** Nowe wpisy dodane ze 100% zachowaniem profesjonalnego standardu spójności językowej. (Tylko Quick Start oraz Pomoc operuje na ojczystym języku docelowym w pełni odizolowana architekturą od tłumaczeń angielskich).

---

_Ten dokument stanowi punkt odniesienia do zmian i oczekiwanych stabilizacji aplikacji podczas przechodzenia z wersji <= 0.1.48 na stabilną platformę docelową._
