# ddns-updater

> DNS dinâmico simples e direto

## O que é

Mantém os registros A e AAAA do seu domínio sempre apontando para o IP atual, em vários provedores de DNS.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço      |
| ---- | --------- | --------- | --------------- | ------------ |
| 8000 | 8000      | tcp       | WebUI HTTP Port | ddns-updater |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container  | Serviço      |
| ------------------------- | ------------- | ------------ |
| /DATA/AppData/$AppID/data | /updater/data | ddns-updater |

## Variáveis de ambiente

| Variável                  | Valor padrão  | Serviço      |
| ------------------------- | ------------- | ------------ |
| BACKUP_DIRECTORY          | /updater/data | ddns-updater |
| BACKUP_PERIOD             | 0             | ddns-updater |
| CONFIG                    | —             | ddns-updater |
| HTTP_TIMEOUT              | 10s           | ddns-updater |
| LISTENING_ADDRESS         | :8000         | ddns-updater |
| LOG_CALLER                | hidden        | ddns-updater |
| LOG_LEVEL                 | info          | ddns-updater |
| PERIOD                    | 5m            | ddns-updater |
| PUBLICIP_DNS_PROVIDERS    | all           | ddns-updater |
| PUBLICIP_DNS_TIMEOUT      | 3s            | ddns-updater |
| PUBLICIP_FETCHERS         | all           | ddns-updater |
| PUBLICIP_HTTP_PROVIDERS   | all           | ddns-updater |
| PUBLICIPV4_HTTP_PROVIDERS | all           | ddns-updater |
| PUBLICIPV6_HTTP_PROVIDERS | all           | ddns-updater |
| ROOT_URL                  | /             | ddns-updater |
| SHOUTRRR_ADDRESSES        | —             | ddns-updater |
| UPDATE_COOLDOWN_PERIOD    | 5m            | ddns-updater |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

## Imagens

| Serviço      | Imagem                     |
| ------------ | -------------------------- |
| ddns-updater | qmcgaw/ddns-updater:v2.9.0 |

## Fonte oficial

Projeto original: **qmcgaw**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
