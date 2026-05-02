#!/usr/bin/env node
// Audit enrichment quality of every Apps/*/docker-compose.{yml,yaml}.
// Surfaces gaps so contributors can prioritize translation/description work.
//
// What it checks (per app):
//   - x-casaos.title    has en_US OR en_us
//   - x-casaos.tagline  has en_US OR en_us (string form also OK)
//   - x-casaos.tagline  has pt_BR OR pt_br
//   - x-casaos.description has en_US OR en_us
//   - x-casaos.description has pt_BR OR pt_br
//   - x-casaos.icon present (non-empty string)
//   - x-casaos.thumbnail present (non-empty string or array)
//   - x-casaos.screenshot_link has at least one entry
//
// Usage:
//   node scripts/audit-enrichment.mjs            # human-readable report
//   node scripts/audit-enrichment.mjs --csv      # machine-readable CSV
//
// This script is read-only — it reports, never writes. The contributor
// flow is: run audit → pick highest-impact gaps → edit YAML by hand.

import { readFile, readdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const APPS_DIR = join(ROOT, "Apps");

const CSV = process.argv.includes("--csv");

async function findComposePath(appDir) {
  for (const name of ["docker-compose.yml", "docker-compose.yaml"]) {
    const p = join(appDir, name);
    try {
      await access(p);
      return p;
    } catch {
      // not found, try next
    }
  }
  return null;
}

// CasaOS catalog uses both en_US/en_us and pt_BR/pt_br interchangeably.
function hasLocale(field, ...candidates) {
  if (!field) return false;
  if (typeof field === "string") return field.trim().length > 0;
  if (typeof field !== "object") return false;
  return candidates.some(
    (k) => typeof field[k] === "string" && field[k].trim().length > 0,
  );
}

function nonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function hasScreenshots(v) {
  if (Array.isArray(v)) return v.length > 0;
  return nonEmptyString(v);
}

const apps = (await readdir(APPS_DIR, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const rows = [];

for (const app of apps) {
  const composePath = await findComposePath(join(APPS_DIR, app));
  if (!composePath) continue;
  const raw = await readFile(composePath, "utf8");
  let doc;
  try {
    doc = yaml.load(raw);
  } catch {
    continue;
  }
  const xc = doc?.["x-casaos"] || {};

  const checks = {
    titleEn: hasLocale(xc.title, "en_US", "en_us"),
    taglineEn: hasLocale(xc.tagline, "en_US", "en_us"),
    taglinePt: hasLocale(xc.tagline, "pt_BR", "pt_br"),
    descEn: hasLocale(xc.description, "en_US", "en_us"),
    descPt: hasLocale(xc.description, "pt_BR", "pt_br"),
    icon: nonEmptyString(xc.icon),
    thumbnail:
      nonEmptyString(xc.thumbnail) ||
      (Array.isArray(xc.thumbnail) && xc.thumbnail.length > 0),
    screenshots: hasScreenshots(xc.screenshot_link),
  };

  const missing = Object.entries(checks)
    .filter(([, ok]) => !ok)
    .map(([k]) => k);

  rows.push({ app, ...checks, missing });
}

// =============================================================================
// Reporting
// =============================================================================

if (CSV) {
  console.log(
    "app,titleEn,taglineEn,taglinePt,descEn,descPt,icon,thumbnail,screenshots",
  );
  for (const r of rows) {
    console.log(
      [
        r.app,
        r.titleEn,
        r.taglineEn,
        r.taglinePt,
        r.descEn,
        r.descPt,
        r.icon,
        r.thumbnail,
        r.screenshots,
      ].join(","),
    );
  }
  process.exit(0);
}

const total = rows.length;
const c = (key) => rows.filter((r) => r[key]).length;

console.log(`\n=== enrichment audit (${total} apps) ===\n`);
const r = (label, n) => {
  const pct = ((n / total) * 100).toFixed(1);
  console.log(
    `  ${label.padEnd(30)} ${String(n).padStart(4)} / ${total}  (${pct}%)`,
  );
};

r("title.en_US present", c("titleEn"));
r("tagline.en_US present", c("taglineEn"));
r("tagline.pt_BR present", c("taglinePt"));
r("description.en_US present", c("descEn"));
r("description.pt_BR present", c("descPt"));
r("icon present", c("icon"));
r("thumbnail present", c("thumbnail"));
r("screenshot_link populated", c("screenshots"));

const missingPt = rows.filter((r) => !r.taglinePt && !r.descPt);
const missingEn = rows.filter((r) => !r.taglineEn && !r.descEn);

console.log(
  `\n  apps with NO Portuguese (tagline & description):  ${missingPt.length}`,
);
console.log(
  `  apps with NO English (tagline & description):     ${missingEn.length}`,
);

if (process.argv.includes("--verbose")) {
  if (missingEn.length > 0) {
    console.log("\n--- no English (high priority — gates discoverability) ---");
    for (const r of missingEn) console.log(`  ${r.app}`);
  }
  if (missingPt.length > 0) {
    console.log(
      `\n--- no Portuguese (gates pt-BR users; ${missingPt.length} apps) ---`,
    );
    for (const r of missingPt.slice(0, 30)) console.log(`  ${r.app}`);
    if (missingPt.length > 30)
      console.log(`  ...and ${missingPt.length - 30} more`);
  }
}

console.log("");
