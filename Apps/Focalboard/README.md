# Focalboard

> Quadro de projeto aberto, alternativa a Trello e Notion

## O que é

Focalboard é uma ferramenta aberta de gestão de projeto que roda no seu servidor. Quadros, tabelas, calendário e galeria sobre os mesmos cartões.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço |
| ---- | --------- | --------- | ---------------------------- | ------- |
| 8000 | 8000      | tcp       | Web interface for Focalboard | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container         | Serviço |
| ------------------------- | -------------------- | ------- |
| /DATA/AppData/$AppID/data | /opt/focalboard/data | app     |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

- Before you can use the application, you will need to create a new account when going to the Focalboard UI.

## Imagens

| Serviço | Imagem                                                                                               |
| ------- | ---------------------------------------------------------------------------------------------------- |
| app     | mattermost/focalboard:7.11.4@sha256:c935a2879dc7bcb8243a562afea21a30edbb6dbe029b53a9c0ae7ab4b3255c54 |

## Fonte oficial

Projeto original: **mattermost**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
