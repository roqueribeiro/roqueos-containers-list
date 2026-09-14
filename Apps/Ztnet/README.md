# ZTnet

> Self-hosted ZeroTier network controller with web UI for centralized management.

## O que é

ZTNET is a powerful ZeroTier network management tool that simplifies network configuration and management through an intuitive Web interface, ideal for teams and individual users. Its modern design and rich features provide an efficient solution for building secure, scalable virtual networks.

The tool centers on an intuitive Web interface and organization with multi-user support. Developed in TypeScript, it acts as an intermediary between users and the ZeroTier Controller API, enabling collaborative network management within organizations to streamline team tasks. Integration with ZeroTier Central API allows direct management of networks, nodes, and members through a user-friendly interface, enhancing configuration efficiency.

It supports custom private root servers to create isolated network environments, improving privacy and control. Personalized user spaces enable users to independently create and manage networks. Support for 6plane and rfc4193 IPv6 addressing enriches enterprise or personal networking capabilities. Compatibility with ARM64 and AMD64 architectures ensures broad device support. The tool focuses on user-friendly and flexible design to deliver a modern network management experience.

**Key Features:**
- Intuitive Web interface for simplified ZeroTier network management
- Organization and multi-user support for team collaboration
- Integration with ZeroTier Central API for managing networks and nodes
- Custom private root server for enhanced privacy and control
- Personalized user spaces for independent network creation and management
- Support for 6plane and rfc4193 IPv6 addressing
- Compatibility with ARM64 and AMD64 architectures for diverse devices

**Learn More:**
- [ZTnet Official Website](https://ztnet.network/)
- [ZTnet GitHub](https://github.com/sinamics/ztnet)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 3050 | 3000      | tcp       | WebUI HTTP Port | ztnet   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                            | No container             | Serviço        |
| ---------------------------------- | ------------------------ | -------------- |
| /var/lib/zerotier-one              | /var/lib/zerotier-one    | ztnet          |
| /DATA/AppData/$AppID/postgres-data | /var/lib/postgresql/data | ztnet-postgres |

## Variáveis de ambiente

| Variável              | Valor padrão            | Serviço        |
| --------------------- | ----------------------- | -------------- |
| ZT_ADDR               | http://172.17.0.1:9993  | ztnet          |
| POSTGRES_HOST         | ztnet-postgres          | ztnet          |
| POSTGRES_PORT         | 5432                    | ztnet          |
| POSTGRES_USER         | ztnet                   | ztnet          |
| POSTGRES_PASSWORD     | ztnetbl5hbv98wl89x9v    | ztnet          |
| POSTGRES_DB           | ztnet                   | ztnet          |
| NEXTAUTH_URL          | http://0.0.0.0:3050     | ztnet          |
| NEXTAUTH_SECRET       | mn6vor005ncgnu9iuqxn8bg | ztnet          |
| NEXTAUTH_URL_INTERNAL | http://ztnet:3000       | ztnet          |
| POSTGRES_USER         | ztnet                   | ztnet-postgres |
| POSTGRES_PASSWORD     | ztnetbl5hbv98wl89x9v    | ztnet-postgres |
| POSTGRES_DB           | ztnet                   | ztnet-postgres |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3050/`.

- Prerequisites for using ZTnet:
- 1. Allow ZTNET to manage your local ZeroTier instance, refer to [Step 2 of the documentation: Configure ZeroTier](https://ztnet.network/usage/migrate)
- 2. (ZimaOS users do not need to perform this step) Modify the `ZT_ADDR` environment variable to your ZeroTier controller address

## Imagens

| Serviço        | Imagem               |
| -------------- | -------------------- |
| ztnet          | sinamics/ztnet:0.7.5 |
| ztnet-postgres | postgres:15.2-alpine |

## Fonte oficial

Projeto original: **sinamics**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
