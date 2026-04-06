# PageSpeed Optimizations — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Podnieść wynik Lighthouse mobile z 82 do 95+ poprzez eliminację CLS (0,311 mobile / 0,751 desktop → < 0,1), redukcję `transition: all`, optymalizację obrazów i wyeliminowanie forced reflow.

**Architecture:** Statyczna strona HTML (PL + EN) z self-hosted fontami (WOFF2), inlined critical CSS, async full CSS, vanilla JS. Build przez Python (`build.py` → lightningcss + terser + sharp). Serwer Apache z .htaccess.

**Tech Stack:** HTML, CSS, vanilla JS, Python build script, lightningcss-cli, terser, sharp-cli

---

## Stan wyjściowy (po migracji na self-hosted fonts)

Fonty: 8× WOFF2 z `font-display: optional` + metric fallbacks. Preload: Hanken 400+700.
Hero image: WebP z srcset/sizes, width/height, fetchpriority=high.
Animacje: większość już na transform/opacity (reveal, slider, CTA, cookie banner).

**Co zostaje do naprawy (wg raport.md):**

| # | Problem | Priorytet |
|---|---------|-----------|
| 1 | CLS — brak min-height na `.hero`, font swap w 100ms oknie | 🔴 Krytyczny |
| 2 | `transition: all` w 6 miejscach style.css + 2 help.css | 🟠 Wysoki |
| 3 | Topbar scroll listener na każdy piksel (forced reflow) | 🟡 Średni |
| 4 | Brak AVIF wariantów obrazów | 🟠 Wysoki |
| 5 | Redukcja wariantów fontów (8 → 5–6) | 🟡 Średni |
| 6 | Kontrast WCAG AA (`.brand-beta`, `.topbar`) | 🟡 Średni |

---

## File Structure

| Plik | Zmiana | Odpowiedzialność |
|------|--------|------------------|
| `style.css` | Modify | min-height hero, transition: all → specific, kontrast |
| `index.html` | Modify | preload JetBrains Mono 700, `<picture>` z AVIF |
| `en/index.html` | Modify | identyczne zmiany jak index.html |
| `pomoc.html` | Modify | preload font fix |
| `en/help.html` | Modify | preload font fix |
| `aktualizacje.html` | Modify | preload font fix |
| `en/updates.html` | Modify | preload font fix |
| `help.css` | Modify | transition: all → specific |
| `script.js` | Modify | IntersectionObserver zamiast scroll, role rotator optymalizacja |
| `build.py` | Modify | dodanie generowania AVIF |
| `style.min.css` | Regenerate | rebuild po zmianach CSS |
| `script.min.js` | Regenerate | rebuild po zmianach JS |

---

## Task 1: Stabilizacja CLS — min-height na `.hero`

**Problem:** Sekcja `.hero` nie ma stałej wysokości. Po załadowaniu fontów (nawet z `optional` w oknie 100ms) i asynchronicznego CSS, układ hero przesuwa się — to główne źródło CLS 0,3–0,75.

**Files:**
- Modify: `style.css:582-597` (desktop hero)
- Modify: `style.css:3501-3506` (breakpoint ≤960px)
- Modify: `style.css:3912-3914` (breakpoint ≤480px)

- [ ] **Step 1: Dodaj min-height do `.hero` w style.css (desktop)**

W `style.css:582` (reguła `.hero`), dodaj `min-height` jako pierwszą właściwość po otwarciu bloku:

```css
.hero {
  --hero-bleed-top: 4rem;
  min-height: 100svh;
  width: 100%;
  /* ... reszta bez zmian ... */
}
```

- [ ] **Step 2: Dodaj min-height do `.hero` w breakpoincie ≤960px**

W `style.css:3501` (media query breakpoint), dodaj:

```css
.hero {
  --hero-bleed-top: 8rem;
  min-height: 100svh;
  gap: 1.5rem;
  margin-top: 0;
  padding: 1.5rem 1rem 2rem;
}
```

- [ ] **Step 3: Dodaj min-height do `.hero` w breakpoincie ≤480px**

W `style.css:3912`:

```css
.hero {
  min-height: 100svh;
  padding: 1.2rem 0.75rem 1.8rem;
}
```

- [ ] **Step 4: Dodaj min-height do inlined critical CSS w index.html i en/index.html**

W obu plikach HTML, w tagu `<style>` w `<head>`, do reguły `.hero` dodaj `min-height:100svh`:

