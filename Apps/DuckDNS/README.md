# duckdns

> DNS dinâmico para seu domínio, suportando IPv4 e IPv6

## O que é

duckdns é um aplicativo DDNS (DNS dinâmico) que vincula dinamicamente endereços IP a nomes de domínio, suportando IPv4 e IPv6.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host               | No container | Serviço |
| --------------------- | ------------ | ------- |
| /DATA/AppData/duckdns | /config      | duckdns |

## Variáveis de ambiente

| Variável   | Valor padrão          | Serviço |
| ---------- | --------------------- | ------- |
| PUID       | 1000                  | duckdns |
| PGID       | 1000                  | duckdns |
| TZ         | Etc/UTC               | duckdns |
| SUBDOMAINS | subdomain1,subdomain2 | duckdns |
| TOKEN      | token                 | duckdns |
| UPDATE_IP  | ipv6                  | duckdns |
| LOG_FILE   | false                 | duckdns |

## Primeiro acesso

Abra o app pelo ícone no RoqueOS depois de instalar.

- Attention Please
- Will update IPv6 address by default. You can modify it by settings.
- Please register sub-domain on https://www.duckdns.org/ and gain your token.

### Por que este app pede privilégio

- `networkHost`: precisa do IP público real do host, não do IP da bridge

## Imagens

| Serviço | Imagem                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------- |
| duckdns | lscr.io/linuxserver/duckdns@sha256:ae24f435009cfa7be1da3ac572b66248b045072f0b4dde97c4b2818bf9a70d57 |

## Fonte oficial

Projeto original: **DuckDNS Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
