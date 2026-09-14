# Wallos

> Controle das suas assinaturas, e do quanto elas somam

## O que é

Wallos acompanha as assinaturas que você paga, quando cada uma renova e quanto tudo junto custa por mês e por ano. Aberto, e roda no seu servidor.

Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço |
| ---- | --------- | --------- | ------------------ | ------- |
| 8282 | 80        | tcp       | Container Port: 80 | wallos  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container                       | Serviço |
| -------------------------- | ---------------------------------- | ------- |
| /DATA/AppData/$AppID/db    | /var/www/html/db                   | wallos  |
| /DATA/AppData/$AppID/logos | /var/www/html/images/uploads/logos | wallos  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | UTC          | wallos  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8282/`.

- Before you install read this: https://community.roqueribeiro.com/t/added-wallos-to-bigbearcasaos/2139?u=dragonfire1119

## Imagens

| Serviço | Imagem                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| wallos  | bellamy/wallos:5.4.2@sha256:316f26e13265958e7946ef98ff600516fddc51d698ee98bd1ae1577e5e00789f |

## Fonte oficial

Projeto original: **bellamy**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
