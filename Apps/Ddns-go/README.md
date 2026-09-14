# ddns-go

> DNS dinâmico simples e direto

## O que é

Ferramenta de DNS dinâmico simples de usar. Atualiza sozinha o apontamento do domínio para o seu IP público, com suporte a Alibaba Cloud, Tencent Cloud, Dnspod, Cloudflare, Callback, Huawei Cloud, Baidu Cloud, Porkbun, GoDaddy e Google Domain.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 9876 | 9876      | tcp       | WebUI HTTP Port | ddns-go |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /root        | ddns-go |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9876/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| ddns-go | jeessy/ddns-go:v6.13.2 |

## Fonte oficial

Projeto original: **jeessy2**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
