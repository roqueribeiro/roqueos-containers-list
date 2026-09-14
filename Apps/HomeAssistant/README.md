# Home Assistant

> Automatização doméstica de código aberto que prioriza o controlo local e a privacidade.

## O que é

Home Assistant é uma aplicação de gestão de casa inteligente que prioriza o controlo local e a privacidade de dados, gerindo dispositivos através de uma interface intuitiva com dados armazenados localmente, eliminando a dependência da nuvem. As suas funcionalidades robustas e o apoio da comunidade tornam-na ideal para entusiastas DIY e utilizadores domésticos que criam experiências domésticas personalizadas.

As funcionalidades principais da aplicação incluem painéis personalizáveis, automatizações poderosas e um assistente de voz. Os painéis suportam personalização arrastar e largar, com vários tipos de cartões para exibir dados e controlar dispositivos como luzes ou sensores. Oferece um motor de automatização avançado, como acender luzes ao pôr do sol ou alertar utilizadores sobre uma porta de garagem aberta. O assistente de voz Assist permite controlo em linguagem natural, compatível com telefones, tablets, smartwatches e até telefones tradicionais, permitindo aos utilizadores personalizar interações e experimentar com conversas AI para atender diversas necessidades.

Estende a funcionalidade através de complementos, suportando ferramentas como AdGuard para bloqueio de anúncios, NodeRed para automatizações de terceiros, ou transformar dispositivos em alvos Spotify Connect. A gestão de energia doméstica otimiza a produção solar e o planeamento de uso para poupar custos. Home Assistant Cast transforma TVs em ecrãs de painel, e etiquetas NFC acionam reprodução musical ou automatizações de rotina. A documentação da comunidade ajuda na configuração, com processamento local de dados garantindo privacidade, adequada para gestão de casa inteligente doméstica ou pequena equipa.

**Características Principais:**
- Armazenamento local de dados, priorizando privacidade
- Painéis personalizáveis arrastar e largar para controlo de dispositivos e exibição de dados
- Automatizações avançadas para acionar eventos de casa inteligente
- Assistente de voz Assist para controlo em linguagem natural
- Complementos para integrar AdGuard, NodeRed e mais
- Gestão de energia doméstica para uso otimizado e poupança de custos
- Home Assistant Cast para ecrãs de painel de TV
- Etiquetas NFC para acionar música ou tarefas de automatização

**Saiba mais:**
- [Site Oficial Home Assistant](https://www.home-assistant.io)
- [Repositório GitHub Home Assistant](https://github.com/home-assistant/core)
- [Documentação Home Assistant](https://www.home-assistant.io/docs)
- [Comunidade Home Assistant](https://community.home-assistant.io)
- [Complementos Home Assistant](https://www.home-assistant.io/addons)


Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container   | Serviço       |
| --------------------------- | -------------- | ------------- |
| /DATA/AppData/$AppID/config | /config        | homeassistant |
| /etc/localtime              | /etc/localtime | homeassistant |
| /run/dbus                   | /run/dbus      | homeassistant |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço       |
| -------- | ------------ | ------------- |
| PGID     | $PGID        | homeassistant |
| PUID     | $PUID        | homeassistant |
| TZ       | $TZ          | homeassistant |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8123/`.

### Por que este app pede privilégio

- `privileged`: acesso a rádios USB (Zigbee, Z-Wave) e descoberta na rede local
- `networkHost`: descoberta de dispositivos por mDNS, SSDP e DHCP na rede local

## Imagens

| Serviço       | Imagem                               |
| ------------- | ------------------------------------ |
| homeassistant | homeassistant/home-assistant:2025.11 |

## Fonte oficial

Projeto original: **Home Assistant**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
