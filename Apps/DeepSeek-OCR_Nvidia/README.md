# DeepSeek OCR(Nvidia GPU)

> Powerful OCR powered by DeepSeek AI

## O que é

DeepSeek OCR is a powerful open-source OCR (Optical Character Recognition) tool based on the advanced DeepSeek-AI model. It enables accurate text extraction from images and document scans via a user-friendly web interface and API. Supports various image formats and offers configurations for image size, cropping, and upload limits. Additionally, DeepSeek OCR features four core recognition modes: Plain OCR for raw text extraction, Describe for intelligent image content descriptions, Find for keyword localization with visual bounding box returns, and Freeform for flexible image understanding tasks based on custom prompts.

**Key Features:**
- High-accuracy text recognition with DeepSeek-OCR, supporting images and multi-page PDF documents
- Preserves document layout including tables, formulas, and structural formatting
- Web frontend (React) and REST API (FastAPI) for easy usage and system integration
- Export results to Markdown, HTML, DOCX, or JSON formats
- Automatic extraction and embedding of images from PDF files
- GPU acceleration and Docker deployment for fast and scalable processing

**Prerequisites:**
- ZimaOS version 1.5.2 or higher, or NVIDIA Open Driver version 580 or higher
- NVIDIA GPU with >= 8 GB VRAM for optimal performance

**Learn More:**
- [DeepSeek OCR App (GitHub)](https://github.com/rdumasia303/deepseek_ocr_app)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve    | Serviço               |
| ----- | --------- | --------- | ----------------- | --------------------- |
| 22523 | 8000      | tcp       | Backend API Port  | deepseek-ocr-backend  |
| 23000 | 80        | tcp       | Frontend Web Port | deepseek-ocr-frontend |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço              |
| --------------------------- | ------------ | -------------------- |
| /DATA/AppData/$AppID/models | /models      | deepseek-ocr-backend |

## Variáveis de ambiente

| Variável           | Valor padrão             | Serviço              |
| ------------------ | ------------------------ | -------------------- |
| API_HOST           | 0.0.0.0                  | deepseek-ocr-backend |
| API_PORT           | 8000                     | deepseek-ocr-backend |
| FRONTEND_PORT      | 3000                     | deepseek-ocr-backend |
| MODEL_NAME         | deepseek-ai/DeepSeek-OCR | deepseek-ocr-backend |
| HF_HOME            | /models                  | deepseek-ocr-backend |
| MAX_UPLOAD_SIZE_MB | 100                      | deepseek-ocr-backend |
| BASE_SIZE          | 1024                     | deepseek-ocr-backend |
| IMAGE_SIZE         | 640                      | deepseek-ocr-backend |
| CROP_MODE          | true                     | deepseek-ocr-backend |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:23000/`.

- The first run will download the model (~5-10GB), which may take some time.

## Imagens

| Serviço               | Imagem                                    |
| --------------------- | ----------------------------------------- |
| deepseek-ocr-backend  | icewhaletech/deepseek-ocr-backend:v2.2.0  |
| deepseek-ocr-frontend | icewhaletech/deepseek-ocr-frontend:v2.2.0 |

## Fonte oficial

Projeto original: **rdumasia303**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
