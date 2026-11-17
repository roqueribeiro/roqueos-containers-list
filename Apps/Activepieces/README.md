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

| Variável             | Valor padrão          | Serviço      |
| -------------------- | --------------------- | ------------ |
| POSTGRES_DB          | activepieces          | postgres     |
| POSTGRES_USER        | activepieces          | postgres     |
| POSTGRES_PASSWORD    | ${POSTGRES_PASSWORD}  | postgres     |
| AP_API_KEY           | ${AP_API_KEY}         | activepieces |
| AP_ENCRYPTION_KEY    | ${AP_ENCRYPTION_KEY}  | activepieces |
| AP_JWT_SECRET        | ${AP_JWT_SECRET}      | activepieces |
| AP_FRONTEND_URL      | http://localhost:8105 | activepieces |
| AP_POSTGRES_HOST     | postgres              | activepieces |
| AP_POSTGRES_PORT     | 5432                  | activepieces |
| AP_POSTGRES_DATABASE | activepieces          | activepieces |
| AP_POSTGRES_USERNAME | activepieces          | activepieces |
| AP_POSTGRES_PASSWORD | ${POSTGRES_PASSWORD}  | activepieces |
| AP_REDIS_HOST        | redis                 | activepieces |
| AP_REDIS_PORT        | 6379                  | activepieces |
| AP_TELEMETRY_ENABLED | false                 | activepieces |
| AP_QUEUE_MODE        | REDIS                 | activepieces |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8105/`.

- ANTES DO PRIMEIRO BOOT:
- 1. POSTGRES_PASSWORD (usada também como AP_POSTGRES_PASSWORD), AP_API_KEY, AP_JWT_SECRET e AP_ENCRYPTION_KEY são gerados pelo RoqueOS na instalação, únicos para este servidor. Não há nada para substituir.
- 2. Configure AP_FRONTEND_URL com sua URL pública: necessário para callbacks OAuth.
- 3. O primeiro usuário registrado em http://SEU_IP:8105 é o admin.

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
