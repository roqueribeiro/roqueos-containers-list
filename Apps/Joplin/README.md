# joplin

> Notas e tarefas com sincronia, e criptografia ponta a ponta

## O que é

Joplin é um aplicativo de notas e tarefas que sincroniza entre aparelhos. Este container é o servidor de sincronia: os clientes de desktop e celular conversam com ele.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve        | Serviço |
| ----- | --------- | --------- | --------------------- | ------- |
| 22300 | 22300     | tcp       | Container Port: 22300 | joplin  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                              | No container             | Serviço   |
| ------------------------------------ | ------------------------ | --------- |
| /DATA/AppData/$AppID/postgresql/data | /var/lib/postgresql/data | joplin-db |

## Variáveis de ambiente

| Variável          | Valor padrão                         | Serviço   |
| ----------------- | ------------------------------------ | --------- |
| APP_PORT          | 22300                                | joplin    |
| APP_BASE_URL      | http://localhost:22300               | joplin    |
| DB_CLIENT         | pg                                   | joplin    |
| POSTGRES_PASSWORD | 27a1d42a-a15d-43dd-903c-2a73538647fe | joplin    |
| POSTGRES_USER     | bigbear                              | joplin    |
| POSTGRES_DATABASE | joplin                               | joplin    |
| POSTGRES_PORT     | 5432                                 | joplin    |
| POSTGRES_HOST     | joplin-db                            | joplin    |
| MAX_TIME_DRIFT    | 0                                    | joplin    |
| POSTGRES_PASSWORD | 27a1d42a-a15d-43dd-903c-2a73538647fe | joplin-db |
| POSTGRES_USER     | bigbear                              | joplin-db |
| POSTGRES_DB       | joplin                               | joplin-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:22300/`.

- Read this before installing: https://community.roqueribeiro.com/t/added-joplin-server-to-bigbearcasaos/800?u=dragonfire1119

## Imagens

| Serviço   | Imagem                                                                                      |
| --------- | ------------------------------------------------------------------------------------------- |
| joplin    | joplin/server:3.7.1@sha256:0877bfba41a943017c42c58e90db9d8d548bfe699b5e410248b5b879371734f9 |
| joplin-db | postgres:14.2@sha256:2c954f8c5d03da58f8b82645b783b56c1135df17e650b186b296fa1bb71f9cfd       |

## Fonte oficial

Projeto original: **joplin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
