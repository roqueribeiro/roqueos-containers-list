# Speedtest Tracker

> Mede sua internet sozinho, e guarda o histórico

## O que é

Speedtest Tracker roda o teste da Ookla no intervalo que você definir e guarda o resultado. Serve para provar à operadora que a velocidade contratada não é a entregue.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve      | Serviço           |
| ---- | --------- | --------- | ------------------- | ----------------- |
| 8080 | 80        | tcp       | Container Port: 80  | speedtest-tracker |
| 8443 | 443       | tcp       | Container Port: 443 | speedtest-tracker |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container   | Serviço              |
| --------------------------- | -------------- | -------------------- |
| /etc/localtime              | /etc/localtime | speedtest-tracker    |
| /DATA/AppData/$AppID/config | /config        | speedtest-tracker    |
| /DATA/AppData/$AppID/web    | /etc/ssl/web   | speedtest-tracker    |
| /DATA/AppData/$AppID/mysql  | /var/lib/mysql | speedtest-tracker-db |

## Variáveis de ambiente

| Variável                     | Valor padrão         | Serviço              |
| ---------------------------- | -------------------- | -------------------- |
| PUID                         | 1000                 | speedtest-tracker    |
| PGID                         | 1000                 | speedtest-tracker    |
| DB_CONNECTION                | mysql                | speedtest-tracker    |
| DB_HOST                      | speedtest-tracker-db | speedtest-tracker    |
| DB_PORT                      | 3306                 | speedtest-tracker    |
| DB_DATABASE                  | speedtest_tracker    | speedtest-tracker    |
| DB_USERNAME                  | casaos               | speedtest-tracker    |
| DB_PASSWORD                  | casaos               | speedtest-tracker    |
| TZ                           | America/Chicago      | speedtest-tracker    |
| MARIADB_DATABASE             | speedtest_tracker    | speedtest-tracker-db |
| MARIADB_USER                 | casaos               | speedtest-tracker-db |
| MARIADB_PASSWORD             | roqueos              | speedtest-tracker-db |
| MARIADB_RANDOM_ROOT_PASSWORD | true                 | speedtest-tracker-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

- Default Credentials - Username: admin@example.com and Password: password

## Imagens

| Serviço              | Imagem                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| speedtest-tracker    | linuxserver/speedtest-tracker:1.14.7@sha256:31aa3b5db19ec05f392ed53e26ebb06b73e88e1c915a2799d30d436ef4376041 |
| speedtest-tracker-db | mariadb:10@sha256:be981e4113326ada8d6004174dd09eeaefc03094037f811182a52d4f2e737350                           |

## Fonte oficial

Projeto original: **alexjustesen**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
