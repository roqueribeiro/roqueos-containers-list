# n8n

> Workflow automation tool

## O que é

n8n is a powerful open-source workflow automation and conversational AI platform that blends the flexibility of coding with the simplicity of no-code development, empowering users to create efficient and secure automation workflows. It seamlessly connects any app with an API, leveraging native AI capabilities (like LangChain-based AI agent workflows) to process custom data, ideal for personal task management, team collaboration, or enterprise-grade automation. Its vibrant community offers over 400 integrations and 900+ ready-to-use templates, enabling users to deploy automations quickly.

The platform supports highly customizable workflow design, allowing users to write JavaScript/Python, add npm packages, or use an intuitive visual interface to manage data, catering to both simple tasks and complex processes. Enterprise-grade features like advanced permissions and air-gapped deployments ensure security, while multilingual support makes it accessible globally. n8n delivers a versatile and user-friendly automation solution.

Discover n8n’s Automation Scenarios
n8n’s community resources provide extensive support and inspiration, helping users explore its scenario-based value and easily build automation workflows. Below are two key resources showcasing n8n’s capabilities across various use cases:

1. [n8n Official Community Forum](https://community.n8n.io/): 
The forum is a hub for user collaboration and learning, offering resources from beginner guides to advanced workflow designs. Shared use cases include automating social media posts or real-time data syncing, such as using n8n to pull data from Google Sheets and send Slack notifications, boosting team collaboration and data efficiency.

2. [n8n Official Template Library](https://n8n.io/workflows/): 
The template library offers over 900 ready-to-use workflows for scenarios like marketing automation, data analytics, and customer support. For example, a template can link Shopify to Mailchimp, automatically adding new customers to mailing lists and sending welcome emails, making automation accessible to non-technical users. AI-driven workflows, like handling customer queries with LangChain, highlight n8n’s strength in intelligent interactions.


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 5678 | 5678      | tcp       | web port       | n8n     |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container    | Serviço |
| -------------------- | --------------- | ------- |
| /DATA/AppData/$AppID | /home/node/.n8n | n8n     |

## Variáveis de ambiente

| Variável          | Valor padrão | Serviço |
| ----------------- | ------------ | ------- |
| TZ                | $TZ          | n8n     |
| N8N_SECURE_COOKIE | false        | n8n     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5678/`.

## Imagens

| Serviço | Imagem            |
| ------- | ----------------- |
| n8n     | n8nio/n8n:1.123.0 |

## Fonte oficial

Projeto original: https://n8n.io

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
