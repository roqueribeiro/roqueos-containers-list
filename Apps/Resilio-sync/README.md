# resilio-sync

> Desperte o poder da sincronização perfeita de arquivos.

## O que é

resilio-sync é um aplicativo baseado em Docker que permite a sincronização e compartilhamento de arquivos de forma rápida e segura.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve | Serviço      |
| ----- | --------- | --------- | -------------- | ------------ |
| 55555 | 55555     | tcp       | —              | resilio-sync |
| 8888  | 8888      | tcp       | —              | resilio-sync |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço      |
| --------------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID/data   | /sync        | resilio-sync |
| /DATA/AppData/$AppID/config | /config      | resilio-sync |
| /DATA/Downloads             | /downloads   | resilio-sync |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço      |
| -------- | ------------ | ------------ |
| PGID     | $PGID        | resilio-sync |
| PUID     | $PUID        | resilio-sync |
| TZ       | $TZ          | resilio-sync |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8888/`.

## Imagens

| Serviço      | Imagem                         |
| ------------ | ------------------------------ |
| resilio-sync | linuxserver/resilio-sync:2.7.3 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
