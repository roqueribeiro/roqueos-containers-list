# Pocket ID

> Login por passkey, sem senha e sem servidor gigante

## O que é

Pocket ID é um provedor OIDC simples em que as pessoas entram com a passkey do próprio aparelho. Serve para colocar login único nos seus serviços sem instalar um Keycloak.

Categoria na App Store do RoqueOS: **Security**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve              | Serviço  |
| ---- | --------- | --------- | --------------------------- | -------- |
| 1411 | 1411      | tcp       | Web interface for Pocket ID | pocketid |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço  |
| ------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/data | /app/data    | pocketid |

## Variáveis de ambiente

| Variável            | Valor padrão          | Serviço  |
| ------------------- | --------------------- | -------- |
| APP_URL             | http://localhost:1411 | pocketid |
| TRUST_PROXY         | false                 | pocketid |
| MAXMIND_LICENSE_KEY | —                     | pocketid |
| PUID                | 1000                  | pocketid |
| PGID                | 1000                  | pocketid |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1411/`.

- Before you install read this: https://community.roqueribeiro.com/t/added-pocket-id-to-bigbearcasaos/3552#p-6013-documentation-4

## Imagens

| Serviço  | Imagem                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------- |
| pocketid | ghcr.io/pocket-id/pocket-id:v2.7@sha256:45bdeaf3fcd6d07cf8721e98785d93324bb8e65b586498874c05a3d489c8094e |

## Fonte oficial

Projeto original: **pocket-id**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
