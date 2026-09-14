# Duplicati

> Armazene backups criptografados de forma segura na nuvem!

## O que é

O Duplicati é um cliente de backup gratuito e de código aberto que armazena de forma segura backups criptografados, incrementais e compactados em serviços de armazenamento em nuvem e servidores de arquivos remotos.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço   |
| ---- | --------- | --------- | -------------- | --------- |
| 8200 | 8200      | tcp       | —              | duplicati |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço   |
| --------------------------- | ------------ | --------- |
| /DATA/AppData/$AppID/config | /config      | duplicati |
| /DATA/Duplicati/backups     | /backups     | duplicati |
| /DATA/Duplicati/source      | /source      | duplicati |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço   |
| -------- | ------------- | --------- |
| PGID     | 1000          | duplicati |
| PUID     | 1000          | duplicati |
| TZ       | Europe/London | duplicati |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8200/`.

## Imagens

| Serviço   | Imagem                      |
| --------- | --------------------------- |
| duplicati | linuxserver/duplicati:2.1.0 |

## Fonte oficial

Projeto original: **duplicati**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
