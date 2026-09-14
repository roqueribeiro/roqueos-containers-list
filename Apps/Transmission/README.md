# Transmission

> Transmission is a cross-platform BitTorrent client

## O que é

Transmission is a BitTorrent client designed for simplicity and powerful performance, delivering an efficient and user-friendly downloading experience. It comes equipped with all the essential features you expect, including encryption, a web interface, peer exchange, magnet links, DHT, µTP, UPnP and NAT-PMP port forwarding, webseed support, watch directories, tracker editing, global and per-torrent speed limits, and more.

With its intuitive interface, Transmission caters to both beginners and advanced users. Whether you’re managing a single download or juggling complex torrent queues, Transmission ensures a seamless experience with optimized resource usage and reliable performance. For casual users and tech enthusiasts alike, Transmission is the ideal BitTorrent solution.


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve | Serviço      |
| ----- | --------- | --------- | -------------- | ------------ |
| 9091  | 9091      | tcp       | —              | transmission |
| 51413 | 51413     | tcp       | —              | transmission |
| 51413 | 51413     | udp       | —              | transmission |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço      |
| --------------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID/config | /config      | transmission |
| /DATA/Downloads             | /downloads   | transmission |
| /DATA/Downloads/watch       | /watch       | transmission |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço      |
| -------- | ------------- | ------------ |
| PASS     | roqueos       | transmission |
| PEERPORT | 51413         | transmission |
| PGID     | 1000          | transmission |
| PUID     | 1000          | transmission |
| TZ       | Europe/London | transmission |
| USER     | roqueos       | transmission |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9091/`.

- | username | password |
- | -------- | -------- |
- | `roqueos` | `roqueos` |

## Imagens

| Serviço      | Imagem                         |
| ------------ | ------------------------------ |
| transmission | linuxserver/transmission:4.0.4 |

## Fonte oficial

Projeto original: **Transmission**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
