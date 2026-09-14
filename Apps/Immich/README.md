# Immich

> Self-hosted media management solution

## O que é

Immich: Revolutionizing Your Home Media Experience

Immich is here to transform the way you manage and enjoy your media files across your home TV, smartphones, and other devices. Unlike traditional photo albums or mainstream cloud services, immich offers a seamless and modern platform for organizing, sharing, and accessing your photos and videos. Imagine effortlessly backing up your precious moments from your mobile devices and viewing them instantly on your TV or sharing them with family members—immich makes it all possible.

Immich stands out with its automatic backup from mobile devices, a sleek web-based interface for easy media browsing, and advanced features like face recognition and object detection. You can organize your media by location, enjoy 4K video playback, and even manage RAW photos. Plus, with multi-user support, sharing memories with friends and family is a breeze. The best part? Immich offers these powerful features for low cost, ensuring you get a premium experience without breaking the bank.

Deploying immich on a private cloud device like Zima brings unparalleled convenience. Enjoy unlimited storage capacity, blazing-fast local network speeds, and easy multi-device access. With immich on your Zima private cloud, your media is always at your fingertips, safe and secure in your home.


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço       |
| ---- | --------- | --------- | -------------- | ------------- |
| 2283 | 2283      | tcp       | —              | immich-server |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container             | Serviço                 |
| -------------------------------- | ------------------------ | ----------------------- |
| /DATA/Gallery/immich             | /usr/src/app/upload      | immich-server           |
| /etc/localtime                   | /etc/localtime           | immich-server           |
| /DATA/AppData/immich/model-cache | /cache                   | immich-machine-learning |
| /DATA/AppData/immich/redis       | /data                    | redis                   |
| /DATA/AppData/immich/pgdata      | /var/lib/postgresql/data | database                |

## Variáveis de ambiente

| Variável             | Valor padrão     | Serviço                 |
| -------------------- | ---------------- | ----------------------- |
| DB_DATABASE_NAME     | immich           | immich-server           |
| DB_PASSWORD          | postgres         | immich-server           |
| DB_USERNAME          | postgres         | immich-server           |
| DB_DATABASE_NAME     | immich           | immich-machine-learning |
| DB_PASSWORD          | postgres         | immich-machine-learning |
| DB_USERNAME          | postgres         | immich-machine-learning |
| POSTGRES_PASSWORD    | postgres         | database                |
| POSTGRES_USER        | postgres         | database                |
| POSTGRES_DB          | immich           | database                |
| POSTGRES_INITDB_ARGS | --data-checksums | database                |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:2283/`.

- ⚠️ The project is under very active development.
- ⚠️ Expect bugs and breaking changes.
- ⚠️ Do not use the app as the only way to store your photos and videos.
- ⚠️ Always follow 3-2-1 backup plan for your precious photos and videos!
- ## Authorized Media Files and Data
- 1. Click on the settings icon in the upper right corner of the App.
- 2. In the immich-server tab, map your album storage location in the Volumes section (default is `/DATA/Gallery/immich`).
- For complete project documentation and installation instructions, please [refer to](https://immich.app).

## Imagens

| Serviço                 | Imagem                                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| immich-server           | altran1502/immich-server:v1.132.3                                                                                    |
| immich-machine-learning | altran1502/immich-machine-learning:v1.132.3                                                                          |
| redis                   | docker.io/redis:6.2-alpine@sha256:148bb5411c184abd288d9aaed139c98123eeb8824c5d3fce03cf721db58066d8                   |
| database                | docker.io/tensorchord/pgvecto-rs:pg14-v0.2.0@sha256:739cdd626151ff1f796dc95a6591b55a714f341c737e27f045019ceabf8e8c52 |

## Fonte oficial

Projeto original: **alextran1502**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
