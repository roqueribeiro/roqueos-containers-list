# Forgejo

> Forja de software leve e auto-hospedada (fork comunitário do Gitea)

## O que é

Forgejo é uma forja de software auto-hospedada e leve — fork hard comunitário do Gitea mantido independente de propriedade corporativa. Hospedagem de código, issue tracking, pull requests, CI/CD via Forgejo Actions (runner compatível GitHub Actions), contas federadas (ActivityPub). Pegada de recurso menor que GitLab.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                           | Serviço |
| ---- | --------- | --------- | -------------------------------------------------------- | ------- |
| 8094 | 3000      | tcp       | Porta HTTP WebUI / Git (mapeada para 8094 no host)       | forgejo |
| 2222 | 22        | tcp       | Porta SSH para git push/pull (mapeada para 2222 no host) | forgejo |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container   | Serviço |
| --------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/data   | /var/lib/gitea | forgejo |
| /DATA/AppData/$AppID/config | /etc/gitea     | forgejo |
| /etc/timezone               | /etc/timezone  | forgejo |
| /etc/localtime              | /etc/localtime | forgejo |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| USER_UID | 1000         | forgejo |
| USER_GID | 1000         | forgejo |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8094/`.

- DB padrão no primeiro boot é SQLite — para >5 usuários ativos, mude para PostgreSQL/MySQL durante o install wizard.
- SSH para git push está mapeado na porta 2222: `git@seu-host:2222:user/repo.git`.
- Forgejo Actions (runner CI) exige container separado forgejo-runner — ver docs oficiais.

## Imagens

| Serviço | Imagem                             |
| ------- | ---------------------------------- |
| forgejo | codeberg.org/forgejo/forgejo:9.0.3 |

## Fonte oficial

Projeto original: **forgejo**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
