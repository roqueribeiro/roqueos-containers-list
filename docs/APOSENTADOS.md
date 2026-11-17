# Apps aposentados

Um app sai da loja quando deixa de ser seguro ou útil recomendá-lo: o projeto
original foi arquivado, a imagem parou de ser publicada ou sumiu do registry, ou
o app não faz mais o que a ficha promete. Sair da loja **não apaga nada** de quem
já instalou: o container continua rodando onde está. O que muda é que ninguém
novo instala, e a ficha deixa de aparecer na loja.

Cada linha registra a data, o motivo, a evidência que sustentou a decisão e o
que instalar no lugar. O manifesto antigo continua no histórico do git, no
commit anterior ao da remoção.

Há dois tipos de saída. **Aposentado** é definitivo: o projeto acabou.
**Fora da loja até voltar** é temporário: o projeto está vivo, mas o app não sobe
com um clique do jeito que está, e volta quando o conserto abaixo estiver feito.

## Fora da loja até voltar (Goal 30, 17/11/2026)

| App | Por que não sobe com um clique | Evidência | Volta quando |
| --- | --- | --- | --- |
| Gluetun | Sem as credenciais do provedor de VPN o container sai com erro e reinicia para sempre | boot do CI em 15/11/2026: `gluetun: Restarting (1)` | a instalação pedir provedor e credenciais antes de subir |
| Twingate | Sem o token da rede Twingate o conector não sobe; a tag `:1` ainda era flutuante | manifesto com `TWINGATE_ACCESS_TOKEN: ""` | a instalação pedir o token, com a imagem fixada em versão exata |
| Zigbee2MQTT | Precisa de um adaptador Zigbee no USB e de um broker MQTT; a configuração padrão aponta para `mqtt://localhost` e `/dev/ttyACM0` | configuração padrão da imagem | a instalação pedir o adaptador e o broker |
| MatrixSynapse | O nome do servidor é escolhido no primeiro boot e não muda depois; com o padrão `matrix.example.com` a instalação nasce errada. Sem `homeserver.yaml` a imagem também se recusa a subir | `docker/start.py` do Synapse: "no longer supports generating a config file on-the-fly" | a instalação pedir o domínio e gerar a configuração com Postgres |
| Dify | Manifesto preso na 0.12.1 (o upstream está na 1.19), com semente de terceiro só amd64 e o `ssrf_proxy` reiniciando | boot do CI em 15/11/2026: `ssrf_proxy: Restarting (1)` | o manifesto for reescrito a partir do compose oficial 1.x |
| RagFlow | Pede uns 16 GB de RAM, sobe Elasticsearch e OpenSearch juntos, usa espelho só amd64 na v0.21.1 (o upstream está na v1.0.0) e publica o banco no host com a senha padrão | `.boot/RagFlow.json`: `ragflow-es01: Restarting (137)` | o manifesto for reescrito a partir do compose oficial |
| Teable | A imagem fixada só por digest falha numa consulta ao banco na inicialização e nunca abre a porta 3000 | boot do CI de 17/11/2026: `Raw query failed`, Prisma `P2010` em `SystemFieldBackfillService` | o manifesto for refeito com uma versão marcada do compose oficial |
| LibrePhotos | O manifesto só tem o backend: a porta da ficha cai num serviço que escuta em outra porta, sem frontend nem proxy | entrypoint do `librephotos-docker`: o backend escuta em 8001 | o manifesto trouxer frontend, proxy e banco do compose oficial |

## Goal 29, 17/11/2026 (21 apps, catálogo 249 para 228)

Evidência levantada em 17/11/2026 por consulta de leitura à API do GitHub e aos
registries (Docker Hub, ghcr.io, quay.io).

