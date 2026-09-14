# Healthchecks

> Vigia dos seus cron: avisa quando um deixa de rodar

## O que é

Healthchecks espera um ping de cada tarefa agendada. Se o ping não chega na hora, você é avisado. É o jeito de descobrir que o backup parou antes de precisar dele.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço      |
| ---- | --------- | --------- | -------------------- | ------------ |
| 8000 | 8000      | tcp       | Container Port: 8000 | healthchecks |
| 2525 | 2525      | tcp       | Container Port: 2525 | healthchecks |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço      |
| --------------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID/config | /config      | healthchecks |

## Variáveis de ambiente

| Variável                       | Valor padrão                           | Serviço      |
| ------------------------------ | -------------------------------------- | ------------ |
| PUID                           | 1000                                   | healthchecks |
| PGID                           | 1000                                   | healthchecks |
| TZ                             | Etc/UTC                                | healthchecks |
| SITE_ROOT                      | http://[YOUR_CASAOS_IP]                | healthchecks |
| SITE_NAME                      | "RoqueOS HealthChecks"                 | healthchecks |
| SUPERUSER_EMAIL                | user@example.com                       | healthchecks |
| SUPERUSER_PASSWORD             | 8a4c087a-2652-4d12-a6cc-feeb60e59dd4   | healthchecks |
| ALLOWED_HOSTS                  | —                                      | healthchecks |
| APPRISE_ENABLED                | False                                  | healthchecks |
| CSRF_TRUSTED_ORIGINS           | —                                      | healthchecks |
| DEBUG                          | True                                   | healthchecks |
| DEFAULT_FROM_EMAIL             | —                                      | healthchecks |
| EMAIL_HOST                     | —                                      | healthchecks |
| EMAIL_PORT                     | —                                      | healthchecks |
| EMAIL_HOST_USER                | —                                      | healthchecks |
| EMAIL_HOST_PASSWORD            | —                                      | healthchecks |
| EMAIL_USE_TLS                  | —                                      | healthchecks |
| INTEGRATIONS_ALLOW_PRIVATE_IPS | —                                      | healthchecks |
| PING_EMAIL_DOMAIN              | —                                      | healthchecks |
| RP_ID                          | —                                      | healthchecks |
| SECRET_KEY                     | "b2ea4094-c950-4890-b85f-301d8a777af2" | healthchecks |
| SITE_LOGO_URL                  | —                                      | healthchecks |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

## Imagens

| Serviço      | Imagem                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| healthchecks | linuxserver/healthchecks:4.3.20260803@sha256:f8a148973d8b90587549674db70836f154eda474c0b87382b86064f2442c2f43 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
