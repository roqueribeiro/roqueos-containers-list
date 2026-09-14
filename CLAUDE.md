# RoqueOS Containers List

Self-hosted **Docker app catalog** for RoqueOS — 252 ready-to-deploy apps in CasaOS-compatible Docker Compose manifests (`x-casaos` namespace). The catalog itself is the `Apps/` directory; this repo also ships the Node tooling that validates, auto-fixes, audits and rebrands those manifests. A semver tag publishes `appstore.zip`, consumed by the RoqueOS App Store (via `roqueos-server`) and by any CasaOS-compatible client.

This is one of the **nine repos** that form RoqueOS. The ecosystem map (sibling repos, how they connect, cross-repo change ordering) is [`../roqueos-ecosystem/README.md`](../roqueos-ecosystem/README.md), and the cross-repo rules are in `../roqueos-ecosystem/rules/`. Neither is auto-loaded: read them on demand when a task crosses repos.

## Commands

- `yarn install` — install validator deps (one-time; no global installs)
- `yarn validate` — **CI gate.** `ajv` schema check + cross-field invariants (`scripts/validate-manifests.mjs`)
- `yarn fix:dry` — preview auto-fixes (scheme, mountShared, main on single-service)
- `yarn fix` — apply auto-fixes (idempotent, `scripts/fix-manifests.mjs`)
- `yarn revisao` — **CI gate.** As nove premissas da loja, app a app (`scripts/revisao-container.mjs`). Sai 1 enquanto houver pendente; evidencia em `.revisao/<app>.json`
- `yarn revisao:app <App>` — o veredito de um app so, no terminal
- `yarn revisao:pendentes` — a fila, um nome por linha
- `yarn enrichment` — relatorio de lacuna de i18n. Use ESTE, nao `yarn audit`: o yarn tem um subcomando `audit` proprio e ele ganha, entao `yarn audit` nunca roda o script do repo
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
  ├── icon.png             # required — PNG quadrado, minimo 192px (usamos 512)
  ├── README.md            # required — a ficha da loja, gerada por yarn readme
  ├── screenshot-1.png     # opcional — a loja nao desenha (ver Goal 18)
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

## O padrão da loja: as nove premissas

`yarn validate` prova que o YAML é um compose. **`yarn revisao` prova que o app
está pronto para a loja.** Em 14/09/2026 o repo estava `205 ok, 0 failed` no
primeiro e `0 de 205 fechado` no segundo — verde e, ainda assim, com 54 ícones
quebrados em produção e 56 apps mostrando "\<app\> Docker application" como
descrição.

| # | Premissa | O que o gate exige |
|---|----------|--------------------|
| P1 | Compatibilidade | `x-casaos.main` resolve um serviço, `architectures` não vazio, e a categoria existe no `CATEGORY_MAP` do `roqueos-server` — o que não existe lá cai em `other` na loja, em silêncio |
| P2 | Portas | toda porta publicada tem descrição; porta host disputada com outro app é declarada em `x-roqueos.portaCompartilhada` |
| P3 | Variáveis | nenhum segredo literal adivinhável, e nenhum placeholder que ninguém substitui |
| P4 | Configuração | imagem com tag exata ou digest, nunca `:latest`; volume sob `/DATA/` ou montagem de sistema conhecida; `restart` presente |
| P5 | Privilégio | `privileged`, `network_mode: host`, `cap_add` e volume de host só com motivo escrito em `x-roqueos.motivo` — a regra não é remover de quem precisa, é obrigar a dizer por quê |
| P6 | README | a ficha da loja, com o quê, portas, volumes, variáveis, primeiro acesso e fonte oficial |
| P7 | Texto | `tagline` e `description` em `en_us` **e** `pt_br`, nessa grafia |
| P8 | Ícone | PNG quadrado de no mínimo 192px que **existe no repo** |
| P9 | Coerência | sem `appfile.json`: formato morto que ninguém consome |

### Três armadilhas que já custaram caro aqui

**Confira a coisa, não o campo.** O `audit-enrichment.mjs` dizia `icon present
205/205` enquanto 54 apps davam 404 no CDN: ele conferia se o campo existia no
manifesto, não se o arquivo existia. O mesmo erro deixou 56 descrições caírem no
fallback do server.

**A grafia do idioma é contrato.** O catálogo escrevia `pt_br`, `pt_PT` e
`pt_BR`; o server lê `en_us` e `pt_br`, minúsculo. O que não bate não existe
para ele. Ao importar app de upstream, rode `yarn revisao` antes de achar que
está pronto.

**Gate que cobra o invisível ensina a ignorar gate.** `thumbnail` e
`screenshot` saíram da P8 porque o server não os lê e a loja não os desenha.
Quando passar a desenhar, a checagem volta — com significado.
