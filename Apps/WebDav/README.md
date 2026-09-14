# WebDAV

> Um protocolo de compartilhamento e gerenciamento de arquivos baseado na web

## O que é

WebDAV é um protocolo baseado na web que permite compartilhar e gerenciar arquivos pela Internet, fornecendo um ambiente colaborativo para edição e controle de versão de arquivos.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, 386, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 5005 | 80        | tcp       | —              | webdav  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                | No container | Serviço |
| ---------------------- | ------------ | ------- |
| /media/ZimaOS-HD/Media | /media       | webdav  |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço |
| -------- | ------------- | ------- |
| GID      | 1000          | webdav  |
| PASSWORD | roqueos       | webdav  |
| TZ       | Europe/Madrid | webdav  |
| UDI      | 1000          | webdav  |
| USERNAME | roqueos       | webdav  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5005/`.

- Default Account
- | Username | Password |
- |----------|----------|
- | `roqueos`    | `roqueos` |

## Imagens

| Serviço | Imagem             |
| ------- | ------------------ |
| webdav  | ugeek/webdav:amd64 |

## Fonte oficial

Projeto original: **RoqueOS Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
