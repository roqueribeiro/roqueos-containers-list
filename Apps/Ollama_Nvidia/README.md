# Ollama(Nvidia GPU)

> Get up and running with large language models locally

## O que é

Ollama is a tool for running large language models locally, designed to help users quickly deploy and manage AI models via a simple command-line interface and server. Its intuitive Web interface and efficient design make it ideal for developers, researchers, and AI enthusiasts working on local hardware.

The tool's core features include local model execution and multi-model support. It enables running models like Llama 3, Mistral, and Gemma, with simple commands for downloading and switching models. All data processing occurs locally, ensuring privacy. Low resource usage optimizes model loading, allowing smooth operation on limited hardware.

It offers a RESTful API for application integration and supports tool calling (e.g., Llama 3.1) for complex tasks. Model management via Modelfile bundles weights and configurations for ease of use. The tool's efficiency and user control deliver a modern local AI solution.

**Key Features:**
- **Local Execution**: Run LLMs directly on your hardware without internet dependency
- **Multiple Model Support**: Access to dozens of pre-trained models including Llama 3, Mistral, Gemma, Code Llama, and more
- **Easy Model Management**: Simple commands to pull, run, and manage different models
- **API Integration**: RESTful API for building applications and integrations
- **Memory Efficient**: Optimized model loading and memory management
- **Privacy-Focused**: All processing happens locally, ensuring data privacy

**Supported Models:**
- DeepSeek-R1 (1.5B, 7B, 8B, 14B, 32B, 70B, 671B parameters)
- Gemma3n (2B, 4B parameters)
- Gemma3 (1B, 4B, 12B, 27B parameters)
- Qwen3 (0.6B, 1.7B, 4B, 8B, 14B, 30B, 32B, 235B parameters)
- Qwen2.5vl (3B, 7B, 32B, 72B parameters)
- Llama3.1 (8B, 70B, 405B parameters)
- Llama3.2 (1B, 3B parameters)
- Mistral (7B parameters)
- And many more...

**Use Cases:**
- Local AI development and experimentation
- Educational purposes and research
- Building AI-powered applications
- Code generation and assistance
- Text generation and completion
- Chatbots and conversational AI
- Data analysis and insights

**Learn More:**
- [Ollama Official Website](https://ollama.com/)
- [Ollama GitHub Repository](https://github.com/ollama/ollama)
- [Model Library](https://ollama.com/library)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço |
| ----- | --------- | --------- | --------------- | ------- |
| 11434 | 11434     | tcp       | Ollama API Port | ollama  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host               | No container  | Serviço |
| --------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/ | /root/.ollama | ollama  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:11434/`.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| ollama  | ollama/ollama:0.9.5 |

## Fonte oficial

Projeto original: **ollama**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
