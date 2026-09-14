# OctoPrint

> Controle a impressora 3D pelo navegador

## O que é

OctoPrint é a interface web da sua impressora 3D: manda o arquivo, acompanha a impressão pela câmera, ajusta temperatura e para tudo se der errado, de onde você estiver.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve              | Serviço |
| ---- | --------- | --------- | --------------------------- | ------- |
| 1080 | 80        | tcp       | Web interface for OctoPrint | app     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container | Serviço |
| ------------------------------ | ------------ | ------- |
| /DATA/AppData/$AppID/octoprint | /octoprint   | app     |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1080/`.

## Imagens

| Serviço | Imagem                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------- |
| app     | octoprint/octoprint:1.11.8@sha256:5ea0181e476597faa2800c991af4ce16903005f46b4c16666a4080ad606310bb |

## Fonte oficial

Projeto original: **octoprint**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
