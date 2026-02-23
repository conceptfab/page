# Poprawki wydajności — PageSpeed Insights

**Wynik wyjściowy:** 69 / 100 (Performance)
**FCP:** 2,9 s | **LCP:** 5,9 s | **TBT:** 0 ms | **CLS:** 0 | **SI:** 5,5 s
**Accessibility:** 95 | **Best Practices:** 100 | **SEO:** 100

---

## Diagnoza problemów

| Problem z PSI | Przyczyna w kodzie | Oszczędność |
|---|---|---|
| Ulepsz dostarczanie obrazów (869 KiB) | 6 screenshotów WebP bez `sizes`/`srcset`, brak responsywnych wariantów, największy plik 303 KB | ~869 KiB |
| Prośby o zablokowanie renderowania (1970 ms) | Google Fonts CSS ładowany synchronicznie + `styles.css` (97 KB) bez minifikacji blokuje rendering | ~1970 ms |
| Cache w pamięci podręcznej (104 KiB) | Brak nagłówków `Cache-Control` w `.htaccess` dla statycznych assetów | ~104 KiB |
| Zestawienie LCP / Wykrywanie żądań LCP | Hero image (`dashboard-main_wynik.webp`, 118 KB) nie ma `fetchpriority="high"` ani `<link rel="preload">` — przeglądarka odkrywa go późno | LCP 5,9s → ~2-3s |
| Minifikuj CSS (3 KiB) | `styles.css` serwowany bez minifikacji (97 KB raw) | ~3 KiB |
| Nieskomponowane animacje (13 elementów) | `background-attachment: fixed` na `html` wymusza repaint całego viewportu przy scrollu; transition na `opacity`+`transform` na `[data-reveal]` dotyka 13+ elementów jednocześnie | jank |
| Długie zadanie w wątku głównym (1) | Prawdopodobnie parsowanie `styles.css` (97 KB) + Google Fonts CSS | ~50-100 ms |
| Wymuszone przeformatowanie | `wrapTimeflowTextNodes()` mutuje DOM (zamienia TextNode na fragment z `<span>`) po renderze — wymusza reflow | reflow |

---

## Poprawki do wdrożenia

### 1. LCP: Preload hero image + fetchpriority (krytyczne)

**Problem:** Przeglądarka odkrywa hero image dopiero po sparsowaniu HTML + CSS. LCP = 5,9s.

**Poprawka w `<head>` obu plików HTML:**

```html
<!-- Dodać PRZED <link rel="stylesheet"> -->
<link rel="preload" as="image" type="image/webp" href="./screens/dashboard-main_wynik.webp" fetchpriority="high" />
```

**Oraz na samym `<img>` hero:**

```html
<img id="heroShotImage" ... loading="eager" fetchpriority="high" ... />
```

Szacowany efekt: LCP z 5,9s na ~2-3s.

---

### 2. Render-blocking: Google Fonts async (krytyczne)

**Problem:** `<link href="fonts.googleapis.com/..." rel="stylesheet">` blokuje rendering o ~1970 ms.

**Poprawka — zamienić:**

```html
<!-- BYŁO -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700;800&display=swap" rel="stylesheet" />

<!-- NA -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700;800&display=swap" /></noscript>
```

**Opcja lepsza (self-hosting):** Pobrać plik WOFF2 Inter z Google Fonts i serwować lokalnie — eliminuje DNS lookup + RTT do fonts.googleapis.com + fonts.gstatic.com.

---

### 3. Cache: Nagłówki Cache-Control w .htaccess

**Problem:** Statyczne assety (CSS, JS, obrazy, fonty) serwowane bez instrukcji cache → przeglądarka pobiera je ponownie przy każdej wizycie.

**Poprawka — dodać do `.htaccess`:**

```apache
# Cache statycznych assetów
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
    <FilesMatch "\.(css|js|webp|png|ico|svg|woff2)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    <FilesMatch "\.(html|php)$">
        Header set Cache-Control "no-cache, must-revalidate"
    </FilesMatch>
</IfModule>
```

---

