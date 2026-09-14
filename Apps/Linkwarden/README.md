# Linkwarden

> Gerenciador colaborativo de bookmarks auto-hospedado com arquivamento de página completa

## O que é

Linkwarden é um gerenciador de bookmarks colaborativo, auto-hospedável e open-source que preserva as páginas que você salva arquivando como screenshots, PDFs e conteúdo full-text. Tagging com IA, coleções e busca full-text em todo o seu arquivo.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço    |
| ---- | --------- | --------- | ---------------------- | ---------- |
| 3000 | 3000      | tcp       | Porta da interface web | linkwarden |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container             | Serviço    |
| ----------------------------- | ------------------------ | ---------- |
| /DATA/AppData/$AppID/postgres | /var/lib/postgresql/data | postgres   |
| /DATA/AppData/$AppID/data     | /data/data               | linkwarden |

## Variáveis de ambiente

| Variável          | Valor padrão                                                 | Serviço    |
| ----------------- | ------------------------------------------------------------ | ---------- |
| POSTGRES_DB       | linkwarden                                                   | postgres   |
| POSTGRES_USER     | linkwarden                                                   | postgres   |
| POSTGRES_PASSWORD | change-me-to-a-long-random-string                            | postgres   |
| DATABASE_URL      | postgresql://linkwarden:change-me-to-a-long-random-string@po | linkwarden |
| NEXTAUTH_SECRET   | replace-with-output-of-openssl-rand-hex-32                   | linkwarden |
| NEXTAUTH_URL      | http://localhost:3000/api/v1/auth                            | linkwarden |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

- ANTES DO PRIMEIRO BOOT:
- 1. Substitua POSTGRES_PASSWORD E a senha em DATABASE_URL (devem ser iguais) por uma string aleatória longa.
- 2. Substitua NEXTAUTH_SECRET pela saída de `openssl rand -hex 32`.
- 3. Configure NEXTAUTH_URL com a URL pública onde vai acessar o Linkwarden (deve bater exatamente, incluindo http/https).

## Imagens

| Serviço    | Imagem                                |
| ---------- | ------------------------------------- |
| postgres   | postgres:16-alpine                    |
| linkwarden | ghcr.io/linkwarden/linkwarden:v2.10.2 |

## Fonte oficial

Projeto original: **linkwarden**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
