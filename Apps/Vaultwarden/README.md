# Vaultwarden

> Um servidor Bitwarden auto-hospedado

## O que é

Implementação alternativa da API do servidor Bitwarden escrita em Rust e compatível com os clientes Bitwarden superiores *, perfeita para implantação auto-hospedada em que a execução do serviço oficial pesado em recursos pode não ser ideal.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço     |
| ----- | --------- | --------- | --------------- | ----------- |
| 10380 | 80        | tcp       | WebUI HTTP Port | vaultwarden |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço     |
| ------------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID/data | /data        | vaultwarden |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:10380/`.

## Imagens

| Serviço     | Imagem                    |
| ----------- | ------------------------- |
| vaultwarden | vaultwarden/server:1.32.7 |

## Fonte oficial

Projeto original: https://github.com/dani-garcia/vaultwarden

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
