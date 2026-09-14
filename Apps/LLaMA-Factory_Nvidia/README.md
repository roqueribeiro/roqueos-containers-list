# LLaMA Factory(Nvidia GPU)

> Ajuste fino unificado de LLM com 100+ modelos

## O que é

LLaMA Factory é uma estrutura abrangente para ajuste fino de Modelos de Linguagem Grandes (LLMs) com suporte para mais de 100 modelos. Fornece uma interface web amigável e métodos de treino poderosos, incluindo LoRA, QLoRA e treino de parâmetros completos.

**Características Principais:**
- Suporte para 100+ LLMs incluindo LLaMA, Mistral, Qwen e mais
- Múltiplos métodos de ajuste fino (LoRA, QLoRA, Full, Freeze)
- Interface Web intuitiva para fácil gestão de modelos
- Servidor API integrado para inferência de modelos
- Suporte para treino multi-GPU
- Capacidades de quantização e exportação de modelos

**Requisitos de Hardware:**
- GPU: GPU NVIDIA com suporte CUDA necessária

**Saiba Mais:**
- [Repositório GitHub](https://github.com/hiyouga/LLaMA-Factory)
- [Documentação](https://llamafactory.readthedocs.io/)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve                       | Serviço              |
| ----- | --------- | --------- | ------------------------------------ | -------------------- |
| 18877 | 7860      | tcp       | Porta da Interface Web LLaMA Factory | llama-factory-nvidia |


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
