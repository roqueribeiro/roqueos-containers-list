# Home Assistant

> Open source home automation that puts local control and privacy first.

## O que é

Home Assistant is a smart home management app prioritizing local control and data privacy, managing devices through an intuitive interface with data stored locally, eliminating cloud dependency. Its robust features and community support make it ideal for DIY enthusiasts and home users creating personalized home experiences.

The app's core features include customizable dashboards, powerful automations, and a voice assistant. Dashboards support drag-and-drop customization, with various card types to display data and control devices like lights or sensors. It offers an advanced automation engine, such as turning on lights at sunset or alerting users to an open garage door. The Assist voice assistant enables natural language control, compatible with phones, tablets, smartwatches, and even traditional telephones, allowing users to customize interactions and experiment with AI conversations to meet diverse needs.

It extends functionality through add-ons, supporting tools like AdGuard for ad blocking, NodeRed for third-party automations, or turning devices into Spotify Connect targets. Home energy management optimizes solar production and usage planning to save costs. Home Assistant Cast transforms TVs into dashboard displays, and NFC tags trigger music playback or routine automations. Community documentation aids configuration, with local data processing ensuring privacy, suitable for home or small team smart home management.

**Key Features:**
- Local data storage, prioritizing privacy
- Drag-and-drop customizable dashboards for device control and data display
- Advanced automations for triggering smart home events
- Assist voice assistant for natural language control
- Add-ons for integrating AdGuard, NodeRed, and more
- Home energy management for optimized usage and cost savings
- Home Assistant Cast for TV dashboard displays
- NFC tags for triggering music or automation tasks

**Learn More:**
- [Home Assistant Official Website](https://www.home-assistant.io)
- [Home Assistant GitHub Repository](https://github.com/home-assistant/core)
- [Home Assistant Documentation](https://www.home-assistant.io/docs)
- [Home Assistant Community](https://community.home-assistant.io)
- [Home Assistant Add-ons](https://www.home-assistant.io/addons)


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
