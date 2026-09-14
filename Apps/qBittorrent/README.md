# qBittorrent

> Downloader BitTorrent gratuito

## O que é

O objetivo do projeto qBittorrent é fornecer uma alternativa de software de código aberto ao µTorrent.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço     |
| ---- | --------- | --------- | --------------- | ----------- |
| 8181 | 8080      | tcp       | WebUI HTTP Port | qbittorrent |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço     |
| --------------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID/config | /config      | qbittorrent |
| /DATA                       | /DATA        | qbittorrent |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço     |
| -------- | ------------ | ----------- |
| PGID     | $PGID        | qbittorrent |
| PUID     | $PUID        | qbittorrent |
| TZ       | $TZ          | qbittorrent |
| UMASK    | 002          | qbittorrent |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8181/`.

- Default Account
- | Username | Password |
- |----------|----------|
- | `admin`    | Get from log |
- Passwords need to be viewed in the log
- Default Accessible Path in qBittorrent
- | Name | Value |
- | ---- | ----- |
- | DATA Path | `/DATA` |
- | Downloads Path | `/DATA/Downloads` |
- | Media Path | `/DATA/Media` |
- The paths of other DATA subdirectories in RoqueOS are also similar.
- Please make sure you use the correct path when using qBittorrent.

## Imagens

| Serviço     | Imagem                                  |
| ----------- | --------------------------------------- |
| qbittorrent | ghcr.io/hotio/qbittorrent:release-5.0.4 |

## Fonte oficial

Projeto original: **qBittorrent**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
