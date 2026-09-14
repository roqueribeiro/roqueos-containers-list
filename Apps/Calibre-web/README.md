# Calibre-web

> Aplicativo da web para navegar, ler e baixar eBooks armazenados em um banco de dados Calibre

## O que é

Calibre-web é um aplicativo da web que fornece uma interface limpa para navegar, ler e baixar eBooks usando um banco de dados Calibre existente. Também é possível integrar o Google Drive e editar metadados e sua biblioteca Calibre através do próprio aplicativo.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                | Serviço     |
| ---- | --------- | --------- | ----------------------------- | ----------- |
| 8083 | 8083      | tcp       | Web interface for Calibre-web | calibre-web |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço     |
| --------------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID/config | /config      | calibre-web |
| /DATA/Media/Books           | /books       | calibre-web |

## Variáveis de ambiente

| Variável    | Valor padrão                               | Serviço     |
| ----------- | ------------------------------------------ | ----------- |
| DOCKER_MODS | ghcr.io/linuxserver/mods:universal-calibre | calibre-web |
| PGID        | $PGID                                      | calibre-web |
| PUID        | $PUID                                      | calibre-web |
| TZ          | $TZ                                        | calibre-web |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8083/`.

- | Username | Password |
- | -------- | -------- |
- | `admin`    | `admin123` |

## Imagens

| Serviço     | Imagem                         |
| ----------- | ------------------------------ |
| calibre-web | linuxserver/calibre-web:0.6.24 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
