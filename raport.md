# Raport wydajności: timeflow.conceptfab.com

**Data analizy:** 6 kwietnia 2026, 20:22 CEST  
**Narzędzie:** Lighthouse 13.0.1 (PageSpeed Insights)  
**Strona:** http://timeflow.conceptfab.com/

---

## 1. Podsumowanie wyników

| Kategoria              | Mobile                       | Desktop                      |
| ---------------------- | ---------------------------- | ---------------------------- |
| **Wydajność**          | 🟠 **82**                    | — (niski CLS obniża wynik)   |
| **Sprawdzone metody**  | 🟢 **100**                   | 🟢 **100**                   |
| **SEO**                | 🟢 **100**                   | 🟢 **100**                   |
| **Ułatwienia dostępu** | 🟠 _(problemy z kontrastem)_ | 🟠 _(problemy z kontrastem)_ |

---

## 2. Metryki Core Web Vitals

| Metryka                            | Mobile    | Desktop   | Ocena                                  |
| ---------------------------------- | --------- | --------- | -------------------------------------- |
| **FCP** (First Contentful Paint)   | 0,9 s     | 0,3 s     | 🟢 OK                                  |
| **LCP** (Largest Contentful Paint) | 2,6 s     | 0,6 s     | 🟠 Mobile wymaga poprawy (cel < 2,5 s) |
| **TBT** (Total Blocking Time)      | 20 ms     | 10 ms     | 🟢 OK                                  |
| **CLS** (Cumulative Layout Shift)  | **0,311** | **0,751** | 🔴 **KRYTYCZNY** (cel < 0,1)           |
| **SI** (Speed Index)               | 1,4 s     | 0,6 s     | 🟢 OK                                  |

---

## 3. Problemy krytyczne — szczegółowa analiza

### 🔴 PROBLEM #1: Katastrofalny Cumulative Layout Shift (CLS)

**Główny powód** obniżonej wydajności. CLS wynosi 0,311 na mobile i aż 0,751 na desktop — przy dopuszczalnym progu 0,1. Elementy strony „skaczą" po załadowaniu.

**Źródło problemu:** Sekcja `.hero` odpowiada za niemal cały CLS.

- Mobile: element `<section class="hero">` → wynik przesunięcia **0,302**
- Desktop: element `<section class="hero">` → wynik przesunięcia **0,750**

Przyczyna: **ładowanie czcionek internetowych** — po zamianie czcionki systemowej na docelową (JetBrains Mono 700, Hanken Grotesk 600 i inne), cały układ hero się przesuwa.

**Poprawki:**

#### a) Zastosuj `font-display: optional` lub dopasowane fallbacki czcionek

Zamiast `font-display: swap` (które powoduje przesunięcie), użyj `font-display: optional` — czcionka albo załaduje się na czas, albo użytkownik zobaczy system font bez przeskoku. Alternatywnie zdefiniuj CSS `@font-face` z parametrami `size-adjust`, `ascent-override`, `descent-override` i `line-height-override` dla czcionek fallback, tak by wymiary tekstu systemowego dokładnie pasowały do docelowych czcionek.

#### b) Preloaduj krytyczne czcionki

Dodaj w `<head>` tagi preload dla czcionek używanych w sekcji hero:

```html
<link
  rel="preload"
  href="/fonts/jetbrains-mono-700-latin.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/hanken-grotesk-600-latin.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

#### c) Zarezerwuj miejsce na sekcję hero

Ustaw jawną, stałą wysokość (`min-height`) na sekcji `.hero` w CSS, aby układ nie zmieniał się po załadowaniu czcionek. Użyj jednostek viewport (`min-height: 100svh` lub zbliżonej stałej wartości).

---

### 🟠 PROBLEM #2: LCP na mobile = 2,6 s (tuż ponad progiem)

Element LCP to obraz `#heroShotImage` (`dashboard-main.webp`, 75,9 KB).

**Rozbicie czasu LCP:**

