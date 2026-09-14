# ESPHome

> Home Automation systems

## O que é

ESPHome is a system to control your microcontrollers by simple yet powerful configuration files and control them remotely through Home Automation systems.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 6052 | 6052      | tcp       | WebUI Port for ESPHome | esphome |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | esphome |

## Variáveis de ambiente

| Variável                   | Valor padrão | Serviço |
| -------------------------- | ------------ | ------- |
| ESPHOME_DASHBOARD_USE_PING | false        | esphome |
| TZ                         | $TZ          | esphome |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6052/`.

### Por que este app pede privilégio

- `networkHost`: descoberta mDNS e flash OTA de dispositivos na rede local

## Imagens

| Serviço | Imagem                            |
| ------- | --------------------------------- |
| esphome | ghcr.io/esphome/esphome:2025.11.0 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
