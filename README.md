<p align="center">
  <a href="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/validate-schema.yml"><img alt="Validate Manifests" src="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/validate-schema.yml/badge.svg"></a>
  <a href="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/test.yml"><img alt="Test" src="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/test.yml/badge.svg"></a>
  <a href="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/boot.yml"><img alt="Boot" src="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/boot.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-007aff"></a>
  <a href="docs/QUALITY.md"><img alt="220 apps" src="https://img.shields.io/badge/apps-220-007aff"></a>
  <img alt="amd64 and arm64" src="https://img.shields.io/badge/arch-amd64%20%C2%B7%20arm64-5856d6">
  <a href="#project-status"><img alt="Status: curated" src="https://img.shields.io/badge/status-curated-34c759"></a>
</p>

<p align="center">
  <a href="docs/GETTING-STARTED.md"><b>Get started</b></a> ·
  <a href="docs/ADDING-AN-APP.md"><b>Add an app</b></a> ·
  <a href="docs/QUALITY.md">Store quality</a> ·
  <a href="docs/INDEX.md">Documentation</a> ·
  <a href="docs/REFERENCE.md">Reference</a> ·
  <a href="README.pt-BR.md">Português (Brasil)</a>
</p>

---

> [!TIP]
> **New here?** [GETTING-STARTED.md](docs/GETTING-STARTED.md) shows how to install an app from the RoqueOS App Store, how to use this catalog from any CasaOS-compatible dashboard, and how to run the checks on your own machine.

**RoqueOS Containers List is the curated catalog of self-hosted apps behind the RoqueOS App Store: 220 apps, each one a Docker Compose manifest that has to pass ten static premises before it reaches anyone's server, and that is started for real on a Linux runner, and must answer on the port its store card promises, whenever a pull request touches it.** It is data and tooling only: the manifests live in [`Apps/`](Apps/), and the Node scripts in [`scripts/`](scripts/) validate, review, boot and document them.

> [!NOTE]
> **The store reads the `main` branch.** A merged pull request is in the RoqueOS App Store within the server's 24 hour catalog cache, so `main` is held to the same bar as a release. The state of every app is generated from this repository in [docs/QUALITY.md](docs/QUALITY.md), and the documentation gate fails when that page is out of date or when the app count in the README disagrees with `Apps/`.

## Contents

