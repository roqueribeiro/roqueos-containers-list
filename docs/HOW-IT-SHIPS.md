# How a change reaches the store

*Also available in [Brazilian Portuguese](pt-BR/COMO-CHEGA.md).*

> **For:** whoever maintains the catalog: merges pull requests, keeps the evidence current, cuts a release or has to undo one.
> **What is here:** how a merge reaches the store, who reads what, releases, changes that cross repositories, the routine, refreshing the evidence, undoing each step, backup, and what to watch.
> **Where to go for the rest:** what each check proves in [TESTING.md](TESTING.md); what to do when an app fails in [WHEN-IT-BREAKS.md](WHEN-IT-BREAKS.md); every command in [REFERENCE.md](REFERENCE.md).

There is no build step for the catalog. A manifest merged into `main` is what users install, so `main` is production.

## The path

1. **A pull request** changes `Apps/<App>/`. The CI runs the schema, the ten premises, the unit tests, the documentation check and the boot test of the apps it touches ([TESTING.md](TESTING.md)).
2. **A maintainer reviews it** ([CODEOWNERS](../.github/CODEOWNERS)) and merges it into `main`.
3. **The RoqueOS server reads `main`** through the GitHub contents API and keeps it for 24 hours. A server that started or refreshed its cache after the merge shows the new card; the others show it within a day.
4. **A person installs.** The server renders the system variables and the generated secrets, then deploys every service of the manifest as one stack.

## Who reads what

| Reader | Source | Freshness |
| --- | --- | --- |
| RoqueOS App Store (through `roqueos-server`) | `main`, through the GitHub contents API | within 24 hours of the merge |
| A CasaOS-compatible dashboard pointed at the archive | `https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip` | on the dashboard's own refresh |
| A dashboard pinned to a release | `appstore.zip` attached to a GitHub release | frozen at that release |

## Releases

The `Build AppStore` workflow builds `appstore.zip` on every push to `main` and every pull request to `main`, as a CI artifact. A tag `vX.Y.Z` (or `vX.Y.Z-pre`) also publishes it as a GitHub release, after the schema check passes.

**Current state, read from the repository:** no semantic version tag has been cut yet. The latest release is `v20260421-224749`, from the timestamp scheme used before the semantic version policy; every change after it is under **Unreleased** in the [CHANGELOG](../CHANGELOG.md). RoqueOS does not depend on releases, because it reads `main`. The policy for the first and every later tag:

| Bump | When |
| --- | --- |
| PATCH | an app added, fixed or removed; a documentation change |
| MINOR | a new field under `x-casaos` or `x-roqueos`, a new premise or invariant, a new category |
| MAJOR | a field renamed or removed, an enum value changed: anything an existing reader would misread |

## A change that crosses repositories

The catalog is the producer, `roqueos-server` parses it and `roqueos-front` draws it. A manifest that uses a field the published server does not understand reaches users the moment it lands in `main`, so a new contract ships in this order:

1. **`roqueos-server`** learns the field, is merged and its image is published.
2. **`roqueos-front`** shows it, and is deployed.
3. **Only then** the catalog starts using it in `main`.

`x-roqueos.gerar` is the example: a server that did not generate secrets would have installed the literal text `${DB_PASSWORD}` as a database password. It reached `main` only after `roqueos-server` 1.38.0 was published. The map of the repositories and their contracts is kept by the maintainers.

## Removing an app

Removing a folder removes the card for new installs; it does not touch an app someone already runs. The decision and its evidence go to [RETIRED.md](RETIRED.md) in the same pull request.

## The routine

| What | When | Where it runs | Source |
| --- | --- | --- | --- |
| Schema, premises, unit tests, documentation check | every pull request, and every push to `main` that touches what each workflow watches | GitHub Actions | [`.github/workflows/`](../.github/workflows/) |
| Boot of the apps a pull request touches | every pull request that changes an `Apps/*/docker-compose.yml` | GitHub `ubuntu-latest` runner | [`boot.yml`](../.github/workflows/boot.yml) |
| Boot of the whole catalog | weekly, Sunday at 04:17 UTC (`17 4 * * 0`); stops at 90 minutes | GitHub `ubuntu-latest` runner | [`boot.yml`](../.github/workflows/boot.yml) |
| Boot evidence into the repository | by hand, after boot runs worth keeping | the maintainer's machine | [`scripts/evidencia-boot.mjs`](../scripts/evidencia-boot.mjs) |
| The user each image runs as | by hand, when an image tag changes | the maintainer's machine | [`scripts/uid-imagem.mjs`](../scripts/uid-imagem.mjs) |

## Refreshing the evidence

The `Boot` workflow uploads one JSON per app as the `boot` artifact, and the artifact expires. To keep a result, download it and fold it into [`evidence/boot.json`](evidence/boot.json), then regenerate the quality page so its numbers follow:

```bash
gh run download <run> -n boot -D /tmp/boot-<run>
node scripts/evidencia-boot.mjs <run>@<date-iso>@/tmp/boot-<run>
yarn docs:quality
yarn docs:check
```

Runs are applied in the order given: a later run overwrites the result of an earlier one. When an image tag changes, refresh the user P10 reads, offline, from [`scripts/dados/uid-imagens.json`](../scripts/dados/uid-imagens.json):

```bash
yarn uid:atualiza
yarn revisao:app <App>
```

## Cutting a release

No semver tag has been cut yet. When one is, the tag is the only trigger the `Build AppStore` workflow needs to publish `appstore.zip` as a release:

```bash
git tag v1.0.0
git push origin v1.0.0
```

A tag with a suffix (`v1.0.0-beta.1`) is published as a pre-release. Move the **Unreleased** entries of the [CHANGELOG](../CHANGELOG.md) under the new version in the same change.

## Undoing

| Step | How to undo it | What stays |
| --- | --- | --- |
| A merge into `main` | a pull request with `git revert -m 1 <merge-commit>`, through the same review | servers that already refreshed keep the bad card until their 24 hour cache expires |
| An install someone already made | nothing in this repository undoes it: removing or reverting an app does not touch a running stack | the container keeps running on that server |
| A removed app | revert the removal commit; the old manifest is in the history, in the commit before the removal ([RETIRED.md](RETIRED.md)) | |
| A release | delete the GitHub release and the tag; a dashboard that already downloaded the archive keeps it | the archive on readers that pinned it |
| A boot evidence update | revert the commit that changed [`evidence/boot.json`](evidence/boot.json) and run `yarn docs:quality` | |

## Backup and restore

The catalog is the git repository: every manifest, icon, store card and the boot evidence are versioned, and GitHub holds the copy the store reads. What is **not** in git is regenerable: `.revisao/` (run `yarn revisao`), `.boot/` (run `yarn boot` on Linux) and `node_modules/` (run `yarn install`). The boot artifacts of the CI are the one thing that is lost when they expire, which is why the results worth keeping go to `evidence/boot.json`.

Data that people's apps write lives on their servers, under `/DATA/AppData/<app>/`, and is outside this repository.

## What to watch

| Signal | Healthy | Where |
| --- | --- | --- |
| The badges of `Validate Manifests`, `Test` and `Boot` | green on `main` | [README.md](../README.md) |
| Apps with all ten premises closed | every app in `Apps/` | [QUALITY.md](QUALITY.md), `yarn revisao` exits 0 |
| The documentation check | `docs ok: ...` and exit 0 | `yarn docs:check` |
| Apps with no recorded boot | going down over time | [QUALITY.md](QUALITY.md) |
| Inconclusive boots | each one with a lab reason, never an app failure in disguise | [`evidence/boot.json`](evidence/boot.json) |
