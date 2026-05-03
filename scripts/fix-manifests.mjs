#!/usr/bin/env node
// Auto-fix manifests for the schema introduced in this branch.
//
// What this script TRIES to fix automatically (idempotent — safe to re-run):
//   - missing x-casaos.scheme: adds "https" if the principal service exposes
//     port 443, otherwise "http"
//   - missing x-roqueos.mountShared: adds `mountShared: true` for apps in
//     curated categories where /shared filesystem access is the whole point
//     (media servers, downloaders, file managers)
//
// What this script REPORTS (manual fix needed — these touch product data):
//   - missing x-casaos.main on multi-service stacks
//   - missing x-casaos.port_map on multi-port principal services
//   - image: ":latest" or no tag — pinning needs a human picking a stable tag
//
// Usage:
//   node scripts/fix-manifests.mjs           # apply fixes, write back
//   node scripts/fix-manifests.mjs --dry-run # show what would change

import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import yaml from "js-yaml";

// CasaOS catalog uses both extensions interchangeably (Jellyseerr, Logseq,
// Trilium use .yaml; everything else uses .yml). Try .yml first, fall back
// to .yaml.
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const APPS_DIR = join(ROOT, "Apps");

const DRY = process.argv.includes("--dry-run");

// Curated list of apps that benefit from the /shared bind mount. Drives
// auto-injection of x-roqueos.mountShared: true. Add new entries here when
// you adopt a new media/downloads/file-manager app.
//
// Why a list and not a heuristic by category alone: many "Media" entries
// are streaming clients (Stremio, Tautulli) that don't need /shared, and
// some apps in other categories (Pingvin-Share in Storage, RomM in Gaming)
// genuinely do.
const MOUNT_SHARED_APPS = new Set([
  // Media servers — read media from /shared
  "Jellyfin",
  "Jellyfin_Nvidia",
  "Plex",
  "Plex_Nvidia",
  "Emby",
  "Emby_Nvidia",
  "Embystat",
  "Petio",
  "Komga",
  "Calibre-web",
  "Lazylibrarian",
  "Threadfin",
  "PhotoPrism",
  // Downloaders — write into /shared
  "qBittorrent",
  "Transmission",
  "Deluge",
  "Sabnzbd",
  "Nzbget",
  "PyLoad",
  "JDownloader2",
  "Gopeed",
  "Downtify",
  "Pinchflat",
  "ArchiveBox",
  "Lidarr",
  "Radarr",
  "Sonarr",
  "Readarr",
  "Bazarr",
  "Prowlarr",
  "Jackett",
  "Mylar3",
  "Sickchill",
  "Autobrr",
  // *arr companions / request UIs (use /shared to verify links)
  "Ombi",
  "Overseerr",
  "RDTClient",
  // File managers / sync — explicit shared workspace
  "FileBrowser",
  "Filedrop",
  "Nextcloud",
  "Syncthing",
  "Resilio-sync",
  "Pingvin-Share",
  "Snapdrop",
  "WebDav",
  "Alist-Sync",
  "Duplicati",
  // Game library managers (read ROMs from /shared)
  "RomM",
  "EmulatorJS",
]);

const summary = {
  scheme: { added: [], skipped: [] },
  mountShared: { added: [], skipped: [] },
  main: { added: [], skipped: [] },
  manualReview: {
    missingMain: [],
    missingPortMap: [],
    untaggedImage: [],
  },
};

function pickScheme(services, mainKey) {
  const ports = services[mainKey]?.ports || [];
  for (const p of ports) {
    const target =
      typeof p === "string"
        ? p.split(":").pop().split("/")[0]
        : String(p.target);
    if (target === "443") return "https";
  }
  return "http";
}

function isImagePinned(img) {
  if (!img || typeof img !== "string") return false;
  if (!img.includes(":")) return false;
  if (img.endsWith(":latest")) return false;
  return true;
}

