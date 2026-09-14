# Scrutiny

> A saúde dos discos do servidor, num painel só

## O que é

Scrutiny lê o S.M.A.R.T. de cada disco e transforma aquele monte de número cru em algo que dá para entender: quais discos estão bem, quais estão degradando e qual vai falhar primeiro.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve       | Serviço  |
| ----- | --------- | --------- | -------------------- | -------- |
| 38080 | 8080      | tcp       | Container Port: 8080 | scrutiny |
| 38086 | 8086      | tcp       | Container Port: 8086 | scrutiny |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container           | Serviço  |
| ----------------------------- | ---------------------- | -------- |
| /DATA/AppData/$AppID/config   | /opt/scrutiny/config   | scrutiny |
| /DATA/AppData/$AppID/influxdb | /opt/scrutiny/influxdb | scrutiny |
| /run/udev                     | /run/udev              | scrutiny |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:38080/`.

### Por que este app pede privilégio

- `privileged`: le a saude S.M.A.R.T. dos discos, que exige acesso ao dispositivo de bloco
- `capAdd`: SYS_RAWIO para enviar comandos S.M.A.R.T. ao disco

## Imagens

| Serviço  | Imagem                                                                                                          |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| scrutiny | ghcr.io/analogj/scrutiny:master-omnibus@sha256:18689773150d6b8b53c94a435f40f7b6e946fd4a6d40b44c64fa2154a5b38941 |

## Fonte oficial

Projeto original: **analogj**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
