/**
 * Preview Snapshot — tenant-agnostic Playwright screenshot tool.
 *
 * Captures the live Vercel preview URL at mobile + desktop viewports
 * and writes PNGs to ./snapshots/ for the GitHub Action workflow to
 * upload as an artifact.
 *
 * Designed to work unchanged across HeyeLab tenant repos. Override
 * any defaults via env vars below.
 *
 * Env vars (all optional except PREVIEW_URL):
 *   PREVIEW_URL          — full URL to snapshot (required)
 *   SNAPSHOT_OUTPUT_DIR  — default "snapshots"
 *   SNAPSHOT_VIEWPORTS   — comma-list of "label:WxH" entries.
 *                          Default: "mobile-375x667:375x667,desktop-1440x900:1440x900"
 *   SNAPSHOT_FULL_PAGE   — "true"|"false" (default "true")
 *   SNAPSHOT_WAIT_MS     — extra ms to wait after networkidle (default 1500)
 */

const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const PREVIEW_URL = process.env.PREVIEW_URL;
if (!PREVIEW_URL) {
  console.error("PREVIEW_URL is required");
  process.exit(1);
}

const OUTPUT_DIR = process.env.SNAPSHOT_OUTPUT_DIR || "snapshots";
const FULL_PAGE = process.env.SNAPSHOT_FULL_PAGE !== "false";
const WAIT_MS = parseInt(process.env.SNAPSHOT_WAIT_MS || "1500", 10);
const VIEWPORTS_RAW =
  process.env.SNAPSHOT_VIEWPORTS ||
  "mobile-375x667:375x667,desktop-1440x900:1440x900";

const viewports = VIEWPORTS_RAW.split(",").map((entry) => {
  const [label, dims] = entry.trim().split(":");
  const [w, h] = dims.split("x").map((n) => parseInt(n, 10));
  return { label, width: w, height: h };
});

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      // Mobile emulation: pretend to be a mobile UA so responsive media
      // queries fire correctly. For viewports < 768px wide, this matches
      // common framework breakpoints (sm: in Tailwind, mobile in Bron's).
      isMobile: vp.width < 768,
      hasTouch: vp.width < 768,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    try {
      await page.goto(PREVIEW_URL, { waitUntil: "networkidle", timeout: 30_000 });
      // Extra settle for hero animations, font loading, etc.
      await page.waitForTimeout(WAIT_MS);
      const outPath = path.join(OUTPUT_DIR, `${vp.label}.png`);
      await page.screenshot({ path: outPath, fullPage: FULL_PAGE });
      console.log(`✓ ${vp.label} → ${outPath}`);
    } catch (err) {
      console.error(`✗ ${vp.label} failed:`, err.message);
    } finally {
      await context.close();
    }
  }
  await browser.close();
})();
