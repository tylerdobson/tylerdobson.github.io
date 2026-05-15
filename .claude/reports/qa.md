# QA Report - Portfolio Redesign Completion

Audited: 2026-05-15 local time
Status: PASS
Target: `tylerdobson/tylerdobson.github.io` Astro repo on `main`

## Build

Command: `npm.cmd run build`

Result:

```text
astro check
Result (25 files):
- 0 errors
- 0 warnings
- 0 hints

astro build
3 page(s) built: /, /resume/, /projects/job-application-automation/
```

`npm ci` also completed successfully. It reported 6 moderate npm audit findings in the dependency tree; these were not introduced or changed by this redesign pass.

## Lighthouse

Local target: `http://127.0.0.1:4322/` via Astro preview.

| Page | Mode | Performance | Accessibility | Best Practices | SEO | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `/` | Mobile | 97 | 96 | 100 | 100 | 0 |
| `/` | Desktop | 100 | 96 | 100 | 100 | 0.000332 |
| `/resume/` | Mobile | 97 | 100 | 100 | 100 | 0 |
| `/resume/` | Desktop | 100 | 100 | 100 | 100 | 0.004159 |

Note: some Lighthouse runs on Windows exited after report generation with a temp-directory cleanup `EPERM`; the JSON reports were still written and parsed. Final desktop resume run exited cleanly.

## Browser And Responsive

Browser-first DOM checks passed on `/` and `/resume/` at 375, 768, 1024, and 1440 px:

- Homepage includes the new `04 / Workflow systems` cutaway and recruiter-safe tools, including Claude Code and SEC EDGAR.
- Resume page includes the download CTA, native HTML resume content, and desktop PDF object preview.
- Mobile nav opens and sets `aria-expanded="true"`.
- Console logs were clean.

The Browser screenshot API timed out in this environment, so screenshots were captured with Playwright after the Browser checks. Screenshots confirmed no hero clipping after the mobile H1 and Currently Building adjustments, and no workflow overflow at desktop or mobile widths.

## Accessibility

- Nav includes avatar image alt text and a restored `TD - Tyler Dobson` lockup.
- Hero glow is `aria-hidden="true"`.
- Currently Building uses `aria-live="polite"` and `aria-atomic="true"`.
- Pulsing dots are `aria-hidden="true"`.
- Resume PDF object has a descriptive title and fallback text.
- Keyboard order covers nav, mobile menu, hero CTAs, flagship links, workflow-free content, resume links, case study links, project links, and contact links.
- Focus visibility continues to use the global `:focus-visible` outline.

## Motion And Pointer Checks

- Hero gradient is gated by `(pointer: fine)` and `prefers-reduced-motion: no-preference` in CSS and JS.
- Currently Building rotation stops for reduced motion and when off-screen.
- Flagship stat count-up shows final values immediately for reduced motion.
- Pulse animation is disabled under reduced motion.
- Smooth scroll is disabled under reduced motion.
- Touch devices do not activate the mouse-gradient behavior.

## Color Contrast

- `--color-text-muted` was raised from `#55556B` to `#808096` to pass AA on dark elevated surfaces.
- Inline architecture SVG muted fills were updated to match the new readable muted value.
- Accent buttons now use dark text on purple, avoiding the borderline white-on-purple contrast issue.
- Dark palette remained the source of truth; Plan B warm palette was not invoked.

## Missing Asset Resilience

Scratch build test passed with optional assets removed:

- No `public/avatar.jpg`
- No `public/avatar.png`
- No `public/resume.pdf`

The avatar resolver fell back to `public/avatar.svg`, and `/resume/` rendered the PDF placeholder without build failure.

## Scope Check

- Added data-driven `WorkflowCutaway.astro` and `src/content/workflow.ts`.
- Kept workflow cutaway restrained: grouped application rows, no new animation, no additional decorative design move.
- Extracted hero glow into `HeroGradient.astro`.
- Preserved existing `CurrentlyBuilding.astro`, `ResumeHighlights.astro`, and `FlagshipCard.astro` boundaries.
- Added `Avatar.astro` for shared avatar fallback logic.
- Added two-agent docs in `.claude/agents/builder.md` and `.claude/agents/qa-auditor.md`.

## Live Deployment

Commit `fac4700` was pushed to `main`; GitHub Actions run `25900564079` completed successfully.

Live checks passed with a cache-busted request:

- `https://tylerdobson.github.io/?v=fac4700` returned 200 and included `Workflow systems`, `Claude Code`, and `SEC EDGAR`.
- `https://tylerdobson.github.io/resume/?v=fac4700` returned 200 and included the PDF object preview plus native resume content.
