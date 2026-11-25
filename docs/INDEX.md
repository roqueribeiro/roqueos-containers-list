# RoqueOS Containers List documentation

*Also available in [Brazilian Portuguese](pt-BR/INDEX.md).*

> **For:** anyone who arrives at the documentation and wants the one page that answers their question.
> **What is here:** every document of the repository by what it answers, the evidence files, and the diagrams with their sources.
> **Where to go for the rest:** the overview is the [README](../README.md); the manifest of this set is [`docs.json`](docs.json).

Where to start depends on what you want. Every document below has a pair under [`docs/pt-BR/`](pt-BR/INDEX.md); the English one is the main version.

| I want to... | Read |
| --- | --- |
| **Install an app, or use the catalog from another dashboard** | [GETTING-STARTED.md](GETTING-STARTED.md): the RoqueOS App Store, a CasaOS-compatible dashboard, and the checks on your own machine |
| **Add an app** | [ADDING-AN-APP.md](ADDING-AN-APP.md): the folder, the manifest, the secrets, the README, the checks and the pull request |
| **Contribute in general** | [../CONTRIBUTING.md](../CONTRIBUTING.md) |
| **Know what is proven and how** | [TESTING.md](TESTING.md): the ten premises, the boot test, what still has no automatic coverage |
| **See the state of every app** | [QUALITY.md](QUALITY.md): generated from the repository, app by app |
| **Understand how the catalog is built inside** | [ARCHITECTURE.md](ARCHITECTURE.md): who reads it, the tooling, the flows, the decisions and the limits |
| **Look up a manifest field, a command or a workflow** | [REFERENCE.md](REFERENCE.md) |
| **Read the catalog from another system** | [INTEGRATIONS.md](INTEGRATIONS.md): the URLs, what the RoqueOS server reads, how a contract change ships |
| **Understand how a change reaches the store, or operate it** | [HOW-IT-SHIPS.md](HOW-IT-SHIPS.md): `main`, the server cache, releases, the routine, undoing, backup, what to watch |
| **Fix an app that does not start** | [WHEN-IT-BREAKS.md](WHEN-IT-BREAKS.md): symptom, cause, what to do |
| **Know why an app left the store** | [RETIRED.md](RETIRED.md) |
| **Find a term** | [GLOSSARY.md](GLOSSARY.md) |
| **Report a vulnerability** | [../SECURITY.md](../SECURITY.md) |
| **See what changed** | [../CHANGELOG.md](../CHANGELOG.md) |

## Evidence kept in the repository

| File | What it holds | Written by |
| --- | --- | --- |
| [`evidence/boot.json`](evidence/boot.json) | the latest boot result of each app that is still in the store, with the CI run and the date | `node scripts/evidencia-boot.mjs`, from the artifacts of the `Boot` workflow |
| [`QUALITY.md`](QUALITY.md) and [`pt-BR/QUALIDADE.md`](pt-BR/QUALIDADE.md) | the state of the store and of every app | `yarn docs:quality` |
| `Apps/<App>/README.md` | each app's store card | `yarn readme` |

`yarn docs:check` regenerates the generated pages in memory and fails when the committed version differs, so these files cannot drift from the manifests.

## Diagrams

| Diagram | Source | Explained in |
| --- | --- | --- |
| Context: who reads the catalog | Mermaid in [ARCHITECTURE.md](ARCHITECTURE.md#2-context-who-reads-it-and-what-it-depends-on) | the same section |
| Sequence: from a pull request to the store | Mermaid in [ARCHITECTURE.md](ARCHITECTURE.md#5-flow-from-a-pull-request-to-the-store) | the same section |
| Sequence: the boot test | Mermaid in [ARCHITECTURE.md](ARCHITECTURE.md#6-flow-the-boot-test) | the same section and [TESTING.md](TESTING.md) |
| README banner and brand | `docs/assets/marca/gen.py`, from `carimbo.json` | `docs/assets/marca/README.md` (Portuguese only) |
