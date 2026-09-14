# Glance

> Dashboard auto-hospedado para todos os seus feeds e widgets

## O que é

Glance é um dashboard auto-hospedado que coloca todos os seus feeds num só lugar — RSS, Hacker News, Reddit, releases do GitHub, clima, calendário, uptime de servidores, widgets custom, stats de servidor, streams do Twitch, cotações de mercado e uma barra de busca com atalhos de engines. Binário único, configurado por um arquivo YAML. Substituto minimalista perfeito para homepage.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8106 | 8080      | tcp       | Porta da interface web (mapeada para 8106 no host) | glance  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço |
| -------------------- | ------------ | ------- |
| /DATA/AppData/$AppID | /app/config  | glance  |

## Variáveis de ambiente

| Variável | Valor padrão      | Serviço |
| -------- | ----------------- | ------- |
| TZ       | America/Sao_Paulo | glance  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8106/`.

- O primeiro boot procura /app/config/glance.yml — coloque um arquivo de config lá antes de iniciar.
- Exemplo mínimo: https://github.com/glanceapp/glance/blob/main/docs/configuration.md
- Combine com Heimdall ou Homepage (ambos no catálogo) — Glance é o mais focado em feeds dos três.

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| glance  | glanceapp/glance:v0.7.4 |

## Fonte oficial

Projeto original: **glanceapp**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
