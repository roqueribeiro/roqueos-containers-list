# Anaconda3

> Your machine learning Env work with Jupyter Lab

## O que é

Your machine learning Env work with Jupyter Lab

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço   |
| ---- | --------- | --------- | -------------- | --------- |
| 8888 | 8888      | tcp       | JupyterLab     | anaconda3 |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container   | Serviço   |
| ------------------------------ | -------------- | --------- |
| /DATA/AppData/$AppID/notebooks | /opt/notebooks | anaconda3 |

## Variáveis de ambiente

| Variável | Valor padrão                                                 | Serviço   |
| -------- | ------------------------------------------------------------ | --------- |
| LANG     | C.UTF-8                                                      | anaconda3 |
| LC_ALL   | C.UTF-8                                                      | anaconda3 |
| PATH     | /opt/conda/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr | anaconda3 |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8888/`.

- After installation, please check the token in the container log (Settings - TopRight - Terminal and Logs - Logs).

## Imagens

| Serviço   | Imagem                          |
| --------- | ------------------------------- |
| anaconda3 | continuumio/anaconda3:2024.10-1 |

## Fonte oficial

Projeto original: **LisonEvf**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
