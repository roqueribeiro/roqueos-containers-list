# WatchYourLAN

> Scanner leve de rede local, com histórico de quem apareceu

## O que é

WatchYourLAN varre a rede local, lista os dispositivos e avisa quando aparece um host novo. Também acompanha quem está online e quem sumiu.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container       | Serviço      |
| ------------------------- | ------------------ | ------------ |
| /DATA/AppData/$AppID/data | /data/WatchYourLAN | watchyourlan |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço      |
| -------- | ------------ | ------------ |
| IFACES   | "eth0"       | watchyourlan |
| TZ       | "UTC"        | watchyourlan |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8840/`.

### Por que este app pede privilégio

- `networkHost`: varre a rede local em busca de dispositivos, e precisa ve-la

## Imagens

| Serviço      | Imagem                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------- |
| watchyourlan | aceberg/watchyourlan:2.1.4@sha256:f77532ca7c3c9a4398cb094df7674013a3d7fcf4699386f1e456c24df6fef00e |

## Fonte oficial

Projeto original: **ajnart**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
