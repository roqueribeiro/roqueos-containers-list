# OpenClaw

> Assistente de IA pessoal que roda nos seus aparelhos

## O que é

OpenClaw é um assistente de IA pessoal de código aberto. Estende a capacidade dos modelos de linguagem para agentes que executam tarefas de verdade, rodando no seu hardware e não na nuvem de terceiros.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                                             | Serviço  |
| ----- | --------- | --------- | ---------------------------------------------------------- | -------- |
| 24190 | 18789     | tcp       | Porta principal da interface web para aceder ao OpenClaw.  | openclaw |
| 18790 | 18790     | tcp       | Porta API interna para os serviços principais do OpenClaw. | openclaw |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço  |
| -------------------- | -------------------- | -------- |
| /DATA/AppData/$AppID | /home/node/.openclaw | openclaw |

## Variáveis de ambiente

| Variável               | Valor padrão   | Serviço  |
| ---------------------- | -------------- | -------- |
| HOME                   | /home/node     | openclaw |
| TERM                   | xterm-256color | openclaw |
| OPENCLAW_GATEWAY_TOKEN | casaos         | openclaw |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:24190?token=casaos`.

- Antes de usar, siga o [Guia de Configuração](https://www.zimaspace.com/docs/zimaos/How-to-Deploy-OpenClaw) para configurar o modelo e as definições relacionadas.

### Por que este app pede privilégio

- `privileged`: o agente controla um desktop próprio dentro do container e precisa de acesso a dispositivos de entrada e vídeo

## Imagens

| Serviço  | Imagem                         |
| -------- | ------------------------------ |
| openclaw | icewhaletech/openclaw:2026.5.7 |

## Fonte oficial

Projeto original: **openclaw**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
