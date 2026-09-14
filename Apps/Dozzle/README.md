# Dozzle

> O log dos seus containers, ao vivo, no navegador

## O que é

Dozzle mostra o log dos containers Docker em tempo real, sem guardar nada em disco e sem precisar de banco. Abra, veja o que está acontecendo agora, feche.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço |
| ---- | --------- | --------- | -------------------- | ------- |
| 8888 | 8080      | tcp       | Container Port: 8080 | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço |
| -------------------- | -------------------- | ------- |
| /var/run/docker.sock | /var/run/docker.sock | app     |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8888/`.

## Imagens

| Serviço | Imagem                                                                                        |
| ------- | --------------------------------------------------------------------------------------------- |
| app     | amir20/dozzle:v10.7.1@sha256:a8441e9d2928cc7b30d0023f5eedbb87ef6e234d87f3be02662bd8f417955b8b |

## Fonte oficial

Projeto original: **amir20**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
