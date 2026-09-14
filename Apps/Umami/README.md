# Umami

> Análise de visita simples, rápida e sem rastrear ninguém

## O que é

Umami é uma alternativa ao Google Analytics: mostra quantas visitas a sua página teve e de onde vieram, sem cookie, sem perfil de pessoa e com o dado no seu servidor.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve          | Serviço |
| ---- | --------- | --------- | ----------------------- | ------- |
| 3000 | 3000      | tcp       | Web interface for Umami | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container             | Serviço |
| --------------------------- | ------------------------ | ------- |
| /DATA/AppData/$AppID/pgdata | /var/lib/postgresql/data | db      |

## Variáveis de ambiente

| Variável          | Valor padrão                           | Serviço |
| ----------------- | -------------------------------------- | ------- |
| DATABASE_URL      | postgresql://umami:umami@db:5432/umami | app     |
| DATABASE_TYPE     | postgresql                             | app     |
| APP_SECRET        | replace-me-with-a-random-string        | app     |
| POSTGRES_DB       | umami                                  | db      |
| POSTGRES_USER     | umami                                  | db      |
| POSTGRES_PASSWORD | umami                                  | db      |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

## Imagens

| Serviço | Imagem                                                                                                                 |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| app     | ghcr.io/umami-software/umami:postgresql-latest@sha256:87312d334d009ee67ee0d2fba8fed01435547cc468e452243aef5133a9984d48 |
| db      | postgres:15-alpine@sha256:3d0f7584ed7d04e27fa050d6683a74746608faf21f202be78460d679cc56461f                             |

## Fonte oficial

Projeto original: **umami-software**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
