# FlareSolverr

> Proxy para contornar a proteção do Cloudflare

## O que é

FlareSolverr é um proxy que contorna automaticamente a proteção do Cloudflare e DDoS-GUARD. Roda um navegador headless para resolver os desafios e expõe uma API HTTP usada por apps *arr e scrapers.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                 | Serviço      |
| ---- | --------- | --------- | ------------------------------ | ------------ |
| 8191 | 8191      | tcp       | Web interface for FlareSolverr | flaresolverr |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável       | Valor padrão | Serviço      |
| -------------- | ------------ | ------------ |
| PGID           | $PGID        | flaresolverr |
| PUID           | $PUID        | flaresolverr |
| TZ             | $TZ          | flaresolverr |
| UMASK          | 002          | flaresolverr |
| LOG_LEVEL      | info         | flaresolverr |
| LOG_HTML       | false        | flaresolverr |
| CAPTCHA_SOLVER | none         | flaresolverr |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8191/`.

## Imagens

| Serviço      | Imagem                                   |
| ------------ | ---------------------------------------- |
| flaresolverr | ghcr.io/flaresolverr/flaresolverr:v3.4.5 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
