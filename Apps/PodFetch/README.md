# PodFetch

> Gerenciador de podcast que baixa sozinho, com sincronia GPodder

## O que é

PodFetch é um gerenciador de podcast escrito em Rust para rodar no seu servidor. Baixa sozinho os episódios novos dos programas que você segue, no intervalo que você escolher.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço  |
| ---- | --------- | --------- | -------------- | -------- |
| 8000 | 8000      | tcp       | Web UI port    | podfetch |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container  | Serviço  |
| ----------------------------- | ------------- | -------- |
| /DATA/AppData/$AppID/podcasts | /app/podcasts | podfetch |
| /DATA/AppData/$AppID/db       | /app/db       | podfetch |

## Variáveis de ambiente

| Variável                    | Valor padrão                | Serviço  |
| --------------------------- | --------------------------- | -------- |
| DATABASE_URL                | sqlite:///app/db/podcast.db | podfetch |
| POLLING_INTERVAL            | 300                         | podfetch |
| BASIC_AUTH                  | false                       | podfetch |
| GPODDER_INTEGRATION_ENABLED | false                       | podfetch |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

## Imagens

| Serviço  | Imagem                      |
| -------- | --------------------------- |
| podfetch | samuel19982/podfetch:v5.2.3 |

## Fonte oficial

Projeto original: **SamTV12345**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
