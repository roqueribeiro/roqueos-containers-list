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

- EXIGE GPU Nvidia com passthrough — instale `nvidia-container-toolkit` no host primeiro, depois adicione `runtime: nvidia` e `deploy.resources.reservations.devices` neste compose.
- O primeiro boot baixa ~6 GB de modelos base SD — seja paciente. Workflows custom podem ser carregados pelo botão "Load" da UI.
- ComfyUI Manager (gerenciador comunitário de nodes) já vem incluso nesta imagem — instale packs customizados pela UI.

## Imagens

| Serviço | Imagem                            |
| ------- | --------------------------------- |
| comfyui | yanwk/comfyui-boot:cu124-megapack |

## Fonte oficial

Projeto original: **comfyanonymous**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
