# Dify

> LLM App Development Platform

## O que é

Dify is an open-source large language model (LLM) application development platform. It combines the concepts of Backend-as-a-Service and LLMOps to enable developers to quickly build production-grade generative AI applications. Even non-technical personnel can participate in the definition and data operations of AI applications.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: arm64, amd64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 3701 | 80        | tcp       | Web interface for Dify | nginx   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                        | No container             | Serviço    |
| ---------------------------------------------- | ------------------------ | ---------- |
| /DATA/AppData/$AppID/data/nginx                | /configs/nginx           | config     |
| /DATA/AppData/$AppID/data/ssrf_proxy           | /configs/ssrf_proxy      | config     |
| /DATA/AppData/$AppID/data/sandbox              | /configs/sandbox         | config     |
| /DATA/AppData/$AppID/data/app/api/storage      | /app/api/storage         | api        |
| /DATA/AppData/$AppID/data/app/api/storage      | /app/api/storage         | worker     |
| /DATA/AppData/$AppID/data/db/data              | /var/lib/postgresql/data | db         |
| /DATA/AppData/$AppID/data/redis/data           | /data                    | redis      |
| /DATA/AppData/$AppID/data/weaviate             | /var/lib/weaviate        | weaviate   |
| /DATA/AppData/$AppID/data/sandbox/dependencies | /dependencies            | sandbox    |
| /DATA/AppData/$AppID/data/ssrf_proxy           | /etc/squid               | ssrf_proxy |
| /DATA/AppData/$AppID/data/nginx                | /etc/nginx               | nginx      |

## Variáveis de ambiente

