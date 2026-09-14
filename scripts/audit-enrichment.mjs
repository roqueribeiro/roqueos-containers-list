#!/usr/bin/env node
// Audit enrichment quality of every Apps/*/docker-compose.{yml,yaml}.
// Surfaces gaps so contributors can prioritize translation/description work.
//
// What it checks (per app):
//   - x-casaos.title    has en_us (a grafia que o roqueos-server le)
//   - x-casaos.tagline  has en_us (string form also OK)
//   - x-casaos.tagline  has pt_br
//   - x-casaos.description has en_us
//   - x-casaos.description has pt_br
//   - x-casaos.icon present E o ARQUIVO icon.png existe no disco
//
//     A versao anterior media so o campo, e por isso dizia `icon present
//     205/205 (100.0%)` enquanto 54 apps davam 404 no CDN e apareciam sem
//     icone na App Store. Campo preenchido apontando para arquivo que nao
//     existe e pior que campo vazio: parece pronto.
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
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, join } from "node:path";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const APPS_DIR = join(ROOT, "Apps");

const CSV = process.argv.includes("--csv");

export async function findComposePath(appDir) {
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

// ATENCAO: NAO sao intercambiaveis para quem consome.
//
// O roqueos-server le `casaos.title?.en_us` e `casaos.description?.en_us`,
// minusculo, e cai no fallback quando nao acha. Em 14/09/2026 este audit dizia
// 100% em title.en_US enquanto 44 apps apareciam na App Store com o NOME DA
// PASTA e 56 com a frase "<app> Docker application": todos tinham a chave em
// en_US, que para o server nao existe.
//
// Por isso o audit agora mede a grafia CANONICA (en_us, pt_br) e reporta a
// outra em separado, como divida a pagar — e nao como se fosse a mesma coisa.
export function hasLocale(field, ...candidates) {
  if (!field) return false;
  if (typeof field === "string") return field.trim().length > 0;
  if (typeof field !== "object") return false;
  return candidates.some(
    (k) => typeof field[k] === "string" && field[k].trim().length > 0,
  );
}

export function nonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

export function hasScreenshots(v) {
  if (Array.isArray(v)) return v.length > 0;
  return nonEmptyString(v);
}

// CLI entrypoint — only runs when invoked directly, not when imported by tests.
const isCli = import.meta.url === pathToFileURL(process.argv[1] || "").href;

if (isCli) {
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
      titleEn: hasLocale(xc.title, "en_us"),
      titleSoMaiusculo: !hasLocale(xc.title, "en_us") && hasLocale(xc.title, "en_US"),
      taglineEn: hasLocale(xc.tagline, "en_us"),
      taglinePt: hasLocale(xc.tagline, "pt_br"),
      descEn: hasLocale(xc.description, "en_us"),
      descSoMaiusculo: !hasLocale(xc.description, "en_us") && hasLocale(xc.description, "en_US"),
      descPt: hasLocale(xc.description, "pt_br"),
      icon: nonEmptyString(xc.icon) && existsSync(join(APPS_DIR, app, "icon.png")),
      iconSoNoCampo: nonEmptyString(xc.icon) && !existsSync(join(APPS_DIR, app, "icon.png")),
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

  r("title.en_us present (a grafia que o server le)", c("titleEn"));
  r("  ...so em en_US, invisivel para o server", c("titleSoMaiusculo"));
  r("  ...description so em en_US, invisivel", c("descSoMaiusculo"));
  r("tagline.en_us present", c("taglineEn"));
  r("tagline.pt_br present", c("taglinePt"));
  r("description.en_us present", c("descEn"));
  r("description.pt_br present", c("descPt"));
  r("icon: campo E arquivo no disco", c("icon"));
  r("  ...campo aponta arquivo que nao existe", c("iconSoNoCampo"));
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
      console.log(
        "\n--- no English (high priority — gates discoverability) ---",
      );
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
} // end of `if (isCli)` block
