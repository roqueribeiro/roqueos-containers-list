# Stable Diffusion

> Modelo de IA que gera imagem a partir de texto

## O que é

Stable Diffusion é um modelo de aprendizado profundo, lançado em 2022, que usa difusão para gerar imagens detalhadas a partir de uma descrição em texto. Também serve para preencher e estender imagens e para transformar uma imagem em outra.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve                     | Serviço                         |
| ---- | --------- | --------- | ---------------------------------- | ------------------------------- |
| 7860 | 7860      | tcp       | Web interface for Stable Diffusion | icewhale-stable-diffusion-webui |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                      | No container  | Serviço                         |
| -------------------------------------------- | ------------- | ------------------------------- |
| /DATA/AppData/Stable-Diffusion-WebUI/models  | /data/models  | icewhale-stable-diffusion-webui |
| /DATA/AppData/Stable-Diffusion-WebUI/outputs | /data/outputs | icewhale-stable-diffusion-webui |
| /DATA/AppData/Stable-Diffusion-WebUI/config  | /data/config  | icewhale-stable-diffusion-webui |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço                         |
| ---------------------- | ------------ | ------------------------------- |
| NVIDIA_VISIBLE_DEVICES | all          | icewhale-stable-diffusion-webui |
| CPU_FALLBACK           | true         | icewhale-stable-diffusion-webui |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7860/`.

## Imagens

| Serviço                         | Imagem                                 |
| ------------------------------- | -------------------------------------- |
| icewhale-stable-diffusion-webui | johnguan/stable-diffusion-webui:v1.7.0 |

## Fonte oficial

Projeto original: **stability.ai**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
