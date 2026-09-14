# WireGuard Easy

> WEB UI para gerenciar o WireGuard VPN.

## O que é

Você encontrou a maneira mais fácil de instalar e gerenciar o WireGuard em qualquer host Linux!

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve     | Serviço |
| ----- | --------- | --------- | ------------------ | ------- |
| 51820 | 51820     | udp       | Wireguard VPN port | wg-easy |
| 51821 | 51821     | tcp       | WEB UI port        | wg-easy |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container   | Serviço |
| ------------------------------ | -------------- | ------- |
| /DATA/AppData/$AppID/wireguard | /etc/wireguard | wg-easy |

## Variáveis de ambiente

| Variável       | Valor padrão  | Serviço |
| -------------- | ------------- | ------- |
| PASSWORD       | roqueos       | wg-easy |
| WG_HOST        | roqueos.local | wg-easy |
| WG_PORT        | 51820         | wg-easy |
| WG_DEFAULT_DNS | 1.1.1.1       | wg-easy |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:51821/`.

- 🔧 Settings
- Default password: `roqueos`
- ⚠️ Warning!
- You need to change at least change the mandatory parameter `WG_HOST` for this app to work properly.
- It's value has to be a domain (or an IP address) that points to this server (accesible from WAN).
- Same applies to the `WG_PORT` parameter. Change it to the port accessible from outside your LAN if it differs from the default 51820.

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem                     |
| ------- | -------------------------- |
| wg-easy | ghcr.io/wg-easy/wg-easy:13 |

## Fonte oficial

Projeto original: **WeejeWel**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
