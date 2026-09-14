# Loki

> Sistema de agregação de logs escalável horizontalmente, do Grafana Labs

## O que é

Loki é o sistema de agregação de logs do Grafana Labs — como Prometheus, mas para logs. Indexa apenas metadata (labels) em vez do texto completo, tornando-o mais leve e rápido que Elasticsearch para streaming de logs. Combina com Promtail (coletor) e Grafana (UI) para completar o stack de observabilidade LGTM.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                              | Serviço |
| ---- | --------- | --------- | --------------------------------------------------------------------------- | ------- |
| 3100 | 3100      | tcp       | Porta da API HTTP (Loki não tem WebUI próprio — use Grafana para consultar) | loki    |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /etc/loki    | loki    |
| /DATA/AppData/$AppID/data   | /loki        | loki    |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3100/ready`.

- Monte um local-config.yaml em /etc/loki — Loki não inicia sem ele.
- Exemplo mínimo: https://grafana.com/docs/loki/latest/installation/local/
- Use com Grafana (já no catálogo) — adicione Loki como data source.
- Ingestão de logs: instale Promtail ou Vector em cada host que deve enviar logs.

## Imagens

| Serviço | Imagem             |
| ------- | ------------------ |
| loki    | grafana/loki:3.3.2 |

## Fonte oficial

Projeto original: **grafana**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
