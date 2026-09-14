# Lucky

> Powerful networking tool

## O que é

A powerful tool for port forwarding, reverse proxy, dynamic DNS, wake-on-LAN, IPv4 NAT traversal, webdav services, task scheduling, and automatic certificate management.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host             | No container | Serviço |
| ------------------- | ------------ | ------- |
| /DATA/AppData/lucky | /goodluck    | lucky   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | $TZ          | lucky   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:16601/`.

- Default login account `666`, Default login password `666`,tips:`Before each update, remember to back up the configuration`.

### Por que este app pede privilégio

- `networkHost`: faz port forwarding e DDNS a partir do IP do host

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| lucky   | gdy666/lucky:2.20.2 |

## Fonte oficial

Projeto original: **gdy666**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
