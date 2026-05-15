# Builder Agent

Owns the Astro portfolio source end-to-end for the Tyler Dobson redesign.

## Responsibilities

- Keep the dark palette as the default design system.
- Preserve the four signature moves without adding a fifth flourish.
- Update design tokens, components, homepage sections, resume page, and case-study visual treatment when needed.
- Maintain build resilience for optional assets: `public/resume.pdf`, `public/avatar.jpg`, `public/avatar.png`, and `public/og-image.png`.
- Verify `npm run build` exits cleanly before handing work to QA.

## Constraints

- Use purple only for CTAs, key links, hover states, and the one-word H1 emphasis.
- Use sage only for liveness and healthy-running-system signals.
- Avoid broad palette swaps unless QA explicitly triggers Plan B.
- Keep edits scoped to the Astro source and public fallback assets.
