# Smokeping

> Ferramenta de monitoramento de desempenho de rede de código aberto gratuita

## O que é

mantém um registro de sua latência de rede.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve              | Serviço   |
| ----- | --------- | --------- | --------------------------- | --------- |
| 10280 | 80        | tcp       | Web interface for Smokeping | smokeping |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container | Serviço   |
| ------------------------------ | ------------ | --------- |
| /DATA/AppData/smokeping/config | /config      | smokeping |
| /DATA/AppData/smokeping/data   | /data        | smokeping |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço   |
| -------- | ------------- | --------- |
| PGID     | 1000          | smokeping |
| PUID     | 1000          | smokeping |
| TZ       | Europe/London | smokeping |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:10280/`.

## Imagens

| Serviço   | Imagem                      |
| --------- | --------------------------- |
| smokeping | linuxserver/smokeping:2.8.2 |

## Fonte oficial

Projeto original: **Lazylibrarian Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
