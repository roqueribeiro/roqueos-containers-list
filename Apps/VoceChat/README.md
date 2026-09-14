# VoceChat

> Have a Private Social Space Hosted on Your Site

## O que é

VoceChat is a secure chat software designed for independent deployment, offering a flexible solution for seamless communication. It combines instant messaging with channel-based group chats, allowing you to engage in one-on-one conversations or create themed channels for group discussions.

VoceChat supports a variety of message formats, including text, images, files, emojis, and rich text (Markdown), making your communication vibrant and expressive. Once deployed, it can be accessed via a WebAPP or mobile APP, ensuring a consistent experience across platforms.

With robust management features, VoceChat enables easy member and channel administration, giving you full control over your team or group’s communication environment. Whether for individual users or enterprise teams, VoceChat delivers a secure, versatile, and efficient chat solution.


Categoria na App Store do RoqueOS: **Communication**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço  |
| ---- | --------- | --------- | --------------- | -------- |
| 3009 | 3000      | tcp       | WebUI HTTP Port | vocechat |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                        | No container               | Serviço  |
| ---------------------------------------------- | -------------------------- | -------- |
| /DATA/AppData/$AppID/home/vocechat-server/data | /home/vocechat-server/data | vocechat |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| TZ       | $TZ          | vocechat |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3009/`.

## Imagens

| Serviço  | Imagem                          |
| -------- | ------------------------------- |
| vocechat | privoce/vocechat-server:v0.3.33 |

## Fonte oficial

Projeto original: https://voce.chat

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
