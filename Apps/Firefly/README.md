# Firefly

> Firefly, the easiest using of WireGuard VPN server, plus version of wg-easy.

## O que é

Firefly is a simple and easy to install WireGuard server software, which can be widely used in scenarios such as remote networking, remote work, and expose a local server behind a NAT or firewall to the internet.  🎯 Features 🟢 Provide a simple and easy-to-use web management UI  🟣 Supports access to all WireGuard clients  🟡 No need for system installation of WireGuard components  🟠 Single file, no additional library dependencies  🔴 Automatically apply for free SSL certificate

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container  | Serviço |
| -------------------------- | ------------- | ------- |
| /lib/modules               | /lib/modules  | firefly |
| /DATA/AppData/firefly/conf | /firefly/conf | firefly |

## Variáveis de ambiente

| Variável         | Valor padrão | Serviço |
| ---------------- | ------------ | ------- |
| FIREFLY_PASSWORD | firefly      | firefly |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:50121/`.

- Default password for admin background `firefly`, you can modify it in environment variables.

### Por que este app pede privilégio

- `networkHost`: compose herdado do upstream; a interface é publicada direto na rede do host
- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem               |
| ------- | -------------------- |
| firefly | uusec/firefly:latest |

## Fonte oficial

Projeto original: **Safe3**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
