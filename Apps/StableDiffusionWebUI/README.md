# Stable Diffusion

> An AI model used to generate images conditioned on text descriptions.

## O que é

Stable Diffusion is a deep learning, text-to-image model released in 2022 based on diffusion techniques. It is primarily used to generate detailed images conditioned on text descriptions, though it can also be applied to other tasks such as inpainting, outpainting, and generating image-to-image translations guided by a text prompt.

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
