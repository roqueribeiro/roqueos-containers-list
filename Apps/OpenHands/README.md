# OpenHands

> Open-source AI-powered coding assistant

## O que é

OpenHands is an open-source AI-powered coding assistant that provides developers with intelligent code completion, generation, and debugging capabilities. It runs in a sandboxed environment to ensure security and isolation while allowing access to various development tools and resources.

**Key Features:**
- AI-powered code completion and generation
- Interactive debugging and error resolution
- Support for multiple programming languages
- Secure sandboxed execution environment
- Customizable runtime configurations
- Integration with Docker for containerized workflows

**Learn More:**
- [OpenHands Official Website](https://www.all-hands.dev)
- [OpenHands GitHub Repository](https://github.com/All-Hands-AI/OpenHands)
- [Documentation](https://docs.all-hands.dev)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve               | Serviço   |
| ----- | --------- | --------- | ---------------------------- | --------- |
| 13333 | 3000      | tcp       | OpenHands Web Interface Port | openhands |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container         | Serviço   |
| ------------------------------ | -------------------- | --------- |
| /var/run/docker.sock           | /var/run/docker.sock | openhands |
| /DATA/AppData/$AppID/openhands | /.openhands          | openhands |
| /DATA/AppData/$AppID/workspace | /opt/workspace_base  | openhands |

## Variáveis de ambiente

| Variável                        | Valor padrão                                            | Serviço   |
| ------------------------------- | ------------------------------------------------------- | --------- |
| SANDBOX_RUNTIME_CONTAINER_IMAGE | docker.all-hands.dev/all-hands-ai/runtime:0.49-nikolaik | openhands |
| WORKSPACE_MOUNT_PATH            | /DATA/AppData/$AppID/workspace                          | openhands |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:13333/`.

## Imagens

| Serviço   | Imagem                                           |
| --------- | ------------------------------------------------ |
| openhands | docker.all-hands.dev/all-hands-ai/openhands:0.49 |

## Fonte oficial

Projeto original: **All-Hands-AI**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
