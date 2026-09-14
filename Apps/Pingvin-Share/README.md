# Pingvin-Share

> Self-hosted file sharing with a modern web interface

## O que é

Pingvin-Share is a self-hosted file sharing application compatible with Nextcloud apps, offering a modern and intuitive web interface. It enables users to securely store, organize, and share files without relying on external cloud services. The application supports multiple authentication methods and provides features such as share links, user accounts, and a responsive interface.

**Key features:**
- Modern, responsive web interface
- User accounts with a permission system
- Secure share links for files
- Drag-and-drop file upload
- Password-protected shares
- Multiple authentication methods
- Docker-based deployment for easy installation

**Learn more:**
- [Pingvin-Share GitHub](https://github.com/stonith404/pingvin-share)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                   | Serviço       |
| ---- | --------- | --------- | -------------------------------- | ------------- |
| 3410 | 3000      | tcp       | Pingvin-Share web interface port | pingvin-share |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container                 | Serviço       |
| --------------------------- | ---------------------------- | ------------- |
| /DATA/AppData/$AppID/data   | /opt/app/backend/data        | pingvin-share |
| /DATA/AppData/$AppID/images | /opt/app/frontend/public/img | pingvin-share |

## Variáveis de ambiente

| Variável    | Valor padrão | Serviço       |
| ----------- | ------------ | ------------- |
| TRUST_PROXY | false        | pingvin-share |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3410/`.

## Imagens

| Serviço       | Imagem                          |
| ------------- | ------------------------------- |
| pingvin-share | stonith404/pingvin-share:latest |

## Fonte oficial

Projeto original: **stonith404**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
