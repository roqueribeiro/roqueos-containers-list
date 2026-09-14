# Jellyfin(Nvidia GPU)

> Coloca você no controle de seus meios de comunicação.

## O que é

O Jellyfin permite que você colete, gerencie e transmita seus meios de comunicação. Execute o servidor Jellyfin em seu sistema e obtenha acesso ao sistema de entretenimento de software livre líder, com toques e decorações incluídos.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço  |
| ---- | --------- | --------- | ---------------------------- | -------- |
| 8097 | 8096      | tcp       | WebUI HTTP Port              | jellyfin |
| 8921 | 8920      | tcp       | WebUI HTTPS Port             | jellyfin |
| 7359 | 7359      | tcp       | Jellyfin auto-discovery Port | jellyfin |
| 1901 | 1900      | tcp       | Jellyfin DLNA Port           | jellyfin |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço  |
| --------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/config | /config      | jellyfin |
| /DATA/Media                 | /Media       | jellyfin |
| /opt/vc/lib                 | /opt/vc/lib  | jellyfin |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço  |
| ---------------------- | ------------ | -------- |
| PGID                   | $PGID        | jellyfin |
| PUID                   | $PUID        | jellyfin |
| TZ                     | $TZ          | jellyfin |
| CPU_FALLBACK           | true         | jellyfin |
| NVIDIA_VISIBLE_DEVICES | all          | jellyfin |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8097/`.

## Imagens

| Serviço  | Imagem                       |
| -------- | ---------------------------- |
| jellyfin | linuxserver/jellyfin:10.10.6 |

## Fonte oficial

Projeto original: **Jellyfin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
