# Changelog

All notable changes to the **RoqueOS Containers List** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for the catalog release ZIPs.

> **Versioning policy** (since v1.0.0):
>
> - **PATCH** (`v1.0.x`) — app additions/updates, manifest fixes, doc tweaks. Backwards-compatible for `roqueos-server` consumers.
> - **MINOR** (`v1.x.0`) — new fields in `x-casaos` / `x-roqueos`, new validation invariants, new categories. Backwards-compatible.
> - **MAJOR** (`v2.0.0+`) — breaking schema changes (renamed/removed fields, changed enum values). Coordinate with `roqueos-server`.

## [Unreleased]

### Added — P10: a premissa que liga o container (2026-09-14)

- **`yarn boot` — o teste que faltava.** `scripts/boot-container.mjs` sobe o container de verdade e confere o estado depois de esperar. As nove premissas anteriores liam o manifesto; nenhuma delas ligava nada, e foi assim que o Grafana chegou à casa do founder com manifesto impecável e container que nunca subia.

  Evidência, medida em daemon Linux em 14/09/2026 com o manifesto que estava publicado:

  ```
  estado: Restarting (1) 6 seconds ago
  dono do diretório: drwxr-xr-x 0 0 /DATA/AppData/grafana/data
  GF_PATHS_DATA='/var/lib/grafana' is not writable.
  mkdir: can't create directory '/var/lib/grafana/plugins': Permission denied
  ```

  O Docker cria a origem de um bind que não existe como `root:root 0755`. A imagem do Grafana escreve como uid 472. O container reinicia para sempre.

- **O teste recusa rodar fora de Linux.** No Docker Desktop do macOS o mesmo manifesto quebrado **sobe** (`running restarts=0`, plugin instalado), porque o compartilhamento de arquivo da VM entrega o bind com permissão frouxa. Um teste de boot rodado no Mac daria verde falso exatamente na falha que ele existe para pegar. Por isso o workflow `Boot` roda no runner Linux do GitHub, com espelho de registry para não esbarrar no limite de pull anônimo do Docker Hub.

- **P10 no gate estático** (`yarn revisao`): acusa, sem subir nada, o serviço cuja imagem larga privilégio para um uid fixo e escreve em bind sem `user:` nem `PUID`. Lê o `USER` declarado na imagem a partir de `scripts/dados/uid-imagens.json`, cache commitado das 313 imagens do catálogo.

- **`scripts/registry-user.mjs`**: descobre o `USER` da imagem falando direto com o registry — sem docker, sem baixar camada, sem login. Segue o `WWW-Authenticate` do 401, então vale para Docker Hub, ghcr.io, lscr.io, quay.io e registro próprio.

### Fixed — 28 apps que nunca subiam

- **32 serviços em 28 apps** tinham imagem que larga privilégio para um uid fixo sobre bind que o instalador cria `root:root`: 2FAuth, AnythingLLM, Authentik, BeaverHabitTracker, DDNS-Updater, Docmost, Etherpad, Focalboard, Grafana, InvoiceNinja, LibreChat, Libretranslate, Loki, Mattermost, Maybe, N8n, Node-RED, OpenList, Outline, PdfDing, Penpot, Prometheus, PsiTransfer, RagFlow, SFTPGo, Sure, Vikunja e Whoogle.

  Sete deles já traziam `user: "1000:1000"` e afins escritos no próprio manifesto — mesma falha, e a primeira versão da P10 passava batido por eles.

