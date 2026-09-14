# Netdata

> Monitoramento de desempenho em tempo real

## O que é

Netdata monitora desempenho e saúde em tempo real, e ajuda a ver e entender o que os seus sistemas estão fazendo agora.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host  | Container | Protocolo | Para que serve            | Serviço |
| ----- | --------- | --------- | ------------------------- | ------- |
| 19999 | 19999     | tcp       | Web interface for Netdata | app     |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container         | Serviço |
| ---------------------------- | -------------------- | ------- |
| /DATA/AppData/Netdata/config | /etc/netdata         | app     |
| /DATA/AppData/Netdata/lib    | /var/lib/netdata     | app     |
| /DATA/AppData/Netdata/cache  | /var/cache/netdata   | app     |
| /etc/passwd                  | /host/etc/passwd     | app     |
| /etc/group                   | /host/etc/group      | app     |
| /proc                        | /host/proc           | app     |
| /sys                         | /host/sys            | app     |
| /etc/os-release              | /host/etc/os-release | app     |
| /var/run/docker.sock         | /var/run/docker.sock | app     |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:19999/`.

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| app     | netdata/netdata:v2.8.1 |

## Fonte oficial

_Não declarada no manifesto._

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
