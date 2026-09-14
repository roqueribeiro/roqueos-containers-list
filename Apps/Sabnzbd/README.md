# Sabnzbd

> Leitor de notícias binárias gratuito e fácil de usar

## O que é

O SABnzbd é um leitor de notícias binárias de código aberto escrito em Python. É totalmente gratuito, fácil de usar e funciona praticamente em qualquer lugar. O SABnzbd torna o Usenet o mais simples e eficiente possível, automatizando tudo o que podemos fazer. Tudo o que você precisa fazer é adicionar um .nzb. O SABnzbd assume o controle de lá, onde será baixado automaticamente, verificado, reparado, extraído e arquivado sem intervenção humana. O SABnzbd oferece um assistente de configuração fácil e possui ferramentas de análise autônomas para verificar sua configuração.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve            | Serviço |
| ---- | --------- | --------- | ------------------------- | ------- |
| 8282 | 8080      | tcp       | Web interface for Sabnzbd | sabnzbd |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container          | Serviço |
| ---------------------------- | --------------------- | ------- |
| /DATA/Downloads              | /incomplete-downloads | sabnzbd |
| /DATA/AppData/sabnzbd/config | /config               | sabnzbd |
| /DATA/Downloads              | /downloads            | sabnzbd |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço |
| -------- | ------------- | ------- |
| PGID     | 1000          | sabnzbd |
| PUID     | 1000          | sabnzbd |
| TZ       | Europe/London | sabnzbd |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8282/`.

## Imagens

| Serviço | Imagem                    |
| ------- | ------------------------- |
| sabnzbd | linuxserver/sabnzbd:4.1.0 |

## Fonte oficial

Projeto original: **Sabnzbd Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
