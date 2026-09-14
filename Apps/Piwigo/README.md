# Piwigo

> CMS de galeria de fotos com 350+ plugins (desde 2002)

## O que é

Piwigo é um CMS para galerias de fotos — open-source desde 2002, usado por fotógrafos, famílias, escolas, museus e organizações. Hierarquia de álbuns, tags, busca, EXIF, avaliações, comentários, temas customizáveis, apps mobile, ecossistema de plugins com 350+ extensões.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 8087 | 80        | tcp       | Porta da interface web | piwigo  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço |
| ---------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config  | /config      | piwigo  |
| /DATA/AppData/$AppID/gallery | /gallery     | piwigo  |

## Variáveis de ambiente

| Variável | Valor padrão      | Serviço |
| -------- | ----------------- | ------- |
| PUID     | 1000              | piwigo  |
| PGID     | 1000              | piwigo  |
| TZ       | America/Sao_Paulo | piwigo  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8087/`.

- Banco padrão é SQLite via MariaDB interno. No primeiro boot, o instalador pede para criar a conta admin em http://SEU_IP:8087.
- Para bibliotecas maiores (10000+ fotos), configure MariaDB/MySQL externo no passo de banco do instalador.

## Imagens

| Serviço | Imagem                    |
| ------- | ------------------------- |
| piwigo  | linuxserver/piwigo:14.5.0 |

## Fonte oficial

Projeto original: **Piwigo**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
