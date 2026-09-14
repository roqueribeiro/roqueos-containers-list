# InfluxDB

> Banco de séries temporais open-source para métricas, IoT e analytics

## O que é

InfluxDB é o principal banco de séries temporais open-source, otimizado para armazenamento e leitura rápida e altamente disponível de dados com timestamp. Usado para métricas, dados de sensores IoT, monitoramento de aplicações e analytics. Combina naturalmente com Telegraf (coleta), Chronograf (UI) e Grafana (dashboards).

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                    | Serviço  |
| ---- | --------- | --------- | --------------------------------- | -------- |
| 8086 | 8086      | tcp       | Porta da API HTTP + interface web | influxdb |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container       | Serviço  |
| --------------------------- | ------------------ | -------- |
| /DATA/AppData/$AppID/data   | /var/lib/influxdb2 | influxdb |
| /DATA/AppData/$AppID/config | /etc/influxdb2     | influxdb |

## Variáveis de ambiente

| Variável                      | Valor padrão            | Serviço  |
| ----------------------------- | ----------------------- | -------- |
| DOCKER_INFLUXDB_INIT_MODE     | setup                   | influxdb |
| DOCKER_INFLUXDB_INIT_USERNAME | admin                   | influxdb |
| DOCKER_INFLUXDB_INIT_PASSWORD | change-me-on-first-boot | influxdb |
| DOCKER_INFLUXDB_INIT_ORG      | roqueos                 | influxdb |
| DOCKER_INFLUXDB_INIT_BUCKET   | default                 | influxdb |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8086/`.

- SUBSTITUA DOCKER_INFLUXDB_INIT_PASSWORD antes do primeiro boot.
- Após init, gere API tokens via UI para clientes (Telegraf, Grafana, etc.).
- Org padrão "roqueos" + bucket "default" — ajuste para o seu ambiente.

## Imagens

| Serviço  | Imagem              |
| -------- | ------------------- |
| influxdb | influxdb:2.7-alpine |

## Fonte oficial

Projeto original: **influxdata**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
