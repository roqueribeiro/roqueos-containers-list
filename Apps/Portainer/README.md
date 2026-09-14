# Portainer

> Lightweight Docker management UI

## O que é

Portainer Community Edition (CE) is a lightweight container management tool offering an intuitive Web interface to simplify building, managing, and monitoring containerized applications. With over 500,000 active users, it is widely appreciated for its ease of use and robust functionality, ideal for individual developers, home lab users, and small teams.

The tool's core features include multi-platform support, resource management, and real-time monitoring. It supports managing various container platforms, covering containers, images, volumes, and networks. Users can quickly create, deploy, and manage containers via a “smart” graphical interface or comprehensive API, without needing deep command-line expertise. It provides real-time container status monitoring, log viewing, and configuration management, ensuring efficient control over application operations.

Its design philosophy is to “simplify container complexity” with an intuitive interface and default settings that lower the technical barrier. Users can manage containerized applications without complex configurations, saving time and boosting efficiency. It is completely free, with data stored locally, ensuring full user control. Community support via GitHub Discussions and Slack, along with rich documentation and regular updates, enhances the user experience, making it suitable for learning container technology or managing small projects.

**Key Features:**
- Intuitive Web interface for simplified containerized app management
- Supports multiple container platforms for unified resource management
- Real-time monitoring of container status and logs
- Rapid container deployment and management via API
- Community support with extensive documentation and assistance

**Learn More:**
- [Portainer Official Website](https://www.portainer.io/)
- [Portainer GitHub Repository](https://github.com/portainer/portainer)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço   |
| ---- | --------- | --------- | ---------------------------- | --------- |
| 8000 | 8000      | tcp       | —                            | portainer |
| 9000 | 9000      | tcp       | Portainer Web UI Port        | portainer |
| 9443 | 9443      | tcp       | Portainer Web UI Port(https) | portainer |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço   |
| -------------------- | -------------------- | --------- |
| /DATA/AppData/$AppID | /data                | portainer |
| /var/run/docker.sock | /var/run/docker.sock | portainer |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9000/`.

## Imagens

| Serviço   | Imagem                        |
| --------- | ----------------------------- |
| portainer | portainer/portainer-ce:2.31.3 |

## Fonte oficial

Projeto original: **Portainer**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
