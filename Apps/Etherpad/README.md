# Etherpad

> Editor colaborativo de documentos em tempo real (alternativa ao Google Docs)

## O que é

Etherpad é um editor colaborativo em tempo real — como Google Docs mas auto-hospedado, sem conta necessária, sem rastreamento. Múltiplos usuários editam o mesmo documento simultaneamente com cursores coloridos e chat inline. Usado por Wikimedia, Mozilla e OpenWrt para anotações de projeto.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço  |
| ---- | --------- | --------- | ---------------------------- | -------- |
| 9001 | 9001      | tcp       | Porta da interface web / API | etherpad |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                  | No container           | Serviço  |
| ------------------------ | ---------------------- | -------- |
| /DATA/AppData/$AppID/var | /opt/etherpad-lite/var | etherpad |

## Variáveis de ambiente

| Variável         | Valor padrão                                                 | Serviço  |
| ---------------- | ------------------------------------------------------------ | -------- |
| ADMIN_PASSWORD   | change-me-on-first-boot                                      | etherpad |
| DEFAULT_PAD_TEXT | Welcome to Etherpad on RoqueOS! This pad text is configurabl | etherpad |
| TRUST_PROXY      | true                                                         | etherpad |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9001/`.

- SUBSTITUA ADMIN_PASSWORD antes do primeiro boot.
- Painel admin: http://SEU_IP:9001/admin (usuário "admin" + senha configurada acima).
- Para 50+ usuários simultâneos, configure PostgreSQL/MySQL via variáveis DB_TYPE/DB_HOST/etc.

## Imagens

| Serviço  | Imagem                  |
| -------- | ----------------------- |
| etherpad | etherpad/etherpad:2.2.7 |

## Fonte oficial

Projeto original: **ether**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
