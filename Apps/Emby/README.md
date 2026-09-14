# Emby

> Emby brings together your personal videos, music, photos, and live television.

## O que é

Emby is a personal media management platform that brings home videos, music, and photos together, automatically converting and streaming to any device. An intuitive design makes it ideal for users to enjoy media content anytime, anywhere, meeting family entertainment and media management needs.

Core features include cross-device media streaming and easy access. It supports real-time conversion and streaming of personal media to any device for seamless playback. A connection service enables easy media access while away from home. Live TV functionality supports streaming, managing DVR, and accessing a library of recordings. Mobile sync delivers media to smartphones and tablets for offline access, automatically updating new content.

It offers parental controls to restrict children's content access, set schedules and time limits, and remotely monitor sessions. Chromecast support enables easy streaming of videos, music, photos, and Live TV. Content is presented elegantly, enhancing visual experience. Cloud sync supports backup, archiving, and multi-resolution storage for optimized streaming. Web-based media management facilitates editing metadata, images, and searching subtitles, while DLNA integration auto-detects network devices for content streaming. With convenience and versatility at the core, the platform delivers a modern media management solution.

**Key Features:**
- Automatic conversion and streaming of media to any device
- Easy access via connection service while away from home
- Live TV streaming, DVR management, and recording library access
- Mobile sync to smartphones and tablets for offline access
- Parental controls with content restrictions, schedules, and remote monitoring
- Chromecast support for streaming videos, music, photos, and Live TV
- Cloud sync for backup and multi-resolution storage
- Web-based media management for editing metadata and searching subtitles
- DLNA integration for auto-detecting network devices and streaming content

**Learn More:**
- [Emby Official Website](https://emby.media/)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 8096 | 8096      | tcp       | —              | emby    |
| 8920 | 8920      | tcp       | —              | emby    |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container  | Serviço |
| --------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/config | /config       | emby    |
| /DATA/Media/TV Shows        | /data/tvshows | emby    |
| /DATA/Media/Movies          | /data/movies  | emby    |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | 1000         | emby    |
| PUID     | 1000         | emby    |
| TZ       | $TZ          | emby    |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8096/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| emby    | linuxserver/emby:4.9.1 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
