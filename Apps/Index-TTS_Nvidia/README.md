# Index-TTS(Nvidia GPU)

> An Industrial-Level Controllable and Efficient Zero-Shot Text-To-Speech System

## O que é

IndexTTS2 is an advanced zero-shot text-to-speech model that innovatively achieves complete decoupling of emotional expression and speaker identity. The model supports precise speech duration control and multimodal emotion control, capable of maintaining the target timbre while accurately reproducing the specified emotional intonation.

The model employs a three-stage training paradigm and introduces GPT latent representations, ensuring excellent speech clarity and stability even under high emotional expression. Through the Qwen-based soft instruction mechanism, users can easily control the emotional characteristics of generated speech using natural language descriptions.

In multi-dataset evaluations, IndexTTS2 surpasses existing zero-shot TTS models in key metrics such as word error rate, speaker similarity, and emotion fidelity, providing industry-leading speech synthesis quality.

**Key Features:**
- Zero-shot TTS capability to replicate any timbre without training
- Independent control of emotion and timbre with multimodal emotion input
- Precise duration control with explicit token count specification for perfect audio-video synchronization
- Natural language-based emotion control to guide speech generation through text descriptions

**Prerequisites:**
- Please ensure available memory > 12 GB, otherwise the application may not run properly
- NVIDIA GPU with ≥ 8 GB VRAM (recommended for optimal performance)
- NVIDIA CUDA Toolkit version ≥ 12.8

**Learn More:**
- [IndexTTS GitHub](https://github.com/index-tts/index-tts)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve    | Serviço          |
| ---- | --------- | --------- | ----------------- | ---------------- |
| 7867 | 7860      | tcp       | Gradio WebUI port | index-tts-nvidia |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável               | Valor padrão | Serviço          |
| ---------------------- | ------------ | ---------------- |
| NVIDIA_VISIBLE_DEVICES | all          | index-tts-nvidia |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7867/`.

## Imagens

| Serviço          | Imagem                     |
| ---------------- | -------------------------- |
| index-tts-nvidia | icewhaletech/index-tts:2.0 |

## Fonte oficial

Projeto original: **icewhaletech**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
