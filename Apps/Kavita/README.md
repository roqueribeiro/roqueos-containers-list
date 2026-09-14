# Kavita

> Kavita is a free and open source web based Comic and Book Server.

## O que é

Kavita is a self-hosted digital library app designed for managing and reading comics, light novels, and e-books (supporting CBZ, CBR, EPUB, PDF, and more), offering a secure and convenient solution for personal reading collections. Its responsive Web interface allows users to access content effortlessly via any browser, with fullscreen reading and full localization support, ideal for comic and e-book enthusiasts building personalized digital libraries.

The app's core features include robust library management and an enhanced reading experience. Users can organize content with collections, reading lists, and custom tags, editing metadata to keep libraries neatly arranged. The built-in manga reader supports dual-page mode, Webtoon scrolling, and image splitting, while the e-book reader offers customizable fonts, spacing, and themes, with by-line progress syncing across devices. The PDF reader provides light/dark modes and diverse settings. It supports multi-user management, allowing custom permissions for sharing libraries or restricting content access, perfect for family or team use. Bulk imports and full-text search streamline large collection management.

It can be flexibly deployed on personal servers or NAS devices, with an active community providing extensive documentation to enhance functionality. Folder monitoring automatically detects file changes without manual scans, and sending content to Kindle or other devices improves cross-device access. Whether creating a personal reading hub or sharing media with others, the app's intuitive interface and high customizability deliver a modern management platform, meeting needs from casual reading to professional collections.

**Key Features:**
- Serve up Manga/Webtoons/Comics (cbr, cbz, zip/rar/rar5, 7zip, raw images) and Books (epub, pdf)
- First class responsive readers that work great on any device (phone, tablet, desktop)
- Customizable theming support: [Theme Repo](https://github.com/Kareadita/Themes) and [Documentation](https://wiki.kavitareader.com/guides/themes/)
- External metadata integration and scrobbling for read status, ratings, and reviews (available via Kavita+)
- Rich Metadata support with filtering and searching
- Ways to group reading material: Collections, Reading Lists (CBL Import), Want to Read
- Ability to manage users with rich Role-based management for age restrictions, abilities within the app, etc
- Rich web readers supporting webtoon, continuous reading mode (continue without leaving the reader), virtual pages (epub), etc
- Ability to customize your dashboard and side nav with smart filters, custom order and visibility toggles
- Ability to download metadata (available via Kavita+)

**Learn More:**
- [Kavita Official Website](https://www.kavitareader.com)
- [Kavita GitHub Repository](https://github.com/Kareadita/Kavita)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 5150 | 5000      | tcp       | WebUI HTTP Port | kavita  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container   | Serviço |
| --------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/config | /kavita/config | kavita  |
| /DATA/Media/Manga           | /manga         | kavita  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | $TZ          | kavita  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5150/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| kavita  | jvmilazz0/kavita:0.8.8 |

## Fonte oficial

Projeto original: **jvmilazz0**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
