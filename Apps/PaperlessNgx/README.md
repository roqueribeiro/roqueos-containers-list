# Paperless-ngx

> Gerenciamento de documentos com OCR, busca full-text e tagging automático

## O que é

Paperless-ngx é um sistema de gerenciamento de documentos mantido pela comunidade que transforma documentos físicos em arquivos pesquisáveis. Coloque scans na pasta consume; OCR e tagging acontecem automaticamente. Busca full-text, integração com apps de scanner mobile, regras inteligentes de arquivamento. Contadores, advogados e usuários domésticos mantêm seus papéis no Paperless.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço      |
| ---- | --------- | --------- | -------------------------------------------------- | ------------ |
| 8088 | 8000      | tcp       | Porta da interface web (mapeada para 8088 no host) | paperlessngx |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container               | Serviço      |
| ---------------------------- | -------------------------- | ------------ |
| /DATA/AppData/$AppID/redis   | /data                      | redis        |
| /DATA/AppData/$AppID/data    | /usr/src/paperless/data    | paperlessngx |
| /DATA/AppData/$AppID/media   | /usr/src/paperless/media   | paperlessngx |
| /DATA/AppData/$AppID/export  | /usr/src/paperless/export  | paperlessngx |
| /DATA/AppData/$AppID/consume | /usr/src/paperless/consume | paperlessngx |

## Variáveis de ambiente

| Variável                 | Valor padrão                               | Serviço      |
| ------------------------ | ------------------------------------------ | ------------ |
| PAPERLESS_REDIS          | redis://redis:6379                         | paperlessngx |
| PAPERLESS_TIME_ZONE      | America/Sao_Paulo                          | paperlessngx |
| PAPERLESS_OCR_LANGUAGES  | por eng                                    | paperlessngx |
| PAPERLESS_OCR_LANGUAGE   | por                                        | paperlessngx |
| PAPERLESS_ADMIN_USER     | admin                                      | paperlessngx |
| PAPERLESS_ADMIN_PASSWORD | change-me-on-first-boot                    | paperlessngx |
| PAPERLESS_SECRET_KEY     | replace-with-output-of-openssl-rand-hex-32 | paperlessngx |
| PAPERLESS_URL            | http://localhost:8088                      | paperlessngx |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8088/`.

- SUBSTITUA PAPERLESS_ADMIN_PASSWORD e PAPERLESS_SECRET_KEY antes do primeiro boot.
- Coloque documentos em /consume — Paperless faz OCR + tag + arquivamento automaticamente.
- Idiomas padrão de OCR: Português + Inglês (PAPERLESS_OCR_LANGUAGES). Adicione mais de `apt-cache search 'tesseract-ocr-'`.

## Imagens

| Serviço      | Imagem                                     |
| ------------ | ------------------------------------------ |
| redis        | redis:7-alpine                             |
| paperlessngx | ghcr.io/paperless-ngx/paperless-ngx:2.13.5 |

## Fonte oficial

Projeto original: **paperless-ngx**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
