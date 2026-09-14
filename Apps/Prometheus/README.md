# Prometheus

> Coletor de métricas e banco de séries temporais open-source

## O que é

Prometheus é o sistema de monitoramento e banco de séries temporais open-source de fato para ambientes cloud-native. Coleta métricas de serviços instrumentados, armazena de forma eficiente e alimenta dashboards (Grafana) + alertas (Alertmanager). Espinha dorsal do stack de observabilidade LGTM.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                    | Serviço    |
| ---- | --------- | --------- | --------------------------------- | ---------- |
| 9090 | 9090      | tcp       | Porta da API HTTP + interface web | prometheus |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container    | Serviço    |
| --------------------------- | --------------- | ---------- |
| /DATA/AppData/$AppID/config | /etc/prometheus | prometheus |
| /DATA/AppData/$AppID/data   | /prometheus     | prometheus |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9090/`.

- É necessário montar um prometheus.yml em /etc/prometheus antes do primeiro boot — o Prometheus não inicia sem targets definidos.
- Exemplo de config: https://prometheus.io/docs/prometheus/latest/getting_started/
- Use junto com Grafana (já no catálogo) para visualização.

## Imagens

| Serviço    | Imagem                 |
| ---------- | ---------------------- |
| prometheus | prom/prometheus:v3.1.0 |

## Fonte oficial

Projeto original: **prometheus**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
