# Outline

> Wiki colaborativa de time auto-hospedada estilo Notion

## O que é

Outline é uma wiki de time rápida, colaborativa e moderna — como Notion mas auto-hospedada e open-source. Editor Markdown colaborativo em tempo real bonito, slash commands, documentos aninhados, integrações com Slack/GitHub/Loom/Figma, busca full-text, comentários, versionamento. Usada por milhares de times como base de conhecimento interna.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8091 | 3000      | tcp       | Porta da interface web (mapeada para 8091 no host) | outline |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container             | Serviço  |
| ----------------------------- | ------------------------ | -------- |
| /DATA/AppData/$AppID/redis    | /data                    | redis    |
| /DATA/AppData/$AppID/postgres | /var/lib/postgresql/data | postgres |
| /DATA/AppData/$AppID/data     | /var/lib/outline/data    | outline  |

## Variáveis de ambiente

| Variável                     | Valor padrão                                                 | Serviço  |
| ---------------------------- | ------------------------------------------------------------ | -------- |
| POSTGRES_USER                | outline                                                      | postgres |
| POSTGRES_PASSWORD            | change-me-to-a-long-random-string                            | postgres |
| POSTGRES_DB                  | outline                                                      | postgres |
| SECRET_KEY                   | replace-with-output-of-openssl-rand-hex-32                   | outline  |
| UTILS_SECRET                 | replace-with-output-of-openssl-rand-hex-32                   | outline  |
| DATABASE_URL                 | postgres://outline:change-me-to-a-long-random-string@postgre | outline  |
| DATABASE_CONNECTION_POOL_MIN | 0                                                            | outline  |
| DATABASE_CONNECTION_POOL_MAX | 5                                                            | outline  |
| REDIS_URL                    | redis://redis:6379                                           | outline  |
| URL                          | http://localhost:8091                                        | outline  |
| PORT                         | 3000                                                         | outline  |
| FILE_STORAGE                 | local                                                        | outline  |
| FILE_STORAGE_LOCAL_ROOT_DIR  | /var/lib/outline/data                                        | outline  |
| FILE_STORAGE_UPLOAD_MAX_SIZE | 262144000                                                    | outline  |
| FORCE_HTTPS                  | false                                                        | outline  |
| ENABLE_UPDATES               | true                                                         | outline  |
| WEB_CONCURRENCY              | 1                                                            | outline  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8091/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA POSTGRES_PASSWORD E a senha em DATABASE_URL (devem ser iguais) por uma string aleatória longa.
- 2. SUBSTITUA SECRET_KEY e UTILS_SECRET — ambos pela saída de `openssl rand -hex 32`.
- 3. Configure URL com a URL pública (deve bater exatamente, incluindo http/https — necessário para OAuth).
- 4. Outline exige um provedor OAuth (Google/Slack/GitHub/Microsoft/OIDC) — configure via variáveis antes do primeiro boot.

## Imagens

| Serviço  | Imagem                     |
| -------- | -------------------------- |
| redis    | redis:7-alpine             |
| postgres | postgres:15-alpine         |
| outline  | outlinewiki/outline:0.81.1 |

## Fonte oficial

Projeto original: **outline**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
