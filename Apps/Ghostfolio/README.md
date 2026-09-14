# Ghostfolio

> Acompanhe seus investimentos sem entregar seus dados

## O que é

Ghostfolio é um gerenciador de patrimônio de código aberto. Acompanha carteira, aporte e rendimento em várias moedas, rodando no seu servidor em vez de no de um banco.

Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço    |
| ---- | --------- | --------- | -------------------- | ---------- |
| 3333 | 3333      | tcp       | Container Port: 3333 | ghostfolio |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                         | No container             | Serviço          |
| ------------------------------- | ------------------------ | ---------------- |
| /DATA/AppData/$AppID/data/db    | /var/lib/postgresql/data | ghostfolio-db    |
| /DATA/AppData/$AppID/data/redis | /data                    | ghostfolio-redis |

## Variáveis de ambiente

| Variável          | Valor padrão                                                 | Serviço       |
| ----------------- | ------------------------------------------------------------ | ------------- |
| NODE_ENV          | production                                                   | ghostfolio    |
| HOST              | 0.0.0.0                                                      | ghostfolio    |
| PORT              | 3333                                                         | ghostfolio    |
| ACCESS_TOKEN_SALT | 5a7f9e0d-0e64-4c19-8279-bbe8b4c590f4                         | ghostfolio    |
| DATABASE_URL      | postgresql://ghostfolio:casaospassword@ghostfolio-db:5432/gh | ghostfolio    |
| JWT_SECRET_KEY    | 534e820d-da30-4dd3-baf9-0511847c478a                         | ghostfolio    |
| POSTGRES_DB       | ghostfolio                                                   | ghostfolio    |
| POSTGRES_USER     | ghostfolio                                                   | ghostfolio    |
| POSTGRES_PASSWORD | casaospassword                                               | ghostfolio    |
| REDIS_HOST        | ghostfolio-redis                                             | ghostfolio    |
| REDIS_PASSWORD    | casaosredispassword                                          | ghostfolio    |
| REDIS_PORT        | 6379                                                         | ghostfolio    |
| POSTGRES_DB       | ghostfolio                                                   | ghostfolio-db |
| POSTGRES_USER     | ghostfolio                                                   | ghostfolio-db |
| POSTGRES_PASSWORD | casaospassword                                               | ghostfolio-db |
| PGDATA            | /var/lib/postgresql/data                                     | ghostfolio-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3333/`.

## Imagens

| Serviço          | Imagem                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| ghostfolio       | ghostfolio/ghostfolio:3.47.0@sha256:98d873ef174248896b38e3fc287c1c49d2368883eb90c9e41121c3cf1cba8771 |
| ghostfolio-db    | postgres:15.4-alpine@sha256:35ce2187f2f7fb75e8e79493e13743596c21eb3789ff41ece145ae04d06e93a5         |
| ghostfolio-redis | redis:7.4.6-alpine@sha256:7a7c6b5c49a6896d0a58ee0c6dc0dcabe14f30f0a2f7d2d1362d276fa2d43166           |

## Fonte oficial

Projeto original: **ghostfolio**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
