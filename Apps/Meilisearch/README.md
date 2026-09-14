# Meilisearch

> API de busca extremamente rápida e tolerante a erros de digitação

## O que é

Meilisearch é um mecanismo de busca extremamente rápido e altamente relevante que você roda na sua própria infraestrutura. Tolerante a erros de digitação, retorna resultados em menos de 50ms, API RESTful, substituto natural do Elasticsearch para datasets pequenos e médios.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve    | Serviço     |
| ---- | --------- | --------- | ----------------- | ----------- |
| 7700 | 7700      | tcp       | Porta da API HTTP | meilisearch |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço     |
| ------------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID/data | /meili_data  | meilisearch |

## Variáveis de ambiente

| Variável           | Valor padrão                                     | Serviço     |
| ------------------ | ------------------------------------------------ | ----------- |
| MEILI_ENV          | production                                       | meilisearch |
| MEILI_MASTER_KEY   | change-me-with-a-strong-key-of-at-least-16-bytes | meilisearch |
| MEILI_NO_ANALYTICS | true                                             | meilisearch |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7700/`.

- SUBSTITUA MEILI_MASTER_KEY antes do deploy. O valor padrão é inseguro.
- Após o boot, faça GET /health na porta 7700 para confirmar. O mini-dashboard web está em GET /.

## Imagens

| Serviço     | Imagem                     |
| ----------- | -------------------------- |
| meilisearch | getmeili/meilisearch:v1.11 |

## Fonte oficial

Projeto original: **meilisearch**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
