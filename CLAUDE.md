# RoqueOS Containers List

Self-hosted **Docker app catalog** for RoqueOS — 205+ ready-to-deploy apps in CasaOS-compatible Docker Compose manifests (`x-casaos` namespace). The catalog itself is the `Apps/` directory; this repo also ships the Node tooling that validates, auto-fixes, audits and rebrands those manifests. A semver tag publishes `appstore.zip`, consumed by the RoqueOS App Store (via `roqueos-server`) and by any CasaOS-compatible client.

This is one of the **nine repos** that form RoqueOS. The ecosystem map (sibling repos, how they connect, cross-repo change ordering) is [`../roqueos-ecosystem/README.md`](../roqueos-ecosystem/README.md), and the cross-repo rules are in `../roqueos-ecosystem/rules/`. Neither is auto-loaded: read them on demand when a task crosses repos.

## Commands

- `yarn install` — install validator deps (one-time; no global installs)
- `yarn validate` — **CI gate.** `ajv` schema check + cross-field invariants (`scripts/validate-manifests.mjs`)
- `yarn fix:dry` — preview auto-fixes (scheme, mountShared, main on single-service)
- `yarn fix` — apply auto-fixes (idempotent, `scripts/fix-manifests.mjs`)
- `yarn audit` — read-only i18n gap report (missing `en_US` / `pt_BR`)
- `yarn audit:verbose` — list every app missing translations
- `yarn audit:csv` — CSV output (spreadsheet prioritization)
- `yarn rebrand:dry` — preview CasaOS → RoqueOS sweep (importing upstream apps)
- `yarn rebrand` — apply rebrand (idempotent, `scripts/rebrand-casaos.mjs`)
- `yarn test` — Vitest unit tests for the validator/fixer scripts
- `yarn test:coverage` — coverage report
- IMPORTANT: **Yarn only.** No `npm` / `npx`, no `package-lock.json`.

## Repo shape

This repo is **data + tooling only** — no runtime, no build step for the catalog itself.

```text
Apps/<AppName>/         # one dir per app
  ├── docker-compose.yml   # required — Docker Compose v3.x with x-casaos metadata
  ├── icon.png             # required — 192×192 transparent PNG
  ├── screenshot-1.png     # required — at least one (1280×720)
  └── thumbnail.png        # optional — 784×442, for featured apps
schema/casaos-app.schema.json   # JSON Schema Draft-07 — the CI gate
scripts/*.mjs                   # validate / fix / audit / rebrand
category-list.json              # category definitions
recommend-list.json             # recommended apps
featured-apps.json              # featured apps for the App Store homepage
```

## Schema contract (highlights)

`schema/casaos-app.schema.json` (Draft-07) is the source of truth — `yarn validate` enforces it:

- `services.*.image` must be pinned with `:tag` OR `@sha256:digest`. Bare names **and** `:latest` are rejected (a small `UNPINNED_IMAGE_ALLOWLIST` in `validate-manifests.mjs` grandfathers legacy apps; new apps cannot use `:latest`).
- `x-casaos.architectures[]` — ≥ 1 from the enum (`amd64, arm, arm64, 386, mips64le, ppc64le, s390x, riscv64`).
- `x-casaos.main` — must reference a real service (required when multi-service).
- `x-casaos.category` — from the canonical enum (see schema; mirrored in `category-list.json`).
- `x-casaos.scheme` — `http` or `https`.
- `x-casaos.port_map` — matches a HOST port published by the principal service (required when multi-port, or with `network_mode: host`).
- `x-roqueos.mountShared` — strictly boolean (opt-in `/shared` filesystem bind; the RoqueOS-specific extension CasaOS clients ignore gracefully).

## Conventions

- **i18n** — `en_US` is mandatory in every `tagline` + `description`; `pt_BR` is encouraged (RoqueOS is BR-first). `yarn audit` reports gaps (advisory, never blocks merge).
- **Branding** — pinned image tags, `author: RoqueOS Team`, `developer:` pointing to the upstream maintainer, `tips.before_install` with deployment hints (replace default secrets, configure OAuth, etc.).
- **Conventional commits** — `feat(catalog): add <App>`, `fix(catalog): …`, `docs:`, `chore(release): vX.Y.Z`.
- **Versioning / releases** — semver tags only publish a release `appstore.zip` (PATCH = app add/fix, MINOR = new field/invariant/category, MAJOR = breaking schema change — coordinate with `roqueos-server`). Push to `main` runs CI but does not tag. See `CHANGELOG.md` (Keep a Changelog).
- **Git** — commit/push only when asked. Do not propose git commands unprompted.

## Detailed rules (cross-repo)

The cross-repo dev rules for the RoqueOS ecosystem are **centralized in the `roqueos-ecosystem` repo** (a sibling of this one). They are documentation read on demand by relative path, not auto-loaded. The catalog-specific rules live under `../roqueos-ecosystem/rules/containers/`:

| Rule                                                                                              | Covers                                                                                  |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [`containers/00-catalog-core.md`](../roqueos-ecosystem/rules/containers/00-catalog-core.md)       | Yarn-only, repo shape (data + tooling), conventional commits, semver release model, DoD |
| [`containers/10-schema-contract.md`](../roqueos-ecosystem/rules/containers/10-schema-contract.md) | Schema (Draft-07): required fields, regex, enums, image-pin rule, categories            |
| [`containers/20-validators.md`](../roqueos-ecosystem/rules/containers/20-validators.md)           | `scripts/*.mjs` (validate / fix / audit / rebrand) + invariants                         |
| [`containers/50-mount-shared.md`](../roqueos-ecosystem/rules/containers/50-mount-shared.md)       | `x-roqueos.mountShared` + the `MOUNT_SHARED_APPS` curated set                           |
| [`containers/60-rebranding.md`](../roqueos-ecosystem/rules/containers/60-rebranding.md)           | `rebrand-casaos.mjs` sweep for importing upstream CasaOS apps                           |

Cross-repo doc-sync mapping (changed X → update Y) lives in [`../roqueos-front/.claude/rules/97-docs-sync.md`](../roqueos-front/.claude/rules/97-docs-sync.md) (section "roqueos-containers-list"). The detailed source of truth for the schema/scripts remains the repo's own [`CONTRIBUTING.md`](./CONTRIBUTING.md) + [`schema/casaos-app.schema.json`](./schema/casaos-app.schema.json). Every PR that touches a manifest/schema/script keeps the matching rule + `CHANGELOG.md` in sync in the same effort.

## Cross-repo

This catalog is the **producer** in the `front ← containers-list` contract: `roqueos-server` fetches the published `appstore.zip` on boot (24h cache), parses each `x-casaos` manifest, and exposes the apps via `/catalog`; the RoqueOS App Store renders them. When changing the schema (renamed/removed fields, new enum values), change **this repo first**, then the server parser + the front, keeping rules and CHANGELOGs in sync, see ordering in [`../roqueos-ecosystem/README.md`](../roqueos-ecosystem/README.md).
