# Integrations

*Also available in [Brazilian Portuguese](pt-BR/INTEGRACOES.md).*

> **For:** whoever writes a reader of this catalog (the RoqueOS server, a CasaOS-compatible dashboard, a script), or changes a field that a reader depends on.
> **What is here:** the ways another system reaches the catalog, what the RoqueOS server reads from each manifest, and the order in which a contract change ships.
> **Where to go for the rest:** every manifest field in [REFERENCE.md](REFERENCE.md); how the pieces fit in [ARCHITECTURE.md](ARCHITECTURE.md); the path of a merge in [HOW-IT-SHIPS.md](HOW-IT-SHIPS.md).

This repository has no API, no CLI for outside use and no webhook. Its surface is the files themselves, served by GitHub.

## Contents

1. [The ways in](#1-the-ways-in)
2. [What the RoqueOS server reads](#2-what-the-roqueos-server-reads)
3. [CasaOS-compatible clients](#3-casaos-compatible-clients)
4. [Changing the contract](#4-changing-the-contract)

## 1. The ways in

| Surface | Address | Who uses it | Freshness |
| --- | --- | --- | --- |
| GitHub contents API, folder list | `https://api.github.com/repos/roqueribeiro/roqueos-containers-list/contents/Apps` | the default store of `roqueos-server` | the server cache, 24 hours |
| Raw compose of one app | `https://raw.githubusercontent.com/roqueribeiro/roqueos-containers-list/main/Apps/<App>/docker-compose.yml` | `roqueos-server`, after the folder list | same |
| Archive of `main` | `https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip` | CasaOS-compatible dashboards; `roqueos-server` too, for a store whose URL ends in `.zip` | the reader's own refresh |
| Release archive | `appstore.zip` attached to a `vX.Y.Z` release | a dashboard pinned to a release | frozen; no semver release exists yet ([HOW-IT-SHIPS.md](HOW-IT-SHIPS.md)) |
| Icon | `x-casaos.icon`, by convention `https://cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main/Apps/<App>/icon.png` | the store screen | the CDN's cache; not measured here |

The release archive holds `Apps/`, `category-list.json`, `recommend-list.json` and `featured-apps.json` ([`.github/workflows/build-appstore.yml`](../.github/workflows/build-appstore.yml)).

## 2. What the RoqueOS server reads

Read on 18/11/2026 in `roqueos-server` 1.39.0, `src/modules/catalog/catalog.service.ts`. The server is another repository; this table describes it as it was read that day, and the server's own code wins if they disagree.

| From the manifest | What the server does with it | When it is missing or wrong |
| --- | --- | --- |
| `x-casaos.main` | picks the principal service | falls back to the first service and logs a warning when there is more than one |
| `image` of the principal service | required | the app is skipped |
| `x-casaos.title.en_us` | the app name | the folder name |
| `x-casaos.description.en_us` | the description | `<App> Docker application` |
| `x-casaos.tagline`, `x-casaos.description` (every locale) | kept for the store screen | |
| `x-casaos.category` | mapped to the store's own ids through `CATEGORY_MAP` | `other`, silently |
| `ports` of the principal service, with the per-service `x-casaos.ports[].description` | the port list of the card | |
| `x-casaos.port_map` | the port the store opens, only if a published host port matches | ignored, with a warning |
| `x-casaos.scheme` | `https` if it says so, otherwise `http` | `http` |
| `x-casaos.architectures` | kept as declared | |
| `x-casaos.icon` | the icon | `Apps/<App>/icon.png` on `raw.githubusercontent.com` |
| `x-casaos.developer` | the website link | |
| `x-roqueos.mountShared` | mounts the shared folder only when it is exactly `true` | not mounted |
| the whole compose text | kept, and used at install | |

Locale keys go through `normalizeLocaleMap` in the server, but the catalog writes `en_us` and `pt_br` in lower case anyway, because P7 demands that spelling ([TESTING.md](TESTING.md)). The categories the server maps are listed in [REFERENCE.md](REFERENCE.md#x-casaos-top-level).

## 3. CasaOS-compatible clients

The manifests stay in the `x-casaos` namespace so a CasaOS client reads them as they are. What it does not get:

| RoqueOS extension | Effect on a CasaOS client |
| --- | --- |
| `x-roqueos.gerar` | no secret is generated: the `${NAME}` variables arrive empty and must be filled by hand |
| `x-roqueos.mountShared` | no `/shared` bind |
| `x-roqueos.senhaPadraoDaImagem` | not shown; the store card in `Apps/<App>/README.md` still says it |

How a given CasaOS version behaves with these was not tested here.

## 4. Changing the contract

A field the published server does not understand reaches users the moment it lands in `main`. A change that renames, removes or adds a field, or changes an enum, ships in this order ([HOW-IT-SHIPS.md](HOW-IT-SHIPS.md#a-change-that-crosses-repositories)):

1. **`roqueos-server`** learns the field, is merged and its image is published.
2. **`roqueos-front`** shows it, and is deployed.
3. **Only then** the catalog uses it in `main`.

The schema in [`schema/casaos-app.schema.json`](../schema/casaos-app.schema.json) changes in the same pull request as the first manifest that uses the field, with an entry in [CHANGELOG.md](../CHANGELOG.md) and the version bump of the policy there (MINOR for a new field, MAJOR for a renamed or removed one).
