#!/usr/bin/env node
// One-shot rebrand: replace upstream CasaOS branding with RoqueOS where it
// makes sense, leave it where it carries technical meaning.
//
// What this changes (string replacements in Apps/*/docker-compose.{yml,yaml}):
//
//   1. author: CasaOS Team        → author: RoqueOS Team
//      Curation credit. The repo is our fork now; CasaOS Team contributed
//      the original manifests but ongoing maintenance is on us.
//
//   2. CDN URLs pointing at upstream catalogs:
//        cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/X/...
//        cdn.jsdelivr.net/gh/LisonEvf/CasaOS-AppStore@main/Apps/X/...
//      → cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main/Apps/X/...
//      Each app has the assets locally (icon.png, screenshot-*.png,
//      thumbnail.png), so jsdelivr serves them from our repo.
//
//   3. Default credentials in env vars + tips:
//        env:    `casaos` value (USERNAME/PASSWORD/MYSQL_*) → `roqueos`
//        tips:   `casaos` in user/password tables           → `roqueos`
//      These are the per-container default creds the catalog suggests; not
//      paths, not network-relevant. Coherent rebrand.
//
//   4. Free-text mentions in description/tips/tagline:
//        "CasaOS WebUI"     → "RoqueOS WebUI"
//        "casaos/zimaos"    → "RoqueOS"
//        "casaos.local"     → "roqueos.local"
//        "CasaOS 中"         → "RoqueOS 中"  (Chinese, also rebrand)
//
// What this does NOT change:
//
//   - `x-casaos:` YAML namespace — the catalog parser contract. Our server
//     reads this exact key.
//   - `https://icon.casaos.io/main/all/X.png` — IceWhale's icon CDN. Out
//     of our control; only 3 apps reference it (Netdata, Trilium, WebDav).
//   - `/DATA/AppData/casaos-cloudflared/` — bind mount path. Changing
//     would orphan existing user data on upgrade.
//   - `casaos-app.schema.json` — file name reflects compatibility with
//     CasaOS App Store format.
//   - README badges asserting "CasaOS Compatible" — factual claim about
//     manifest format, not branding.
//
// Idempotent — safe to re-run. Run after any new app is imported from
// upstream CasaOS-AppStore.

import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const APPS_DIR = join(ROOT, "Apps");
const DRY = process.argv.includes("--dry-run");

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

// Some apps also ship `appfile.json` — a parallel CasaOS App Store metadata
// file. Same rebrand rules apply (URLs, credentials, free-text mentions,
// adaptor block). Returns absolute path or null.
export async function findAppfilePath(appDir) {
  const p = join(appDir, "appfile.json");
  try {
    await access(p);
    return p;
  } catch {
    return null;
  }
}

