# PocketBase

> Backend open source em tempo real em um único arquivo

## O que é

PocketBase é uma solução de backend de código aberto que combina um banco de dados em tempo real, autenticação, armazenamento de arquivos e um painel de administração em um único executável portátil.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço    |
| ---- | --------- | --------- | ---------------------------- | ---------- |
| 8090 | 8090      | tcp       | Web interface for PocketBase | pocketbase |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço    |
| ---------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/pb_data | /pb_data     | pocketbase |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8090/_/`.

- Conta Padrão
- | Email | Senha |
- | ----- | -------- |
- | `roqueos@admin.local` | `adminpocketbase` |

## Imagens

| Serviço    | Imagem                     |
| ---------- | -------------------------- |
| pocketbase | argonptg/pocketbase:0.25.9 |

## Fonte oficial

Projeto original: **Gani Georgiev**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
