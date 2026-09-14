# PostgreSQL

> O PostgreSQL é um sistema avançado de banco de dados relacional, de classe empresarial e de código aberto. O PostgreSQL suporta tanto consultas SQL (relacionais) quanto consultas JSON (não relacionais).

## O que é

O PostgreSQL é um poderoso sistema de gerenciamento de banco de dados relacional de código aberto, com mais de 35 anos de desenvolvimento ativo, o que lhe confere uma sólida reputação em termos de confiabilidade, robustez de recursos e desempenho.

O PostgreSQL é um banco de dados altamente estável, respaldado por mais de 20 anos de desenvolvimento pela comunidade de código aberto.

O PostgreSQL é usado como banco de dados principal em muitas aplicações web, bem como em aplicações móveis e de análise.


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço    |
| ---- | --------- | --------- | -------------- | ---------- |
| 5432 | 5432      | tcp       | —              | postgresql |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container             | Serviço    |
| ----------------------------- | ------------------------ | ---------- |
| /DATA/AppData/postgresql/data | /var/lib/postgresql/data | postgresql |

## Variáveis de ambiente

| Variável          | Valor padrão | Serviço    |
| ----------------- | ------------ | ---------- |
| PUID              | $PUID        | postgresql |
| PGID              | $PGID        | postgresql |
| TZ                | $TZ          | postgresql |
| POSTGRES_USER     | roqueos      | postgresql |
| POSTGRES_PASSWORD | roqueos      | postgresql |
| POSTGRES_DB       | roqueos      | postgresql |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5432/`.

- Default user: `roqueos`
- Default password: `roqueos`
- Default database: `roqueos`

## Imagens

| Serviço    | Imagem        |
| ---------- | ------------- |
| postgresql | postgres:17.4 |

## Fonte oficial

Projeto original: **PostgreSQL Global Dev't Group**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
