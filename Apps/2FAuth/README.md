# 2FAuth

> Um aplicativo da web para gerenciar suas contas de autenticação de dois fatores (2FA) e gerar seus códigos de segurança

## O que é

2FAuth é uma alternativa auto-hospedada baseada na web aos geradores de códigos de uso único (OTP) como o Google Authenticator, projetados para dispositivos móveis e desktop.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, 386, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve           | Serviço |
| ---- | --------- | --------- | ------------------------ | ------- |
| 8000 | 8000      | tcp       | Web interface for 2FAuth | 2fauth  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço |
| -------------------- | ------------ | ------- |
| /DATA/AppData/$AppID | /2fauth      | 2fauth  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| 2fauth  | 2fauth/2fauth:5.4.3 |

## Fonte oficial

Projeto original: **Bubka**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
