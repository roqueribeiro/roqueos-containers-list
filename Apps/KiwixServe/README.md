# Kiwix Server

> A Wikipédia inteira, offline, no seu servidor

## O que é

Kiwix Server publica arquivos .zim na sua rede: Wikipédia, Stack Overflow, Project Gutenberg e outros acervos inteiros, para ler sem internet.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço     |
| ---- | --------- | --------- | -------------------- | ----------- |
| 8080 | 8080      | tcp       | Container Port: 8080 | kiwix-serve |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                  | No container | Serviço     |
| ------------------------ | ------------ | ----------- |
| /DATA/AppData/$AppID/zim | /data        | kiwix-serve |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

- Read this before installing: https://community.roqueribeiro.com/t/added-kiwix-serve-to-bigbearcasaos/1554#documentation-4

## Imagens

| Serviço     | Imagem                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| kiwix-serve | ghcr.io/kiwix/kiwix-serve:3.7.0-2@sha256:9a19c082d0cf4a2bebc190e62d9f76980f18ea35ca3c9347197c5ed0ebaa08ce |

## Fonte oficial

Projeto original: **kiwix**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
