# Teable

> O Teable adota uma interface de planilha concisa, mas cria aplicativos de banco de dados poderosos

## O que é

Teable é uma plataforma de base de dados open source de nova geração. Oferece uma experiência intuitiva semelhante a uma folha de cálculo, sendo suportada por uma base de dados Postgres de alto desempenho, combinando facilidade de utilização com um poderoso processamento de dados.

**Principais funcionalidades:**
- **Alto desempenho**: Baseada no núcleo Postgres, lida facilmente com milhões de registos com tempos de resposta extremamente rápidos.
- **Interface moderna**: Disponibiliza várias vistas como grelha, kanban, galeria e formulários, com um design limpo e intuitivo.
- **Colaboração em tempo real**: Suporta colaboração online entre vários utilizadores com sincronização de dados em tempo real.
- **Automação e API**: Fornece APIs RESTful poderosas para integração e automação flexíveis.

**Saber mais:**
- [Website oficial do Teable](https://teable.ai)
- [Repositório GitHub do Teable](https://github.com/teableio/teable)
- [Documentação de ajuda](https://help.teable.ai)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve          | Serviço |
| ---- | --------- | --------- | ----------------------- | ------- |
| 3200 | 3000      | tcp       | Main web interface port | teable  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                | No container             | Serviço      |
| -------------------------------------- | ------------------------ | ------------ |
| /DATA/AppData/$AppID/assets            | /app/.assets             | teable       |
| /DATA/AppData/$AppID/data              | /var/lib/postgresql/data | teable-db    |
| /DATA/AppData/$AppID/teable-cache-data | /data                    | teable-cache |

## Variáveis de ambiente

| Variável                   | Valor padrão                                          | Serviço   |
| -------------------------- | ----------------------------------------------------- | --------- |
| TZ                         | $TZ                                                   | teable    |
| NEXT_ENV_IMAGES_ALL_REMOTE | true                                                  | teable    |
| PUBLIC_ORIGIN              | http://127.0.0.1:3000                                 | teable    |
| PRISMA_DATABASE_URL        | postgresql://example:example@teable-db:5432/teable-db | teable    |
| BACKEND_CACHE_PROVIDER     | redis                                                 | teable    |
| BACKEND_CACHE_REDIS_URI    | redis://default:password@teable-cache:6379/0          | teable    |
| TZ                         | $TZ                                                   | teable-db |
| POSTGRES_DB                | teable-db                                             | teable-db |
| POSTGRES_USER              | example                                               | teable-db |
| POSTGRES_PASSWORD          | example                                               | teable-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3200/`.

## Imagens

| Serviço      | Imagem                                                                                  |
| ------------ | --------------------------------------------------------------------------------------- |
| teable       | teableio/teable@sha256:387c48c924b868cd00522b615d69cf96f69fedf6b23425ded02254f1496c1213 |
| teable-db    | postgres:15                                                                             |
| teable-cache | redis:7.2.4                                                                             |

## Fonte oficial

Projeto original: **teableio**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
