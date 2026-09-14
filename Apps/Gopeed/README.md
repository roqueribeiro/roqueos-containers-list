# Gopeed

> Código aberto, leve, nativo, suporta (HTTP, BitTorrent, Magnet, etc.) para descarregamento.

## O que é

O Gopeed é uma ferramenta moderna de descarregamento de alta velocidade que suporta protocolos HTTP, BitTorrent e Magnet, oferecendo uma interface bonita e funcionalidade poderosa. O seu design leve e suporte multiplataforma tornam-no ideal para descarregamento eficiente de ficheiros em vários dispositivos.

As funcionalidades principais da ferramenta incluem descarregamento de alta velocidade e uma interface elegante. Aproveita as corrotinas Golang para descarregamento simultâneo, suportando protocolos HTTP, HTTPS, BitTorrent e Magnet para desempenho rápido e estável. A interface segue os padrões Material Design, incluindo um modo escuro, equilibrando estética e usabilidade. As funcionalidades avançadas incluem seeding, DHT, PEX, uTP, Webtorrent e suporte UPnP, com actualizações diárias automáticas da lista de trackers para melhorar a eficiência dos descarregamentos.

Fornece uma API RESTful para integração aberta, permitindo aos utilizadores controlar remotamente tarefas de descarregamento, pausá-las ou eliminá-las. As extensões descentralizadas permitem plugins JavaScript para melhorar a funcionalidade, como descarregar vídeos ou música de websites. A velocidade, flexibilidade e design amigável da ferramenta oferecem uma solução moderna de descarregamento.

**Funcionalidades Principais:**
- Descarregamento de alta velocidade com protocolos HTTP, BitTorrent, Magnet
- Seeding, DHT, PEX, uTP, Webtorrent, UPnP
- Actualizações diárias automáticas da lista de trackers
- API RESTful para controlo remoto de tarefas de descarregamento
- Extensões descentralizadas com plugins JavaScript

**Saber Mais:**
- [Website Oficial Gopeed](https://gopeed.com)
- [Repositório GitHub Gopeed](https://github.com/gopeedlab/gopeed)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço |
| ---- | --------- | --------- | ---------------- | ------- |
| 9999 | 9999      | tcp       | Porta HTTP WebUI | gopeed  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container   | Serviço |
| ------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/data | /app/storage   | gopeed  |
| /DATA/Downloads           | /app/Downloads | gopeed  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9999/`.

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| gopeed  | liwei2633/gopeed:v1.8.3 |

## Fonte oficial

Projeto original: **GopeedLab**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
