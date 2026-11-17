# What is proven, and how

*Also available in [Brazilian Portuguese](pt-BR/CRITERIOS-DE-TESTE.md).*

Three layers stand between a manifest and the store. Each one says what it proves, how, and what makes it fail. The last section says what none of them covers yet, because a check that claims more than it measures is how a broken app reached the store before.

## Layer 1: the schema (`yarn validate`)

[`scripts/validate-manifests.mjs`](../scripts/validate-manifests.mjs) checks every `Apps/*/docker-compose.yml` against [`schema/casaos-app.schema.json`](../schema/casaos-app.schema.json) (JSON Schema Draft-07) and then runs cross-field invariants the schema cannot express.

| What it proves | What fails |
| --- | --- |
| The file is a compose with `name` and `services` | missing keys, wrong types |
| Every image is pinned | a bare name, or `:latest` (a short allowlist of legacy apps is frozen in the script and can only shrink) |
| `x-casaos.main` names a real service | a name that matches no service, or no `main` with more than one service |
| `port_map` is a host port the principal service publishes | a port nobody publishes |
| `architectures`, `category`, `scheme` come from their enums | any other value |
| The `x-roqueos` extensions have the declared shape | a non-boolean `mountShared`, an unknown `gerar` format, a secret name that is not an uppercase variable |

## Layer 2: the ten premises (`yarn revisao`)

[`scripts/revisao-container.mjs`](../scripts/revisao-container.mjs) reads each app and closes or opens ten premises. The CI fails while any app has an open one, and the evidence of each app goes to `.revisao/<App>.json`. `yarn revisao:app <App>` prints one verdict with its reasons.

| # | Premise | What it proves | What fails |
| --- | --- | --- | --- |
| P1 | Compatibility | the store can place and open the app | no `main`, `main` that resolves nothing, empty `architectures`, a category the RoqueOS server does not map (it would fall into "other" silently) |
| P2 | Ports | every published port says what it is | a port without a description, a description that repeats the field (`Container Port: 8080`), a host port shared with another app and not declared in `x-roqueos.portaCompartilhada` |
| P3 | Variables | no secret is written in the public repository, and every variable has an origin | a literal value in a secret's name (password, token, key, salt, JWT), a placeholder (`change-me`, `replace-with`, `[YOUR_IP]`), a password inside a URL or a `command` (including `--requirepass`), a `$VAR` that is neither a system variable nor declared in `x-roqueos.gerar`, a declared secret nobody uses, a tip that shows a default password without `x-roqueos.senhaPadraoDaImagem` |
| P4 | Configuration | the app is reproducible and keeps its data where the user backs it up | an unpinned image, an image the registry does not serve, a volume outside `/DATA/` or a known system mount, no `restart` |
| P5 | Privilege | elevated access is a decision someone wrote down | `privileged`, `network_mode: host` or `cap_add` without the reason in `x-roqueos.motivo` |
| P6 | README | the store card exists and has its sections | no `README.md`, a card too short to be useful, a missing section |
| P7 | Text | the store speaks both languages of the project | an empty `tagline` or `description` in `en_us` or `pt_br` |
| P8 | Icon | the store can draw the app | no `icon.png` in the folder, not a PNG, not square, smaller than 192 px |
| P9 | Coherence | there is one source of truth per app | an `appfile.json` (a format nothing reads) that is not valid JSON or names a different image than the compose |
| P10 | Data permission | the app can write the folder the installer creates | an image that drops to a fixed user and writes a bind mount with no `PUID`, no root `user:` and no seed that hands the folder over; a non-root `user:` written in the manifest fails too, because it hits the same `root:root` folder |

**Why P10 exists.** The installer creates a missing bind source as `root:root 0755`. An image that writes as a fixed user (Grafana writes as uid 472) cannot write there and restarts forever. The nine static premises before it all passed on exactly that Grafana, because none of them started a container.

## Layer 3: the boot test (`yarn boot`, workflow `Boot`)

[`scripts/boot-container.mjs`](../scripts/boot-container.mjs) starts the app the way a user receives it and looks at it.

| Step | What it does | What fails |
| --- | --- | --- |
| Render | replaces `$AppID`, `$PUID`, `$PGID`, `$TZ` and generates every `x-roqueos.gerar` secret, in the same formats the installer uses | |
| Sandbox | rewrites `/DATA/` to a throwaway folder and drops published ports, so the test never touches real data or collides with the runner | |
| Start | `docker compose up` | an image that cannot be pulled, a device the host does not have, a missing GPU runtime |
| Settle | waits and reads every service | a service restarting, a service that exited, a seed that exited with an error (`Exited (0)` counts as success only for a service with `restart: 'no'`) |
| Answer | calls the port of the store card for up to 180 seconds | nothing listening there; a server that accepts the connection without speaking HTTP (a database) counts as answering, TLS where the card promises HTTP does not |
| Settle again | reads every service once more | an app that answered and then fell over |

**Inconclusive is not passed.** A failure the lab causes (no GPU on the runner, a registry rate limit, no IPv6 in the kernel) is reported as inconclusive with its reason, so it is neither hidden nor blamed on the app.

**Linux only.** On Docker Desktop the folder sharing hands out loose permissions, and the Grafana that restarts forever on Linux starts normally there. The script refuses to run outside Linux.

**Where it runs.** Every pull request that touches a manifest boots the apps it touches. `workflow_dispatch` boots a list of apps. A weekly schedule boots everything, but see the limits below. The latest result of each app is kept in [`evidence/boot.json`](evidence/boot.json) and shown in [QUALITY.md](QUALITY.md).

## The tooling has tests too

`yarn test` runs Vitest over the scripts. The rule of the repository is that a new check comes with a test that fails when the check is removed, and that a test is never loosened to make a pull request pass. Nothing runs mutation testing automatically.

## What is not covered yet

- **The weekly boot does not finish.** It runs in sequence and stops at 90 minutes, so most apps are proven only when a pull request touches them.
- **The lab runs `docker compose up`, not the RoqueOS installer.** The installer was tested on its own (`roqueos-server` 1.38.0, on a Linux Docker daemon on 17/11/2026), but not in this pipeline.
- **Only amd64 is booted.** arm64 is declared, not started, and no check compares it with the platforms the image publishes.
- **No upgrade test.** A new version boots from scratch, not over the data of the previous one.
- **No login, no screen.** "Answers on the port" is checked; "the screen opens and the login works" is not.
- **Default logins of the image** are declared, not removed: the person still has to change them on first access.
