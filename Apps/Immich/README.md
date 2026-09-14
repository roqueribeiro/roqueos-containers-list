# Immich

> Solução de gestão de multimédia auto-hospedada

## O que é

Immich: Revolucionando a Sua Experiência Multimédia em Casa

O Immich está aqui para transformar a forma como gere e desfruta dos seus ficheiros multimédia na televisão de casa, smartphones e outros dispositivos. Ao contrário dos álbuns de fotos tradicionais ou dos serviços de nuvem convencionais, o immich oferece uma plataforma moderna e fluida para organizar, partilhar e aceder às suas fotos e vídeos. Imagine fazer o backup dos seus momentos preciosos a partir dos seus dispositivos móveis sem esforço e visualizá-los instantaneamente na sua televisão ou partilhá-los com membros da família—o immich torna tudo isso possível.

O Immich destaca-se pelo backup automático a partir de dispositivos móveis, uma interface web elegante para uma navegação fácil pelos conteúdos e funcionalidades avançadas como reconhecimento facial e deteção de objetos. Pode organizar os seus conteúdos por localização, desfrutar da reprodução de vídeos em 4K e até gerir fotos RAW. Além disso, com suporte multiutilizador, partilhar memórias com amigos e família é extremamente simples. A melhor parte? O Immich oferece estas funcionalidades poderosas a baixo custo, garantindo uma experiência premium sem gastar muito.

Implementar o immich num dispositivo de nuvem privada como o Zima proporciona uma conveniência incomparável. Desfrute de capacidade de armazenamento ilimitada, velocidades de rede local extremamente rápidas e acesso fácil a partir de múltiplos dispositivos. Com o immich na sua nuvem privada Zima, os seus conteúdos estão sempre ao seu alcance, seguros e protegidos em sua casa.


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve           | Serviço       |
| ---- | --------- | --------- | ------------------------ | ------------- |
| 2283 | 2283      | tcp       | Web interface for Immich | immich-server |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container             | Serviço                 |
| -------------------------------- | ------------------------ | ----------------------- |
| /DATA/Gallery/immich             | /usr/src/app/upload      | immich-server           |
| /etc/localtime                   | /etc/localtime           | immich-server           |
| /DATA/AppData/immich/model-cache | /cache                   | immich-machine-learning |
| /DATA/AppData/immich/redis       | /data                    | redis                   |
| /DATA/AppData/immich/pgdata      | /var/lib/postgresql/data | database                |

## Variáveis de ambiente

| Variável             | Valor padrão     | Serviço                 |
| -------------------- | ---------------- | ----------------------- |
| DB_DATABASE_NAME     | immich           | immich-server           |
| DB_PASSWORD          | postgres         | immich-server           |
| DB_USERNAME          | postgres         | immich-server           |
| DB_DATABASE_NAME     | immich           | immich-machine-learning |
| DB_PASSWORD          | postgres         | immich-machine-learning |
| DB_USERNAME          | postgres         | immich-machine-learning |
| POSTGRES_PASSWORD    | postgres         | database                |
| POSTGRES_USER        | postgres         | database                |
| POSTGRES_DB          | immich           | database                |
| POSTGRES_INITDB_ARGS | --data-checksums | database                |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:2283/`.

- ⚠️ O projeto está em desenvolvimento muito ativo.
- ⚠️ Espere bugs e alterações que podem causar problemas.
- ⚠️ Não utilize a aplicação como a única forma de armazenar as suas fotos e vídeos.
- ⚠️ Siga sempre o plano de backup 3-2-1 para as suas fotos e vídeos valiosos!
- ## Ficheiros multimédia e dados autorizados
- 1. Clique no ícone de configurações no canto superior direito da aplicação.
- 2. Na aba immich-server, mapeie a localização de armazenamento do seu álbum na secção Volumes (o padrão é `/DATA/Gallery/immich`).
- Para a documentação completa do projeto e instruções de instalação, por favor [consulte](https://immich.app).

## Imagens

| Serviço                 | Imagem                                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| immich-server           | altran1502/immich-server:v1.132.3                                                                                    |
| immich-machine-learning | altran1502/immich-machine-learning:v1.132.3                                                                          |
| redis                   | docker.io/redis:6.2-alpine@sha256:148bb5411c184abd288d9aaed139c98123eeb8824c5d3fce03cf721db58066d8                   |
| database                | docker.io/tensorchord/pgvecto-rs:pg14-v0.2.0@sha256:739cdd626151ff1f796dc95a6591b55a714f341c737e27f045019ceabf8e8c52 |

## Fonte oficial

Projeto original: **alextran1502**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
