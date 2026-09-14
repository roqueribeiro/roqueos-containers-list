# Lazylibrarian

> eBook Auto Downloader

## O que é

Lazylibrarian é um programa para seguir autores e obter metadados para todas as suas necessidades de leitura digital. Usa uma combinação de Goodreads Librarything e opcionalmente GoogleBooks como fontes de informações do autor e do livro. Este contêiner é baseado no fork DobyTang.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço       |
| ---- | --------- | --------- | -------------- | ------------- |
| 5299 | 5299      | tcp       | —              | lazylibrarian |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                            | No container | Serviço       |
| ---------------------------------- | ------------ | ------------- |
| /DATA/Downloads                    | /downloads   | lazylibrarian |
| /DATA/Media/Books                  | /books       | lazylibrarian |
| /DATA/AppData/lazylibrarian/config | /config      | lazylibrarian |

## Variáveis de ambiente

| Variável    | Valor padrão                                                 | Serviço       |
| ----------- | ------------------------------------------------------------ | ------------- |
| DOCKER_MODS | linuxserver/calibre-web:calibre|linuxserver/mods:lazylibrari | lazylibrarian |
| PGID        | $PGID                                                        | lazylibrarian |
| PUID        | $PUID                                                        | lazylibrarian |
| TZ          | $TZ                                                          | lazylibrarian |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5299/`.

## Imagens

| Serviço       | Imagem                                     |
| ------------- | ------------------------------------------ |
| lazylibrarian | linuxserver/lazylibrarian:version-169e669f |

## Fonte oficial

Projeto original: **Lazylibrarian Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
