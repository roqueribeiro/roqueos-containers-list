# RomM

> RomM is a self-hosted ROM manager for managing and playing game collections.

## O que é

RomM is a self-hosted game collection management app designed for emulator enthusiasts, offering a convenient way to scan, enrich, browse, and play games. Its responsive Web interface allows users to manage collections via any modern browser, supporting over 400 platforms, ideal for retro gaming fans building personal game libraries.

The app's core features include robust library management and seamless gameplay. It fetches metadata from IGDB, Screenscraper, and MobyGames, and custom artwork from SteamGridDB, enhancing the visual appeal of collections. Users can play games directly in the browser using EmulatorJS and RuffleRS, with support for multi-disk games, DLCs, patches, and manuals. It also enables parsing and filtering by filename tags for tailored organization. Additionally, it supports multi-user accounts with limited access permissions, allowing library sharing with friends and displaying RetroAchievements.

It can be flexibly deployed on personal servers or NAS devices, with official apps for Playnite and muOS enhancing cross-device access. Users can upload, update, or delete games via the Web interface, with community support documentation expanding functionality. Whether managing a personal retro game library or sharing with others, the app's intuitive interface and high customizability deliver a modern game management platform, meeting diverse needs.

**Key Features:**
- Scan and enhance your game library with metadata from IGDB, Screenscraper and MobyGames
- Fetch custom artwork from SteamGridDB
- Display your achievements from Retroachievements
- Metadata available for 400+ platforms
- Play games directly from the browser using EmulatorJS and RuffleRS
- Share your library with friends with limited access and permissions
- Official apps for Playnite and muOS
- Supports multi-disk games, DLCs, mods, hacks, patches, and manuals
- Parse and filter by tags in filenames
- View, upload, update, and delete games from any modern web browser

**Learn More:**
- [RomM Official Website](https://romm.app)
- [RomM GitHub Repository](https://github.com/rommapp/romm)


Categoria na App Store do RoqueOS: **Gaming**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 8285 | 8080      | tcp       | WebUI HTTP Port | romm    |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                         | No container    | Serviço |
| ------------------------------- | --------------- | ------- |
| /DATA/AppData/$AppID/resources  | /romm/resources | romm    |
| /DATA/AppData/$AppID/redis-data | /redis-data     | romm    |
| /DATA/AppData/$AppID/library    | /romm/library   | romm    |
| /DATA/AppData/$AppID/assets     | /romm/assets    | romm    |
| /DATA/AppData/$AppID/config     | /romm/config    | romm    |
| /DATA/AppData/$AppID/mysql      | /var/lib/mysql  | romm-db |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço |
| ---------------------- | ------------ | ------- |
| DB_HOST                | romm-db      | romm    |
| DB_NAME                | romm         | romm    |
| DB_USER                | romm-user    | romm    |
| DB_PASSWD              | roqueos      | romm    |
| ROMM_AUTH_SECRET_KEY   | ""           | romm    |
| IGDB_CLIENT_ID         | ""           | romm    |
| IGDB_CLIENT_SECRET     | ""           | romm    |
| SCREENSCRAPER_USER     | ""           | romm    |
| SCREENSCRAPER_PASSWORD | ""           | romm    |
| STEAMGRIDDB_API_KEY    | ""           | romm    |
| MARIADB_ROOT_PASSWORD  | roqueos      | romm-db |
| MARIADB_DATABASE       | romm         | romm-db |
| MARIADB_USER           | romm-user    | romm-db |
| MARIADB_PASSWORD       | roqueos      | romm-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8285/`.

## Imagens

| Serviço | Imagem             |
| ------- | ------------------ |
| romm    | rommapp/romm:4.0.1 |
| romm-db | mariadb:11.8.2     |

## Fonte oficial

Projeto original: **rommapp**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
