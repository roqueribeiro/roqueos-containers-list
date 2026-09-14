# Bazarr

> Geradores de cartas para Sonarr e Radarr

## O que é

O Bazarr é um aplicativo complementar ao Sonarr e Radarr. Ele pode gerenciar e baixar legendas com base em suas necessidades. Você define suas preferências por série de TV ou filme e o Bazarr cuida de tudo para você.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 6767 | 6767      | tcp       | —              | bazarr  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/Media/Movies          | /movies      | bazarr  |
| /DATA/Media/TV Shows        | /tv          | bazarr  |
| /DATA/AppData/bazarr/config | /config      | bazarr  |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço |
| -------- | ------------- | ------- |
| PGID     | 1000          | bazarr  |
| PUID     | 1000          | bazarr  |
| TZ       | Europe/London | bazarr  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6767/`.

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| bazarr  | linuxserver/bazarr:1.5.3 |

## Fonte oficial

Projeto original: **Sabnzbd Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
