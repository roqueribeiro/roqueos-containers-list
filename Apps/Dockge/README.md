# Dockge

> Gerenciador de stacks docker compose, bonito e direto

## O que é

Dockge é um gerenciador de stacks do docker compose com interface reativa. Edita o compose pela tela, sobe, derruba e acompanha o log de cada stack sem sair do navegador.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve           | Serviço |
| ---- | --------- | --------- | ------------------------ | ------- |
| 5001 | 5001      | tcp       | Web interface for Dockge | app     |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container                | Serviço |
| --------------------------- | --------------------------- | ------- |
| /var/run/docker.sock        | /var/run/docker.sock        | app     |
| /DATA/AppData/$AppID/data   | /app/data                   | app     |
| /DATA/AppData/$AppID/stacks | /DATA/AppData/$AppID/stacks | app     |

## Variáveis de ambiente

| Variável          | Valor padrão                | Serviço |
| ----------------- | --------------------------- | ------- |
| DOCKGE_STACKS_DIR | /DATA/AppData/$AppID/stacks | app     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5001/`.

## Imagens

| Serviço | Imagem                                                                                        |
| ------- | --------------------------------------------------------------------------------------------- |
| app     | louislam/dockge:1.5.0@sha256:335c6368b880ecc203236ed89e6e5232e0d6578e8ef5920e4a502390451502bf |

## Fonte oficial

Projeto original: **louislam**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
