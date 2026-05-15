# tylerdobson.github.io

Personal portfolio for Tyler Dobson — built with Astro 5, TypeScript, and Tailwind CSS v4.

## Stack

- Astro 5 (static, content-first)
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first theme tokens via `@theme`)
- Inline SVG architecture diagram (no chart libraries)
- Inter (body) and IBM Plex Mono (eyebrows, code) via Google Fonts
- Deployed via GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # produces dist/
npm run preview    # serves the built site locally
```

## Project structure

```
.
├── .github/workflows/deploy.yml        # GitHub Pages CI
├── astro.config.mjs
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── resume.pdf                      # placeholder — replace with real résumé
│   └── assets/
│       ├── projects/                   # case-study imagery
│       └── architecture/               # diagram source files
├── src/
│   ├── components/                     # Astro components (Nav, Hero, ArchitectureDiagram, etc.)
│   ├── content/projects.ts             # typed project metadata
│   ├── layouts/                        # BaseLayout, CaseStudyLayout
│   ├── pages/
│   │   ├── index.astro                 # single-page main site
│   │   └── projects/
│   │       └── job-application-automation.astro
│   └── styles/globals.css              # Tailwind v4 entrypoint + design tokens
└── tsconfig.json
```

