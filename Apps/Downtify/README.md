# Downtify

> Baixe músicas do Spotify com a capa do álbum e metadados

## O que é

Com o Downtify você pode baixar músicas do Spotify contendo capas de álbuns, nomes de faixas, títulos de álbuns e outros metadados sobre as músicas. Basta copiar o link do Spotify, seja uma música única, um álbum, etc. Assim que seus downloads forem concluídos, você será notificado!


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve             | Serviço  |
| ---- | --------- | --------- | -------------------------- | -------- |
| 8582 | 8000      | tcp       | Web interface for Downtify | downtify |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                  | No container | Serviço  |
| ------------------------ | ------------ | -------- |
| /DATA/Downloads/downtify | /downloads   | downtify |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| PGID     | $PGID        | downtify |
| PUID     | $PUID        | downtify |
| TZ       | $TZ          | downtify |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8582/`.

## Imagens

| Serviço  | Imagem                                   |
| -------- | ---------------------------------------- |
| downtify | ghcr.io/henriquesebastiao/downtify:1.1.1 |

## Fonte oficial

Projeto original: **Henrique Sebastião**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
