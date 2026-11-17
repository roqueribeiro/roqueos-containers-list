# Healthchecks

> Vigia dos seus cron: avisa quando um deixa de rodar

## O que é

Healthchecks espera um ping de cada tarefa agendada. Se o ping não chega na hora, você é avisado. É o jeito de descobrir que o backup parou antes de precisar dele.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                           | Serviço      |
| ---- | --------- | --------- | -------------------------------------------------------- | ------------ |
| 8000 | 8000      | tcp       | Web interface for Healthchecks                           | healthchecks |
| 2525 | 2525      | tcp       | SMTP listener: lets a cron job ping by sending an e-mail | healthchecks |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço      |
| --------------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID/config | /config      | healthchecks |

## Variáveis de ambiente

| Variável           | Valor padrão                           | Serviço      |
| ------------------ | -------------------------------------- | ------------ |
| PUID               | 1000                                   | healthchecks |
| PGID               | 1000                                   | healthchecks |
| TZ                 | $TZ                                    | healthchecks |
| SITE_ROOT          | http://localhost:8000                  | healthchecks |
| SITE_NAME          | "RoqueOS HealthChecks"                 | healthchecks |
| SUPERUSER_EMAIL    | user@example.com                       | healthchecks |
| SUPERUSER_PASSWORD | 8a4c087a-2652-4d12-a6cc-feeb60e59dd4   | healthchecks |
| ALLOWED_HOSTS      | *                                      | healthchecks |
| APPRISE_ENABLED    | False                                  | healthchecks |
| DEBUG              | False                                  | healthchecks |
| SECRET_KEY         | "b2ea4094-c950-4890-b85f-301d8a777af2" | healthchecks |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

- Antes de instalar, troque SUPERUSER_PASSWORD (a senha do admin) e SECRET_KEY por valores seus: os padrões deste arquivo são públicos.
- O usuário admin é o e-mail de SUPERUSER_EMAIL. SITE_ROOT é o endereço usado nos links que o Healthchecks envia; ponha o endereço do seu servidor se usar alerta por e-mail.

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
