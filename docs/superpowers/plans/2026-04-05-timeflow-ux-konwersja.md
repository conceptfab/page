# TIMEFLOW Landing Page — UX/Konwersja Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement critical UX/conversion fixes from the audit report — solid CTA buttons, proper touch targets, section reorder, mobile sticky CTA, slider UX, navigation simplification, and form improvements.

**Architecture:** Static HTML/CSS/JS site (no framework). All changes are in `index.html`, `style.css`, and `script.js`. CSS uses custom properties (`:root` variables). JavaScript is vanilla with no dependencies. Single mobile breakpoint at `max-width: 860px`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Vanilla JavaScript, Google Fonts (Roboto Mono + Inter)

---

## File Map

| File | Responsibility | Changes |
|------|---------------|---------|
| `style.css` | All styling, variables, responsive | Button sizes, CTA fills, touch targets, font sizes, sticky mobile bar, slider dots, section reorder support |
| `index.html` | Page structure, content, section order | Section reorder, nav simplification, form improvements, sticky bar markup, Inter font loading, social proof |
| `script.js` | Interactions, slider, form, menu | Swipe gestures, slide counter, sticky bar scroll logic |

---

## Task 1: Solid CTA Buttons — Visual Fill & Sizing

**Priority:** CRITICAL (report points 1, 3)
**Files:**
- Modify: `style.css:268-344` (button classes)
- Modify: `style.css:324-336` (topbar CTA)
- Modify: `index.html:185` (topbar CTA class)

### Problem
All CTA buttons use transparent backgrounds or subtle ghost styling. No button stands out as the primary conversion action. Font sizes are 10-11px, heights under 44px.

- [ ] **Step 1: Update `.btn` base class for minimum touch target**

In `style.css`, replace the `.btn` block (lines 268-285):

```css
.btn {
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 2px;
  padding: 0.65rem 1.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1;
  min-height: 44px;
  transition: color 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}
```

Key changes: `padding: 0.52rem 1.1rem` → `0.65rem 1.3rem`, `font-size: 0.72rem` → `0.82rem`, added `min-height: 44px`.

- [ ] **Step 2: Make `.btn-primary` a bold solid fill**

Replace `.btn-primary` block (lines 291-301):

```css
.btn-primary {
  color: #fff;
  background: var(--cyan);
  border-color: transparent;
  font-weight: 700;
  box-shadow: 0 0 20px #39d3ff40, 0 8px 30px #39d3ff30;
}
.btn-primary:hover {
  background: var(--cyan-2);
  box-shadow: 0 0 30px #39d3ff5c, 0 12px 36px #39d3ff47;
}
```

Key change: gradient background → solid `var(--cyan)`, dark text → white text `#fff`.

- [ ] **Step 3: Make topbar CTA solid and prominent**

In `index.html` line 185, change:
```html
<a class="btn btn-ghost topbar-cta" href="#beta">Dołącz do testów</a>
```
to:
```html
<a class="btn btn-primary topbar-cta" href="#beta">Dołącz do bety</a>
```

Then in `style.css`, update `.topbar-cta` (lines 324-336):

```css
.topbar-cta {
  font-size: 0.72rem;
  padding: 0.45rem 0.85rem;
  min-height: 36px;
}
.topbar.is-scrolled .topbar-cta {
  font-size: 0.68rem;
  padding: 0.38rem 0.7rem;
}
.topbar-cta:hover, .topbar-cta:focus-visible {
  box-shadow: 0 0 20px #39d3ff5c;
}
```

Remove the old ghost-style overrides from `.topbar-cta` (border-color, background override).

- [ ] **Step 4: Update form submit button label**

In `index.html` line 1143, change:
```html
<button type="submit" class="btn btn-primary btn-block">Wyślij zgłoszenie</button>
```
to:
```html
<button type="submit" class="btn btn-primary btn-block">Chcę testować TIMEFLOW</button>
```

- [ ] **Step 5: Verify in browser**

Open `index.html` in browser. Check:
- Hero CTA ("Poproś o dostęp do bety") has solid cyan fill, white text
- Topbar CTA ("Dołącz do bety") has solid cyan fill
- Form submit ("Chcę testować TIMEFLOW") has solid cyan fill, white text
- All buttons are at least 44px tall
- Hover states work (lighter cyan, glow)

- [ ] **Step 6: Commit**