| Variável                                | Valor padrão                         | Serviço    |
| --------------------------------------- | ------------------------------------ | ---------- |
| MODE                                    | api                                  | api        |
| LOG_LEVEL                               | INFO                                 | api        |
| SECRET_KEY                              | your-secret-key-here                 | api        |
| CONSOLE_WEB_URL                         | —                                    | api        |
| INIT_PASSWORD                           | —                                    | api        |
| CONSOLE_API_URL                         | —                                    | api        |
| SERVICE_API_URL                         | —                                    | api        |
| APP_WEB_URL                             | —                                    | api        |
| FILES_URL                               | —                                    | api        |
| FILES_ACCESS_TIMEOUT                    | 300                                  | api        |
| MIGRATION_ENABLED                       | true                                 | api        |
| DB_USERNAME                             | postgres                             | api        |
| DB_PASSWORD                             | difyai123456                         | api        |
| DB_HOST                                 | db                                   | api        |
| DB_PORT                                 | 5432                                 | api        |
| DB_DATABASE                             | dify                                 | api        |
| REDIS_HOST                              | redis                                | api        |
| REDIS_PORT                              | 6379                                 | api        |
| REDIS_PASSWORD                          | difyai123456                         | api        |
| REDIS_DB                                | 0                                    | api        |
| CELERY_BROKER_URL                       | redis://:difyai123456@redis:6379/1   | api        |
| WEB_API_CORS_ALLOW_ORIGINS              | *                                    | api        |
| CONSOLE_CORS_ALLOW_ORIGINS              | *                                    | api        |
| STORAGE_TYPE                            | local                                | api        |
| STORAGE_LOCAL_PATH                      | storage                              | api        |
| VECTOR_STORE                            | weaviate                             | api        |
| WEAVIATE_ENDPOINT                       | http://weaviate:8080                 | api        |
| WEAVIATE_API_KEY                        | WVF5YThaHlkYwhGUSmCRgsX3tD5ngdN8pkih | api        |
| CODE_EXECUTION_ENDPOINT                 | http://sandbox:8194                  | api        |
| CODE_EXECUTION_API_KEY                  | dify-sandbox                         | api        |
| CODE_MAX_NUMBER                         | 9223372036854775807                  | api        |
| CODE_MIN_NUMBER                         | -9223372036854775808                 | api        |
| CODE_MAX_STRING_LENGTH                  | 80000                                | api        |
| TEMPLATE_TRANSFORM_MAX_LENGTH           | 80000                                | api        |
| CODE_MAX_STRING_ARRAY_LENGTH            | 30                                   | api        |
| CODE_MAX_OBJECT_ARRAY_LENGTH            | 30                                   | api        |
| CODE_MAX_NUMBER_ARRAY_LENGTH            | 1000                                 | api        |
| SSRF_PROXY_HTTP_URL                     | http://ssrf_proxy:3128               | api        |
| SSRF_PROXY_HTTPS_URL                    | http://ssrf_proxy:3128               | api        |
| INDEXING_MAX_SEGMENTATION_TOKENS_LENGTH | 1000                                 | api        |
| MODE                                    | worker                               | worker     |
| LOG_LEVEL                               | INFO                                 | worker     |
| SECRET_KEY                              | your-secret-key-here                 | worker     |
| DB_USERNAME                             | postgres                             | worker     |
| DB_PASSWORD                             | difyai123456                         | worker     |
| DB_HOST                                 | db                                   | worker     |
| DB_PORT                                 | 5432                                 | worker     |
| DB_DATABASE                             | dify                                 | worker     |
| REDIS_HOST                              | redis                                | worker     |
| REDIS_PORT                              | 6379                                 | worker     |
| REDIS_PASSWORD                          | difyai123456                         | worker     |
| REDIS_DB                                | 0                                    | worker     |
| REDIS_USE_SSL                           | false                                | worker     |
| CELERY_BROKER_URL                       | redis://:difyai123456@redis:6379/1   | worker     |
| STORAGE_TYPE                            | local                                | worker     |
| STORAGE_LOCAL_PATH                      | storage                              | worker     |
| VECTOR_STORE                            | weaviate                             | worker     |
| WEAVIATE_ENDPOINT                       | http://weaviate:8080                 | worker     |
| WEAVIATE_API_KEY                        | WVF5YThaHlkYwhGUSmCRgsX3tD5ngdN8pkih | worker     |
| CONSOLE_API_URL                         | —                                    | web        |
| APP_API_URL                             | —                                    | web        |
| PGUSER                                  | postgres                             | db         |
| POSTGRES_PASSWORD                       | difyai123456                         | db         |
| POSTGRES_DB                             | dify                                 | db         |
| PGDATA                                  | /var/lib/postgresql/data/pgdata      | db         |
| REDISCLI_AUTH                           | difyai123456                         | redis      |
| QUERY_DEFAULTS_LIMIT                    | 25                                   | weaviate   |
| AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED | false                                | weaviate   |
| PERSISTENCE_DATA_PATH                   | /var/lib/weaviate                    | weaviate   |
| DEFAULT_VECTORIZER_MODULE               | none                                 | weaviate   |
| CLUSTER_HOSTNAME                        | node1                                | weaviate   |
| AUTHENTICATION_APIKEY_ENABLED           | true                                 | weaviate   |
| AUTHENTICATION_APIKEY_ALLOWED_KEYS      | WVF5YThaHlkYwhGUSmCRgsX3tD5ngdN8pkih | weaviate   |
| AUTHENTICATION_APIKEY_USERS             | hello@dify.ai                        | weaviate   |
| AUTHORIZATION_ADMINLIST_ENABLED         | true                                 | weaviate   |
| AUTHORIZATION_ADMINLIST_USERS           | hello@dify.ai                        | weaviate   |
| API_KEY                                 | dify-sandbox                         | sandbox    |
| GIN_MODE                                | release                              | sandbox    |
| WORKER_TIMEOUT                          | 15                                   | sandbox    |
| ENABLE_NETWORK                          | true                                 | sandbox    |
| HTTP_PROXY                              | http://ssrf_proxy:3128               | sandbox    |
| HTTPS_PROXY                             | http://ssrf_proxy:3128               | sandbox    |
| SANDBOX_PORT                            | 8194                                 | sandbox    |
| HTTP_PORT                               | 3128                                 | ssrf_proxy |
| COREDUMP_DIR                            | /var/spool/squid                     | ssrf_proxy |
| REVERSE_PROXY_PORT                      | 8194                                 | ssrf_proxy |
| SANDBOX_HOST                            | sandbox                              | ssrf_proxy |
| SANDBOX_PORT                            | 8194                                 | ssrf_proxy |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3701/`.

## Imagens

| Serviço    | Imagem                           |
| ---------- | -------------------------------- |
| config     | ns2kracy/dify-config:latest      |
| api        | langgenius/dify-api:0.12.1       |
| worker     | langgenius/dify-api:0.12.1       |
| web        | langgenius/dify-web:0.12.1       |
| db         | postgres:15-alpine               |
| redis      | redis:6-alpine                   |
| weaviate   | semitechnologies/weaviate:1.19.0 |
| sandbox    | langgenius/dify-sandbox:0.2.10   |
| ssrf_proxy | ubuntu/squid:latest              |
| nginx      | nginx:latest                     |

## Fonte oficial

Projeto original: **LangGenius**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
