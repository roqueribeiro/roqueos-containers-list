# oPodSync

> Podcast synchronization service

## O que é

oPodSync is a podcast synchronization service that allows users to sync their podcast subscriptions and listening progress across multiple devices. It provides a server-side solution for managing podcast data and ensures that users can seamlessly switch between their devices.

**Key Features:**
- Sync podcast subscriptions
- Track listening progress across devices
- Web-based management interface
- Support for multiple podcast clients
- Centralized data storage
- Easy setup and configuration

**Learn More:**
- [oPodSync GitHub Repo](https://github.com/kd2org/oPodSync)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço  |
| ---- | --------- | --------- | ------------------ | -------- |
| 8086 | 8080      | tcp       | Web interface port | opodsync |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço  |
| -------------------- | -------------------- | -------- |
| /DATA/AppData/$AppID | /var/www/server/data | opodsync |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8086/`.

## Imagens

| Serviço  | Imagem                    |
| -------- | ------------------------- |
| opodsync | ganeshlab/opodsync:latest |

## Fonte oficial

Projeto original: **ganeshlab**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
