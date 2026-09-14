# VoceChat

> Tenha um Espaço Social Privado Hospedado no Seu Site

## O que é

VoceChat é um software de chat seguro desenhado para implementação independente, oferecendo uma solução flexível para uma comunicação fluida. Combina mensagens instantâneas com chats de grupo baseados em canais, permitindo-lhe participar em conversas individuais ou criar canais temáticos para discussões em grupo.

VoceChat suporta uma variedade de formatos de mensagens, incluindo texto, imagens, ficheiros, emojis e texto rico (Markdown), tornando a sua comunicação vibrante e expressiva. Uma vez implementado, pode ser acedido através de uma WebAPP ou aplicação móvel, garantindo uma experiência consistente em todas as plataformas.

Com funcionalidades robustas de gestão, o VoceChat permite uma fácil administração de membros e canais, dando-lhe controlo total sobre o ambiente de comunicação da sua equipa ou grupo. Seja para utilizadores individuais ou equipas empresariais, o VoceChat oferece uma solução de chat segura, versátil e eficiente.


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
