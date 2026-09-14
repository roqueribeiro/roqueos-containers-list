# snapdrop

> Compartilhamento de arquivos entre plataformas feito fácil.

## O que é

Snapdrop é um aplicativo da Web progressivo (PWA) que permite transferir arquivos entre dispositivos na mesma rede sem precisar instalar nada.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve             | Serviço  |
| ---- | --------- | --------- | -------------------------- | -------- |
| 443  | 443       | tcp       | HTTPS (port 443)           | snapdrop |
| 89   | 80        | tcp       | Web interface for snapdrop | snapdrop |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço  |
| --------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/config | /config      | snapdrop |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| PGID     | $PGID        | snapdrop |
| PUID     | $PUID        | snapdrop |
| TZ       | $TZ          | snapdrop |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:89/`.

## Imagens

| Serviço  | Imagem                                |
| -------- | ------------------------------------- |
| snapdrop | linuxserver/snapdrop:version-eac78009 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
