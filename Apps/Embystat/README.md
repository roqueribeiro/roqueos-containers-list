# Embystat

> Calcule todos os tipos de estatísticas do seu servidor Emby ou Jellyfin (local)

## O que é

O EmbyStat é um servidor web pessoal que pode calcular todos os tipos de estatísticas do seu servidor Emby ou Jellyfin (local). Basta instalar isso em seu servidor e deixe-o calcular todos os tipos de coisas divertidas. Este projeto ainda está na fase alfa, mas sinta-se à vontade para baixá-lo em seu computador e testá-lo por conta própria. Quando for a hora, hospedarei um site completo / lançamento para plataformas comuns e páginas Wiki.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve             | Serviço  |
| ---- | --------- | --------- | -------------------------- | -------- |
| 6555 | 6555      | tcp       | Web interface for Embystat | embystat |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container | Serviço  |
| ----------------------------- | ------------ | -------- |
| /DATA/AppData/embystat/config | /config      | embystat |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço  |
| -------- | ------------- | -------- |
| PGID     | 1000          | embystat |
| PUID     | 1000          | embystat |
| TZ       | Europe/London | embystat |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6555/`.

## Imagens

| Serviço  | Imagem                     |
| -------- | -------------------------- |
| embystat | linuxserver/embystat:0.2.0 |

## Fonte oficial

Projeto original: **Embystart Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
