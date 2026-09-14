# Activepieces

> Alternativa auto-hospedada ao Zapier com 200+ integrações prontas

## O que é

Activepieces é a plataforma de automação no-code open-source — alternativa ao Zapier que você auto-hospeda. 200+ pieces pré-construídas (Gmail, Slack, GitHub, Trello, Stripe, OpenAI, Discord, Notion). Construtor visual de flows, branching, loops, blocos de código, triggers agendados, triggers webhook. Core MIT-licensed, roda em PostgreSQL + Redis.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço      |
| ---- | --------- | --------- | -------------------------------------------------- | ------------ |
| 8105 | 80        | tcp       | Porta da interface web (mapeada para 8105 no host) | activepieces |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container             | Serviço  |
| ----------------------------- | ------------------------ | -------- |
| /DATA/AppData/$AppID/postgres | /var/lib/postgresql/data | postgres |
| /DATA/AppData/$AppID/redis    | /data                    | redis    |

## Variáveis de ambiente

| Variável             | Valor padrão                               | Serviço      |
| -------------------- | ------------------------------------------ | ------------ |
| POSTGRES_DB          | activepieces                               | postgres     |
| POSTGRES_USER        | activepieces                               | postgres     |
| POSTGRES_PASSWORD    | change-me-to-a-long-random-string          | postgres     |
| AP_API_KEY           | replace-with-output-of-openssl-rand-hex-32 | activepieces |
| AP_ENCRYPTION_KEY    | replace-with-output-of-openssl-rand-hex-16 | activepieces |
| AP_JWT_SECRET        | replace-with-output-of-openssl-rand-hex-32 | activepieces |
| AP_FRONTEND_URL      | http://localhost:8105                      | activepieces |
| AP_POSTGRES_HOST     | postgres                                   | activepieces |
| AP_POSTGRES_PORT     | 5432                                       | activepieces |
| AP_POSTGRES_DATABASE | activepieces                               | activepieces |
| AP_POSTGRES_USERNAME | activepieces                               | activepieces |
| AP_POSTGRES_PASSWORD | change-me-to-a-long-random-string          | activepieces |
| AP_REDIS_HOST        | redis                                      | activepieces |
| AP_REDIS_PORT        | 6379                                       | activepieces |
| AP_TELEMETRY_ENABLED | false                                      | activepieces |
| AP_QUEUE_MODE        | REDIS                                      | activepieces |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8105/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA POSTGRES_PASSWORD E AP_POSTGRES_PASSWORD (devem ser iguais) por string aleatória longa.
- 2. Gere AP_API_KEY, AP_JWT_SECRET (`openssl rand -hex 32`) e AP_ENCRYPTION_KEY (`openssl rand -hex 16`).
- 3. Configure AP_FRONTEND_URL com sua URL pública — necessário para callbacks OAuth.
- 4. O primeiro usuário registrado em http://SEU_IP:8105 é o admin.

## Imagens

| Serviço      | Imagem                                   |
| ------------ | ---------------------------------------- |
| postgres     | postgres:14-alpine                       |
| redis        | redis:7-alpine                           |
| activepieces | ghcr.io/activepieces/activepieces:0.41.0 |

## Fonte oficial

Projeto original: **activepieces**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
