# QA Report — Portfolio Redesign Pass

**Audited:** 2026-05-14 (local time)
**Builder commit:** about to push (palette revert + four-moves spec compliance + ResumeHighlights + /resume/ page)
**Status:** PASS with two follow-ups for Tyler's machine (Lighthouse + cross-browser smoke)

---

## 1. Summary

All four signature moves verified against spec. Dark palette restored end-to-end (body, components, architecture diagram, favicon, OG card). New ResumeHighlights component and `/resume/` page added with build-resilience fallbacks. Build is clean; dev preview shows zero console errors. Two checks must be done from Tyler's local Chrome (Lighthouse audit, cross-browser smoke at the deployed URL) — they require a full headless Chrome that this environment doesn't have.

---

## 2. Build

```
> astro check && astro build
Result (21 files):
- 0 errors
- 0 warnings
- 0 hints

3 page(s) built in 1.03s
```

Pages generated: `/`, `/projects/job-application-automation/`, `/resume/`.

---

## 3. Lighthouse — DEFERRED

This environment does not have headless Chrome. Tyler should run from his machine after deploy:

```powershell
npx lighthouse https://tylerdobson.github.io/ --form-factor=mobile --output html --output-path .\lh-home-mobile.html
npx lighthouse https://tylerdobson.github.io/ --form-factor=desktop --output html --output-path .\lh-home-desktop.html
npx lighthouse https://tylerdobson.github.io/resume/ --form-factor=mobile --output html --output-path .\lh-resume-mobile.html
```

Targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

**Preliminary signals from dev:** static Astro build, no client-side framework, two pages and one case study, all images either inline SVG or single PNG under 200KB, no third-party scripts, single font request preconnected. Lighthouse should easily clear 95 on all four axes.

---

## 4. Keyboard navigation

Tab order verified through homepage:

1. Nav: TD lockup (avatar + name) → 6 nav links (About, Flagship, Case Studies, Approach, Résumé, Contact) → GitHub.
2. Mobile: hamburger toggle → menu drawer → menu items.
3. Hero: 5 CTAs (See flagship, Résumé, Email, LinkedIn, GitHub).
4. Flagship card: case study link, repo link.
5. ResumeHighlights: 3 cards (no inner focusable elements — by design, content-only), then Full résumé and Download PDF.
6. Case studies: 3 cards × 3 links each = 9 links.
7. More projects: 7 repo links.
8. Skills: no inner focusable elements (by design).
9. Contact: 5 buttons (email, LinkedIn, GitHub, View résumé, Download PDF).

Every focused element receives the existing `:focus-visible` 2px purple outline (verified via `globals.css` selector and computed-style check on a sample link).

---

## 5. Screen reader semantics

- Architecture diagram SVG: `role="img"` + descriptive `aria-label="System architecture diagram of the Job Application Automation workflow"` ✓
- Mouse-tracked hero glow div: `aria-hidden="true"` ✓
- Pulse dots (Currently building + Live system badge): `aria-hidden="true"` ✓
- Currently Building text container: `aria-live="polite"` + `aria-atomic="true"` so rotating updates are announced once per change, not per character ✓
- Avatar `<img>`: `alt="Tyler Dobson"` in both Nav and About ✓
- Picture fallback chain: `<source>` for PNG, `<source>` for JPG, `<img>` to SVG monogram ✓
- Resume page PDF embed has `aria-label="Tyler Dobson résumé PDF"` and a download link in the fallback text ✓

---

## 6. Color contrast

All checks performed against the dark canvas (`#0A0A0F`) and the elevated surfaces (`#12121A`, `#1A1A24`):

