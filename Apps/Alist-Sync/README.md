# Alist-Sync

> An Alist storage synchronization tool based on the Web interface.

## O que é

Alist-Sync is a storage synchronization tool based on the Web interface. It can achieve data synchronization and mutual backup among multiple network disks, and also has practical functions such as multi-task management, scheduled synchronization and difference handling.


Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve               | Serviço    |
| ----- | --------- | --------- | ---------------------------- | ---------- |
| 52441 | 52441     | tcp       | Web interface for Alist-Sync | alist-sync |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço    |
| ------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/data | /app/data    | alist-sync |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço    |
| -------- | ------------- | ---------- |
| TZ       | Asia/Shanghai | alist-sync |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:52441/`.

- The default login password is admin/admin.

## Imagens

| Serviço    | Imagem                  |
| ---------- | ----------------------- |
| alist-sync | xjxjin/alist-sync:1.1.5 |

## Fonte oficial

Projeto original: **xjxjin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
