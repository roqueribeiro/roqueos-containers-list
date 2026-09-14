# Swing Music

> Swing Music is a beautifully designed, self-hosted music streaming server. Like a cooler Spotify ... but bring your own music.

## O que é

Swing Music is a fast, beautiful, self-hosted music player designed for your local audio files, offering a sleek experience akin to Spotify but powered by your own music library. Simply run the app and access your music collection effortlessly through a web browser.

Swing Music curates Daily Mixes based on your listening habits, ensures a clean and consistent library with metadata normalization, and supports album versioning (e.g., Deluxe, Remaster) alongside related artist and album recommendations. Browse your music library via folder view, manage playlists, and enjoy a seamless listening experience with silence detection and cross-fade. Additional features include listening statistics, lyrics view, Last.fm scrobbling, multi-user support, and personalized collections for grouping albums and artists.

With its stunning browser-based interface and robust functionality, Swing Music is the perfect choice for music enthusiasts seeking a beautiful and practical way to manage and enjoy their local music collection.


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço    |
| ---- | --------- | --------- | -------------- | ---------- |
| 1970 | 1970      | tcp       | —              | swingmusic |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço    |
| --------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/config | /config      | swingmusic |
| /DATA/Media/Music           | /music       | swingmusic |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1970/`.

- When you first start Swing Music, it will ask you to pick music directory: Where do you want to look for music?
- select "Specific directories" Option, and select "/music" and rescan.
- Default Account
- | Name | Password |
- | -------- | -------- |
- | `admin` | `admin` |

## Imagens

| Serviço    | Imagem                            |
| ---------- | --------------------------------- |
| swingmusic | ghcr.io/swingmx/swingmusic:v1.4.8 |

## Fonte oficial

Projeto original: **SwingMX**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
