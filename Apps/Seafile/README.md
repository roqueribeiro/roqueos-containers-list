# Seafile

> Sync de arquivos auto-hospedado de alta performance com criptografia client-side

## O que é

Seafile é uma solução de sync e compartilhamento de arquivos auto-hospedada de alta performance, focada em confiabilidade e desempenho. Armazena arquivos em bibliotecas (versionadas), criptografia AES-256 client-side, apps de sync mobile + desktop para todas as plataformas principais, integração server-side OnlyOffice/Collabora, permissões granulares por biblioteca e pasta.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8100 | 80        | tcp       | Porta da interface web (mapeada para 8100 no host) | seafile |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container   | Serviço |
| ------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/db   | /var/lib/mysql | db      |
| /DATA/AppData/$AppID/data | /shared        | seafile |

## Variáveis de ambiente

| Variável                   | Valor padrão              | Serviço |
| -------------------------- | ------------------------- | ------- |
| MYSQL_ROOT_PASSWORD        | ${MYSQL_ROOT_PASSWORD}    | db      |
| MYSQL_LOG_CONSOLE          | true                      | db      |
| MARIADB_AUTO_UPGRADE       | 1                         | db      |
| DB_HOST                    | db                        | seafile |
| DB_ROOT_PASSWD             | ${MYSQL_ROOT_PASSWORD}    | seafile |
| TIME_ZONE                  | America/Sao_Paulo         | seafile |
| SEAFILE_ADMIN_EMAIL        | admin@example.com         | seafile |
| SEAFILE_ADMIN_PASSWORD     | ${SEAFILE_ADMIN_PASSWORD} | seafile |
| SEAFILE_SERVER_HOSTNAME    | localhost                 | seafile |
| SEAFILE_SERVER_LETSENCRYPT | false                     | seafile |
| JWT_PRIVATE_KEY            | ${JWT_PRIVATE_KEY}        | seafile |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8100/`.

- ANTES DO PRIMEIRO BOOT:
- 1. MYSQL_ROOT_PASSWORD (usada também como DB_ROOT_PASSWD) e JWT_PRIVATE_KEY são gerados pelo RoqueOS na instalação, únicos para este servidor.
- 2. A senha do admin (login SEAFILE_ADMIN_EMAIL) também é gerada e aparece uma vez logo depois de instalar: guarde-a.
- 3. Configure SEAFILE_SERVER_HOSTNAME com seu domínio real. Com SEAFILE_SERVER_LETSENCRYPT=true, Seafile emite certs automaticamente (só funciona se o domínio aponta para este servidor).
- 4. Combine com OnlyOffice ou Collabora (já no catálogo) para edição de documentos no navegador.

> **Senha gerada.** O RoqueOS gera a senha de acesso para o seu servidor na instalação e a mostra uma vez, logo depois de instalar. Guarde.

## Imagens

| Serviço   | Imagem                        |
| --------- | ----------------------------- |
| db        | mariadb:10.11                 |
| memcached | memcached:1.6.18              |
| seafile   | seafileltd/seafile-mc:11.0.13 |

## Fonte oficial

Projeto original: **haiwen**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
