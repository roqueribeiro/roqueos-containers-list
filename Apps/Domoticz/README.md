# Domoticz

> Automação residencial leve (Z-Wave, Zigbee, MQTT, clima)

## O que é

Domoticz é um sistema de automação residencial leve que conecta a uma vasta gama de dispositivos e protocolos (Z-Wave, Zigbee, RFXCOM, smart meters P1, KNX, MQTT, estações meteorológicas). Alternativa madura ao Home Assistant para usuários que preferem um backend single-process e leve com UI web clássica e scripting em Python/Lua.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço  |
| ---- | --------- | --------- | -------------------------------------------------- | -------- |
| 8096 | 8080      | tcp       | Porta da interface web (mapeada para 8096 no host) | domoticz |
| 6144 | 6144      | tcp       | Porta da API do Domoticz (serviços extras)         | domoticz |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container           | Serviço  |
| -------------------- | ---------------------- | -------- |
| /DATA/AppData/$AppID | /opt/domoticz/userdata | domoticz |

## Variáveis de ambiente

| Variável | Valor padrão      | Serviço  |
| -------- | ----------------- | -------- |
| TZ       | America/Sao_Paulo | domoticz |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8096/`.

- O primeiro boot começa sem autenticação — acesse http://SEU_IP:8096 para criar o usuário admin em Settings > Application Settings > Website Protection.
- Para USB sticks Z-Wave/Zigbee, monte /dev/ttyUSB0 ou /dev/serial/by-id/... e adicione `devices:` neste compose file.
- Para dispositivos 433 MHz: combine com um transceiver USB RFXCOM.

## Imagens

| Serviço  | Imagem                   |
| -------- | ------------------------ |
| domoticz | domoticz/domoticz:2024.7 |

## Fonte oficial

Projeto original: **domoticz**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
