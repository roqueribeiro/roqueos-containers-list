# AdGuard Home

> Servidor DNS de bloqueio de anúncios e rastreadores em nível de rede

## O que é

O AdGuard Home é um software de rede para bloquear anúncios e rastreamento. Depois de configurá-lo, ele cobrirá todos os seus dispositivos domésticos e você não precisará de nenhum software cliente para isso. Saiba mais em nosso repositório oficial do Github.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: 386, amd64, arm, arm64, ppc64le.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço      |
| ---- | --------- | --------- | -------------- | ------------ |
| 531  | 53        | tcp       | —              | adguard-home |
| 531  | 53        | udp       | —              | adguard-home |
| 3001 | 3000      | tcp       | —              | adguard-home |
| 853  | 853       | tcp       | —              | adguard-home |
| 784  | 784       | udp       | —              | adguard-home |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                   | No container          | Serviço      |
| ----------------------------------------- | --------------------- | ------------ |
| /DATA/AppData/$AppID/opt/adguardhome/work | /opt/adguardhome/work | adguard-home |
| /DATA/AppData/$AppID/opt/adguardhome/conf | /opt/adguardhome/conf | adguard-home |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3001/`.

## Imagens

| Serviço      | Imagem                        |
| ------------ | ----------------------------- |
| adguard-home | adguard/adguardhome:v0.107.61 |

## Fonte oficial

Projeto original: **AdguardTeam**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