### 4. Minifikacja CSS (ważne)

**Problem:** `styles.css` = 97 KB nieskompresowany, serwowany raw.

**Opcje:**

A) **Build step** — użyć `lightningcss` lub `cssnano`:
```bash
npx lightningcss --minify styles.css -o styles.min.css
```

B) **Bez build step** — jeśli serwer Apache ma `mod_deflate`, dodać do `.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

Kompresja gzip/brotli zmniejszy ~97 KB CSS do ~15-18 KB w transferze (ważniejsze niż minifikacja samych whitespace).

---

### 5. Nieskomponowane animacje: background-attachment fixed (ważne)

**Problem:** `background-attachment: fixed` na `html` (linia 53 styles.css) powoduje pełny repaint viewportu przy każdym scrollu — ciężkie na mobile i słabszym sprzęcie.

**Poprawka — zamienić na pseudo-element z `position: fixed`:**

```css
/* BYŁO */
html {
  background: radial-gradient(...), var(--bg);
  background-attachment: fixed;
}

/* NA */
html {
  background: var(--bg);
}

html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 1400px 1000px at 5% 5%, rgba(57, 211, 255, 0.28), transparent 50%),
    radial-gradient(ellipse 1200px 900px at 95% 3%, rgba(255, 79, 210, 0.22), transparent 48%),
    radial-gradient(ellipse 1100px 800px at 50% 55%, rgba(138, 92, 255, 0.18), transparent 50%),
    radial-gradient(ellipse 1600px 700px at 25% 85%, rgba(255, 79, 210, 0.14), transparent 45%),
    radial-gradient(ellipse 800px 600px at 80% 70%, rgba(57, 211, 255, 0.12), transparent 50%);
  pointer-events: none;
  will-change: transform; /* promuje do osobnej warstwy kompozytora */
}
```

Efekt: gradient renderowany raz na osobnej warstwie GPU, scroll nie wymusza repaintu.

---

### 6. Obrazy: Responsywne warianty + sizes (ważne)

**Problem:** 6 screenshotów (łącznie ~1 MB) ładowanych w pełnym rozmiarze niezależnie od viewportu. Na mobile użytkownik pobiera plik 303 KB, który wyświetla w ~350px.

**Poprawka:**

A) Wygenerować mniejsze warianty (np. 480w, 960w, pełny):
```bash
for f in screens/*_wynik.webp; do
  cwebp -resize 480 0 "$f" -o "${f%_wynik.webp}_480.webp"
  cwebp -resize 960 0 "$f" -o "${f%_wynik.webp}_960.webp"
done
```

B) Dodać `srcset` + `sizes` na `<img>`:
```html
<img class="shot-image"
  src="./screens/dashboard-main_wynik.webp"
  srcset="
    ./screens/dashboard-main_480.webp 480w,
    ./screens/dashboard-main_960.webp 960w,
    ./screens/dashboard-main_wynik.webp 1440w"
  sizes="(max-width: 720px) 90vw, (max-width: 1200px) 60vw, 800px"
  alt="TIMEFLOW Dashboard – widok dzienny z metrykami i timeline"
  loading="eager"
  fetchpriority="high"
  decoding="async" />
```

Szacowana oszczędność: ~500-700 KiB na mobile.

---

### 7. Drzewo zależności sieciowych: Kolejność ładowania

**Obecna kolejność w `<head>`:**
1. `preconnect` Google Fonts ✅
2. Google Fonts CSS (render-blocking) ❌
3. Favicony (7 linii `<link>`)
4. `styles.css` (render-blocking)

**Optymalna kolejność:**
1. `<meta>` tagi (nie blokują)
2. `<link rel="preload">` hero image
3. `<link rel="preload" as="style">` Google Fonts (async)
4. `<link rel="stylesheet">` styles.css (jedyny blocker)
5. `<link rel="preconnect">` (na wypadek self-hosted fonts — zbędne)
6. Favicony (nie blokują, mogą być na końcu `<head>`)

---

### 8. Wymuszone przeformatowanie: wrapTimeflowTextNodes

**Problem:** `wrapTimeflowTextNodes(document.body)` na końcu `script.js` mutuje ~20+ węzłów tekstowych w DOM (zamienia "TIMEFLOW" na `<span class="tf-style">TIMEFLOW</span>`). Każda mutacja wymusza reflow.

**Poprawka — zgrupować mutacje w jednym cyklu:**

```js
// Opakować w requestAnimationFrame, żeby przeglądarka zgrupowała reflows
requestAnimationFrame(() => {
  wrapTimeflowTextNodes(document.body);
});
```

To nie eliminuje reflow, ale przenosi go poza krytyczny rendering path.

---

## Priorytet wdrożenia

| # | Poprawka | Efekt | Status |
|---|---|---|---|
| 1 | Preload hero image + fetchpriority | LCP: 5,9s → ~2-3s | ✅ WDROŻONE — `<link rel="preload">` w `<head>` + `fetchpriority="high"` na hero `<img>` (PL + EN) |
| 2 | Google Fonts async | FCP: 2,9s → ~1,5s | ✅ WDROŻONE — `rel="preload" as="style" onload` zamiast blokującego `rel="stylesheet"` (PL + EN) |
| 3 | Cache-Control w .htaccess | Powtórne wizyty szybsze | ✅ WDROŻONE — `mod_expires` + `mod_headers` (CSS/JS/obrazy: 1 rok, HTML: no-cache) |
| 4 | mod_deflate (gzip) | CSS 97KB → ~17KB transfer | ✅ WDROŻONE — `AddOutputFilterByType DEFLATE` dla HTML/CSS/JS/JSON/SVG |
| 5 | background-attachment: fixed → pseudo-element | Smooth scroll, brak jank | ✅ WDROŻONE — gradient przeniesiony na `html::before` z `position: fixed` + `will-change: transform` |
| 6 | Responsywne obrazy (srcset) | Mobile: -500-700 KiB | ✅ WDROŻONE — warianty 480w/960w wygenerowane `sharp-cli`, `srcset`+`sizes` na 14 `<img>` (PL + EN) |
| 7 | requestAnimationFrame na wrapTimeflowTextNodes | Mniej forced reflow | ✅ WDROŻONE — `requestAnimationFrame(() => wrapTimeflowTextNodes(...))` (PL + EN) |
| 8 | Minifikacja CSS/JS (build step) | CSS -34%, JS -47% | ✅ WDROŻONE — `lightningcss` (99→66 KB) + `terser` (30→16 KB), HTML wskazuje na `.min` wersje |

**Wdrożono 8 z 8 poprawek.**

### Wygenerowane pliki wariantów obrazów (screens/)

| Oryginał | 960w | 480w | Oszczędność mobile |
|---|---|---|---|
| projects_wynik.webp (304 KB) | projects_960.webp (33 KB) | projects_480.webp (11 KB) | **-96%** |
| estimates_wynik.webp (244 KB) | estimates_960.webp (27 KB) | estimates_480.webp (8 KB) | **-97%** |
| ai-model_wynik.webp (148 KB) | ai-model_960.webp (15 KB) | ai-model_480.webp (4 KB) | **-97%** |
| dashboard-main_wynik.webp (119 KB) | dashboard-main_960.webp (14 KB) | dashboard-main_480.webp (5 KB) | **-96%** |
| sessions_wynik.webp (114 KB) | sessions_960.webp (12 KB) | sessions_480.webp (4 KB) | **-97%** |
| analysis_wynik.webp (91 KB) | analysis_960.webp (12 KB) | analysis_480.webp (5 KB) | **-95%** |

### Zminifikowane pliki

| Oryginał | Minified | Redukcja |
|---|---|---|
| styles.css (99 KB) | styles.min.css (66 KB) | **-34%** |
| script.js (30 KB) | script.min.js (16 KB) | **-47%** |
| en/script.js (30 KB) | en/script.min.js (16 KB) | **-47%** |
| consent.js (4 KB) | consent.min.js (2 KB) | **-40%** |

Szacowany wynik po deploy: **Performance 90-98+**.
