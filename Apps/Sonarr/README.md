# Sonarr

> O PVR para usuários de Usenet e BitTorrent

## O que é

O Sonarr é um PVR para usuários de Usenet e BitTorrent. Ele pode monitorar vários feeds RSS para novos episódios de seus programas favoritos e capturá-los, classificá-los e renomeá-los. Ele também pode ser configurado para atualizar automaticamente a qualidade dos arquivos já baixados quando uma qualidade melhor estiver disponível.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 8989 | 8989      | tcp       | WebUI HTTP Port | sonarr  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | sonarr  |
| /DATA/Media/TV Shows        | /tv          | sonarr  |
| /DATA/Downloads             | /downloads   | sonarr  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | $PGID        | sonarr  |
| PUID     | $PUID        | sonarr  |
| TZ       | $TZ          | sonarr  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8989/`.

## Imagens

| Serviço | Imagem                    |
| ------- | ------------------------- |
| sonarr  | linuxserver/sonarr:4.0.15 |

## Fonte oficial

Projeto original: **Sonarr**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
