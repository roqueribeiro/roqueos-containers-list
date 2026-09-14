# Zigbee2MQTT

> Ponte de dispositivos Zigbee para MQTT (3500+ dispositivos suportados)

## O que é

Zigbee2MQTT faz a ponte dos seus dispositivos Zigbee para MQTT, liberando-os de hubs proprietários. Suporta 3500+ dispositivos Zigbee de 400+ fabricantes (Aqara, IKEA, Philips Hue, Sonoff, SmartThings). Pareie sensores, interruptores, lâmpadas uma vez e use com Home Assistant, OpenHAB, Domoticz, Node-RED — qualquer coisa que fale MQTT.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço     |
| ---- | --------- | --------- | -------------------------------------------------- | ----------- |
| 8095 | 8080      | tcp       | Porta da interface web (mapeada para 8095 no host) | zigbee2mqtt |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço     |
| -------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID | /app/data    | zigbee2mqtt |
| /run/udev            | /run/udev    | zigbee2mqtt |

## Variáveis de ambiente

| Variável | Valor padrão      | Serviço     |
| -------- | ----------------- | ----------- |
| TZ       | America/Sao_Paulo | zigbee2mqtt |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8095/`.

- ANTES DO PRIMEIRO BOOT:
- 1. Plugue seu USB stick Zigbee (CC2531, CC2652, ConBee, etc.) e confirme que aparece em /dev/ttyUSB0 (ou ajuste a linha devices:).
- 2. Monte um configuration.yaml em /app/data com no mínimo a URL do broker MQTT e configuração serial.adapter. Exemplo mínimo: https://www.zigbee2mqtt.io/guide/getting-started/
- 3. Use com Mosquitto (também neste catálogo) como broker MQTT e Home Assistant como UI/camada de automação.

### Por que este app pede privilégio

- `privileged`: acesso ao adaptador Zigbee em /dev/ttyACM ou /dev/ttyUSB

## Imagens

| Serviço     | Imagem                    |
| ----------- | ------------------------- |
| zigbee2mqtt | koenkk/zigbee2mqtt:1.41.0 |

## Fonte oficial

Projeto original: **Koenkk**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
