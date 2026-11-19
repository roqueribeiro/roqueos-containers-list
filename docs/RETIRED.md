# Retired apps

*Also available in [Brazilian Portuguese](pt-BR/APOSENTADOS.md).*

> **For:** whoever looks for an app that is no longer in the store, or proposes one that left before.
> **What is here:** every departure with the date, the reason, the evidence and what to use instead.
> **Where to go for the rest:** how to bring an app back in [ADDING-AN-APP.md](ADDING-AN-APP.md).

An app leaves the store when recommending it stops being safe or useful: the upstream project was archived, the image stopped being published or disappeared from the registry, or the app no longer does what its card promises. Leaving the store **deletes nothing** for people who already installed it: the container keeps running where it is. What changes is that nobody new installs it, and the card is no longer shown.

Each row records the date, the reason, the evidence behind the decision and what to install instead. The old manifest stays in the git history, in the commit before the removal.

There are two kinds of departure. **Retired** is final: the project ended. **Out of the store until it comes back** is temporary: the project is alive, but the app does not start with one click as it is, and it comes back when the fix below is done.

## Out of the store until it comes back (17/11/2026)

| App | Why it does not start with one click | Evidence | Comes back when |
| --- | --- | --- | --- |
| Gluetun | Without the VPN provider's credentials the container exits with an error and restarts forever | CI boot on 15/11/2026: `gluetun: Restarting (1)` | the installer asks for the provider and the credentials before starting |
| Twingate | Without the Twingate network token the connector does not start; the `:1` tag was still floating | manifest with `TWINGATE_ACCESS_TOKEN: ""` | the installer asks for the token, with the image pinned to an exact version |
| Zigbee2MQTT | Needs a Zigbee adapter on USB and an MQTT broker; the default configuration points to `mqtt://localhost` and `/dev/ttyACM0` | default configuration of the image | the installer asks for the adapter and the broker |
| MatrixSynapse | The server name is chosen on first boot and cannot change later; with the default `matrix.example.com` the install is born wrong. Without `homeserver.yaml` the image also refuses to start | Synapse `docker/start.py`: "no longer supports generating a config file on-the-fly" | the installer asks for the domain and generates the configuration with Postgres |
| Dify | Manifest stuck on 0.12.1 (upstream is on 1.19), with a third-party amd64-only seed and `ssrf_proxy` restarting | CI boot on 15/11/2026: `ssrf_proxy: Restarting (1)` | the manifest is rewritten from the official 1.x compose |
| RagFlow | Needs about 16 GB of RAM, starts Elasticsearch and OpenSearch together, uses an amd64-only mirror on v0.21.1 (upstream is on v1.0.0) and publishes the database on the host with the default password | CI boot on 15/11/2026: `ragflow-es01: Restarting (137)` | the manifest is rewritten from the official compose |
| Teable | The image, pinned only by digest, fails a database query at startup and never opens port 3000 | CI boot on 17/11/2026: `Raw query failed`, Prisma `P2010` in `SystemFieldBackfillService` | the manifest is redone with a tagged version of the official compose |
| LibrePhotos | The manifest has only the backend: the card's port lands on a service that listens elsewhere, with no frontend or proxy | `librephotos-docker` entrypoint: the backend listens on 8001 | the manifest brings the frontend, proxy and database from the official compose |

## Retired on 17/11/2026 (21 apps, catalog from 249 to 228)

Evidence gathered on 17/11/2026 with read-only queries to the GitHub API and to the registries (Docker Hub, ghcr.io, quay.io).