```css
.hero{min-height:100svh;width:100%;isolation:isolate;contain:layout;grid-template-columns:1fr;align-items:start;gap:2.5rem;margin:0 auto;padding:4rem var(--section-pad-x) 3rem;display:grid;position:relative;overflow:visible;background:#15181e;color:#d5d7db}
```

- [ ] **Step 5: Sprawdź wizualnie w przeglądarce**

Otwórz `index.html` lokalnie. Hero powinien zajmować pełny viewport. Na mobile (DevTools → responsive) sekcja nie powinna się kurczyć poniżej 100svh.

- [ ] **Step 6: Commit**

```bash
git add style.css index.html en/index.html
git commit -m "fix(cls): add min-height: 100svh to hero section across all breakpoints"
```

---

## Task 2: Preload czcionki JetBrains Mono 700

**Problem:** Hero headline używa JetBrains Mono 700 (klasa `.tf-style`), ale ta czcionka nie jest preloadowana. Opóźniony load powoduje swap w oknie `optional` → CLS.

**Files:**
- Modify: `index.html:30-32` (head, po istniejących preload)
- Modify: `en/index.html` (analogicznie)

- [ ] **Step 1: Dodaj preload w index.html**

Po linii 32 (`hanken-grotesk-400-latin.woff2`) dodaj:

```html
<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/jetbrains-mono-700-latin.woff2" />
```

- [ ] **Step 2: Dodaj preload w en/index.html**

Analogiczna zmiana — dodaj tę samą linię po istniejących preload fontów.

- [ ] **Step 3: Commit**

```bash
git add index.html en/index.html
git commit -m "perf(cls): preload JetBrains Mono 700 used in hero headline"
```

---

## Task 3: Zamiana `transition: all` na konkretne właściwości

**Problem:** `transition: all` animuje KAŻDĄ zmianę właściwości CSS (w tym layout-triggering jak `min-height`, `padding`). To powoduje nieskomponowane animacje i niepotrzebne reflow.

**Files:**
- Modify: `style.css:310` (.topbar)
- Modify: `style.css:490` (.btn)
- Modify: `style.css:1006` (.hero-scroll-cta)
- Modify: `style.css:1140` (.showcase-nav-btn)
- Modify: `style.css:1220` (.shot-rail .shot-card)
- Modify: `style.css:4134` (.cookie-btn)
- Modify: `help.css:170` (tab button)
- Modify: `help.css:243` (tab button)

- [ ] **Step 1: .topbar — transition: all → specific properties**

Linia 310 w `style.css`. Topbar zmienia: `min-height`, `background`, `box-shadow` przy scrollu. `min-height` powoduje layout shift — NIE animujemy go. Animujemy tylko visual properties:

```css
/* BEFORE: */
transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

/* AFTER: */
transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
```

- [ ] **Step 2: .btn — transition: all → specific**

Linia 490 w `style.css`. Button zmienia: `transform`, `background`, `border-color`, `box-shadow`, `color` na hover:

```css
/* BEFORE: */
transition: all 0.2s ease;

/* AFTER: */
transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
```

- [ ] **Step 3: .hero-scroll-cta — transition: all → specific**

Linia 1006 w `style.css`. Zmienia `background` i `border-color` na hover:

```css
/* BEFORE: */
transition: all 0.2s;

/* AFTER: */
transition: background 0.2s, border-color 0.2s;
```

- [ ] **Step 4: .showcase-nav-btn — transition: all → specific**

Linia 1140 w `style.css`. Zmienia `background`, `border-color`, `color` na hover:

```css
/* BEFORE: */
transition: all 0.2s;

/* AFTER: */
transition: background 0.2s, border-color 0.2s, color 0.2s;
```

- [ ] **Step 5: .shot-rail .shot-card — transition: all → specific**

Linia 1220 w `style.css`. Zmienia `background`, `border-color` na hover i `opacity` na active:

```css
/* BEFORE: */
transition: all 0.2s;

/* AFTER: */
transition: background 0.2s, border-color 0.2s, opacity 0.2s;
```

- [ ] **Step 6: .cookie-btn — transition: all → specific**

Linia 4134 w `style.css`. Zmienia `border-color`, `color`, `background` na hover:

```css
/* BEFORE: */
transition: all 0.2s;

/* AFTER: */
transition: background 0.2s, border-color 0.2s, color 0.2s;
```

