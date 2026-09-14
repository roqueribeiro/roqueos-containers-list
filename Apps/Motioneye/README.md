# Motioneye

> A web frontend for the motion daemon.

## O que é

motionEye is a web-based frontend for motion. Check out the wiki for more details. Changelog is available on the releases page. https://github.com/motioneye-project/motioneye

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço   |
| ---- | --------- | --------- | ------------------ | --------- |
| 8765 | 8765      | tcp       | Motioneye Web Port | motioneye |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container       | Serviço   |
| ------------------------------ | ------------------ | --------- |
| /DATA/AppData/motioneye/config | /etc/motioneye     | motioneye |
| /DATA/Media/motioneye          | /var/lib/motioneye | motioneye |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8765/`.

## Imagens

| Serviço   | Imagem                         |
| --------- | ------------------------------ |
| motioneye | ccrisan/motioneye:master-amd64 |

## Fonte oficial

Projeto original: **Motioneye**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