- **A correção é `user: "0:0"`, e as alternativas foram medidas, não escolhidas por gosto:**

  | tentativa | resultado no Linux |
  |---|---|
  | sem nada | `Restarting (1)`, "is not writable" |
  | `user: "472"` | igual: o diretório continua `root:root` |
  | volume nomeado | funciona, mas tira o dado de `/DATA/AppData` e quebra a convenção de backup |
  | volume local `type=none,o=bind` | `failed to populate volume: no such file or directory` quando o diretório não existe, que é sempre no primeiro install |
  | `user: "0:0"` | `Up`, plugin instalado, dado em `/DATA` |

  O preço está escrito no cabeçalho de `scripts/goal18-permissao.mjs` para não virar folclore: o processo roda como root dentro do container e o dado fica com dono root. Num servidor de casa com um dono só, é o que o ecossistema CasaOS já faz. A alternativa que preserva o privilégio reduzido é o instalador criar o diretório com o dono certo antes do `compose up` — isso exige mexer no `roqueos-server` e deixaria o catálogo quebrado em qualquer outro host CasaOS.

### Fixed — o que o teste de boot achou depois (2026-09-14)

Com a P10 ligando container de verdade, apareceram cinco classes que nenhuma leitura de manifesto pegaria. Tudo medido em daemon Linux nativo.

- **Bind que esconde o arquivo que a imagem traz** — `Prometheus` e `Loki`. O `/etc/prometheus` e o `/etc/loki` das imagens vêm com o arquivo de configuração dentro; o bind cobre isso com o diretório vazio que o instalador acabou de criar. Os dois reiniciavam para sempre (`open /etc/prometheus/prometheus.yml: no such file or directory`, `failed parsing config: /etc/loki/local-config.yaml does not exist`). Conserto: um serviço de semente copia o arquivo da própria imagem para dentro do bind com `cp -n` e sai — depois da primeira vez quem manda é o arquivo do usuário.

- **App que derruba capability não aceita root** — `Whoogle`. Com `cap_drop: ALL` e sem `DAC_OVERRIDE`, nem root escapa da permissão de arquivo: `user: "0:0"` quebrava dentro da própria imagem (`PermissionError: /whoogle/app/static/css/search.css`). Aqui o conserto não é rodar como root, é dar o dono certo ao bind e deixar o processo com o usuário que a imagem escolheu. A P10 passa a reconhecer esse padrão: mesmo bind, usuário root, `chown` na linha de comando.

- **Variável que a imagem exige e ninguém passou** — `AnythingLLM` (`STORAGE_DIR`, morria com `TypeError: The "paths[0]" argument must be of type string`) e `Outline` (`PGSSLMODE`, reiniciava contra o Postgres do próprio stack com `The database does not support SSL connections`).

- **Segredo compartilhado publicado no catálogo** — `LibreChat`. O manifesto trazia os quatro valores de exemplo do `.env.example` do upstream: todo mundo que instalasse recebia a mesma chave de assinatura de sessão. A própria imagem passou a recusar (`[credentials] JWT_SECRET uses a retired default value`) e o container nunca subia. Agora os quatro são gerados na primeira subida com o `crypto` do node e guardados em `/config/segredos.env` com `umask 077`, dentro do `/DATA` do usuário. A P3 não pegou porque os valores parecem aleatórios: ela procurava senha adivinhável, não segredo compartilhado.

- **App que exige chave de terceiro para subir** — o RAG do `LibreChat` nascia apontando para a OpenAI e morria em `The api_key client option must be set`. A variante `lite` da imagem só fala com OpenAI (não traz `langchain_huggingface`), então foi trocada pela completa, com modelo de embedding local.

### Known issues — decisão do founder

- **`InvoiceNinja` não instala.** Herdado do BigBear, ele espera arquivos que o pacote não traz: o nginx faz bind de `invoice-ninja.conf` num caminho que não existe (o Docker cria diretório e o bind falha: `not a directory`) e o serviço de init aborta em `Error: /tmp/data/init/init.sh not found!`. Empacotar direito significa escrever a configuração do nginx, os dois `php.ini` e o `init.sh` num serviço de semente. Enquanto isso não acontece, ele é um app da loja que não instala.

