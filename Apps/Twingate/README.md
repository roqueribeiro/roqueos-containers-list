# Twingate

> Twingate Connector for RoqueOS

## O que é

It's a connector for Twingate".

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável                | Valor padrão | Serviço            |
| ----------------------- | ------------ | ------------------ |
| TWINGATE_NETWORK        | —            | twingate-connector |
| TWINGATE_ACCESS_TOKEN   | —            | twingate-connector |
| TWINGATE_REFRESH_TOKEN  | —            | twingate-connector |
| TWINGATE_LABEL_HOSTNAME | ${HOSTNAME}  | twingate-connector |

## Primeiro acesso

Abra o app pelo ícone no RoqueOS depois de instalar.

## Imagens

| Serviço            | Imagem               |
| ------------------ | -------------------- |
| twingate-connector | twingate/connector:1 |

## Fonte oficial

Projeto original: https://www.twingate.com

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
