#!/usr/bin/env node
// Validate every Apps/*/docker-compose.yml against schema/casaos-app.schema.json.
// Reports per-app failures, exits non-zero when any manifest drifts.
//
// Run locally: `node scripts/validate-manifests.mjs`
// CI: invoked by .github/workflows/validate-schema.yml on every push / PR.

import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const APPS_DIR = join(ROOT, "Apps");
const SCHEMA_PATH = join(ROOT, "schema", "casaos-app.schema.json");

const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
addFormats(ajv);

const schema = JSON.parse(await readFile(SCHEMA_PATH, "utf8"));
const validate = ajv.compile(schema);

const results = { ok: 0, failed: [], skipped: 0 };

const apps = (await readdir(APPS_DIR, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const app of apps) {
  const composePath = join(APPS_DIR, app, "docker-compose.yml");
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
    // Cross-field invariants the JSON Schema can't express. We do them here
    // instead of inflating the schema with custom keywords.
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

function crossFieldChecks(doc) {
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

  // 3. port_map must match a published host port of the principal service
  if (xc.port_map) {
    const main = xc.main || serviceKeys[0];
    const ports = (services[main]?.ports || []).map((p) => {
      if (typeof p === "string") return p.split(":").pop().split("/")[0];
      return String(p.published ?? p.target ?? "");
    });
    if (!ports.includes(String(xc.port_map))) {
      out.push(
        `x-casaos.port_map="${xc.port_map}" not in published ports of "${main}" [${ports.join(", ")}]`,
      );
    }
  }

  // 4. multi-port principal services should declare port_map (so the proxy
  //    isn't guessing). We surface this as a real failure — heuristic-based
  //    port selection is exactly the bug Phase 3 of the audit set out to fix.
  const main = xc.main || serviceKeys[0];
  const mainPorts = services[main]?.ports || [];
  if (mainPorts.length > 1 && !xc.port_map) {
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

console.log(`\nValidated ${apps.length} manifests.`);
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
