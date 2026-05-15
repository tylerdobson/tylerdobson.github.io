// Build the 1200x630 LinkedIn / Twitter / Open Graph card with the real headshot
// composited in. Output: public/og-image.png
//
// Why a script and not the SVG: LinkedIn does not render SVG og:image. Raster only.
// Composing a JPG/PNG headshot into a vector backdrop preserves crisp type
// while keeping the photo at its native fidelity.
//
// Run: npm run og   (also runs as part of the build via the prebuild hook below)

import sharp from "sharp";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const avatarPath = join(projectRoot, "public", "avatar.png");
const outPath = join(projectRoot, "public", "og-image.png");

const W = 1200;
const H = 630;
const PHOTO = 320;
const PHOTO_X = 80;
const PHOTO_Y = (H - PHOTO) / 2;
const TEXT_X = PHOTO_X + PHOTO + 60;

const backdrop = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A0F"/>
      <stop offset="100%" stop-color="#12121A"/>
    </linearGradient>
    <radialGradient id="wash" cx="20%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#6C63FF" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#6C63FF" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#wash)"/>

  <!-- Hairline grid -->
  <g stroke="#1E1E2E" stroke-width="1" fill="none">
    <line x1="${PHOTO_X}" y1="0" x2="${PHOTO_X}" y2="${H}"/>
    <line x1="${W - 80}" y1="0" x2="${W - 80}" y2="${H}"/>
    <line x1="0" y1="80" x2="${W}" y2="80"/>
    <line x1="0" y1="${H - 80}" x2="${W}" y2="${H - 80}"/>
  </g>

  <!-- TD lockup at top -->
  <g>
    <rect x="${TEXT_X}" y="100" width="56" height="56" rx="10" fill="#0A0A0F" stroke="#6C63FF" stroke-width="1.5"/>
    <text x="${TEXT_X + 28}" y="138" text-anchor="middle"
      font-family="'IBM Plex Mono', 'Inter', monospace"
      font-size="20" font-weight="500" fill="#6C63FF">TD</text>
    <text x="${TEXT_X + 76}" y="120"
      font-family="'IBM Plex Mono', 'Inter', monospace"
      font-size="13" fill="#6C63FF" letter-spacing="2.4">TYLER DOBSON</text>
    <text x="${TEXT_X + 76}" y="142"
      font-family="'IBM Plex Mono', 'Inter', monospace"
      font-size="11" fill="#9999A8" letter-spacing="1.6">DATA · AI · ML ENGINEER</text>
  </g>

  <!-- Headline -->
  <text x="${TEXT_X}" y="240"
    font-family="'Inter', 'Helvetica Neue', sans-serif" font-size="50" font-weight="300"
    fill="#E2E2E8">I build AI-powered systems</text>
  <text x="${TEXT_X}" y="300"
    font-family="'Inter', 'Helvetica Neue', sans-serif" font-size="50" font-weight="300"
    fill="#E2E2E8">that turn manual workflows</text>
  <text x="${TEXT_X}" y="360"
    font-family="'Inter', 'Helvetica Neue', sans-serif" font-size="50" font-weight="300"
    fill="#E2E2E8">into automated infrastructure.</text>

  <!-- Sub-headline / proof -->
  <text x="${TEXT_X}" y="430"
    font-family="'Inter', 'Helvetica Neue', sans-serif" font-size="20" font-weight="400"
    fill="#9999A8">Junior at the University of South Florida</text>
  <text x="${TEXT_X}" y="460"
    font-family="'Inter', 'Helvetica Neue', sans-serif" font-size="20" font-weight="400"
    fill="#9999A8">12+ end-to-end portfolio projects</text>

  <!-- Footer -->
  <text x="${PHOTO_X}" y="590"
    font-family="'IBM Plex Mono', 'Inter', monospace" font-size="13"
    fill="#9999A8" letter-spacing="1.8">AVAILABLE SUMMER &amp; FALL 2026 INTERNSHIPS</text>
  <text x="${W - 80}" y="590" text-anchor="end"
    font-family="'IBM Plex Mono', 'Inter', monospace" font-size="13"
    fill="#6C63FF" letter-spacing="1.8">tylerdobson.github.io</text>
</svg>
`;

// Round-corner mask matching the About section photo treatment (rounded 12px,
// no rotation since the OG card is its own composition)
const photoMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO}" height="${PHOTO}">
    <rect width="${PHOTO}" height="${PHOTO}" rx="14" fill="white"/>
  </svg>`,
);

async function main() {
  if (!existsSync(avatarPath)) {
    console.warn("[build-og] avatar.png missing — generating text-only OG card");
    await sharp(Buffer.from(backdrop)).png({ compressionLevel: 9 }).toFile(outPath);
    console.log("[build-og] wrote", outPath, "(text only, no photo)");
    return;
  }

  // Prepare the headshot: resize and apply rounded-corner mask
  const photo = await sharp(avatarPath)
    .resize(PHOTO, PHOTO, { fit: "cover", position: "centre" })
    .composite([{ input: photoMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Composite the photo onto the SVG backdrop. The borderless rounded photo
  // sits at (PHOTO_X, PHOTO_Y) — left-aligned, vertically centered.
  await sharp(Buffer.from(backdrop))
    .composite([{ input: photo, top: Math.round(PHOTO_Y), left: Math.round(PHOTO_X) }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log("[build-og] wrote", outPath);
}

main().catch((e) => {
  console.error("[build-og] failed:", e);
  process.exitCode = 1;
});
