# AnythingLLM

> O aplicativo de IA que faz tudo num lugar só

## O que é

AnythingLLM é o aplicativo de IA mais simples de usar que junta tudo num lugar: RAG, agentes e muito mais, sem escrever código e sem dor de cabeça de infraestrutura.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve                | Serviço     |
| ---- | --------- | --------- | ----------------------------- | ----------- |
| 3051 | 3001      | tcp       | Web interface for AnythingLLM | anythingllm |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                           | No container        | Serviço     |
| --------------------------------- | ------------------- | ----------- |
| /DATA/AppData/anythingllm/storage | /app/server/storage | anythingllm |

## Variáveis de ambiente

| Variável    | Valor padrão        | Serviço     |
| ----------- | ------------------- | ----------- |
| STORAGE_DIR | /app/server/storage | anythingllm |

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
| anythingllm | mintplexlabs/anythingllm:1.16.1 |

## Fonte oficial

Projeto original: **Mintplex Labs**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
