# Navidrome

> Music Collection and Streaming Server

## O que é

Navidrome is an open source web-based music collection server and streamer. It gives you freedom to listen to your music collection from any browser or mobile device. It's like your personal Spotify!

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve           | Serviço   |
| ---- | --------- | --------- | ------------------------ | --------- |
| 4533 | 4533      | tcp       | WebUI Port for Navidrome | navidrome |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço   |
| ------------------------- | ------------ | --------- |
| /DATA/AppData/$AppID/data | /data        | navidrome |
| /DATA/Media/Music         | /music       | navidrome |

## Variáveis de ambiente

| Variável          | Valor padrão | Serviço   |
| ----------------- | ------------ | --------- |
| ND_SCANSCHEDULE   | 1h           | navidrome |
| ND_LOGLEVEL       | info         | navidrome |
| ND_SESSIONTIMEOUT | 24h          | navidrome |
| ND_BASEURL        | —            | navidrome |
| TZ                | $TZ          | navidrome |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:4533/`.

## Imagens

| Serviço   | Imagem                  |
| --------- | ----------------------- |
| navidrome | deluan/navidrome:0.58.5 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
