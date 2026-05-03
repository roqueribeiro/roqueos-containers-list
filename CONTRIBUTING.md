# Contributing to RoqueOS Containers List

Thanks for considering a contribution! This catalog ships **155+ Docker apps** to RoqueOS users with a single click. Quality and security of each manifest matter — the validator and the agents below help keep the bar high.

## 📋 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to its terms.

## 🚀 Quick contribution flow

```bash
# 1. Fork + clone
git clone https://github.com/<you>/roqueos-containers-list.git
cd roqueos-containers-list

# 2. Install validator dependencies (one-time)
yarn install

# 3. Add your app
mkdir -p Apps/<AppName>
# ... edit Apps/<AppName>/docker-compose.yml + add icon.png + screenshot-1.png

# 4. Validate locally (CI runs this — must be green)
yarn validate

# 5. Auto-fix what can be (scheme, mountShared, main on single-service)
yarn fix:dry             # preview
yarn fix                 # apply

# 6. Audit i18n gaps
yarn audit               # report missing en_US / pt_BR

# 7. Commit + open PR
git add Apps/<AppName>/
git commit -m "feat(catalog): add <AppName>"
git push origin <branch>
```

## 🛠️ Tooling reference

The repo ships **4 Node scripts** (no global installs — `yarn install` once):

| Command              | Script                                           | Purpose                                                                                  |
| -------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `yarn validate`      | `scripts/validate-manifests.mjs`                 | **CI gate.** ajv schema check + cross-field invariants. Fails CI if any manifest drifts. |
| `yarn fix:dry`       | `scripts/fix-manifests.mjs --dry-run --verbose`  | Preview auto-fixes (scheme, mountShared, main on single-service).                        |
| `yarn fix`           | `scripts/fix-manifests.mjs`                      | Apply auto-fixes (idempotent).                                                           |
| `yarn audit`         | `scripts/audit-enrichment.mjs`                   | Report i18n gaps (missing en_US / pt_BR in tagline + description). Read-only.            |
| `yarn audit:verbose` | same                                             | List every app missing translations.                                                     |
| `yarn audit:csv`     | same                                             | CSV output (for spreadsheet prioritization).                                             |
| `yarn rebrand:dry`   | `scripts/rebrand-casaos.mjs --dry-run --verbose` | Preview CasaOS → RoqueOS sweep (when importing apps from upstream).                      |
| `yarn rebrand`       | `scripts/rebrand-casaos.mjs`                     | Apply rebrand (idempotent).                                                              |

### What `yarn validate` enforces

Read [`schema/casaos-app.schema.json`](schema/casaos-app.schema.json) for the full contract. Highlights:

- `services.*.image` must include `:tag` OR `@sha256:digest`. **Bare names AND `:latest` are rejected** by the validator. A small allowlist (`UNPINNED_IMAGE_ALLOWLIST` in `scripts/validate-manifests.mjs`) grandfathers 21 legacy apps; new contributions cannot use `:latest` and existing entries should migrate to pinned tags or digests over time.
- `x-casaos.architectures[]` ≥ 1 from enum: `amd64, arm, arm64, 386, mips64le, ppc64le, s390x, riscv64`.
- `x-casaos.main` references a real service (required when multi-service).
- `x-casaos.category` from canonical enum (28 values; see schema).
- `x-casaos.scheme` is `http` or `https`.
- `x-casaos.port_map` matches a HOST port published by the principal service (or `network_mode: host`).
- Multi-port principal service requires `port_map` declared.
- `x-roqueos.mountShared` is strictly boolean.

Common error messages and fixes are documented in [`.github/ISSUE_TEMPLATE/new_app.md`](.github/ISSUE_TEMPLATE/new_app.md). For deeper troubleshooting, run with `--verbose`:

```bash
node scripts/validate-manifests.mjs   # default verbose
```

## 📁 App structure

Each app lives in its own directory under `Apps/`:

```text
Apps/
└── MyApp/
    ├── docker-compose.yml   # Required — accepted: .yml or .yaml
    ├── icon.png             # Required — 192×192 transparent PNG
    ├── screenshot-1.png     # Required — at least one (1280×720)
    ├── screenshot-2.png     # Optional — additional screenshots
    ├── screenshot-3.png     # Optional
    └── thumbnail.png        # Optional — 784×442, for featured apps
```

## 📄 Manifest template

```yaml
name: myapp # lowercase, alphanumeric + - _

services:
  myapp:
    container_name: myapp
    image: vendor/myapp:1.2.3 # PINNED tag (no :latest, no bare name)
    restart: unless-stopped
    ports:
      - target: 8080 # container port
        published: "8080" # host port (string)
        protocol: tcp # tcp | udp (lowercase only)
    environment:
      PUID: $PUID # placeholders resolved by the server
      PGID: $PGID
      TZ: $TZ
    volumes:
      - type: bind
        source: /DATA/AppData/$AppID/config # standard pattern for persistent config
        target: /config
    deploy:
      resources:
        reservations:
          memory: 256M

x-casaos:
  architectures:
    - amd64 # check upstream image: docker buildx imagetools inspect <image>
    - arm64
  main: myapp # required if multi-service
  category: Productivity # see CONTRIBUTING.md → Categories
  scheme: http # http | https
  port_map: "8080" # required if multi-port (must match `published` above)
  developer: Upstream Vendor
  author: RoqueOS Team
  icon: https://cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main/Apps/MyApp/icon.png
  screenshot_link:
    - https://cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main/Apps/MyApp/screenshot-1.png
  tagline:
    en_US: One-line description (max ~80 chars, no period)
    pt_BR: Descrição curta de uma linha
  description:
    en_US: |
      Long-form description. What it does, who it's for.
      Markdown OK — links, lists, code blocks.
    pt_BR: |
      Descrição longa traduzida.
  title:
    en_US: My App
  index: /

# RoqueOS extension (opt-in). Set to true ONLY for media servers,
# downloaders, file managers — apps that benefit from /shared cross-app
# filesystem access. See README → Tooling.
x-roqueos:
  mountShared: false
```

