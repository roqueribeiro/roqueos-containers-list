# SnappyMail

> Webmail rápido e moderno com suporte PGP (cliente IMAP/SMTP)

## O que é

SnappyMail é um webmail rápido, simples e moderno com suporte a criptografia PGP/OpenPGP. Conecta a qualquer servidor IMAP/SMTP/Sieve (seu próprio mailcow, Postfix, Mailcow, ou Gmail/Outlook externo). Compatível com PWA, dark mode, ecossistema de plugins, drag-drop de anexos, autenticação de dois fatores.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço    |
| ---- | --------- | --------- | ---------------------- | ---------- |
| 8888 | 8888      | tcp       | Porta da interface web | snappymail |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container        | Serviço    |
| -------------------- | ------------------- | ---------- |
| /DATA/AppData/$AppID | /var/lib/snappymail | snappymail |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8888/`.

- No primeiro boot, faça login com as credenciais admin exibidas nos logs do container (ou acesse /?admin e use-as).
- Configure seus servidores IMAP/SMTP no painel admin antes dos usuários comuns entrarem.
- Para setups multi-domínio, adicione cada domínio no painel Domains.

## Imagens

| Serviço    | Imagem                    |
| ---------- | ------------------------- |
| snappymail | djmaze/snappymail:v2.38.2 |

## Fonte oficial

Projeto original: **the-djmaze**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
