# PsiTransfer

> Compartilhamento de arquivo simples, sem cadastro

## O que é

PsiTransfer é um serviço de compartilhamento de arquivo de código aberto para rodar no seu servidor. Manda arquivo com segurança e sem ninguém precisar criar conta.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                | Serviço     |
| ----- | --------- | --------- | ----------------------------- | ----------- |
| 13001 | 3000      | tcp       | Porta da interface Web e API. | psitransfer |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço     |
| ------------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID/data | /data        | psitransfer |

## Variáveis de ambiente

| Variável               | Valor padrão            | Serviço     |
| ---------------------- | ----------------------- | ----------- |
| PSITRANSFER_ADMIN_PASS | change-me-on-first-boot | psitransfer |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:13001/`.

## Imagens

| Serviço     | Imagem                     |
| ----------- | -------------------------- |
| psitransfer | psitrax/psitransfer:v2.4.1 |

## Fonte oficial

Projeto original: **psitrax**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
