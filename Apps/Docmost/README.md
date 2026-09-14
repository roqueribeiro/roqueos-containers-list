# Docmost

> A modern wiki and knowledge base for teams

## O que é

Docmost is a self-hosted collaborative wiki and documentation tool designed for real-time collaboration, allowing multiple users to edit the same page simultaneously without conflicts. Its intuitive interface is ideal for teams managing knowledge bases, project documentation, or wikis, offering an efficient knowledge creation and sharing experience.

The tool's core features include real-time collaborative editing and space organization. It supports multiple users editing pages in real time for seamless collaboration and organizes pages into 'spaces' for teams, projects, or departments, each with independent permission settings. A rich text editor with Markdown shortcuts simplifies content creation. Built-in Draw.io, Excalidraw, and Mermaid tools provide robust diagramming capabilities.

It offers permissions management, assigning access via user groups for content security. Pages can be publicly shared via links for external access. Comments enhance communication and feedback, while page history tracks changes. Features like nested navigation, quick search, file attachments, and Markdown/HTML import/export are supported. The tool’s collaboration and flexibility deliver a modern documentation solution.

**Key Features:**
- Real-time collaborative editing for multiple users
- Spaces for organizing pages by team, project or department
- Permissions management with user group access control
- Rich text editor with Markdown shortcuts
- Built-in Draw.io, Excalidraw, Mermaid diagramming tools
- Public page sharing via links
- Page comments for communication and feedback
- Page history, nested navigation, search, and file attachments

**Learn More:**
- [Docmost Official Website](https://docmost.com/)
- [Docmost GitHub](https://github.com/docmost/docmost)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 3000 | 3000      | tcp       | WebUI HTTP Port | docmost |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container             | Serviço       |
| ---------------------------- | ------------------------ | ------------- |
| /DATA/AppData/$AppID/storage | /app/data/storage        | docmost       |
| /DATA/AppData/$AppID/pgdata  | /var/lib/postgresql/data | docmost-db    |
| /DATA/AppData/$AppID/redis   | /data                    | docmost-redis |

## Variáveis de ambiente

| Variável          | Valor padrão                                                 | Serviço    |
| ----------------- | ------------------------------------------------------------ | ---------- |
| APP_URL           | http://localhost:3000                                        | docmost    |
| APP_SECRET        | gxahngf9wc9ak9ahgpjp03zp1akcr7ry                             | docmost    |
| DATABASE_URL      | postgresql://docmost:jcui51lw747yuuk4zrpm@docmost-db:5432/do | docmost    |
| REDIS_URL         | redis://docmost-redis:6379                                   | docmost    |
| POSTGRES_DB       | docmost                                                      | docmost-db |
| POSTGRES_USER     | docmost                                                      | docmost-db |
| POSTGRES_PASSWORD | jcui51lw747yuuk4zrpm                                         | docmost-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

## Imagens

| Serviço       | Imagem                 |
| ------------- | ---------------------- |
| docmost       | docmost/docmost:0.21.0 |
| docmost-db    | postgres:16-alpine     |
| docmost-redis | redis:7.2-alpine       |

## Fonte oficial

Projeto original: **docmost**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
