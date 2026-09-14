# Komga

> Komga is a media server for your comics, mangas, BDs, magazines and eBooks.

## O que é

Komga is a self-hosted app designed for managing comics, manga, magazines, and e-books (supporting CBZ, CBR, PDF, and EPUB formats), offering a secure and convenient solution for personal media libraries. Its responsive Web interface enables users to access and manage content effortlessly via any browser, without complex local installations, ideal for comic and e-book enthusiasts.

The app's core features include versatile content organization and diverse reading options. Users can arrange their library with collections and reading lists, edit metadata for series or books, and keep content neatly organized. It integrates a built-in Web reader, supports Mihon SDK extensions, or connects with third-party OPDS readers, catering to varied reading preferences. Whether managing a personal comic collection or sharing e-books with family, it supports multi-user access and delivers a smooth browsing experience. Bulk import streamlines large media library management, perfect for efficient content organization.

It can be flexibly deployed on personal servers or NAS devices, with an active community providing support documentation, enabling users to extend functionality through community resources. Whether building a personal digital library or a private media-sharing hub, the app's intuitive interface and high customizability offer a secure, modern media management platform, meeting needs from casual reading to professional collections.

**Key Features:**
- Organize your library with collections and read lists
- Edit metadata for your series and books
- Import embedded metadata automatically
- Webreader with multiple reading modes
- Manage multiple users, with per-library access control, age restrictions, and labels restrictions
- Offers a REST API, many community tools and scripts can interact with Komga
- OPDS v1 and v2 support
- Kobo Sync with your Kobo eReader
- KOReader Sync
- Download book files, whole series, or read lists
- Duplicate files detection
- Duplicate pages detection and removal
- Import books from outside your libraries directly into your series folder
- Import ComicRack cbl read lists

**Learn More:**
- [Komga Official Website](https://komga.org)
- [Komga GitHub Repository](https://github.com/gotson/komga)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço |
| ----- | --------- | --------- | --------------- | ------- |
| 25600 | 25600     | tcp       | WebUI HTTP Port | komga   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container  | Serviço |
| --------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/config | /config       | komga   |
| /DATA/AppData/$AppID/data   | /data         | komga   |
| /etc/timezone               | /etc/timezone | komga   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | 1000         | komga   |
| PUID     | 1000         | komga   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:25600/`.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| komga   | gotson/komga:1.23.6 |

## Fonte oficial

Projeto original: **gotson**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
