# Microbin

> Pastebin com criptografia, no seu servidor

## O que é

MicroBin é uma alternativa ao pastebin para rodar em casa: cola texto ou sobe arquivo, define validade e senha, e compartilha o link. Pequeno de propósito.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve             | Serviço  |
| ---- | --------- | --------- | -------------------------- | -------- |
| 8888 | 8080      | tcp       | Web interface for Microbin | microbin |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container       | Serviço  |
| ------------------------- | ------------------ | -------- |
| /DATA/AppData/$AppID/data | /app/microbin_data | microbin |

## Variáveis de ambiente

| Variável                              | Valor padrão            | Serviço  |
| ------------------------------------- | ----------------------- | -------- |
| MICROBIN_ADMIN_USERNAME               | admin                   | microbin |
| MICROBIN_ADMIN_PASSWORD               | change-me-on-first-boot | microbin |
| MICROBIN_EDITABLE                     | true                    | microbin |
| MICROBIN_FOOTER_TEXT                  | —                       | microbin |
| MICROBIN_HIDE_HEADER                  | false                   | microbin |
| MICROBIN_HIDE_FOOTER                  | false                   | microbin |
| MICROBIN_HIDE_LOGO                    | false                   | microbin |
| MICROBIN_NO_LISTING                   | false                   | microbin |
| MICROBIN_HIGHLIGHTSYNTAX              | true                    | microbin |
| MICROBIN_PORT                         | 8080                    | microbin |
| MICROBIN_BIND                         | 0.0.0.0                 | microbin |
| MICROBIN_PRIVATE                      | true                    | microbin |
| MICROBIN_PURE_HTML                    | false                   | microbin |
| MICROBIN_DATA_DIR                     | microbin_data           | microbin |
| MICROBIN_JSON_DB                      | false                   | microbin |
| MICROBIN_PUBLIC_PATH                  | —                       | microbin |
| MICROBIN_SHORT_PATH                   | —                       | microbin |
| MICROBIN_UPLOADER_PASSWORD            | —                       | microbin |
| MICROBIN_READONLY                     | false                   | microbin |
| MICROBIN_SHOW_READ_STATS              | true                    | microbin |
| MICROBIN_TITLE                        | —                       | microbin |
| MICROBIN_THREADS                      | 1                       | microbin |
| MICROBIN_GC_DAYS                      | 90                      | microbin |
| MICROBIN_ENABLE_BURN_AFTER            | true                    | microbin |
| MICROBIN_DEFAULT_BURN_AFTER           | 0                       | microbin |
| MICROBIN_WIDE                         | false                   | microbin |
| MICROBIN_QR                           | true                    | microbin |
| MICROBIN_ETERNAL_PASTA                | false                   | microbin |
| MICROBIN_ENABLE_READONLY              | true                    | microbin |
| MICROBIN_DEFAULT_EXPIRY               | 24hour                  | microbin |
| MICROBIN_NO_FILE_UPLOAD               | false                   | microbin |
| MICROBIN_CUSTOM_CSS                   | —                       | microbin |
| MICROBIN_HASH_IDS                     | false                   | microbin |
| MICROBIN_ENCRYPTION_CLIENT_SIDE       | true                    | microbin |
| MICROBIN_ENCRYPTION_SERVER_SIDE       | true                    | microbin |
| MICROBIN_MAX_FILE_SIZE_ENCRYPTED_MB   | 256                     | microbin |
| MICROBIN_MAX_FILE_SIZE_UNENCRYPTED_MB | 2048                    | microbin |
| MICROBIN_DISABLE_UPDATE_CHECKING      | false                   | microbin |
| MICROBIN_DISABLE_TELEMETRY            | false                   | microbin |
| MICROBIN_LIST_SERVER                  | false                   | microbin |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8888/`.

- For a full list of Microbin environment variables and their meanings, see:
- https://github.com/szabodanika/microbin/blob/master/.env

## Imagens

| Serviço  | Imagem                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------- |
| microbin | danielszabo99/microbin:2.1.4@sha256:6660e5ccad0d764fa3c0032464ffb8f4b4f28c92a2eb9e39202b94cdc5b68909 |

## Fonte oficial

Projeto original: **danielszabo99**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
