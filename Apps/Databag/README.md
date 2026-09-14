# Databag

> Messenger for the Decentralized Web

## O que é

Databag is a federated chat app for self-hosting that focuses on user privacy and security; the service includes clients for iOS, Android, and browser.

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
