# Gotify

> Servidor próprio de notificação, simples de operar

## O que é

Gotify é um servidor pequeno para mandar e receber mensagem. Os seus scripts postam no servidor, e o app no celular recebe. Sem nuvem de terceiro.

Categoria na App Store do RoqueOS: **Communication**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço |
| ---- | --------- | --------- | ------------------ | ------- |
| 8091 | 80        | tcp       | Container Port: 80 | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /app/data    | app     |

## Variáveis de ambiente

| Variável                | Valor padrão | Serviço |
| ----------------------- | ------------ | ------- |
| GOTIFY_DEFAULTUSER_NAME | admin        | app     |
| GOTIFY_DEFAULTUSER_PASS | custom       | app     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8091/`.

## Imagens

| Serviço | Imagem                                                                                      |
| ------- | ------------------------------------------------------------------------------------------- |
| app     | gotify/server:3.0.0@sha256:d75e89e0e28389c00c2556afe01282a37ee9756b0285799aa25214243aebd5e5 |

## Fonte oficial

Projeto original: **gotify**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
