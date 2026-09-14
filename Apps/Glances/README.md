# Glances

> Ferramenta de monitoramento multiplataforma.

## O que é

Glances é uma ferramenta de monitoramento de sistema de plataforma cruzada de código aberto. Ele permite o monitoramento em tempo real de vários aspectos do seu sistema, como CPU, memória, disco, uso da rede, etc.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço |
| ----- | --------- | --------- | ---------------- | ------- |
| 61208 | 61208     | tcp       | WebUI HTTP Port  | glances |
| 61209 | 61209     | tcp       | Glances API port | glances |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço |
| -------------------- | -------------------- | ------- |
| /var/run/docker.sock | /var/run/docker.sock | glances |
| /mnt                 | /mnt                 | glances |

## Variáveis de ambiente

| Variável    | Valor padrão | Serviço |
| ----------- | ------------ | ------- |
| GLANCES_OPT | -w           | glances |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:61208/`.

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| glances | nicolargo/glances:4.4.1 |

## Fonte oficial

Projeto original: **Nicolas Hennion**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
