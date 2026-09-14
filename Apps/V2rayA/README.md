# V2rayA

> A web GUI client of Project V which supports VMess, VLESS, SS, SSR, Trojan, Tuic and Juicity protocols

## O que é

v2rayA is a V2Ray client supporting global transparent proxy, compatible with SS, SSR, Trojan (trojan-go), Tuic, and Juicity protocols. Designed for simplicity, it meets most user needs, ideal for scenarios requiring efficient proxy services.

Core features include global transparent proxy and multi-outbound load balancing with traffic splitting. It provides proxy services for nearly all applications without requiring application-specific proxy support. Support for creating and connecting multiple outbound nodes ensures load balancing and efficient traffic splitting for optimal network performance.

It offers RoutingA, a custom routing language for V2Ray, providing powerful and convenient traffic splitting support. Multiple strategies address DNS pollution, with advanced settings enabling customized configurations. With simplicity and functionality at the core, the platform delivers a modern solution for proxy management.

**Key Features:**
- Web-based GUI for easy configuration and management
- Support for multiple protocols: VMess, VLESS, SS, SSR, Trojan, Tuic, Juicity
- Global transparent proxy for seamless application proxy services
- Multi-outbound load balancing and traffic splitting
- RoutingA custom routing for convenient traffic splitting
- Multiple DNS pollution mitigation strategies with advanced custom settings

**Learn More:**
- [V2rayA Official Website](https://v2raya.org/)
- [V2rayA GitHub](https://github.com/v2rayA/v2rayA)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container     | Serviço |
| -------------------- | ---------------- | ------- |
| /lib/modules         | /lib/modules     | v2raya  |
| /etc/resolv.conf     | /etc/resolv.conf | v2raya  |
| /DATA/AppData/$AppID | /etc/v2raya      | v2raya  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:2017/`.

### Por que este app pede privilégio

- `privileged`: manipula tabelas de roteamento do host para o modo transparente
- `networkHost`: o proxy transparente só intercepta o tráfego que passa pela rede do host

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| v2raya  | mzz2017/v2raya:v2.2.6.7 |

## Fonte oficial

Projeto original: **v2rayA**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
