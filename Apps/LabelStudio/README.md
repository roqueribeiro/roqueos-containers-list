# Label Studio

> Rotulagem de dados para treinar modelos

## O que é

Label Studio é uma ferramenta de código aberto para rotular dados. Trabalha com áudio, texto, imagem, vídeo e séries temporais numa interface direta, e exporta para vários formatos de modelo. Serve para preparar dado cru ou melhorar um conjunto de treino que já existe.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                 | Serviço      |
| ---- | --------- | --------- | ------------------------------ | ------------ |
| 3080 | 8080      | tcp       | Web interface for Label Studio | label-studio |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

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
