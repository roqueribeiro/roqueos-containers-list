# PeaNUT

> UPS monitoring and power outage notification system

## O que é

PeaNUT is a web-based UPS monitoring system specifically designed for monitoring Uninterruptible Power Supplies (UPS). It provides a user-friendly interface for monitoring UPS status, battery life, and power outage notifications to ensure your systems are always protected.

**Key Features:**
- Real-time UPS status monitoring and control
- Battery life and charge level monitoring
- Automatic power outage notifications via email/webhook
- Historical data logging and reporting
- Support for various UPS manufacturers and models
- Mobile-friendly responsive web interface for remote access
- Configurable warning thresholds and alerts
- Docker-based deployment for easy installation

**Learn More:**
- [PeaNUT GitHub Repository](https://github.com/brandawg93/peanut)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve            | Serviço |
| ---- | --------- | --------- | ------------------------- | ------- |
| 8084 | 8080      | tcp       | PeaNUT web interface port | peanut  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | peanut  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| WEB_PORT | 8080         | peanut  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8084/`.

- The UPS service parameters for ZimaOS are as follows:
- | Server Address | Port | Username | Password |
- |----------------|------|----------|----------|
- | ZimaOS IP      | `3493` | `monuser` | `secret` |

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| peanut  | brandawg93/peanut:5.19.1 |

## Fonte oficial

Projeto original: **brandawg93**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
