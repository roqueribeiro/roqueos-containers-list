# Wiki.js

> Wiki moderna em Node.js + Git + Markdown com 30+ provedores de auth

## O que é

Wiki.js é o software de wiki open-source mais poderoso e extensível. Construído em Node.js, Git e Markdown, com editores WYSIWYG e código, colaboração em tempo real, UI bonita, busca full-text (Elasticsearch/Algolia/PostgreSQL), 30+ provedores de autenticação, versionamento de conteúdo. Alternativa moderna a MediaWiki/Confluence.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8090 | 3000      | tcp       | Porta da interface web (mapeada para 8090 no host) | wikijs  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                 | No container             | Serviço |
| ----------------------- | ------------------------ | ------- |
| /DATA/AppData/$AppID/db | /var/lib/postgresql/data | db      |

## Variáveis de ambiente

| Variável          | Valor padrão                      | Serviço |
| ----------------- | --------------------------------- | ------- |
| POSTGRES_DB       | wiki                              | db      |
| POSTGRES_USER     | wikijs                            | db      |
| POSTGRES_PASSWORD | change-me-to-a-long-random-string | db      |
| DB_TYPE           | postgres                          | wikijs  |
| DB_HOST           | db                                | wikijs  |
| DB_PORT           | 5432                              | wikijs  |
| DB_USER           | wikijs                            | wikijs  |
| DB_PASS           | change-me-to-a-long-random-string | wikijs  |
| DB_NAME           | wiki                              | wikijs  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8090/`.

- SUBSTITUA POSTGRES_PASSWORD E DB_PASS (devem ser iguais) por uma string aleatória longa antes do primeiro boot.
- Wizard inicial em http://SEU_IP:8090 cria a conta admin.
- Para storage backends (Git/S3/FS local), configure em admin > Storage após o primeiro login.

## Imagens

| Serviço | Imagem                |
| ------- | --------------------- |
| db      | postgres:15-alpine    |
| wikijs  | requarks/wiki:2.5.307 |

## Fonte oficial

Projeto original: **requarks**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
