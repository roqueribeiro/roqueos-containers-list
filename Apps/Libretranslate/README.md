# LibreTranslate

> API de tradução automática que roda na sua máquina

## O que é

LibreTranslate é uma API de tradução livre e inteiramente auto-hospedada. Diferente das outras, não depende de serviço de terceiro: o modelo roda no seu servidor e o texto não sai dele.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço        |
| ---- | --------- | --------- | -------------------- | -------------- |
| 5000 | 5000      | tcp       | Container Port: 5000 | libretranslate |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container                | Serviço        |
| --------------------------- | --------------------------- | -------------- |
| /DATA/AppData/$AppID/db     | /app/db                     | libretranslate |
| /DATA/AppData/$AppID/.local | /home/libretranslate/.local | libretranslate |

## Variáveis de ambiente

| Variável            | Valor padrão               | Serviço        |
| ------------------- | -------------------------- | -------------- |
| LT_API_KEYS         | true                       | libretranslate |
| LT_API_KEYS_DB_PATH | /app/db/api_keys.db        | libretranslate |
| LT_UPDATE_MODELS    | true                       | libretranslate |
| LT_LOAD_ONLY        | en,fr,es,de,it,pt,ru,ja,zh | libretranslate |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5000/`.

## Imagens

| Serviço        | Imagem                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| libretranslate | libretranslate/libretranslate:v1.9.6@sha256:1de2d7056bb8ad607a412f4563d9abe324ff632b43b5be9428bcc8e213aebb32 |

## Fonte oficial

Projeto original: **LibreTranslate**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
