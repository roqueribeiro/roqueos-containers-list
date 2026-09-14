# Maybe

> Aplicação de gestão financeira pessoal

## O que é

Maybe é uma aplicação de gestão financeira pessoal concebida para o ajudar a acompanhar as suas despesas, rendimentos e investimentos num só lugar. Com uma interface intuitiva e funcionalidades poderosas, o Maybe torna fácil compreender a sua situação financeira e tomar decisões informadas sobre o seu dinheiro.

**Funcionalidades Principais:**
- **Acompanhamento de Despesas**: Registe e categorize facilmente as suas despesas
- **Gestão de Rendimentos**: Acompanhe múltiplas fontes de rendimento
- **Monitorização de Investimentos**: Mantenha-se atento aos seus investimentos e ao seu desempenho
- **Planeamento de Orçamento**: Crie e mantenha orçamentos para controlar as suas despesas
- **Relatórios Financeiros**: Gere relatórios detalhados para compreender os seus hábitos financeiros
- **Informações com IA**: Obtenha aconselhamento financeiro personalizado utilizando tecnologia IA

**Casos de Uso:**
- Gestão de orçamento pessoal
- Acompanhamento e categorização de despesas
- Monitorização de carteira de investimentos
- Definição e acompanhamento de objetivos financeiros
- Análise de fluxo de caixa

**Saiba Mais:**
- [Repositório GitHub Maybe](https://github.com/maybe-finance/maybe)


Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve               | Serviço   |
| ----- | --------- | --------- | ---------------------------- | --------- |
| 23000 | 3000      | tcp       | Porta da Aplicação Web Maybe | maybe-web |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

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

| Serviço      | Imagem                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------- |
| maybe-web    | ghcr.io/maybe-finance/maybe@sha256:c2d398bfc334db4d9862f268401dbb46f97848eaaaad8295d1221f2d99d631cc |
| maybe-worker | ghcr.io/maybe-finance/maybe@sha256:c2d398bfc334db4d9862f268401dbb46f97848eaaaad8295d1221f2d99d631cc |
| maybe-db     | postgres:16                                                                                         |
| maybe-redis  | redis:8.2.1-alpine3.22                                                                              |

## Fonte oficial

Projeto original: **maybe-finance**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
