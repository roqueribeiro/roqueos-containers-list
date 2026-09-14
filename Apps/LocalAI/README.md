# LocalAI

> API gratuita compatível com OpenAI no seu hardware (CPU ou GPU)

## O que é

LocalAI é o substituto gratuito e open-source da API OpenAI — roda em hardware comum (CPU only ou GPU). Drop-in replacement do endpoint da OpenAI, suporta LLMs (llama.cpp, Mistral, Phi-3), embeddings, geração de imagens (Stable Diffusion), áudio (whisper.cpp, bark), function calling. Aponte seu SDK OpenAI para ele e rode tudo local.

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8097 | 8080      | tcp       | Porta da API compatível com OpenAI + interface web | localai |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container  | Serviço |
| --------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/models | /build/models | localai |
| /DATA/AppData/$AppID/config | /build/config | localai |

## Variáveis de ambiente

| Variável     | Valor padrão  | Serviço |
| ------------ | ------------- | ------- |
| DEBUG        | false         | localai |
| THREADS      | 4             | localai |
| CONTEXT_SIZE | 2048          | localai |
| MODELS_PATH  | /build/models | localai |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8097/`.

- O primeiro boot expõe a API compatível OpenAI em /v1/* (chat/completions, embeddings, etc.).
- Modelos NÃO vêm bundled — baixe via UI ou com `curl http://SEU_IP:8097/models/apply -d '{"id":"gallery@bert-embeddings"}'`.
- Para aceleração GPU, mude para `localai/localai:v2.24.1-cublas-cuda12-ffmpeg-core` (Nvidia) ou `-hipblas-` (AMD).
- Ajuste THREADS para o número de cores da sua CPU para melhor inferência só com CPU.

## Imagens

| Serviço | Imagem                              |
| ------- | ----------------------------------- |
| localai | localai/localai:v2.24.1-ffmpeg-core |

## Fonte oficial

Projeto original: **mudler**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
