# Readarr

> Gerenciador de coleções de livros eletrônicos e audiolivros para usuários de Usenet e BitTorrent.

## O que é

Readarr é um gerenciador de coleções de livros eletrônicos para usuários de Usenet e BitTorrent. Ele pode monitorar vários feeds RSS para obter novos livros de seus autores favoritos e interagir com clientes e indexadores para obtê-los, classificá-los e renomeá-los.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 8787 | 8787      | tcp       | —              | readarr |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | readarr |
| /DATA/Media/Books           | /books       | readarr |
| /DATA/Downloads             | /downloads   | readarr |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | $PGID        | readarr |
| PUID     | $PUID        | readarr |
| TZ       | $TZ          | readarr |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8787/`.

## Imagens

| Serviço | Imagem                             |
| ------- | ---------------------------------- |
| readarr | linuxserver/readarr:0.3.10-develop |

## Fonte oficial

Projeto original: **Readarr Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
