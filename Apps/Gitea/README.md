# Gitea

> Git com uma xícara de chá

## O que é

O Gitea é uma solução de hospedagem de código leve gerenciada pela comunidade escrita em Go.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 3002 | 3000      | tcp       | WebUI Port     | gitea   |
| 222  | 22        | tcp       | SSH Port       | gitea   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /data        | gitea   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| USER_GID | 1000         | gitea   |
| USER_UID | 1000         | gitea   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3002/`.

- When the App is installed, the first account registered will become the administrator account.

## Imagens

| Serviço | Imagem           |
| ------- | ---------------- |
| gitea   | gitea/gitea:1.25 |

## Fonte oficial

Projeto original: **Gitea**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
