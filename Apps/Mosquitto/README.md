# Eclipse Mosquitto

> Broker MQTT leve para IoT e automação residencial

## O que é

Eclipse Mosquitto é o broker MQTT mais usado — leve, open-source, compatível com ISO 26262 / Safety-Critical Software. Implementa protocolos MQTT 3.1, 3.1.1 e 5.0. Barramento de mensagens padrão para IoT, Zigbee2MQTT, Home Assistant, ESPHome e qualquer dispositivo que use MQTT para pub/sub.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve                                   | Serviço   |
| ---- | --------- | --------- | ------------------------------------------------ | --------- |
| 1883 | 1883      | tcp       | Porta MQTT TCP                                   | mosquitto |
| 9094 | 9001      | tcp       | Porta MQTT WebSocket (mapeada para 9094 no host) | mosquitto |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container      | Serviço   |
| --------------------------- | ----------------- | --------- |
| /DATA/AppData/$AppID/config | /mosquitto/config | mosquitto |
| /DATA/AppData/$AppID/data   | /mosquitto/data   | mosquitto |
| /DATA/AppData/$AppID/log    | /mosquitto/log    | mosquitto |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1883/`.

- Configuração padrão permite conexões anônimas locais. Para produção:
- 1. Monte um mosquitto.conf com `allow_anonymous false` e `password_file /mosquitto/config/passwd`.
- 2. Gere o arquivo passwd com `mosquitto_passwd -c /mosquitto/config/passwd <user>`.
- 3. Opcionalmente monte certs e habilite listener na porta 8883 (TLS).
- Mosquitto não tem WebUI — gerencie via CLI mosquitto_pub/sub ou um app cliente como MQTT Explorer.

## Imagens

| Serviço   | Imagem                   |
| --------- | ------------------------ |
| mosquitto | eclipse-mosquitto:2.0.20 |

## Fonte oficial

Projeto original: **eclipse**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
