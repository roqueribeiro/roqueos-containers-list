# Lidarr

> Gerenciador de coleções de música para usuários de Usenet e BitTorrent

## O que é

Lidarr é um gerenciador de coleções de música para usuários de Usenet e BitTorrent. Ele pode monitorar vários feeds RSS para novos álbuns de seus artistas favoritos e se comunicará com clientes e indexadores para obtê-los, classificá-los e renomeá-los. Também pode ser configurado para atualizar automaticamente a qualidade dos arquivos existentes na biblioteca quando uma qualidade melhor estiver disponível.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve           | Serviço |
| ---- | --------- | --------- | ------------------------ | ------- |
| 8686 | 8686      | tcp       | Web interface for Lidarr | lidarr  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/lidarr/config | /config      | lidarr  |
| /DATA/Media/Music           | /music       | lidarr  |
| /DATA/Downloads             | /downloads   | lidarr  |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço |
| -------- | ------------- | ------- |
| PGID     | 1000          | lidarr  |
| PUID     | 1000          | lidarr  |
| TZ       | Europe/London | lidarr  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8686/`.

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| lidarr  | linuxserver/lidarr:3.1.0 |

## Fonte oficial

Projeto original: **lidarr Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
