# Gopeed

> Open source, lightweight, native, supports (HTTP, BitTorrent, Magnet, etc.) for downloading.

## O que é

Gopeed is a modern high-speed download tool supporting HTTP, BitTorrent, and Magnet protocols, offering a beautiful interface and powerful functionality. Its lightweight design and multi-platform support make it ideal for efficient file downloading across various devices.

The tool's core features include high-speed downloading and an elegant interface. It leverages Golang coroutines for concurrent downloading, supporting HTTP, HTTPS, BitTorrent, and Magnet protocols for fast, stable performance. The interface follows Material Design standards, including a dark mode, balancing aesthetics and usability. Advanced features include seeding, DHT, PEX, uTP, Webtorrent, and UPnP support, with daily automatic tracker list updates to enhance download efficiency.

It provides a RESTful API for open integration, allowing users to remotely control download tasks, pause, or delete them. Decentralized extensions enable JavaScript plugins to enhance functionality, such as downloading videos or music from websites. The tool's speed, flexibility, and user-friendly design deliver a modern download solution.

**Key Features:**
- High-speed downloading with HTTP, BitTorrent, Magnet protocols
- Seeding, DHT, PEX, uTP, Webtorrent, UPnP
- Daily automatic tracker list updates
- RESTful API for remote download task control
- Decentralized extensions with JavaScript plugins

**Learn More:**
- [Gopeed Official Website](https://gopeed.com)
- [Gopeed GitHub Repository](https://github.com/gopeedlab/gopeed)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 9999 | 9999      | tcp       | WebUI HTTP Port | gopeed  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container   | Serviço |
| ------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/data | /app/storage   | gopeed  |
| /DATA/Downloads           | /app/Downloads | gopeed  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9999/`.

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| gopeed  | liwei2633/gopeed:v1.8.3 |

## Fonte oficial

Projeto original: **GopeedLab**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
