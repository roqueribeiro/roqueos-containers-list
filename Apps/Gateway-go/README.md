# gateway-go

> Acesso remoto aos aplicativos do seu RoqueOS

## O que é

Proxy reverso rápido que expõe um servidor local atrás de NAT ou firewall, para alcançar de fora todos os aplicativos do seu RoqueOS.

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
