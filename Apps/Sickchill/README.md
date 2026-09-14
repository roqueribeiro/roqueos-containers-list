# Sickchill

> Gerenciador automático de bibliotecas de vídeo para programas de TV

## O que é

SickChill é um gerenciador automático de bibliotecas de vídeo para programas de TV. Ele observa novos episódios de seus programas favoritos e quando são publicados, faz sua magia: busca automática de torrents / nzbs, download e processamento nas qualidades que você deseja.


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve              | Serviço   |
| ---- | --------- | --------- | --------------------------- | --------- |
| 8081 | 8081      | tcp       | Web interface for Sickchill | sickchill |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container | Serviço   |
| ------------------------------ | ------------ | --------- |
| /DATA/AppData/sickchill/config | /config      | sickchill |
| /DATA/Downloads                | /downloads   | sickchill |
| /DATA/Media/TV Shows           | /tv          | sickchill |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço   |
| -------- | ------------- | --------- |
| PGID     | 1000          | sickchill |
| PUID     | 1000          | sickchill |
| TZ       | Europe/London | sickchill |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8081/`.

## Imagens

| Serviço   | Imagem                          |
| --------- | ------------------------------- |
| sickchill | linuxserver/sickchill:2023.6.27 |

## Fonte oficial

Projeto original: **Sickchill Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
