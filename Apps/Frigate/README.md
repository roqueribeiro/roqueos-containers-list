# Frigate

> NVR com detecção de objetos por IA em tempo real (processamento local)

## O que é

Frigate é um NVR open-source construído em torno de detecção de objetos por IA em tempo real. Todo processamento é local no hardware — usa OpenCV e Tensorflow em Coral USB ou GPU/CPU embarcados. Detecta pessoas, carros, pets, pacotes; integra com Home Assistant, MQTT, Telegram. Best-in-class para sistemas de câmeras de segurança auto-hospedados.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                      | Serviço |
| ---- | --------- | --------- | ----------------------------------- | ------- |
| 5000 | 5000      | tcp       | Porta da interface web              | frigate |
| 8554 | 8554      | tcp       | Servidor RTSP go2rtc (re-streaming) | frigate |
| 8555 | 8555      | tcp       | Porta WebRTC go2rtc (TCP + UDP)     | frigate |
| 8555 | 8555      | udp       | Porta WebRTC go2rtc (TCP + UDP)     | frigate |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container   | Serviço |
| ---------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/config  | /config        | frigate |
| /DATA/AppData/$AppID/storage | /media/frigate | frigate |
| —                            | /tmp/cache     | frigate |

## Variáveis de ambiente

| Variável              | Valor padrão            | Serviço |
| --------------------- | ----------------------- | ------- |
| FRIGATE_RTSP_PASSWORD | change-me-on-first-boot | frigate |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5000/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA FRIGATE_RTSP_PASSWORD por uma string aleatória longa.
- 2. Monte um config.yml em /config — Frigate não inicia sem ele. Exemplo mínimo: https://docs.frigate.video/configuration/
- 3. Para aceleração de IA, anexe um Coral USB Accelerator (ganho enorme) ou use passthrough de GPU Intel/Nvidia.
- 4. Use junto com Home Assistant (já no catálogo) para integração completa de automação residencial.

### Por que este app pede privilégio

- `privileged`: acesso ao acelerador de inferência (Coral TPU / GPU) em /dev

## Imagens

| Serviço | Imagem                                 |
| ------- | -------------------------------------- |
| frigate | ghcr.io/blakeblackshear/frigate:0.14.1 |

## Fonte oficial

Projeto original: **blakeblackshear**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
