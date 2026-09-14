# RetroArch

> Online retro games emulator

## O que é

RetroArch-web is a web-based classic game emulator that enables users to enjoy a wide range of retro games directly in modern browsers. Supporting platforms like GBA, N64, DOS games, and NES (FC), it brings nostalgic gaming to life. Built on the open-source RetroArch project, RetroArch-web delivers robust features, including high-quality graphics rendering, audio processing, input controls, and save/load game progress, ensuring a precise and smooth emulation experience.

Designed for ease of use, RetroArch-web requires no complex software installation, running seamlessly in browsers. Its flexible configuration options let users customize controller setups, visual filters, and audio settings to suit individual preferences. With broad cross-platform compatibility, it ensures stable performance across devices, offering retro gaming enthusiasts a consistent experience on the go.

Backed by an active open-source community, RetroArch-web continually improves performance and expands supported game platforms. Whether revisiting classic arcade titles or exploring vintage console games, RetroArch-web stands out as the ideal choice for retro gamers, combining powerful emulation with a user-friendly interface.

**Key Features:**
- Polished interface for browsing game collections with thumbnails and animated backgrounds
- Supports multiple emulators and game engines for running classic games and discs
- Next-frame response time for near-native hardware low-latency experience
- Highly configurable settings to tweak game performance and display options
- Automatic controller configuration for easy multiplayer gaming
- Shaders to enhance old game rendering and mimic CRT monitor effects
- Netplay for multiplayer gaming and spectator mode
- Achievements system to unlock trophies and badges in classic games
- Recording and streaming for capturing gameplay or live streaming

**Learn More:**
- [RetroArch Official Website](https://www.retroarch.com)
- [RetroArch GitHub Repository](https://github.com/libretro/RetroArch)


Categoria na App Store do RoqueOS: **Gaming**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço   |
| ---- | --------- | --------- | --------------- | --------- |
| 8183 | 80        | tcp       | WebUI HTTP Port | retroarch |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável      | Valor padrão    | Serviço   |
| ------------- | --------------- | --------- |
| ROOT_WWW_PATH | "/var/www/html" | retroarch |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8183/`.

## Imagens

| Serviço   | Imagem                         |
| --------- | ------------------------------ |
| retroarch | inglebard/retroarch-web:latest |

## Fonte oficial

Projeto original: **inglebard**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
