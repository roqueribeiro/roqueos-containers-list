# MineOS

> Ferramenta gratuita e fácil de usar para gerenciamento de servidor Minecraft.

## O que é

MineOS é uma interface de servidor para facilitar a gestão de tarefas administrativas do Minecraft. Esta iteração usando o Node.js visa aprimorar os scripts anteriores do MineOS (baseados em Python), aproveitando o modelo assíncrono de acionamento de eventos do Node.JS e websockets.

Categoria na App Store do RoqueOS: **Gaming**.
Arquiteturas suportadas: amd64.

## Portas

| Host        | Container   | Protocolo | Para que serve                     | Serviço |
| ----------- | ----------- | --------- | ---------------------------------- | ------- |
| 8444        | 8443        | tcp       | WebUI HTTP Port                    | mineos  |
| 25565-25570 | 25565-25570 | tcp       | Service port 25565-25570 of mineos | mineos  |
| 25565-25570 | 25565-25570 | tcp       | Service port 25565-25570 of mineos | mineos  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container         | Serviço |
| --------------------------- | -------------------- | ------- |
| /var/games/mineos/minecraft | /var/games/minecraft | mineos  |

## Variáveis de ambiente

| Variável      | Valor padrão | Serviço |
| ------------- | ------------ | ------- |
| USE_HTTPS     | true         | mineos  |
| SERVER_PORT   | 8443         | mineos  |
| USER_NAME     | mc           | mineos  |
| USER_UID      | 1000         | mineos  |
| USER_PASSWORD | $default_pwd | mineos  |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:8444/admin/index.html`.

- Conta padrão
- | Nome de usuário | Senha |
- |----------|----------|
- | `mc`    | `root` |

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| mineos  | hexparrot/mineos:latest |

## Fonte oficial

Projeto original: **hexparrot**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
