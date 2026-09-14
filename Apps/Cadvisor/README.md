# cAdvisor

> Quanto cada container está consumindo, agora

## O que é

cAdvisor coleta e expõe o uso de CPU, memória, disco e rede de cada container em execução. É a fonte que Prometheus e Grafana consomem para desenhar o painel.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve       | Serviço |
| ---- | --------- | --------- | -------------------- | ------- |
| 8085 | 8080      | tcp       | Container Port: 8080 | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço |
| -------------------- | -------------------- | ------- |
| /                    | /rootfs              | app     |
| /var/run             | /var/run             | app     |
| /var/run/docker.sock | /var/run/docker.sock | app     |
| /sys                 | /sys                 | app     |
| /var/lib/docker/     | /var/lib/docker      | app     |
| /dev/disk/           | /dev/disk            | app     |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8085/`.

### Por que este app pede privilégio

- `volumeHost`: le metricas de todos os containers do host, que e a funcao declarada dele

## Imagens

| Serviço | Imagem                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------- |
| app     | gcr.io/cadvisor/cadvisor:v0.55.1@sha256:3de2bd5203120b866d74a9b283b2ffb8ec382fbf9dc321814700c6ea6f44ec57 |

## Fonte oficial

Projeto original: **cadvisor**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
