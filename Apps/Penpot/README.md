# Penpot

> Design e protótipo aberto, que o time de código também abre

## O que é

Penpot é a ferramenta aberta de design e protótipo em que quem desenha e quem programa trabalham no mesmo arquivo. Usa padrões da web, então o navegador abre sem plugin.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço          |
| ---- | --------- | --------- | -------------------- | ---------------- |
| 9001 | 8080      | tcp       | Container Port: 8080 | penpot-frontend  |
| 1080 | 1080      | tcp       | Container Port: 1080 | penpot-mailcatch |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container             | Serviço         |
| --------------------------- | ------------------------ | --------------- |
| /DATA/AppData/$AppID/assets | /opt/data/assets         | penpot-frontend |
| /DATA/AppData/$AppID/assets | /opt/data/assets         | penpot-backend  |
| /DATA/AppData/$AppID/pgdata | /var/lib/postgresql/data | penpot-postgres |

## Variáveis de ambiente

| Variável                           | Valor padrão                                                 | Serviço         |
| ---------------------------------- | ------------------------------------------------------------ | --------------- |
| PENPOT_FLAGS                       | enable-registration enable-login-with-password disable-email | penpot-backend  |
| PENPOT_SECRET_KEY                  | penpot-secret-key                                            | penpot-backend  |
| PENPOT_PUBLIC_URI                  | http://penpot-frontend:8080                                  | penpot-backend  |
| PENPOT_DATABASE_URI                | postgresql://penpot-postgres/penpot                          | penpot-backend  |
| PENPOT_DATABASE_USERNAME           | bigbear                                                      | penpot-backend  |
| PENPOT_DATABASE_PASSWORD           | casaos                                                       | penpot-backend  |
| PENPOT_REDIS_URI                   | redis://penpot-redis/0                                       | penpot-backend  |
| PENPOT_ASSETS_STORAGE_BACKEND      | assets-fs                                                    | penpot-backend  |
| PENPOT_STORAGE_ASSETS_FS_DIRECTORY | /opt/data/assets                                             | penpot-backend  |
| PENPOT_TELEMETRY_ENABLED           | false                                                        | penpot-backend  |
| PENPOT_PUBLIC_URI                  | http://penpot-frontend:8080                                  | penpot-exporter |
| PENPOT_REDIS_URI                   | redis://penpot-redis/0                                       | penpot-exporter |
| POSTGRES_INITDB_ARGS               | --data-checksums                                             | penpot-postgres |
| POSTGRES_DB                        | penpot                                                       | penpot-postgres |
| POSTGRES_USER                      | bigbear                                                      | penpot-postgres |
| POSTGRES_PASSWORD                  | casaos                                                       | penpot-postgres |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9001/`.

## Imagens

| Serviço          | Imagem                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| penpot-frontend  | penpotapp/frontend:2.17.0@sha256:861989dfff50f12b9de1358c6b0f3cc1e601d7a678db2826f3643d0f93438500 |
| penpot-backend   | penpotapp/backend:2.17.0@sha256:471cdebf185be899ef7d7593e9cd7994b908ebd7ffb78ca547e3d843bb83536f  |
| penpot-exporter  | penpotapp/exporter:2.17.0@sha256:7e8beb6ef2bdb9d778e9bbcbf7feebf8c99a137b2d9eb3969450c0a1a49e41c5 |
| penpot-postgres  | postgres:14@sha256:9e279cc7fc6e908da071befe389c576bd6752dbd295a9c078f96a75bab03e54c               |
| penpot-redis     | redis:7.4.6@sha256:d7432711a2a5c99c2e9dd0e006061cd274d7cb7a9e77f07ffe2ea99e21244677               |
| penpot-mailcatch | sj26/mailcatcher:latest@sha256:5d153a4daadf0c266f29c3856085741f06ca1e3768671f4267622d3e3ffe5564   |

## Fonte oficial

Projeto original: **penpotapp**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
