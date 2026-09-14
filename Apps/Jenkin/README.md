# Jenkins CI/CD

> Servidor de Integração Contínua e Entrega Jenkins.

## O que é

Um servidor para criar pipelines para integração e entrega contínua do Jenkins.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 8080 | 8080      | tcp       | —              | jenkins |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                                                                        | No container      | Serviço |
| ---------------------------------------------------------------------------------------------- | ----------------- | ------- |
| /DATA/AppData/Jenkins/data                                                                     | /data             | jenkins |
| /var/lib/docker/volumes/b098c98b2c5dec792246dc33375853c05958ace7c144f4aa157326a6f6c0de4c/_data | /var/jenkins_home | jenkins |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

## Imagens

| Serviço | Imagem                    |
| ------- | ------------------------- |
| jenkins | jenkins/jenkins:lts-jdk17 |

## Fonte oficial

Projeto original: **bepp-boop**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
