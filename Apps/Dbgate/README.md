# DBGate

> Cliente de banco de dados no navegador

## O que é

DBGate é uma interface web para administrar e explorar dados em vários bancos SQL, com editor de consulta, comparação de esquema e exportação.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço |
| ---- | --------- | --------- | -------------------- | ------- |
| 3000 | 3000      | tcp       | Container Port: 3000 | dbgate  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container  | Serviço |
| --------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/config | /root/.dbgate | dbgate  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

## Imagens

| Serviço | Imagem                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------- |
| dbgate  | dbgate/dbgate:7.2.5-alpine@sha256:4d61f9a89f1a39806c25593f0bf160626767456e74e098d06fbf1d6468c4cc18 |

## Fonte oficial

Projeto original: **dbgate**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