- **48 outros serviços trazem segredo literal fixo** no manifesto, no mesmo formato que quebrou o LibreChat. Não são senhas fracas — a P3 passa neles —, são valores iguais para toda instalação, publicados aqui. Levantamento feito, correção não.

- **`Authelia` não instala.** A imagem não traz configuração padrão e o manifesto não manda nenhuma, então ela morre na validação: `storage: option 'encryption_key' is required`, `authentication_backend: you must ensure either the 'file' or 'ldap'...`. Escrever essa configuração não é preencher campo: é decidir como o gateway de autenticação da casa se comporta. Precisa de decisão, não de conserto mecânico.

- **`RagFlow` continua sem veredito.** O `chown` resolveu o `can not run elasticsearch as root`, e o Elasticsearch passou a carregar módulo e nomear nó — mas o container morre com 137 nos dois laboratórios, que é falta de memória. Ele precisa de uma máquina com RAM de verdade para ter veredito.

- **`Penpot` fechou.** Caía só por falta de IPv6 no laboratório da nuvem; sobe no laboratório Linux do Mac, que tem IPv6. Mesmo caso do `ActualBudget`.



### Added — Goal 18: revisão container a container (2026-09-14)

- **`yarn revisao` — o critério de aceite da loja, app a app.** `scripts/revisao-container.mjs` checa nove premissas por app e grava o veredito em `.revisao/<app>.json`. Sai 1 enquanto houver pendente, o que permite a um loop parar por evidência em vez de por opinião. Entrou na CI e no manifesto `compose-catalog` do `roqueos-kit` (2.18.0).

  No dia em que nasceu, o repo estava `205 ok, 0 failed` no `yarn validate` e **0 de 205 fechado** aqui. O schema prova que o YAML é um compose; ele não prova que o app está pronto para uma loja.

- **12 apps novos** vindos da loja oficial do CasaOS, catálogo 205 → 217: OpenClaw, NetBird, Teable, CopyParty, PodFetch, Blinko, Karakeep, OpenList, BentoPDF, LibreDBStudio, PsiTransfer e RoonServer. Todos passaram pelas nove premissas antes de entrar. `scripts/goal18-importa.mjs` faz a importação.

- **217 READMEs de ficha de loja**, gerados do manifesto por `yarn readme`: portas, volumes, variáveis, primeiro acesso, justificativa de privilégio e fonte oficial. Antes não havia nenhum.

- **`x-roqueos.motivo`** no schema: quem usa `privileged`, `network_mode: host`, `cap_add` ou volume de host declara por quê. A regra não é remover a capacidade de quem precisa dela, é obrigar quem a usa a dizer o motivo. 28 serviços declararam.

- **`x-roqueos.portaCompartilhada`**: 85 apps declaram que a porta host é disputada com outro app do catálogo.

### Fixed — o que estava quebrado em produção

- **54 apps com ícone quebrado na App Store.** O manifesto apontava `cdn.jsdelivr.net/.../icon.png` e o arquivo não estava no repo: 404 no CDN. 64 ícones vieram de `homarr-labs/dashboard-icons` (Apache 2.0, ícone para identificação e sem endosso), 3 do próprio projeto. 4 ícones tinham 48 px e 9 não eram quadrados.

  O `audit-enrichment.mjs` dizia `icon present 205/205` o tempo todo, porque conferia se o CAMPO existia no manifesto e não se o ARQUIVO existia.

- **56 apps mostravam `<app> Docker application` como descrição e 44 mostravam o nome da pasta como título.** O catálogo escrevia português de três formas (`pt_br`, `pt_PT`, `pt_BR`) e inglês de quatro; o `roqueos-server` lê `casaos.title?.en_us` e `casaos.description?.en_us`, minúsculo, e o que não bate cai no fallback. 473 blocos de i18n normalizados em 55 apps, com prova de que o sentido não mudou: 205 manifestos comparados objeto a objeto antes e depois.