const apps = (await readdir(APPS_DIR, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const app of apps) {
  const composePath = await findComposePath(join(APPS_DIR, app));
  if (!composePath) {
    console.log(`! ${app}: no docker-compose.{yml,yaml} found — skipped`);
    continue;
  }
  const raw = await readFile(composePath, "utf8");
  let doc;
  try {
    doc = yaml.load(raw);
  } catch (err) {
    console.log(`! ${app}: yaml parse failed — ${err.message}`);
    continue;
  }
  if (!doc || typeof doc !== "object") continue;

  const services = doc.services || {};
  const serviceKeys = Object.keys(services);
  doc["x-casaos"] = doc["x-casaos"] || {};
  const xc = doc["x-casaos"];

  // 1. main — auto-injectable for single-service stacks. Multi-service
  //    stacks remain a manual decision (which one is "the" UI?), but for
  //    a stack with a single service the answer is unambiguous.
  if (!xc.main && serviceKeys.length === 1) {
    xc.main = serviceKeys[0];
    summary.main.added.push({ app, main: xc.main });
  } else if (xc.main) {
    summary.main.skipped.push(app);
  }

  // 2. scheme — automatable
  if (!xc.scheme) {
    const main = xc.main || serviceKeys[0];
    xc.scheme = pickScheme(services, main);
    summary.scheme.added.push({ app, scheme: xc.scheme });
  } else {
    summary.scheme.skipped.push(app);
  }

  // 2. mountShared — opt-in via curated list
  if (MOUNT_SHARED_APPS.has(app)) {
    doc["x-roqueos"] = doc["x-roqueos"] || {};
    if (doc["x-roqueos"].mountShared !== true) {
      doc["x-roqueos"].mountShared = true;
      summary.mountShared.added.push(app);
    } else {
      summary.mountShared.skipped.push(app);
    }
  }

  // 3. manual review reports — don't write, just collect
  if (serviceKeys.length > 1 && !xc.main) {
    summary.manualReview.missingMain.push({ app, services: serviceKeys });
  }
  const main = xc.main || serviceKeys[0];
  const mainPorts = services[main]?.ports || [];
  if (mainPorts.length > 1 && !xc.port_map) {
    const ports = mainPorts.map((p) =>
      typeof p === "string"
        ? p.split(":").pop().split("/")[0]
        : String(p.published ?? p.target),
    );
    summary.manualReview.missingPortMap.push({ app, main, ports });
  }
  for (const [svcName, svc] of Object.entries(services)) {
    if (!isImagePinned(svc.image)) {
      summary.manualReview.untaggedImage.push({
        app,
        service: svcName,
        image: svc.image,
      });
    }
  }

  // Write back if anything changed (compare by yaml dump round-trip)
  // Preserve quoted strings via lineWidth: -1 so multi-line descriptions
  // don't get reflowed and pollute diffs.
  const newYaml = yaml.dump(doc, {
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  });
  if (newYaml !== raw) {
    if (!DRY) await writeFile(composePath, newYaml, "utf8");
  }
}

const r = (label, n) => console.log(`  ${label.padEnd(40)} ${n}`);
console.log("\n=== migration summary ===\n");
console.log(`Mode: ${DRY ? "DRY RUN (no files written)" : "APPLY"}\n`);
r("main added (single-service)", summary.main.added.length);
r("main already present", summary.main.skipped.length);
r("scheme added", summary.scheme.added.length);
r("scheme already present", summary.scheme.skipped.length);
r("mountShared added", summary.mountShared.added.length);
r("mountShared already present", summary.mountShared.skipped.length);
console.log("");
r("manual: missing x-casaos.main", summary.manualReview.missingMain.length);
r(
  "manual: missing x-casaos.port_map",
  summary.manualReview.missingPortMap.length,
);
r(
  "manual: untagged/`:latest` image",
  summary.manualReview.untaggedImage.length,
);

if (process.argv.includes("--verbose")) {
  console.log("\n--- manual review details ---");
  if (summary.manualReview.missingMain.length) {
    console.log("\nmissing main:");
    for (const e of summary.manualReview.missingMain) {
      console.log(`  ${e.app}: services=[${e.services.join(", ")}]`);
    }
  }
  if (summary.manualReview.missingPortMap.length) {
    console.log("\nmissing port_map:");
    for (const e of summary.manualReview.missingPortMap) {
      console.log(`  ${e.app} (main=${e.main}): ports=[${e.ports.join(", ")}]`);
    }
  }
  if (summary.manualReview.untaggedImage.length) {
    console.log("\nuntagged images:");
    for (const e of summary.manualReview.untaggedImage) {
      console.log(`  ${e.app} / ${e.service}: ${e.image}`);
    }
  }
}