| App | Motivo | Evidência | No lugar, use |
| --- | --- | --- | --- |
| Alist-Sync | Upstream parado desde 03/2025; só faz sentido junto do Alist, papel que o catálogo já cobre | `xjxjin/alist-sync`: último release v1.1.5 em 15/03/2025, último push em 08/04/2025 | OpenList |
| ChatbotUI | Sem commit desde 08/2024, nunca publicou release; a imagem `:main` é de 01/2024 e o app exige um Supabase que o manifesto não traz | `mckaywrigley/chatbot-ui`: `pushed_at` 2024-08-03, `releases/latest` 404 | LibreChat, AnythingLLM |
| Embystat | Imagem e upstream mortos | `linuxserver/docker-embystat` arquivado (último em 10/2023); `mregni/EmbyStat` sem release desde 05/2022 | nenhum no catálogo |
| EmulatorJS | Imagem da linuxserver descontinuada | `linuxserver/docker-emulatorjs` arquivado; última tag 1.9.2-ls173 em 06/2025 | RomM (traz o EmulatorJS embutido) |
| FileBrowser | Projeto encerrado, sem correção de segurança futura, e o app expõe `/DATA` inteiro | `filebrowser/filebrowser` arquivado; o README diz que foi arquivado em 01/09/2026 | Nextcloud, Syncthing |
| Filedrop | Imagem sem atualização desde 09/2023 e sem repositório fonte localizável | Docker Hub `noecl/filedrop`: só tags de 13/09/2023; `gh api repos/noecl/filedrop` 404 | nenhum no catálogo |
| FlowiseAi | Upstream arquivado | `FlowiseAI/Flowise` arquivado; último release flowise@3.1.4 em 29/07/2026 | LangFlow, N8n |
| Focalboard | Sem manutenção; imagem de 2023, só amd64 | README de `mattermost-community/focalboard`: "currently not maintained"; tag mais nova de 02/2024 | Vikunja |
| Hoarder | É o Karakeep com o nome antigo; o catálogo já tem o Karakeep | `hoarder-app/hoarder` redireciona para `karakeep-app/karakeep` | Karakeep |
| HoloPlay | Upstream arquivado; depende de instâncias públicas do Invidious | `stephane-r/holoplay-pwa` arquivado; último release v1.12.3 em 07/2024 | nenhum no catálogo |
| Maybe | Upstream arquivado; o manifesto trazia `SECRET_KEY_BASE` fixo, igual em toda instalação | `maybe-finance/maybe` arquivado em 24/07/2025 | Sure (o fork que continuou o projeto) |
| MineOS | Imagem parada desde 04/2022, só amd64, e senha fixa no manifesto | Docker Hub `hexparrot/mineos`: tag mais nova de 25/04/2022; repo sem push desde 03/2021 | Crafty |
| MinIO | Upstream arquivado e a imagem não baixa mais sem login | `minio/minio` arquivado; o pull anônimo em `quay.io/minio/minio` responde 401 | nenhum no catálogo |
| Overseerr | Upstream e imagem arquivados | `sct/overseerr` e `linuxserver/docker-overseerr` arquivados | Jellyseerr |
| Petio | Imagem de 01/2022, só amd64 apesar de declarar arm e arm64; upstream parado; banco sem volume | config da imagem em ghcr: `created 2022-01-13`, `architecture amd64` | Jellyseerr |
| Pingvin-Share | Upstream arquivado; app de compartilhamento exposto sem correção futura | `stonith404/pingvin-share` arquivado; release final v1.13.0 em 05/2025 | Nextcloud |
| Readarr | Projeto encerrado; a imagem fixada era uma `develop` de 2023 | `Readarr/Readarr` e `linuxserver/docker-readarr` arquivados | Lazylibrarian |
| Snapdrop | Imagem descontinuada pela linuxserver, e publicava a porta 443 do host | `linuxserver/docker-snapdrop` arquivado; README: "This image is deprecated" | nenhum no catálogo |
| TaskingAI | Upstream parado desde 12/2024; o manifesto trazia chave AES, segredo JWT e senha de admin fixos | `TaskingAI/TaskingAI`: último release v0.3.0 em 06/2024 | AnythingLLM |
| Unifi-controller | Imagem descontinuada desde 01/2024 | README de `linuxserver/docker-unifi-controller`: "deprecated... migrate to our Unifi Network Application" | Unifi-Network-Application |
| Whoogle | O projeto anunciou o fim: o Google bloqueou a busca sem JavaScript e o Whoogle não devolve mais resultados | `benbusby/whoogle-search` arquivado; aviso no README de 24/07/2026 | SearXNG |

## Antes do Goal 29

| App | Saiu em | Commit |
| --- | --- | --- |
| Logseq, InvoiceNinja, Authelia | 14/09/2026 | `33ddec6` (o motivo de cada um está no CHANGELOG daquela data) |
