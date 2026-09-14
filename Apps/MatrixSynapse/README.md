# Matrix Synapse

> Homeserver de chat federado e auto-hospedado (protocolo Matrix)

## O que é

Synapse é a implementação de referência do protocolo Matrix — um protocolo de comunicação em tempo real federado, descentralizado e com criptografia end-to-end. Rode seu próprio homeserver Matrix para conversar com usuários de qualquer outro servidor Matrix. Suporta voz/vídeo, threads, spaces, compartilhamento de arquivos, bridges para IRC/Slack/Discord/Telegram.

Categoria na App Store do RoqueOS: **Communication**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                             | Serviço |
| ---- | --------- | --------- | ------------------------------------------ | ------- |
| 8008 | 8008      | tcp       | Porta da API Client-Server + interface web | synapse |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container             | Serviço  |
| ----------------------------- | ------------------------ | -------- |
| /DATA/AppData/$AppID/postgres | /var/lib/postgresql/data | postgres |
| /DATA/AppData/$AppID/data     | /data                    | synapse  |

## Variáveis de ambiente

| Variável             | Valor padrão                                 | Serviço  |
| -------------------- | -------------------------------------------- | -------- |
| POSTGRES_DB          | synapse                                      | postgres |
| POSTGRES_USER        | synapse                                      | postgres |
| POSTGRES_PASSWORD    | change-me-to-a-long-random-string            | postgres |
| POSTGRES_INITDB_ARGS | --encoding=UTF-8 --lc-collate=C --lc-ctype=C | postgres |
| SYNAPSE_SERVER_NAME  | matrix.example.com                           | synapse  |
| SYNAPSE_REPORT_STATS | no                                           | synapse  |
| SYNAPSE_HTTP_PORT    | 8008                                         | synapse  |
| POSTGRES_HOST        | postgres                                     | synapse  |
| POSTGRES_DB          | synapse                                      | synapse  |
| POSTGRES_USER        | synapse                                      | synapse  |
| POSTGRES_PASSWORD    | change-me-to-a-long-random-string            | synapse  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8008/`.

- ANTES DO PRIMEIRO BOOT:
- 1. Configure SYNAPSE_SERVER_NAME com seu domínio real (ex: matrix.seudominio.com). Não pode ser alterado depois.
- 2. SUBSTITUA POSTGRES_PASSWORD nos DOIS lugares (postgres + synapse env). Devem ser iguais.
- 3. O primeiro boot gera homeserver.yaml. Edite-o para federação, padrões de criptografia, políticas de registro antes de expor.
- 4. Combine com o cliente web Element (container separado, ver docs matrix-org) para a UI dos usuários.

## Imagens

| Serviço  | Imagem                        |
| -------- | ----------------------------- |
| postgres | postgres:15-alpine            |
| synapse  | matrixdotorg/synapse:v1.121.1 |

## Fonte oficial

Projeto original: **matrix-org**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
