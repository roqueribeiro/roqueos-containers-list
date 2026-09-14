# OpenSpeedTest

> Servidor de teste de velocidade de rede HTML5.

## O que é

Um aplicativo para iniciar um servidor de teste de velocidade de rede HTML5. Você pode testar a velocidade de download e upload de qualquer dispositivo em sua rede com um navegador da web que seja IE10 ou superior.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, ppc64le, s390x, 386, arm.

## Portas

| Host | Container | Protocolo | Para que serve                  | Serviço       |
| ---- | --------- | --------- | ------------------------------- | ------------- |
| 3004 | 3000      | tcp       | Web interface for OpenSpeedTest | openspeedtest |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3004/`.

## Imagens

| Serviço       | Imagem                      |
| ------------- | --------------------------- |
| openspeedtest | openspeedtest/latest:v2.0.6 |

## Fonte oficial

Projeto original: https://openspeedtest.com

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
