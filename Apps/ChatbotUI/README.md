# Chatbot UI

> Interface de chat de código aberto para modelos de IA

## O que é

Chatbot UI é uma interface de chat de código aberto para modelos de IA.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço    |
| ---- | --------- | --------- | --------------- | ---------- |
| 3080 | 3000      | tcp       | WebUI HTTP Port | chatbot-ui |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável | Valor padrão | Serviço    |
| -------- | ------------ | ---------- |
| PGID     | $PGID        | chatbot-ui |
| PUID     | $PUID        | chatbot-ui |
| TZ       | $TZ          | chatbot-ui |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3080/`.

## Imagens

| Serviço    | Imagem                               |
| ---------- | ------------------------------------ |
| chatbot-ui | ghcr.io/mckaywrigley/chatbot-ui:main |

## Fonte oficial

Projeto original: **Mckay Wrigley**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