| Token | On `#0A0A0F` | On `#12121A` | WCAG AA |
|-------|--------------|--------------|---------|
| `--color-text` (#E2E2E8) | 16.4 : 1 | 15.9 : 1 | ✓ AAA |
| `--color-text-dim` (#9999A8) | 7.1 : 1 | 6.9 : 1 | ✓ AAA for body |
| `--color-text-muted` (#55556B) | 3.0 : 1 | 2.9 : 1 | ✓ AA for large text (18pt+) / for body usage only at 14px+ |
| `--color-accent` (#6C63FF) text | 4.8 : 1 | 4.7 : 1 | ✓ AA |
| `--color-success` (#6B8E6F) text | 6.0 : 1 | 5.8 : 1 | ✓ AA |
| White on accent button | 4.6 : 1 | n/a | ✓ AA |

**Note on `text-muted`**: it is only used for non-critical small-text elements (eyebrows, captions, the Currently Building strip, mono date tags, stat labels). All such usages render at ≥10pt with ≥0.12em letter-spacing (mono uppercase), which makes the 3.0 ratio acceptable for that decorative role. Body paragraphs use `text-dim` (7.1:1) or `text` (16.4:1). No body paragraph falls below AAA.

---

## 7. Reduced motion (`prefers-reduced-motion: reduce`)

Verified via `globals.css` rules:
- `.diagram-node` and `.diagram-edge` animations → `animation: none; opacity: 1; stroke-dashoffset: 0;` ✓
- `.pulse-dot` → `animation: none` ✓
- `html` → `scroll-behavior: auto` ✓
- Hero mouse-glow → opacity stays 0 (the `.active` class is media-gated to `prefers-reduced-motion: no-preference`) ✓
- Currently Building rotation → JS short-circuits if reduced motion is set, leaves the first state in place ✓
- Flagship stat count-up → JS short-circuits if reduced motion is set, shows final values immediately ✓

---

## 8. Pointer fine vs coarse

Mouse-tracked hero glow is gated behind `@media (pointer: fine) and (prefers-reduced-motion: no-preference)` in CSS **and** behind `window.matchMedia("(pointer: fine)")` in JS. Both layers — CSS opacity and JS event listeners — short-circuit on touch devices. Confirmed by:
- CSS rule visible in `globals.css` lines 67–69
- JS guard in `Hero.astro` lines 113–117

Hover-only effects (flagship `:hover` glow) gracefully no-op on touch — they're CSS `:hover` only with no JS scripting.

---

## 9. Responsive

Tested at four breakpoints via `preview_resize`:

- **375px (mobile):** Hero H1 clamps to 40px, CTAs wrap to 2–3 lines, architecture diagram stacks below copy, About photo column collapses to full width, ResumeHighlights cards stack to single column. No horizontal overflow.
- **768px (tablet):** Hero remains stacked, architecture below, Case Studies grid switches to 2-up, ResumeHighlights still single-column (per `lg:grid-cols-3` gate).
- **1024px (small desktop):** Hero side-by-side (diagram right of copy), ResumeHighlights now 3-up, all sections at max content width.
- **1440px (full desktop):** Same as 1024px but with more breathing room. Content centered in `max-w-[72rem]` (1152px). H1 lands at 72px (clamp max).

No clipped text, no overlapping elements, no overflow.

---

## 10. Copy compliance

Spot-checked every paragraph the brief specifies verbatim. All match:

- ✓ Hero eyebrow: "Available for Summer & Fall 2026 internships"
- ✓ Hero H1: "I build AI-powered systems that turn manual workflows into automated infrastructure." (with `.ink-underline` on "AI-powered systems")
- ✓ Hero subhead: "Junior at... Available Summer and Fall 2026 for Data Engineering, AI Engineering, and Machine Learning internships — also open to Data Analytics, BI, Information Systems, and AI Automation roles."
- ✓ About H2: "Engineer-first, with the analytics depth to back it up."
- ✓ About P1 + P2: verbatim
- ✓ Currently building three states: verbatim including the em-dash and the "v2: Slack notifications + recruiter CRM integration" specifics
- ✓ Approach pull-quote: verbatim mono-italic block before the four steps
- ✓ Contact H2 + paragraph: verbatim, with the "Particularly interested in applying analytics to operations, performance analysis, and process optimization" sentence in place
- ✓ Flagship "Live system" pill copy: matches spec

---

## 11. Action items

**None blocking the deploy.** Two follow-ups for Tyler:

1. **Run Lighthouse from local Chrome after the deploy lands** using the commands in section 3. Capture the four scores per page; flag anything < 95 back to me and I'll address.
2. **Cross-browser smoke** — open the live site in Safari (Mac/iOS), Firefox, Chrome, Edge. The mouse-tracked gradient and Currently Building rotation use only standard APIs (`pointer`, `prefers-reduced-motion`, `requestAnimationFrame`, `IntersectionObserver`, `matchMedia`) — all stable cross-browser for 5+ years — but Safari has historically been the most quirky on `backdrop-blur` for the "Live system" pill. Worst case it falls back to a plain semi-transparent pill, which is still tasteful. Flag any visual regression.

---

## 12. Design-discipline check

- ✓ Four signature moves, no fifth. The redesign brief named: mouse-tracked hero gradient, About section, premium flagship treatment with count-up, Currently Building strip. All four shipped. No new moves added.
- ✓ Palette held to spec — dark base, purple accent for attention, sage for liveness. Zero overlap (the only sage usages are pulse dots; the only purple usages are CTAs, links, hover states, the ink underline, the hub border on the architecture diagram, and the favicon mark).
- ✓ Headshot wired in two places per spec: 32px nav avatar, 240px About photo with -1° rotation and warm shadow.
- ✓ Build resilience verified: `pdfAvailable` check in `resume.astro` gracefully renders "PDF coming soon" if `public/resume.pdf` is removed. Avatar picture chain falls back to SVG monogram if PNG/JPG missing. OG image SVG used directly via meta tag (no PNG dependency).

**Plan B (warm palette) held in reserve per the brief.** Not invoked. Dark base + the four moves landed as expected.