// Each rule is {from: RegExp, to: string, label: string}.
// Order matters: longer/more-specific patterns first so they don't get
// shadowed by broader ones.
export const RULES = [
  // === credit / authorship ===
  {
    from: /^(\s*author:\s*)CasaOS Team(\s*)$/gm,
    to: "$1RoqueOS Team$2",
    label: "author",
  },
  {
    from: /^(\s*developer:\s*)CasaOS Team(\s*)$/gm,
    to: "$1RoqueOS Team$2",
    label: "developer",
  },

  // === CDN URLs (longer first) ===
  {
    from: /cdn\.jsdelivr\.net\/gh\/IceWhaleTech\/CasaOS-AppStore@main/g,
    to: "cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main",
    label: "cdn-icewhale",
  },
  {
    from: /cdn\.jsdelivr\.net\/gh\/LisonEvf\/CasaOS-AppStore@main/g,
    to: "cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main",
    label: "cdn-lisonevf",
  },
  // IceWhale's standalone icon CDN (icon.casaos.io/main/all/X.png) used by
  // 5 apps (Jenkin, Netdata, Trilium, WebDav x2). Each app has icon.png
  // locally, so jsdelivr can serve from our repo. The flat URL maps to a
  // per-app path; transform `<name>.png` → `<App>/icon.png` at apply time.
  {
    from: /https?:\/\/icon\.casaos\.io\/main\/all\/(?<file>[a-zA-Z0-9._-]+)\.png/g,
    to: (_match, file) => {
      // Map known flat icon names to their actual Apps/<dir>/icon.png path.
      // Falls back to titlecased dir name; cover the 4 apps that hit this.
      const NAME_TO_APP = {
        netdata: "Netdata",
        trilium: "Trilium",
        webdav: "WebDav",
        jenkins: "Jenkin",
      };
      const app = NAME_TO_APP[file.toLowerCase()] || file;
      return `https://cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main/Apps/${app}/icon.png`;
    },
    label: "cdn-icewhale-icon-host",
  },

  // === env credentials (whole-token replacements) ===
  // YAML map form: KEY: casaos     (with or without quotes)
  {
    from: /^(\s*(?:ADMIN_PASSWORD|ADMIN_USERNAME|DB_PASSWD|FLOWISE_PASSWORD|FLOWISE_USERNAME|MARIADB_PASSWORD|MARIADB_ROOT_PASSWORD|MYSQL_DATABASE|MYSQL_PASSWORD|MYSQL_ROOT_PASSWORD|MYSQL_USER|PASS|PASSWORD|PHOTOPRISM_ADMIN_PASSWORD|POSTGRES_DB|POSTGRES_PASSWORD|POSTGRES_USER|USER|USERNAME|FTLCONF_webserver_api_password):\s*['"]?)casaos(['"]?\s*)$/gm,
    to: "$1roqueos$2",
    label: "env-cred-mapping",
  },
  // YAML list form: - KEY=casaos
  {
    from: /^(\s*-\s*(?:ADMIN_PASSWORD|ADMIN_USERNAME|DB_PASSWD|FLOWISE_PASSWORD|FLOWISE_USERNAME|MARIADB_PASSWORD|MARIADB_ROOT_PASSWORD|MYSQL_DATABASE|MYSQL_PASSWORD|MYSQL_ROOT_PASSWORD|MYSQL_USER|PASS|PASSWORD|PHOTOPRISM_ADMIN_PASSWORD|POSTGRES_DB|POSTGRES_PASSWORD|POSTGRES_USER|USER|USERNAME|FTLCONF_webserver_api_password)=)casaos(\s*)$/gm,
    to: "$1roqueos$2",
    label: "env-cred-list",
  },

  // === tips: backtick-wrapped credentials inside markdown tables ===
  // Lines like "| `casaos` | `casaos` |" — only inside tips (we don't
  // gate on context here; the backtick-wrapping pattern is specific
  // enough that false positives are essentially impossible).
  { from: /`casaos`/g, to: "`roqueos`", label: "tips-creds" },

  // === free-text mentions in descriptions/tips ===
  { from: /CasaOS WebUI/g, to: "RoqueOS WebUI", label: "text-webui" },
  {
    from: /casaos\/zimaos/gi,
    to: "RoqueOS",
    label: "text-casaos-zimaos",
  },
  // "casaos and zimaOS" / "zimaOS and casaos" (without slash)
  {
    from: /casaos and zimaOS/gi,
    to: "RoqueOS",
    label: "text-casaos-and-zimaos",
  },
  // "for CasaOS" / "in CasaOS" / "to CasaOS" / "your CasaOS" — generic
  // English mentions. Catches Twingate tagline ("Connector for CasaOS"),
  // descriptions ("paths in CasaOS"), and sentence-final cause-warnings
  // ("...cause your CasaOS to run abnormally").
  {
    from: /\bfor CasaOS\b/g,
    to: "for RoqueOS",
    label: "text-for-casaos",
  },
  { from: /\bin CasaOS\b/g, to: "in RoqueOS", label: "text-in-casaos" },
  { from: /\bto CasaOS\b/g, to: "to RoqueOS", label: "text-to-casaos" },
  {
    from: /\byour CasaOS\b/g,
    to: "your RoqueOS",
    label: "text-your-casaos",
  },
  { from: /casaos\.local/g, to: "roqueos.local", label: "text-domain" },
  // Email used as a sample login (PocketBase): casaos@admin.local
  {
    from: /casaos@admin\.local/g,
    to: "roqueos@admin.local",
    label: "text-sample-email",
  },
  // Inline command flags using `casaos` as a default secret/code (Siyuan's
  // --accessAuthCode=casaos). These are catalog defaults, safe to rebrand.
  {
    from: /accessAuthCode=casaos/g,
    to: "accessAuthCode=roqueos",
    label: "text-cli-secret",
  },
  // Chinese: rebrand free-text mentions of CasaOS
  { from: /CasaOS 中/g, to: "RoqueOS 中", label: "text-zh-in" },
  { from: /CasaOS 其他/g, to: "RoqueOS 其他", label: "text-zh-other" },
  { from: /你的 CasaOS/g, to: "你的 RoqueOS", label: "text-zh-your" },
  { from: /您的 CasaOS/g, to: "您的 RoqueOS", label: "text-zh-your2" },

  // === appfile.json specific ===
  // The "adaptor" block credits whoever ported the upstream app to the
  // CasaOS catalog. With the fork, it's us. Match by URL so we don't
  // touch any unrelated `name: "CasaOS Team"` strings.
  {
    from: /"website":\s*"https:\/\/www\.casaos\.io"/g,
    to: '"website": "https://roqueos.com.br"',
    label: "json-website",
  },
  // Adaptor name in appfile.json (only appears as JSON value, never in
  // free text). Safe to swap globally.
  {
    from: /"name":\s*"CasaOS Team"/g,
    to: '"name": "RoqueOS Team"',
    label: "json-adaptor-name",
  },
  // Default credentials in appfile.json env defaults + tips.
  // Pattern only appears in catalog default values; same rebrand as YAML.
  {
    from: /"value":\s*"casaos"/g,
    to: '"value": "roqueos"',
    label: "json-cred-value",
  },
];

/**
 * Pure helper: apply RULES to a content string. Returns the transformed
 * content + per-label match counts. Idempotent when called twice (rebrand
 * rules are no-op if the target string is already correct).
 *
 * Exported for unit tests.
 */
export function applyRulesToContent(content, rules = RULES) {
  let after = content;
  const matchCounts = new Map();
  for (const rule of rules) {
    const matches = after.match(rule.from);
    if (matches && matches.length > 0) {
      after = after.replace(rule.from, rule.to);
      matchCounts.set(
        rule.label,
        (matchCounts.get(rule.label) || 0) + matches.length,
      );
    }
  }
  return { content: after, matchCounts, changed: after !== content };
}

// CLI entrypoint — only runs when invoked directly, not when imported by tests.
const isCli = import.meta.url === pathToFileURL(process.argv[1] || "").href;

if (isCli) {
  const apps = (await readdir(APPS_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const summary = new Map(); // label → count
  const filesChanged = [];

  async function applyRulesToFile(filePath, app, kind) {
    const before = await readFile(filePath, "utf8");
    const {
      content: after,
      matchCounts,
      changed,
    } = applyRulesToContent(before, RULES);

    for (const [label, count] of matchCounts) {
      summary.set(label, (summary.get(label) || 0) + count);
    }

    if (changed) {
      filesChanged.push(`${app}/${kind}`);
      if (!DRY) await writeFile(filePath, after, "utf8");
    }
  }

  for (const app of apps) {
    const appDir = join(APPS_DIR, app);
    const composePath = await findComposePath(appDir);
    if (composePath) await applyRulesToFile(composePath, app, "compose");

    const appfilePath = await findAppfilePath(appDir);
    if (appfilePath) await applyRulesToFile(appfilePath, app, "appfile");
  }

  console.log(`\n=== rebrand summary (${DRY ? "DRY RUN" : "APPLY"}) ===\n`);
  const sorted = [...summary.entries()].sort((a, b) => b[1] - a[1]);
  for (const [label, count] of sorted) {
    console.log(`  ${label.padEnd(28)} ${String(count).padStart(5)}`);
  }
  console.log(`\n  files changed: ${filesChanged.length} / ${apps.length}`);
  if (process.argv.includes("--verbose") && filesChanged.length > 0) {
    console.log("\n--- changed apps ---");
    for (const app of filesChanged) console.log(`  ${app}`);
  }
  console.log("");
} // end of `if (isCli)` block
