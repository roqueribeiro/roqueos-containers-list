# PhotoPrism

> Navegando, organizando e compartilhando sua coleção de fotos

## O que é

PhotoPrism® é um aplicativo alimentado por IA para navegar, organizar e compartilhar sua coleção de fotos. Ele usa as últimas tecnologias para marcar e encontrar fotos automaticamente sem te incomodar. Você pode executá-lo em casa, em um servidor privado ou na nuvem.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço    |
| ---- | --------- | --------- | --------------- | ---------- |
| 2342 | 2342      | tcp       | WebUI HTTP Port | photoprism |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                 | No container          | Serviço    |
| --------------------------------------- | --------------------- | ---------- |
| /DATA/AppData/$AppID/photoprism/storage | /photoprism/storage   | photoprism |
| /DATA/Gallery                           | /photoprism/originals | photoprism |

## Variáveis de ambiente

| Variável                  | Valor padrão | Serviço    |
| ------------------------- | ------------ | ---------- |
| PHOTOPRISM_ADMIN_PASSWORD | roqueos      | photoprism |
| PHOTOPRISM_UPLOAD_NSFW    | true         | photoprism |
| TZ                        | $TZ          | photoprism |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:2342/`.

- ## PhotoPrism
- Default Account
- | Username | Password |
- | -------- | -------- |
- | `admin`    | `roqueos`   |

## Imagens

| Serviço    | Imagem                       |
| ---------- | ---------------------------- |
| photoprism | photoprism/photoprism:250228 |

## Fonte oficial

Projeto original: **PhotoPrism**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
