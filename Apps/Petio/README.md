# Petio

> Um aplicativo complementar de terceiros disponível para proprietários de servidores Plex, permitindo que seus usuários solicitem, revisem e descubram conteúdo.

## O que é

Petio é um aplicativo complementar de terceiros disponível para os proprietários de servidores Plex, permitindo que seus usuários solicitem, revisem e descubram conteúdos. O aplicativo é projetado para ser instantaneamente familiar e intuitivo, mesmo para usuários menos familiarizados com tecnologia. Petio ajudará você a gerenciar solicitações de seus usuários, se conectar a outros aplicativos de terceiros como Sonarr e Radarr, notificar os usuários quando o conteúdo estiver disponível e acompanhar o progresso das solicitações. Petio também permite que os usuários descubram mídia tanto no seu servidor quanto fora dele, encontrando facilmente conteúdo relacionado e deixando suas opiniões para outros usuários.

Petio é um projeto em andamento, sempre gratuito e em constante evolução, atualmente na fase de protótipo alfa e já está disponível!


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 7777 | 7777      | tcp       | WebUI Port     | petio   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container    | Serviço |
| -------------------------- | --------------- | ------- |
| /DATA/AppData/petio/config | /app/api/config | petio   |
| /DATA/AppData/petio/logs   | /app/logs       | petio   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PUID     | $PUID        | petio   |
| PGID     | $PGID        | petio   |
| TZ       | $TZ          | petio   |
| PUID     | $PUID        | mongo   |
| PGID     | $PGID        | mongo   |
| TZ       | $TZ          | mongo   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7777/`.

## Imagens

| Serviço | Imagem                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------ |
| petio   | ghcr.io/petio-team/petio@sha256:1c5a9276a844f4284601cbe332905864950545ebdeaad74bacb9097ea4f4b333 |
| mongo   | mongo:4.4.22                                                                                     |

## Fonte oficial

Projeto original: **Petio Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
