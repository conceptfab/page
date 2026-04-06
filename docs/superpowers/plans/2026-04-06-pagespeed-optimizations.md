# PageSpeed Optimizations — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Podnieść mobilny wynik PageSpeed z 67 do 90+ poprzez naprawę CLS, LCP, odroczenie JS i dodanie nagłówków bezpieczeństwa w `.htaccess`.

**Architecture:** Statyczna strona HTML/CSS/JS hostowana na Apache (shared hosting). Build: `build.py` uruchamia `lightningcss-cli` (CSS) i `terser` (JS) do minifikacji. Zmiany dotyczą 4 plików źródłowych (`style.css`, `script.js`, `consent.js`, `.htaccess`) + 4 plików HTML (`index.html`, `en/index.html`, `pomoc.html`, `en/help.html` itd.). Po każdym tasku: `python build.py` regeneruje `*.min.*`.

**Tech Stack:** HTML, CSS, vanilla JS, Apache `.htaccess`, Google Fonts (Hanken Grotesk + JetBrains Mono), GA4 via gtag.js

---

## File Structure

| Plik | Rola | Zmiana |
|---|---|---|
| `style.css` | Główny arkusz stylów (3882 linii) | Modify: CLS fix hero-bg-grid, kontrasty, critical CSS extraction |
| `script.js` | Główny skrypt strony (1043 linie) | Modify: forced reflow pattern, defer-ready structure |
| `consent.js` | Cookie consent + GA4 gtag.js (115 linii) | Modify: odroczenie ładowania gtag.js do interakcji |
| `.htaccess` | Apache config: rewrite, cache, kompresja | Modify: HTTPS redirect, nagłówki bezpieczeństwa |
| `index.html` | Strona główna PL (1186 linii) | Modify: inline critical CSS, defer scripts, font preload |
| `en/index.html` | Strona główna EN (1157 linii) | Modify: te same zmiany co index.html |
| `pomoc.html` | Pomoc PL | Modify: defer scripts |
| `en/help.html` | Pomoc EN | Modify: defer scripts |
| `aktualizacje.html` | Updates PL | Modify: defer scripts |
| `en/updates.html` | Updates EN | Modify: defer scripts |
| `polityka-prywatnosci.html` | Privacy PL | Modify: defer scripts |
| `en/privacy-policy.html` | Privacy EN | Modify: defer scripts |

---

## Task 1: HTTPS redirect + nagłówki bezpieczeństwa w `.htaccess`

**Files:**
- Modify: `.htaccess`

