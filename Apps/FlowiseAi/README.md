# Flowise

> Plataforma de desenvolvimento de IA generativa de código aberto para construir Agentes de IA e fluxos de trabalho LLM

## O que é

O Flowise é uma plataforma de desenvolvimento de IA generativa para construir agentes de IA e fluxos de trabalho LLM. Uma interface intuitiva com editor visual simplifica o design de fluxos de trabalho complexos, ideal para programadores que criam diversas aplicações de IA, desde chatbots a pipelines de processamento de dados.

As funcionalidades principais incluem orquestração visual e integração de dados. O suporte para vários modelos, código personalizado e lógica de ramificação, looping e encaminhamento permite a criação de fluxos de trabalho complexos. A ligação a mais de 100 fontes de dados, bases de dados vectoriais e módulos de memória garante ingestão de dados flexível.

Oferece processamento de dados com transformações, filtros, agregados e pipelines de indexação RAG. As técnicas de optimização de memória e planeamento melhoram o desempenho, enquanto a integração MCP suporta ligações de ferramentas e autenticação.

**Funcionalidades Principais:**
- Editor visual suporta múltiplos modelos, código personalizado, lógica ramificação-looping-encaminhamento
- Ligação a mais de 100 fontes de dados, bases de dados vectoriais e módulos memória
- Registos de execução e depuração visual para monitorização melhorada
- Processamento de dados com transformações, filtros, agregados e pipelines indexação RAG

**Saber Mais:**
- [Website Oficial Flowise](https://flowiseai.com/)
- [Flowise GitHub](https://github.com/flowiseai/flowise)
- [Documentação Flowise](https://docs.flowiseai.com/)


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve            | Serviço |
| ---- | --------- | --------- | ------------------------- | ------- |
| 3025 | 3025      | tcp       | Web interface for Flowise | flowise |


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
