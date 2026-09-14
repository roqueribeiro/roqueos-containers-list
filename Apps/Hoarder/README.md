# Hoarder

> App auto-hospedado de salvar tudo, com tagging por IA

## O que é

Hoarder é um app auto-hospedável de salvar tudo (links, notas, imagens, PDFs) com um toque de IA para tagging e sumarização automáticos. Salva links, notas, imagens e PDFs; roda OCR, pede a um LLM para criar tags e descrever conteúdo, deixa tudo pesquisável. Combina Chrome (crawl) e Meilisearch (índice) internamente.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 3000 | 3000      | tcp       | Porta da interface web | hoarder |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container | Serviço     |
| -------------------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID/meilisearch | /meili_data  | meilisearch |
| /DATA/AppData/$AppID/data        | /data        | hoarder     |

## Variáveis de ambiente

| Variável             | Valor padrão                               | Serviço     |
| -------------------- | ------------------------------------------ | ----------- |
| MEILI_NO_ANALYTICS   | true                                       | meilisearch |
| MEILI_MASTER_KEY     | change-me-to-a-long-random-string          | meilisearch |
| MEILI_ADDR           | http://meilisearch:7700                    | hoarder     |
| MEILI_MASTER_KEY     | change-me-to-a-long-random-string          | hoarder     |
| BROWSER_WEB_URL      | http://chrome:9222                         | hoarder     |
| DATA_DIR             | /data                                      | hoarder     |
| NEXTAUTH_SECRET      | replace-with-output-of-openssl-rand-hex-32 | hoarder     |
| NEXTAUTH_URL         | http://localhost:3000                      | hoarder     |
| OPENAI_API_KEY       | —                                          | hoarder     |
| INFERENCE_TEXT_MODEL | —                                          | hoarder     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

- ANTES DO PRIMEIRO BOOT:
- 1. Substitua MEILI_MASTER_KEY nos DOIS serviços por uma string aleatória longa (devem ser iguais).
- 2. Substitua NEXTAUTH_SECRET pela saída de `openssl rand -hex 32`.
- 3. Configure NEXTAUTH_URL com a URL pública onde vai acessar o Hoarder.
- 4. (Opcional) Configure OPENAI_API_KEY + INFERENCE_TEXT_MODEL para habilitar tagging por IA. Hoarder também suporta Ollama (já no catálogo) — ver docs.

## Imagens

| Serviço     | Imagem                              |
| ----------- | ----------------------------------- |
| meilisearch | getmeili/meilisearch:v1.11          |
| chrome      | gcr.io/zenika-hub/alpine-chrome:124 |
| hoarder     | ghcr.io/hoarder-app/hoarder:0.23.2  |

## Fonte oficial

Projeto original: **hoarder-app**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
