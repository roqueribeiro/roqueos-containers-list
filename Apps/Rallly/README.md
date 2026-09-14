# Rallly

> Marque a reunião sem as vinte mensagens de ida e volta

## O que é

Rallly é uma ferramenta aberta para combinar data: você propõe os horários, cada pessoa marca os que servem, e o melhor aparece sozinho.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço |
| ---- | --------- | --------- | -------------------- | ------- |
| 3000 | 3000      | tcp       | Container Port: 3000 | rallly  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                         | No container             | Serviço   |
| ------------------------------- | ------------------------ | --------- |
| /DATA/AppData/$AppID/postgresql | /var/lib/postgresql/data | rallly-db |

## Variáveis de ambiente

| Variável             | Valor padrão                                                 | Serviço   |
| -------------------- | ------------------------------------------------------------ | --------- |
| DATABASE_URL         | postgres://rallly:f87c7126-f816-47ef-9193-2e5eec763fcd@ralll | rallly    |
| SECRET_PASSWORD      | 0f6f292d-c78c-4709-920d-e3b6361eb5b5                         | rallly    |
| NEXT_PUBLIC_BASE_URL | http://[YOUR_CASAOS_IP]:3000                                 | rallly    |
| NOREPLY_EMAIL        | noreply@example.com                                          | rallly    |
| SUPPORT_EMAIL        | support@example.com                                          | rallly    |
| SMTP_HOST            | [YOUR_CASAOS_IP]                                             | rallly    |
| SMTP_PORT            | 1025                                                         | rallly    |
| SMTP_SECURE          | —                                                            | rallly    |
| SMTP_USER            | —                                                            | rallly    |
| SMTP_PWD             | —                                                            | rallly    |
| SMTP_TLS_ENABLED     | —                                                            | rallly    |
| ALLOWED_EMAILS       | —                                                            | rallly    |
| POSTGRES_PASSWORD    | f87c7126-f816-47ef-9193-2e5eec763fcd                         | rallly-db |
| POSTGRES_DB          | rallly                                                       | rallly-db |
| POSTGRES_USER        | rallly                                                       | rallly-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

- Before you install read this: https://community.roqueribeiro.com/t/added-rallly-to-bigbearcasaos/1012#instructions-3

## Imagens

| Serviço   | Imagem                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------- |
| rallly    | lukevella/rallly:4.12.2@sha256:1b5d20f93b531edf6c79c3de038622142e2209ae7f989c8479c75dde99dcf7e6 |
| rallly-db | postgres:14@sha256:9e279cc7fc6e908da071befe389c576bd6752dbd295a9c078f96a75bab03e54c             |

## Fonte oficial

Projeto original: **lukevella**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
