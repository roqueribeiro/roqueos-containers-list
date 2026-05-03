#!/usr/bin/env node
// Validate every Apps/*/docker-compose.{yml,yaml} against schema/casaos-app.schema.json.
// Reports per-app failures, exits non-zero when any manifest drifts.
//
// Run locally: `node scripts/validate-manifests.mjs`
// CI: invoked by .github/workflows/validate-schema.yml on every push / PR.
//
// Test usage: `findComposePath` and `crossFieldChecks` are exported for
// unit tests. The CLI entrypoint at the bottom only runs when this file
// is invoked directly (not when imported).

import { readFile, readdir, access } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, join } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const APPS_DIR = join(ROOT, "Apps");
const SCHEMA_PATH = join(ROOT, "schema", "casaos-app.schema.json");

// CasaOS catalog uses both extensions interchangeably. Try .yml first
// (overwhelming majority), fall back to .yaml.
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

/**
 * Cross-field invariants that JSON Schema can't express. Pure function:
 * takes a parsed YAML doc, returns array of error message strings (empty
 * when manifest passes).
 *
 * Checks:
 *   1. x-casaos.main → must reference a real service
 *   2. multi-service compose → must declare x-casaos.main
 *   3. x-casaos.port_map → must match a published HOST port of the
 *      principal service (or be a `network_mode: host` app with no ports)
 *   4. multi-port principal service → must declare x-casaos.port_map
 *      (skip when network_mode: host)
 *   5. x-roqueos.mountShared → must be a boolean
 */
export function crossFieldChecks(doc) {
  const out = [];
  const services = doc.services || {};
  const xc = doc["x-casaos"] || {};
  const xr = doc["x-roqueos"] || {};

  // 1. main → must reference a real service
  if (xc.main && !services[xc.main]) {
    out.push(`x-casaos.main "${xc.main}" does not match any service`);
  }

  // 2. multi-service stacks need x-casaos.main
  const serviceKeys = Object.keys(services);
  if (serviceKeys.length > 1 && !xc.main) {
    out.push(
      `multi-service compose (${serviceKeys.length} services) without x-casaos.main — parser would silently pick services[0]`,
    );
  }

  // 3. port_map must match a published host port of the principal service.
  //    Docker Compose port shorthand: "host:container" or "ip:host:container".
  //    For port_map (which is the canonical HOST port the proxy opens), we
  //    want the host side. For string-form, that's the second-to-last token
  //    when there are at least 2 colon-separated parts; otherwise it's just
  //    the container port (no fixed host port — published is dynamic).
  //
  //    Apps with `network_mode: host` publish all ports on the host's iface
  //    without declaring them under `ports:`. We treat an empty ports list +
  //    network_mode:host as "host port == container port == port_map" so the
  //    proxy heuristic still works (HomeAssistant, Plex, Tailscale, etc.).
  if (xc.port_map) {
    const main = xc.main || serviceKeys[0];
    const svc = services[main] || {};
    const rawPorts = svc.ports || [];
    const ports = rawPorts.map((p) => {
      if (typeof p === "string") {
        const parts = p.split("/")[0].split(":");
        return parts.length >= 2 ? parts[parts.length - 2] : parts[0];
      }
      return String(p.published ?? p.target ?? "");
    });
    const hostMode = svc.network_mode === "host";
    const matched =
      ports.includes(String(xc.port_map)) ||
      (hostMode && rawPorts.length === 0);
    if (!matched) {
      out.push(
        `x-casaos.port_map="${xc.port_map}" not in published ports of "${main}" [${ports.join(", ")}]${hostMode ? " (network_mode: host)" : ""}`,
      );
    }
  }

  // 4. multi-port principal services should declare port_map (so the proxy
  //    isn't guessing). We surface this as a real failure — heuristic-based
  //    port selection is exactly the bug Phase 3 of the audit set out to fix.
  //    Skip apps with `network_mode: host` (no proxy possible anyway).
  const main = xc.main || serviceKeys[0];
  const mainSvc = services[main] || {};
  const mainPorts = mainSvc.ports || [];
  if (mainPorts.length > 1 && !xc.port_map && mainSvc.network_mode !== "host") {
    out.push(
      `principal service "${main}" exposes ${mainPorts.length} ports but x-casaos.port_map is missing`,
    );
  }

  // 5. x-roqueos.mountShared must be a boolean
  if (xr.mountShared !== undefined && typeof xr.mountShared !== "boolean") {
    out.push(
      `x-roqueos.mountShared must be a boolean, got ${typeof xr.mountShared}`,
    );
  }

  return out;
}

/**
 * Run validation across every app in APPS_DIR. Returns a results object
 * but does NOT exit the process — callers decide what to do.
 */
export async function runValidation() {
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    allowUnionTypes: true,
  });
  addFormats(ajv);

  const schema = JSON.parse(await readFile(SCHEMA_PATH, "utf8"));
  const validate = ajv.compile(schema);

  const results = { ok: 0, failed: [], skipped: 0 };
  const apps = (await readdir(APPS_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const app of apps) {
    const composePath = await findComposePath(join(APPS_DIR, app));
    if (!composePath) {
      results.failed.push({
        app,
        errors: ["docker-compose.yml or docker-compose.yaml not found"],
      });
      continue;
    }
    let doc;
    try {
      doc = yaml.load(await readFile(composePath, "utf8"));
    } catch (err) {
      results.failed.push({ app, errors: [`yaml-parse: ${err.message}`] });
      continue;
    }

    if (!doc || typeof doc !== "object") {
      results.failed.push({ app, errors: ["empty or non-object yaml"] });
      continue;
    }

    const valid = validate(doc);
    if (valid) {
      const xtra = crossFieldChecks(doc);
      if (xtra.length === 0) results.ok += 1;
      else results.failed.push({ app, errors: xtra });
    } else {
      const errs = (validate.errors || []).map(
        (e) =>
          `${e.instancePath || "/"} ${e.message}${e.params ? " " + JSON.stringify(e.params) : ""}`,
      );
      results.failed.push({ app, errors: errs });
    }
  }

  return { results, totalApps: apps.length };
}

// CLI entrypoint — only runs when invoked directly, not when imported by tests.
const isCli = import.meta.url === pathToFileURL(process.argv[1] || "").href;
if (isCli) {
  const { results, totalApps } = await runValidation();
  console.log(`\nValidated ${totalApps} manifests.`);
  console.log(`  ✓ ok:     ${results.ok}`);
  console.log(`  ✗ failed: ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log("");
    for (const { app, errors } of results.failed) {
      console.log(`  - ${app}`);
      for (const e of errors) console.log(`      ${e}`);
    }
    console.log("");
    process.exit(1);
  }
}
