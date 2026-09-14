# NocoDB

> Transforma seu banco numa planilha colaborativa

## O que é

NocoDB põe uma interface de planilha sobre um banco de dados de verdade: alternativa aberta ao Airtable, montando sistema sem escrever código e sem prender o dado num serviço.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço |
| ---- | --------- | --------- | -------------------- | ------- |
| 8080 | 8080      | tcp       | Container Port: 8080 | nocodb  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container             | Serviço      |
| --------------------------- | ------------------------ | ------------ |
| /DATA/AppData/$AppID/data   | /usr/src/app/data        | nocodb       |
| /DATA/AppData/$AppID/pgdata | /var/lib/postgresql/data | nocodb-db    |
| /DATA/AppData/$AppID/redis  | /data                    | nocodb-redis |

## Variáveis de ambiente

| Variável           | Valor padrão                                   | Serviço   |
| ------------------ | ---------------------------------------------- | --------- |
| DATABASE_URL       | postgres://nocodb:nocodb@nocodb-db:5432/nocodb | nocodb    |
| NC_AUTH_JWT_SECRET | 899499fc-36a0-4131-b077-7bb9f051ac9b           | nocodb    |
| NC_REDIS_URL       | redis://default:casaos@nocodb-redis:6379       | nocodb    |
| POSTGRES_DB        | nocodb                                         | nocodb-db |
| POSTGRES_USER      | nocodb                                         | nocodb-db |
| POSTGRES_PASSWORD  | nocodb                                         | nocodb-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

## Imagens

| Serviço      | Imagem                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------- |
| nocodb       | nocodb/nocodb:0.301.5@sha256:d9516f0bf546fd6c78a382ab0657626c683fca7aaafdbbe53c66baf15df7fc0d |
| nocodb-db    | postgres:13@sha256:4689940c683801b4ab839ab3b0a0a3555a5fe425371422310944e89eca7d8068           |
| nocodb-redis | redis:8.2.2-alpine@sha256:1c78f5e7512cc8b22b0edc95c20e7abd9e1fd832e5dfd5c3c6b59ce82fb238d0    |

## Fonte oficial

Projeto original: **nocodb**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
