# Music Assistant

> Junta toda a sua música e toca em qualquer caixa da casa

## O que é

Music Assistant reúne a música que está no seu disco e a dos serviços que você assina, e toca em alto-falantes Chromecast, Sonos, AirPlay e afins. Integra com o Home Assistant.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço                |
| ------------------------- | ------------ | ---------------------- |
| /DATA/AppData/$AppID/data | /data        | music-assistant-server |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8095/`.

### Por que este app pede privilégio

- `networkHost`: descoberta de alto-falantes por mDNS e Chromecast na rede local
- `capAdd`: capacidade exigida pelo upstream para a descoberta na rede local

## Imagens

| Serviço                | Imagem                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| music-assistant-server | ghcr.io/music-assistant/server:2.8.7@sha256:eef3ee7810d0e4702afa4a0ff55b10bbbfcaa16c98a277fe1b7f4cb6d5d426b4 |

## Fonte oficial

Projeto original: **music-assistant**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