- [Get started](#get-started)
- [Why it exists](#why-it-exists)
- [How an app gets into the store](#how-an-app-gets-into-the-store)
- [What keeps it honest](#what-keeps-it-honest)
- [Secrets are generated, never written](#secrets-are-generated-never-written)
- [When an app leaves](#when-an-app-leaves)
- [Project status](#project-status)
- [Known limits](#known-limits)
- [Documentation](#documentation)
- [Contributing, security and license](#contributing-security-and-license)
- [Languages](#languages)

## Get started

**In RoqueOS**, open the App Store: this catalog is its default store. Pick an app, press **Install**, and the server deploys every service of the manifest (the app, its database, its cache), with folders under `/DATA/AppData/<app>` and secrets generated for your server. When the app needs a login password, it is shown once, right after installing.

**In a CasaOS-compatible dashboard**, add this catalog as an app store with the archive of `main`:

```text
https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip
```

Manifests use the `x-casaos` namespace, so CasaOS clients read them as they are and ignore the RoqueOS extensions under `x-roqueos`.

**To work on the catalog**, with Node 24 and Yarn:

```bash
yarn install
yarn validate && yarn revisao && yarn test
```

The full path, including the boot test that only runs on Linux, is in [GETTING-STARTED.md](docs/GETTING-STARTED.md).

## Why it exists

A broken app in a curated store is worse than a missing one. The person who installs it trusts the store, and an app that restarts forever, writes into the wrong folder or ships a password everyone knows does damage on a machine that belongs to someone else.

The catalog started as a large import of community manifests. Measured on 17/11/2026, it carried apps whose upstream had been archived, images that no longer existed, devices that only exist on a Raspberry Pi, and session keys written in the public repository. Every one of those passed a schema check. The rule since then:

> **An app is in the store because something proved it works, not because nothing proved it broken.**

## How an app gets into the store

| Step | What happens | Where |
| --- | --- | --- |
| **Manifest** | A `docker-compose.yml` with `x-casaos` metadata, an `icon.png` and a `README.md` generated from the manifest | `Apps/<App>/` |
| **Schema** | Draft-07 JSON Schema plus cross-field invariants: pinned image, real `main` service, `port_map` matching a published port, canonical category | `yarn validate` |
| **Ten premises** | Compatibility, ports, secrets, configuration, privilege, README, text in English and Brazilian Portuguese, icon, coherence, write permission on the data folder | `yarn revisao` |
| **Boot on Linux** | The compose starts on a GitHub Linux runner, no service restarts, and the port the store card promises answers | workflow `Boot` |
| **Review** | A maintainer reads the diff; the CODEOWNERS file names who | pull request |
| **Store** | Merged into `main`, it is what the RoqueOS server serves | [HOW-IT-SHIPS.md](docs/HOW-IT-SHIPS.md) |

The step-by-step guide for a new app, with an example manifest and the checklist the pull request asks for, is [ADDING-AN-APP.md](docs/ADDING-AN-APP.md).

## What keeps it honest

`yarn validate` proves that a file is a compose. `yarn revisao` proves that the app is ready for a store, one premise at a time, and writes the evidence of each app to `.revisao/<App>.json`. Both are CI gates on every pull request that touches a manifest, the schema or the review scripts.

| Situation | What the gate does |
| --- | --- |
| A password, JWT or session key written in the manifest | **fails**: secrets must come from `x-roqueos.gerar` |
| A placeholder nobody replaces (`change-me`, `[YOUR_IP]`) | **fails** |
| A variable that is neither a system variable nor generated | **fails**: it would arrive empty |
| An image whose fixed user cannot write the folder the installer creates | **fails**: the app would restart forever |
| `privileged`, host network or extra capabilities without a written reason | **fails** |
| A store tip that teaches a default password without declaring it | **fails** |
| The image starts but the promised port does not answer | **fails** in the boot test |
| A service restarts, or a seed exits with an error | **fails** in the boot test |
| The lab cannot test it (no GPU on the runner) | reported as **inconclusive**, never as passed |

What each premise checks, how, and what does not have automatic coverage yet is in [TESTING.md](docs/TESTING.md).

## Secrets are generated, never written

This repository is public, so a password in a manifest is the same password on every server that installs the app. Manifests declare their secrets instead:

```yaml
services:
  app:
    environment:
      DB_PASSWORD: ${DB_PASSWORD}
x-roqueos:
  gerar:
    DB_PASSWORD:
      formato: senha
      tamanho: 24
```

The RoqueOS server generates each value at install, keeps it for that server so a reinstall over the kept data still logs in, and shows the ones marked `mostrar: true` once, right after installing. When an image ships with a login of its own that cannot be changed by a variable, the manifest says so in `x-roqueos.senhaPadraoDaImagem`, and the app's store card shows it. The full contract is in [REFERENCE.md](docs/REFERENCE.md).

## When an app leaves

An app leaves the store when its upstream is archived, its image stops being published, or it no longer does what its card promises. Leaving does not touch anyone who already installed it: their container keeps running. Each departure is recorded with the date, the reason, the evidence and what to install instead, in [RETIRED.md](docs/RETIRED.md). Apps that are alive upstream but cannot be installed with one click yet are listed there too, with the condition for coming back.

## Project status

| Item | Status | How it was measured |
| --- | --- | --- |
| Schema of every manifest | 220 of 220 pass | `yarn validate`, CI on every pull request |
| The ten premises | every app closed | `yarn revisao`, CI on every pull request |
| Unit tests of the tooling | green | `yarn test` (Vitest), CI on every pull request and push to `main` |
| Boot on Linux | per app, with run and date | [docs/QUALITY.md](docs/QUALITY.md), from [`docs/evidence/boot.json`](docs/evidence/boot.json) |
| Installation through the RoqueOS server | the whole compose as one stack, secrets generated | `roqueos-server` 1.38.0, installed on a Linux Docker daemon on 17/11/2026 |
| Documentation | numbers, links and language pairs checked | `yarn docs:check`, CI on every pull request |

## Known limits

- **The weekly boot does not finish.** It runs every app in sequence and the job stops at 90 minutes, so most apps are proven only when a pull request touches them. [QUALITY.md](docs/QUALITY.md) lists which apps have a recorded boot and which do not yet.
- **The lab runs `docker compose up`, not the RoqueOS installer.** The installer was proven on its own, but the boot test does not go through it.
- **Only amd64 is booted.** arm64 is what the manifest declares: no check compares it with the platforms the image publishes, and nothing starts it on an ARM runner.
- **No upgrade test.** A new image version is booted from scratch, not over the data of the previous one.
- **Some apps need the server address and use `localhost` for now** (Baserow, Healthchecks, Rallly): they open on the server itself until the installer offers that variable.
- **The boot test refuses to run on macOS**, because Docker Desktop hides the permission failures it exists to catch.

## Documentation

Everything starts at [docs/INDEX.md](docs/INDEX.md). Every document exists in English and Brazilian Portuguese.

| I want to... | Read |
| --- | --- |
| Install an app, or use the catalog from another dashboard | [GETTING-STARTED.md](docs/GETTING-STARTED.md) |
| Add an app or fix one | [ADDING-AN-APP.md](docs/ADDING-AN-APP.md) and [CONTRIBUTING.md](CONTRIBUTING.md) |
| Know what is proven and how | [TESTING.md](docs/TESTING.md) |
| See the state of every app | [QUALITY.md](docs/QUALITY.md) |
| Look up a manifest field, a command or a workflow | [REFERENCE.md](docs/REFERENCE.md) |
| Understand how a change reaches the store | [HOW-IT-SHIPS.md](docs/HOW-IT-SHIPS.md) |
| Fix an app that does not start | [WHEN-IT-BREAKS.md](docs/WHEN-IT-BREAKS.md) |
| Know why an app left | [RETIRED.md](docs/RETIRED.md) |
| Find a term | [GLOSSARY.md](docs/GLOSSARY.md) |

## Contributing, security and license

Issues and pull requests are welcome: read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md) first. A malicious image, an exposed default or a leaked secret goes through the private channel in [SECURITY.md](SECURITY.md), never a public issue.

The manifests and tooling are under the [MIT License](LICENSE). Each app is distributed by its own upstream under its own license; this catalog only describes how to run it. "RoqueOS" and "LEVELHARD" are trademarks: see [TRADEMARK.md](TRADEMARK.md).

## Languages

This README and every document under [`docs/`](docs/INDEX.md) exist in English (the main version) and [Brazilian Portuguese](README.pt-BR.md). Each app's store card is written in both languages too.