**Kontekst:** Brak HTTPS redirect obniża "Sprawdzone metody" do 78/100. Brak nagłówków CSP, HSTS, COOP, X-Frame-Options. Hosting musi mieć aktywny certyfikat SSL (Let's Encrypt lub od providera). Ten task zakłada, że certyfikat SSL jest już aktywny na serwerze.

- [ ] **Step 1: Dodać HTTPS redirect na początek `.htaccess`**

Dodaj na początku pliku, przed istniejącym blokiem `RewriteEngine On`:

```apache
# Wymuszenie HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} !=on
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

Istniejący blok `<IfModule mod_rewrite.c>` z trailing-slash redirect pozostaje poniżej, ale usunąć z niego `RewriteEngine On` (bo jest już wyżej) i dodać `RewriteCond %{HTTPS} =on` aby slash-redirect działał tylko na HTTPS.

- [ ] **Step 2: Dodać nagłówki bezpieczeństwa**

Na końcu `.htaccess` (po bloku `</IfModule>` z cache) dodaj:

```apache
# Nagłówki bezpieczeństwa
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
    Header always set X-Frame-Options "DENY"
    Header always set Cross-Origin-Opener-Policy "same-origin"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; frame-ancestors 'none'"
</IfModule>
```

- [ ] **Step 3: Przetestować lokalnie**

Zweryfikować składnię `.htaccess` (nie ma narzędzia offline — deploy na staging i sprawdzić odpowiedź HTTP):

```bash
curl -I http://timeflow.conceptfab.com/ 2>/dev/null | head -20
```

Oczekiwane: `301 Moved Permanently`, `Location: https://...`

Po HTTPS:
```bash
curl -I https://timeflow.conceptfab.com/ 2>/dev/null | grep -E "Strict-Transport|X-Frame|Content-Security|Cross-Origin"
```

Oczekiwane: wszystkie 4 nagłówki obecne.

- [ ] **Step 4: Commit**

```bash
git add .htaccess
git commit -m "feat: add HTTPS redirect and security headers to .htaccess"
```

---

## Task 2: Naprawić CLS na mobilnych — hero-bg-grid (0,269 → < 0,1)

**Files:**
- Modify: `style.css:420-461` (sekcja `.hero` i `.hero-bg-grid`)

**Kontekst:** Element `.hero-bg-grid` ma `position: absolute` z `inset: -200px 0 -100px` ale brak jawnych wymiarów kontenera `.hero`. Na mobilnych przeglądarka przelicza layout po załadowaniu grida, generując CLS 0,269. Dodatkowe źródło: `.hero-glow` (CLS 0,002). Na desktopie CLS wynosi 0,014 — problem jest specyficzny dla mobilnych widoków.

- [ ] **Step 1: Dodać `contain: layout` do `.hero`**

W `style.css` linia 420, do reguły `.hero` dodać:

```css
.hero {
  --hero-bleed-top: 4rem;
  width: 100%;
  isolation: isolate;
  contain: layout;
  /* ... reszta bez zmian ... */
}
```

`contain: layout` informuje przeglądarkę, że layout wewnątrz `.hero` nie wpływa na elementy na zewnątrz — eliminuje reflow propagację.

- [ ] **Step 2: Wymusić stałe wymiary `.hero-bg-grid` i `.hero-glow`**

W `style.css` linia 449, zmienić `.hero-bg-grid`:

```css
.hero-bg-grid {
  pointer-events: none;
  z-index: -2;
  opacity: 0.04;
  background-image:
    linear-gradient(rgba(178, 182, 189, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(178, 182, 189, 0.15) 1px, transparent 1px);
  background-size: 80px 80px;
  position: absolute;
  inset: -200px 0 -100px;
  width: 100%;
  contain: strict;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 70%);
}
```

Dodane: `width: 100%` i `contain: strict`. `contain: strict` mówi przeglądarce, że ten element nie wpływa na rozmiary niczego wokół i nie musi być uwzględniany w layout calculations.

- [ ] **Step 3: Dodać `contain: strict` do `.hero-glow`**

W `style.css` linia 463:

```css
.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: -1;
  opacity: 0.08;
  contain: strict;
}
```

- [ ] **Step 4: Zbudować i zweryfikować wizualnie**

```bash
python build.py
```

Otworzyć stronę w Chrome DevTools → Performance → nagrać ładowanie z throttlingiem "Mid-tier mobile". Sprawdzić, że CLS < 0,1.

- [ ] **Step 5: Commit**

```bash
git add style.css
git commit -m "fix: eliminate CLS on mobile by adding containment to hero decorative elements"
```

---

## Task 3: Poprawić LCP na mobilnych — odroczenie render-blocking resources (4,4 s → < 2,5 s)

**Files:**
- Modify: `index.html:48,1182-1183`
- Modify: `en/index.html` (analogiczne linie)
- Modify: wszystkie podstrony: `pomoc.html`, `en/help.html`, `aktualizacje.html`, `en/updates.html`, `polityka-prywatnosci.html`, `en/privacy-policy.html`

**Kontekst:** Opóźnienie renderowania LCP wynosi 1490 ms na mobilnych. Główne blokery: `style.min.css` (render-blocking, 170 ms), `consent.min.js` i `script.min.js` (oba ładowane synchronicznie na końcu `<body>` — blokują parsing choć nie renderowanie bezpośrednio, ale przeglądarka musi je sparsować przed first paint). Dodanie `defer` do skryptów + wyciągnięcie krytycznego CSS inline zmniejszy opóźnienie renderowania.

### Krok A: Dodać `defer` do skryptów we wszystkich plikach HTML

- [ ] **Step 1: Dodać `defer` do skryptów w `index.html`**

Zmienić linie 1182-1183 z:

```html
  <script src="./consent.min.js"></script>
  <script src="./script.min.js"></script>
```

na:

```html
  <script src="./consent.min.js" defer></script>
  <script src="./script.min.js" defer></script>
```

- [ ] **Step 2: Dodać `defer` do skryptów w `en/index.html`**

Zmienić linie 1157-1158 z:

```html
  <script src="../consent.min.js"></script>
  <script src="../script.min.js"></script>
```

na:

```html
  <script src="../consent.min.js" defer></script>
  <script src="../script.min.js" defer></script>
```

- [ ] **Step 3: Dodać `defer` do skryptów we wszystkich pozostałych podstronach**

Powtórzyć ten sam wzorzec w:
- `pomoc.html`
- `en/help.html`
- `aktualizacje.html`
- `en/updates.html`
- `polityka-prywatnosci.html`
- `en/privacy-policy.html`

Szukaj linii `<script src=` w każdym pliku i dodaj atrybut `defer`.

- [ ] **Step 4: Zweryfikować, że skrypty działają z `defer`**

Skrypty `consent.js` i `script.js` oba używają wzorca IIFE `(() => { ... })()` i odwołują się do `document.querySelector` — z `defer` DOM jest już sparsowany, więc selektory zadziałają. Oba skrypty nasłuchują `DOMContentLoaded` tylko w jednym miejscu (`consent.js:104`), co z `defer` też zadziała.

Otworzyć stronę w przeglądarce, sprawdzić:
- Menu mobilne działa
- Slider hero działa
- Cookie banner pojawia się (wyczyść `localStorage.removeItem('tf_cookie_consent')`)
- Formularz beta działa
- Animacje reveal działają

- [ ] **Step 5: Commit**

```bash
git add index.html en/index.html pomoc.html en/help.html aktualizacje.html en/updates.html polityka-prywatnosci.html en/privacy-policy.html
git commit -m "perf: defer consent and script loading to reduce render blocking"
```

### Krok B: Inline critical CSS dla hero

- [ ] **Step 6: Wyodrębnić krytyczny CSS i dodać inline do `<head>` w `index.html`**

Dodać po linii `<link rel="stylesheet" href="./style.min.css" />` (linia 48) blok:

```html
  <link rel="stylesheet" href="./style.min.css" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="./style.min.css" /></noscript>
```

I **usunąć** oryginalne `<link rel="stylesheet" href="./style.min.css" />`.

Przed nowym linkiem, dodać inline `<style>` z krytycznym CSS (reset + topbar + hero + font-face):

```html
  <style>
    *,*::before,*::after{box-sizing:border-box}
    html{scroll-behavior:smooth;background:#fff}
    body{min-width:320px;color:#d5d7db;background:#fff;margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:1rem;line-height:1.63;font-weight:400;-webkit-font-smoothing:antialiased}
    img,svg{max-width:100%;display:block}
    a{color:inherit;text-decoration:none}
    :root{--bg:#15181e;--bg-deep:#0d0e12;--surface:#1c2129;--ink:#efeff1;--ink-2:#d5d7db;--muted:#656a76;--line:rgba(178,182,189,0.12);--accent:#1060ff;--accent-dim:rgba(16,96,255,0.08);--font-brand:"Hanken Grotesk",system-ui,sans-serif;--font-body:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;--font-mono:"JetBrains Mono",ui-monospace,monospace;--max:1150px;--section-pad:clamp(3.5rem,6vw,5rem);--section-pad-x:max(1.5rem,calc(50vw - 575px));--radius-sm:3px;--radius-md:5px;--radius-lg:8px;--shadow-whisper:rgba(97,104,117,0.05) 0px 1px 1px,rgba(97,104,117,0.05) 0px 2px 2px}
    .site-shell{position:relative;overflow-x:clip}
    .topbar{z-index:50;backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);background:rgba(21,24,30,0.92);border-bottom:1px solid rgba(178,182,189,0.12);grid-template-columns:auto 1fr auto auto;align-items:center;gap:1.2rem;width:100%;min-height:3.5rem;padding:0.5rem var(--section-pad-x);display:grid;position:sticky;top:0}
    .hero{width:100%;isolation:isolate;contain:layout;grid-template-columns:1fr;align-items:start;gap:2.5rem;margin:0 auto;padding:4rem var(--section-pad-x) 3rem;display:grid;position:relative;overflow:visible;background:#15181e;color:#d5d7db}
    .hero-bg-grid{pointer-events:none;z-index:-2;opacity:0.04;position:absolute;inset:-200px 0 -100px;width:100%;contain:strict}
    .hero-glow{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;z-index:-1;opacity:0.08;contain:strict}
    [data-reveal]{opacity:0;transform:translateY(18px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
    .tf-style{font-weight:700!important;letter-spacing:0.06em}
  </style>
```

**Uwaga:** To jest uproszczony zestaw — zawiera tokens, reset, topbar layout i hero layout. Pełna wersja ładuje się asynchronicznie.

- [ ] **Step 7: Powtórzyć inline critical CSS w `en/index.html`**

Dokładnie ten sam blok `<style>` i zmiana `<link>` na async load.

- [ ] **Step 8: Zbudować i przetestować**

```bash
python build.py
```

Otworzyć stronę z "Disable cache" i "Slow 3G" w DevTools. Hero powinien być widoczny od razu (bez FOUC), reszta stylów doładowuje się asynchronicznie.

- [ ] **Step 9: Commit**

```bash
git add index.html en/index.html
git commit -m "perf: inline critical CSS and async-load full stylesheet to reduce LCP"
```

---

## Task 4: Odroczyć ładowanie gtag.js do pierwszej interakcji

**Files:**
- Modify: `consent.js`

**Kontekst:** gtag.js waży 152 KB, z czego 64 KB nieużywane. Generuje długie zadania (119 ms na desktopie, 120 ms na mobilnych). Obecna implementacja ładuje gtag.js natychmiast (linia 24-26 consent.js), nawet gdy consent nie został jeszcze udzielony. Optymalizacja: załadować gtag.js dopiero po interakcji użytkownika LUB po udzieleniu zgody.

- [ ] **Step 1: Refaktorować `consent.js` — opóźnić ładowanie gtag.js**

Zmienić `consent.js` z:

```javascript
// --- Load gtag.js (deferred, won't fire until consent granted) ---
const gtagScript = document.createElement("script");
gtagScript.async = true;
gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
document.head.appendChild(gtagScript);

gtag("js", new Date());
gtag("config", GA_ID, {
  anonymize_ip: true,
  send_page_view: true,
});
```

na:

```javascript
// --- Load gtag.js only after consent or on interaction ---
let gtagLoaded = false;
function loadGtag() {
  if (gtagLoaded) return;
  gtagLoaded = true;
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);
  gtag("js", new Date());
  gtag("config", GA_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
}

// If consent already granted, load on first interaction to not block main thread
const stored = localStorage.getItem(CONSENT_KEY);
if (stored === "granted") {
  const events = ["scroll", "click", "touchstart", "keydown"];
  const onInteraction = () => {
    loadGtag();
    grantConsent();
    events.forEach(e => window.removeEventListener(e, onInteraction));
  };
  events.forEach(e => window.addEventListener(e, onInteraction, { once: true, passive: true }));
  // Fallback: load after 5s idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadGtag, { timeout: 5000 });
  } else {
    setTimeout(loadGtag, 5000);
  }
  return;
}
if (stored === "denied") {
  return;
}
```

Usunąć oryginalne linie 23-33 i oryginalne linie 50-58 (sprawdzanie `stored`), bo zostają zastąpione powyższym blokiem.

Dodatkowo zmienić `grantConsent()` aby jednocześnie załadować gtag:

```javascript
function grantConsent() {
  loadGtag();
  gtag("consent", "update", {
    analytics_storage: "granted",
  });
}
```

- [ ] **Step 2: Zbudować i przetestować**

```bash
python build.py
```

Otworzyć DevTools → Network → sprawdzić, że `gtag/js` NIE ładuje się na starcie, dopiero po scrollu/kliknięciu (gdy consent granted) lub po kliknięciu "Akceptuję" w bannerze.

- [ ] **Step 3: Commit**

```bash
git add consent.js
git commit -m "perf: defer gtag.js loading until user interaction or idle callback"
```

---

## Task 5: Preload czcionek i ograniczyć warianty

**Files:**
- Modify: `index.html:33-35`
- Modify: `en/index.html` (analogiczne linie)

**Kontekst:** 4 pliki czcionek (Hanken Grotesk + JetBrains Mono) ładują po ~100 KB. Czcionki powodują drobne CLS na desktopie. Obecnie czcionki ładowane przez `<link rel="preload" as="style">` z `onload` — dobry wzorzec, ale brak preload samych plików `.woff2`.

- [ ] **Step 1: Dodać preload dla najważniejszych wariantów czcionek**

W `index.html`, po linii `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` (linia 32), dodać:

```html
  <link rel="preload" as="font" type="font/woff2" crossorigin
    href="https://fonts.gstatic.com/s/hankengrotesk/v17/ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZYheg.woff2" />
```

**Uwaga:** URL pliku `.woff2` trzeba pobrać z CSS Google Fonts (otworzyć URL ze stylesheet w przeglądarce, znaleźć `latin` subset Hanken Grotesk 400). Powyższy URL jest przykładowy — przed implementacją sprawdzić aktualny URL:

```bash
curl -s "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap" -H "User-Agent: Mozilla/5.0" | grep -o 'https://[^)]*\.woff2' | head -4
```

Preloadować **tylko** Hanken Grotesk 400 (najbardziej użytkowany wariant — body text). Pozostałe warianty załadują się normalnie.

- [ ] **Step 2: Rozważyć ograniczenie wariantów — opcjonalne**

Sprawdzić w CSS, które wagi czcionek są faktycznie używane. Jeśli JetBrains Mono 500 i 600 nie są potrzebne, zmienić URL Google Fonts z:

```
family=JetBrains+Mono:wght@400;500;600;700
```

na:

```
family=JetBrains+Mono:wght@400;700
```

Analogicznie dla Hanken Grotesk — jeśli 500 nie jest używane, usunąć.

- [ ] **Step 3: Powtórzyć w `en/index.html`**

Dodać ten sam `<link rel="preload">` tag.

- [ ] **Step 4: Zbudować i przetestować**

```bash
python build.py
```

DevTools → Network → sprawdzić, że czcionka `.woff2` ładuje się wcześniej (w sekcji "early hints" lub jako jeden z pierwszych requestów).

- [ ] **Step 5: Commit**

```bash
git add index.html en/index.html
git commit -m "perf: preload primary font variant to reduce FOUT and CLS"
```

---

## Task 6: Poprawić kontrast kolorów — brand-beta i cookie buttons

**Files:**
- Modify: `style.css:218-224` (`.brand-beta`)
- Modify: `style.css:3797-3838` (`.cookie-btn`)

**Kontekst:** Element `.brand-beta` (tekst "Beta") ma kontrast poniżej 4.5:1 (WCAG AA). Przyciski cookie bar mają problem z kontrastem na ciemnym tle.

- [ ] **Step 1: Zwiększyć kontrast `.brand-beta`**

W `style.css` linia 218, zmienić kolor tekstu z `var(--accent)` (#1060ff na ciemnym tle) na jaśniejszy wariant:

```css
.brand-beta {
  color: var(--accent-2);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--accent-dim);
  border: 1px solid rgba(16, 96, 255, 0.2);
```

`--accent-2` to `#2b89ff` — jaśniejszy odcień niebieskiego, kontrast ~5.2:1 na ciemnym tle `rgba(21, 24, 30, 0.92)`.

- [ ] **Step 2: Poprawić kontrast cookie-btn-reject**

W `style.css` linia 3828, zmienić kolor tekstu `.cookie-btn-reject`:

```css
.cookie-btn-reject {
  background: #232a35;
  border-color: rgba(178, 182, 189, 0.25);
  color: #9a9faa;
}
```

Zmieniono z `#656a76` na `#9a9faa` — kontrast ~5.1:1 na tle `#232a35`.

- [ ] **Step 3: Zbudować i zweryfikować kontrast**

```bash
python build.py
```

Chrome DevTools → Elements → wybrać `.brand-beta` → w sekcji Styles kliknąć na kolor → sprawdzić contrast ratio. Powinien być >= 4.5:1.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "a11y: improve color contrast for brand-beta badge and cookie buttons"
```

---

## Task 7: Build końcowy i weryfikacja

**Files:**
- Run: `build.py`

- [ ] **Step 1: Pełny rebuild**

```bash
python build.py
```

Oczekiwane: brak błędów, pliki `style.min.css`, `script.min.js`, `consent.min.js` wygenerowane.

- [ ] **Step 2: Weryfikacja wizualna**

Otworzyć stronę lokalnie lub na staging. Sprawdzić:
- Hero wyświetla się bez przesunięć (brak CLS)
- Slider działa
- Cookie banner działa
- Menu mobilne działa
- Czcionki ładują się bez widocznego FOUT
- Animacje reveal działają

- [ ] **Step 3: Lighthouse audit**

Chrome DevTools → Lighthouse → Mobile → sprawdzić:
- Performance >= 85 (cel: 90+)
- Best Practices >= 95
- Accessibility >= 98
- CLS < 0,1
- LCP < 2,5 s

- [ ] **Step 4: Commit finałowy (jeśli były poprawki)**

```bash
git add -A
git commit -m "chore: final build after pagespeed optimizations"
```

---

## Podsumowanie zmian i oczekiwany efekt

| Task | Metryka | Przed | Cel |
|---|---|---|---|
| 1. HTTPS + nagłówki | Best Practices | 78 | 95+ |
| 2. CLS hero fix | CLS mobile | 0,269 | < 0,1 |
| 3. Defer scripts + critical CSS | LCP mobile | 4,4 s | < 2,5 s |
| 4. Defer gtag.js | TBT mobile | 70 ms | < 50 ms |
| 5. Font preload | FCP mobile | 2,6 s | < 2,0 s |
| 6. Kontrast kolorów | Accessibility | 97 | 99-100 |
| **Łącznie** | **Performance mobile** | **67** | **90+** |