- [ ] **Step 7: help.css — obie transition: all → specific**

Linia 170 i 243 w `help.css`. Zakładki zmieniają `background`, `border-color`, `color`:

```css
/* BEFORE (obie lokacje): */
transition: all 0.2s;

/* AFTER: */
transition: background 0.2s, border-color 0.2s, color 0.2s;
```

- [ ] **Step 8: Weryfikacja wizualna**

Otwórz index.html, pomoc.html — przejdź hover po buttonach, topbarze, zakładkach help. Animacje powinny wyglądać identycznie.

- [ ] **Step 9: Commit**

```bash
git add style.css help.css
git commit -m "perf: replace transition: all with specific properties (6× style.css, 2× help.css)"
```

---

## Task 4: Optymalizacja topbar scroll — IntersectionObserver zamiast scroll event

**Problem:** `syncTopbarScrollState()` odpala się na KAŻDY piksel scrollu. classList.toggle wymusza style recalc. Raport wskazuje 42–45ms forced reflow z script.min.js.

**Files:**
- Modify: `script.js:82-90`

- [ ] **Step 1: Zamień scroll listener na IntersectionObserver**

W `script.js`, zamień blok linii 82-90:

```javascript
// BEFORE:
const topbar = document.querySelector(".topbar");
if (topbar instanceof HTMLElement) {
  const syncTopbarScrollState = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  syncTopbarScrollState();
  window.addEventListener("scroll", syncTopbarScrollState, { passive: true });
}

// AFTER:
const topbar = document.querySelector(".topbar");
if (topbar instanceof HTMLElement) {
  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:13px;pointer-events:none";
  document.body.prepend(sentinel);

  const scrollObserver = new IntersectionObserver(
    ([entry]) => {
      topbar.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  scrollObserver.observe(sentinel);
}
```

Sentinel div (1×13px) na szczycie strony — gdy zniknie z viewportu (scroll > 12px), topbar dostaje klasę `is-scrolled`. Zero forced reflow, zero scroll event.

- [ ] **Step 2: Przetestuj w przeglądarce**

Scroll strony w górę i w dół. Topbar powinien zmieniać styl (mniejszy, ciemniejsze tło) po scrollu ~12px, identycznie jak wcześniej.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "perf: replace scroll listener with IntersectionObserver for topbar state"
```

---

## Task 5: Generowanie wariantów AVIF i `<picture>` w hero

**Problem:** LCP mobile = 2,6s (próg 2,5s). Hero image `dashboard-main.webp` = 75,9 KB. AVIF może zredukować rozmiar o 20–30%.

**Files:**
- Modify: `build.py` — dodanie AVIF generation
- Modify: `index.html:237-239` — `<picture>` z AVIF source
- Modify: `en/index.html` — analogicznie

- [ ] **Step 1: Sprawdź czy sharp-cli obsługuje AVIF**

```bash
npx sharp-cli --help
```

Sharp obsługuje AVIF natywnie. Sprawdź dostępność formatu.

- [ ] **Step 2: Dodaj generowanie AVIF do build.py**

Znajdź w `build.py` sekcję generowania wariantów WebP i dodaj analogiczną pętlę dla AVIF. Dla hero image wystarczy wygenerować:
- `screens/dashboard-main.avif` (1600w)
- `screens/dashboard-main_960.avif` (960w)
- `screens/dashboard-main_480.avif` (480w)

Parametry: quality 45 (AVIF), effort 4.

```python
# Po istniejącej sekcji WebP, dodaj:
avif_sources = [
    "screens/dashboard-main.webp",
    "screens/dashboard-main_960.webp",
    "screens/dashboard-main_480.webp",
]
for src in avif_sources:
    out = src.replace(".webp", ".avif")
    subprocess.run(["npx", "sharp-cli", "-i", src, "-o", out, "--format", "avif", "--quality", "45"], check=True)
