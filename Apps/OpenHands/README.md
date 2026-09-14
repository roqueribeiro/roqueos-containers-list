# OpenHands

> Assistente de Codificação de Código Aberto Alimentado por IA

## O que é

OpenHands é um assistente de codificação de código aberto alimentado por IA que fornece aos programadores capacidades inteligentes de conclusão, geração e depuração de código. Ele é executado num ambiente sandbox para garantir segurança e isolamento, permitindo ao mesmo tempo o acesso a várias ferramentas e recursos de desenvolvimento.

**Características Principais:**
- Conclusão e geração de código alimentadas por IA
- Depuração interativa e resolução de erros
- Suporte para múltiplas linguagens de programação
- Ambiente de execução sandbox seguro
- Configurações de runtime personalizáveis
- Integração com Docker para fluxos de trabalho contentorizados

**Saiba Mais:**
- [Website Oficial OpenHands](https://www.all-hands.dev)
- [Repositório GitHub OpenHands](https://github.com/All-Hands-AI/OpenHands)
- [Documentação](https://docs.all-hands.dev)


Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve                   | Serviço   |
| ----- | --------- | --------- | -------------------------------- | --------- |
| 13333 | 3000      | tcp       | Porta da Interface Web OpenHands | openhands |


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
