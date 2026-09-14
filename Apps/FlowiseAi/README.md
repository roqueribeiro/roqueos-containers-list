# Flowise

> An open source generative AI development platform for building AI Agents and LLM workflows

## O que é

Flowise is a generative AI development platform for building AI agents and LLM workflows. An intuitive interface with a visual editor simplifies complex workflow design, ideal for developers creating diverse AI applications, from chatbots to data processing pipelines.

Core features include visual orchestration and data integration. Support for various models, custom code, and branching, looping, and routing logic enables complex workflow creation. Connection to over 100 data sources, vector databases, and memory modules ensures flexible data ingestion. Monitoring capabilities provide execution logs and visual debugging for workflow transparency and maintenance. Self-hosted and air-gapped deployment options accommodate diverse infrastructure needs.

It offers data processing with transforms, filters, aggregates, and RAG indexing pipelines. Memory optimization and planning techniques enhance performance, while MCP integration supports tool connections and authentication. Security controls include role-based access, single sign-on, and encrypted credentials for data protection. API, JavaScript and Python SDKs, and command-line interface enable extensibility, with embedded chat components and a template marketplace accelerating development. Scalability supports high-throughput workflows, and evaluation features optimize performance. With flexibility and efficiency at the core, the platform delivers a modern solution for AI development.

**Key Features:**
- Visual editor supporting multiple models, custom code, branching looping routing logic
- Connection to over 100 data sources, vector databases, and memory modules
- Execution logs and visual debugging for enhanced monitoring
- Data processing with transforms, filters, aggregates, and RAG indexing pipelines
- Various memory optimization technique and integrations
- MCP client and server nodes for tool integration
- Input moderation and output post-processing for safety
- API, JavaScript and Python SDKs, and command-line interface
- Customizable embedded chat components
- Template marketplace and reusable components
- Role-based access control, single sign-on, encrypted credentials
- Vertical and horizontal scalability for high-throughput workflows
- Datasets and evaluation features for workflow optimization

**Learn More:**
- [Flowise Official Website](https://flowiseai.com/)
- [Flowise GitHub](https://github.com/flowiseai/flowise)
- [Flowise Documentation](https://docs.flowiseai.com/)


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 3025 | 3025      | tcp       | —              | flowise |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container   | Serviço |
| -------------------- | -------------- | ------- |
| /DATA/AppData/$AppID | /root/.flowise | flowise |

## Variáveis de ambiente

| Variável          | Valor padrão           | Serviço |
| ----------------- | ---------------------- | ------- |
| PORT              | 3025                   | flowise |
| DATABASE_PATH     | /root/.flowise         | flowise |
| APIKEY_PATH       | /root/.flowise         | flowise |
| SECRETKEY_PATH    | /root/.flowise         | flowise |
| LOG_PATH          | /root/.flowise/logs    | flowise |
| BLOB_STORAGE_PATH | /root/.flowise/storage | flowise |
| FLOWISE_USERNAME  | roqueos                | flowise |
| FLOWISE_PASSWORD  | roqueos                | flowise |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3025/`.

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| flowise | flowiseai/flowise:3.0.11 |

## Fonte oficial

Projeto original: **Flowise**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