- **57 apps caíam em `other` na loja.** A categoria deles não existia no `CATEGORY_MAP` do server. 58 manifestos remapeados; onde a regra por categoria errava, o app mandou: Ollama, OpenWebUI, Dify, AnythingLLM, ChatbotUI e TaskingAI estavam em `Chat` e foram para `AI`, não para `Communication`.

- **24 serviços em `:latest`.** 9 ganharam tag de versão consultada no registro, 15 foram fixados por digest porque o upstream só publica `latest`. O schema passa a **recusar** `:latest`: o cabeçalho do workflow já afirmava isso e era mentira.

- **Caminhos de host que não existem em servidor nenhum.** Jenkin montava `/var/lib/docker/volumes/b098c98b…/_data`, um hash de volume da máquina de quem empacotou. WebDav montava `/media/ZimaOS-HD/Media`, caminho do ZimaOS vazado do upstream.

- **Senhas adivinháveis em manifesto.** `MineOS/USER_PASSWORD=root`, `Unifi/MONGO_PASS=pass` (que aparecia no env **e** no script de init do banco, e as duas tinham que mudar juntas) e `PsiTransfer/PSITRANSFER_ADMIN_PASS`. Todas viraram `change-me-on-first-boot`, que o repo já usava em 12 apps.

- **35 apps sem uma palavra de português** na loja, escritos à mão. `LabelStudio` usava a descrição inteira de 300 caracteres como tagline; `EmulatorJS` e `Medusa` não tinham tagline em idioma nenhum; `Twingate` se descrevia como `It's a connector for Twingate"`, com aspa solta.

### Added — ampliação do catálogo (2026-09-14)

- **12 apps da loja oficial do CasaOS**, catálogo 205 → 217: OpenClaw, NetBird, Teable, CopyParty, PodFetch, Blinko, Karakeep, OpenList, BentoPDF, LibreDBStudio, PsiTransfer e RoonServer. `scripts/goal18-importa.mjs`.

- **35 apps do `big-bear-casaos`** (MIT, formato CasaOS), catálogo 217 → **252**: Dockge, Dozzle, Diun, Scrutiny, SpeedtestTracker, Watchyourlan, Upsnap, Healthchecks, cAdvisor, dash., Joplin, Readeck, Wallos, InvoiceNinja, Ghostfolio, Rallly, Focalboard, MicroBin, IT-Tools, Gluetun, Pocket ID, Mailpit, ntfy, Gotify, Music Assistant, Spoolman, OctoPrint, Kiwix, LibreTranslate, NocoDB, Baserow, DBGate, phpMyAdmin, Penpot e Umami. `scripts/goal18-importa-bigbear.mjs`.

  Dos 244 apps deles, 184 não estavam aqui, mas boa parte era ruído: `__tests__`, navegador em container, e variantes do mesmo app (`dashy` e `dashy-v4`, `ollama-amd` e `ollama-cpu`). Os 35 escolhidos não duplicam nada nosso.

  O manifesto do Big Bear carimba a marca em tudo — `name: big-bear-dockge`, `container_name` igual, e `/DATA/AppData/big-bear-x` escrito à mão no lugar de `$AppID`. Copiar assim instalaria no servidor de quem usa RoqueOS um app chamado `big-bear-x`, guardando dado numa pasta de outra marca. Também saíram o CDN deles como fonte de ícone e os ids `com.bigbeartechworld.*`.

  O gate barrou os 35 na entrada: nenhum declarava `scheme`, 22 vinham com categoria fora do enum (14 em `Others`), MicroBin e phpMyAdmin traziam senha adivinhável, sete usavam privilégio sem justificar, o Gluetun expunha três portas sem `port_map`, e os 35 chegaram sem uma palavra de português.

### Fixed — a esteira Test, quebrada por doze pushes

