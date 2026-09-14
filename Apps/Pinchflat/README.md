# Pinchflat

> Your next YouTube media manager

## O que é

Pinchflat is a self-hosted app for downloading YouTube content built using yt-dlp. It's designed to be lightweight, self-contained, and easy to use. You set up rules for how to download content from YouTube channels or playlists and it'll do the rest, periodically checking for new content.

Key features include:
- Self-contained - just one Docker container with no external dependencies
- Powerful naming system so content is stored where and how you want it
- Easy-to-use web interface with presets to get you started right away
- First-class support for media center apps like Plex, Jellyfin, and Kodi
- Supports serving RSS feeds to your favourite podcast app
- Automatically downloads new content from channels and playlists
- Supports downloading audio content
- Custom rules for handling YouTube Shorts and livestreams
- Apprise support for notifications
- Optionally automatically delete old content
- Advanced options like setting cutoff dates and filtering by title
- Reliable hands-off operation
- Can pass cookies to YouTube to download your private playlists
- Sponsorblock integration
- Supports running custom scripts when after downloading/deleting media

Perfect for people who want to download content for use with a media center app or for those who want to archive media!


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço   |
| ---- | --------- | --------- | --------------- | --------- |
| 8945 | 8945      | tcp       | WebUI HTTP Port | pinchflat |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço   |
| --------------------------- | ------------ | --------- |
| /DATA/AppData/$AppID/config | /config      | pinchflat |
| /DATA/Media/Downloads       | /downloads   | pinchflat |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço   |
| -------- | ------------ | --------- |
| TZ       | $TZ          | pinchflat |
| PUID     | $PUID        | pinchflat |
| PGID     | $PGID        | pinchflat |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8945/`.

- Pinchflat will automatically create the necessary directories and start downloading content based on your configured sources.
- Make sure you have enough storage space for your downloads. The app uses /downloads as the default download directory.
- After installation, access the web interface to configure your YouTube channels and playlists for automatic downloading.

## Imagens

| Serviço   | Imagem                               |
| --------- | ------------------------------------ |
| pinchflat | ghcr.io/kieraneglin/pinchflat:latest |

## Fonte oficial

Projeto original: **kieraneglin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
