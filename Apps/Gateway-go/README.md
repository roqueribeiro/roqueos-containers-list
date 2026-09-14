# gateway-go

> A third-party client for RoqueOS, remote access management interface, remote access to installed applications.

## O que é

A fast reverse proxy to help you expose a local server behind a NAT or firewall to your client, remote access all your RoqueOS apps.

Use OpenIoTHub to scan the following QR code add a gateway,then add host,add RoqueOS host's web page port,finally, enjoy remote control


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço    |
| ----- | --------- | --------- | --------------- | ---------- |
| 34323 | 34323     | tcp       | WebUI HTTP Port | gateway-go |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço    |
| --------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/config | /root        | gateway-go |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:34323/`.

### Por que este app pede privilégio

- `networkHost`: atua como gateway de rede do host

## Imagens

| Serviço    | Imagem                        |
| ---------- | ----------------------------- |
| gateway-go | openiothub/gateway-go:v2.0.11 |

## Fonte oficial

Projeto original: **iotserv**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
