# Frontend Public Output QA

Date: 2026-05-15

## Scope

- Repository: `tylerdobson/tylerdobson.github.io`
- Branch reviewed: `frontend-public-hotfix`
- Claude commit reviewed: `82ed914`
- Codex QA patch: replaced public interview-readiness language with reviewer-readability language in `src/content/projects.ts`

## Commands Run

- `git fetch origin frontend-public-hotfix main`
- `git status -sb`
- `git diff --stat origin/main...HEAD`
- `npm install`
- `npm run build`
- `npm run check --if-present`
- `npm run lint --if-present`
- `npm audit --audit-level=high`
- `npm audit --omit=dev --audit-level=moderate`
- `rg` public-output scans across `src`, `public`, and `dist`
- Local asset existence check across generated HTML references
- Browser DOM/console checks at `375x900`, `768x1000`, `1024x900`, and `1440x900`

## Results

- Build: PASS. `astro check && astro build` completed with 0 errors, 0 warnings, 0 hints, and 3 generated pages.
- `npm run check`: NOT PRESENT as a package script; `npm run build` includes `astro check`.
- `npm run lint`: NOT PRESENT as a package script.
- Public-output scan: PASS after Codex wording patch.
- Broken local image/asset paths: PASS. Generated HTML references resolve locally.
- Browser DOM/console checks: PASS. Homepage rendered expected hero, Toolchain, workflow-map, and Contact content at all checked breakpoints with 0 console errors.
- Tiered skills labels: PASS. No legacy numbered-tier skills framing found.
- Private path/vault scan: PASS. No user-home paths, vault directory markers, raw source field names, resume-bank names, interview-bank names, or skill-gap-map names found in public output.
- Unsupported claim scan: PASS after patch. No unsupported labor-market ranking language or resume/interview readiness language found.

## Security Notes

- `npm audit --audit-level=high`: PASS for high/critical gating.
- `npm audit --omit=dev --audit-level=moderate`: FAILS on pre-existing moderate advisories in Astro and YAML language-server transitive dependencies.
- The moderate audit findings are not introduced by this hotfix. The generated site is static GitHub Pages output, and no `define:vars`, `set:html`, server islands, or server-side Astro runtime usage was found in the edited frontend source.
- Remediation would require a separate dependency-upgrade branch because `npm audit fix --force` proposes a breaking Astro upgrade.

## Visual / Content Risks

- Non-blocking: three project image entries remain intentionally non-rendered until replacement assets exist: SEC Pipeline, Airbnb Market Intelligence, and Job Market Skill Radar.
- Non-blocking: the flagship repository link still needs a metadata decision because the public repo target is not verified in this hotfix.
- Non-blocking: Browser screenshot capture at the widest viewport produced an automation artifact, so visual pass/fail is based on DOM, console, build, asset checks, and the narrower browser renders.

## Deployment Verdict

Safe to merge and deploy this hotfix to GitHub Pages.

Blocking issues: none after the Codex wording patch.
