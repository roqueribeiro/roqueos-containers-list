# Homebridge

> HomeKit support for the impatient.

## O que é

Homebridge is a lightweight NodeJS server you can run on your home network that emulates the iOS HomeKit API. It supports Plugins, which are community-contributed modules that provide a basic bridge from HomeKit to various 3rd-party APIs provided by manufacturers of "smart home" devices.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço    |
| --------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/config | /homebridge  | homebridge |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8581/`.

### Por que este app pede privilégio

- `networkHost`: o HomeKit exige mDNS na mesma rede física dos acessórios

## Imagens

| Serviço    | Imagem                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------- |
| homebridge | homebridge/homebridge@sha256:77c685a40911b3b95448f3550be0c8b94cd7b4e66daecc1cc39a8285be75b245 |

## Fonte oficial

Projeto original: **Homebridge**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
