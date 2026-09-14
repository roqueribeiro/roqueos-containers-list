# ArchiveBox

> Self-hosted internet archiving solution

## O que é

ArchiveBox is a powerful, self-hosted internet archiving solution that allows you to create your own personal archive of web pages, PDFs, videos, and more. It functions as a personal internet archive, saving content in multiple formats for long-term preservation.

The system consists of multiple components:
- **ArchiveBox**: The main application providing the web interface and archiving capabilities
- **Sonic**: A fast search backend for full-text search across archived content
- **ArchiveBox Scheduler**: A background service for scheduled archiving tasks
- **NoVNC**: A web-based VNC client for browser-based archiving

**Key Features:**
- Save web pages in multiple formats (HTML, PDF, screenshots, etc.)
- Full-text search across all archived content
- Scheduled archiving of websites and RSS feeds
- Browser-based archiving with NoVNC
- User authentication and access control
- Extract and save media files (videos, audio, PDFs, etc.)

**Learn More:**
- [ArchiveBox Official Website](https://archivebox.io)
- [ArchiveBox GitHub Repository](https://github.com/ArchiveBox/ArchiveBox)
- [ArchiveBox Documentation](https://github.com/ArchiveBox/ArchiveBox/wiki)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve                | Serviço          |
| ----- | --------- | --------- | ----------------------------- | ---------------- |
| 18010 | 8000      | tcp       | ArchiveBox Web Interface Port | archivebox       |
| 18082 | 8080      | tcp       | NoVNC Web Interface Port      | archivebox_novnc |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                         | No container         | Serviço              |
| ------------------------------- | -------------------- | -------------------- |
| /DATA/AppData/$AppID/data       | /data                | archivebox           |
| /DATA/AppData/$AppID/data       | /data                | archivebox_scheduler |
| /DATA/AppData/$AppID/data/sonic | /var/lib/sonic/store | archivebox_sonic     |

## Variáveis de ambiente

| Variável                 | Valor padrão       | Serviço              |
| ------------------------ | ------------------ | -------------------- |
| ADMIN_USERNAME           | roqueos            | archivebox           |
| ADMIN_PASSWORD           | roqueos            | archivebox           |
| ALLOWED_HOSTS            | *                  | archivebox           |
| CSRF_TRUSTED_ORIGINS     | *                  | archivebox           |
| PUBLIC_INDEX             | True               | archivebox           |
| PUBLIC_SNAPSHOTS         | True               | archivebox           |
| PUBLIC_ADD_VIEW          | False              | archivebox           |
| SEARCH_BACKEND_ENGINE    | sonic              | archivebox           |
| SEARCH_BACKEND_HOST_NAME | archivebox_sonic   | archivebox           |
| SEARCH_BACKEND_PASSWORD  | SomeSecretPassword | archivebox           |
| TIMEOUT                  | 120                | archivebox_scheduler |
| SEARCH_BACKEND_ENGINE    | sonic              | archivebox_scheduler |
| SEARCH_BACKEND_HOST_NAME | archivebox_sonic   | archivebox_scheduler |
| SEARCH_BACKEND_PASSWORD  | SomeSecretPassword | archivebox_scheduler |
| SEARCH_BACKEND_PASSWORD  | SomeSecretPassword | archivebox_sonic     |
| DISPLAY_WIDTH            | 1920               | archivebox_novnc     |
| DISPLAY_HEIGHT           | 1080               | archivebox_novnc     |
| RUN_XTERM                | no                 | archivebox_novnc     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:18010/`.

- **Default Account**
- | Username | Password |
- |----------|----------|
- | `roqueos`    | `roqueos` |

## Imagens

| Serviço              | Imagem                      |
| -------------------- | --------------------------- |
| archivebox           | archivebox/archivebox:0.7.3 |
| archivebox_scheduler | archivebox/archivebox:0.7.3 |
| archivebox_sonic     | archivebox/sonic:1.4.9      |
| archivebox_novnc     | theasp/novnc:latest         |

## Fonte oficial

Projeto original: **ArchiveBox**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
