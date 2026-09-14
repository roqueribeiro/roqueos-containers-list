# Sure

> Personal finance management application

## O que é

Sure is a personal finance management application designed to help you track your expenses, income, and investments in one place. With an intuitive interface and powerful features, Sure makes it easy to understand your financial situation and make informed decisions about your money.

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
- [Sure GitHub Repository](https://github.com/we-promise/sure)


Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve            | Serviço  |
| ----- | --------- | --------- | ------------------------- | -------- |
| 23000 | 3000      | tcp       | Sure Web Application Port | sure-web |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container             | Serviço     |
| -------------------------------- | ------------------------ | ----------- |
| /DATA/AppData/$AppID/app/storage | /rails/storage           | sure-web    |
| /DATA/AppData/$AppID/app/storage | /rails/storage           | sure-worker |
| /DATA/AppData/$AppID/pgdata      | /var/lib/postgresql/data | sure-db     |
| /DATA/AppData/$AppID/redis/data  | /data                    | sure-redis  |

## Variáveis de ambiente

| Variável            | Valor padrão                                                 | Serviço     |
| ------------------- | ------------------------------------------------------------ | ----------- |
| POSTGRES_USER       | sure_user                                                    | sure-web    |
| POSTGRES_PASSWORD   | sure_password                                                | sure-web    |
| POSTGRES_DB         | sure_production                                              | sure-web    |
| SECRET_KEY_BASE     | a7523c3d0ae56415046ad8abae168d71074a79534a7062258f8d1d51ac2f | sure-web    |
| SELF_HOSTED         | true                                                         | sure-web    |
| RAILS_FORCE_SSL     | false                                                        | sure-web    |
| RAILS_ASSUME_SSL    | false                                                        | sure-web    |
| DB_HOST             | sure-db                                                      | sure-web    |
| DB_PORT             | 5432                                                         | sure-web    |
| REDIS_URL           | redis://sure-redis:6379/1                                    | sure-web    |
| OPENAI_ACCESS_TOKEN | ${OPENAI_ACCESS_TOKEN}                                       | sure-web    |
| POSTGRES_USER       | sure_user                                                    | sure-worker |
| POSTGRES_PASSWORD   | sure_password                                                | sure-worker |
| POSTGRES_DB         | sure_production                                              | sure-worker |
| SECRET_KEY_BASE     | a7523c3d0ae56415046ad8abae168d71074a79534a7062258f8d1d51ac2f | sure-worker |
| SELF_HOSTED         | true                                                         | sure-worker |
| RAILS_FORCE_SSL     | false                                                        | sure-worker |
| RAILS_ASSUME_SSL    | false                                                        | sure-worker |
| DB_HOST             | sure-db                                                      | sure-worker |
| DB_PORT             | 5432                                                         | sure-worker |
| REDIS_URL           | redis://sure-redis:6379/1                                    | sure-worker |
| OPENAI_ACCESS_TOKEN | ${OPENAI_ACCESS_TOKEN}                                       | sure-worker |
| POSTGRES_USER       | sure_user                                                    | sure-db     |
| POSTGRES_PASSWORD   | sure_password                                                | sure-db     |
| POSTGRES_DB         | sure_production                                              | sure-db     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:23000/`.

## Imagens

| Serviço     | Imagem                                 |
| ----------- | -------------------------------------- |
| sure-web    | ghcr.io/we-promise/sure:0.6.5-hotfix.1 |
| sure-worker | ghcr.io/we-promise/sure:0.6.5-hotfix.1 |
| sure-db     | postgres:16                            |
| sure-redis  | redis:8.2.1-alpine3.22                 |

## Fonte oficial

Projeto original: **we-promise**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
