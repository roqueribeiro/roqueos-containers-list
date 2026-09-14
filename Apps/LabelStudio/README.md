# Label Studio

> Label Studio is an open source data labeling tool. It lets you label data types like audio, text, images, videos, and time series with a simple and straightforward UI and export to various model formats. It can be used to prepare raw data or improve existing training data to get more accurate ML models.

## O que é

Label Studio is an open source data labeling tool. It lets you label data types like audio, text, images, videos, and time series with a simple and straightforward UI and export to various model formats. It can be used to prepare raw data or improve existing training data to get more accurate ML models.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço      |
| ---- | --------- | --------- | -------------- | ------------ |
| 3080 | 8080      | tcp       | —              | label-studio |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container       | Serviço      |
| ------------------------- | ------------------ | ------------ |
| /DATA/AppData/$AppID/data | /label-studio/data | label-studio |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço      |
| -------- | ------------ | ------------ |
| PGID     | $PGID        | label-studio |
| PUID     | $PUID        | label-studio |
| TZ       | $TZ          | label-studio |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3080/`.

## Imagens

| Serviço      | Imagem                         |
| ------------ | ------------------------------ |
| label-studio | heartexlabs/label-studio:1.9.2 |

## Fonte oficial

Projeto original: **Yidadaa**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
