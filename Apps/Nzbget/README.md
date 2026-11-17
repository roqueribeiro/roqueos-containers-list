# Nzbget

> Downloader Usenet eficiente

## O que é

O NZBGet pode ser executado em quase qualquer dispositivo - PC clássico, NAS, leitor multimídia, receptor SAT, roteador WLAN, etc. A área de download fornece binários pré-compilados para Windows, macOS, Linux (compatível com muitos CPUs e variantes de plataforma), FreeBSD e Android. Para outras plataformas, o programa pode ser compilado a partir de fontes.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve           | Serviço |
| ---- | --------- | --------- | ------------------------ | ------- |
| 6789 | 6789      | tcp       | Web interface for Nzbget | nzbget  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/nzbget/config | /config      | nzbget  |
| /DATA/Downloads             | /downloads   | nzbget  |

## Variáveis de ambiente

| Variável    | Valor padrão   | Serviço |
| ----------- | -------------- | ------- |
| NZBGET_PASS | ${NZBGET_PASS} | nzbget  |
| NZBGET_USER | nzbget         | nzbget  |
| PGID        | 1000           | nzbget  |
| PUID        | 1000           | nzbget  |
| TZ          | Europe/London  | nzbget  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6789/`.

- Usuário: `nzbget`
- A senha é gerada pelo RoqueOS na instalação, única para este servidor, e aparece uma vez logo depois de instalar: guarde-a.

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
