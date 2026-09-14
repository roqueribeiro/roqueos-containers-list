# Open WebUI

> WebUI amigável para LLMs (anteriormente Ollama WebUI)

## O que é

O Open WebUI é uma plataforma de IA auto-hospedada rica em funcionalidades e amigável ao utilizador, concebida para operação completamente offline, suportando múltiplos executores de modelos de linguagem de grande escala e integração de API. A sua interface Web intuitiva fornece capacidades poderosas de implementação de IA, ideal para programadores, investigadores e entusiastas de IA que constroem aplicações inteligentes localizadas.

As funcionalidades principais da ferramenta incluem execução local de modelos e Retrieval Augmented Generation (RAG). Suporta Ollama e APIs compatíveis com OpenAI (por exemplo, LMStudio, GroqCloud), permitindo mudança perfeita de modelos e conversas multi-modelo. RAG melhora experiências de chat através de carregamento de documentos locais ou integração de pesquisa web (por exemplo, SearXNG, Google PSE). Permissões granulares e controlo de acesso baseado em funções (RBAC) garantem segurança com gestão personalizada de funções de utilizador.

Suporta Markdown e LaTeX para interacções enriquecidas e oferece funcionalidades de chamadas de voz e vídeo mãos-livres para comunicação dinâmica. A integração de geração de imagens (por exemplo, DALL-E, ComfyUI) enriquece conteúdo visual, e um construtor de modelos permite criar e importar modelos personalizados através da interface. O framework de plugins Pipelines suporta plugins Python, estendendo funcionalidades como chamadas de funções e tradução em tempo real. A privacidade offline e flexibilidade da ferramenta oferecem uma solução moderna de interacção de IA.

**Funcionalidades Principais:**
- Execução local de Ollama e APIs compatíveis com OpenAI com conversas multi-modelo
- Suporte RAG com integração de documentos locais e pesquisa web (por exemplo, SearXNG, Google PSE)
- Permissões granulares e controlo de acesso baseado em funções (RBAC)
- Interacção simultânea com múltiplos modelos, aproveitando os seus pontos fortes
- Integração de geração de imagens com DALL-E, ComfyUI e mais
- Suporte completo de Markdown e LaTeX
- Funcionalidade de chamadas de voz e vídeo mãos-livres
- Framework de plugins Pipelines para funcionalidade Python personalizada

**Saber Mais:**
- [Website Oficial Open WebUI](https://openwebui.com)
- [Documentação Open WebUI](https://docs.openwebui.com)
- [Repositório GitHub Open WebUI](https://github.com/open-webui/open-webui)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço           |
| ---- | --------- | --------- | ---------------------------- | ----------------- |
| 3050 | 8080      | tcp       | Web interface for Open WebUI | open-webui-ollama |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                    | No container      | Serviço           |
| ------------------------------------------ | ----------------- | ----------------- |
| /DATA/AppData/open-webui-ollama/open-webui | /app/backend/data | open-webui-ollama |
| /DATA/AppData/open-webui-ollama/ollama     | /root/.ollama     | open-webui-ollama |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço           |
| ---------------------- | ------------ | ----------------- |
| CPU_FALLBACK           | true         | open-webui-ollama |
| NVIDIA_VISIBLE_DEVICES | all          | open-webui-ollama |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3050/`.

- **NOTA IMPORTANTE SOBRE FUNÇÕES DE UTILIZADOR E PRIVACIDADE:**
- - **Criação de Admin**: A primeira conta criada no Open WebUI obtém privilégios de Administrador, controlando a gestão de utilizadores e as definições do sistema.
- - **Registos de Utilizador**: Os registos subsequentes começam com estado Pendente, requerendo aprovação do Administrador para acesso.
- - **Privacidade e Segurança de Dados**: Todos os seus dados, incluindo detalhes de início de sessão, são armazenados localmente no seu dispositivo. O Open WebUI garante confidencialidade rigorosa e nenhum pedido externo para privacidade e segurança melhoradas.
- | Por favor consulte a [documentação oficial](https://docs.openwebui.com) para mais informações.
- **AVISO DE USO DE RECURSOS:**
- Por favor tenha atenção ao uso de recursos do seu dispositivo (CPU/GPU/RAM) para evitar sobrecarga que pode levar à degradação do desempenho do dispositivo.

## Imagens

| Serviço           | Imagem                               |
| ----------------- | ------------------------------------ |
| open-webui-ollama | ghcr.io/open-webui/open-webui:ollama |

## Fonte oficial

Projeto original: **Tim J. Baek**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
