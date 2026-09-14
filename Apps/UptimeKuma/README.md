# Uptime Kuma

> A fancy monitoring tool

## O que é

Uptime Kuma is a free, easy-to-use self-hosted monitoring tool designed for real-time tracking of network services and infrastructure, offering a modern interface and robust functionality. It provides an intuitive Web dashboard for managing services, ideal for individual developers, home lab users, and small teams.

The tool's core features include comprehensive monitoring and diverse notification channels. It monitors HTTP/HTTPS, TCP ports, DNS records, databases, Ping, and Steam game servers, with interactive Ping charts visually displaying response times and status. Users can receive real-time alerts via Telegram, Discord, Slack, Email (SMTP), and over 95 other notification services. SSL certificate monitoring checks certificate validity and expiration, aiding timely renewals.

It supports 20-second monitoring intervals for rapid downtime detection and offers multiple status pages to share real-time service status with customers. Proxy support enables remote access via Cloudflare, Nginx, or similar services, enhancing flexibility. Two-factor authentication (2FA) and API keys bolster security, ensuring full user control over local data. The tool delivers an efficient monitoring solution with intuitive operation and community support.

**Key Features:**
- Monitor HTTP/HTTPS, TCP, DNS, databases, and other services
- Notifications via Telegram, Discord, Slack, and over 95 other channels
- Interactive Ping charts displaying response times and status
- SSL certificate monitoring for validity and expiration
- 20-second monitoring intervals for rapid downtime detection
- Multiple status pages for sharing service status
- Proxy support compatible with Cloudflare, Nginx, and more
- Two-factor authentication (2FA) and API keys for enhanced security

**Learn More:**
- [Uptime Kuma Official Website](https://uptimekuma.org)
- [Uptime Kuma GitHub Repository](https://github.com/louislam/uptime-kuma)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço    |
| ---- | --------- | --------- | -------------- | ---------- |
| 3001 | 3001      | tcp       | WebUI Port     | uptimekuma |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container | Serviço    |
| ----------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/app/data | /app/data    | uptimekuma |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3001/`.

## Imagens

| Serviço    | Imagem                              |
| ---------- | ----------------------------------- |
| uptimekuma | louislam/uptime-kuma:1.23.16-alpine |

## Fonte oficial

Projeto original: **Louis Lam**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
