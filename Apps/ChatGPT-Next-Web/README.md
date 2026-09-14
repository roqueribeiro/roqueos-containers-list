# ChatGPT Next Web

> Uma interface de ChatGPT bem desenhada, em qualquer plataforma

## O que é

Aplicativo de conversa baseado em ChatGPT, com instalação rápida, suporte a Markdown, interface bonita e resposta fluida. Dá para criar personagens prontos e compartilhar conversas personalizadas.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço          |
| ---- | --------- | --------- | --------------- | ---------------- |
| 3000 | 3000      | tcp       | WebUI HTTP Port | chatgpt-next-web |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

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
