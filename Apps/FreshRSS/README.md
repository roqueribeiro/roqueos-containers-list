# FreshRSS

> Um agregador de notícias gratuito e auto-hospedável...

## O que é

O FreshRSS é um agregador de feeds RSS e Atom auto-hospedado. Ele é leve, fácil de usar, avançado e personalizável.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço  |
| ---- | --------- | --------- | -------------- | -------- |
| 8749 | 80        | tcp       | GUI HTTP port  | freshrss |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                           | No container                 | Serviço  |
| --------------------------------- | ---------------------------- | -------- |
| /DATA/AppData/freshrss/data       | /var/www/FreshRSS/data       | freshrss |
| /DATA/AppData/freshrss/extensions | /var/www/FreshRSS/extensions | freshrss |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| TZ       | —            | freshrss |
| CRON_MIN | 1,31         | freshrss |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8749/`.

## Imagens

| Serviço  | Imagem                   |
| -------- | ------------------------ |
| freshrss | freshrss/freshrss:1.27.1 |

## Fonte oficial

Projeto original: **FreshRSS**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
