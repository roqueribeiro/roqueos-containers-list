# RagFlow

> RagFlow is an open-source RAG engine based on deep document understanding.

## O que é

RagFlow is an open-source RAG (Retrieval-Augmented Generation) engine based on deep document understanding. It enables users to build their own private ChatGPT by leveraging the power of large language models and deep document parsing capabilities. RagFlow supports various document formats including PDF, Word, Markdown, and more, allowing users to create intelligent question-answering systems based on their own documents.

**Key Features:**
- Deep document understanding with advanced parsing capabilities
- Support for multiple document formats (PDF, Word, Markdown, etc.)
- Private knowledge base with data security assurance
- Customizable RAG workflows for different use cases
- Integration with popular large language models
- Web-based interface for easy management and interaction

**Hardware Requirements:**
- CPU >= 4 cores
- RAM >= 16 GB
- Disk >= 50 GB

**Learn More:**
- [RagFlow Official Website](https://ragflow.io)
- [RagFlow GitHub Repository](https://github.com/infiniflow/ragflow)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve           | Serviço                          |
| ----- | --------- | --------- | ------------------------ | -------------------------------- |
| 9380  | 9380      | tcp       | RagFlow API Port         | ragflow                          |
| 30080 | 80        | tcp       | RagFlow HTTP Port        | ragflow                          |
| 10443 | 443       | tcp       | RagFlow HTTPS Port       | ragflow                          |
| 5678  | 5678      | tcp       | RagFlow Debug Port       | ragflow                          |
| 5679  | 5679      | tcp       | RagFlow WebSocket Port   | ragflow                          |
| 9382  | 9382      | tcp       | RagFlow MCP Port         | ragflow                          |
| 9200  | 9200      | tcp       | Elasticsearch HTTP Port  | ragflow-es01                     |
| 23817 | 23817     | tcp       | Infinity Admin Port      | ragflow-infinity                 |
| 23820 | 23820     | tcp       | Infinity API Port        | ragflow-infinity                 |
| 15432 | 5432      | tcp       | Infinity PostgreSQL Port | ragflow-infinity                 |
| 9000  | 9000      | tcp       | MinIO API Port           | ragflow-minio                    |
| 9001  | 9001      | tcp       | MinIO Console Port       | ragflow-minio                    |
| 5455  | 3306      | tcp       | MySQL Port               | ragflow-mysql                    |
| 9201  | 9201      | tcp       | OpenSearch HTTP Port     | ragflow-opensearch01             |
| 6379  | 6379      | tcp       | Redis Port               | ragflow-redis                    |
| 9385  | 9385      | tcp       | —                        | ragflow-sandbox-executor-manager |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                 | No container                  | Serviço                          |
| --------------------------------------- | ----------------------------- | -------------------------------- |
| /DATA/AppData/$AppID/ragflow-logs       | /ragflow/logs                 | ragflow                          |
| /DATA/AppData/$AppID/history_data_agent | /ragflow/history_data_agent   | ragflow                          |
| /DATA/AppData/$AppID/es01               | /usr/share/elasticsearch/data | ragflow-es01                     |
| /DATA/AppData/$AppID/infinity           | /var/infinity                 | ragflow-infinity                 |
| /DATA/AppData/$AppID/minio              | /data                         | ragflow-minio                    |
| /DATA/AppData/$AppID/mysql              | /var/lib/mysql                | ragflow-mysql                    |
| /DATA/AppData/$AppID/opensearch01       | /usr/share/opensearch/data    | ragflow-opensearch01             |
| /DATA/AppData/$AppID/redis              | /data                         | ragflow-redis                    |
| /var/run/docker.sock                    | /var/run/docker.sock          | ragflow-sandbox-executor-manager |

## Variáveis de ambiente

| Variável                                              | Valor padrão                          | Serviço                          |
| ----------------------------------------------------- | ------------------------------------- | -------------------------------- |
| ES_HOST                                               | ragflow-es01                          | ragflow                          |
| INFINITY_HOST                                         | ragflow-infinity                      | ragflow                          |
| MINIO_HOST                                            | ragflow-minio                         | ragflow                          |
| MYSQL_HOST                                            | ragflow-mysql                         | ragflow                          |
| OS_HOST                                               | ragflow-opensearch01                  | ragflow                          |
| REDIS_HOST                                            | ragflow-redis                         | ragflow                          |
| TZ                                                    | $TZ                                   | ragflow                          |
| ELASTIC_PASSWORD                                      | infini_rag_flow                       | ragflow-es01                     |
| TZ                                                    | $TZ                                   | ragflow-es01                     |
| bootstrap.memory_lock                                 | false                                 | ragflow-es01                     |
| cluster.routing.allocation.disk.watermark.flood_stage | 2gb                                   | ragflow-es01                     |
| cluster.routing.allocation.disk.watermark.high        | 3gb                                   | ragflow-es01                     |
| cluster.routing.allocation.disk.watermark.low         | 5gb                                   | ragflow-es01                     |
| discovery.type                                        | single-node                           | ragflow-es01                     |
| node.name                                             | es01                                  | ragflow-es01                     |
| xpack.security.enabled                                | true                                  | ragflow-es01                     |
| xpack.security.http.ssl.enabled                       | false                                 | ragflow-es01                     |
| xpack.security.transport.ssl.enabled                  | false                                 | ragflow-es01                     |
| TZ                                                    | $TZ                                   | ragflow-infinity                 |
| MINIO_ROOT_PASSWORD                                   | infini_rag_flow                       | ragflow-minio                    |
| MINIO_ROOT_USER                                       | rag_flow                              | ragflow-minio                    |
| TZ                                                    | $TZ                                   | ragflow-minio                    |
| MYSQL_PASSWORD                                        | infini_rag_flow                       | ragflow-mysql                    |
| MYSQL_ROOT_PASSWORD                                   | mysql                                 | ragflow-mysql                    |
| TZ                                                    | $TZ                                   | ragflow-mysql                    |
| OPENSEARCH_INITIAL_ADMIN_PASSWORD                     | infini_rag_flow_OS_01                 | ragflow-opensearch01             |
| OPENSEARCH_PASSWORD                                   | infini_rag_flow_OS_01                 | ragflow-opensearch01             |
| TZ                                                    | $TZ                                   | ragflow-opensearch01             |
| bootstrap.memory_lock                                 | false                                 | ragflow-opensearch01             |
| cluster.routing.allocation.disk.watermark.flood_stage | 2gb                                   | ragflow-opensearch01             |
| cluster.routing.allocation.disk.watermark.high        | 3gb                                   | ragflow-opensearch01             |
| cluster.routing.allocation.disk.watermark.low         | 5gb                                   | ragflow-opensearch01             |
| discovery.type                                        | single-node                           | ragflow-opensearch01             |
| http.port                                             | 9201                                  | ragflow-opensearch01             |
| node.name                                             | opensearch01                          | ragflow-opensearch01             |
| plugins.security.disabled                             | false                                 | ragflow-opensearch01             |
| plugins.security.ssl.http.enabled                     | false                                 | ragflow-opensearch01             |
| plugins.security.ssl.transport.enabled                | true                                  | ragflow-opensearch01             |
| SANDBOX_BASE_NODEJS_IMAGE                             | infiniflow/sandbox-base-nodejs:latest | ragflow-sandbox-executor-manager |
| SANDBOX_BASE_PYTHON_IMAGE                             | infiniflow/sandbox-base-python:latest | ragflow-sandbox-executor-manager |
| SANDBOX_ENABLE_SECCOMP                                | false                                 | ragflow-sandbox-executor-manager |
| SANDBOX_EXECUTOR_MANAGER_POOL_SIZE                    | 3                                     | ragflow-sandbox-executor-manager |
| SANDBOX_MAX_MEMORY                                    | 256m                                  | ragflow-sandbox-executor-manager |
| SANDBOX_TIMEOUT                                       | 10s                                   | ragflow-sandbox-executor-manager |
| TZ                                                    | $TZ                                   | ragflow-sandbox-executor-manager |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:30080/`.

### Por que este app pede privilégio

- `privileged`: sandbox de execução de código do RagFlow exige isolamento por namespace próprio

## Imagens

| Serviço                          | Imagem                                           |
| -------------------------------- | ------------------------------------------------ |
| ragflow                          | icewhaletech/ragflow:v0.21.1                     |
| ragflow-es01                     | elasticsearch:8.11.3                             |
| ragflow-infinity                 | icewhaletech/ragflow-infinity:v0.6.1             |
| ragflow-minio                    | quay.io/minio/minio:RELEASE.2025-06-13T11-33-47Z |
| ragflow-mysql                    | icewhaletech/ragflow-mysql:8.0.39                |
| ragflow-opensearch01             | opensearchproject/opensearch:2.19.1              |
| ragflow-redis                    | valkey/valkey:8                                  |
| ragflow-sandbox-executor-manager | infiniflow/sandbox-executor-manager:latest       |

## Fonte oficial

Projeto original: **RagFlow**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
