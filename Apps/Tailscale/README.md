# Tailscale

> Connect your devices and users together in your own secure virtual private network.

## O que é

A modern self-hosted networking app built on WireGuard®, providing secure, encrypted connections between devices regardless of their location. Its zero-configuration networking eliminates the need for complex firewall rules, port forwarding, or network administration, making it ideal for businesses and individuals creating efficient, secure network environments.

The app's core features include seamless device connectivity and robust security. It uses WireGuard® for end-to-end encryption, ensuring traffic cannot be intercepted, with private keys stored solely on user devices. Automatic NAT traversal enables connections across computers, phones, servers, and IoT devices over different network types, forming a unified private network. It also offers identity-based access control, integrating with Google, Microsoft, GitHub, or custom SSO solutions for simple authentication, replacing traditional IP-based restrictions to enhance security.

It excels in delivering secure remote access to services and infrastructure. Users can effortlessly access home servers, connect to office networks while traveling, or establish secure links between cloud services. Subnet routing allows access to entire networks, exit nodes enable secure internet browsing, and MagicDNS simplifies device discovery. These features ensure efficient, secure access to resources from any location.

It supports nearly all platforms, including Linux, Windows, macOS, iOS, Android, and various router firmwares, with flexible deployment in cloud or on-premises environments. A user-friendly Web interface provides real-time monitoring of network topology, device status, and access controls, with community documentation aiding configuration optimization. Whether setting up secure access for small teams or managing enterprise-scale networks, the app’s intuitive operation and high flexibility deliver a modern networking solution.

**Key Features:**
- End-to-end encryption via WireGuard®, ensuring uninterceptible traffic
- Zero-configuration networking, eliminating complex firewall or port forwarding setup
- Automatic NAT traversal for seamless device connectivity across network types
- Identity-based access control with SSO integration (Google, Microsoft, GitHub)
- Subnet routing for secure network-wide access
- Exit nodes for safe internet browsing
- MagicDNS for simplified device discovery

**Learn More:**
- [Tailscale Official Website](https://tailscale.com)
- [Tailscale GitHub Repository](https://github.com/tailscale/tailscale)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64, 386.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container       | Serviço   |
| -------------------- | ------------------ | --------- |
| /DATA/AppData/$AppID | /var/lib/tailscale | tailscale |
| /dev/net/tun         | /dev/net/tun       | tailscale |

## Variáveis de ambiente

| Variável     | Valor padrão       | Serviço   |
| ------------ | ------------------ | --------- |
| TS_STATE_DIR | /var/lib/tailscale | tailscale |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5252/`.

### Por que este app pede privilégio

- `capAdd`: NET_ADMIN e NET_RAW para criar e configurar a interface de rede da VPN
- `networkHost`: cria a interface de rede da VPN no host, e ela precisa existir no host

## Imagens

| Serviço   | Imagem                      |
| --------- | --------------------------- |
| tailscale | tailscale/tailscale:v1.90.8 |

## Fonte oficial

Projeto original: **Tailscale Inc.**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
