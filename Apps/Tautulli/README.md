# Tautulli

> Monitore seu servidor de mídia Plex e muito mais.

## O que é

O Tautulli é um aplicativo de terceiros que você pode executar junto com seu servidor de mídia Plex para monitorar a atividade e rastrear várias estatísticas.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve             | Serviço  |
| ---- | --------- | --------- | -------------------------- | -------- |
| 8181 | 8181      | tcp       | Web interface for Tautulli | tautulli |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço  |
| --------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/config | /config      | tautulli |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço  |
| -------- | ------------- | -------- |
| PGID     | 1000          | tautulli |
| PUID     | 1000          | tautulli |
| TZ       | Europe/London | tautulli |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8181/`.

## Imagens

| Serviço  | Imagem                      |
| -------- | --------------------------- |
| tautulli | linuxserver/tautulli:2.13.2 |

## Fonte oficial

Projeto original: https://tautulli.com/

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
