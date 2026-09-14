# PdfDing

> Selfhosted PDF manager, viewer and editor

## O que é

PdfDing is a selfhosted PDF manager, viewer and editor offering a seamless user experience on multiple devices. It's designed to be minimal, fast, and easy to set up using Docker.

With features like seamless browser-based PDF viewing that remembers your current position, multi-level tagging, starring and archiving functionalities, PDF editing with comments, highlighting and drawings, clean intuitive UI with dark mode, SSO support via OIDC, PDF sharing with external audience, markdown notes, and progress bars showing reading progress, PdfDing ensures an excellent PDF management experience.

Deploying PdfDing on private cloud devices like Zima brings unmatched convenience with multi-device access, ensuring your PDF collection is always within reach and secure, no matter where you are.


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 8000 | 8000      | tcp       | WebUI HTTP Port | pdfding |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container                | Serviço |
| -------------------------- | --------------------------- | ------- |
| /DATA/AppData/$AppID/db    | /home/nonroot/pdfding/db    | pdfding |
| /DATA/AppData/$AppID/media | /home/nonroot/pdfding/media | pdfding |

## Variáveis de ambiente

| Variável              | Valor padrão         | Serviço |
| --------------------- | -------------------- | ------- |
| HOST_NAME             | *                    | pdfding |
| SECRET_KEY            | your_secret_key_here | pdfding |
| CSRF_COOKIE_SECURE    | FALSE                | pdfding |
| SESSION_COOKIE_SECURE | FALSE                | pdfding |
| DEBUG                 | FALSE                | pdfding |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

- After installation, you can access PdfDing at http://your-server-ip:8000. Create your first admin account during the initial setup.
- Note: If you encounter access issues, you may need to manually edit the docker-compose.yml file and replace the HOST_NAME environment variable with your actual server IP address.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| pdfding | mrmn/pdfding:v1.3.1 |

## Fonte oficial

Projeto original: **mrmn2**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
