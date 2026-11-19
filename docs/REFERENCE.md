# Reference

*Also available in [Brazilian Portuguese](pt-BR/REFERENCIA.md).*

> **For:** whoever writes or reviews a manifest, or needs a command or a workflow.
> **What is here:** every manifest field, the system variables, the commands, the workflows and the files at the root, as tables.
> **Where to go for the rest:** why things are built this way in [ARCHITECTURE.md](ARCHITECTURE.md); how other systems read it in [INTEGRATIONS.md](INTEGRATIONS.md).

The contract of a manifest, the commands of the repository and the workflows. The source of truth for the manifest is [`schema/casaos-app.schema.json`](../schema/casaos-app.schema.json); this page explains it.

## The manifest

### `x-casaos` (top level)

| Field | Required | Meaning |
| --- | --- | --- |
| `main` | yes (schema) | the service the store opens and labels as the app |
| `architectures` | yes | the platforms the image publishes (`amd64`, `arm64`, `arm`, `386`, `ppc64le`, `s390x`, `mips64le`, `riscv64`) |
| `category` | yes | one of the store categories below |
| `scheme` | yes | `http` or `https` of the port the store opens |
| `port_map` | with more than one published port (not checked with host networking) | the host port the store opens |
| `title`, `tagline`, `description` | `en_us` and `pt_br` | the store card text, keys in lower case |
| `icon` | by convention (P8 checks the file, not the field) | URL of `Apps/<App>/icon.png` through the CDN |
| `developer`, `author` | by convention | the upstream maintainer, and `RoqueOS Team` |
| `tips.before_install` | when there is something to know | first access, what to configure, what is generated |
| `index` | no | the path to open, `/` by default |

**Store categories** (the ones the RoqueOS server maps; any other falls into "other"): AI, Communication, Developer, Development, Finance, Gaming, Home Automation, HomeAutomation, Media, Network, Productivity, Security, Storage, Utilities.

### `x-casaos` (per service)

`ports`, `volumes` and `envs`, each a list of `container` plus a `description` in `en_us` and `pt_br`. They feed the store card and the generated README.

### `x-roqueos`

RoqueOS extensions. CasaOS clients ignore them.

| Field | Shape | Meaning |
| --- | --- | --- |
| `gerar` | map of `NAME` to `{ formato, tamanho?, mostrar?, descricao? }` | secrets the server generates per install; the manifest uses `${NAME}` |
| `gerar.*.formato` | `hex`, `base64`, `senha`, `uuid`, `laravel` | how the value is generated |
| `gerar.*.tamanho` | integer from 8 to 128 | length: hex digits, base64 bytes or password characters |
| `gerar.*.mostrar` | boolean | show the value to the person once, after install (a login password) |
| `gerar.*.descricao` | `en_us`, `pt_br` | the label shown next to the value |
| `senhaPadraoDaImagem` | text, at least 20 characters | the login the image ships with and what to do about it; shown on the store card |
| `mountShared` | boolean | bind-mount the RoqueOS shared folder at `/shared` (media servers, downloaders, file managers) |
| `motivo` | `privileged`, `networkHost`, `capAdd`, `volumeHost`: text | why the app needs elevated access; required by P5 |
| `portaCompartilhada` | boolean | the host port is known to collide with another app |

### System variables

The installer replaces these in every manifest; anything else must come from `x-roqueos.gerar`.

| Variable | Value on a RoqueOS server |
| --- | --- |
| `$AppID` | the app's identifier in the store, used in `/DATA/AppData/$AppID/` |
| `$PUID`, `$PGID` | the `PUID` and `PGID` of the server, `1000` by default |
| `$TZ` | the `TZ` of the server, `America/Sao_Paulo` by default |

`$$` is the compose escape for a literal `$` and stays as is.

## Commands

**Yarn only.** No `npm`, no `npx`, no `package-lock.json`.

| Command | What it does |
| --- | --- |
| `yarn validate` | schema and cross-field invariants of every manifest (CI gate) |
| `yarn revisao` | the ten premises, app by app (CI gate) |
| `yarn revisao:app <App>` | the verdict of one app, with reasons |
| `yarn revisao:pendentes` | the apps with an open premise, one per line |
| `yarn boot <App> [...]` | start apps for real and check them (Linux only) |
| `yarn boot:todos` | boot the whole catalog (hours) |
| `yarn readme --app <App>` | regenerate an app's store card from its manifest |
| `yarn docs:quality` | regenerate [QUALITY.md](QUALITY.md) and its Portuguese pair |
| `yarn docs:check` | check the documentation: numbers against the disk, links, language pairs, no dashes (CI gate) |
| `yarn test` | Vitest over the tooling |
| `yarn uid` / `yarn uid:atualiza` | read or refresh the user each image runs as, used by P10 |
| `yarn enrichment` | report of missing translations in other languages (advisory) |
| `yarn fix:dry` / `yarn fix` | preview or apply mechanical fixes |
| `yarn rebrand:dry` / `yarn rebrand` | preview or apply the CasaOS to RoqueOS sweep when importing upstream apps |

`yarn audit` does **not** run the enrichment report: Yarn has its own `audit` command and it wins. Use `yarn enrichment`.

## Workflows

| Workflow | When | What |
| --- | --- | --- |
| `Validate Manifests` | pull request and push to `main` touching manifests, schema or review scripts | `yarn validate` and `yarn revisao` |
| `Test` | every pull request and push to `main` | `yarn test` with coverage, and `yarn docs:check` |
| `Boot` | pull request touching a manifest, manual, weekly | the boot test of the apps touched, a list, or all |
| `Build AppStore` | push to `main`, pull request, tags `vX.Y.Z` and `vX.Y.Z-*` | builds `appstore.zip`; on a tag, publishes it as a release |
| `roqueos` | push to `main` and pull request | the shared gate of the RoqueOS repositories |

## Files at the root

| File | Meaning |
| --- | --- |
| `category-list.json` | the categories and their icons |
| `featured-apps.json` | apps highlighted on the store home |
| `recommend-list.json` | apps recommended on first use |
| `scripts/dados/uid-imagens.json` | the user each image runs as, read by P10 |
