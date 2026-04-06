# Raport PageSpeed Insights — timeflow.conceptfab.com

**Data analizy:** 6 kwietnia 2026, 19:09  
**Narzędzie:** Lighthouse 13.0.1  
**URL:** http://timeflow.conceptfab.com/

---

## Podsumowanie wyników

| Kategoria | Mobilna | Stacjonarna |
|---|---|---|
| Wydajność | **67** (średnia) | **99** (zielona) |
| Ułatwienia dostępu | **97** (zielona) | **97** (zielona) |
| Sprawdzone metody | **78** (średnia) | **78** (średnia) |
| SEO | **100** (zielona) | **100** (zielona) |

---

## Core Web Vitals — metryki szczegółowe

| Metryka | Mobilna | Stacjonarna | Próg dobry |
|---|---|---|---|
| First Contentful Paint (FCP) | **2,6 s** ⚠️ | **0,7 s** ✅ | < 1,8 s |
| Largest Contentful Paint (LCP) | **4,4 s** 🔴 | **0,9 s** ✅ | < 2,5 s |
| Total Blocking Time (TBT) | **70 ms** ✅ | **60 ms** ✅ | < 200 ms |
| Cumulative Layout Shift (CLS) | **0,269** 🔴 | **0,014** ✅ | < 0,1 |
| Speed Index (SI) | **2,9 s** ⚠️ | **0,7 s** ✅ | < 3,4 s |

**Najważniejsze problemy na mobilnych:** LCP (4,4 s) i CLS (0,269) znacząco obniżają wynik wydajności.

---

## 1. KRYTYCZNE — Przejście na HTTPS

**Problem:** Strona serwowana jest przez niezabezpieczony HTTP. Wykryto 12 niezabezpieczonych żądań. Brak przekierowania HTTP → HTTPS.

**Wpływ:** Obniża wynik "Sprawdzonych metod" (78/100). Brak HTTPS uniemożliwia korzystanie z HTTP/2, Service Workers i wielu nowoczesnych API. Google traktuje HTTPS jako sygnał rankingowy.

