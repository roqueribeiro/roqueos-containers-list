# LyrionMusicServer

> Lyrion Music Server is a streaming audio server for Squeezebox audio players.

## O que é

Lyrion Music Server is a self-hosted music management app designed to control a variety of audio playback devices, supporting streaming of local music collections, internet radio, and multiple streaming services (with or without subscriptions). Its intuitive Web interface enables users to access and control music effortlessly via any browser, ideal for music enthusiasts creating personalized audio experiences.

The app's core features include versatile music streaming and extensive customization. Users can seamlessly play local music libraries, listen to global internet radio, or connect to streaming services, catering to diverse listening needs. It offers flexible control options, allowing customization of server functionality, interaction methods, and interface appearance. Additionally, it supports a unified interface across multiple devices, ensuring a consistent experience on phones, computers, or other players, with the ability to select the ideal playback device for any scenario.

It can be flexibly deployed on personal servers or NAS devices, with community-provided documentation aiding users in optimising setups and extending functionality. Whether managing personal music collections or creating a shared audio hub for family, the app's intuitive operation and high flexibility deliver a modern music management platform, meeting needs from casual listening to professional audio management.

**Key Features:**
- Music streaming for local collections, internet radio, and multiple streaming services
- Intuitive Web interface for effortless music access and control via any browser
- Extensive customisation options for server functionality, interaction methods, and interface appearance
- Unified multi-device interface ensuring consistent experience across phones, computers, and other players
- Community documentation support for optimising setups and extending functionality

**Learn More:**
- [Lyrion Music Server Official Website](https://www.lyrion.org)
- [Lyrion Music Server GitHub Repository](https://github.com/lms-community/slimserver)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço           |
| ---- | --------- | --------- | -------------------- | ----------------- |
| 9000 | 9000      | tcp       | WebUI HTTP Port      | lyrionmusicserver |
| 9090 | 9090      | tcp       | CLI Port             | lyrionmusicserver |
| 3483 | 3483      | tcp       | Discovery Port (UDP) | lyrionmusicserver |
| 3483 | 3483      | udp       | Discovery Port (UDP) | lyrionmusicserver |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container   | Serviço           |
| ------------------------------ | -------------- | ----------------- |
| /DATA/AppData/$AppID/config    | /config        | lyrionmusicserver |
| /DATA/Media/Music              | /music         | lyrionmusicserver |
| /DATA/AppData/$AppID/playlists | /playlist      | lyrionmusicserver |
| /etc/localtime                 | /etc/localtime | lyrionmusicserver |
| /etc/timezone                  | /etc/timezone  | lyrionmusicserver |

## Variáveis de ambiente

| Variável  | Valor padrão | Serviço           |
| --------- | ------------ | ----------------- |
| HTTP_PORT | 9000         | lyrionmusicserver |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9000/`.

## Imagens

| Serviço           | Imagem                               |
| ----------------- | ------------------------------------ |
| lyrionmusicserver | lmscommunity/lyrionmusicserver:9.1.0 |

## Fonte oficial

Projeto original: **LMS-Community**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
