# MariaDB

> O MariaDB Server é um dos servidores de banco de dados mais populares do mundo. É feito pelos desenvolvedores originais do MySQL e garantido para permanecer como código aberto.

## O que é

O MariaDB Server é um dos bancos de dados relacionais de código aberto mais populares. É feito pelos desenvolvedores originais do MySQL e garantido para permanecer como código aberto. Ele faz parte da maioria das ofertas em nuvem e é a opção padrão na maioria das distribuições Linux.

Ele é construído com base nos valores de desempenho, estabilidade e abertura, e a Fundação MariaDB garante que contribuições serão aceitas com base no mérito técnico. Recursos recentes incluem clusterização avançada com Galera Cluster 4, recursos de compatibilidade com o Oracle Database e tabelas de dados temporais, permitindo consultar os dados conforme estavam em qualquer ponto do passado.


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve          | Serviço |
| ---- | --------- | --------- | ----------------------- | ------- |
| 3306 | 3306      | tcp       | banco MySQL (port 3306) | mariadb |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço |
| ---------------------------- | ------------ | ------- |
| /DATA/AppData/mariadb/config | /config      | mariadb |

## Variáveis de ambiente

| Variável            | Valor padrão | Serviço |
| ------------------- | ------------ | ------- |
| PUID                | $PUID        | mariadb |
| PGID                | $PGID        | mariadb |
| TZ                  | $TZ          | mariadb |
| MYSQL_ROOT_PASSWORD | roqueos      | mariadb |
| MYSQL_DATABASE      | roqueos      | mariadb |
| MYSQL_USER          | roqueos      | mariadb |
| MYSQL_PASSWORD      | roqueos      | mariadb |
| REMOTE_SQL          | —            | mariadb |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3306/`.

- Default user: `roqueos`
- Default password: `roqueos`
- Default database: `roqueos`
- Default root password: `roqueos`

## Imagens

| Serviço | Imagem                     |
| ------- | -------------------------- |
| mariadb | linuxserver/mariadb:11.4.8 |

## Fonte oficial

Projeto original: **MariaDB Foundation**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
