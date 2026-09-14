# emulatorjs

> Emuladores de console direto no navegador

## O que é

EmulatorJS roda emuladores de vários consoles dentro de um container, acessíveis pelo navegador. Serve para jogar sua coleção de ROMs sem instalar nada na máquina de quem joga.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                  | Serviço    |
| ---- | --------- | --------- | ------------------------------- | ---------- |
| 3001 | 3000      | tcp       | Manage ROMS                     | emulatorjs |
| 4001 | 4001      | tcp       | Service port 4001 of emulatorjs | emulatorjs |
| 88   | 80        | tcp       | Play Game                       | emulatorjs |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container   | Serviço    |
| ----------------------------- | -------------- | ---------- |
| /DATA/AppData/$AppID/config   | /config        | emulatorjs |
| /DATA/AppData/$AppID/data     | /data          | emulatorjs |
| /DATA/roqueos/shared/ROMS/nes | /data/nes/roms | emulatorjs |

## Variáveis de ambiente

| Variável  | Valor padrão | Serviço    |
| --------- | ------------ | ---------- |
| PGID      | $PGID        | emulatorjs |
| PUID      | $PUID        | emulatorjs |
| SUBFOLDER | /            | emulatorjs |
| TZ        | $TZ          | emulatorjs |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:88/`.

### Por que este app pede privilégio

- `privileged`: acesso direto a dispositivos de entrada (gamepad) via /dev/input

## Imagens

| Serviço    | Imagem                       |
| ---------- | ---------------------------- |
| emulatorjs | linuxserver/emulatorjs:1.9.2 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
