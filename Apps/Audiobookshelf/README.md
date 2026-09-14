# Audiobookshelf

> Audiobookshelf is a self-hosted audiobook and podcast server.

## O que é

Audiobookshelf is a self-hosted media server designed for managing and streaming audiobooks, podcasts, and e-books, offering a secure and flexible solution for personal media libraries. Its lightweight architecture and intuitive Web interface (available as a Progressive Web App, PWA) enable seamless access from any browser, while beta Android and iOS apps support offline listening, catering to privacy-focused media enthusiasts.

The app supports on-the-fly streaming of all audio formats and provides robust management tools, including automatic metadata and cover art fetching from multiple sources, bulk drag-and-drop uploads for books and podcasts, and chapter editing with lookup via the Audnexus API. Users can search and subscribe to podcasts with auto-downloading episodes or manage content via open RSS feeds. It supports multi-user access with custom permissions, ensuring individual playback progress syncs across devices. Additionally, it offers audio tools (like merging files into m4b or embedding metadata) and experimental e-book support (epub, pdf, cbr, cbz), with the ability to send e-books to devices like Kindle.

It automatically detects library updates, eliminating manual rescans, and includes daily automated backups to safeguard metadata. Chromecast support (on Web and Android apps) enhances streaming capabilities, while an active community provides support documentation for continuous improvements. Whether for personal collections or family sharing, the app's intuitive interface and versatile features deliver a modern media management platform, meeting diverse needs.

**Key Features:**
- Multi-user support w/ custom permissions
- Keeps progress per user and syncs across devices
- Lookup and apply metadata and cover art from several providers
- Audiobook chapter editor w/ chapter lookup
- Audiobook tools: Embed metadata in audio files & merge multiple audio files to a single m4b
- Search and add podcasts to download episodes w/ auto-download
- Open RSS feeds for audiobooks and podcast episodes
- Backups with automated backup scheduling
- Basic ebook support and ereader (epub, pdf, cbr, cbz) + send to device (i.e. Kindle)

**Learn More:**
- [Audiobookshelf Official Website](https://audiobookshelf.org)
- [Audiobookshelf GitHub Repository](https://github.com/advplyr/audiobookshelf)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço        |
| ----- | --------- | --------- | --------------- | -------------- |
| 13378 | 80        | tcp       | WebUI HTTP Port | audiobookshelf |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container | Serviço        |
| ----------------------------- | ------------ | -------------- |
| /DATA/Media/Audiobooks        | /audiobooks  | audiobookshelf |
| /DATA/Media/Podcasts          | /podcasts    | audiobookshelf |
| /DATA/AppData/$AppID/config   | /config      | audiobookshelf |
| /DATA/AppData/$AppID/metadata | /metadata    | audiobookshelf |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:13378/`.

## Imagens

| Serviço        | Imagem                                |
| -------------- | ------------------------------------- |
| audiobookshelf | ghcr.io/advplyr/audiobookshelf:2.30.0 |

## Fonte oficial

Projeto original: **advplyr**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
