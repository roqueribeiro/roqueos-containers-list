# Prowlarr

> Integração de várias aplicações PVR

## O que é

O Prowlarr é um gerenciador de índices / proxy construído na base de pilha popular .net / reactjs * arr para integração com suas várias aplicações PVR. O Prowlarr suporta a gestão de Torrent Trackers e Usenet Indexers. Ele se integra perfeitamente com Lidarr, Mylar3, Radarr, Readarr e Sonarr, oferecendo gerenciamento completo de seus indexadores sem configuração de indexador por aplicativo (fazemos tudo).

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço  |
| ---- | --------- | --------- | -------------- | -------- |
| 9696 | 9696      | tcp       | —              | prowlarr |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container | Serviço  |
| ----------------------------- | ------------ | -------- |
| /DATA/AppData/prowlarr/config | /config      | prowlarr |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço  |
| -------- | ------------- | -------- |
| PGID     | 1000          | prowlarr |
| PUID     | 1000          | prowlarr |
| TZ       | Europe/London | prowlarr |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9696/`.

## Imagens

| Serviço  | Imagem                      |
| -------- | --------------------------- |
| prowlarr | linuxserver/prowlarr:1.37.0 |

## Fonte oficial

Projeto original: **Prowlarr Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
