# Ombi

> Ferramenta de solicitação de mídia amigável, sincroniza automaticamente com seus servidores de mídia!

## O que é

O Ombi é um aplicativo da Web auto-hospedado que permite que seus usuários do Plex ou do Emby solicitem conteúdo por conta própria. O Ombi pode ser vinculado a várias ferramentas DVR de TV Show e Movie para criar uma experiência sem interrupções para seus usuários!

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 3579 | 3579      | tcp       | Web interface for Ombi | ombi    |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/ombi/config | /config      | ombi    |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço |
| -------- | ------------- | ------- |
| BASE_URL | /ombi         | ombi    |
| PGID     | 1000          | ombi    |
| PUID     | 1000          | ombi    |
| TZ       | Europe/London | ombi    |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3579/`.

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| ombi    | linuxserver/ombi:4.47.1 |

## Fonte oficial

Projeto original: **Sabnzbd Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
