# TaskingAI

> The developer-friendly cloud platform for building and running LLM agents for AI-native applications.

## O que é

The developer-friendly cloud platform for building and running LLM agents for AI-native applications.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve              | Serviço |
| ---- | --------- | --------- | --------------------------- | ------- |
| 3080 | 80        | tcp       | Web interface for TaskingAI | nginx   |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                  | No container             | Serviço        |
| ---------------------------------------- | ------------------------ | -------------- |
| /DATA/AppData/$AppID/data/object_storage | /var/lib/data            | backend-plugin |
| /DATA/AppData/$AppID/data/object_storage | /var/lib/data            | backend-api    |
| /DATA/AppData/$AppID/data/object_storage | /var/lib/data            | backend-web    |
| /DATA/AppData/$AppID/data/postgres       | /var/lib/postgresql/data | db             |
| /DATA/AppData/$AppID/data/redis          | /data                    | cache          |
| /DATA/AppData/$AppID/data/nginx_cache    | /var/cache/nginx         | nginx          |

## Variáveis de ambiente

| Variável                | Valor padrão                                                 | Serviço           |
| ----------------------- | ------------------------------------------------------------ | ----------------- |
| AES_ENCRYPTION_KEY      | b90e4648ad699c3bdf62c0860e09eb9efc098ee75f215bf750847ae19d41 | backend-inference |
| ICON_URL_PREFIX         | http://nginx:3080                                            | backend-inference |
| PROJECT_ID              | taskingai                                                    | backend-inference |
| AES_ENCRYPTION_KEY      | b90e4648ad699c3bdf62c0860e09eb9efc098ee75f215bf750847ae19d41 | backend-plugin    |
| ICON_URL_PREFIX         | http://nginx:3080                                            | backend-plugin    |
| OBJECT_STORAGE_TYPE     | local                                                        | backend-plugin    |
| HOST_URL                | http://nginx:3080                                            | backend-plugin    |
| PATH_TO_VOLUME          | /var/lib/data                                                | backend-plugin    |
| PROJECT_ID              | taskingai                                                    | backend-plugin    |
| POSTGRES_URL            | postgres://postgres:TaskingAI321@db:5432/taskingai           | backend-api       |
| REDIS_URL               | redis://:TaskingAI321@cache:6379/0                           | backend-api       |
| TASKINGAI_INFERENCE_URL | http://backend-inference:8000                                | backend-api       |
| TASKINGAI_PLUGIN_URL    | http://backend-plugin:8000                                   | backend-api       |
| AES_ENCRYPTION_KEY      | b90e4648ad699c3bdf62c0860e09eb9efc098ee75f215bf750847ae19d41 | backend-api       |
| OBJECT_STORAGE_TYPE     | local                                                        | backend-api       |
| HOST_URL                | http://nginx:3080                                            | backend-api       |
| PATH_TO_VOLUME          | /var/lib/data                                                | backend-api       |
| PROJECT_ID              | taskingai                                                    | backend-api       |
| POSTGRES_URL            | postgres://postgres:TaskingAI321@db:5432/taskingai           | backend-web       |
| REDIS_URL               | redis://:TaskingAI321@cache:6379/0                           | backend-web       |
| TASKINGAI_INFERENCE_URL | http://backend-inference:8000                                | backend-web       |
| TASKINGAI_PLUGIN_URL    | http://backend-plugin:8000                                   | backend-web       |
| AES_ENCRYPTION_KEY      | b90e4648ad699c3bdf62c0860e09eb9efc098ee75f215bf750847ae19d41 | backend-web       |
| JWT_SECRET_KEY          | dbefe42f34473990a3fa903a6a3283acdc3a910beb1ae271a6463ffa5a92 | backend-web       |
| PURPOSE                 | WEB                                                          | backend-web       |
| DEFAULT_ADMIN_USERNAME  | admin                                                        | backend-web       |
| DEFAULT_ADMIN_PASSWORD  | TaskingAI321                                                 | backend-web       |
| OBJECT_STORAGE_TYPE     | local                                                        | backend-web       |
| HOST_URL                | http://nginx:3080                                            | backend-web       |
| PATH_TO_VOLUME          | /var/lib/data                                                | backend-web       |
| PROJECT_ID              | taskingai                                                    | backend-web       |
| POSTGRES_DB             | taskingai                                                    | db                |
| POSTGRES_USER           | postgres                                                     | db                |
| POSTGRES_PASSWORD       | TaskingAI321                                                 | db                |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3080/`.

- | Username | Password   |
- | -------- | ---------- |
- | admin    | TaskingAI321 |

## Imagens

| Serviço           | Imagem                                |
| ----------------- | ------------------------------------- |
| frontend          | taskingai/taskingai-console:v0.3.0    |
| backend-inference | taskingai/taskingai-inference:v0.2.14 |
| backend-plugin    | taskingai/taskingai-plugin:v0.2.10    |
| backend-api       | taskingai/taskingai-server:v0.3.0     |
| backend-web       | taskingai/taskingai-server:v0.3.0     |
| db                | ankane/pgvector:v0.5.1                |
| cache             | redis:7-alpine                        |
| nginx             | nginx:1.24                            |

## Fonte oficial

Projeto original: **TaskingAI Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
