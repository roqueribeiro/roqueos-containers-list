# LibreDB Studio

> IDE de SQL de código aberto, no seu servidor

## O que é

LibreDB Studio é uma IDE de SQL de código aberto (MIT) para rodar no seu servidor. Pela interface web, conecta em 16 bancos diferentes, entre eles PostgreSQL, MySQL, MongoDB e Redis.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço        |
| ---- | --------- | --------- | --------------- | -------------- |
| 3016 | 3000      | tcp       | WebUI HTTP Port | libredb-studio |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço        |
| ------------------------- | ------------ | -------------- |
| /DATA/AppData/$AppID/data | /app/data    | libredb-studio |

## Variáveis de ambiente

| Variável            | Valor padrão                                                 | Serviço        |
| ------------------- | ------------------------------------------------------------ | -------------- |
| ADMIN_EMAIL         | admin@libredb.org                                            | libredb-studio |
| ADMIN_PASSWORD      | changeme123                                                  | libredb-studio |
| JWT_SECRET          | libredb-studio-change-this-to-a-long-random-secret-value-min | libredb-studio |
| STORAGE_PROVIDER    | sqlite                                                       | libredb-studio |
| STORAGE_SQLITE_PATH | /app/data/libredb-storage.db                                 | libredb-studio |
| AUTH_COOKIE_SECURE  | false                                                        | libredb-studio |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3016/`.

## Imagens

| Serviço        | Imagem                        |
| -------------- | ----------------------------- |
| libredb-studio | libredb/libredb-studio:0.15.0 |

## Fonte oficial

Projeto original: **libredb**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
