# ComfyUI

> GUI baseada em nodes para Stable Diffusion (usuários avançados)

## O que é

ComfyUI é a GUI mais poderosa e modular para Stable Diffusion — uma interface baseada em nodes que expõe o pipeline inteiro de difusão como grafo. Programação visual para geração de imagens, perfeito para usuários avançados que querem controle completo de SDXL, SD3, Flux, ControlNet, LoRA, IP-Adapter, AnimateDiff, geração de vídeo. Engine default de muitos artistas IA.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve                            | Serviço |
| ---- | --------- | --------- | ----------------------------------------- | ------- |
| 8188 | 8188      | tcp       | Porta da interface web (editor de grafos) | comfyui |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço |
| ---------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/storage | /root        | comfyui |

## Variáveis de ambiente

| Variável | Valor padrão                 | Serviço |
| -------- | ---------------------------- | ------- |
| CLI_ARGS | --listen 0.0.0.0 --port 8188 | comfyui |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8188/`.

- Esta versão roda na CPU, então instala em qualquer servidor amd64. Gerar imagem na CPU é lento: minutos por imagem.
- Com placa NVIDIA e o NVIDIA Container Toolkit no servidor, troque a imagem por yanwk/comfyui-boot:cu126-megapak e entregue a GPU ao container.
- O primeiro uso baixa os modelos base (vários GB). O ComfyUI Manager vem na imagem, então nós customizados instalam pela interface.

## Imagens

| Serviço | Imagem                          |
| ------- | ------------------------------- |
| comfyui | yanwk/comfyui-boot:cpu-20261116 |

## Fonte oficial

Projeto original: **comfyanonymous**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
