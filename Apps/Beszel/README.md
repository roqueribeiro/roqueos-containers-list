# Beszel

> Monitoramento leve de servidores com stats de Docker e alertas

## O que é

Beszel é uma plataforma leve de monitoramento de servidores com estatísticas de Docker, dados históricos, alertas e um dashboard web limpo. Projetado como alternativa rápida e de baixo consumo ao Netdata ou Glances. Binário único, agents fazem push para o hub, sem necessidade de banco de séries temporais.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço |
| ---- | --------- | --------- | ---------------------------- | ------- |
| 8090 | 8090      | tcp       | Porta da interface web / API | beszel  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container   | Serviço |
| --------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/data   | /beszel_data   | beszel  |
| /DATA/AppData/$AppID/socket | /beszel_socket | beszel  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8090/`.

- Abra http://SEU_IP:8090 para criar o admin no primeiro boot.
- Instale o beszel-agent em cada servidor que quiser monitorar (script one-line disponível no menu de Settings).

## Imagens

| Serviço | Imagem                |
| ------- | --------------------- |
| beszel  | henrygd/beszel:0.10.2 |

## Fonte oficial

Projeto original: **henrygd**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
