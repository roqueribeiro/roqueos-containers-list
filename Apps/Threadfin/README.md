# Threadfin

> M3U proxy server

## O que é

Threadfin is a M3U proxy server for Plex, Emby, Jellyfin and any client and provider which supports the .TS and .M3U8 (HLS) streaming formats.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host  | Container | Protocolo | Para que serve                                              | Serviço   |
| ----- | --------- | --------- | ----------------------------------------------------------- | --------- |
| 34400 | 34400     | tcp       | Port to access the application's GUI via the web interface. | threadfin |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container                | Serviço   |
| ------------------------------ | --------------------------- | --------- |
| /DATA/AppData/threadfin/config | /home/threadfin/conf/data   | threadfin |
| /DATA/AppData/threadfin/backup | /home/threadfin/conf/backup | threadfin |

## Variáveis de ambiente

| Variável         | Valor padrão | Serviço   |
| ---------------- | ------------ | --------- |
| THREADFIN_BRANCH | main         | threadfin |
| THREADFIN_DEBUG  | 0            | threadfin |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:34400/web/`.

## Imagens

| Serviço   | Imagem                      |
| --------- | --------------------------- |
| threadfin | fyb3roptik/threadfin:latest |

## Fonte oficial

Projeto original: **jdownloader**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
