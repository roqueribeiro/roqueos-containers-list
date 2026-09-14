# Cloudflared

> A tunneling daemon by Cloudflare that safely exposes your web servers into the internet.

## O que é

Cloudflare Tunnel offers an easy way to expose web servers securely to the internet, without opening up firewall ports and configuring ACLs. Cloudflare Tunnel also ensures requests route through Cloudflare before reaching the web server, so you can be sure attack traffic is stopped with Cloudflare’s WAF and Unmetered DDoS mitigation, and authenticated with Access if you’ve enabled those features for your account.

The software provides a seamless way to securely expose web servers to the internet without configuring firewall ports or access control lists (ACLs). All requests are routed through Cloudflare before reaching your web server, leveraging Cloudflare’s Web Application Firewall (WAF) and unmetered DDoS mitigation to block attack traffic, with optional authentication via Cloudflare Access if enabled. With its intuitive Web interface and efficient tunnel management, this tool is the perfect solution for securely deploying web services.

**Discover How to Connect ZimaOS to Cloudflare Tunnel**
Integrating ZimaOS with Cloudflare Tunnel allows you to securely expose local services to the internet without opening firewall ports, enabling seamless remote access. Below are two practical resources to guide you through the setup process:
1. [**Cloudflare Official Tutorial**](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/): 
  This tutorial provides detailed steps for creating and managing a Cloudflare Tunnel.
2. [**Phiptech Practical Guide**](https://phiptech.com/how-to-setup-cloudflare-tunnel-and-expose-your-local-service-or-application/): 
  This guide offers a concise, step-by-step walkthrough for setting up Cloudflare Tunnel on local devices like ZimaOS, with practical examples to help users easily expose services to the public internet.


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve    | Serviço     |
| ----- | --------- | --------- | ----------------- | ----------- |
| 14333 | 14333     | tcp       | Token Setup WebUI | cloudflared |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                 | No container | Serviço     |
| --------------------------------------- | ------------ | ----------- |
| /DATA/AppData/casaos-cloudflared/config | /config      | cloudflared |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:14333/`.

### Por que este app pede privilégio

- `networkHost`: o túnel precisa alcançar serviços em qualquer porta do host

## Imagens

| Serviço     | Imagem                             |
| ----------- | ---------------------------------- |
| cloudflared | wisdomsky/cloudflared-web:2025.2.1 |

## Fonte oficial

Projeto original: **Cloudflare Inc.**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