```bash
git add style.css index.html
git commit -m "fix(ux): solid CTA buttons with proper fill, sizing, and touch targets"
```

---

## Task 2: Section Reorder — User-First Flow

**Priority:** CRITICAL (report point 2, 3)
**Files:**
- Modify: `index.html:407-510` (Stack section — move down)
- Modify: `index.html:662-687` (Updates section — move down)

### Problem
Stack technologiczny is the 2nd section after hero — technical jargon before product value. Updates section with version "0.1.6" in the middle of the page undermines confidence.

### Target section order:
1. Hero (with CTA) — stays
2. Slider (in hero) — stays
3. Personas ("Dla kogo") — move up
4. Workflow ("Jak działa") — move up
5. Features ("Funkcje") — stays roughly
6. Fair Time Algorithm — stays
7. FAQ — stays
8. About / Trust — stays
9. Stack technologiczny — move to bottom
10. Platforms — stays near bottom
11. Roadmap — stays near bottom
12. Updates — move to bottom (before footer)
13. Beta form — stays last

- [ ] **Step 1: Cut the Stack section**

In `index.html`, cut the entire Stack section (from `<section id="stack"` through its closing `</section>`) — approximately lines 407-509.

- [ ] **Step 2: Cut the Updates section**

Cut the Updates section (`<section id="aktualizacje"` through `</section>`) — approximately lines 662-687.

- [ ] **Step 3: Move Personas section up**

Move the Personas section (currently after Updates, starts with `<section class="section section-dark group-proof"` containing "Dla kogo działa najlepiej") to directly after the hero section (after the `</section>` that closes `.hero`).

- [ ] **Step 4: Move Workflow section after Personas**

Move `<section id="workflow"` to directly after the Personas section.

- [ ] **Step 5: Paste Stack section before Roadmap**

Paste the Stack section before `<section id="roadmap"`.

- [ ] **Step 6: Paste Updates section before Footer**

Paste the Updates section just before `</main>` (after the beta form section).

- [ ] **Step 7: Update navigation link order**

In `index.html` lines 169-176, reorder the nav links:

```html
<nav class="topnav" id="topbar-nav" aria-label="Nawigacja">
  <a href="#funkcje">Funkcje</a>
  <a href="#workflow">Jak działa</a>
  <a href="#faq">FAQ</a>
  <a href="#beta">Testy beta</a>
</nav>
```

Remove: Stack, Aktualizacje, Roadmapa, Pomoc links from topnav. These will remain accessible via footer.

- [ ] **Step 8: Add removed links to footer**

In `index.html`, find `.footer-links` (around line 1163) and add:

```html
<a href="#stack">Stack</a>
<a href="#roadmap">Roadmapa</a>
<a href="./aktualizacje.html">Aktualizacje</a>
<a href="./pomoc.html">Pomoc</a>
```

- [ ] **Step 9: Verify section order in browser**

Open browser. Scroll through page and verify:
1. Hero → 2. Personas → 3. Workflow → 4. Features → 5. Algorithm → 6. Platforms → 7. Stack → 8. Roadmap → 9. About → 10. FAQ → 11. Beta form → 12. Updates → Footer

- [ ] **Step 10: Commit**

```bash
git add index.html
git commit -m "refactor(ux): reorder sections for user-first flow — personas and workflow before tech stack"
```

---

## Task 3: Mobile Sticky CTA Bar

**Priority:** CRITICAL (report point 10.5)
**Files:**
- Modify: `index.html` (add sticky bar markup before `</body>`)
- Modify: `style.css` (add sticky bar styles)
- Modify: `script.js` (show/hide on scroll)

### Problem
On mobile, the beta form is at position ~15,773px (screen 17). No CTA is visible while scrolling. The nav CTA is hidden in hamburger menu.

- [ ] **Step 1: Add sticky bar HTML**

In `index.html`, just before the closing `</div><!-- .site-shell -->`, add:

```html
<div class="mobile-sticky-cta" id="mobileStickyBar" aria-hidden="true">
  <a class="btn btn-primary" href="#beta">Dołącz do bety &rarr;</a>
</div>
```

- [ ] **Step 2: Add sticky bar CSS**

At the end of `style.css` (before the `@media (max-width: 860px)` block), add:

