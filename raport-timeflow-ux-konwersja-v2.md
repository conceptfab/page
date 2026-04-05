# Raport UX/UI, Marketing & Konwersja — TIMEFLOW Landing Page
**URL:** conceptfab.com/timeflow/
**Data analizy:** 5.04.2026
**Testowane widoki:** Desktop (1400px), Mobile (375–400px)

---

## 1. PIERWSZE WRAŻENIE — Above the Fold (Desktop)

### Co działa dobrze
Hero headline "Kontroluj czas pracy bez zabijania flow." jest mocny — korzysta z języka grupy docelowej ("flow"), jest konkretny i zrozumiały. Kolorystyczne wyróżnienie drugiej linii buduje wizualną hierarchię. Monospace font (Roboto Mono) wzmacnia "nerdowski" charakter produktu.

### Problemy i sugestie

**Brak dominującego CTA w hero.**
Jedyne CTA dostępne w sekcji hero to "Poproś o dostęp do bety" — jednak jest ono wizualnie niewyróżnione. Ma background: transparent, brak koloru wypełnienia, bardzo małą czcionkę (11.52px). Przycisk "Dołącz do testów" w nawigacji też ma background: transparent i jedynie subtelne obramowanie. W efekcie użytkownik nie widzi żadnego wyraźnego, kontrastowego CTA natychmiast po wylądowaniu na stronie.

