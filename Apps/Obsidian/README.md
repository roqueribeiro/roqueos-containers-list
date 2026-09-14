# Obsidian

> Obsidian is a knowledge management app for creating, linking, and visually organizing Markdown notes.

## O que é

Obsidian is a self-hosted knowledge management app designed for creating, linking, and organizing notes, operating on local Markdown files, leveraging WebDAV and kasmVNC remote desktop technology to deliver a near-native experience in browsers. Its intuitive interface supports storing and editing notes on devices, ensuring full data ownership, ideal for crafting a lasting second brain.

The app's core features include robust note management and connectivity, suitable for various scenarios. Bi-directional linking connects related notes, forming a web of knowledge, while the Graph View visualizes note relationships, helping users uncover hidden connections. It supports Markdown editing with live preview for easy formatting and structuring. Hundreds of community plugins and themes offer extended functionality, such as calendars, kanban boards, PDF annotation, and advanced search, enabling tailored workflows. The Canvas feature provides infinite visual organization space, aiding students in organizing research, writers in developing stories, or professionals in managing projects. Notes are stored as standard Markdown files, openable with any text editor, ensuring future-proof portability.

It enhances usability through community-provided documentation, and whether for personal knowledge bases or team collaboration, the app's high flexibility and intuitive operation offer a modern knowledge management solution.

**Key Features:**
- Local storage, ensuring full data ownership
- Bi-directional note linking for a knowledge web
- Graph View for visualizing note connections
- Extensible plugin system for personalized needs
- Markdown support with live preview
- Infinite Canvas for visual organization
- Theme customization for enhanced visuals

**Learn More:**
- [Obsidian Official Website](https://obsidian.md)
- [DockerHub](https://hub.docker.com/r/linuxserver/obsidian)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                  | Serviço  |
| ----- | --------- | --------- | ------------------------------- | -------- |
| 15323 | 3000      | tcp       | Obsidian Desktop GUI HTTP Port  | obsidian |
| 15324 | 3001      | tcp       | Obsidian Desktop GUI HTTPS Port | obsidian |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço  |
| --------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/config | /config      | obsidian |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| PUID     | 1000         | obsidian |
| PGID     | 1000         | obsidian |
| TZ       | $TZ          | obsidian |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:15324/`.

## Imagens

| Serviço  | Imagem                              |
| -------- | ----------------------------------- |
| obsidian | lscr.io/linuxserver/obsidian:1.8.10 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
