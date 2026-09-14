# Langflow

> Interface de código aberto para criar e depurar aplicações multi-agente e RAG

## O que é

Langflow é uma poderosa interface de utilizador de código aberto, projetada especificamente para construir e depurar aplicações multi-agente e de Geração Aumentada por Recuperação (RAG). Fornece uma interface visual de arrastar e largar que simplifica o processo de criação de fluxos de trabalho de IA complexos.

O sistema consiste em dois componentes principais:
- **Langflow**: A aplicação principal que fornece uma interface visual para construir fluxos de trabalho de IA
- **PostgreSQL**: Um sistema de base de dados robusto para armazenar dados de aplicação e configurações

**Características Principais:**
- Interface visual de arrastar e largar para construir fluxos de trabalho de IA
- Suporte para sistemas multi-agente e aplicações RAG
- Ferramentas de depuração integradas para teste e otimização
- Armazenamento persistente para fluxos de trabalho e configurações
- Implementação fácil com contentores Docker

**Saiba Mais:**
- [Website Oficial do Langflow](https://www.langflow.org)
- [Repositório GitHub do Langflow](https://github.com/langflow-ai/langflow)
- [Documentação](https://docs.langflow.org)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve                  | Serviço  |
| ----- | --------- | --------- | ------------------------------- | -------- |
| 17860 | 7860      | tcp       | Porta da Interface Web Langflow | langflow |


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
