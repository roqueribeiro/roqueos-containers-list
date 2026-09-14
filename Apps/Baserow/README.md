# Baserow

> Banco de dados online sem saber programar

## O que é

Baserow deixa você criar o seu banco de dados pela tela, sem conhecimento técnico. Alternativa aberta ao Airtable, para rodar no seu servidor.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve      | Serviço |
| ---- | --------- | --------- | ------------------- | ------- |
| 7350 | 80        | tcp       | Container Port: 80  | app     |
| 7351 | 443       | tcp       | Container Port: 443 | app     |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container  | Serviço |
| ------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/data | /baserow/data | app     |

## Variáveis de ambiente

| Variável           | Valor padrão                 | Serviço |
| ------------------ | ---------------------------- | ------- |
| BASEROW_PUBLIC_URL | http://[YOUR_CASAOS_IP]:7350 | app     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7350/`.

## Imagens

| Serviço | Imagem                                                                                        |
| ------- | --------------------------------------------------------------------------------------------- |
| app     | baserow/baserow:2.3.3@sha256:41adb3493379403946a493f30873f743bb65b19b5f387d630ec75f41e25d5b5b |

## Fonte oficial

Projeto original: **baserow**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
