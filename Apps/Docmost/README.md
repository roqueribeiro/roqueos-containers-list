# Docmost

> Um wiki moderno e base de conhecimento para equipas

## O que é

O Docmost é uma ferramenta colaborativa de wiki e documentação auto-hospedada projetada para colaboração em tempo real, permitindo que múltiplos utilizadores editem a mesma página simultaneamente sem conflitos. A sua interface intuitiva é ideal para equipas que gerem bases de conhecimento, documentação de projeto ou wikis, oferecendo uma experiência eficiente de criação e partilha de conhecimento.

As funcionalidades principais da ferramenta incluem edição colaborativa em tempo real e organização de espaços. Suporta múltiplos utilizadores editando páginas em tempo real para colaboração perfeita e organiza páginas em 'espaços' para equipas, projetos ou departamentos, cada um com configurações de permissões independentes. Um editor de texto rico com atalhos Markdown simplifica a criação de conteúdo. As ferramentas integradas Draw.io, Excalidraw e Mermaid fornecem capacidades robustas de diagramas.

Oferece gestão de permissões, atribuindo acesso através de grupos de utilizadores para segurança de conteúdo. As páginas podem ser partilhadas publicamente através de links para acesso externo. Os comentários melhoram a comunicação e feedback, enquanto o histórico de páginas rastreia alterações. São suportadas funcionalidades como navegação aninhada, pesquisa rápida, anexos de ficheiros e importação/exportação Markdown/HTML. A colaboração e flexibilidade da ferramenta oferecem uma solução moderna de documentação.

**Funcionalidades Principais:**
- Edição colaborativa em tempo real para múltiplos utilizadores
- Espaços para organizar páginas por equipa, projeto ou departamento
- Gestão de permissões com controlo de acesso por grupos de utilizadores
- Editor de texto rico com atalhos Markdown
- Ferramentas de diagramas integradas Draw.io, Excalidraw, Mermaid
- Partilha pública de páginas através de links
- Comentários de página para comunicação e feedback
- Histórico de páginas, navegação aninhada, pesquisa e anexos de ficheiros

**Saber Mais:**
- [Website Oficial Docmost](https://docmost.com/)
- [Docmost GitHub](https://github.com/docmost/docmost)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço |
| ---- | --------- | --------- | ---------------- | ------- |
| 3000 | 3000      | tcp       | Porta HTTP WebUI | docmost |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container             | Serviço       |
| ---------------------------- | ------------------------ | ------------- |
| /DATA/AppData/$AppID/storage | /app/data/storage        | docmost       |
| /DATA/AppData/$AppID/pgdata  | /var/lib/postgresql/data | docmost-db    |
| /DATA/AppData/$AppID/redis   | /data                    | docmost-redis |

## Variáveis de ambiente

| Variável          | Valor padrão                                                 | Serviço    |
| ----------------- | ------------------------------------------------------------ | ---------- |
| APP_URL           | http://localhost:3000                                        | docmost    |
| APP_SECRET        | gxahngf9wc9ak9ahgpjp03zp1akcr7ry                             | docmost    |
| DATABASE_URL      | postgresql://docmost:jcui51lw747yuuk4zrpm@docmost-db:5432/do | docmost    |
| REDIS_URL         | redis://docmost-redis:6379                                   | docmost    |
| POSTGRES_DB       | docmost                                                      | docmost-db |
| POSTGRES_USER     | docmost                                                      | docmost-db |
| POSTGRES_PASSWORD | jcui51lw747yuuk4zrpm                                         | docmost-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

## Imagens

| Serviço       | Imagem                 |
| ------------- | ---------------------- |
| docmost       | docmost/docmost:0.21.0 |
| docmost-db    | postgres:16-alpine     |
| docmost-redis | redis:7.2-alpine       |

## Fonte oficial

Projeto original: **docmost**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
