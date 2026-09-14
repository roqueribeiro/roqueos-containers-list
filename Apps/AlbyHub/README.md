# Alby Hub ✨

> Carteira Bitcoin Lightning sob sua guarda, com nó próprio e conexão a aplicativos

## O que é

Alby Hub é uma carteira Bitcoin Lightning de código aberto e sob sua própria guarda, com o nó da Lightning Network mais simples de operar. Serve tanto para quem só quer pagar e receber quanto para quem desenvolve, e conecta a vários aplicativos do ecossistema.

Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve               | Serviço |
| ----- | --------- | --------- | ---------------------------- | ------- |
| 58000 | 8080      | tcp       | Web interface for Alby Hub ✨ | albyhub |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /data        | albyhub |

## Variáveis de ambiente

| Variável   | Valor padrão  | Serviço |
| ---------- | ------------- | ------- |
| PGID       | $PGID         | albyhub |
| PUID       | $PUID         | albyhub |
| TZ         | $TZ           | albyhub |
| UMASK      | 002           | albyhub |
| WORK_DIR   | /data/albyhub | albyhub |
| LOG_EVENTS | true          | albyhub |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:58000/`.

## Imagens

| Serviço | Imagem                      |
| ------- | --------------------------- |
| albyhub | ghcr.io/getalby/hub:v1.20.0 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
