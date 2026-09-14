# Adminer

> Administração de banco de dados num único arquivo PHP

## O que é

Adminer é uma ferramenta completa de administração de banco escrita em PHP. Diferente do phpMyAdmin, é um arquivo só, pronto para colocar no servidor. Fala com MySQL, PostgreSQL, SQLite, MS SQL, Oracle, Firebird, SimpleDB, Elasticsearch e MongoDB.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve    | Serviço |
| ---- | --------- | --------- | ----------------- | ------- |
| 8080 | 8080      | tcp       | Adminer HTTP Port | adminer |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

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
