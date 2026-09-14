# Langflow

> Open-source UI for building and debugging multi-agent and RAG applications

## O que é

Langflow is a powerful, open-source UI designed specifically for building and debugging multi-agent and Retrieval-Augmented Generation (RAG) applications. It provides a visual, drag-and-drop interface that simplifies the process of creating complex AI workflows.

The system consists of two main components:
- **Langflow**: The main application providing a visual interface for building AI workflows
- **PostgreSQL**: A robust database system for storing application data and configurations

**Key Features:**
- Visual, drag-and-drop interface for building AI workflows
- Support for multi-agent systems and RAG applications
- Integrated debugging tools for testing and optimization
- Persistent storage for workflows and configurations
- Easy deployment with Docker containers

**Learn More:**
- [Langflow Official Website](https://www.langflow.org)
- [Langflow GitHub Repository](https://github.com/langflow-ai/langflow)
- [Documentation](https://docs.langflow.org)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve              | Serviço  |
| ----- | --------- | --------- | --------------------------- | -------- |
| 17860 | 7860      | tcp       | Langflow Web Interface Port | langflow |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container             | Serviço           |
| ----------------------------- | ------------------------ | ----------------- |
| /DATA/AppData/$AppID/backend  | /app/langflow            | langflow          |
| /DATA/AppData/$AppID/postgres | /var/lib/postgresql/data | langflow-postgres |

## Variáveis de ambiente

| Variável              | Valor padrão                                                 | Serviço           |
| --------------------- | ------------------------------------------------------------ | ----------------- |
| LANGFLOW_DATABASE_URL | postgresql://langflow:langflow@langflow-postgres:5432/langfl | langflow          |
| LANGFLOW_CONFIG_DIR   | /app/langflow                                                | langflow          |
| POSTGRES_USER         | langflow                                                     | langflow-postgres |
| POSTGRES_PASSWORD     | langflow                                                     | langflow-postgres |
| POSTGRES_DB           | langflow                                                     | langflow-postgres |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:17860/`.

## Imagens

| Serviço           | Imagem                    |
| ----------------- | ------------------------- |
| langflow          | langflowai/langflow:1.5.0 |
| langflow-postgres | postgres:16               |

## Fonte oficial

Projeto original: **langflowai**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
