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

## Deployment to GitHub Pages

This repo serves the live site at `https://tylerdobson.github.io/` (user-pages).

The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds on push to `main` and deploys via `actions/deploy-pages@v4`. Make sure **Settings → Pages → Source** is set to **GitHub Actions** (not branch).

## First-time push (replacing the existing site)

If this is replacing existing content in the GitHub repo:

```powershell
# In the existing local clone of tylerdobson.github.io (back up first if you want)
git checkout main
git rm -rf .
# Copy every file from this folder into the cloned repo root
# Then:
git add .
git commit -m "Rebuild portfolio: Astro + Tailwind v4 + AI Engineer positioning"
git push origin main
```

Old commits remain in history regardless — the new build is just the latest commit.

## What still needs Tyler

- `public/resume.pdf` — replace the placeholder with the real résumé
- `public/assets/projects/retail-kpi/hero.png` — drop in
- `public/assets/projects/spotify-analytics/hero.png` — drop in
- `public/og-image.png` — convert `og-image.svg` to PNG (1200×630) for LinkedIn / X cards. Any SVG-to-PNG tool works; CloudConvert or `npx svg-to-img` both fine.