- **A CI ficou vermelha do primeiro commit do Goal 18 até este.** Não era teste quebrado: os 117 passavam. Os oito scripts novos entraram em `scripts/`, que o `vitest.config` inclui na cobertura, e a cobertura global caiu de 35%+ para **9,23%**.

  Não apareceu antes porque o gate local deste repo **nunca rodou vitest**: o manifesto `compose-catalog` do kit não tinha gate de teste. Corrigido no kit 2.18.1, com o mesmo comando da CI — gate local que roda comando diferente do da CI não é gate, é ensaio.

  As sete migrações de uma vez só saíram do denominador de cobertura; `revisao-container.mjs` e `gera-readme.mjs` **não** saíram, e ganharam 42 casos de teste. Cada caso congela um defeito real: `MONGO_PASS=pass` que o regex antigo deixou passar, `en_US` que para o server não existe, descrição de porta vazia que parecia preenchida, o hash de volume do Jenkin, e o socket do Docker que **não** é defeito.

  159 testes. Cobertura 44/45/47/45 contra limiares de 35/40/40/35.

- **326 descrições que só repetiam o próprio campo.** 46 apps importados de upstream traziam `Container Path: /app/data` como descrição do volume `/app/data`, e `Container Variable: TZ` para a variável `TZ`. Passava em qualquer checagem de "tem descrição?" sem informar nada, e tinha entrado nos 252 READMEs, onde a coluna "Para que serve" repetia a coluna ao lado.

  254 viraram texto com significado, derivado do que o caminho, a porta ou o nome da variável de fato são — `/var/run/docker.sock` passa a dizer que é o socket do Docker do host, `/app/data` que é o que se faz backup. As 28 portas específicas de app foram escritas uma a uma: 853 e 784 do AdGuard Home são DNS-over-TLS e DNS-over-QUIC, 51413 do Transmission é a porta de peer do BitTorrent, 3478 do Unifi é o STUN.

  A P2 do gate passa a **reprovar** tautologia, não só descrição ausente: campo preenchido com o próprio nome é pior que campo vazio, porque parece pronto.

- **`audit-enrichment.mjs` media a coisa errada, duas vezes.** Reportava `title.en_US` — a grafia que o `roqueos-server` não lê — e dizia 100% enquanto 44 apps apareciam na loja com o nome da pasta. E media `icon present` pelo campo do manifesto, dizendo `205/205` com 54 ícones dando 404. Agora mede `en_us` e confere o arquivo no disco.

### Known issues

- **`Hoarder` e `Karakeep` são o mesmo projeto.** O upstream renomeou `hoarder-app/hoarder` para `karakeep-app/karakeep`; os dois estão no catálogo, em categorias diferentes. Escolher qual fica apaga o outro, e é decisão de produto.
- **`Mongo` e `MongoDB4`** servem a mesma imagem em versões diferentes (8.2.2 e 4.4.22). Proposital enquanto houver app que só roda no 4.
- **100 descrições de variável de ambiente** continuam genéricas por falta de regra: são específicas do app (`DIUN_WATCH_JITTER`, `VPN_SERVICE_PROVIDER`) e precisam de quem conhece aquele app. O gate não as reprova porque não são tautologia — dizem algo, só não dizem o bastante.
- **`thumbnail` e `screenshot`** aparecem no relatório do `yarn enrichment` como lacuna, mas não são cobrados por nada: a App Store desenha o ícone e o server não lê esses campos.

### Removed

- **Os 51 `appfile.json`.** Formato morto: busca no `roqueos-server/src` e no `roqueos-front/src` não acha uma referência sequer, e 44 dos 51 já divergiam do compose (`2FAuth` dizia `:latest`, o compose dizia `5.4.3`); um tinha vírgula sobrando e JSON inválido. Antes de apagar, conferido que nenhuma `tips.before_install` se perdia — todo compose com appfile já tinha as suas em `x-casaos.tips`. Os 6 links upstream que só existiam ali foram guardados e entraram na seção "fonte oficial" dos READMEs.

