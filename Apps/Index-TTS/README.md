# Index-TTS

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

**Additional Notes:**
- Please ensure available memory > 12 GB, otherwise the application may not run properly
- This application runs on CPU by default. This mode has low computational efficiency and will cause extremely high resource consumption and potential system instability. For optimal performance and stability, it is strongly recommended to use NVIDIA GPU to run this application
- If you need to use NVIDIA GPU, please select "Custom Install" and enable the GPU option (supported in ZimaOS 1.5.0 and above)
- For NVIDIA GPU usage, ≥ 8 GB VRAM is required (recommended for optimal performance)
- For NVIDIA GPU usage, NVIDIA CUDA Toolkit version ≥ 12.8 is required

**Learn More:**
- [IndexTTS GitHub](https://github.com/index-tts/index-tts)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço   |
| ----- | --------- | --------- | --------------- | --------- |
| 17869 | 7860      | tcp       | WebUI HTTP Port | index-tts |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:17869/`.

- 1. Please ensure available memory > 12 GB, otherwise the application may not run properly
- 2. The application takes approximately 5 minutes to start, please be patient
- 3. This application runs on CPU by default. This mode has low computational efficiency and will cause extremely high resource consumption and potential system instability. For optimal performance and stability, it is strongly recommended to use NVIDIA GPU to run this application
- 4. If you need to use NVIDIA GPU, please select "Custom Install" and enable the GPU option (supported in ZimaOS 1.5.0 and above)

## Imagens

| Serviço   | Imagem                     |
| --------- | -------------------------- |
| index-tts | icewhaletech/index-tts:2.0 |

## Fonte oficial

Projeto original: **icewhaletech**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
