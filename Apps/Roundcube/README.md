# Roundcube

> Cliente webmail auto-hospedado mais usado (IMAP)

## O que é

Roundcube é um cliente IMAP multilíngue baseado em navegador, com UI AJAX que simula um cliente desktop. Recursos incluem drag-and-drop de anexos, agenda com import de vCard, threading de mensagens, composição HTML completa, corretor ortográfico e API de plugins. O webmail auto-hospedado mais usado atualmente.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço   |
| ---- | --------- | --------- | -------------------------------------------------- | --------- |
| 8092 | 80        | tcp       | Porta da interface web (mapeada para 8092 no host) | roundcube |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                  | No container      | Serviço   |
| ------------------------ | ----------------- | --------- |
| /DATA/AppData/$AppID/www | /var/www/html     | roundcube |
| /DATA/AppData/$AppID/db  | /var/roundcube/db | roundcube |

## Variáveis de ambiente

| Variável                   | Valor padrão                               | Serviço   |
| -------------------------- | ------------------------------------------ | --------- |
| ROUNDCUBEMAIL_DEFAULT_HOST | ssl://imap.example.com                     | roundcube |
| ROUNDCUBEMAIL_DEFAULT_PORT | 993                                        | roundcube |
| ROUNDCUBEMAIL_SMTP_SERVER  | tls://smtp.example.com                     | roundcube |
| ROUNDCUBEMAIL_SMTP_PORT    | 587                                        | roundcube |
| ROUNDCUBEMAIL_DB_TYPE      | sqlite                                     | roundcube |
| ROUNDCUBEMAIL_PLUGINS      | archive,zipdownload,managesieve,markasjunk | roundcube |
| ROUNDCUBEMAIL_SKIN         | elastic                                    | roundcube |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8092/`.

- ANTES DO PRIMEIRO BOOT:
- 1. Configure ROUNDCUBEMAIL_DEFAULT_HOST com seu servidor IMAP real (ssl://imap.seudominio.com ou apenas imap.seudominio.com).
- 2. Configure ROUNDCUBEMAIL_SMTP_SERVER similarmente.
- 3. DB padrão é SQLite (single user). Para >5 usuários, mude para PostgreSQL/MySQL via ROUNDCUBEMAIL_DB_TYPE/HOST/etc.

## Imagens

| Serviço   | Imagem                                   |
| --------- | ---------------------------------------- |
| roundcube | roundcube/roundcubemail:1.6.9-fpm-alpine |

## Fonte oficial

Projeto original: **roundcube**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