```css
/* ── Mobile Sticky CTA ── */
.mobile-sticky-cta {
  display: none;
}

@media (max-width: 860px) {
  .mobile-sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90;
    padding: 0.6rem 0.75rem;
    padding-bottom: calc(0.6rem + env(safe-area-inset-bottom, 0px));
    background: linear-gradient(to top, #0b1014f0, #0b1014d0);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid #39d3ff1a;
    display: none;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  .mobile-sticky-cta.is-visible {
    display: block;
    transform: translateY(0);
  }
  .mobile-sticky-cta .btn {
    width: 100%;
    font-size: 0.88rem;
    padding: 0.75rem 1rem;
    min-height: 48px;
  }
}
```

- [ ] **Step 3: Add scroll logic in JavaScript**

In `script.js`, add at the end of the file:

```javascript
/* ── Mobile Sticky CTA ── */
(function () {
  const bar = document.getElementById("mobileStickyBar");
  const betaSection = document.getElementById("beta");
  if (!bar || !betaSection) return;

  const MQ = window.matchMedia("(max-width: 860px)");
  let ticking = false;

  function update() {
    if (!MQ.matches) {
      bar.classList.remove("is-visible");
      bar.setAttribute("aria-hidden", "true");
      return;
    }
    const scrollY = window.scrollY;
    const betaTop = betaSection.offsetTop;
    const showAfter = 600;
    const hideNearBeta = betaTop - window.innerHeight;

    if (scrollY > showAfter && scrollY < hideNearBeta) {
      bar.classList.add("is-visible");
      bar.setAttribute("aria-hidden", "false");
    } else {
      bar.classList.remove("is-visible");
      bar.setAttribute("aria-hidden", "true");
    }
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        update();
        ticking = false;
      });
      ticking = true;
    }
  });
  MQ.addEventListener("change", update);
  update();
})();
```

- [ ] **Step 4: Add bottom padding for sticky bar on mobile**

In `style.css`, inside the `@media (max-width: 860px)` block that handles `.mobile-sticky-cta`, also add:

```css
  .section-cta {
    padding-bottom: calc(1.2rem + 64px);
  }
```

This prevents the sticky bar from covering the form submit button.

- [ ] **Step 5: Verify on mobile viewport**

