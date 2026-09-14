# BookStack

> Wiki auto-hospedada com estrutura prateleiras > livros > capítulos > páginas

## O que é

BookStack é uma plataforma simples, auto-hospedada e fácil de usar para organizar e armazenar informação. Conteúdo é estruturado em hierarquia de 3 níveis: prateleiras, livros, capítulos, páginas. Editor Markdown + WYSIWYG, busca embutida, RBAC, suporte a OAuth/SAML/LDAP. Open-source MIT, usado por centenas de times como wiki/docs.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço   |
| ---- | --------- | --------- | ---------------------- | --------- |
| 8089 | 80        | tcp       | Porta da interface web | bookstack |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço      |
| --------------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID/db     | /config      | bookstack-db |
| /DATA/AppData/$AppID/config | /config      | bookstack    |

## Variáveis de ambiente

| Variável            | Valor padrão                      | Serviço      |
| ------------------- | --------------------------------- | ------------ |
| PUID                | 1000                              | bookstack-db |
| PGID                | 1000                              | bookstack-db |
| TZ                  | America/Sao_Paulo                 | bookstack-db |
| MYSQL_ROOT_PASSWORD | change-me-on-first-boot           | bookstack-db |
| MYSQL_DATABASE      | bookstackapp                      | bookstack-db |
| MYSQL_USER          | bookstack                         | bookstack-db |
| MYSQL_PASSWORD      | change-me-to-a-long-random-string | bookstack-db |
| PUID                | 1000                              | bookstack    |
| PGID                | 1000                              | bookstack    |
| TZ                  | America/Sao_Paulo                 | bookstack    |
| APP_URL             | http://localhost:8089             | bookstack    |
| DB_HOST             | bookstack-db                      | bookstack    |
| DB_PORT             | 3306                              | bookstack    |
| DB_USERNAME         | bookstack                         | bookstack    |
| DB_PASSWORD         | change-me-to-a-long-random-string | bookstack    |
| DB_DATABASE         | bookstackapp                      | bookstack    |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8089/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA MYSQL_ROOT_PASSWORD, MYSQL_PASSWORD e DB_PASSWORD (os 2 últimos devem ser iguais) por strings aleatórias longas.
- 2. Configure APP_URL com a URL pública onde vai acessar (deve ser HTTPS em produção).
- 3. Credenciais padrão: admin@admin.com / password — TROQUE no primeiro login.

## Imagens

| Serviço      | Imagem                        |
| ------------ | ----------------------------- |
| bookstack-db | linuxserver/mariadb:11.8.8    |
| bookstack    | linuxserver/bookstack:26.05.5 |

## Fonte oficial

Projeto original: **BookStackApp**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
