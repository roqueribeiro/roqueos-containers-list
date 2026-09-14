# Autobrr

> Modern, easy to use download automation for torrents and usenet.

## O que é

Autobrr is the modern download automation tool for torrents and usenet. With inspiration and ideas from tools like trackarr, autodl-irssi and flexget we built one tool that can do it all, and then some.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 7474 | 7474      | tcp       | WebUI HTTP Port | autobrr |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | autobrr |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | $TZ          | autobrr |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7474/`.

## Imagens

| Serviço | Imagem                          |
| ------- | ------------------------------- |
| autobrr | ghcr.io/autobrr/autobrr:v1.69.0 |

## Fonte oficial

Projeto original: **Autobrr Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