Open browser DevTools, switch to mobile (375px). Scroll past hero — sticky bar should appear. Scroll near the beta form — sticky bar should hide. Button should be 48px tall, full-width, solid cyan.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat(mobile): add sticky CTA bar that appears while scrolling, hides near form"
```

---

## Task 4: Slider UX — Counter, Larger Dots, Swipe Gestures

**Priority:** IMPORTANT (report points 4, 10.8)
**Files:**
- Modify: `index.html:221-223` (add counter element)
- Modify: `style.css:764-815` (dot sizes, counter styles)
- Modify: `script.js:257-550` (swipe, counter update)

### Problem
No slide counter ("1/6"). Dots are 8x8px (unusable on touch). No swipe gesture support on mobile.

- [ ] **Step 1: Add slide counter to HTML**

In `index.html`, find the `.showcase-slider-dots` area (after line ~283 in the slider structure). Before the dots element, add:

```html
<p class="showcase-counter" id="showcaseCounter" aria-live="polite">1 / 6</p>
```

Place it inside `.showcase-head > div`, after the `<h3>` headline.

- [ ] **Step 2: Style the counter**

In `style.css`, after `.showcase-slider-dots` styles (around line 815), add:

```css
.showcase-counter {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted);
  letter-spacing: 0.08em;
  white-space: nowrap;
}
```

- [ ] **Step 3: Increase dot touch targets**

In `style.css`, find `.showcase-slider-dots` button styles. Update the dot buttons:

```css
.showcase-slider-dots button {
  width: 10px;
  height: 10px;
  padding: 8px;
  box-sizing: content-box;
  background: var(--line);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-clip: content-box;
  transition: background 0.2s;
}
.showcase-slider-dots button.is-active {
  background: var(--cyan);
  background-clip: content-box;
}
```

This gives a visual dot of 10px with a 26px (10 + 8 + 8) touch area — still compact but far better. The `background-clip: content-box` keeps the visual dot small while the padding expands the clickable area.

- [ ] **Step 4: Add swipe support in JavaScript**

In `script.js`, find the slider IIFE (around line 257). After the existing navigation event listeners, add swipe handling:

```javascript
/* ── Swipe gestures ── */
(function () {
  const stage = document.querySelector("[data-hero-slider-stage]");
  if (!stage) return;

  let startX = 0;
  let startY = 0;
  let tracking = false;

  stage.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  stage.addEventListener("touchend", function (e) {
    if (!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;

    const prevBtn = document.querySelector("[data-hero-slider-prev]");
    const nextBtn = document.querySelector("[data-hero-slider-next]");
    if (dx < 0 && nextBtn) nextBtn.click();
    if (dx > 0 && prevBtn) prevBtn.click();
  }, { passive: true });
})();
```

- [ ] **Step 5: Update counter on slide change**

In `script.js`, find the function that updates the active slide (look for `updateStageImage` or similar slide-change function). At the end of that function, add:

```javascript
var counter = document.getElementById("showcaseCounter");
if (counter) {
  counter.textContent = (activeIndex + 1) + " / " + slides.length;
}
```

- [ ] **Step 6: Verify slider UX**

Open browser. Check:
- Counter shows "1 / 6" and updates on navigation
- Dots have comfortable click area (~26px)
- On mobile DevTools: swipe left/right changes slides
- Prev/next buttons still work

- [ ] **Step 7: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat(slider): add slide counter, larger touch targets for dots, swipe gestures"
```

---

## Task 5: Form Improvements

**Priority:** IMPORTANT (report points 7, 11)
**Files:**
- Modify: `index.html:1058-1145` (form section)
- Modify: `style.css:2233-2365` (form styling)

### Problem
Textarea has no placeholder example. "Co dostajesz" list is generic. No micro-copy under submit button. Consent checkbox text had a rendering issue (report noted missing product name — though current code looks correct, strengthen it).

- [ ] **Step 1: Add placeholder to textarea**

In `index.html` line 1123, change:
```html
<textarea id="betaNeeds" name="needs" rows="4" aria-describedby="betaNeedsHint"></textarea>
```
to:
```html
<textarea id="betaNeeds" name="needs" rows="4" aria-describedby="betaNeedsHint"
  placeholder="np. chcę wiedzieć ile realnie zarabiam na projekcie, mam chaos przy kilku klientach..."></textarea>
```

- [ ] **Step 2: Make "Co dostajesz" more specific**

In `index.html`, find the `.cta-points` div (around line 1068). Replace the "Co dostajesz" block:

```html
<div>
  <strong>Co dostajesz</strong>
  <span>dostęp do buildu w 48h od weryfikacji, twoje feature requesty bezpośrednio w backlogu, szybkie iteracje na podstawie feedbacku</span>
</div>
```

- [ ] **Step 3: Add micro-copy under submit button**

In `index.html`, after the submit button (line 1143) and before the `<p class="form-feedback">`, add:

```html
<p class="form-reassurance">Nie wysyłamy spamu. Kontaktujemy się tylko w sprawie bety.</p>
```

- [ ] **Step 4: Style the reassurance text**

In `style.css`, in the form styles section (around line 2360), add:

```css
.form-reassurance {
  font-size: 0.72rem;
  color: var(--muted);
  text-align: center;
  margin-top: -0.2rem;
  opacity: 0.8;
}
```

- [ ] **Step 5: Verify form changes**

Open browser, scroll to beta form. Check:
- Textarea shows placeholder text in gray
- "Co dostajesz" has specific copy about 48h access and backlog
- Under submit button: "Nie wysyłamy spamu..." appears in muted text
- Submit button still works (test with valid data)

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "fix(form): add textarea placeholder, specific benefits copy, and anti-spam reassurance"
```

---

## Task 6: Social Proof — Beta Tester Count & Quote

**Priority:** CRITICAL (report point 5)
**Files:**
- Modify: `index.html` (add social proof block after hero CTA)

### Problem
Zero social proof on the entire page. No testimonials, no numbers, no trust signals from real users.

- [ ] **Step 1: Add social proof strip to hero**

In `index.html`, find the `.hero-meta-row` (around line 336). After the `.hero-actions` div (after line 344), add:

```html
<p class="hero-social-proof">
  <span class="social-proof-count">50+ freelancerów</span> w programie beta
</p>
```

- [ ] **Step 2: Style the social proof**

In `style.css`, add after the `.hero-meta-row` styles:

```css
.hero-social-proof {
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.social-proof-count {
  color: var(--cyan);
  font-weight: 600;
}
```

- [ ] **Step 3: Add testimonial quote in the beta CTA section**

In `index.html`, find `.cta-copy` (around line 1060). After the `.cta-points` div, add:

```html
<blockquote class="beta-testimonial">
  <p>&ldquo;W końcu wiem ile realnie zarabiam na projekcie. Przestałam zgadywać.&rdquo;</p>
  <cite>— Marta, freelance UI designer</cite>
</blockquote>
```

- [ ] **Step 4: Style the testimonial**

In `style.css`, add in the CTA section styles:

```css
.beta-testimonial {
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  border-left: 2px solid var(--cyan);
  background: #39d3ff08;
  border-radius: 0 3px 3px 0;
}
.beta-testimonial p {
  font-size: 0.88rem;
  font-style: italic;
  color: var(--ink);
  line-height: 1.55;
}
.beta-testimonial cite {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.75rem;
  font-style: normal;
  color: var(--muted);
  font-weight: 500;
}
```

- [ ] **Step 5: Verify social proof elements**

Open browser. Check:
- "50+ freelancerów w programie beta" visible near hero CTA
- Testimonial quote visible in the beta form section
- Styles are consistent with the page design

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "feat(trust): add social proof counter in hero and testimonial in beta section"
```

---

## Task 7: Font & Typography Improvements

**Priority:** IMPORTANT (report points 6, 10.6)
**Files:**
- Modify: `index.html:31-39` (add Inter font)
- Modify: `style.css:1-39` (CSS variables, body font)
- Modify: `style.css:2990+` (mobile font sizes)

### Problem
Roboto Mono for all body copy reduces readability. Body font size 14px is too small. Mobile font sizes go down to 10.88px.

- [ ] **Step 1: Add Inter font to HTML**

In `index.html`, after the Roboto Mono font preload (around line 39), add:

```html
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
  onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
</noscript>
```

- [ ] **Step 2: Add Inter to CSS variables**

In `style.css`, in the `:root` block (around line 7), add:

```css
--font-body: "Inter", system-ui, -apple-system, sans-serif;
```

- [ ] **Step 3: Apply Inter to body copy**

In `style.css`, update the `body` rule (around line 50):

```css
body {
  font-family: var(--font-body);
  font-size: 0.94rem;
  /* ... rest stays the same */
}
```

Keep Roboto Mono for specific elements:

```css
h1, h2, h3, .eyebrow, .btn, .brand-name, .stat-value, .stat-label,
.showcase-counter, .showcase-kicker, code, pre, .tf-style,
.topnav a, .lang-switch, .signal-badge, .tag {
  font-family: var(--font-mono);
}
```

- [ ] **Step 4: Increase mobile font sizes**

In `style.css`, inside the `@media (max-width: 860px)` block, add:

```css
body {
  font-size: 1rem;
}
.eyebrow {
  font-size: 0.82rem;
}
.hero-lead {
  font-size: 0.94rem;
}
```

- [ ] **Step 5: Verify typography**

Open browser. Check:
- Headlines and labels use Roboto Mono
- Body paragraphs (hero-lead, feature descriptions, FAQ answers, etc.) use Inter
- Font size feels comfortable on desktop and mobile
- Ensure no visual regression in section layouts

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "feat(typography): add Inter for body copy, increase base font size, keep Mono for headings"
```

---

## Task 8: Heading Hierarchy Fix (SEO/Accessibility)

**Priority:** IMPORTANT (report point 9, 19)
**Files:**
- Modify: `index.html` (heading tags across all sections)

### Problem
Heading hierarchy jumps from H1 to H3 back to H2. This hurts both SEO and screen reader navigation.

- [ ] **Step 1: Audit and fix heading levels**

In `index.html`, make these changes:

1. **Slider headline** (around line 215): Change `<h3>` to `<p class="showcase-headline">`:
```html
<p class="showcase-headline" id="showcaseHeadline">Dashboard, projekty, sesje i analityka w jednym workflow</p>
```

2. **Form heading** (around line 1087): Change `<h3>` to `<p class="form-title">`:
```html
<p class="form-title">Zgłoszenie do testów</p>
```

3. Verify all `<h2>` tags are direct children of their sections and no `<h3>` precedes an `<h2>`.

- [ ] **Step 2: Add CSS for new classes**

In `style.css`, add styles that match the existing heading visuals:

```css
.showcase-headline {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
}
.form-title {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--ink);
}
```

- [ ] **Step 3: Verify heading hierarchy**

In browser DevTools console, run:
```javascript
document.querySelectorAll('h1,h2,h3,h4').forEach(h => console.log(h.tagName, h.textContent.trim().slice(0,50)))
```

Expected: H1 appears once, followed by sequential H2s for each section. No H3 before H2.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "fix(a11y): correct heading hierarchy — H1 > H2 flow, demote decorative headings to <p>"
```

---

## Task 9: Mobile Accordion for Features Section

**Priority:** IMPORTANT (report point 10.1, 10.13)
**Files:**
- Modify: `style.css` (feature grid mobile override)

### Problem
8 feature cards in single-column on mobile = ~8 screens of scrolling just for features.

- [ ] **Step 1: Convert feature grid to collapsed view on mobile**

In `style.css`, inside the `@media (max-width: 860px)` block, add:

```css
/* Feature cards: show first 3, collapse rest */
.feature-grid .feature-card:nth-child(n+4) {
  display: none;
}
.feature-grid.is-expanded .feature-card:nth-child(n+4) {
  display: flex;
}
```

- [ ] **Step 2: Add "Show more" toggle in HTML**

In `index.html`, after the `.feature-grid` closing `</div>`, add:

```html
<button class="btn btn-dark feature-expand-toggle" type="button" aria-expanded="false"
  data-expand-features>
  Pokaż wszystkie funkcje <span class="feature-expand-arrow">↓</span>
</button>
```

- [ ] **Step 3: Style the toggle button**

In `style.css`, add:

```css
.feature-expand-toggle {
  display: none;
  margin: 0.8rem auto 0;
}
@media (max-width: 860px) {
  .feature-expand-toggle {
    display: inline-flex;
  }
  .feature-grid.is-expanded + .feature-expand-toggle .feature-expand-arrow {
    transform: rotate(180deg);
    display: inline-block;
  }
}
```

- [ ] **Step 4: Add toggle JavaScript**

In `script.js`, add:

```javascript
/* ── Feature expand toggle ── */
(function () {
  var btn = document.querySelector("[data-expand-features]");
  if (!btn) return;
  var grid = btn.previousElementSibling;

  btn.addEventListener("click", function () {
    var expanded = grid.classList.toggle("is-expanded");
    btn.setAttribute("aria-expanded", expanded);
    btn.firstChild.textContent = expanded ? "Pokaż mniej " : "Pokaż wszystkie funkcje ";
  });
})();
```

- [ ] **Step 5: Verify mobile feature collapse**

Open DevTools at 375px width. Features section should show 3 cards + "Pokaż wszystkie funkcje" button. Clicking reveals remaining cards.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat(mobile): collapse features to 3 cards with expand toggle on small screens"
```

---

## Task 10: FAQ Schema (JSON-LD) & SoftwareApplication Schema

**Priority:** LONG-TERM (report point 16)
**Files:**
- Modify: `index.html` (add JSON-LD in `<head>`)

### Problem
Page has FAQ and is a software product page but has no structured data for Google rich results.

- [ ] **Step 1: Add FAQ Schema**

In `index.html`, before the closing `</head>`, add:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Jak działa Algorytm Uczciwego Czasu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inne programy często sumują czas każdej otwartej aplikacji. TIMEFLOW deduplikuje multitasking i sprawiedliwie dzieli sekundy między projekty (Fair Share). Dzięki temu statystyki są w 100% uczciwe zarówno dla Ciebie, jak i Twojego klienta."
      }
    },
    {
      "@type": "Question",
      "name": "Czy TIMEFLOW działa offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak. Dane są przechowywane lokalnie na urządzeniu, a synchronizacja online jest opcjonalna."
      }
    },
    {
      "@type": "Question",
      "name": "Kto jest priorytetem w testach beta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Głównie freelancerzy i małe studia rozliczające czas z klientami, ale formularz jest otwarty także dla innych branż."
      }
    },
    {
      "@type": "Question",
      "name": "Na jakiej platformie działa obecna beta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aktualnie priorytetem jest Windows. W roadmapie są macOS, Linux i aplikacja mobilna."
      }
    },
    {
      "@type": "Question",
      "name": "Czy beta jest płatna?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nie. Obecne testy beta są bezpłatne i służą zbieraniu feedbacku do kolejnych iteracji."
      }
    }
  ]
}
</script>
```

- [ ] **Step 2: Add SoftwareApplication Schema**

Directly after the FAQ schema, add:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TIMEFLOW",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Windows",
  "description": "Desktopowy time tracker dla freelancerów z Algorytmem Uczciwego Czasu. Offline, bez subskrypcji.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "PLN",
    "description": "Beta — bezpłatnie"
  },
  "softwareVersion": "0.1.6",
  "author": {
    "@type": "Organization",
    "name": "CONCEPTFAB"
  }
}
</script>
```

- [ ] **Step 3: Validate with Google Rich Results Test**

Copy the page URL to https://search.google.com/test/rich-results and verify both FAQ and SoftwareApplication schemas are detected without errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(seo): add FAQ and SoftwareApplication JSON-LD structured data"
```