| Faza                         | Czas   |
| ---------------------------- | ------ |
| TTFB                         | 0 ms   |
| Opóźnienie ładowania zasobów | 230 ms |
| Czas wczytywania zasobu      | 170 ms |
| Opóźnienie renderowania      | 220 ms |

Obraz jest już wykrywalny w HTML i ma `fetchpriority=high` — to dobrze. Problem leży w łącznym opóźnieniu renderowania (220 ms) i ładowania zasobów (230 ms), które na throttlowanym 4G sumują się do ponad 2,5 s.

**Poprawki:**

#### a) Zmniejsz opóźnienie renderowania

Upewnij się, że CSS krytyczny dla sekcji hero jest inlined w `<head>` — brak zewnętrznych arkuszy blokujących renderowanie tej sekcji.

#### b) Rozważ mniejszy obraz dla mobile

Strona ładuje `dashboard-main.webp` (75,9 KB) i `dashboard-main_960.webp` (19,2 KB). Upewnij się, że na mobile serwowany jest mniejszy wariant przez `<picture>` z `srcset` i odpowiednimi breakpointami.

#### c) Rozważ AVIF

Konwersja z WebP do AVIF może zmniejszyć rozmiar obrazu o 20–30% bez utraty jakości.

---

### 🟠 PROBLEM #3: 49–51 nieskomponowanych animacji

Lighthouse wykrył **49 animowanych elementów na mobile** i **51 na desktop**, które nie korzystają z akceleracji GPU (compositor). Animacje na właściwościach takich jak `top`, `left`, `width`, `height`, `margin`, `padding` powodują przeformatowanie w wątku głównym.

**Poprawki:**

#### a) Zamień animacje na właściwości compositable

Używaj wyłącznie `transform` i `opacity` w animacjach CSS. Zamiast `top: 10px -> top: 20px` użyj `transform: translateY(10px) -> translateY(20px)`. Zamiast `width` animuj `transform: scaleX()`.

#### b) Dodaj `will-change` rozsądnie

Na elementach, które będą animowane, dodaj `will-change: transform` — ale tylko bezpośrednio przed animacją, nie globalnie.

#### c) Zredukuj liczbę animacji

49–51 animowanych elementów na prostej stronie landing page to dużo. Rozważ, czy wszystkie są potrzebne — uproszczenie animacji poprawi zarówno CLS, jak i ogólną płynność.

---

### 🟡 PROBLEM #4: Wymuszone przeformatowanie (forced reflow)

Plik `script.min.js` wymusza synchroniczne przeformatowanie (42 ms na desktop, 45 ms nieprzypisane na mobile). Dzieje się to, gdy JavaScript odczytuje właściwości geometryczne DOM (np. `offsetHeight`, `getBoundingClientRect()`) po modyfikacji stylów.

**Poprawki:**

#### a) Batch reads/writes

Zgrupuj odczyty DOM przed zapisami. Użyj wzorca „read-then-write" albo biblioteki typu `fastdom`.

#### b) Użyj `ResizeObserver` zamiast ręcznych pomiarów

Jeśli `script.min.js` sprawdza wymiary elementów do animacji/pozycjonowania, zamień to na `ResizeObserver` lub `IntersectionObserver`.

---

### 🟡 PROBLEM #5: Za dużo czcionek (7 plików, ~236 KB)

Strona ładuje **7 plików czcionek**:

| Czcionka           | Rozmiar     |
| ------------------ | ----------- |
| Hanken Grotesk 400 | 35,6 KB     |
| Hanken Grotesk 600 | 35,6 KB     |
| Hanken Grotesk 700 | 35,6 KB     |
| JetBrains Mono 400 | 32,5 KB     |
| JetBrains Mono 500 | 32,3 KB     |
| JetBrains Mono 600 | 32,5 KB     |
| JetBrains Mono 700 | 32,3 KB     |
| **Suma**           | **~236 KB** |

Na prostą stronę landing page to za dużo — czcionki stanowią **58% całego transferu** (405 KB total).

**Poprawki:**

#### a) Zredukuj warianty czcionek

