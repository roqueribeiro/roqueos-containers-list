# Maybe

> Personal finance management application

## O que é

Maybe is a personal finance management application designed to help you track your expenses, income, and investments in one place. With an intuitive interface and powerful features, Maybe makes it easy to understand your financial situation and make informed decisions about your money.

**Key Features:**
- **Expense Tracking**: Easily log and categorize your expenses
- **Income Management**: Track multiple income sources
- **Investment Monitoring**: Keep an eye on your investments and their performance
- **Budget Planning**: Create and maintain budgets to control your spending
- **Financial Reports**: Generate detailed reports to understand your financial habits
- **AI-Powered Insights**: Get personalized financial advice using AI technology

**Use Cases:**
- Personal budget management
- Expense tracking and categorization
- Investment portfolio monitoring
- Financial goal setting and tracking
- Cash flow analysis

**Learn More:**
- [Maybe GitHub Repository](https://github.com/maybe-finance/maybe)


Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve             | Serviço   |
| ----- | --------- | --------- | -------------------------- | --------- |
| 23000 | 3000      | tcp       | Maybe Web Application Port | maybe-web |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container             | Serviço     |
| -------------------------------- | ------------------------ | ----------- |
| /DATA/AppData/$AppID/app/storage | /rails/storage           | maybe-web   |
| /DATA/AppData/$AppID/pgdata      | /var/lib/postgresql/data | maybe-db    |
| /DATA/AppData/$AppID/redis/data  | /data                    | maybe-redis |

## Variáveis de ambiente

| Variável            | Valor padrão                                                 | Serviço      |
| ------------------- | ------------------------------------------------------------ | ------------ |
| POSTGRES_USER       | maybe_user                                                   | maybe-web    |
| POSTGRES_PASSWORD   | maybe_password                                               | maybe-web    |
| POSTGRES_DB         | maybe_production                                             | maybe-web    |
| SECRET_KEY_BASE     | a7523c3d0ae56415046ad8abae168d71074a79534a7062258f8d1d51ac2f | maybe-web    |
| SELF_HOSTED         | true                                                         | maybe-web    |
| RAILS_FORCE_SSL     | false                                                        | maybe-web    |
| RAILS_ASSUME_SSL    | false                                                        | maybe-web    |
| DB_HOST             | maybe-db                                                     | maybe-web    |
| DB_PORT             | 5432                                                         | maybe-web    |
| REDIS_URL           | redis://maybe-redis:6379/1                                   | maybe-web    |
| OPENAI_ACCESS_TOKEN | ${OPENAI_ACCESS_TOKEN}                                       | maybe-web    |
| POSTGRES_USER       | maybe_user                                                   | maybe-worker |
| POSTGRES_PASSWORD   | maybe_password                                               | maybe-worker |
| POSTGRES_DB         | maybe_production                                             | maybe-worker |
| SECRET_KEY_BASE     | a7523c3d0ae56415046ad8abae168d71074a79534a7062258f8d1d51ac2f | maybe-worker |
| SELF_HOSTED         | true                                                         | maybe-worker |
| RAILS_FORCE_SSL     | false                                                        | maybe-worker |
| RAILS_ASSUME_SSL    | false                                                        | maybe-worker |
| DB_HOST             | maybe-db                                                     | maybe-worker |
| DB_PORT             | 5432                                                         | maybe-worker |
| REDIS_URL           | redis://maybe-redis:6379/1                                   | maybe-worker |
| OPENAI_ACCESS_TOKEN | ${OPENAI_ACCESS_TOKEN}                                       | maybe-worker |
| POSTGRES_USER       | maybe_user                                                   | maybe-db     |
| POSTGRES_PASSWORD   | maybe_password                                               | maybe-db     |
| POSTGRES_DB         | maybe_production                                             | maybe-db     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:23000/`.

## Imagens

| Serviço      | Imagem                             |
| ------------ | ---------------------------------- |
| maybe-web    | ghcr.io/maybe-finance/maybe:latest |
| maybe-worker | ghcr.io/maybe-finance/maybe:latest |
| maybe-db     | postgres:16                        |
| maybe-redis  | redis:8.2.1-alpine3.22             |

## Fonte oficial

Projeto original: **maybe-finance**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
