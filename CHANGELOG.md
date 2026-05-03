# Changelog

All notable changes to the **RoqueOS Containers List** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for the catalog release ZIPs.

> **Versioning policy** (since v1.0.0):
>
> - **PATCH** (`v1.0.x`) — app additions/updates, manifest fixes, doc tweaks. Backwards-compatible for `roqueos-server` consumers.
> - **MINOR** (`v1.x.0`) — new fields in `x-casaos` / `x-roqueos`, new validation invariants, new categories. Backwards-compatible.
> - **MAJOR** (`v2.0.0+`) — breaking schema changes (renamed/removed fields, changed enum values). Coordinate with `roqueos-server`.

## [Unreleased]

### Added

- **53 new apps across 4 themed waves** (catalog 152 → 205+ valid manifests). Closes critical category gaps identified in the 2026-05-03 audit and surpasses the CasaOS Official catalog (~180 apps), narrowing the gap to Big Bear (~250). All 53 manifests follow the RoqueOS branding policy: pinned image tags (no `:latest`), `tagline` + `description` in **en_us + pt_br**, `category` from the schema enum, `tips.before_install` populated with deployment hints (replace default secrets, configure OAuth, etc.), `author: RoqueOS Team`, `developer:` pointing to the upstream maintainer.

  **Wave A — Search, Monitoring, Auth, Bookmarks** (15 apps, PR #6):
  - Search: Searxng, Whoogle, Meilisearch
  - Monitoring/Dashboard: Homepage, Beszel, Prometheus, InfluxDB, Loki
  - Auth & Security: Authelia, Authentik, CrowdSec
  - Bookmarks: Linkwarden, Linkding, Hoarder, Shiori

  **Wave B — Productivity, Photo, Wiki/Knowledge** (12 apps, PR #7):
  - Office: OnlyOffice, Collabora, Stirling-PDF, Etherpad
  - Photo Gallery: Lychee, Piwigo, LibrePhotos
  - Documents/Recipes: Paperless-ngx, Mealie
  - Wiki: BookStack, Wiki.js, Outline

  **Wave C — Communication, Development, Smart Home** (12 apps, PR #8):
  - Communication: Matrix Synapse, Snappymail, Roundcube, Mattermost
  - Development: code-server, Heimdall, Forgejo, Vikunja
  - Smart Home: Frigate, Zigbee2MQTT, Mosquitto, Domoticz

  **Wave D — AI, Storage, Workflow, completed 3 incompletos** (14 apps, PR #9):
  - AI/ML: LocalAI, ComfyUI, Tabby, CyberChef
  - Storage: Seafile, MinIO, Kopia, SFTPGo, Filestash
  - Workflow: Activepieces, Glance
  - **Completed 3 incompletos** (folders existed with assets but lacked `docker-compose.yml`):
    - Jellyseerr (`fallenbagel/jellyseerr:2.4.1`) — Plex/Jellyfin/Emby request manager
    - Trilium (`triliumnext/notes:0.91.6`) — switched to TriliumNext active community fork (original `zadam/trilium` was archived)
    - Logseq (`logseq/logseq-publish-server`) — read-only graph viewer with prominent `tips` section explaining there is no Logseq editing server (Logseq is an Electron desktop app)

  **`code-server` and `heimdall`** were in `recommend-list.json` but didn't exist in the catalog — both now resolve.

- **`featured-apps.json` expanded from 5 → 13 apps** to showcase the catalog breadth: portainer, nextcloud, jellyfin, homeassistant, code-server, immich, vaultwarden, authentik, frigate, linkwarden, onlyoffice, paperlessngx, uptimekuma. Drives the "featured" section of the RoqueOS App Store.

### Substitutions vs original Wave plan

A few apps were substituted during execution because the originally-planned image had stability/licensing issues, or because the planned app was already in the catalog (caught at planning step):

- `UptimeKuma` → already exists, replaced with **Homepage** (Wave A).
- `Audiobookshelf`, `Readarr` → already exist, replaced with **Paperless-ngx** and **Mealie** (Wave B).
- `Mailcow` (50+ container stack) → **Snappymail** (single-container webmail, Wave C).
- `Gitness` (unclear OSS status) → **Vikunja** (Wave C).
- `Open Interpreter` (floating tag) → **CyberChef** (Wave D).
- `Huginn` (only `:latest`) → **Glance** (Wave D).

### Security

- **Image pinning is now enforced by the validator.** `scripts/validate-manifests.mjs` rejects any new app whose `services[*].image` is bare (`vendor/image`) or ends with `:latest`. The check uses the existing `isImagePinned()` helper from `fix-manifests.mjs` (previously exported but never wired into the validate pipeline).

  Allowing `:latest` in a curated app catalog is a real supply-chain risk — the consumer (`roqueos-server`) pulls whatever an upstream maintainer publishes whenever they publish. A compromised upstream account silently propagates to every RoqueOS user.

  The 21 apps that ship with `:latest` today are frozen in `UNPINNED_IMAGE_ALLOWLIST` (visible at the top of the validator). Adding to this set is a regression that must be defended in PR review. Removing entries — by switching the manifest to a real semver tag or a `@sha256:` digest — is the goal.

  Allowlisted today: `AnythingLLM`, `ArchiveBox`, `Dify`, `DuckDNS`, `Excalidraw`, `Firefly`, `Homebridge`, `JDownloader2`, `LibreChat`, `Maybe`, `MineOS`, `Pinchflat`, `Pingvin-Share`, `RagFlow`, `RetroArch`, `StableDiffusionWebUI`, `Threadfin`, `Unifi-Network-Application`, `VirtualMachineManager`, `oPodSync`, `playit-agent`.

  Closes a finding from the 2026-05-03 systematic audit.

### Added

- **`tests/unit/image-pinning.test.mjs`** — 11 tests covering `isImagePinned` edge cases (undefined, bare names, `:latest` suffix, semver, digest), the new `imagePinningCheck` function (multi-service docs, `build:`-only services, empty docs), and the allowlist contract (size assertion + spot checks). Adding to or removing from `UNPINNED_IMAGE_ALLOWLIST` requires updating the spec — explicit by design.

### Changed

- **`vite` added as explicit `devDependency`.** Was previously satisfied as a transitive peer of `vitest@4.x`, which started warning when `node_modules` was rebuilt. Pinning it here removes the warning and makes the build deterministic.

First semver-tagged release. Marks the stable contract for catalog consumers (`roqueos-server` + any third-party CasaOS-compatible client).

### Added

- **155+ Docker app manifests** in CasaOS-compatible format under `Apps/`.
- **JSON Schema** (`schema/casaos-app.schema.json`, Draft-07) enforced by CI on every PR. Required fields: `architectures`, `main` (when multi-service), `category`, `scheme`. Conditional: `port_map` when principal service exposes multiple ports.
- **Cross-field validators** (`scripts/validate-manifests.mjs`) — beyond JSON Schema, enforces:
  - `x-casaos.main` must reference a real service.
  - `x-casaos.port_map` must be a HOST port published by the principal service (with proper extraction from string-form `'host:container'` and respect for `network_mode: host`).
  - Multi-port principal service requires `port_map` declared.
- **Auto-fixer** (`scripts/fix-manifests.mjs`) — idempotent script that:
  - Injects `x-casaos.scheme` (https when port 443 published, else http).
  - Injects `x-roqueos.mountShared: true` for curated app set (~49 media servers, downloaders, file managers).
  - Injects `x-casaos.main` for single-service stacks (the answer is unambiguous).
- **i18n audit** (`scripts/audit-enrichment.mjs`) — read-only report of translation gaps. Helpers `hasLocale`, `nonEmptyString`, `hasScreenshots`. CSV output for prioritization.
- **Idempotent rebrand** (`scripts/rebrand-casaos.mjs`) — sweeps CasaOS upstream branding to RoqueOS where cosmetic, preserves where it carries technical meaning (the `x-casaos:` namespace stays — it's the parser contract).
- **`x-roqueos` namespace extension** — `mountShared: boolean` for opt-in `/shared` filesystem bind in containers.
- **CI workflow** (`.github/workflows/validate-schema.yml`) blocks merge if any manifest drifts from schema or cross-field invariants.
- **Release workflow** (`.github/workflows/build-appstore.yml`) bundles `Apps/` + JSON metadata into `appstore.zip` published to GitHub releases. **Triggered by semver tag push** (was previously timestamp-based — see Breaking Changes).
- **`CONTRIBUTING.md`** rewritten with full tooling reference, manifest template, quality bar checklist, i18n policy, mountShared guidance, upstream import flow.
- **`SECURITY.md`** with disclosure policy and threat model for malicious manifests.
- **`CODE_OF_CONDUCT.md`** (Contributor Covenant v2.1).
- **`TRADEMARK.md`** clarifying MIT License doesn't extend to RoqueOS/LEVELHARD marks.
- **GitHub issue templates** (`bug_report.md`, `new_app.md`, `config.yml`).
- **PR template** with submission checklist.
- **README.md** — badges, 3 quick-start options, full categories, tooling section, CasaOS upstream attribution.

### Changed (vs. CasaOS-AppStore upstream)

- All 155 manifests rebranded via `yarn rebrand`:
  - `author: CasaOS Team` → `RoqueOS Team` (where appropriate).
  - CDN URLs from `IceWhaleTech/CasaOS-AppStore` → `roqueribeiro/roqueos-containers-list`.
  - Default credentials in env + `tips:` markdown: `casaos` → `roqueos`.
  - Free-text mentions of CasaOS in descriptions/tips → RoqueOS (where cosmetic).
  - **Preserved**: `x-casaos:` YAML namespace (parser contract), schema filename, "CasaOS Compatible" badges (factual claim), bind mount paths.

### Breaking Changes

- **Release tags migrated from timestamps to semver.** Previously, every push to `main` created a tag like `v20260502-195600` automatically. Now releases are triggered ONLY by pushing semver tags (`vX.Y.Z`). This was needed so `roqueos-server` consumers can pin a stable catalog version without risk of unexpected breaking changes between commits.
  - **Impact on consumers**: the `releases/latest/download/appstore.zip` URL still works (always points to the most recent release).
  - **Impact on contributors**: pushing to `main` no longer creates a release. Maintainers must run `git tag -a vX.Y.Z -m "..." && git push origin vX.Y.Z`.

### Security

- All 155 manifests audited for hardcoded credentials. No real secrets exposed; default credentials documented in `tips.before_install`.
- 21 apps still use `:latest` (backlog tracked in audit) — `audit-enrichment.mjs` reports them; planned for follow-up PRs by category (AI tools first: Dify, AnythingLLM, RagFlow, LibreChat).
- 7 apps use `privileged: true` (ttydbridge, V2rayA, RagFlow, HomeAssistant, HoloPlay, Handbrake, EmulatorJS) — all legitimate but lack inline justification comments. Backlog item.
- 6 apps bind `/var/run/docker.sock` (Netdata, RagFlow, Portainer, OpenHands, Glances, FileFlows) — all justified by app purpose.

---

## Historical releases

Releases tagged with timestamps (e.g., `v20260502-195600`) prior to v1.0.0 are still available at <https://github.com/roqueribeiro/roqueos-containers-list/releases>. They were continuous builds from `main` without semantic versioning. From v1.0.0 onwards, only semver tags trigger releases.

Changes prior to this changelog are reconstructible from the commit history.

---

[Unreleased]: https://github.com/roqueribeiro/roqueos-containers-list/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/roqueribeiro/roqueos-containers-list/releases/tag/v1.0.0