## ✅ Quality bar (PR checklist)

### Required

- [ ] `yarn validate` passes locally
- [ ] `icon.png` is 192×192 transparent PNG
- [ ] At least one `screenshot-1.png` (1280×720)
- [ ] Image is **pinned** (`:tag` or `@digest`, not `:latest` or bare)
- [ ] `architectures` matches what the upstream image actually publishes
- [ ] `category` from the canonical enum
- [ ] `tagline.en_US` + `description.en_US` present (gates discoverability)

### Encouraged

- [ ] `tagline.pt_BR` + `description.pt_BR` (RoqueOS is BR-first)
- [ ] `thumbnail.png` if the app deserves featured placement
- [ ] Default credentials documented in `tips.before_install`
- [ ] No hardcoded real secrets in `environment:` (use `$PUID`-style placeholders or empty)
- [ ] Review against [SECURITY.md](SECURITY.md) — no `/var/run/docker.sock` unless app is Portainer-class, no `privileged: true` without inline justification, no bind on system paths (`/`, `/etc`, `/var/lib`)

## 🌍 i18n policy

- **Mandatory**: `en_US` in `tagline` + `description`.
- **Encouraged**: `pt_BR` (RoqueOS is BR-first; ~89 apps still need pt_BR — sweep by category in batches).
- **Bonus**: any locale already provided by upstream (es_ES, zh_CN, ja_JP, ko_KR, fr_FR, de_DE, etc.) — keep them.
- **Don't translate to all 10 RoqueOS UI languages.** Maintenance cost is real; en_US + pt_BR is the realistic target.

Run `yarn audit:verbose` to see the current pt_BR backlog.

## 🐳 Importing an app from upstream CasaOS-AppStore

```bash
# 1. Copy the directory
cp -r path/to/CasaOS-AppStore/Apps/<AppName> Apps/

# 2. Rebrand (CasaOS → RoqueOS sweep, idempotent)
yarn rebrand

# 3. Apply auto-fixes (scheme, mountShared if curated, main if single-service)
yarn fix

# 4. Validate
yarn validate

# 5. Audit i18n
yarn audit
```

The `rebrand` script handles **author**, CDN URLs, default credentials, free-text mentions in descriptions/tips. It **does not** touch the `x-casaos:` YAML namespace (that's the parser contract — see [SECURITY.md](SECURITY.md) for what stays preserved).

## 🏷️ Categories

```
Utilities, Utility, Media, Gallery, Network, VPN, WEB,
Developer, Development, Database, Home Automation, HomeAutomation,
Productivity, Notes, Documents, Storage, Cloud, Backup, File Sync,
Downloader, Security, AI, Gaming, Games, Communication, Chat,
Finance, Other
```

Variants (e.g., `Utility` ↔ `Utilities`, `Games` ↔ `Gaming`) are normalized by the server. For new apps, **prefer the plural canonical form** (`Utilities`, `Games`).

## 🌐 `x-roqueos.mountShared` — when to opt in

Set `mountShared: true` only when the app benefits from cross-app `/shared` filesystem access:

- **Media servers** — read media from `/shared/media`
- **Downloaders** — write to `/shared/downloads`
- **File managers / sync** — explicit shared workspace
- **\*arr stack** companions — verify links
- **Game library managers** — read ROMs from `/shared/roms`

If you add a new app to one of these categories, also add it to the `MOUNT_SHARED_APPS` set in [`scripts/fix-manifests.mjs`](scripts/fix-manifests.mjs) so future contributors can rely on `yarn fix` to auto-inject the field.

## 📝 Commit style

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(catalog): add <AppName>`
- `fix(<App>): correct port_map mismatch`
- `chore(catalog): rebrand 5 imports from upstream`
- `docs(contributing): clarify validation flow`

## 🐛 Reporting issues

Use [Issues](https://github.com/roqueribeiro/roqueos-containers-list/issues/new/choose) with the appropriate template:

- 🐛 **Bug Report** — broken manifest, validator false positive
- 📦 **New App** — suggest adding an app you'd like
- 🚨 **Security** — for malicious image / supply-chain concerns, see [SECURITY.md](SECURITY.md). **Don't open public issue.**

## 📜 Trademarks

The "RoqueOS" name and logo are trademarks of LEVELHARD. See [TRADEMARK.md](TRADEMARK.md) for usage rules.

## 🙏 Acknowledgments

This catalog format is compatible with [CasaOS-AppStore](https://github.com/IceWhaleTech/CasaOS-AppStore) — credit to **IceWhaleTech** for the original `x-casaos` manifest specification.
