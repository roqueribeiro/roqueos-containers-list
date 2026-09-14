# Pi-hole

> Network-wide Ad Blocking

## O que é

Pi-hole is a network-wide ad-blocking platform for Linux hardware, using DNS sinkhole technology to protect devices from unwanted content without requiring client-side software. Designed for home or enterprise networks, it offers efficient ad blocking and network optimization.

Core features include network-wide ad blocking and content blocking in non-browser environments. It uses DNS sinkhole to block ads, covering mobile apps and smart TVs. Caching DNS queries speeds up everyday browsing. A command-line interface ensures interoperability with reliable control options.

It provides an intuitive web interface dashboard for viewing and managing system status. An optional DHCP server function automatically protects all devices. Capable of handling high query volumes on server-grade hardware, it supports ad blocking over IPv4 and IPv6. With efficiency and versatility at the core, the platform delivers a modern network protection solution.

**Key Features:**
- Network-wide ad blocking via DNS sinkhole technology
- Blocking content in non-browser environments, including mobile apps and smart TVs
- Caching DNS queries to speed up browsing
- Command-line interface for interoperability
- Intuitive web interface dashboard for system viewing and control
- Optional DHCP server function for automatic device protection
- Ad blocking support for IPv4 and IPv6

**Learn More:**
- [Pi-hole Official Website](https://pi-hole.net/)
- [Pi-hole GitHub](https://github.com/pi-hole/pi-hole)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, 386, arm.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço |
| ---- | --------- | --------- | ------------------ | ------- |
| 8800 | 80        | tcp       | WebUI HTTP Port    | pihole  |
| 53   | 53        | tcp       | Pi-hole DNS port   | pihole  |
| 53   | 53        | udp       | Pi-hole DNS port   | pihole  |
| 8443 | 443       | tcp       | Pi-hole HTTPS port | pihole  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container | Serviço |
| -------------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/etc/pihole/ | /etc/pihole  | pihole  |

## Variáveis de ambiente

| Variável                       | Valor padrão | Serviço |
| ------------------------------ | ------------ | ------- |
| TZ                             | $TZ          | pihole  |
| FTLCONF_webserver_api_password | roqueos      | pihole  |
| FTLCONF_dns_listeningMode      | all          | pihole  |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:8800/admin`.

- Default password: `roqueos`

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| pihole  | pihole/pihole:2025.11.1 |

## Fonte oficial

Projeto original: **Pi-hole**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
