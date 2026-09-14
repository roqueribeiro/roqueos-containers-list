# Crafty

> Take control of your Minecraft servers.

## O que é

Crafty is an open source Minecraft control panel built using Tornado and AdminLTE, featuring server scheduling, a interactive console and the ability to run almost any type of Minecraft server

Categoria na App Store do RoqueOS: **Gaming**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host        | Container   | Protocolo | Para que serve                         | Serviço |
| ----------- | ----------- | --------- | -------------------------------------- | ------- |
| 8111        | 8443        | tcp       | Web interface for Crafty               | crafty  |
| 8112        | 8123        | tcp       | Service port 8123 of crafty            | crafty  |
| 19132       | 19132       | tcp       | Minecraft Bedrock listening Port (UDP) | crafty  |
| 25500-25600 | 25500-25600 | tcp       | Service port 25500-25600 of crafty     | crafty  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container       | Serviço |
| ---------------------------- | ------------------ | ------- |
| /DATA/AppData/crafty/backups | /crafty/backups    | crafty  |
| /DATA/AppData/crafty/logs    | /crafty/logs       | crafty  |
| /DATA/AppData/crafty/servers | /crafty/servers    | crafty  |
| /DATA/AppData/crafty/config  | /crafty/app/config | crafty  |
| /DATA/AppData/crafty/import  | /crafty/import     | crafty  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | Etc/UTC      | crafty  |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:8111/panel`.

- Conta padrão
- | Nome de usuário | Senha |
- |----------|----------|
- | `admin`    | `app/config/default-creds.txt` |

## Imagens

| Serviço | Imagem                                                |
| ------- | ----------------------------------------------------- |
| crafty  | registry.gitlab.com/crafty-controller/crafty-4:4.4.11 |

## Fonte oficial

Projeto original: **Crafty Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
