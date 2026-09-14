# Real-Debrid Torrent Client

> Cliente de torrent web para Real-Debrid, Premiumize e AllDebrid

## O que é

RDT-Client (Real-Debrid Torrent Client) é uma interface web que adiciona torrents à sua conta Real-Debrid, Premiumize ou AllDebrid e baixa os arquivos direto pro servidor. Expõe uma API compatível com qBittorrent para que o stack *arr (Sonarr, Radarr, Lidarr) consiga consumir sem mexer em nada.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                               | Serviço   |
| ---- | --------- | --------- | -------------------------------------------- | --------- |
| 6500 | 6500      | tcp       | Web interface for Real-Debrid Torrent Client | rdtclient |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                 | No container    | Serviço   |
| ----------------------- | --------------- | --------- |
| /DATA/Downloads         | /data/downloads | rdtclient |
| /DATA/AppData/$AppID/db | /data/db        | rdtclient |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço   |
| -------- | ------------ | --------- |
| PGID     | $PGID        | rdtclient |
| PUID     | $PUID        | rdtclient |
| TZ       | $TZ          | rdtclient |
| UMASK    | 002          | rdtclient |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6500/`.

## Imagens

| Serviço   | Imagem               |
| --------- | -------------------- |
| rdtclient | rogerfar/rdtclient:2 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