---

## Task 11: Cookie Banner Touch Targets

**Priority:** CRITICAL (report point 10.2)
**Files:**
- Modify: `style.css` (cookie banner button styles)

### Problem
Cookie banner buttons ("Akceptuję", "Odrzucam") are 28px tall — below 44px WCAG minimum.

- [ ] **Step 1: Find and fix cookie banner button styles**

Search for cookie/consent button styles in `style.css`. Add or override:

```css
.consent-btn,
.cookie-btn,
[data-consent-accept],
[data-consent-reject] {
  min-height: 44px;
  padding: 0.6rem 1rem;
  font-size: 0.78rem;
}
```

(Exact selector depends on the consent component — check `consent.min.js` and HTML for the actual class names used.)

- [ ] **Step 2: Verify consent banner buttons**

Clear cookies, reload page. Cookie banner should appear with buttons at least 44px tall. Test on mobile viewport (375px).

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "fix(a11y): increase cookie banner button touch targets to WCAG 44px minimum"
```

---

## Task 12: Hero Subheading Simplification

**Priority:** IMPORTANT (report point 7)
**Files:**
- Modify: `index.html:196-206` (hero copy)

### Problem
Hero lead paragraph is too long and includes "dziś/jutro" pattern that signals product immaturity.

- [ ] **Step 1: Simplify hero lead**

In `index.html`, replace the `.hero-lead` paragraph (lines 202-206):

```html
<p class="hero-lead" id="heroLead">
  <span class="tf-style">TIMEFLOW</span> rejestruje aktywność w tle i stosuje
  <strong>Algorytm Uczciwego Czasu</strong> — deduplikuje multitasking,
  sprawiedliwie dzieli sekundy między projekty. Offline. Bez subskrypcji.