| App | Reason | Evidence | Use instead |
| --- | --- | --- | --- |
| Alist-Sync | Upstream stopped in 03/2025; it only makes sense next to Alist, a role the catalog already covers | `xjxjin/alist-sync`: latest release v1.1.5 on 15/03/2025, latest push on 08/04/2025 | OpenList |
| ChatbotUI | No commit since 08/2024, never published a release; the `:main` image is from 01/2024 and the app needs a Supabase the manifest did not bring | `mckaywrigley/chatbot-ui`: `pushed_at` 2024-08-03, `releases/latest` 404 | LibreChat, AnythingLLM |
| Embystat | Image and upstream dead | `linuxserver/docker-embystat` archived (latest in 10/2023); `mregni/EmbyStat` without a release since 05/2022 | none in the catalog |
| EmulatorJS | linuxserver image discontinued | `linuxserver/docker-emulatorjs` archived; latest tag 1.9.2-ls173 in 06/2025 | RomM (ships EmulatorJS built in) |
| FileBrowser | Project ended, no future security fixes, and the app exposes the whole `/DATA` | `filebrowser/filebrowser` archived; the README says it was archived on 01/09/2026 | Nextcloud, Syncthing |
| Filedrop | Image without an update since 09/2023 and no source repository to be found | Docker Hub `noecl/filedrop`: only tags from 13/09/2023; `gh api repos/noecl/filedrop` 404 | none in the catalog |
| FlowiseAi | Upstream archived | `FlowiseAI/Flowise` archived; latest release flowise@3.1.4 on 29/07/2026 | LangFlow, N8n |
| Focalboard | Unmaintained; image from 2023, amd64 only | README of `mattermost-community/focalboard`: "currently not maintained"; newest tag from 02/2024 | Vikunja |
| Hoarder | It is Karakeep under its old name; the catalog already has Karakeep | `hoarder-app/hoarder` redirects to `karakeep-app/karakeep` | Karakeep |
| HoloPlay | Upstream archived; depends on public Invidious instances | `stephane-r/holoplay-pwa` archived; latest release v1.12.3 in 07/2024 | none in the catalog |
| Maybe | Upstream archived; the manifest carried a fixed `SECRET_KEY_BASE`, the same on every install | `maybe-finance/maybe` archived on 24/07/2025 | Sure (the fork that carried on) |
| MineOS | Image stopped in 04/2022, amd64 only, and a fixed password in the manifest | Docker Hub `hexparrot/mineos`: newest tag from 25/04/2022; repository without a push since 03/2021 | Crafty |
| MinIO | Upstream archived and the image no longer pulls without a login | `minio/minio` archived; an anonymous pull from `quay.io/minio/minio` answers 401 | none in the catalog |
| Overseerr | Upstream and image archived | `sct/overseerr` and `linuxserver/docker-overseerr` archived | Jellyseerr |
| Petio | Image from 01/2022, amd64 only despite declaring arm and arm64; upstream stopped; database without a volume | image config on ghcr: `created 2022-01-13`, `architecture amd64` | Jellyseerr |
| Pingvin-Share | Upstream archived; a sharing app exposed with no future fixes | `stonith404/pingvin-share` archived; final release v1.13.0 in 05/2025 | Nextcloud |
| Readarr | Project ended; the pinned image was a `develop` build from 2023 | `Readarr/Readarr` and `linuxserver/docker-readarr` archived | Lazylibrarian |
| Snapdrop | Image discontinued by linuxserver, and it published the host's port 443 | `linuxserver/docker-snapdrop` archived; README: "This image is deprecated" | none in the catalog |
| TaskingAI | Upstream stopped since 12/2024; the manifest carried a fixed AES key, JWT secret and admin password | `TaskingAI/TaskingAI`: latest release v0.3.0 in 06/2024 | AnythingLLM |
| Unifi-controller | Image discontinued since 01/2024 | README of `linuxserver/docker-unifi-controller`: "deprecated... migrate to our Unifi Network Application" | Unifi-Network-Application |
| Whoogle | The project announced its end: Google blocked search without JavaScript and Whoogle no longer returns results | `benbusby/whoogle-search` archived; README notice from 24/07/2026 | SearXNG |

## Earlier departures

| App | Left on | Commit |
| --- | --- | --- |
| Logseq, InvoiceNinja, Authelia | 14/09/2026 | `33ddec6` (the reason for each is in the CHANGELOG of that date) |
