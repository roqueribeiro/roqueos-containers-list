# Upsnap

> Liga as máquinas da casa pela rede, do navegador

## O que é

UpSnap é um painel de wake-on-LAN: cadastre as máquinas da rede e ligue cada uma por um botão, de qualquer aparelho. Feito com SvelteKit, Go e PocketBase.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço |
| ---------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/pb/data | /app/pb_data | upsnap  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8090/`.

- Read this before installing: https://community.roqueribeiro.com/t/added-upsnap-to-bigbearcasaos/2279?u=dragonfire1119

### Por que este app pede privilégio

- `networkHost`: envia pacote wake-on-LAN em broadcast, que nao atravessa a bridge

## Imagens

| Serviço | Imagem                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------- |
| upsnap  | ghcr.io/seriousm4x/upsnap:5.3.4@sha256:f7edc52fe03f5d424182b06faa72962c625f5e78ff3c9e8457e9617f20d0e611 |

## Fonte oficial

Projeto original: **seriousm4x**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
