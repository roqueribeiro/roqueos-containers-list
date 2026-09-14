# Jackett

> O Jackett funciona como um servidor proxy

## O que é

O Jackett traduz as consultas de aplicativos (Sonarr, Radarr, SickRage, CouchPotato, Mylar3, Lidarr, DuckieTV, qBittorrent, Nefarious, etc.) em consultas HTTP específicas do site de rastreamento, analisa a resposta HTML ou JSON e, em seguida, envia os resultados de volta ao software solicitante. Isso permite obter uploads recentes (como RSS) e executar pesquisas. O Jackett é um único repositório de lógica de raspagem e tradução de indexadores mantidos - removendo a carga de outras aplicações.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 9117 | 9117      | tcp       | —              | jackett |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | jackett |
| /DATA/Downloads             | /downloads   | jackett |

## Variáveis de ambiente

| Variável    | Valor padrão  | Serviço |
| ----------- | ------------- | ------- |
| AUTO_UPDATE | true          | jackett |
| PGID        | 1000          | jackett |
| PUID        | 1000          | jackett |
| TZ          | Europe/London | jackett |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9117/`.

## Imagens

| Serviço | Imagem                      |
| ------- | --------------------------- |
| jackett | linuxserver/jackett:0.24.87 |

## Fonte oficial

Projeto original: **Jackett**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
