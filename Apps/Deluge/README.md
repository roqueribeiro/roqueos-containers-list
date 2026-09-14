# Deluge

> Um cliente BitTorrent leve e gratuito.

## O que é

O Deluge contém os recursos comuns dos clientes BitTorrent, como criptografia de protocolo, DHT, descoberta de pares locais (LSD), troca de pares (PEX), UPnP, NAT-PMP, suporte a proxy, sementes web, limites globais e por torrent. Como o Deluge usa intensivamente a biblioteca libtorrent, ele possui uma lista completa das funcionalidades fornecidas.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                | Serviço |
| ---- | --------- | --------- | ----------------------------- | ------- |
| 8112 | 8112      | tcp       | WebUI HTTP Port               | deluge  |
| 6881 | 6881      | tcp       | Inbound torrent traffic (UDP) | deluge  |
| 6881 | 6881      | udp       | Inbound torrent traffic (UDP) | deluge  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | deluge  |
| /DATA                       | /DATA        | deluge  |

## Variáveis de ambiente

| Variável        | Valor padrão | Serviço |
| --------------- | ------------ | ------- |
| DELUGE_LOGLEVEL | error        | deluge  |
| PGID            | $PGID        | deluge  |
| PUID            | $PUID        | deluge  |
| TZ              | $TZ          | deluge  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8112/`.

- Default Password: `deluge`
- Default Accessible Path in Deluge
- | Name | Value |
- | --- | --- |
- | DATA Path | `/DATA` |
- | Downloads Path | `/DATA/Downloads` |
- | Media Path | `/DATA/Media` |
- The paths of other DATA subdirectories in RoqueOS are also similar.
- Please make sure you use the correct path when using Deluge.

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| deluge  | linuxserver/deluge:2.2.0 |

## Fonte oficial

Projeto original: **Deluge Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
