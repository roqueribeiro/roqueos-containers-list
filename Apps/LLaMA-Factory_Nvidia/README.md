# LLaMA Factory(Nvidia GPU)

> Unified LLM Fine-Tuning with 100+ Models

## O que é

LLaMA Factory is a comprehensive framework for fine-tuning Large Language Models (LLMs) with support for over 100 models. It provides a user-friendly web interface and powerful training methods including LoRA, QLoRA, and full-parameter training.

**Key Features:**
- Support for 100+ LLMs including LLaMA, Mistral, Qwen, and more
- Multiple fine-tuning methods (LoRA, QLoRA, Full, Freeze)
- Intuitive Web UI for easy model management
- Built-in API server for model inference
- Multi-GPU training support
- Quantization and model export capabilities

**Hardware Requirements:**
- GPU: NVIDIA GPU with CUDA support required

**Learn More:**
- [GitHub Repository](https://github.com/hiyouga/LLaMA-Factory)
- [Documentation](https://llamafactory.readthedocs.io/)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve            | Serviço              |
| ----- | --------- | --------- | ------------------------- | -------------------- |
| 18877 | 7860      | tcp       | LLaMA Factory Web UI Port | llama-factory-nvidia |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:18877/`.

## Imagens

| Serviço              | Imagem                     |
| -------------------- | -------------------------- |
| llama-factory-nvidia | hiyouga/llamafactory:0.9.4 |

## Fonte oficial

Projeto original: **hiyouga**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
