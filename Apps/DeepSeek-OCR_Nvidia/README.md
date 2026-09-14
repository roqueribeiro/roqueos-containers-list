# DeepSeek OCR(Nvidia GPU)

> OCR poderoso alimentado por DeepSeek AI

## O que é

DeepSeek OCR é uma ferramenta OCR (Reconhecimento Ótico de Caracteres) open source poderosa baseada no modelo avançado DeepSeek-AI. Permite a extração precisa de texto de imagens e digitalizações de documentos via interface web amigável ao usuário e API. Suporta vários formatos de imagem e oferece configurações para tamanho de imagem, corte e limites de upload. Além disso, o DeepSeek OCR apresenta quatro modos de reconhecimento principais: Plain OCR para extração de texto bruto, Describe para descrições inteligentes de conteúdo de imagem, Find para localização de palavras-chave com retorno de caixas delimitadoras visuais e Freeform para tarefas flexíveis de compreensão de imagem baseadas em prompts personalizados.

**Funcionalidades Principais:**
- Reconhecimento de texto de alta precisão com DeepSeek-OCR, suportando imagens e documentos PDF de múltiplas páginas
- Preserva o layout do documento incluindo tabelas, fórmulas e formatação estrutural
- Frontend web (React) e API REST (FastAPI) para uso fácil e integração do sistema
- Exporte resultados para formatos Markdown, HTML, DOCX ou JSON
- Extração e incorporação automáticas de imagens de arquivos PDF
- Aceleração GPU e implantação Docker para processamento rápido e escalável

**Pré-requisitos:**
- ZimaOS versão 1.5.2 ou superior, ou NVIDIA Open Driver versão 580 ou superior
- GPU NVIDIA com >= 8 GB de VRAM para desempenho ótimo

**Saiba Mais:**
- [Aplicação DeepSeek OCR (GitHub)](https://github.com/rdumasia303/deepseek_ocr_app)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve     | Serviço               |
| ----- | --------- | --------- | ------------------ | --------------------- |
| 22523 | 8000      | tcp       | Porta API Backend  | deepseek-ocr-backend  |
| 23000 | 80        | tcp       | Porta Web Frontend | deepseek-ocr-frontend |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

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

- Na primeira execução será transferido o modelo (~5-10GB), o que pode demorar algum tempo.

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
