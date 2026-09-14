# Spoolman

> Controle dos carretéis de filamento da impressora 3D

## O que é

Spoolman acompanha o seu estoque de filamento: quanto cada carretel tinha, quanto já foi usado e quanto sobrou. Conversa com o OctoPrint e com o Klipper.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve             | Serviço |
| ---- | --------- | --------- | -------------------------- | ------- |
| 7912 | 8000      | tcp       | Web interface for Spoolman | app     |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container                    | Serviço |
| ------------------------- | ------------------------------- | ------- |
| /DATA/AppData/$AppID/data | /home/app/.local/share/spoolman | app     |

## Variáveis de ambiente

| Variável                  | Valor padrão | Serviço |
| ------------------------- | ------------ | ------- |
| TZ                        | $TZ          | app     |
| SPOOLMAN_DB_TYPE          | sqlite       | app     |
| SPOOLMAN_LOGGING_LEVEL    | INFO         | app     |
| SPOOLMAN_AUTOMATIC_BACKUP | TRUE         | app     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7912/`.

## Imagens

| Serviço | Imagem                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------ |
| app     | ghcr.io/donkie/spoolman:0.23.1@sha256:c798bcc19194949962044459e4b43c09d667d084ae9c2c2e0187a42c36d43d9e |

## Fonte oficial

Projeto original: **Donkie**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
