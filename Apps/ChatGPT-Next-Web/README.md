# ChatGPT Next Web

> A well-designed cross-platform ChatGPT UI.

## O que é

An intelligent chat application based on ChatGPT, supports fast deployment, Markdown, beautiful UI, fluid response, privacy and security, and allows customization of preset roles for quick creation, sharing, and debugging of personalized conversations.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço          |
| ---- | --------- | --------- | --------------- | ---------------- |
| 3000 | 3000      | tcp       | WebUI HTTP Port | chatgpt-next-web |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável  | Valor padrão           | Serviço          |
| --------- | ---------------------- | ---------------- |
| PGID      | $PGID                  | chatgpt-next-web |
| PUID      | $PUID                  | chatgpt-next-web |
| TZ        | $TZ                    | chatgpt-next-web |
| CODE      | —                      | chatgpt-next-web |
| PROXY_URL | —                      | chatgpt-next-web |
| BASE_URL  | https://api.openai.com | chatgpt-next-web |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

## Imagens

| Serviço          | Imagem                           |
| ---------------- | -------------------------------- |
| chatgpt-next-web | yidadaa/chatgpt-next-web:v2.16.1 |

## Fonte oficial

Projeto original: **Yidadaa**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
