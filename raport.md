# Raport analityczny: TIMEFLOW Landing Page

**URL PL:** <https://conceptfab.com/timeflow/>
**URL EN:** <https://conceptfab.com/timeflow/en/>
**Data pierwszej analizy:** 23 lutego 2026 (Perplexity AI)
**Aktualizacja:** 23 lutego 2026 (weryfikacja kodu źródłowego)
**Przygotował:** Perplexity AI + Claude Code dla CONCEPTFAB

---

## Spis treści

1. [Status wdrożeń z pierwszej analizy](#1-status-wdrożeń-z-pierwszej-analizy)
2. [Spójność PL ↔ EN](#2-spójność-pl--en)
3. [SEO – audyt techniczny](#3-seo--audyt-techniczny)
4. [Google Analytics & GDPR](#4-google-analytics--gdpr)
5. [Kod i wydajność](#5-kod-i-wydajność)
6. [UX i konwersja](#6-ux-i-konwersja)
7. [Priorytetyzowana lista poprawek](#7-priorytetyzowana-lista-poprawek)

---

## 1. Status wdrożeń z pierwszej analizy

Weryfikacja kodu źródłowego (pliki `index.html`, `en/index.html`, `consent.js`, `script.js`, `sitemap.xml`, `robots.txt`) wykazała, że wiele punktów z oryginalnego raportu zostało wdrożonych — ale nie wszystkie, a kilka wdrożeń ma problemy.

### Wdrożone poprawnie ✅

| Punkt | Status | Szczegóły |
|---|---|---|
| Meta description | ✅ Wdrożone | PL i EN mają unikalne opisy, dobra długość |
| hreflang tags | ✅ Wdrożone | `pl`, `en`, `x-default` w obu wersjach |
| Open Graph tags | ✅ Wdrożone | `og:title`, `og:description`, `og:locale`, `og:url` — poprawne |
| Twitter Cards | ✅ Wdrożone | `summary_large_image` z tytułem i opisem |
| Schema.org | ✅ Wdrożone | `SoftwareApplication` + `FAQPage` (JSON-LD) |
| Canonical tags | ✅ Wdrożone | Poprawne URL-e na obu wersjach |
| Pisownia TIMEFLOW | ✅ Naprawione | EN nie używa już „TimeFlow" — wszędzie `TIMEFLOW` |
| Link #demo | ✅ Naprawione | `id="demo"` dodane do `div.hero-showcase` |
| sitemap.xml | ✅ Istnieje | Z hreflang alternates dla PL i EN |
| robots.txt | ✅ Istnieje | Poprawny, wskazuje na sitemap |
| Cookie consent (kod) | ✅ Napisany | `consent.js` — Consent Mode v2 + banner |

### Wdrożone z błędami ⚠️

| Punkt | Problem |
|---|---|
| **og:image** | Wskazuje na `screens/dashboard-main.png` — plik **nie istnieje** na serwerze. Jedyny plik to `dashboard-main_wynik.webp`. Social sharing (Facebook, LinkedIn, Twitter, Discord) nie wyświetli obrazka. |
| **consent.js** | Plik istnieje i jest poprawnie napisany, ale **nie jest załadowany** na żadnej stronie — brak `<script src="./consent.js">` w HTML. GA4 i cookie banner są nieaktywne. |
| **Alt-texty obrazów** | Raport wskazywał błąd tylko w PL — w rzeczywistości **obie wersje** (PL i EN) mają uszkodzone alt-texty z surowym HTML: `<span class="tf-style">TIMEFLOW</span>` |

### Niewdrożone ❌

| Punkt | Status |
|---|---|
| H1 z keyword „time tracker" | ❌ H1 zmienione na nowe hasło, ale nadal bez frazy kluczowej |
| Noscript fallback | ❌ Brak (slider, animacje, formularz wymagają JS) |

---

## 2. Spójność PL ↔ EN

### 2.1 Niespójności do naprawienia

| Element | Wersja PL | Wersja EN | Problem |
|---|---|---|---|
| Alt-text obrazów | `Zrzut ekranu <span class="tf-style">TIMEFLOW</span> Dashboard"` | `<span class="tf-style">TIMEFLOW</span> Dashboard screenshot"` | **Obie wersje** mają broken HTML w alt-text (cudzysłowy w `<span>` przerywają atrybut `alt`) |
| Rotator w hero | „grafików" | „designers" | PL zawęża do grafików, EN ogólne „designers" — różna precyzja |
| Link w nav PL | „Testy beta" | — | — |
| Link w footer PL | „Beta testy" | — | Niespójna kolejność słów: nav → „Testy beta", footer → „Beta testy" |
| Podtytuł workflow | „Od surowych sesji do gotowego **rozliczenia**." | „From raw sessions to a finished **invoice**." | Rozliczenie ≠ invoice; rozliczenie to szerszy termin niż faktura |

### 2.2 Elementy spójne ✅

- Struktura nawigacji (kolejność sekcji)
- Statystyki liczb (10+ modułów, 1 platforma, 3 tryby AI)
- Opcje select w formularzu beta
- Kotwice anchor (#stack, #workflow, #roadmap, #beta)
- Polityka prywatności i checkbox RODO
- Stopka z dynamicznym rokiem ©
- Wszystkie 9 sekcji funkcji (identyczna lista)
- Pisownia TIMEFLOW (caps) — spójna
- Schema.org JSON-LD (SoftwareApplication + FAQPage) — spójne per język

---

## 3. SEO – audyt techniczny

### 3.1 Title Tags ✅

| Wersja | Title | Ocena |
|---|---|---|
| PL | `TIMEFLOW \| Desktopowy time tracker dla freelancerów (beta)` | ✅ dobry, 57 znaków |
| EN | `TIMEFLOW \| Desktop time tracker for freelancers (beta)` | ✅ dobry, 55 znaków |

**Uwaga:** `(beta)` może obniżać CTR. Rozważyć „(Early Access)" lub usunięcie.

### 3.2 Meta Description ✅

Wdrożone poprawnie. PL i EN mają unikalne, dobrze napisane opisy.

### 3.3 Nagłówki H1 — BEZ KEYWORD ⚠️

| Wersja | Aktualny H1 | Problem |
|---|---|---|
| PL | „Pracujesz i widzisz jak zarabiasz." | Brak „time tracker" / „tracker czasu" |
| EN | „You work. You see what you're earning." | Brak „time tracker for freelancers" |

H1 jest chwytliwy i marketingowy, ale nie zawiera frazy kluczowej. Opcje:
- Zmienić H1 na frazę z keyword
- LUB dodać widoczny `<h2>` pod H1 z frazą „Desktopowy time tracker dla freelancerów" (PL) / „Desktop time tracker for freelancers" (EN)

### 3.4 Alt-texty obrazów — BŁĄD KRYTYCZNY ❌

**Obie wersje** (PL i EN) mają uszkodzone alt-texty. W atrybucie `alt` znajduje się surowy HTML:

```
alt="Zrzut ekranu <span class=" tf-style">TIMEFLOW</span> Dashboard"
```

Cudzysłowy wewnątrz `<span class="...">` przerywają atrybut `alt`, przez co:
- przeglądarki widzą `alt="Zrzut ekranu <span class="` jako cały alt
- reszta staje się nieznanymi atrybutami HTML
- Google widzi uszkodzony markup
- czytniki ekranowe odczytają nonsensowny tekst

**Przyczyna:** W HTML wpisano `<span class="tf-style">TIMEFLOW</span>` wewnątrz atrybutu `alt`, ale nie zaescapowano cudzysłowów. Alt-text to plain text — nie może zawierać HTML.

**Dotyczy 14 elementów `<img>`** (7 w PL, 7 w EN) — główny obraz hero + 6 miniaturek.

**Poprawka PL:**

```
alt="TIMEFLOW Dashboard – widok dzienny z metrykami i timeline"
alt="TIMEFLOW Projects – foldery projektowe i auto-detekcja"
alt="TIMEFLOW Sessions – pogrupowane sesje z przypisaniami AI"
alt="TIMEFLOW Time Analysis – heatmapa i wykresy czasu pracy"
alt="TIMEFLOW Estimates – wycena wartości pracy freelancera"
alt="TIMEFLOW AI Model – sugestie przypisań i tryb auto_safe"
```

**Poprawka EN:**

```
alt="TIMEFLOW Dashboard – daily view with metrics and timeline"
alt="TIMEFLOW Projects – project folders and auto-detection"
alt="TIMEFLOW Sessions – grouped sessions with AI assignments"
alt="TIMEFLOW Time Analysis – heatmap and work time charts"
alt="TIMEFLOW Estimates – freelancer work value estimates"
alt="TIMEFLOW AI Model – assignment suggestions and auto_safe mode"
```

### 3.5 hreflang, Canonical, Schema.org ✅

Wszystkie wdrożone poprawnie.

### 3.6 Open Graph / Twitter — PROBLEM Z OBRAZKIEM ⚠️

Tagi OG i Twitter Card są wdrożone poprawnie, ale **og:image i twitter:image wskazują na nieistniejący plik:**

```
https://conceptfab.com/timeflow/screens/dashboard-main.png
```

Na serwerze istnieje tylko `screens/dashboard-main_wynik.webp`. Potrzeba:
- Wygenerować plik `screens/dashboard-main.png` (1200×630 px, optymalne dla social sharing)
- LUB zmienić ścieżkę na istniejący plik (uwaga: nie wszystkie platformy wspierają WebP w OG)

**Rekomendacja:** Stworzyć dedykowany `og-image.png` 1200×630 px z brandingiem TIMEFLOW i zrzutem dashboardu.

### 3.7 Link #demo ✅

Naprawione — `id="demo"` dodane do `div.hero-showcase`. Przycisk „Zobacz demo" / „View demo" przewija do sekcji ze screenshotami.

### 3.8 Podsumowanie SEO Score (zaktualizowane)

| Obszar | Status | Priorytet |
|---|---|---|
| Title tags | ✅ OK | – |
| Meta description | ✅ OK | – |
| H1 z keyword | ⚠️ Brak frazy kluczowej | 🟡 Średni |
| Alt-texty PL + EN | ❌ Uszkodzone (oba!) | 🔴 Wysoki |
| hreflang | ✅ OK | – |
| Open Graph | ⚠️ Brak działającego obrazka | 🔴 Wysoki |
| Twitter Cards | ⚠️ Brak działającego obrazka | 🔴 Wysoki |
| Schema.org | ✅ OK (SoftwareApplication + FAQPage) | – |
| Canonical | ✅ OK | – |
| Link #demo | ✅ OK | – |
| sitemap.xml | ✅ OK | – |
| robots.txt | ✅ OK | – |

---

## 4. Google Analytics & GDPR

### 4.1 consent.js — napisany, ale NIEZAŁADOWANY ❌

Plik `consent.js` jest poprawnie napisany i zawiera:
- Consent Mode v2 z domyślnym `denied`
- Ładowanie GA4 (ID: `G-679Z08CKLW`)
- Cookie banner z tłumaczeniami PL/EN
- Zapis preferencji w `localStorage`
- `anonymize_ip: true`

**Problem:** Ani `index.html`, ani `en/index.html` nie zawierają `<script src="./consent.js">`. Plik jest martwy — GA4 nie zbiera danych, banner cookies nie jest wyświetlany.

**Poprawka** — dodać przed zamknięciem `</body>` w obu plikach HTML:

```html
<!-- PL: index.html -->
<script src="./consent.js"></script>
<script src="./script.js"></script>

<!-- EN: en/index.html -->
<script src="../consent.js"></script>
<script src="./script.js"></script>
```

**Uwaga:** `consent.js` powinien ładować się **przed** `script.js`, aby `gtag()` była dostępna globalnie, gdyby w przyszłości dodano eventy w `script.js`.

### 4.2 Kluczowe zdarzenia do śledzenia w GA4

| Zdarzenie | Trigger | Opis |
|---|---|---|
| `generate_lead` | Submit formularza beta | Konwersja główna |
| `click_cta_beta` | Klik „Poproś o dostęp do bety" / „Request beta access" | Zainteresowanie |
| `click_demo` | Klik „Zobacz demo" / „View demo" | Zaangażowanie |
| `scroll_depth` | 25%, 50%, 75%, 100% | Czytanie strony |
| `language_switch` | Klik PL/EN | Preferencja językowa |
| `faq_expand` | Rozwinięcie pytania FAQ | Zainteresowanie |
| `section_view` | Widoczność sekcji (IntersectionObserver) | Analiza flow |

### 4.3 Alternatywa GDPR-friendly

Dla uproszczenia i pełnej zgodności z RODO rozważyć **Plausible Analytics** (self-hosted lub cloud) — nie używa cookies, nie wymaga bannera zgody, zgodny z RODO out-of-the-box.

---

## 5. Kod i wydajność

### 5.1 Duplikacja JS — PL i EN ⚠️

`script.js` (726 linii) i `en/script.js` (705 linii) są niemal identyczne. Różnią się tylko:
- Tekstami w obiekcie `slideCopyByLabel` (opisy slajdów)
- Listą ról w rotatorze hero (`grafików` vs `designers`)
- Komunikatami walidacji formularza
- Aria-labelami

**Rekomendacja:** Wydzielić wspólną logikę do jednego pliku (np. `app.js`) i przekazywać tłumaczenia przez obiekt konfiguracyjny lub atrybuty `data-*` w HTML. Zmniejszy to maintenance i ryzyko rozbieżności.

### 5.2 CSS — pojedynczy plik 4800 linii ⚠️

`styles.css` to jeden monolityczny plik bez minifikacji. Nie ma krytycznego (critical) CSS ani podziału na moduły.

**Rekomendacja:**
- Minifikować CSS przed deplojem (np. `cssnano`, `lightningcss`)
- Rozważyć inline critical CSS w `<head>` i lazy-load reszty
- Opcjonalnie podzielić na moduły (topbar, hero, features, form, footer)

### 5.3 Google Fonts — render-blocking ⚠️

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700;800&display=swap" rel="stylesheet" />
```

Font jest ładowany synchronicznie, co blokuje rendering. `display=swap` jest ustawiony (dobrze), ale samo żądanie CSS blokuje FCP (First Contentful Paint).

**Rekomendacja:**
- Dodać `rel="preload"` lub użyć `media="print" onload="this.media='all'"` trick
- Lub self-hostować font (jeden plik WOFF2) dla eliminacji zewnętrznego żądania

### 5.4 Formularz — pole honeypot ⚠️

```html
<input type="text" name="website" tabindex="-1" autocomplete="off" class="hp-field" aria-hidden="true" />
```

Pole honeypot nosi nazwę `website` — niektóre przeglądarki i menedżery haseł mogą je autouzupełnić mimo `autocomplete="off"`, co spowoduje fałszywe odrzucenie zgłoszenia.

**Rekomendacja:** Zmienić `name` na coś mniej typowego, np. `name="fax_number"` lub `name="company_url_do_not_fill"`.

### 5.5 Brak `<noscript>` ⚠️

Strona nie ma żadnego fallbacku `<noscript>`. Przy wyłączonym JS:
- Slider screenshotów nie działa (brak nawigacji)
- Animacje reveal się nie pokażą (elementy mają `opacity: 0` domyślnie)
- Formularz nie ma walidacji client-side
- Cookie banner się nie pojawi
- Rok w stopce będzie pusty

**Minimalna poprawka:**

```html
<noscript>
  <style>
    [data-reveal] { opacity: 1 !important; transform: none !important; }
  </style>
</noscript>
```

---

## 6. UX i konwersja

### 6.1 CTA „Zobacz demo" ✅

Naprawione — link prowadzi do sekcji ze sliderem screenshotów. Slider działa dobrze (nawigacja strzałkami, klawiatura, miniaturki).

### 6.2 Brak przycisku pobierania

Na stronie nie ma bezpośredniego linka do pobrania aplikacji. Jedyne CTA to formularz beta. Jeśli build jest gotowy do dystrybucji — dodać CTA „Pobierz beta dla Windows". Jeśli tylko przez formularz — obecne rozwiązanie jest OK, ale warto to klarowniej komunikować w tekście CTA.

### 6.3 Social proof — BRAK

Brak:
- liczby zapisanych testerów
- cytatów / testimoniali
- ocen
- logotypów klientów

Nawet prosty licznik „Dołączyło już X freelancerów" może zwiększyć konwersję formularza.

### 6.4 Demo / wideo produktowe

Sekcja ze screenami jest dobra (slider z 6 zrzutami + dynamiczna zmiana headline'u i opisu per slajd), ale statyczne screenshoty nie oddają dynamiki aplikacji. Rozważyć:
- Krótkie wideo (30-60s) lub GIF demonstracyjny
- Interaktywne demo (np. przez Arcade, Loom)

### 6.5 Obrazy — fallback mock UI ✅

Dobra praktyka — każdy screenshot ma fallback w postaci mock UI renderowanego w CSS (`.shot-fallback`), widoczny gdy obraz się nie załaduje. Klasy `.is-loaded` / `.is-missing` zarządzają widocznością.

### 6.6 Preloader / czas ładowania

- Pierwszy screenshot: `loading="eager"` ✅
- Pozostałe: `loading="lazy"` ✅
- `preconnect` do Google Fonts ✅
- Obrazy w formacie WebP ✅ (dobra kompresja)
- Brak minifikacji CSS/JS ⚠️

---

## 7. Priorytetyzowana lista poprawek

### 🔴 Krytyczne (naprawić natychmiast)

1. **Naprawić uszkodzone alt-texty w PL i EN** — broken HTML (`<span>`) w atrybucie `alt` 14 obrazów. Usunąć HTML, wstawić plain text.
2. **Załadować consent.js** — dodać `<script src="./consent.js">` w obu plikach HTML (PL: `./consent.js`, EN: `../consent.js`). Bez tego GA4 nie działa i baner cookies nie jest wyświetlany.
3. **Naprawić og:image** — plik `screens/dashboard-main.png` nie istnieje. Stworzyć dedykowany `og-image.png` (1200×630 px) lub zmienić ścieżkę na istniejący plik.

### 🟡 Ważne (zrobić w ciągu 1-2 tygodni)

1. **Ujednolicić nav/footer w PL** — nav mówi „Testy beta", footer mówi „Beta testy". Ujednolicić.
2. **Dodać `<noscript>` fallback** — minimum: nadpisać `opacity: 0` elementom `[data-reveal]`.
3. **Zoptymalizować H1** — dodać frazę kluczową „time tracker" (np. jako widoczny `<h2>` pod H1).
4. **Ujednolicić rotator hero** — PL: „grafików" vs EN: „designers" (różna precyzja grupy docelowej).
5. **Zmienić nazwę honeypot** — `name="website"` może być autouzupełniane przez przeglądarki.

### 🟢 Dobre praktyki (zaplanować)

1. **Zrefaktorować JS** — wydzielić wspólną logikę z PL i EN `script.js` do jednego pliku z konfiguracją per język.
2. **Minifikować CSS/JS** — `styles.css` (4800 linii) i `script.js` (726 linii) serwowane bez minifikacji.
3. **Zoptymalizować ładowanie fontów** — self-hosting lub `rel="preload"` dla Inter.
4. **Dodać tracking zdarzeń GA4** — `generate_lead`, `click_cta_beta`, `scroll_depth`, `faq_expand`.
5. **Dodać social proof** — licznik testerów, testimoniale.
6. **Rozważyć zmianę „(beta)" w title** na „(Early Access)".
7. **Wideo lub animowany GIF** demonstracyjny w sekcji interfejsu.
8. **Sprawdzić Core Web Vitals** w PageSpeed Insights po wdrożeniu poprawek.

---

*Raport pierwotnie wygenerowany przez Perplexity AI (23 lutego 2026), zaktualizowany na podstawie analizy kodu źródłowego przez Claude Code.*
*Weryfikacja objęła: `index.html`, `en/index.html`, `styles.css`, `script.js`, `en/script.js`, `consent.js`, `form-handler.php`, `sitemap.xml`, `robots.txt`, `.htaccess`, katalog `screens/`.*
