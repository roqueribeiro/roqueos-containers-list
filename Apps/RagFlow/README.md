# RagFlow

> RagFlow é um motor RAG de código aberto baseado na compreensão profunda de documentos.

## O que é

RagFlow é um motor RAG (Retrieval-Augmented Generation) de código aberto baseado na compreensão profunda de documentos. Permite aos utilizadores construir o seu próprio ChatGPT privado, aproveitando o poder dos grandes modelos de linguagem e das capacidades de análise profunda de documentos. RagFlow suporta vários formatos de documentos, incluindo PDF, Word, Markdown e mais, permitindo aos utilizadores criar sistemas inteligentes de pergunta-resposta baseados nos seus próprios documentos.

**Características Principais:**
- Compreensão profunda de documentos com capacidades de análise avançadas
- Suporte para múltiplos formatos de documentos (PDF, Word, Markdown, etc.)
- Base de conhecimento privado com garantia de segurança de dados
- Fluxos de trabalho RAG personalizáveis para diferentes casos de uso
- Integração com populares grandes modelos de linguagem
- Interface baseada na Web para fácil gestão e interação

**Requisitos de Hardware:**
- CPU >= 4 núcleos
- RAM >= 16 GB
- Disco >= 50 GB

**Saiba Mais:**
- [Website Oficial RagFlow](https://ragflow.io)
- [Repositório GitHub RagFlow](https://github.com/infiniflow/ragflow)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve                                        | Serviço                          |
| ----- | --------- | --------- | ----------------------------------------------------- | -------------------------------- |
| 9380  | 9380      | tcp       | Porta API RagFlow                                     | ragflow                          |
| 30080 | 80        | tcp       | Porta HTTP RagFlow                                    | ragflow                          |
| 10443 | 443       | tcp       | Porta HTTPS RagFlow                                   | ragflow                          |
| 5678  | 5678      | tcp       | Porta de Debug RagFlow                                | ragflow                          |
| 5679  | 5679      | tcp       | Porta WebSocket RagFlow                               | ragflow                          |
| 9382  | 9382      | tcp       | Porta MCP RagFlow                                     | ragflow                          |
| 9200  | 9200      | tcp       | Porta HTTP Elasticsearch                              | ragflow-es01                     |
| 23817 | 23817     | tcp       | Porta de Admin Infinity                               | ragflow-infinity                 |
| 23820 | 23820     | tcp       | Porta API Infinity                                    | ragflow-infinity                 |
| 15432 | 5432      | tcp       | Porta PostgreSQL Infinity                             | ragflow-infinity                 |
| 9000  | 9000      | tcp       | Porta API MinIO                                       | ragflow-minio                    |
| 9001  | 9001      | tcp       | Porta da Consola MinIO                                | ragflow-minio                    |
| 5455  | 3306      | tcp       | Porta MySQL                                           | ragflow-mysql                    |
| 9201  | 9201      | tcp       | Porta HTTP OpenSearch                                 | ragflow-opensearch01             |
| 6379  | 6379      | tcp       | Porta Redis                                           | ragflow-redis                    |
| 9385  | 9385      | tcp       | Service port 9385 of ragflow-sandbox-executor-manager | ragflow-sandbox-executor-manager |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

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
