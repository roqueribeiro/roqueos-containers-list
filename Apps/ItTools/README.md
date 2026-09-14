# IT Tools

> A caixa de ferramentas de quem programa, offline

## O que é

IT Tools reúne dezenas de utilitários do dia a dia — conversor de base, gerador de hash, formatador de JSON, decodificador de JWT, gerador de QR — numa interface boa e sem mandar seus dados para fora.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço |
| ---- | --------- | --------- | ------------------ | ------- |
| 8080 | 80        | tcp       | Container Port: 80 | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

## Imagens

| Serviço | Imagem                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| app     | corentinth/it-tools:2023.11.2-7d94e11@sha256:30b032f2175e9c4dc5c795cfa44354ce7fe76d9768caee0f24a9a7371948ac0d |

## Fonte oficial

Projeto original: **corentinth**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
