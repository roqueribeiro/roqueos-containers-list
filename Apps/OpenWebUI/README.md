# Open WebUI

> User-friendly WebUI for LLMs (Formerly Ollama WebUI)

## O que é

Open WebUI is a feature-rich, user-friendly self-hosted AI platform designed for fully offline operation, supporting multiple large language model runners and API integration. Its intuitive Web interface provides powerful AI deployment capabilities, ideal for developers, researchers, and AI enthusiasts building localized intelligent applications.

The tool's core features include local model execution and Retrieval Augmented Generation (RAG). It supports Ollama and OpenAI-compatible APIs (e.g., LMStudio, GroqCloud), enabling seamless model switching and multi-model conversations. RAG enhances chat experiences through local document loading or web search integration (e.g., SearXNG, Google PSE). Granular permissions and role-based access control (RBAC) ensure security with customized user role management.

It supports Markdown and LaTeX for enriched interactions and offers hands-free voice and video call features for dynamic communication. Image generation integration (e.g., DALL-E, ComfyUI) enriches visual content, and a model builder enables creating and importing custom models via the interface. The Pipelines plugin framework supports Python plugins, extending functionality like function calling and real-time translation. The tool’s offline privacy and flexibility deliver a modern AI interaction solution.

**Key Features:**
- Local execution of Ollama and OpenAI-compatible APIs with multi-model conversations
- RAG support with local document and web search integration (e.g., SearXNG, Google PSE)
- Granular permissions and role-based access control (RBAC)
- Simultaneous interaction with multiple models, leveraging their strengths
- Image generation integration with DALL-E, ComfyUI, and more
- Full Markdown and LaTeX support
- Hands-free voice and video call functionality
- Pipelines plugin framework for custom Python functionality

**Learn More:**
- [Open WebUI Official Website](https://openwebui.com)
- [Open WebUI Documentation](https://docs.openwebui.com)
- [Open WebUI GitHub Repository](https://github.com/open-webui/open-webui)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço           |
| ---- | --------- | --------- | -------------- | ----------------- |
| 3050 | 8080      | tcp       | —              | open-webui-ollama |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                    | No container      | Serviço           |
| ------------------------------------------ | ----------------- | ----------------- |
| /DATA/AppData/open-webui-ollama/open-webui | /app/backend/data | open-webui-ollama |
| /DATA/AppData/open-webui-ollama/ollama     | /root/.ollama     | open-webui-ollama |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço           |
| ---------------------- | ------------ | ----------------- |
| CPU_FALLBACK           | true         | open-webui-ollama |
| NVIDIA_VISIBLE_DEVICES | all          | open-webui-ollama |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3050/`.

- **IMPORTANT NOTE ON USER ROLES AND PRIVACY:**
- - **Admin Creation**: The first account created on Open WebUI gains Administrator privileges, controlling user management and system settings.
- - **User Registrations**: Subsequent sign-ups start with Pending status, requiring Administrator approval for access.
- - **Privacy and Data Security**: All your data, including login details, is locally stored on your device. Open WebUI ensures strict confidentiality and no external requests for enhanced privacy and security.
- | Please refer to the [official documentation](https://docs.openwebui.com) for more information.
- **RESOURCES USAGE NOTICE:**
- Please be mindful of your device resources (CPU/GPU/RAM) usage to avoid overloading that may lead to device performance degradation.

## Imagens

| Serviço           | Imagem                               |
| ----------------- | ------------------------------------ |
| open-webui-ollama | ghcr.io/open-webui/open-webui:ollama |

## Fonte oficial

Projeto original: **Tim J. Baek**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