**Co zrobić:**
- Wdrożyć certyfikat SSL/TLS (np. Let's Encrypt — darmowy).
- Skonfigurować przekierowanie 301 z HTTP na HTTPS dla wszystkich zasobów.
- Zaktualizować wszystkie wewnętrzne linki i zasoby na HTTPS.
- Wdrożyć nagłówek HSTS (Strict-Transport-Security).

---

## 2. KRYTYCZNE — Naprawić CLS na mobilnych (0,269)

**Problem:** Głównym źródłem przesunięć układu jest element `div.hero-bg-grid` w sekcji hero (CLS: 0,269). Dodatkowe przesunięcie generuje `div.hero-glow` (CLS: 0,002). Na desktopie CLS wynosi zaledwie 0,014 — problem jest specyficzny dla mobilnych.

Na desktopie źródła CLS to: sekcja `.hero-visual.hero-showcase` (0,011) oraz tekst "i widzisz jak zarabiasz" (0,003), a także ładowanie czcionek webowych (Hanken Grotesk, JetBrains Mono).

**Co zrobić:**
- Zarezerwować stałe wymiary (width/height lub aspect-ratio) dla elementu `.hero-bg-grid` zanim pojawi się treść.
- Unikać dynamicznego dodawania/zmiany rozmiaru elementu `.hero-bg-grid` po załadowaniu strony.
- Ustawić jawne wymiary na kontenerze hero oraz na elementach wizualnych showcase.
- Dodać `font-display: optional` lub preloadować czcionki z `<link rel="preload">`, aby uniknąć FOUT (Flash of Unstyled Text), który powoduje CLS.
- Rozważyć użycie `size-adjust` i `@font-face` overrides, aby dopasować czcionkę fallback do docelowej.

---

## 3. KRYTYCZNE — Poprawić LCP na mobilnych (4,4 s)

**Problem:** LCP wynosi 4,4 s (próg: < 2,5 s). Rozbicie czasu LCP na mobilnych:

| Podczęść | Czas |
|---|---|
| Czas do pierwszego bajtu (TTFB) | 0 ms |
| Opóźnienie ładowania zasobów | 120 ms |
| Czas wczytywania zasobu | 90 ms |
| **Opóźnienie renderowania elementu** | **1490 ms** |

Element LCP to obraz: `dashboard-main_960.webp` z atrybutami `loading="eager"` i `fetchpriority="high"` (dobrze skonfigurowane).

Na desktopie opóźnienie renderowania wynosi 880 ms — problem jest nasilony na mobilnych.

**Co zrobić:**
- **Zmniejszyć opóźnienie renderowania** (1490 ms na mobilnych):
  - Usunąć lub odroczyć JavaScript blokujący renderowanie (script.min.js, consent.min.js).
  - Przenieść krytyczny CSS inline do `<head>`.
  - Uprościć kaskadę CSS w sekcji hero — im mniej reguł CSS wpływających na element LCP, tym szybciej się wyrenderuje.
- **Odblokować CSS** — plik `style.min.css` (10 KB) blokuje renderowanie na 170 ms. Rozważyć critical CSS inline + asynchroniczne ładowanie reszty.
- **Zoptymalizować łańcuch krytyczny** (maks. opóźnienie: 375 ms na mobilnych):
  - Dokument HTML → style.min.css → consent.min.js / script.min.js
  - Odroczyć `consent.min.js` i `script.min.js` za pomocą atrybutu `defer` lub `async`.

---

## 4. WAŻNE — Ograniczyć nieużywany JavaScript (GTM)

**Problem:** Google Tag Manager (gtag.js) waży 152–156 KB, z czego ~64 KB jest nieużywane. GTM generuje również długie zadania w wątku głównym (119 ms + 53 ms na desktopie; 120 ms na mobilnych).

**Co zrobić:**
- Załadować GTM z atrybutem `defer` lub dynamicznie po interakcji użytkownika (np. po kliknięciu, scrollu).
- Rozważyć wdrożenie lżejszej konfiguracji GA4 bez GTM, jeśli nie są potrzebne zaawansowane funkcje tag managera.
- Użyć `requestIdleCallback` do opóźnionego ładowania skryptów analitycznych.
- Audytować tagi w GTM i usunąć niepotrzebne triggery/tagi.

---

## 5. WAŻNE — Wdrożyć nagłówki bezpieczeństwa

**Problem:** Brakuje kluczowych nagłówków bezpieczeństwa, co obniża wynik "Sprawdzonych metod":

| Nagłówek | Status | Waga |
|---|---|---|
| Content-Security-Policy (CSP) | Brak | Wysoki |
| HSTS (Strict-Transport-Security) | Brak | Wysoki |
| COOP (Cross-Origin-Opener-Policy) | Brak | Wysoki |
| X-Frame-Options / CSP frame-ancestors | Brak | Wysoki |
| Trusted Types (CSP) | Brak | Wysoki |

**Co zrobić:**
- Dodać nagłówek `Content-Security-Policy` z restrykcyjną polityką (np. `default-src 'self'; script-src 'self' https://www.googletagmanager.com ...`).
- Dodać `Strict-Transport-Security: max-age=31536000; includeSubDomains` (po wdrożeniu HTTPS).
- Dodać `Cross-Origin-Opener-Policy: same-origin`.
- Dodać `X-Frame-Options: DENY` lub `Content-Security-Policy: frame-ancestors 'none'`.
- Rozważyć wdrożenie Trusted Types.

---

## 6. ŚREDNI PRIORYTET — Wymuszony reflow w JavaScript

**Problem:** Plik `script.min.js` wymusza synchroniczne przeformatowanie (forced reflow) — 36 ms na mobilnych, 3 ms + 104 ms (łącznie) na desktopie. Odczytywanie właściwości geometrycznych DOM (np. `offsetWidth`, `getBoundingClientRect`) po modyfikacji stylów powoduje kosztowny forced layout.

**Co zrobić:**
- Przenieść odczyty geometrii DOM przed modyfikacjami stylów (wzorzec "read-then-write").
- Użyć `requestAnimationFrame` do grupowania odczytów i zapisów DOM.
- Zidentyfikować miejsce w `script.min.js:1:1590` i zrefaktorować kod.

---

## 7. ŚREDNI PRIORYTET — Optymalizacja czcionek

**Problem:** Strona ładuje 4 pliki czcionek (Hanken Grotesk + JetBrains Mono) o łącznym rozmiarze ~100 KB. Czcionki powodują drobne przesunięcia layoutu (CLS) na desktopie.

**Co zrobić:**
- Dodać `<link rel="preload" as="font" type="font/woff2" crossorigin>` dla najważniejszych wariantów czcionek.
- Rozważyć ograniczenie wariantów — czy potrzebne są 4 wagi (400, 500, 600, 700) obu czcionek?
- Użyć `font-display: swap` (jeśli jeszcze nie jest ustawione) lub `optional` dla mniej ważnych wariantów.
- Wdrożyć `@font-face` z `size-adjust`, `ascent-override`, `descent-override` dla fallbacka systemowego.

---

## 8. NISKI PRIORYTET — Rozmiar DOM

**Problem:** DOM ma 613 elementów, maksymalną głębokość 11 i największy formularz (`#betaForm`) z 17 elementami podrzędnymi. Wartości są w normie, ale warto obserwować przy rozwoju strony.

**Co zrobić:**
- Utrzymywać DOM poniżej 1500 elementów.
- Upraszczać strukturę HTML tam, gdzie to możliwe (np. usunąć zbędne wrappery).

---

## 9. NISKI PRIORYTET — Kontrast kolorów (Ułatwienia dostępu)

**Problem:** Element `<span class="brand-beta">` (tekst "TIMEFLOW BETA") oraz przyciski w topbarze i cookie barze mają niewystarczający kontrast kolorów tła i tekstu.

**Co zrobić:**
- Zwiększyć kontrast tekstu "TIMEFLOW BETA" do minimum 4.5:1 (WCAG AA).
- Sprawdzić kontrast przycisków cookie bar i topbar.

---

## Podsumowanie priorytetów

| Priorytet | Działanie | Spodziewany efekt |
|---|---|---|
| 🔴 Krytyczny | Wdrożyć HTTPS + przekierowanie | Sprawdzone metody ↑, bezpieczeństwo, SEO |
| 🔴 Krytyczny | Naprawić CLS na mobilnych (hero-bg-grid) | CLS 0,269 → < 0,1, Wydajność ↑↑ |
| 🔴 Krytyczny | Zmniejszyć opóźnienie renderowania LCP | LCP 4,4 s → < 2,5 s, Wydajność ↑↑ |
| 🟡 Ważny | Odroczyć GTM / ograniczyć nieużywany JS | TBT ↓, szybsze ładowanie |
| 🟡 Ważny | Dodać nagłówki bezpieczeństwa | Sprawdzone metody ↑ |
| 🟠 Średni | Naprawić forced reflow w script.min.js | Wydajność ↑ |
| 🟠 Średni | Preload + optymalizacja czcionek | CLS ↓, FCP ↓ |
| 🟢 Niski | Utrzymać kompaktowy DOM | Przyszłościowe |
| 🟢 Niski | Poprawić kontrast kolorów | Dostępność → 100 |

---

## Co już działa dobrze ✅

- SEO: 100/100 — meta opis, title, hreflang, canonical, robots.txt, alt na obrazach.
- Obrazy zoptymalizowane (format WebP, responsywne srcset/sizes).
- Element LCP poprawnie wykrywalny (fetchpriority="high", brak lazy loading).
- Minifikacja CSS i JS zastosowana.
- Preconnect do fonts.googleapis.com i fonts.gstatic.com skonfigurowany.
- font-display ustawione poprawnie.
- Brak zduplikowanego JS.
- Viewport zoptymalizowany dla mobilnych.
- Łączny rozmiar strony: 420 KB — w normie.
