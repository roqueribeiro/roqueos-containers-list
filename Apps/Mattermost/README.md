# Mattermost

> Alternativa auto-hospedada ao Slack feita para times de devs

## O que é

Mattermost é uma alternativa open-source ao Slack feita para times de desenvolvedores. Canais, threads, chamadas, compartilhamento de tela, integração GitHub/GitLab, blocos de código com syntax highlighting, apps nativos mobile + desktop, ecossistema de plugins. Self-hosted Team Edition é gratuita para sempre; Enterprise Edition adiciona SSO/compliance em planos pagos.

Categoria na App Store do RoqueOS: **Communication**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço    |
| ---- | --------- | --------- | ---------------------------- | ---------- |
| 8065 | 8065      | tcp       | Porta da interface web / API | mattermost |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                             | No container               | Serviço    |
| ----------------------------------- | -------------------------- | ---------- |
| /DATA/AppData/$AppID/postgres       | /var/lib/postgresql/data   | postgres   |
| /DATA/AppData/$AppID/data           | /mattermost/data           | mattermost |
| /DATA/AppData/$AppID/logs           | /mattermost/logs           | mattermost |
| /DATA/AppData/$AppID/config         | /mattermost/config         | mattermost |
| /DATA/AppData/$AppID/plugins        | /mattermost/plugins        | mattermost |
| /DATA/AppData/$AppID/client-plugins | /mattermost/client/plugins | mattermost |

## Variáveis de ambiente

| Variável                   | Valor padrão                                                 | Serviço    |
| -------------------------- | ------------------------------------------------------------ | ---------- |
| POSTGRES_USER              | mmuser                                                       | postgres   |
| POSTGRES_PASSWORD          | change-me-to-a-long-random-string                            | postgres   |
| POSTGRES_DB                | mattermost                                                   | postgres   |
| MM_SQLSETTINGS_DRIVERNAME  | postgres                                                     | mattermost |
| MM_SQLSETTINGS_DATASOURCE  | postgres://mmuser:change-me-to-a-long-random-string@postgres | mattermost |
| MM_SERVICESETTINGS_SITEURL | http://localhost:8065                                        | mattermost |
| TZ                         | America/Sao_Paulo                                            | mattermost |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8065/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA POSTGRES_PASSWORD E a senha em MM_SQLSETTINGS_DATASOURCE (devem ser iguais) por uma string aleatória longa.
- 2. Configure MM_SERVICESETTINGS_SITEURL com sua URL pública (deve bater exatamente).
- 3. O primeiro usuário criado via signup em http://SEU_IP:8065 é o System Admin.
- 4. Para apps desktop/mobile, aponte-os para seu SiteURL.

## Imagens

| Serviço    | Imagem                                  |
| ---------- | --------------------------------------- |
| postgres   | postgres:15-alpine                      |
| mattermost | mattermost/mattermost-team-edition:10.2 |

## Fonte oficial

Projeto original: **mattermost**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
