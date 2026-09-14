# Mailpit

> Caixa de e-mail falsa para testar o que seu sistema envia

## O que é

Mailpit captura o e-mail que a sua aplicação manda e mostra numa interface web, sem entregar a ninguém. É como o e-mail vai ficar, antes de sair de verdade.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                              | Serviço |
| ---- | --------- | --------- | --------------------------------------------------------------------------- | ------- |
| 8025 | 8025      | tcp       | Web interface for Mailpit                                                   | app     |
| 1025 | 1025      | tcp       | SMTP server that captures the mail your app sends, instead of delivering it | app     |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /data        | app     |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | UTC          | app     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8025/`.

## Imagens

| Serviço | Imagem                                                                                        |
| ------- | --------------------------------------------------------------------------------------------- |
| app     | axllent/mailpit:v1.30@sha256:d5ecbb067db3705fa953d79e1b7f81ef84038df67aba6c52825d8c02a1ea748a |

## Fonte oficial

Projeto original: **axllent**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
