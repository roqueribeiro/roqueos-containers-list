# Ollama

> Execute grandes modelos de linguagem localmente

## O que é

O Ollama é uma ferramenta para executar grandes modelos de linguagem localmente, concebida para ajudar os utilizadores a implementar e gerir rapidamente modelos de IA através de uma interface de linha de comandos simples e servidor. A sua interface Web intuitiva e design eficiente tornam-no ideal para programadores, investigadores e entusiastas de IA que trabalham em hardware local.

As funcionalidades principais da ferramenta incluem execução local de modelos e suporte multi-modelo. Permite executar modelos como Llama 3, Mistral e Gemma, com comandos simples para descarregar e alternar modelos. Todo o processamento de dados ocorre localmente, garantindo privacidade. O baixo uso de recursos optimiza o carregamento de modelos, permitindo funcionamento suave em hardware limitado.

Oferece uma API RESTful para integração de aplicações e suporta chamadas de ferramentas (ex.: Llama 3.1) para tarefas complexas. A gestão de modelos através do Modelfile agrupa pesos e configurações para facilidade de uso. A eficiência da ferramenta e controlo do utilizador fornecem uma solução de IA local moderna.

**Funcionalidades Principais:**
- **Execução Local**: Execute LLMs directamente no seu hardware sem dependência de internet
- **Suporte Multi-Modelo**: Acesso a dezenas de modelos pré-treinados incluindo Llama 3, Mistral, Gemma, Code Llama e mais
- **Gestão Fácil de Modelos**: Comandos simples para puxar, executar e gerir diferentes modelos
- **Integração de API**: API RESTful para construir aplicações e integrações
- **Eficiência de Memória**: Carregamento optimizado de modelos e gestão de memória
- **Focado na Privacidade**: Todo o processamento acontece localmente, garantindo privacidade de dados

**Modelos Suportados:**
- DeepSeek-R1 (1.5B, 7B, 8B, 14B, 32B, 70B, 671B parâmetros)
- Gemma3n (2B, 4B parâmetros)
- Gemma3 (1B, 4B, 12B, 27B parâmetros)
- Qwen3 (0.6B, 1.7B, 4B, 8B, 14B, 30B, 32B, 235B parâmetros)
- Qwen2.5vl (3B, 7B, 32B, 72B parâmetros)
- Llama3.1 (8B, 70B, 405B parâmetros)
- Llama3.2 (1B, 3B parâmetros)
- Mistral (7B parâmetros)
- E muitos mais...

**Casos de Uso:**
- Desenvolvimento local de IA e experimentação
- Propósitos educacionais e investigação
- Construção de aplicações alimentadas por IA
- Geração de código e assistência
- Geração de texto e completação
- Chatbots e IA conversacional
- Análise de dados e insights

**Saiba Mais:**
- [Site Oficial do Ollama](https://ollama.com/)
- [Repositório GitHub do Ollama](https://github.com/ollama/ollama)
- [Biblioteca de Modelos](https://ollama.com/library)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço |
| ----- | --------- | --------- | ---------------- | ------- |
| 11434 | 11434     | tcp       | Porta API Ollama | ollama  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host               | No container  | Serviço |
| --------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/ | /root/.ollama | ollama  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:11434/`.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| ollama  | ollama/ollama:0.9.5 |

## Fonte oficial

Projeto original: **ollama**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
