# Readeck

> Guarde o que quer ler depois, sem os anúncios

## O que é

Readeck salva o conteúdo legível de uma página e guarda para depois, limpo de anúncio e de banner. É gerenciador de favoritos e leitor de artigo no mesmo lugar.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve            | Serviço |
| ---- | --------- | --------- | ------------------------- | ------- |
| 8000 | 8000      | tcp       | Web interface for Readeck | readeck |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /readeck     | readeck |

## Variáveis de ambiente

| Variável            | Valor padrão | Serviço |
| ------------------- | ------------ | ------- |
| READECK_LOG_LEVEL   | info         | readeck |
| READECK_SERVER_HOST | 0.0.0.0      | readeck |
| READECK_SERVER_PORT | 8000         | readeck |
| READECK_LOG_FORMAT  | text         | readeck |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

- Read this before installing: https://community.roqueribeiro.com/t/added-readeck-to-bigbearcasaos/5079#p-7723-documentation-3

## Imagens

| Serviço | Imagem                                                                                                      |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| readeck | codeberg.org/readeck/readeck:0.22.3@sha256:ed1c513f8e1d59b1d38fda324ac279eeb65afd0327907e498061ec9fd2f31c15 |

## Fonte oficial

Projeto original: **readeck**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
