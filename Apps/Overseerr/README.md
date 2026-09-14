# Overseerr

> O Overseerr é uma ferramenta de gerenciamento de solicitações e descoberta de mídia construída para funcionar com seu ecossistema Plex existente.

## O que é

O Overseerr é um aplicativo de software gratuito e de código aberto para gerenciar solicitações em sua biblioteca de mídia. Ele se integra aos seus serviços existentes, como Sonarr, Radarr e Plex!

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                           | Serviço   |
| ---- | --------- | --------- | ---------------------------------------- | --------- |
| 5055 | 5055      | tcp       | Porta para a interface web do Overseerr. | overseerr |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container | Serviço   |
| ------------------------------ | ------------ | --------- |
| /DATA/AppData/overseerr/config | /config      | overseerr |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço   |
| -------- | ------------ | --------- |
| PUID     | $PUID        | overseerr |
| PGID     | $PGID        | overseerr |
| TZ       | $TZ          | overseerr |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5055/`.

## Imagens

| Serviço   | Imagem                       |
| --------- | ---------------------------- |
| overseerr | linuxserver/overseerr:1.33.2 |

## Fonte oficial

Projeto original: **LinuxServer.io**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
