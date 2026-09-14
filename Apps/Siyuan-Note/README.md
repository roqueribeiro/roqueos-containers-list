# SiYuan Note

> Private personal knowledge management

## O que é

Experience Seamless Knowledge Management with SiYuan. SiYuan redefines knowledge management by seamlessly integrating with your home TV, mobile devices, and other platforms. Unlike traditional knowledge systems, SiYuan offers a cohesive and flexible environment that adapts to your lifestyle, allowing you to access and organize information effortlessly across all your devices. Whether you are a creator or a regular consumer, SiYuan's innovative approach ensures your knowledge is always at your fingertips.

Powerful Features, Minimal Cost. SiYuan stands out with its robust set of features, most of which are free, even for commercial use. Enjoy block-level referencing, two-way links, custom attributes, SQL query embeds, and the unique protocol siyuan://. The editor supports block-style, markdown WYSIWYG, list outlines, and block zoom-in. Handle large documents with ease and include mathematical formulas, charts, flowcharts, and more. Capture web content, annotate PDFs, and export in various formats including Markdown, PDF, Word, and HTML. SiYuan also offers AI-powered writing and Q/A chat via OpenAI API, Tesseract OCR, and multi-tab support for a comprehensive and seamless experience.

Unlimited Storage, Local Speed, Multi-Device Access. Deploying Alist on Zima private cloud devices brings unparalleled convenience. Enjoy unlimited storage, blazing-fast local network speeds, and access from multiple devices. This setup ensures that your data is always available, secure, and quickly accessible, providing a superior alternative to traditional cloud services.


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço     |
| ---- | --------- | --------- | --------------- | ----------- |
| 6806 | 6806      | tcp       | WebUI HTTP Port | siyuan-note |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container      | Serviço     |
| ------------------------------ | ----------------- | ----------- |
| /DATA/AppData/$AppID/workspace | /siyuan/workspace | siyuan-note |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço     |
| -------- | ------------ | ----------- |
| PUID     | 1000         | siyuan-note |
| PGID     | 1000         | siyuan-note |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6806/`.

- | accessAuthCode |
- | -------- |
- | `roqueos`    |

## Imagens

| Serviço     | Imagem              |
| ----------- | ------------------- |
| siyuan-note | b3log/siyuan:v3.0.1 |

## Fonte oficial

Projeto original: **siyuan-note**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
