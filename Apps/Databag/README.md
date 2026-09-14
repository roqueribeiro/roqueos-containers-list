# Databag

> Mensageiro para a web descentralizada

## O que é

Databag é um aplicativo de conversa federado, feito para rodar no seu servidor, com foco em privacidade e segurança. Tem cliente para iOS, Android e navegador.

Categoria na App Store do RoqueOS: **Communication**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 7000 | 7000      | tcp       | rest api port  | databag |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container     | Serviço |
| -------------------------- | ---------------- | ------- |
| /DATA/AppData/databag/data | /var/lib/databag | databag |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7000/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| databag | balzack/databag:0.1.18 |

## Fonte oficial

Projeto original: **balzack**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
