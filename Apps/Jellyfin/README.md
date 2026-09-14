# Jellyfin

> The personal Media System

## O que é

Jellyfin stands out among media server applications for its fully open-source, free, and privacy-focused design. Unlike Emby and Plex, Jellyfin delivers robust media management, real-time transcoding, and granular multi-user permissions without subscription costs, operating independently of cloud services to ensure full user control over data. Its community-driven development and efficient resource usage enable smooth performance on low-end devices, making it the go-to choice for privacy-conscious and budget-savvy users.

Picture your movies, TV shows, and music at your fingertips, accessible on any device. Jellyfin transforms your media collection into a personalized entertainment hub, surpassing traditional photo albums with a seamless browsing and playback experience.
Jellyfin offers high-quality streaming, automatic metadata fetching, and personalized recommendations, all at no cost. It supports multiple users, each with their own media library, catering to the diverse needs of families or teams.
Deploying Jellyfin on private cloud devices like Zima provides near-unlimited storage, smooth streaming, and secure multi-device access. For NAS enthusiasts or anyone looking to elevate their home media setup, Jellyfin is the perfect solution.


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço  |
| ---- | --------- | --------- | ---------------------------- | -------- |
| 8097 | 8096      | tcp       | WebUI HTTP Port              | jellyfin |
| 8921 | 8920      | tcp       | WebUI HTTPS Port             | jellyfin |
| 7359 | 7359      | tcp       | Jellyfin auto-discovery Port | jellyfin |
| 1901 | 1900      | tcp       | Jellyfin DLNA Port           | jellyfin |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço  |
| --------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/config | /config      | jellyfin |
| /DATA/Media                 | /Media       | jellyfin |
| /opt/vc/lib                 | /opt/vc/lib  | jellyfin |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| PGID     | $PGID        | jellyfin |
| PUID     | $PUID        | jellyfin |
| TZ       | $TZ          | jellyfin |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8097/`.

## Imagens

| Serviço  | Imagem                       |
| -------- | ---------------------------- |
| jellyfin | linuxserver/jellyfin:10.10.7 |

## Fonte oficial

Projeto original: **Jellyfin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
