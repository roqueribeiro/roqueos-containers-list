# Adminer

> Database management in a single PHP file

## O que é

Adminer (formerly phpMinAdmin) is a full-featured database management tool written in PHP. Conversely to phpMyAdmin, it consist of a single file ready to deploy to the target server. Adminer is available for MySQL, PostgreSQL, SQLite, MS SQL, Oracle, Firebird, SimpleDB, Elasticsearch and MongoDB.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve    | Serviço |
| ---- | --------- | --------- | ----------------- | ------- |
| 8080 | 8080      | tcp       | Adminer HTTP Port | adminer |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

## Imagens

| Serviço | Imagem        |
| ------- | ------------- |
| adminer | adminer:5.4.1 |

## Fonte oficial

Projeto original: **Jakub Vrána**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
