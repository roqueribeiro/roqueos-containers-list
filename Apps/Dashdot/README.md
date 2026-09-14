# Dashdot

> Painel moderno do servidor, para servidor pequeno

## O que é

dash. é um painel simples e moderno do estado do servidor: CPU, memória, disco, rede e temperatura numa tela só. Feito para servidor doméstico, não para datacenter.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço |
| ---- | --------- | --------- | -------------------- | ------- |
| 3001 | 3001      | tcp       | Container Port: 3001 | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço |
| -------------------- | ------------ | ------- |
| /DATA/AppData/$AppID | /mnt/host    | app     |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3001/`.

### Por que este app pede privilégio

- `privileged`: le sensores de temperatura e estado dos discos direto do host

## Imagens

| Serviço | Imagem                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------- |
| app     | mauricenino/dashdot:6.3.4@sha256:434a54d2937411a06b09c50e55709cc7d3b092c0fe173a9e5c986f9b5a33c7c6 |

## Fonte oficial

Projeto original: **mauricenino**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
