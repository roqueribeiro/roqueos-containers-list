# handbrake

> Liberte seus vídeos e crie possibilidades infinitas.

## O que é

Handbrake é um aplicativo baseado em Docker para transcodificação e compressão de vídeo, oferecendo recursos poderosos e flexíveis de processamento de mídia em várias plataformas.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço   |
| ---- | --------- | --------- | -------------- | --------- |
| 5800 | 5800      | tcp       | —              | handbrake |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço   |
| --------------------------- | ------------ | --------- |
| /DATA                       | /storage     | handbrake |
| /DATA/AppData/$AppID/watch  | /watch       | handbrake |
| /DATA/Media                 | /output      | handbrake |
| /DATA/AppData/$AppID/config | /config      | handbrake |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5800/`.

- ## Handbrake
- #### Professional video transcoding.

### Por que este app pede privilégio

- `privileged`: acesso a /dev/dri para transcodificação por hardware

## Imagens

| Serviço   | Imagem                     |
| --------- | -------------------------- |
| handbrake | jlesage/handbrake:v25.10.1 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
