# Contributing to RoqueOS Containers List

*Also available in [Brazilian Portuguese](docs/pt-BR/CONTRIBUTING.md).*

Thank you for considering a contribution. The catalog gains from new apps, fixes to apps that broke, better store cards, translations and reports of what does not work.

## Code of Conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). By taking part you agree to it.

## Found a vulnerability?

Do not open a public issue. Follow [SECURITY.md](SECURITY.md).

## The project's rule

**An app is in the store because something proved it works, not because its manifest parses.** Every check in this repository exists because a broken app once passed the checks before it. A pull request that makes a check weaker, grows an allowlist or skips a premise to turn the CI green is sent back, even when the app is right.

## Ways to contribute

| You want to | Do this |
| --- | --- |
| Suggest an app | open a **New app** issue; the fit criteria are in [docs/ADDING-AN-APP.md](docs/ADDING-AN-APP.md) |
| Add an app | follow [docs/ADDING-AN-APP.md](docs/ADDING-AN-APP.md) step by step |
| Report an app that does not start or does not work | open a **Broken app** issue; [docs/WHEN-IT-BREAKS.md](docs/WHEN-IT-BREAKS.md) may already have the fix |
| Report a bug in the tooling (a false positive, a crash) | open a **Bug report** issue |
| Improve a store card or a translation | edit the manifest, then `yarn readme --app <App>` |
| Propose an app for retirement | open a **Broken app** issue with the evidence (archived repository, image gone, last release date) |

## Development setup

Node 24 (the version in [`.nvmrc`](.nvmrc)) and Yarn. **Yarn only**: no `npm`, no `npx`, no `package-lock.json`.

```bash
git clone https://github.com/roqueribeiro/roqueos-containers-list.git
cd roqueos-containers-list
yarn install
```

The checks a pull request must pass:

```bash
yarn validate
yarn revisao
yarn test
yarn docs:check
```

On Linux, `yarn boot <App>` starts an app for real. On any other system the pull request runs it on a GitHub Linux runner. Every command is in [docs/REFERENCE.md](docs/REFERENCE.md).

## Conventions

- **Pinned images**, never `:latest`. Prefer the image the upstream project publishes.
- **No secret in the manifest.** Declare it in `x-roqueos.gerar` ([docs/ADDING-AN-APP.md](docs/ADDING-AN-APP.md#3-secrets)).
- **Two languages.** `tagline` and `description` in `en_us` and `pt_br`, the Portuguese written as people in Brazil say it. Other languages the upstream already ships are kept.
- **`author: RoqueOS Team`** and `developer:` naming the upstream maintainer.
- **The store card is generated.** Never edit `Apps/<App>/README.md` by hand.
- **Shared folder.** `x-roqueos.mountShared: true` only for media servers, downloaders, file managers and library managers; add the app to `MOUNT_SHARED_APPS` in [`scripts/fix-manifests.mjs`](scripts/fix-manifests.mjs) too, so `yarn fix` keeps it.
- **Documentation without dashes.** Markdown under the repository root and `docs/` uses no em dash or en dash; `yarn docs:check` fails on them.
- **Every number in the documentation comes from the repository.** The counts in the README are checked against `Apps/`, and [docs/QUALITY.md](docs/QUALITY.md) is generated.

## Tooling changes

A change to `scripts/` or `schema/` comes with a test in `tests/unit/` that fails without the change. A new check is introduced with a test that fails when the check is removed. Update [CHANGELOG.md](CHANGELOG.md) and the matching page under `docs/`, in English and in Portuguese.

A new field in the manifest is a contract with `roqueos-server`: read [docs/HOW-IT-SHIPS.md](docs/HOW-IT-SHIPS.md#a-change-that-crosses-repositories) before using it in an app.

## Importing an app from the CasaOS store

```bash
cp -r path/to/CasaOS-AppStore/Apps/<AppName> Apps/
yarn rebrand
yarn fix
yarn validate
yarn revisao:app <AppName>
```

`yarn rebrand` rewrites the author, the CDN URLs and mentions in the text; it never touches the `x-casaos` namespace. An imported app still has to close the ten premises like any other.

## Pull request workflow

1. Fork, then branch from `main`.
2. Keep one subject per pull request: one app, or one tooling change.
3. Write the title as a [Conventional Commit](https://www.conventionalcommits.org/): `feat(catalog): add <App>`, `fix(<App>): ...`, `docs: ...`, `chore(release): vX.Y.Z`.
4. Fill in the template, including how you tested and on which architecture.
5. The CI must be green. A maintainer from [CODEOWNERS](.github/CODEOWNERS) reviews every merge.

Once merged, the change reaches the RoqueOS store from `main` within a day ([docs/HOW-IT-SHIPS.md](docs/HOW-IT-SHIPS.md)).

## Releasing (maintainers only)

Move the **Unreleased** section of the [CHANGELOG](CHANGELOG.md) under the new version, then push a tag `vX.Y.Z`. The `Build AppStore` workflow checks the manifests and publishes `appstore.zip` as a release. The version policy is in [docs/HOW-IT-SHIPS.md](docs/HOW-IT-SHIPS.md#releases).

## Trademarks and credit

"RoqueOS" and its logo are trademarks of LEVELHARD; see [TRADEMARK.md](TRADEMARK.md). The `x-casaos` manifest format comes from [CasaOS-AppStore](https://github.com/IceWhaleTech/CasaOS-AppStore), by IceWhaleTech.
