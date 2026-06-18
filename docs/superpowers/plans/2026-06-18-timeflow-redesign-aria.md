# TIMEFLOW — Redesign wizualny (język „Aria") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przenieść zaakceptowany język wizualny ze szkicu (`szkic.html`) na produkcyjną stronę — w wersji **PL (`index.html`)** i **EN (`en/index.html`)** — zachowując **pełną treść**, SEO/schema oraz pipeline buildu.

**Architecture:** Statyczna strona (HTML + jeden współdzielony `style.css` → `style.min.css`, JS w `script.js` → `script.min.js`). Redesign = nowy system designu w CSS + przebudowa markup sekcji w obu plikach HTML. Źródłem prawdy wizualnej jest `szkic.html`. Czerń/jasne naprzemiennie, typografia szeryfowa (display) + grotesk (body) + mono (etykiety), jeden akcent, generatywna animacja SVG Algorytmu Uczciwego Czasu w hero.

**Tech Stack:** HTML5, CSS (lightningcss-cli do minifikacji), vanilla JS (terser), woff2 (Instrument Serif self-hosted + istniejące Hanken Grotesk / JetBrains Mono), Python `build.py` (minifikacja + generowanie `*.md` dla agentów + sitemap + agent-skills index), Playwright (weryfikacja wizualna).

**Two zasady nadrzędne (wymagania użytkownika):**
1. **Treść pełna.** Szkic skrócił podpunkty dla czystości edytorskiej — **produkcja zachowuje 100% oryginalnej treści** z obecnego `index.html` (wszystkie bullety funkcji, wszystkie FAQ, wszystkie sekcje, zrzuty ekranu produktu). Nowy jest *język wizualny*, nie zakres treści.
2. **Parytet EN.** Każda zmiana w `index.html` ma lustrzane odbicie w `en/index.html` z istniejącą angielską treścią. `hreflang`, canonical EN, schema EN — bez zmian w znaczeniu.