```

- [ ] **Step 3: Uruchom build.py i zweryfikuj wygenerowane pliki**

```bash
python build.py
ls -la screens/*.avif
```

Sprawdź rozmiary — AVIF powinien być 20–30% mniejszy od WebP.

- [ ] **Step 4: Zamień `<img>` na `<picture>` w hero (index.html)**

W `index.html`, linia 237-242. Zamień:

```html
<img id="heroShotImage" class="shot-image" src="./screens/dashboard-main.webp"
  srcset="./screens/dashboard-main_480.webp 480w, ./screens/dashboard-main_960.webp 960w, ./screens/dashboard-main.webp 1600w"
  sizes="(max-width: 720px) 92vw, (max-width: 1200px) 62vw, 800px"
  width="1600" height="1000"
  alt="TIMEFLOW Dashboard – widok dzienny z metrykami i timeline" loading="eager"
  fetchpriority="high" decoding="async" />
```

Na:

```html
<picture>
  <source type="image/avif"
    srcset="./screens/dashboard-main_480.avif 480w, ./screens/dashboard-main_960.avif 960w, ./screens/dashboard-main.avif 1600w"
    sizes="(max-width: 720px) 92vw, (max-width: 1200px) 62vw, 800px" />
  <img id="heroShotImage" class="shot-image" src="./screens/dashboard-main.webp"
    srcset="./screens/dashboard-main_480.webp 480w, ./screens/dashboard-main_960.webp 960w, ./screens/dashboard-main.webp 1600w"
    sizes="(max-width: 720px) 92vw, (max-width: 1200px) 62vw, 800px"
    width="1600" height="1000"
    alt="TIMEFLOW Dashboard – widok dzienny z metrykami i timeline" loading="eager"
    fetchpriority="high" decoding="async" />
</picture>
```

- [ ] **Step 5: Zaktualizuj preload obrazu w `<head>` (index.html i en/index.html)**

Zamień istniejący preload obrazu (linia 30):

```html
<!-- BEFORE: -->
<link rel="preload" as="image" type="image/webp" href="./screens/dashboard-main.webp" fetchpriority="high" />

<!-- AFTER: -->
<link rel="preload" as="image" type="image/avif" href="./screens/dashboard-main.avif" fetchpriority="high" />
```

Uwaga: przeglądarki bez AVIF zignorują preload z nieznanym type i załadują WebP z `<picture>` fallback.

- [ ] **Step 6: Analogiczna zmiana w en/index.html**

Powtórz zmiany z kroków 4-5 w `en/index.html`.

- [ ] **Step 7: Sprawdź w DevTools → Network**

Otwórz stronę, sprawdź w zakładce Network że przeglądarka pobiera `.avif` (Chrome/Firefox) a nie `.webp`.

- [ ] **Step 8: Commit**

```bash
git add build.py index.html en/index.html screens/*.avif
git commit -m "perf(lcp): add AVIF hero image variants, wrap hero img in <picture>"
```

---

## Task 6: Redukcja wariantów fontów

**Problem:** 8 plików fontów (~236 KB = 58% transferu). Warianty 500 i 600 Hanken Grotesk i JetBrains Mono są używane w CSS, ale wiele z nich można zmapować na sąsiednie wagi.

**Strategia:** Usuwamy JetBrains Mono 500 i 600 (mapujemy na 400 i 700). Hanken Grotesk 500 mapujemy na 400. Zostawiamy Hanken 400, 600, 700 i JetBrains 400, 700 = **5 fontów zamiast 8**, oszczędność ~97 KB.

**Files:**
- Modify: `style.css:20-30` (usunięcie @font-face Hanken 500)
- Modify: `style.css:68-78` (usunięcie @font-face JetBrains 500)
- Modify: `style.css:80-90` (usunięcie @font-face JetBrains 600)
- Modify: `style.css` — zamiana `font-weight: 500` na `400` w regułach używających `var(--font-mono)` / JetBrains Mono
- Modify: `style.css` — zamiana `font-weight: 500` na `400` w regułach używających Hanken Grotesk (tam gdzie nie ma konieczności odrębnego weight)

- [ ] **Step 1: Usuń @font-face dla Hanken Grotesk 500**

W `style.css`, usuń blok linii 20-30 (cały @font-face Hanken Grotesk weight 500).

- [ ] **Step 2: Usuń @font-face dla JetBrains Mono 500**

W `style.css`, usuń blok linii 68-78 (cały @font-face JetBrains Mono weight 500).

- [ ] **Step 3: Usuń @font-face dla JetBrains Mono 600**

W `style.css`, usuń blok linii 80-90 (cały @font-face JetBrains Mono weight 600).

- [ ] **Step 4: Znajdź i zamień font-weight: 500 w kontekście mono**

Przeszukaj style.css. Każde wystąpienie `font-weight: 500` w regule, która używa `var(--font-mono)` lub `JetBrains Mono`, zamień na `font-weight: 400`.

- [ ] **Step 5: Zamień font-weight: 500 na 400 w regułach Hanken Grotesk**

Przeszukaj style.css. Dla reguł, które nie są headingami (headingi zostają na 600/700), zamień `font-weight: 500` na `font-weight: 400` — dotyczy body text, labels, small elements.

**UWAGA:** Nie zamieniaj `font-weight: 600` — Hanken 600 zostawiamy jako wariant „semi-bold" dla UI labels.

- [ ] **Step 6: Weryfikacja wizualna**

Otwórz stronę. Sprawdź czy:
- Headingi wyglądają identycznie (600, 700 → bez zmian)
- Body text (400) wygląda OK
- Mono code fragments wyglądają OK z wagą 400 i 700

- [ ] **Step 7: Usuń nieużywane pliki fontów**

```bash
rm fonts/hanken-grotesk-500-latin.woff2
rm fonts/jetbrains-mono-500-latin.woff2
rm fonts/jetbrains-mono-600-latin.woff2
```

- [ ] **Step 8: Commit**

```bash
git add style.css fonts/
git commit -m "perf: reduce font variants from 8 to 5 (drop HG-500, JBM-500, JBM-600)"
```

---

## Task 7: Poprawa kontrastu WCAG AA

**Problem:** `.brand-beta` (tekst "BETA") i elementy topbar mają niewystarczający kontrast (< 4.5:1).

**Files:**
- Modify: `style.css` — reguły `.brand-beta`, ewentualnie `.topbar` muted text

- [ ] **Step 1: Znajdź reguły `.brand-beta`**

```bash
grep -n "brand-beta" style.css
```

- [ ] **Step 2: Zwiększ kontrast tekstu BETA**

Zmień kolor tekstu `.brand-beta` z aktualnego (prawdopodobnie `var(--muted)` = `#656a76`) na jaśniejszy wariant spełniający 4.5:1 na tle `rgba(21,24,30,0.92)`:

```css
.brand-beta {
  color: #9ca0ab; /* contrast ratio ~4.8:1 on dark bg */
}
```

Weryfikuj kontrast kalkulatorem: https://webaim.org/resources/contrastchecker/

- [ ] **Step 3: Sprawdź inne elementy topbar z niskim kontrastem**

Przejrzyj w DevTools Lighthouse → Accessibility → Contrast. Popraw wskazane elementy.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "a11y: improve color contrast for .brand-beta to meet WCAG AA (4.5:1)"
```

