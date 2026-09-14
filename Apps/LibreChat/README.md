# LibreChat

> A full-featured, open-source AI chat interface

## O que é

LibreChat is a full-featured, open-source AI chat interface that allows users to interact with multiple AI models through a unified platform. It supports various AI providers and offers advanced features like conversation management, plugin support, and customizable interfaces.
**Key Features:**
- Support for multiple AI models and providers
- Conversation history and management
- Plugin system for extended functionality
- Customizable themes and interfaces
- User authentication and management
- API integrations for various services
- Search functionality with MeiliSearch
- RAG (Retrieval-Augmented Generation) support
- File upload and processing capabilities
- Multi-language support
**Learn More:**
- [LibreChat Official Website](https://www.librechat.ai)
- [LibreChat GitHub Repository](https://github.com/danny-avila/LibreChat)

** extra: **
You can refer to the [Custom AI Endpoints](https://www.librechat.ai/docs/configuration/librechat_yaml/ai_endpoints) documentation to configure the relevant files for calling the APIs of Anyscale, ApiPie, Cohere, Deepseek, Databricks, Fireworks, Groq, HuggingFace, Mistral, OpenRouter, Perplexity, ShuttleAI, TogetherAI, Unify, and xAI.


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço       |
| ---- | --------- | --------- | --------------- | ------------- |
| 3080 | 3080      | tcp       | WebUI HTTP Port | librechat-api |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                               | No container              | Serviço               |
| ------------------------------------- | ------------------------- | --------------------- |
| /DATA/AppData/$AppID/images           | /app/client/public/images | librechat-api         |
| /DATA/AppData/$AppID/uploads          | /app/uploads              | librechat-api         |
| /DATA/AppData/$AppID/logs             | /app/api/logs             | librechat-api         |
| /DATA/AppData/$AppID/data-node        | /data/db                  | librechat-mongodb     |
| /DATA/AppData/$AppID/meili_data_v1.12 | /meili_data               | librechat-meilisearch |
| /DATA/AppData/$AppID/postgresql/data  | /var/lib/postgresql/data  | librechat-vectordb    |

## Variáveis de ambiente

| Variável                     | Valor padrão                                                 | Serviço               |
| ---------------------------- | ------------------------------------------------------------ | --------------------- |
| ASSISTANTS_API_KEY           | user_provided                                                | librechat-api         |
| OPENAI_API_KEY               | user_provided                                                | librechat-api         |
| GOOGLE_KEY                   | user_provided                                                | librechat-api         |
| ANTHROPIC_API_KEY            | user_provided                                                | librechat-api         |
| HOST                         | 0.0.0.0                                                      | librechat-api         |
| PORT                         | 3080                                                         | librechat-api         |
| DOMAIN_CLIENT                | http://0.0.0.0:3080                                          | librechat-api         |
| DOMAIN_SERVER                | http://0.0.0.0:3080                                          | librechat-api         |
| NO_INDEX                     | true                                                         | librechat-api         |
| TRUST_PROXY                  | 1                                                            | librechat-api         |
| CONSOLE_JSON                 | false                                                        | librechat-api         |
| DEBUG_LOGGING                | true                                                         | librechat-api         |
| DEBUG_CONSOLE                | false                                                        | librechat-api         |
| MONGO_URI                    | mongodb://librechat-mongodb:27017/LibreChat                  | librechat-api         |
| MEILI_HOST                   | http://librechat-meilisearch:7700                            | librechat-api         |
| RAG_PORT                     | 8000                                                         | librechat-api         |
| RAG_API_URL                  | http://librechat-rag-api:8000                                | librechat-api         |
| SEARCH                       | true                                                         | librechat-api         |
| MEILI_NO_ANALYTICS           | true                                                         | librechat-api         |
| OPENAI_MODERATION            | false                                                        | librechat-api         |
| BAN_VIOLATIONS               | true                                                         | librechat-api         |
| BAN_DURATION                 | 1000 * 60 * 60 * 2                                           | librechat-api         |
| BAN_INTERVAL                 | 20                                                           | librechat-api         |
| LOGIN_VIOLATION_SCORE        | 1                                                            | librechat-api         |
| REGISTRATION_VIOLATION_SCORE | 1                                                            | librechat-api         |
| CONCURRENT_VIOLATION_SCORE   | 1                                                            | librechat-api         |
| MESSAGE_VIOLATION_SCORE      | 1                                                            | librechat-api         |
| NON_BROWSER_VIOLATION_SCORE  | 20                                                           | librechat-api         |
| TTS_VIOLATION_SCORE          | 0                                                            | librechat-api         |
| STT_VIOLATION_SCORE          | 0                                                            | librechat-api         |
| FORK_VIOLATION_SCORE         | 0                                                            | librechat-api         |
| IMPORT_VIOLATION_SCORE       | 0                                                            | librechat-api         |
| FILE_UPLOAD_VIOLATION_SCORE  | 0                                                            | librechat-api         |
| LOGIN_MAX                    | 7                                                            | librechat-api         |
| LOGIN_WINDOW                 | 5                                                            | librechat-api         |
| REGISTER_MAX                 | 5                                                            | librechat-api         |
| REGISTER_WINDOW              | 60                                                           | librechat-api         |
| LIMIT_CONCURRENT_MESSAGES    | true                                                         | librechat-api         |
| CONCURRENT_MESSAGE_MAX       | 2                                                            | librechat-api         |
| LIMIT_MESSAGE_IP             | true                                                         | librechat-api         |
| MESSAGE_IP_MAX               | 40                                                           | librechat-api         |
| MESSAGE_IP_WINDOW            | 1                                                            | librechat-api         |
| LIMIT_MESSAGE_USER           | false                                                        | librechat-api         |
| MESSAGE_USER_MAX             | 40                                                           | librechat-api         |
| MESSAGE_USER_WINDOW          | 1                                                            | librechat-api         |
| ILLEGAL_MODEL_REQ_SCORE      | 5                                                            | librechat-api         |
| ALLOW_EMAIL_LOGIN            | true                                                         | librechat-api         |
| ALLOW_REGISTRATION           | true                                                         | librechat-api         |
| ALLOW_SOCIAL_LOGIN           | false                                                        | librechat-api         |
| ALLOW_SOCIAL_REGISTRATION    | false                                                        | librechat-api         |
| ALLOW_PASSWORD_RESET         | false                                                        | librechat-api         |
| ALLOW_UNVERIFIED_EMAIL_LOGIN | true                                                         | librechat-api         |
| SESSION_EXPIRY               | 1000 * 60 * 15                                               | librechat-api         |
| REFRESH_TOKEN_EXPIRY         | (1000 * 60 * 60 * 24) * 7                                    | librechat-api         |
| JWT_SECRET                   | 16f8c0ef4a5d391b26034086c628469d3f9f497f08163ab9b40137092f29 | librechat-api         |
| JWT_REFRESH_SECRET           | eaa5191f2914e30b9387fd84e254e4ba6fc51b4654968a9b0803b456a54b | librechat-api         |
| CREDS_KEY                    | f34be427ebb29de8d88c107a71546019685ed8b241d8f2ed00c3df97ad25 | librechat-api         |
| CREDS_IV                     | e2341419ec3dd3d19b13a1a87fafcbfb                             | librechat-api         |
| DEBUG_PLUGINS                | true                                                         | librechat-api         |
| DEBUG_OPENAI                 | false                                                        | librechat-api         |
| MEILI_HOST                   | http://librechat-meilisearch:7700                            | librechat-meilisearch |
| MEILI_NO_ANALYTICS           | true                                                         | librechat-meilisearch |
| MEILI_MASTER_KEY             | DrhYf7zENyR6AlUCKmnz0eYASOQdl6zxH7s7MKFSfFCt                 | librechat-meilisearch |
| POSTGRES_DB                  | mydatabase                                                   | librechat-vectordb    |
| POSTGRES_USER                | myuser                                                       | librechat-vectordb    |
| POSTGRES_PASSWORD            | mypassword                                                   | librechat-vectordb    |
| DB_HOST                      | librechat-vectordb                                           | librechat-rag-api     |
| RAG_PORT                     | 8000                                                         | librechat-rag-api     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3080/`.

## Imagens

| Serviço               | Imagem                                                |
| --------------------- | ----------------------------------------------------- |
| librechat-api         | ghcr.io/danny-avila/librechat-dev:latest              |
| librechat-mongodb     | mongo:6.0                                             |
| librechat-meilisearch | getmeili/meilisearch:v1.12.3                          |
| librechat-vectordb    | ankane/pgvector:v0.5.1                                |
| librechat-rag-api     | ghcr.io/danny-avila/librechat-rag-api-dev-lite:v0.6.0 |

## Fonte oficial

Projeto original: **LibreChat**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