**MUST-HAVE (jawnie potwierdzone przez użytkownika) — żadnego z tych nie wolno zgubić:**
- ✅ **Zrzuty ekranu produktu** (6 widoków: dashboard/projects/sessions/analysis/estimates/ai-model) — Task 4.
- ✅ **Pełna lista funkcji** (9 kart z KOMPLETEM podpunktów) — Task 3.4.
- ✅ **Historia aktualizacji / changelog** (sekcja „Aktualizacje" — teaser 0.1.6 + link do `aktualizacje.html`) — Task 3.6, EN: Task 6.

**Integracja — WAŻNE: `style.min.css` jest WSPÓŁDZIELONY.** Ładuje go 6 stron: `index.html`, `en/index.html`, `pomoc.html`, `aktualizacje.html`, `en/help.html`, `en/updates.html`. Te „inne" strony używają własnych klas (`help-*`, `updates-*`) i **nie** używają `class="section"` (zweryfikowane: 0 wystąpień). Wniosek dla Task 1:
- Style specyficzne dla home (`.hero`, `.section`, `.feature-card` itp.) były używane TYLKO przez stary `index.html` → można je przebudować.
- **NIE wolno** usuwać tokenów `:root`, na których polegają `help.css`/`updates.css` (`var(--accent)`, `var(--ink)`, `var(--muted)`, `var(--line)`, `var(--font-mono)` itd.) — DODAWAJ nowe tokeny (`--serif`, `--bg-dark`, `--bg-light`...), nie kasuj istniejących.
- **NIE wolno** zmieniać bazowej reguły `h1,h2,h3 { font-family: var(--font-brand) }` (użają jej inne strony) — serif aplikuj przez klasę `.h2` i `.hero h1` (scoped).
- Regresja: po Task 1 załaduj `pomoc.html` i `aktualizacje.html` (PL+EN) i potwierdź zrzutem, że wyglądają jak wcześniej.

---

## File Structure

| Plik | Rola | Akcja |
|------|------|-------|
| `szkic.html` | Wizualny punkt odniesienia (sketch) | Read-only źródło prawdy; **nie deployowany** |
| `home.css` | **NOWY** izolowany arkusz redesignu home (tokeny + sekcje + hero anim + self-host fonts) | Create (port ze `szkic.html`) |
| `home.min.css` | Minifikat home — ładowany TYLKO przez `index.html` + `en/index.html` | Regenerate (build) |
| `style.css` / `style.min.css` | Stary współdzielony arkusz (pomoc/aktualizacje/help/updates) | **Bez zmian** — izolacja |
| `index.html` | Strona PL | Modify (markup sekcji + inline critical CSS) |
| `en/index.html` | Strona EN | Modify (lustrzanie PL, treść EN) |
| `script.js` | JS: reveal, fonty, consent hooki, mobile menu, form | Modify (dodać serif do loadera, wyciąć logikę starego hero-slidera) |
| `script.min.js` | Minifikat JS | Regenerate (build) |
| `fonts/instrument-serif-latin.woff2` | Display serif (self-host) | Create |
| `fonts/instrument-serif-latin-ext.woff2` | Display serif (latin-ext, polskie znaki) | Create |
| `index.md`, `en/index.md` | Wersje Markdown dla agentów AI | Regenerate (build z nowego HTML) |
| `sitemap.xml`, `.well-known/agent-skills/index.json` | SEO / discovery | Regenerate (build) |

**Zasada:** `style.css` jest źródłem; **nigdy nie edytujemy `*.min.*` ręcznie** — regeneruje je `build.py`/lightningcss/terser.

---

## Uwaga o „testach" dla strony statycznej

Ta strona nie ma sensownej powierzchni testów jednostkowych. Dyscyplinę „test-first" realizujemy jako **weryfikację przed uznaniem zadania za zrobione**:
- **Wizualna:** Playwright screenshot (desktop 1440 + mobile 390), porównanie ze `szkic.html`.
- **Build:** `lightningcss-cli`/`terser` kończą się `exit 0`.
- **Parytet treści:** każdy oryginalny fragment tekstu obecny w nowym markupie (skrypt-grep).
- **Parytet PL/EN:** ta sama struktura sekcji w obu plikach.
Każde zadanie ma krok „Definiuj kryterium weryfikacji" przed implementacją i krok „Zweryfikuj" po.

---

### Task 0: Przygotowanie — worktree, baseline, font serif

**Files:**
- Create: `fonts/instrument-serif-latin.woff2`, `fonts/instrument-serif-latin-ext.woff2`
- Reference: `szkic.html`

- [ ] **Step 1: Worktree izolacyjny**

```bash
git worktree add ../page-redesign -b redesign-aria
cd ../page-redesign
```

- [ ] **Step 2: Baseline — zrzuty obecnej strony (przed)**

Uruchom lokalny serwer i zapisz zrzuty referencyjne PL+EN (desktop+mobile) do `/tmp/baseline-*.png`. Cel: porównanie „przed/po" i pewność, że nic z treści nie zniknęło.

```bash
python3 -m http.server 8765 &
# Playwright: zrzut index.html i en/index.html @1440 i @390 → /tmp/baseline-{pl,en}-{desk,mob}.png
```

- [ ] **Step 3: Self-host serif (Instrument Serif z polskimi znakami)**

Pobierz woff2 (latin + latin-ext) Instrument Serif. **Kryterium:** plik zawiera glify `ł ą ę ó ż ź ć ń ś` (latin-ext). Zweryfikuj wizualnie na słowie „uczciwie / Czas liczony".

```bash
# pobierz z fonts.gstatic.com (subset latin + latin-ext) do fonts/
ls -la fonts/instrument-serif-latin*.woff2
```

- [ ] **Step 4: Commit**

```bash
git add fonts/instrument-serif-latin*.woff2
git commit -m "chore: self-host Instrument Serif (latin + latin-ext) for redesign"
```

---

### Task 1: System designu w `style.css`

**Files:**
- Modify: `style.css` (blok `:root`, kontekst jasny, dodać klasy sekcji)
- Test/verify: regeneracja `style.min.css`

- [ ] **Step 1: Kryterium weryfikacji**

Po zmianie: `:root` zawiera nową paletę (czerń `#060708`, off-white `#f2f1ec`, akcent, serif/sans/mono); klasy `.section.dark`/`.section.light`, `.h2`, `.eyebrow-s`, `.lead-s` istnieją; `npx lightningcss-cli` → exit 0; `grep '#2b7fff\|aurora' style.css` nie wprowadza starych klisz.

- [ ] **Step 2: Dodać `@font-face` dla serif + tokeny**

W `style.css` (góra, przy istniejących `@font-face` ładowanych JS-em — patrz `script.js`): dodać deklaracje Instrument Serif (latin + latin-ext, `font-display:swap`). Dodać tokeny:

```css
:root {
  --serif: 'Instrument Serif', Georgia, serif;
  /* --font-brand/-body/-mono pozostają; serif to NOWA rola: display */
  --bg-dark: #060708; --bg-light: #f2f1ec;
  --ink-on-dark: #f4f3f1; --ink-on-light: #15161a;
  --muted-on-dark: #8b8d92; --muted-on-light: #5c5f68;
  --accent: #3b82f6; --accent-2: #8ab4ff;
}
```

(Kopiuj dokładne wartości z `szkic.html` `:root` — to kanon.)

- [ ] **Step 3: Dodać klasy sekcji/typografii**

Przenieś ze `szkic.html` reguły: `.section`, `.section.light/.dark`, `.wrap`, `.eyebrow-s`, `.h2` (`font-family:var(--serif)`), `.lead-s`, `.head`. Plus komponenty: `.grid3`, `.steps`/`.step`, `.feat-list`/`.feat`, `.compare`/`.cbox`, `.rows`/`.row`, `.road`, `.faq`, `.beta-grid`/`.form`. (Kanon = `szkic.html` `<style>`.)

- [ ] **Step 4: Regeneruj i zweryfikuj**

```bash
npx --yes lightningcss-cli --minify style.css -o style.min.css
echo "exit:$?"   # oczekiwane 0
```

- [ ] **Step 5: Commit**

```bash
git add style.css style.min.css
git commit -m "feat(css): add Aria-style design system (serif display, section system, single accent)"
```

---

### Task 2: Hero w `index.html` (PL) — animacja Algorytmu Uczciwego Czasu

**Files:**
- Modify: `index.html` (sekcja `.hero` + inline critical CSS w `<head>`; **zachować** cały `<head>` meta/OG/schema/hreflang)
- Reference: `szkic.html` hero (SVG + `.copy` + `.hero-foot`)

- [ ] **Step 1: Kryterium weryfikacji**

Hero renderuje wielki szeryfowy nagłówek + animowaną grafikę SVG (orbity się obracają — `getComputedStyle('.spin-a').transform` zmienia się w czasie); `prefers-reduced-motion` zatrzymuje ruch; meta/title/OG/schema/hreflang **niezmienione**.

- [ ] **Step 2: Podmień markup `<main>` hero**

Zastąp obecny blok `.hero` (showcase slider + tail + signal-strip) markupem hero ze `szkic.html` (nav zostaje w istniejącej strukturze `.topbar`, ale stylowany po nowemu). **Zachowaj** `id="start"`, linki kotwiczne (`#funkcje`, `#beta`...), atrybuty `aria-*`.

- [ ] **Step 3: Zaktualizuj inline critical CSS**

W `<head><style>` zaktualizuj `--bg`, `--accent`, `.hero{background}` do nowej palety (czerń `#060708`), żeby pierwszy paint był spójny. **Nie** usuwaj `[data-reveal]` reguły (używana niżej).

- [ ] **Step 4: Decyzja o starym sliderze**

Markup `data-hero-slider`/`shot-rail` znika z hero → zrzuty produktu przenosimy do osobnej sekcji (Task 4). Zanotuj, że JS slidera trzeba uśpić (Task 5).

- [ ] **Step 5: Zweryfikuj wizualnie**

```bash
# Playwright @1440 + @390 → porównaj z szkic.html hero
```
Oczekiwane: identyczny układ jak szkic; nagłówek po polsku z „ł/ą/ę" w serif (font z Task 0).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat(pl): rebuild hero with Fair Time Algorithm SVG animation (Aria style)"
```

---

### Task 3: Sekcje treści PL — PEŁNA treść w stylu edytorskim

**Files:**
- Modify: `index.html` (wszystkie sekcje po hero)
- Reference: `szkic.html` (układ) + **obecny `index.html` z git (`git show HEAD:index.html`) = źródło PEŁNEJ treści**

- [ ] **Step 1: Kryterium weryfikacji (parytet treści)**

Po przebudowie: **każdy** oryginalny fragment tekstu istnieje w nowym markupie. Weryfikacja skryptem:

```bash
git show HEAD:index.html > /tmp/old-index.html
# wyciągnij teksty z <li>/<p>/<h3> starego i sprawdź obecność w nowym
python3 - <<'EOF'
import re,html
old=open('/tmp/old-index.html',encoding='utf-8').read()
new=open('index.html',encoding='utf-8').read()
def texts(s): return [html.unescape(re.sub('<[^>]+>','',m)).strip() for m in re.findall(r'<li[^>]*>(.*?)</li>',s,re.S)]
missing=[t for t in texts(old) if t and t[:25] not in new]
print("BRAKUJĄCE bullety:",len(missing)); [print(" -",m[:70]) for m in missing[:40]]
EOF
```
Oczekiwane: `BRAKUJĄCE bullety: 0`.

- [ ] **Step 2: Sekcja Persony** (`.section.light` + `.grid3`)

Markup ze `szkic.html`; treść 3 person z oryginału (Grafik / UI-UX / Freelancer poza designem) — **z tagami** (`persona-tags`) zachowanymi jako lista pod opisem.

- [ ] **Step 3: Sekcja „Jak to działa"** (`.section.dark` + `.steps`)

Stepper 01–03; **zachowaj pełne listy** pod każdym krokiem (daemon status/autostart, auto-import, archiwum; projekty+foldery, AI suggest/auto_safe/rollback, merge; heatmapa, estimated value, JSON export/import).

- [ ] **Step 4: Sekcja Funkcje** (`.section.light` + `.feat-list`) — **9 kart z PEŁNYMI bulletami**

Każda z 9 funkcji (Tracking Core, Dashboard, Projects, Sessions, AI&Model, Analysis, Estimates, Data&Sync, Daemon&Ops) z **kompletem podpunktów** z oryginału (nie skróconych jak w szkicu). Układ edytorski: `tag + h3` po lewej, `opis + <ul>` po prawej. Zachowaj toggle „Pokaż wszystkie funkcje" jeśli był (lub pokaż wszystkie — decyzja: pokaż wszystkie, bo to desktop edytorski).

- [ ] **Step 5: Sekcja Algorytm** (`.section.dark` + `.compare`)

Wizualizacja 3h vs 1h z **poprawioną narracją** (ustalone z użytkownikiem): to dane **dla freelancera** („Twój realny czas"), **nie** „naliczone klientowi". Dodaj notkę: „To Twoje prawdziwe dane — do wycen, faktur i własnej kontroli. Co z nich powiesz klientowi, to Twoja decyzja." Zachowaj 6 oryginalnych punktów jako rozwinięcie pod porównaniem.

- [ ] **Step 6: Platformy / Stack / Roadmapa / Aktualizacje / FAQ / Beta**

Po kolei, markup ze szkicu, treść pełna z oryginału:
- Platformy: 4 wiersze (Windows/macOS Dostępne, Linux/Mobile Planowane) z pełnymi opisami.
- Stack: 6 pozycji (Rust+Tauri, SQLite, React, Daemon, Stability Engine, Sync/Next.js) z pełnymi bulletami.
- Roadmapa: 3 fazy z pełnymi listami.
- **Aktualizacje (historia zmian) — MUST-HAVE:** sekcja `#aktualizacje` z oryginału — teaser „TIMEFLOW 0.1.6 już dostępny", badge'y typów zmian (Nowe funkcje / Usprawnienia / Naprawione błędy) i **link `aktualizacje.html`** („Zobacz pełny changelog 0.1.6"). Styl edytorski (eyebrow + h2 + karta release + CTA).
- FAQ: **5 pytań** (`<details>`) — pełne odpowiedzi.
- Beta: formularz `action="./form-handler.php"` **bez zmian w polach/nazwach** (name, email, role, needs, consent, honeypot `fax_number`) + testimonial.

> Uwaga: stara strona ma też sekcję „Zaufanie i kontakt" (O projekcie / Jak działa dostęp do bety) — zachowaj jako sekcję `.section` przed FAQ lub scal z Beta. Nie gubić tej treści (parytet z Task 3.S1 to wykryje).

- [ ] **Step 7: Zweryfikuj parytet treści + wizualnie**

Uruchom skrypt z Step 1 (oczekiwane 0 braków) + Playwright full-page @1440/@390.

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "feat(pl): rebuild all content sections in Aria style, full content preserved"
```

---

### Task 4: Sekcja zrzutów produktu (przeniesione z hero)

**Files:**
- Modify: `index.html` (nowa sekcja showcase)
- Modify: `style.css` (style galerii)

- [ ] **Step 1: Kryterium**

Wszystkie 6 zrzutów (`dashboard-main, projects, sessions, analysis, estimates, ai-model`) obecne z `<picture>`/`srcset`/AVIF i `alt` jak w oryginale (SEO + LCP zachowane); LCP image z `fetchpriority="high"` na pierwszym widocznym.

- [ ] **Step 2: Dodaj sekcję „Interfejs"** (`.section.light` lub `.dark`)

Edytorska galeria: duży zrzut główny + podpisy. Zachowaj `<picture><source type="image/avif">` + `srcset` 480/960/1600 z oryginalnego markupu (kopiuj 1:1 ścieżki).

- [ ] **Step 3: Zweryfikuj** — Playwright; sprawdź, że obrazy się ładują (brak 404 w logu serwera).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat(pl): add product screenshots showcase section (moved from hero)"
```

---

### Task 5: JS — adaptacja (`script.js`)

**Files:**
- Modify: `script.js`
- Regenerate: `script.min.js`

- [ ] **Step 1: Kryterium**

Po zmianie: brak błędów konsoli na nowym `index.html`; fonty (w tym serif) ładują się; reveal działa; consent/webmcp/mobile-menu/form-walidacja działają; logika starego hero-slidera nie rzuca błędów (usunięta lub guard `if(el)`).

- [ ] **Step 2: Dodaj serif do loadera fontów**

W bloku „Deferred font loading" (`script.js` ~1062) dodaj `FontFace('Instrument Serif', url('/fonts/instrument-serif-latin.woff2'), {...unicodeRange: LATIN_RANGE})` + latin-ext; po `loaded` ustaw `--serif`. (Spójnie z istniejącym wzorcem Hanken/JetBrains.)

- [ ] **Step 3: Wytnij/uodpornij logikę hero-slidera**

Slider (`data-hero-slider*`, `heroHeadline`/`heroLead` rotacja) — usuń albo otocz guardami (`const el=...; if(!el) return;`). **Decyzja:** zostaw jeden stały H1 (bez losowej rotacji — to też naprawia FOUC/SEO). Zachowaj rotator ról jeśli używany w nowym hero (lub usuń).

- [ ] **Step 4: Regeneruj + zweryfikuj konsolę**

```bash
npx --yes terser script.js -o script.min.js --compress --mangle
echo "exit:$?"
# Playwright: navigate index.html → oczekiwane 0 console errors
```

- [ ] **Step 5: Commit**

```bash
git add script.js script.min.js
git commit -m "feat(js): load serif font, retire hero-slider, single stable H1"
```

---

### Task 6: Wersja EN — `en/index.html` (parytet 1:1)

**Files:**
- Modify: `en/index.html`
- Reference: `index.html` (struktura) + `git show HEAD:en/index.html` (pełna treść EN)

- [ ] **Step 1: Kryterium**

`en/index.html` ma **identyczną strukturę sekcji** jak `index.html`, z **angielską** treścią z oryginału EN; ładuje `../style.min.css` i `../script.min.js`; meta/OG/schema/hreflang/canonical EN **niezmienione**; ścieżki assetów z `../` (fonty, screeny, ikony).

- [ ] **Step 2: Przenieś hero EN**

Hero jak w PL, nagłówek/sub po angielsku. Ścieżki SVG bez zmian (inline), fonty przez `../fonts/` w `@font-face`/loaderze (loader używa `/fonts/` absolutnie — OK dla obu).

- [ ] **Step 3: Przenieś wszystkie sekcje EN**

Lustrzane sekcje 1:1 z pełną treścią EN (z `git show HEAD:en/index.html`). Parytet treści — skrypt jak w Task 3 Step 1 na plikach EN. Formularz EN: `action` zgodny z oryginałem EN. **MUST-HAVE także w EN:** zrzuty produktu (alt EN), pełna lista funkcji, **sekcja Updates/changelog z linkiem do `updates.html`** (odpowiednik `aktualizacje.html`).

- [ ] **Step 4: Zweryfikuj parytet PL/EN + wizualnie**

```bash
# liczba sekcji .section musi się zgadzać
echo "PL:$(grep -c 'class=\"section' index.html) EN:$(grep -c 'class=\"section' en/index.html)"
# Playwright: en/index.html @1440/@390 — układ jak PL
```

- [ ] **Step 5: Commit**

```bash
git add en/index.html
git commit -m "feat(en): mirror Aria redesign to English page, full EN content + parity"
```

---

### Task 7: Build — regeneracja artefaktów i treści dla agentów

**Files:**
- Regenerate: `style.min.css`, `script.min.js`, `index.md`, `en/index.md`, `sitemap.xml`, `.well-known/agent-skills/index.json`

- [ ] **Step 1: Kryterium**

`build.py` przechodzi bez błędów; `index.md`/`en/index.md` (generowane z nowego HTML przez `HtmlToMd`) zawierają pełną treść tekstową (sekcje, funkcje, FAQ); sitemap `lastmod` zaktualizowany.

- [ ] **Step 2: Uruchom build (bez kroku obrazów, jeśli zbędny)**

```bash
python3 build.py 2>&1 | tee /tmp/build.log
grep -i "error\|Błąd\|!!!" /tmp/build.log || echo "build clean"
```
(Uwaga: `build.py` konwertuje też PNG→WebP i warianty — jeśli nie dodano nowych PNG, ten krok jest no-op. Markdown/sitemap/skills regenerują się zawsze.)

- [ ] **Step 3: Sprawdź markdown dla agentów**

```bash
wc -l index.md en/index.md
grep -c "Algorytm\|Funkcje\|FAQ" index.md   # treść obecna
```

- [ ] **Step 4: Commit**

```bash
git add style.min.css script.min.js index.md en/index.md sitemap.xml .well-known/agent-skills/index.json
git commit -m "build: regenerate minified assets, agent markdown, sitemap, skills index"
```

---

### Task 8: Weryfikacja końcowa (PL + EN, desktop + mobile, a11y)

**Files:** brak edycji — tylko weryfikacja; ewentualne poprawki wracają do odpowiednich tasków.

- [ ] **Step 1: Zrzuty „po" i porównanie z baseline + szkicem**

Playwright: `index.html` i `en/index.html` @1440 i @390 (full-page). Porównaj ze `szkic.html` (zgodność języka) i baseline (kompletność treści).

- [ ] **Step 2: Parytet treści — finalny grep (PL i EN)**

Uruchom skrypt z Task 3 Step 1 dla obu par (PL: HEAD vs nowy; EN: HEAD vs nowy). Oczekiwane: 0 braków w obu.

- [ ] **Step 3: A11y / jakość**

- `prefers-reduced-motion`: emuluj → animacja SVG i reveal zatrzymane.
- Kontrast: tekst `--muted-on-light`/`--muted-on-dark` ≥ 4.5:1 wzgl. tła (zmierz; popraw token jeśli nie).
- Focus: `:focus-visible` widoczny na linkach/polach formularza.
- Brak `console errors`; brak 404 assetów w logu serwera.

- [ ] **Step 4: Cache-busting po deployu (notatka)**

`style.min.css`/`script.min.js` ładowane bez wersji → po deployu użytkownicy mogą zobaczyć stary CSS. Rozważ dodać `?v=<hash>` do linków w obu HTML (jednorazowo) lub nagłówki cache. (Opcjonalne, poza zakresem redesignu — odnotować.)

- [ ] **Step 5: Finalny commit / przygotowanie PR**

```bash
git log --oneline redesign-aria
# scal/PR wg superpowers:finishing-a-development-branch
```

---

## Self-Review (wykonane)

**1. Pokrycie spec:** hero (T2), pełna treść wszystkich sekcji (T3), zrzuty produktu (T4), JS (T5), **EN parytet (T6)**, build+markdown agentów (T7), a11y/weryfikacja (T8). ✅ Obie zasady nadrzędne (treść pełna + EN) mają dedykowane kroki weryfikacji (T3.S1, T6.S4, T8.S2).

**2. Placeholdery:** kanon kodu = `szkic.html` (istniejący, zweryfikowany artefakt) + `git show HEAD:*` dla treści — plan wskazuje konkretne źródła zamiast „TODO".

**3. Spójność:** te same klasy (`.section`, `.h2`, `.feat`, `.compare`) używane w T1 (definicja) i T2–T6 (użycie); nazwy pól formularza i ścieżki assetów kopiowane 1:1 z oryginału (brak rozjazdu).

**Ryzyka odnotowane:** (a) polskie znaki w serif → Task 0 latin-ext; (b) FOUC/SEO H1 → Task 5 stały H1; (c) cache po deployu → Task 8.S4.
