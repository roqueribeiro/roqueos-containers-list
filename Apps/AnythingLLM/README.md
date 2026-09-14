# AnythingLLM

> The all-in-one AI application.

## O que é

AnythingLLM is the easiest to use, all-in-one AI application that can do RAG, AI Agents, and much more with no code or infrastructure headaches.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço     |
| ---- | --------- | --------- | -------------- | ----------- |
| 3051 | 3001      | tcp       | —              | anythingllm |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                           | No container        | Serviço     |
| --------------------------------- | ------------------- | ----------- |
| /DATA/AppData/anythingllm/storage | /app/server/storage | anythingllm |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3051/`.

- **Usage Tips**
- AnythingLLM supports but does not directly provide various LLMs backends, you need to configure the backends you need yourself.
- Please refer to the [official documentation](https://docs.anythingllm.com) for more information.

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço     | Imagem                          |
| ----------- | ------------------------------- |
| anythingllm | mintplexlabs/anythingllm:latest |

## Fonte oficial

Projeto original: **Mintplex Labs**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
