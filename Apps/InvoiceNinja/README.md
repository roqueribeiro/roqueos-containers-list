# Invoice Ninja

> Emissão de fatura e controle de despesa, de graça

## O que é

Invoice Ninja é um sistema aberto de fatura e despesa. Cria orçamento, emite fatura, acompanha pagamento e registra o que entrou e o que saiu.

Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço           |
| ---- | --------- | --------- | ------------------ | ----------------- |
| 8080 | 80        | tcp       | Container Port: 80 | invoice-ninja-web |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                            | No container                   | Serviço            |
| -------------------------------------------------- | ------------------------------ | ------------------ |
| /DATA/AppData/$AppID/data/public                   | /var/www/app/public            | invoice-ninja      |
| /DATA/AppData/$AppID/data/storage                  | /var/www/app/storage           | invoice-ninja      |
| /DATA/AppData/$AppID/data/php/php.ini              | /usr/local/etc/php/php.ini     | invoice-ninja      |
| /DATA/AppData/$AppID/data/php/php-cli.ini          | /usr/local/etc/php/php-cli.ini | invoice-ninja      |
| /DATA/AppData/$AppID/data/nginx/invoice-ninja.conf | /etc/nginx/conf.d/default.conf | invoice-ninja-web  |
| /DATA/AppData/$AppID/data/public                   | /var/www/app/public            | invoice-ninja-web  |
| /DATA/AppData/$AppID/data/mysql                    | /var/lib/mysql                 | invoice-ninja-db   |
| /DATA/AppData/$AppID/data                          | /tmp/data                      | invoice-ninja-init |

## Variáveis de ambiente

| Variável              | Valor padrão                                        | Serviço          |
| --------------------- | --------------------------------------------------- | ---------------- |
| IN_USER_EMAIL         | admin@roqueribeiro.com                              | invoice-ninja    |
| IN_PASSWORD           | ad178c4b-302f-44e6-937f-8c7808f23795                | invoice-ninja    |
| APP_URL               | http://invoice-ninja-web                            | invoice-ninja    |
| APP_KEY               | base64:4doW1cidLuSqm7Z/BhPu/bn5HGnCKyEcSSlbVPTYYRU= | invoice-ninja    |
| APP_CIPHER            | AES-256-CBC                                         | invoice-ninja    |
| DB_HOST               | invoice-ninja-db                                    | invoice-ninja    |
| DB_PORT               | 3306                                                | invoice-ninja    |
| DB_DATABASE           | ninja                                               | invoice-ninja    |
| DB_USERNAME           | ninja                                               | invoice-ninja    |
| DB_PASSWORD           | ninja                                               | invoice-ninja    |
| REQUIRE_HTTPS         | false                                               | invoice-ninja    |
| QUEUE_CONNECTION      | database                                            | invoice-ninja    |
| IS_DOCKER             | TRUE                                                | invoice-ninja    |
| MARIADB_ROOT_PASSWORD | ad178c4b-302f-44e6-937f-8c7808f23795                | invoice-ninja-db |
| MARIADB_USER          | ninja                                               | invoice-ninja-db |
| MARIADB_PASSWORD      | ninja                                               | invoice-ninja-db |
| MARIADB_DATABASE      | ninja                                               | invoice-ninja-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

- Before you install read this: https://community.roqueribeiro.com/t/added-invoice-ninja-to-bigbearcasaos/1697?u=dragonfire1119#p-3214-instructions-3

## Imagens

| Serviço            | Imagem                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| invoice-ninja      | invoiceninja/invoiceninja:5.13.31@sha256:c0526fc0242f4bd145d0d225bb40e174841f67597a57215723f20f2c00c0698f |
| invoice-ninja-web  | nginx:1.29@sha256:1881968aff6f7cdcc4b888c00a11f4ce241ad7ec957e0cb4a9e19e93a3ff87ea                        |
| invoice-ninja-db   | mariadb:10.4@sha256:22edfe1c78349f8cae88bbb5c2873b7e6c515be767c91c691308ce57445806f3                      |
| invoice-ninja-init | bash:5.3.15@sha256:a19c811ee9e97fa8a080001d82b8e0ded303f0795cffdb1cbd162731bc8ce208                       |

## Fonte oficial

Projeto original: **invoiceninja**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
