# SearXNG

> Mecanismo de meta-busca focado em privacidade

## O que é

O SearXNG é um meta-mecanismo de busca grátis que agrega resultados de até 229 serviços de pesquisa. Os usuários não são rastreados nem perfilados.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 8080 | 8080      | tcp       | Porta da interface web | searxng |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço |
| -------------------- | ------------ | ------- |
| /DATA/AppData/$AppID | /etc/searxng | searxng |

## Variáveis de ambiente

| Variável         | Valor padrão           | Serviço |
| ---------------- | ---------------------- | ------- |
| SEARXNG_BASE_URL | http://localhost:8080/ | searxng |
| INSTANCE_NAME    | roqueos-searxng        | searxng |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

- SearXNG agrega resultados de vários mecanismos sem rastrear o usuário.
- Porta padrão 8080. Edite /etc/searxng/settings.yml após o primeiro boot para ajustes (mecanismos customizados, branding, nome da instância).

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem                              |
| ------- | ----------------------------------- |
| searxng | searxng/searxng:2026.9.14-ef05645f0 |

## Fonte oficial

Projeto original: **searxng**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
