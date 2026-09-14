# HoloPlay

> Ouça o áudio do YouTube sem abrir o YouTube

## O que é

HoloPlay é um tocador web que usa a API do Invidious para ouvir o áudio de vídeos do YouTube, rodando no seu próprio servidor.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, 386, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve             | Serviço  |
| ---- | --------- | --------- | -------------------------- | -------- |
| 3000 | 3000      | tcp       | Web interface for HoloPlay | holoplay |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

### Por que este app pede privilégio

- `privileged`: acesso a /dev/dri e ao display para renderização

## Imagens

| Serviço  | Imagem                    |
| -------- | ------------------------- |
| holoplay | spout8301/holoplay:1.12.3 |

## Fonte oficial

Projeto original: **Stéphane Richin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
