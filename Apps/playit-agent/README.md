# Playit Agent

> Um proxy reverso gratuito para serviços de tunelamento (não auto-hospedado).

## O que é

_Descrição ainda não escrita para este app._

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Abra o app pelo ícone no RoqueOS depois de instalar.

- This is the agent for use with playit.gg's reverse proxy. After having installed the container/app, you have to go to the settings of the container/app and go to the logs. The logs will tell you to click a link to activate the agent. Copy the link (you will have to do it manually with your cursor) and paste it in your web browser in a new tab. This will open a page asking you to login or register. If you have an account already then you can login. If not, register an account. Once you're logged in, it will ask to allow the agent. Allow the agent and remember the agent name. Then head over to https://playit.gg/account/agents. From there you need to select the correct agent, according to the agent name you just were to remember. From there you can add tunnels. Choose the options for the tunnel as you need, and a port in case of doing it manually with TCP, UDP and TCP+UDP. After that use the provided domain and port to connect to the tunnel and use that to get access to your tunneled service!

## Imagens

| Serviço      | Imagem                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------- |
| playit-agent | ghcr.io/mafen/playit-docker@sha256:41e7201cd7a08796440343db2b67b5eb4f0effa79418f2da03d412f5b875c0a0 |

## Fonte oficial

Projeto original: **Patrick Lorio**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
