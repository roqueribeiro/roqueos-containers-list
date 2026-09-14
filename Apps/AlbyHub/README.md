# Alby Hub ✨

> Um nó Bitcoin Lightning simples com uma carteira, subcontas e conexões NWC.

## O que é

Alby Hub is an open-source, self-custodial Bitcoin Lightning wallet, with the easiest-to-use Lightning Network node for everyone.
Whether you're an individual, creator, or developer, Alby Hub is your centre for seamless Bitcoin payments.
Effortlessly connect to a variety of apps like the Alby Browser Extension or Alby Go mobile app, create sub-wallets for family and friends, and take full control of your funds—all within an intuitive interface and developer-ready APIs.

**USEFUL LINKS**
- [Source Repository](https://github.com/getAlby/hub)
- [Support](https://support.getalby.com/)
- [Marketing Site](https://albyhub.com/)
- [Community of users and developers](https://discord.getalby.com)
- [Feedback Board, feature requests, bug reports[(https://feedback.getalby.com)


Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve | Serviço |
| ----- | --------- | --------- | -------------- | ------- |
| 58000 | 8080      | tcp       | —              | albyhub |


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
