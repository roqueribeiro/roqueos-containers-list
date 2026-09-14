# Medusa


## O que é

Automatic Video Library Manager for TV Shows. It watches for new episodes of your favorite shows, and when they are posted it does its magic.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 8081 | 8081      | tcp       | —              | medusa  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                   | No container | Serviço |
| ----------------------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID                      | /config      | medusa  |
| /DATA/AppData/$AppID/Downloads/Television | /downloads   | medusa  |
| /DATA/AppData/$AppID/Media/Television     | /tv          | medusa  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       |  $TZ         | medusa  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8081/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| medusa  | pymedusa/medusa:master |

## Fonte oficial

Projeto original: **pyMedusa (https://github.com/pymedusa)**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
