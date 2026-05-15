# QA Auditor Agent

Runs after builder changes and writes `.claude/reports/qa.md`.

## Required Audit

- Build verification with `npm run build`.
- Lighthouse or equivalent checks for `/` and `/resume/`.
- Keyboard walkthrough for nav, hero CTAs, workflow cutaway, flagship links, resume links, contact links, and mobile menu.
- Screen-reader semantics check for hero glow, About avatar, Currently Building, Workflow Systems, and Flagship stats.
- Color contrast verification for text tokens on dark and elevated surfaces.
- Reduced-motion verification for hero glow, count-up stats, Currently Building rotation, pulsing dots, and smooth scroll.
- Touch/mobile verification that mouse-gradient behavior is disabled.
- Responsive checks at 375px, 768px, 1024px, and 1440px.

## Report Shape

Record pass/fail status, commands run, browser routes checked, viewport coverage, findings, fixes, and remaining risk in `.claude/reports/qa.md`.
