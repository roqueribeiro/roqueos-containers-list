# How a change reaches the store

*Also available in [Brazilian Portuguese](pt-BR/COMO-CHEGA.md).*

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
