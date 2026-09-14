# Vikunja

> App de to-do auto-hospedado com kanban, gantt e CalDAV

## O que é

Vikunja é o app de to-do open-source e auto-hospedável — como Todoist mas seu. Múltiplas views (lista, gantt, kanban, tabela), tarefas recorrentes, lembretes via email/Telegram/Discord, compartilhamento por times ou links, apps mobile/desktop, API REST completa, sincronização CalDAV. Frontend Vue, backend Go.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço |
| ---- | --------- | --------- | ---------------------------- | ------- |
| 3456 | 3456      | tcp       | Porta da interface web + API | vikunja |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container       | Serviço |
| --------------------------- | ------------------ | ------- |
| /DATA/AppData/$AppID/files  | /app/vikunja/files | vikunja |
| /DATA/AppData/$AppID/config | /etc/vikunja       | vikunja |

## Variáveis de ambiente

| Variável                  | Valor padrão                               | Serviço |
| ------------------------- | ------------------------------------------ | ------- |
| VIKUNJA_SERVICE_PUBLICURL | http://localhost:3456                      | vikunja |
| VIKUNJA_SERVICE_JWTSECRET | replace-with-output-of-openssl-rand-hex-32 | vikunja |
| VIKUNJA_DATABASE_TYPE     | sqlite                                     | vikunja |
| VIKUNJA_DATABASE_PATH     | /app/vikunja/files/vikunja.db              | vikunja |
| VIKUNJA_FILES_BASEPATH    | /app/vikunja/files                         | vikunja |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3456/`.

- SUBSTITUA VIKUNJA_SERVICE_JWTSECRET antes do primeiro boot. Gere com `openssl rand -hex 32`.
- Configure VIKUNJA_SERVICE_PUBLICURL com sua URL pública — necessário para emails de reset de senha e OAuth.
- O primeiro usuário criado via signup é o admin (depois desative signup em config.yml se for privado).

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| vikunja | vikunja/vikunja:0.24.6 |

## Fonte oficial

Projeto original: **kolaente**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
