# CloudBeaver

> Administrador de Banco de Dados na Nuvem.

## O que é

CloudBeaver é uma ferramenta GUI de banco de dados baseada na web que oferece uma interface web abrangente. Você pode usá-lo para gerenciar PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, DB2, Firebird, H2 e Trino.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço     |
| ---- | --------- | --------- | -------------- | ----------- |
| 8978 | 8978      | tcp       | Porta da WebUI | cloudbeaver |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container               | Serviço     |
| ------------------------------ | -------------------------- | ----------- |
| /DATA/AppData/$AppID/workspace | /opt/cloudbeaver/workspace | cloudbeaver |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8978/`.

## Imagens

| Serviço     | Imagem                     |
| ----------- | -------------------------- |
| cloudbeaver | dbeaver/cloudbeaver:25.2.5 |

## Fonte oficial

Projeto original: **dbeaver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
