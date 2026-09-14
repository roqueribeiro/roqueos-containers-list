# Logseq Publish Server

> Visualizador web read-only para grafos Logseq publicados (app desktop necessário para editar)

## O que é

Logseq Publish Server é o visualizador web em modo leitura para grafos Logseq que você publica. Importante: o app desktop do Logseq é uma aplicação Electron — NÃO existe servidor Logseq auto-hospedado para edição. Use este container para compartilhar seu grafo de conhecimento com colaboradores ou publicar um wiki pessoal online. Para edição, use o app desktop (https://logseq.com/) e sincronize via Git, Logseq Sync (alpha) ou qualquer cloud storage.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                                       | Serviço |
| ---- | --------- | --------- | ------------------------------------------------------------------------------------ | ------- |
| 8108 | 80        | tcp       | Porta do visualizador de grafo publicado em modo leitura (mapeada para 8108 no host) | logseq  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container | Serviço |
| -------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/graph | /graph       | logseq  |

## Variáveis de ambiente

| Variável         | Valor padrão | Serviço |
| ---------------- | ------------ | ------- |
| LOGSEQ_GRAPH_DIR | /graph       | logseq  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8108/`.

- IMPORTANTE: Este container é o SERVER DE PUBLISH (visualizador read-only), não um server de edição do Logseq.
- Para editar, use o app desktop Logseq: https://logseq.com/
- Workflow:
- 1. Crie notas no Logseq desktop (grafo salvo como arquivos Markdown locais).
- 2. Use Arquivo > Publicar > Exportar Páginas Públicas para gerar um grafo estático.
- 3. Monte a pasta exportada em /graph aqui, depois acesse http://SEU_IP:8108.
- Para sync multi-dispositivo, use Logseq Sync (alpha), Git ou Syncthing (já no catálogo).

## Imagens

| Serviço | Imagem                                   |
| ------- | ---------------------------------------- |
| logseq  | logseq/logseq-publish-server:latest-2024 |

## Fonte oficial

Projeto original: **logseq**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
