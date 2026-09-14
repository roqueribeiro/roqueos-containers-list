# Transmission

> Transmission é um cliente BitTorrent multiplataforma

## O que é

Transmission é um cliente BitTorrent projetado para simplicidade e desempenho poderoso, proporcionando uma experiência de download eficiente e amigável. Ele vem equipado com todas as funcionalidades essenciais que você espera, incluindo encriptação, uma interface web, troca de peers, links magnéticos, DHT, µTP, encaminhamento de portas UPnP e NAT-PMP, suporte a webseed, diretórios de vigilância, edição de trackers, limites de velocidade globais e por torrent, e muito mais.

Com sua interface intuitiva, Transmission atende tanto a iniciantes quanto a utilizadores avançados. Seja gerindo um único download ou lidando com filas complexas de torrents, Transmission garante uma experiência fluida com uso otimizado de recursos e desempenho confiável. Para utilizadores casuais e entusiastas da tecnologia, Transmission é a solução BitTorrent ideal。


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                                                   | Serviço      |
| ----- | --------- | --------- | ---------------------------------------------------------------- | ------------ |
| 9091  | 9091      | tcp       | Web interface for Transmission                                   | transmission |
| 51413 | 51413     | tcp       | BitTorrent peer port: forward it on the router for better speeds | transmission |
| 51413 | 51413     | udp       | BitTorrent peer port: forward it on the router for better speeds | transmission |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço      |
| --------------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID/config | /config      | transmission |
| /DATA/Downloads             | /downloads   | transmission |
| /DATA/Downloads/watch       | /watch       | transmission |

## Variáveis de ambiente

| Variável | Valor padrão  | Serviço      |
| -------- | ------------- | ------------ |
| PASS     | roqueos       | transmission |
| PEERPORT | 51413         | transmission |
| PGID     | 1000          | transmission |
| PUID     | 1000          | transmission |
| TZ       | Europe/London | transmission |
| USER     | roqueos       | transmission |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9091/`.

- | nome de utilizador | palavra-passe |
- | ----------------- | ------------- |
- | `roqueos` | `roqueos` |

## Imagens

| Serviço      | Imagem                         |
| ------------ | ------------------------------ |
| transmission | linuxserver/transmission:4.0.4 |

## Fonte oficial

Projeto original: **Transmission**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