Ogranicz się do 2–3 wariantów: np. Hanken Grotesk 400 + 700, JetBrains Mono 400 + 700. Warianty 500 i 600 można zasymulować lub pominąć. To zmniejszy transfer o ~100 KB.

#### b) Subset czcionek

Jeśli strona jest po polsku/angielsku, ogranicz glify do `latin` + polskich znaków diakrytycznych. Narzędzia: `pyftsubset`, `glyphhanger`.

#### c) Użyj `font-display: optional`

W własnym `@font-face` ustaw `font-display: optional`, co eliminuje FOUT i CLS jednocześnie.

---

## 4. Dodatkowe problemy

### Kontrast kolorów (Accessibility)

Element `.brand-beta` (tekst "BETA") i nagłówek `.topbar` mają niewystarczający współczynnik kontrastu. Popraw jasność tekstu lub tła, by osiągnąć współczynnik minimum 4.5:1 (standard WCAG AA).

### Rozmiar DOM: 613 elementów

Nie jest to wartość krytyczna, ale dla prostej strony landing page to podwyższona liczba. Każdy dodatkowy element DOM zwiększa czas „Style & Layout" (obecnie 384 ms na mobile — to **48% czasu wątku głównego**).

### Aktywność wątku głównego: 0,8 s (mobile)

Rozbicie:

- Style & Layout: 384 ms
- Other: 290 ms
- Rendering: 103 ms
- Script Evaluation: 22 ms
- Parse HTML & CSS: 10 ms
- Script Parsing & Compilation: 4 ms

Dominacja fazy stylów i układu potwierdza, że problem leży w zbyt wielu animacjach i dużym DOM, a nie w ciężkim JavaScript.

### Łańcuch żądań krytycznych

Maksymalne opóźnienie ścieżki krytycznej: **243 ms**. Początkowy dokument HTML (14,85 KiB) — to dobry wynik. Brak dodatkowych łańcuchów zależności.

### Serwer

Czas odpowiedzi serwera: **33 ms** — bardzo dobrze. Brak przekierowań. Stosuje kompresję tekstu.

---

## 5. Co działa dobrze ✅

- Serwer odpowiada szybko (33 ms TTFB)
- Brak przekierowań
- Kompresja tekstu włączona
- CSS i JavaScript zminifikowane
- Obraz LCP ma `fetchpriority=high` i jest wykrywalny w dokumencie
- Brak leniwego ładowania obrazu LCP
- Brak duplikatów JavaScript
- Łączny rozmiar strony: 405 KiB (lekka)
- SEO: 100/100
- Sprawdzone metody: 100/100
- `font-display: swap` ustawiony (ale powoduje CLS)
- Viewport meta tag poprawny

---

## 6. Plan działania — priorytety

| Priorytet | Zadanie                                                                        | Spodziewany efekt                                              |
| --------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| 🔴 1      | Naprawić CLS — preload czcionek, font fallback metryki, stała wysokość `.hero` | CLS z 0,3/0,75 → < 0,1                                         |
| 🔴 2      | Zmienić animacje na `transform`/`opacity` (49–51 elementów)                    | Eliminacja nieskomponowanych animacji, poprawa CLS i płynności |
| 🟠 3      | Zredukować warianty czcionek z 7 do 3–4                                        | Transfer -100 KB, szybsze ładowanie                            |
| 🟠 4      | Zoptymalizować obraz LCP (AVIF, lepsze srcset)                                 | LCP mobile z 2,6 s → < 2,0 s                                   |
| 🟡 5      | Naprawić forced reflow w script.min.js                                         | -45 ms na wątku głównym                                        |
| 🟡 6      | Poprawić kontrast kolorów (WCAG AA)                                            | Pełna dostępność                                               |

---

## 7. Prognoza po wdrożeniu

Po wdrożeniu punktów 1–3 wynik mobilny powinien wzrosnąć z **82 do ~95+**, a desktopowy osiągnąć pełne 90+. Kluczem jest CLS — to jedyna metryka naprawdę „czerwona" i odpowiada za większość utraty punktów.

---

_Raport wygenerowany na podstawie analizy PageSpeed Insights z dnia 6.04.2026_