---

## Task 8: Rebuild minified assets

**Files:**
- Regenerate: `style.min.css`
- Regenerate: `script.min.js`

- [ ] **Step 1: Uruchom build.py**

```bash
python build.py
```

- [ ] **Step 2: Sprawdź rozmiary plików**

```bash
ls -la style.min.css script.min.js
```

- [ ] **Step 3: Commit**

```bash
git add style.min.css script.min.js
git commit -m "chore: rebuild minified assets after performance optimizations"
```

---

## Task 9: Walidacja — test Lighthouse

- [ ] **Step 1: Uruchom Lighthouse CLI lub PageSpeed Insights**

Otwórz https://pagespeed.web.googleapis.com/ i wklej URL strony (po deploy).

- [ ] **Step 2: Sprawdź wyniki**

Oczekiwane cele:
- **CLS mobile:** < 0,1 (z 0,311)
- **CLS desktop:** < 0,1 (z 0,751)
- **LCP mobile:** < 2,0s (z 2,6s)
- **Performance mobile:** 95+ (z 82)
- **Accessibility:** bez błędów kontrastu

- [ ] **Step 3: Jeśli CLS nadal > 0.1, diagnozuj**

Użyj DevTools → Performance → Record page load. Sprawdź Layout Shift entries — element-by-element. Najczęstsze przyczyny po tych zmianach:
- Font-swap mimo `optional` → sprawdź czy preload działa (Network → filter font)
- Async CSS load → sprawdź czy critical CSS w `<style>` pokrywa hero

---

## Prognoza

| Metryka | Przed | Cel po Task 1-8 |
|---------|-------|-----------------|
| CLS mobile | 0,311 | < 0,1 |
| CLS desktop | 0,751 | < 0,1 |
| LCP mobile | 2,6s | < 2,0s |
| Performance mobile | 82 | 95+ |
| Transfer fontów | ~236 KB | ~139 KB |
| Nieskomponowane animacje | 49–51 | < 10 |