- **`thumbnail` e `screenshot` saíram do critério de aceite.** A App Store desenha o ícone; o `catalog.service.ts` do server não toca em `thumbnail` nem em `screenshot_link`. Eram 138 thumbnails e 63 telas faltando: gerar isso seria trabalho que nenhum usuário veria, e gate que cobra o invisível ensina a ignorar gate. Quando a loja passar a mostrar, a checagem volta com significado.

### Deprecated

- **`yarn audit` nunca rodou o script deste repo.** O yarn tem um subcomando `audit` próprio e ele ganha. Use `yarn enrichment`.

### Adicionado antes do Goal 18

### Added

- **53 new apps across 4 themed waves** (catalog 152 → 205+ valid manifests). Closes critical category gaps identified in the 2026-05-03 audit and surpasses the CasaOS Official catalog (~180 apps), narrowing the gap to Big Bear (~250). All 53 manifests follow the RoqueOS branding policy: pinned image tags (no `:latest`), `tagline` + `description` in **en_us + pt_br**, `category` from the schema enum, `tips.before_install` populated with deployment hints (replace default secrets, configure OAuth, etc.), `author: RoqueOS Team`, `developer:` pointing to the upstream maintainer.

  **Wave A — Search, Monitoring, Auth, Bookmarks** (15 apps, PR #6):
  - Search: Searxng, Whoogle, Meilisearch
  - Monitoring/Dashboard: Homepage, Beszel, Prometheus, InfluxDB, Loki
  - Auth & Security: Authelia, Authentik, CrowdSec
  - Bookmarks: Linkwarden, Linkding, Hoarder, Shiori

  **Wave B — Productivity, Photo, Wiki/Knowledge** (12 apps, PR #7):
  - Office: OnlyOffice, Collabora, Stirling-PDF, Etherpad
  - Photo Gallery: Lychee, Piwigo, LibrePhotos
  - Documents/Recipes: Paperless-ngx, Mealie
  - Wiki: BookStack, Wiki.js, Outline

  **Wave C — Communication, Development, Smart Home** (12 apps, PR #8):
  - Communication: Matrix Synapse, Snappymail, Roundcube, Mattermost
  - Development: code-server, Heimdall, Forgejo, Vikunja
  - Smart Home: Frigate, Zigbee2MQTT, Mosquitto, Domoticz

  **Wave D — AI, Storage, Workflow, completed 3 incompletos** (14 apps, PR #9):
  - AI/ML: LocalAI, ComfyUI, Tabby, CyberChef
  - Storage: Seafile, MinIO, Kopia, SFTPGo, Filestash
  - Workflow: Activepieces, Glance
  - **Completed 3 incompletos** (folders existed with assets but lacked `docker-compose.yml`):
    - Jellyseerr (`fallenbagel/jellyseerr:2.4.1`) — Plex/Jellyfin/Emby request manager
    - Trilium (`triliumnext/notes:0.91.6`) — switched to TriliumNext active community fork (original `zadam/trilium` was archived)
    - Logseq (`logseq/logseq-publish-server`) — read-only graph viewer with prominent `tips` section explaining there is no Logseq editing server (Logseq is an Electron desktop app)

  **`code-server` and `heimdall`** were in `recommend-list.json` but didn't exist in the catalog — both now resolve.

- **`featured-apps.json` expanded from 5 → 13 apps** to showcase the catalog breadth: portainer, nextcloud, jellyfin, homeassistant, code-server, immich, vaultwarden, authentik, frigate, linkwarden, onlyoffice, paperlessngx, uptimekuma. Drives the "featured" section of the RoqueOS App Store.

### Substitutions vs original Wave plan

A few apps were substituted during execution because the originally-planned image had stability/licensing issues, or because the planned app was already in the catalog (caught at planning step):

- `UptimeKuma` → already exists, replaced with **Homepage** (Wave A).
- `Audiobookshelf`, `Readarr` → already exist, replaced with **Paperless-ngx** and **Mealie** (Wave B).
- `Mailcow` (50+ container stack) → **Snappymail** (single-container webmail, Wave C).
- `Gitness` (unclear OSS status) → **Vikunja** (Wave C).
- `Open Interpreter` (floating tag) → **CyberChef** (Wave D).
- `Huginn` (only `:latest`) → **Glance** (Wave D).

### Security

- **Image pinning is now enforced by the validator.** `scripts/validate-manifests.mjs` rejects any new app whose `services[*].image` is bare (`vendor/image`) or ends with `:latest`. The check uses the existing `isImagePinned()` helper from `fix-manifests.mjs` (previously exported but never wired into the validate pipeline).

  Allowing `:latest` in a curated app catalog is a real supply-chain risk — the consumer (`roqueos-server`) pulls whatever an upstream maintainer publishes whenever they publish. A compromised upstream account silently propagates to every RoqueOS user.

  The 21 apps that ship with `:latest` today are frozen in `UNPINNED_IMAGE_ALLOWLIST` (visible at the top of the validator). Adding to this set is a regression that must be defended in PR review. Removing entries — by switching the manifest to a real semver tag or a `@sha256:` digest — is the goal.

  Allowlisted today: `AnythingLLM`, `ArchiveBox`, `Dify`, `DuckDNS`, `Excalidraw`, `Firefly`, `Homebridge`, `JDownloader2`, `LibreChat`, `Maybe`, `MineOS`, `Pinchflat`, `Pingvin-Share`, `RagFlow`, `RetroArch`, `StableDiffusionWebUI`, `Threadfin`, `Unifi-Network-Application`, `VirtualMachineManager`, `oPodSync`, `playit-agent`.

  Closes a finding from the 2026-05-03 systematic audit.

### Added

- **`tests/unit/image-pinning.test.mjs`** — 11 tests covering `isImagePinned` edge cases (undefined, bare names, `:latest` suffix, semver, digest), the new `imagePinningCheck` function (multi-service docs, `build:`-only services, empty docs), and the allowlist contract (size assertion + spot checks). Adding to or removing from `UNPINNED_IMAGE_ALLOWLIST` requires updating the spec — explicit by design.

### Changed

- **`vite` added as explicit `devDependency`.** Was previously satisfied as a transitive peer of `vitest@4.x`, which started warning when `node_modules` was rebuilt. Pinning it here removes the warning and makes the build deterministic.

First semver-tagged release. Marks the stable contract for catalog consumers (`roqueos-server` + any third-party CasaOS-compatible client).

### Added

- **155+ Docker app manifests** in CasaOS-compatible format under `Apps/`.
- **JSON Schema** (`schema/casaos-app.schema.json`, Draft-07) enforced by CI on every PR. Required fields: `architectures`, `main` (when multi-service), `category`, `scheme`. Conditional: `port_map` when principal service exposes multiple ports.
- **Cross-field validators** (`scripts/validate-manifests.mjs`) — beyond JSON Schema, enforces:
  - `x-casaos.main` must reference a real service.
  - `x-casaos.port_map` must be a HOST port published by the principal service (with proper extraction from string-form `'host:container'` and respect for `network_mode: host`).
  - Multi-port principal service requires `port_map` declared.
- **Auto-fixer** (`scripts/fix-manifests.mjs`) — idempotent script that:
  - Injects `x-casaos.scheme` (https when port 443 published, else http).
  - Injects `x-roqueos.mountShared: true` for curated app set (~49 media servers, downloaders, file managers).
  - Injects `x-casaos.main` for single-service stacks (the answer is unambiguous).
- **i18n audit** (`scripts/audit-enrichment.mjs`) — read-only report of translation gaps. Helpers `hasLocale`, `nonEmptyString`, `hasScreenshots`. CSV output for prioritization.
- **Idempotent rebrand** (`scripts/rebrand-casaos.mjs`) — sweeps CasaOS upstream branding to RoqueOS where cosmetic, preserves where it carries technical meaning (the `x-casaos:` namespace stays — it's the parser contract).
- **`x-roqueos` namespace extension** — `mountShared: boolean` for opt-in `/shared` filesystem bind in containers.
- **CI workflow** (`.github/workflows/validate-schema.yml`) blocks merge if any manifest drifts from schema or cross-field invariants.
- **Release workflow** (`.github/workflows/build-appstore.yml`) bundles `Apps/` + JSON metadata into `appstore.zip` published to GitHub releases. **Triggered by semver tag push** (was previously timestamp-based — see Breaking Changes).
- **`CONTRIBUTING.md`** rewritten with full tooling reference, manifest template, quality bar checklist, i18n policy, mountShared guidance, upstream import flow.
- **`SECURITY.md`** with disclosure policy and threat model for malicious manifests.
- **`CODE_OF_CONDUCT.md`** (Contributor Covenant v2.1).
- **`TRADEMARK.md`** clarifying MIT License doesn't extend to RoqueOS/LEVELHARD marks.
- **GitHub issue templates** (`bug_report.md`, `new_app.md`, `config.yml`).
- **PR template** with submission checklist.
- **README.md** — badges, 3 quick-start options, full categories, tooling section, CasaOS upstream attribution.

### Changed (vs. CasaOS-AppStore upstream)

- All 155 manifests rebranded via `yarn rebrand`:
  - `author: CasaOS Team` → `RoqueOS Team` (where appropriate).
  - CDN URLs from `IceWhaleTech/CasaOS-AppStore` → `roqueribeiro/roqueos-containers-list`.
  - Default credentials in env + `tips:` markdown: `casaos` → `roqueos`.
  - Free-text mentions of CasaOS in descriptions/tips → RoqueOS (where cosmetic).
  - **Preserved**: `x-casaos:` YAML namespace (parser contract), schema filename, "CasaOS Compatible" badges (factual claim), bind mount paths.

### Breaking Changes

- **Release tags migrated from timestamps to semver.** Previously, every push to `main` created a tag like `v20260502-195600` automatically. Now releases are triggered ONLY by pushing semver tags (`vX.Y.Z`). This was needed so `roqueos-server` consumers can pin a stable catalog version without risk of unexpected breaking changes between commits.
  - **Impact on consumers**: the `releases/latest/download/appstore.zip` URL still works (always points to the most recent release).
  - **Impact on contributors**: pushing to `main` no longer creates a release. Maintainers must run `git tag -a vX.Y.Z -m "..." && git push origin vX.Y.Z`.

### Security

- All 155 manifests audited for hardcoded credentials. No real secrets exposed; default credentials documented in `tips.before_install`.
- 21 apps still use `:latest` (backlog tracked in audit) — `audit-enrichment.mjs` reports them; planned for follow-up PRs by category (AI tools first: Dify, AnythingLLM, RagFlow, LibreChat).
- 7 apps use `privileged: true` (ttydbridge, V2rayA, RagFlow, HomeAssistant, HoloPlay, Handbrake, EmulatorJS) — all legitimate but lack inline justification comments. Backlog item.
- 6 apps bind `/var/run/docker.sock` (Netdata, RagFlow, Portainer, OpenHands, Glances, FileFlows) — all justified by app purpose.

---

## Historical releases

Releases tagged with timestamps (e.g., `v20260502-195600`) prior to v1.0.0 are still available at <https://github.com/roqueribeiro/roqueos-containers-list/releases>. They were continuous builds from `main` without semantic versioning. From v1.0.0 onwards, only semver tags trigger releases.

Changes prior to this changelog are reconstructible from the commit history.

---

[Unreleased]: https://github.com/roqueribeiro/roqueos-containers-list/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/roqueribeiro/roqueos-containers-list/releases/tag/v1.0.0
