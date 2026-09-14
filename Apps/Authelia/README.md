# Authelia

> Portal open-source de autenticação 2FA e SSO

## O que é

Authelia é um servidor open-source de autenticação e autorização que fornece 2FA e SSO para suas aplicações via portal web. Funciona junto com reverse proxies (Nginx, Traefik, Caddy, HAProxy) — cada requisição passa pelo Authelia para verificação antes de chegar na aplicação protegida.

Categoria na App Store do RoqueOS: **Security**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve                  | Serviço  |
| ---- | --------- | --------- | ------------------------------- | -------- |
| 9091 | 9091      | tcp       | Porta da interface web / portal | authelia |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço  |
| -------------------- | ------------ | -------- |
| /DATA/AppData/$AppID | /config      | authelia |

## Variáveis de ambiente

| Variável | Valor padrão      | Serviço  |
| -------- | ----------------- | -------- |
| TZ       | America/Sao_Paulo | authelia |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9091/`.

- Authelia exige um configuration.yml em /config com no mínimo: jwt_secret, default_redirection_url, authentication_backend, regras access_control, session, regulation, storage e notifier.
- Exemplo mínimo: https://www.authelia.com/configuration/
- Integre com Nginx Proxy Manager (já no catálogo) usando auth_request.

## Imagens

| Serviço  | Imagem                    |
| -------- | ------------------------- |
| authelia | authelia/authelia:4.38.17 |

## Fonte oficial

Projeto original: **authelia**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
