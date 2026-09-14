# Authentik

> Provedor de identidade auto-hospedado OAuth2/OIDC, SAML e LDAP

## O que é

Authentik é um provedor de identidade open-source focado em flexibilidade e versatilidade. Implementa OAuth2/OIDC, SAML, LDAP outpost, RADIUS, provisioning SCIM e Proxy Outpost para apps legados. Substituto direto de Okta, Auth0, Keycloak — totalmente auto-hospedado com UI moderna em Vue.

Categoria na App Store do RoqueOS: **Security**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço |
| ---- | --------- | --------- | ---------------------------- | ------- |
| 9000 | 9000      | tcp       | Porta da interface web HTTP  | server  |
| 9443 | 9443      | tcp       | Porta da interface web HTTPS | server  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container             | Serviço    |
| ------------------------------ | ------------------------ | ---------- |
| /DATA/AppData/$AppID/postgres  | /var/lib/postgresql/data | postgresql |
| /DATA/AppData/$AppID/redis     | /data                    | redis      |
| /DATA/AppData/$AppID/media     | /media                   | server     |
| /DATA/AppData/$AppID/templates | /templates               | server     |
| /DATA/AppData/$AppID/media     | /media                   | worker     |
| /DATA/AppData/$AppID/templates | /templates               | worker     |
| /DATA/AppData/$AppID/certs     | /certs                   | worker     |

## Variáveis de ambiente

| Variável                       | Valor padrão                               | Serviço    |
| ------------------------------ | ------------------------------------------ | ---------- |
| POSTGRES_DB                    | authentik                                  | postgresql |
| POSTGRES_USER                  | authentik                                  | postgresql |
| POSTGRES_PASSWORD              | change-me-to-a-long-random-string          | postgresql |
| AUTHENTIK_REDIS__HOST          | redis                                      | server     |
| AUTHENTIK_POSTGRESQL__HOST     | postgresql                                 | server     |
| AUTHENTIK_POSTGRESQL__USER     | authentik                                  | server     |
| AUTHENTIK_POSTGRESQL__NAME     | authentik                                  | server     |
| AUTHENTIK_POSTGRESQL__PASSWORD | change-me-to-a-long-random-string          | server     |
| AUTHENTIK_SECRET_KEY           | replace-with-output-of-openssl-rand-hex-32 | server     |
| AUTHENTIK_REDIS__HOST          | redis                                      | worker     |
| AUTHENTIK_POSTGRESQL__HOST     | postgresql                                 | worker     |
| AUTHENTIK_POSTGRESQL__USER     | authentik                                  | worker     |
| AUTHENTIK_POSTGRESQL__NAME     | authentik                                  | worker     |
| AUTHENTIK_POSTGRESQL__PASSWORD | change-me-to-a-long-random-string          | worker     |
| AUTHENTIK_SECRET_KEY           | replace-with-output-of-openssl-rand-hex-32 | worker     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9000/`.

- ANTES DO PRIMEIRO BOOT:
- 1. Substitua POSTGRES_PASSWORD e AUTHENTIK_POSTGRESQL__PASSWORD (devem ser iguais) por uma string aleatória longa.
- 2. Substitua AUTHENTIK_SECRET_KEY (em 2 lugares — server + worker) pela saída de `openssl rand -hex 32`.
- Wizard inicial em http://SEU_IP:9000/if/flow/initial-setup/ cria o usuário akadmin.

## Imagens

| Serviço    | Imagem                               |
| ---------- | ------------------------------------ |
| postgresql | docker.io/library/postgres:16-alpine |
| redis      | docker.io/library/redis:7-alpine     |
| server     | ghcr.io/goauthentik/server:2024.12.0 |
| worker     | ghcr.io/goauthentik/server:2024.12.0 |

## Fonte oficial

Projeto original: **goauthentik**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