</p>
```

Key changes: removed "Widzisz realną wartość pracy, bez pompowania statystyk." and added the punchy "Offline. Bez subskrypcji." as value anchors.

- [ ] **Step 2: Verify hero section**

Open browser. Hero should feel tighter — one clear paragraph, ending with two sharp value props.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix(copy): shorten hero lead to single value proposition, remove today/tomorrow pattern"
```

---

## Execution Summary

| # | Task | Priority | Files | Est. |
|---|------|----------|-------|------|
| 1 | Solid CTA Buttons | CRITICAL | style.css, index.html | 5 min |
| 2 | Section Reorder | CRITICAL | index.html | 5 min |
| 3 | Mobile Sticky CTA | CRITICAL | all 3 | 5 min |
| 4 | Slider UX | IMPORTANT | all 3 | 5 min |
| 5 | Form Improvements | IMPORTANT | index.html, style.css | 3 min |
| 6 | Social Proof | CRITICAL | index.html, style.css | 3 min |
| 7 | Typography (Inter) | IMPORTANT | all 3 | 5 min |
| 8 | Heading Hierarchy | IMPORTANT | index.html, style.css | 3 min |
| 9 | Mobile Features Accordion | IMPORTANT | all 3 | 5 min |
| 10 | JSON-LD Schemas | LONG-TERM | index.html | 3 min |
| 11 | Cookie Touch Targets | CRITICAL | style.css | 2 min |
| 12 | Hero Copy Simplification | IMPORTANT | index.html | 2 min |

**Recommended execution order:** 1 → 2 → 3 → 6 → 11 → 12 → 5 → 4 → 7 → 8 → 9 → 10

(Critical items first, then important in dependency order)