**Sugestia:** Główny CTA powinien mieć pełne wypełnienie akcentowym kolorem (np. #39D3FF — turkus, który już istnieje w palecie), biały tekst, padding min. 12–16px, i być umieszczony bezpośrednio pod opisem produktu — nie chowany w środku sekcji hero.

**Podtytuł jest za długi i technicznie przeciążony.**
"TIMEFLOW automatycznie zbiera dane, porządkuje sesje i pomaga przypisać czas do projektów. Dziś: tracking + analityka + AI sugestie + import/export + sync MVP. Jutro: pełny menedżer projektów z customowym drzewem folderów." — to zbyt wiele informacji naraz. Wzorzec "dziś / jutro" w opisie produktu sygnalizuje niegotowość i rozprasza uwagę.

**Sugestia:** Skróć podtytuł do jednego zdania korzyści, np. "Automatyczny tracking + AI przypisania + analityka. Offline. Bez subskrypcji." Roadmapę zachowaj w dedykowanej sekcji.

**"Beta" badge w logo** może budzić niepewność u nowych użytkowników.

**Sugestia:** Zamiast badge "Beta" przy logotypie, użyj osobnego komunikatu "Dołącz do programu beta — bezpłatnie" jako social proof / urgency cue.

---

## 2. HIERARCHIA WIZUALNA I FLOW STRONY

**Strona ma 9 498px wysokości na desktopie** (ok. 9.3 pełnych ekranów). To bardzo dużo dla strony, której celem jest konwersja do formularza beta.

**Kolejność sekcji jest nieoptymalną.** Obecny układ:
Hero → Slider interfejsu → Stack technologiczny → Funkcje → Aktualizacje → Dla kogo → Jak działa → Algorytm → Platformy → Roadmapa → O projekcie → FAQ → Formularz

Sekcja **Stack technologiczny** (Rust + Tauri, SQLite, React 19) jest umieszczona jako **drugą sekcją po hero** — to typowy błąd "mówienia o sobie zamiast o użytkowniku". Developerzy docenią, ale freelancer-grafik, który jest targetem, zobaczy tam nieznane słowa i odpadnie.

**Zalecana kolejność sekcji:**
1. Hero (z silnym CTA)
2. Slider aplikacji (social proof wizualny)
3. Dla kogo / jakie problemy rozwiązuje
4. Jak działa (3 kroki)
5. Kluczowe funkcje
6. Algorytm Uczciwego Czasu (differentiator)
7. FAQ
8. O projekcie / trust
9. Stack technologiczny (dla zainteresowanych)
10. Roadmapa
11. Formularz CTA

---

## 3. PRZYCISKI CTA — ANALIZA SZCZEGÓŁOWA

To jeden z największych problemów konwersyjnych na stronie. Wszystkie przyciski mają background: rgba(0,0,0,0) — czyli są transparentne. Nie ma ani jednego "solid" CTA w kolorze akcentu.

| Element | Tło | Kolor tekstu | Rozmiar czcionki |
|---|---|---|---|
| "Dołącz do testów" (nav) | transparent | #2C3342 | 10.88px |
| "Poproś o dostęp do bety" | transparent | #0B1014 | 11.52px |
| "Wyślij zgłoszenie" | transparent | #0B1014 | 11.52px |
| "Zobacz możliwości" | transparent | #2C3342 | 11.52px |

**Sugestie:**
- Główny CTA (np. "Dołącz do bety") powinien być jedynym elementem w kolorze pełnego akcentu (#39D3FF lub głębszy kolor z palety).
- "Wyślij zgłoszenie" w formularzu — to ostateczna konwersja. Powinien być najbardziej wyróżnionym buttonem na stronie, z pełnym kolorem tła, białym tekstem i wyraźnym hover state.
- Rozważ zmianę label z "Wyślij zgłoszenie" na bardziej nastawiony na korzyść: "Zapisz się do bety →" lub "Chcę testować TIMEFLOW".

---

## 4. SLIDER INTERFEJSU — PROBLEM UX

Slider z ekranami aplikacji jest ogromnym elementem strony (zajmuje prawie cały viewport). Nawigacja strzałkami < i > jest wizualnie ledwo widoczna (małe, słabo ostylowane przyciski — zaledwie 36×36px, poniżej standardu 44px). Nie ma jasnej informacji ile jest ekranów (widoczne są tylko przyciski bez numerowania), a brak autoplay może powodować, że wielu użytkowników w ogóle nie odkryje kolejnych ekranów.

**Sugestia:** Dodaj widoczny licznik slajdów (np. "1 / 6"), rozważ thumbnails lub nazwy zakładek widocznych na stałe (Dashboard / Projects / Sessions / AI). To znacznie poprawi eksplorację produktu. Na mobile kropki nawigacyjne mają zaledwie 8×8px — całkowicie nieużywalne dotykowo (wymagane min. 44px obszaru klikalnego).

---

## 5. MARKETING — PROPOZYCJA WARTOŚCI

### Co jest mocne
- Unikalny differentiator "Algorytm Uczciwego Czasu" (zero podwójnego liczenia) — to **bardzo silna** propozycja wartości, której nie ma konkurencja. Powinna być wyeksponowana znacznie wcześniej, nie dopiero w 8. sekcji.
- Komunikat "Offline, dane lokalne, żadnych subskrypcji" — trafiony dla audience, który nie chce kolejnego SaaS.
- Sekcja "Dla kogo" z segmentacją (Grafik, UI/UX, Developer) — dobra personalizacja.

### Co wymaga pracy

**Brak social proof.**
Strona nie zawiera ani jednej opinii, cytatu testera, ani liczby (np. "już 47 freelancerów testuje TIMEFLOW"). Nawet jeden cytat osoby z bety ("W końcu wiem ile realnie zarabiam na projekcie" — Marta, freelance UI designer) drastycznie zwiększyłby zaufanie.

**Sekcja Aktualizacje (0.1.6)** w środku strony osłabia wiarę w produkt. Numer wersji 0.1.6 sugeruje wczesne stadium. Jeśli już musisz pokazywać wersję, zmień podejście: zamiast "0.1.6" napisz "Ostatnia aktualizacja: marzec 2026 — nowe funkcje AI i sync". Changelog jest wartościowy dla już zainteresowanych — daj go do stopki lub osobnej zakładki.

**Komunikaty o planowanych platformach** (macOS, Linux, mobile) pojawiają się w sekcji Platformy ze statusem "Planowane" — to może zniechęcić użytkowników Mac/Linux. Albo zaanonsuj przybliżone daty, albo przesuń tę sekcję niżej.

**Brak cennika/modelu biznesowego.** Choć beta jest bezpłatna, użytkownicy będą się zastanawiać "co potem?". Jedno zdanie ("Beta jest bezpłatna. Model po premierze — wkrótce.") zmniejszy tarcie.

---

## 6. DESIGN — SPÓJNOŚĆ I TYPOGRAFIA

### Paleta kolorów
Paleta jest interesująca, ale underutilizowana w kontekście konwersji:
- Turkus #39D3FF — pojawia się w nagłówku i akcentach, ale nie jest użyty w CTA.
- Fiolet #8A5CFF — sporadycznie.
- Różowy/magenta #FF4FD2 — incydentalnie.
- Ciemny granat #2C3342 — tekst główny.
- Tło: prawie białe z ledwo widocznym gradient/glass effect.

**Sugestia:** Zdecyduj na jeden kolor akcji CTA (turkus lub fiolet) i używaj go **wyłącznie** na przyciskach konwersji. Reszta elementów w kolorze = rozproszenie uwagi od CTA.

### Typografia
**Roboto Mono jako jedyna czcionka** buduje spójny charakter produktu dla techów, ale może utrudniać czytelność długich akapitów. Monospace ma węższe litery i mniejszy kern niż czcionki proporcjonalne, przez co teksty opisu wymagają więcej wysiłku poznawczego.

**Sugestia:** Zostaw Roboto Mono dla nagłówków i etykiet, a do body copy (dłuższe akapity opisowe) wprowadź czcionkę proporcjonalną (np. Inter, System UI) — poprawi to czytelność o ~20–30%.

**Rozmiar czcionki body: 14.08px** — to minimum akceptowalne na desktopie, nieakceptowalne na mobile. W sekcjach z gęstą treścią warto podnieść do 15–16px.

**Spójność nagłówków:** niektóre H3 tytułują główne sekcje zamiast używać H2 — hierarchia semantyczna jest zaburzona (H1 → H3 → H2 → H3...), co wpływa na SEO i accessibility.

---

## 7. FORMULARZ BETA — ANALIZA KONWERSJI

Formularz jest dobrze zaprojektowany strukturalnie (imię, email, branża, pole opisowe, checkbox), ale ma kilka problemów:

**Pole "Na czym najbardziej Ci zależy?"** — textarea bez placeholder-a z przykładem. Dodaj placeholder np.: "np. chcę wiedzieć ile realnie zarabiam na projekcie, mam chaos przy kilku klientach..." — obniży tarcie poznawcze.

**Checkbox zgody ma niepełny tekst:** "Chcę wziąć udział w testach beta i kontakt w sprawie . Zapoznałem/am się z..." — brakuje nazwy produktu w środku zdania. Błąd w implementacji template.

**Lista korzyści "Co dostajesz"** jest zbyt ogólna ("wcześniejszy dostęp, realny wpływ na roadmapę, szybkie iteracje").

**Sugestia:** Dodaj konkrety: "Dostęp do buildu w ciągu 48h od weryfikacji", "Twoje feature requesty trafiają bezpośrednio do backlogu".

**Brak mikro-copy pod formularzem.** Dodaj pod buttonem: "Nie wysyłamy spamu. Kontaktujemy się tylko w sprawie bety." — to standardowy anxiety reducer.

**Button "Wyślij zgłoszenie" ma zaledwie 29px wysokości** — poniżej minimalnego standardu dotyku (44px), zarówno na desktop jak i mobile.

---

## 8. NAWIGACJA

Nawigacja ma 7 linków + przełącznik języka + CTA. To **za dużo pozycji** jak na stronę konwersyjną. Każdy dodatkowy link to "wyjście" z funnela konwersji.

**Sugestia:** Uprość do: Funkcje | Jak działa | FAQ | [Dołącz do bety →]. "Stack", "Aktualizacje", "Roadmapa", "Pomoc" przenieś do stopki. Zostaw nawigację lekką i ukierunkowaną na konwersję.

**Link "PL/EN"** w nawigacji — warto upewnić się, że wersja angielska jest kompletna, bo wpływa to na potencjalnych użytkowników z innych krajów.

---

## 9. SEO I TECHNICZNE

**Title page:** "TIMEFLOW | Desktopowy time tracker dla freelancerów (beta)" — solidny, zawiera keyword. Można rozważyć: "TIMEFLOW — Time Tracker dla Freelancerów | Offline, bez subskrypcji" dla lepszego CTR w wynikach wyszukiwania.

**Struktura nagłówków jest zaburzona** (H1 → H3 → H2 → H3...) — search engines mogą mieć problem z rozumieniem hierarchii treści.

**Brak schematów strukturalnych** (FAQ Schema, SoftwareApplication Schema) — a strona ma FAQ i jest stroną produktu software. Implementacja JSON-LD znacznie poprawi wygląd w Google.

**Slider zdjęć aplikacji** używa img z alt textem — pozytywne. Sprawdź czy wszystkie obrazy są zoptymalizowane i serwowane w formacie WebP.

---

## 10. ANALIZA MOBILE (375–400px)

### Co działa dobrze na mobile
- Strona skaluje się bez poziomego przewijania (brak overflow).
- Układ kolumnowy przechodzi poprawnie w single-column.
- Header jest sticky — nawigacja zawsze dostępna.
- Hamburger menu jest obecne, działa i wyświetla czytelną listę linków.
- Obrazy skalują się poprawnie, nie wychodzą poza ekran.
- Pola formularza mają odpowiednią wysokość (40px inputy, 104px textarea).
- H1 skaluje się do 32px — czytelny.

---

### Krytyczne problemy mobile

**1. Strona ma 17 811px wysokości na mobile — to 19 pełnych ekranów.**
Dla porównania: na desktopie to ~9 500px / 9 ekranów. Na mobile każda sekcja z kartami (funkcje, stack, algorytm, roadmapa) przechodzi z układu wielokolumnowego na single-column, co wielokrotnie wydłuża stronę. 8 kart funkcji na desktopie = 2 rzędy po 4. Na mobile = 8 ekranów przewijania samych tylko funkcji. Przy tak długiej stronie mobile większość użytkowników nigdy nie dotrze do formularza beta.

**Sugestia:** Na mobile rozważ accordion lub taby dla sekcji "Funkcje" i "Stack". Zamiast 8 rozłożonych kart, jedna sekcja z przełącznikami (Tracking / Dashboard / AI / Estimates) skróci stronę o ~5 ekranów.

**2. Wszystkie przyciski CTA są za małe dla dotyku (poniżej standardu 44×44px):**

| Przycisk | Wysokość zmierzona | Standard WCAG |
|---|---|---|
| "Poproś o dostęp do bety" | 29px | min. 44px |
| "Wyślij zgłoszenie" | 29px | min. 44px |
| "Testy beta" (nav) | 33px | min. 44px |
| < slider (poprzedni) | 36px | min. 44px |
| > slider (następny) | 36px | min. 44px |
| "Akceptuję" (cookie) | 28px | min. 44px |
| "Odrzucam" (cookie) | 28px | min. 44px |

Żaden interaktywny element nie spełnia minimalnego rozmiaru dotyku. To fundamentalny problem UX na mobile, który bezpośrednio obniża konwersję.

**3. Kropki nawigacji slidera mają 8×8px.**
Są to przyciski interaktywne (zmieniają slajd), ale mają zaledwie 8×8px — są w praktyce nieużywalne na dotykowym ekranie. Powinny mieć co najmniej 44×44px obszaru dotyku (można rozwiązać przez padding bez zmiany wyglądu).

**4. Sekcja funkcji zaczyna się dopiero na pozycji ~4 600px od góry** (ekran nr 5 na mobile).
Użytkownik mobile najpierw musi przescrollować przez: hero (2 109px) + sekcję komunikatów (364px) + cały Stack technologiczny (2 199px) — zanim zobaczy cokolwiek o funkcjach produktu. Sekcja Stack jest szczególnie zabójcza dla mobile — zawiera 6 kart technicznych jedna pod drugą (Rust, SQLite, React, Daemon, Tokio, Next.js), zajmując 2 199px.

**5. Brak sticky CTA na mobile.**
Na desktopie użytkownik ma nawigację z "Dołącz do testów" zawsze w zasięgu. Na mobile przycisk nawigacyjny jest ukryty (visibility: hidden), a hamburger menu nie zawiera wyróżnionego CTA. Formularz jest na pozycji ~15 773px — 17. ekran przewijania.

**Sugestia:** Dodaj sticky bar u dołu ekranu na mobile z przyciskiem "Dołącz do bety →". To jeden z najsilniejszych wzorców konwersyjnych na mobile.

**6. Czcionki poniżej standardu czytelności:**
- Podtytuł nad H1: 11.52px (Google rekomenduje min. 16px na mobile)
- Etykiety slajdów: 10.88px
- Małe labelki sekcji: 10.88px

**7. Sekcja funkcji zaczyna się za późno.** Na mobile "Poproś o dostęp do bety" pojawia się na pozycji 259px od góry (w pierwszym viewporcie) — to pozytywne. Jednak jest to niewyróżniony link, który łatwo przeoczyć.

**8. Brak swipe gesture na sliderze.**
Slider aplikacji na mobile obsługuje tylko przyciski < >, bez obsługi swipe/drag. Na urządzeniach dotykowych swipe jest naturalnym gestem nawigacji przez zdjęcia — jego brak sprawia, że slider jest mniej intuicyjny.

### Dodatkowe sugestie mobile

- **Accordion dla FAQ** — zamiast pełnych bloków tekstu, FAQ powinno mieć rozwijalne pytania. Skróci sekcję o ~60%.
- **Wyłącz lub schowaj na mobile:** sekcję Stack technologiczny (lub accordion), sekcję Roadmapa, sekcję Platformy. Nie wpływają na konwersję mobilną.
- **Rozważ skrócenie hero na mobile:** długi podtytuł produktu (6 linii tekstu na 375px) powinien być skrócony do 2–3 linii. Użytkownik mobile chce dotrzeć do produktu szybciej.

---

## 11. PODSUMOWANIE PRIORYTETÓW

### KRYTYCZNE — zrób natychmiast (bezpośredni wpływ na konwersję)
1. **Solid CTA button** — dodaj pełne tło akcentowe (#39D3FF lub ciemniejszy) do "Wyślij zgłoszenie", "Poproś o dostęp" i "Dołącz do testów".
2. **Rozmiar touch targets** — wszystkie przyciski na min. 44px wysokości (mobile i desktop).
3. **Przesuń Stack technologiczny** na koniec strony — nie jako 2. sekcję.
4. **Napraw błąd w checkboxie zgody** — brakuje nazwy produktu w środku tekstu.
5. **Dodaj social proof** — choćby 1–2 cytaty testerów lub liczba ("X freelancerów w becie").
6. **Sticky CTA bar na mobile** — przycisk dostępny przez cały czas scrollowania.

### WAŻNE — następna iteracja
7. Skróć podtytuł hero, usuń "dziś/jutro" na rzecz jednego zdania wartości.
8. Przenieś Aktualizacje (changelog) do stopki lub osobnej strony.
9. Uprość nawigację do 4 pozycji (Funkcje | Jak działa | FAQ | [CTA]).
10. Dodaj licznik slajdów i popraw UX slidera (swipe na mobile, większe dots).
11. Dodaj micro-copy pod formularzem ("Nie wysyłamy spamu.").
12. Podnieś rozmiar czcionki body do 15–16px (szczególnie mobile).
13. Accordion lub taby dla sekcji Funkcje i Stack na mobile — skróci stronę o ~5 ekranów.
14. Dodaj placeholder do textarea formularza z przykładem.

### DŁUGOTERMINOWE
15. Wprowadź czcionkę proporcjonalną (Inter/System UI) dla body copy — poprawi czytelność.
16. Zaimplementuj FAQ Schema i SoftwareApplication Schema (JSON-LD).
17. Dodaj licznik testerów/użytkowników (nawet "50+ freelancerów w becie").
18. Rozważ wideo-demo produktu jako uzupełnienie statycznego slidera.
19. Napraw hierarchię nagłówków (H1 → H2 → H3) dla SEO i accessibility.
20. Zoptymalizuj obrazy do formatu WebP z lazy loading.

---

## APPENDIX — Zebrane dane techniczne

### Desktop (1400px)
- Całkowita wysokość strony: 9 498px (~9.3 ekranów)
- Liczba sekcji: 13
- Czcionka body: Roboto Mono, 14.08px
- Tło body: rgba(0,0,0,0) / prawie biały gradient
- Kolor tekstu głównego: rgb(44, 51, 66)
- Kolory akcentów: #39D3FF (turkus), #8A5CFF (fiolet), #FF4FD2 (magenta)
- Wszystkie CTA background: rgba(0,0,0,0) — BRAK solid fill

### Mobile (375–400px)
- Całkowita wysokość strony: 17 811px (~19 ekranów)
- Viewport: 400×934px
- H1 font-size: 32px
- Pola formularza: 300px szerokość, 40px wysokość (inputy), 104px (textarea)
- Brak poziomego overflow
- Wszystkie touch targets poniżej 44px WCAG minimum
- Slider dots: 8×8px (nieużywalne dotykowo)
- Sekcja beta (formularz): offsetTop 15 773px = ekran nr 17

---

*Raport przygotowany na podstawie analizy automatycznej i manualnej strony conceptfab.com/timeflow/ w dniu 5.04.2026. Analiza obejmuje desktop (1400px) i mobile (375px). Nie testowano tablet (768px) osobno — strona używa jednego mobile breakpointa.*
