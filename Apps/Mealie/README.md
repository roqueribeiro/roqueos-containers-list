# Mealie

> Gerenciador de receitas e planejador semanal de refeições, auto-hospedado

## O que é

Mealie é um gerenciador de receitas e planejador de refeições auto-hospedado com UI bonita. Importa receitas de qualquer URL com um clique (suporta 100+ sites de receitas), planeja refeições semanais, gera listas de compras, escala ingredientes, armazena timers de cozinha. Mobile-friendly. Integração opcional Open Food Facts para dados nutricionais.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 9095 | 9000      | tcp       | Porta da interface web (mapeada para 9095 no host) | mealie  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /app/data    | mealie  |

## Variáveis de ambiente

| Variável        | Valor padrão          | Serviço |
| --------------- | --------------------- | ------- |
| ALLOW_SIGNUP    | false                 | mealie  |
| PUID            | 1000                  | mealie  |
| PGID            | 1000                  | mealie  |
| TZ              | America/Sao_Paulo     | mealie  |
| MAX_WORKERS     | 1                     | mealie  |
| WEB_CONCURRENCY | 1                     | mealie  |
| BASE_URL        | http://localhost:9095 | mealie  |
| DEFAULT_GROUP   | Home                  | mealie  |
| DEFAULT_EMAIL   | changeme@example.com  | mealie  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9095/`.

- O primeiro usuário criado via signup é o admin (depois mude ALLOW_SIGNUP=false para travar).
- Ou: pré-crie o usuário via variáveis DEFAULT_EMAIL + DEFAULT_GROUP.
- Para >5 usuários ativos, mude do SQLite padrão para PostgreSQL — ver docs.

## Imagens

| Serviço | Imagem                               |
| ------- | ------------------------------------ |
| mealie  | ghcr.io/mealie-recipes/mealie:v2.5.0 |

## Fonte oficial

Projeto original: **mealie-recipes**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
