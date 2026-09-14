# Nzbget

> Downloader Usenet eficiente

## O que é

O NZBGet pode ser executado em quase qualquer dispositivo - PC clássico, NAS, leitor multimídia, receptor SAT, roteador WLAN, etc. A área de download fornece binários pré-compilados para Windows, macOS, Linux (compatível com muitos CPUs e variantes de plataforma), FreeBSD e Android. Para outras plataformas, o programa pode ser compilado a partir de fontes.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 6789 | 6789      | tcp       | —              | nzbget  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/nzbget/config | /config      | nzbget  |
| /DATA/Downloads             | /downloads   | nzbget  |

## Variáveis de ambiente

| Variável    | Valor padrão  | Serviço |
| ----------- | ------------- | ------- |
| NZBGET_PASS | tegbzn6789    | nzbget  |
| NZBGET_USER | nzbget        | nzbget  |
| PGID        | 1000          | nzbget  |
| PUID        | 1000          | nzbget  |
| TZ          | Europe/London | nzbget  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6789/`.

- Default Account
- | Username | Password |
- | -------- | -------- |
- | nzbget   | tegbzn6789 |

## Imagens

| Serviço | Imagem                           |
| ------- | -------------------------------- |
| nzbget  | linuxserver/nzbget:25.4.20251205 |

## Fonte oficial

Projeto original: **Nzbget Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
