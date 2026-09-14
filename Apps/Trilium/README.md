# Trilium Notes

> Sistema de notas hierárquico com grafo de conhecimento (fork TriliumNext)

## O que é

Trilium Notes é uma aplicação de notas hierárquica com árvore infinita de notas, editor WYSIWYG rico, code notes com syntax highlighting, scripting (JavaScript/Python), imagens/arquivos embutidos, criptografia por nota, busca full-text, sincronização entre servidor e clientes desktop, relations e atributos para grafos de conhecimento. Agora mantido como TriliumNext após o original ter sido arquivado.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8107 | 8080      | tcp       | Porta da interface web (mapeada para 8107 no host) | trilium |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container            | Serviço |
| -------------------- | ----------------------- | ------- |
| /DATA/AppData/$AppID | /home/node/trilium-data | trilium |

## Variáveis de ambiente

| Variável         | Valor padrão            | Serviço |
| ---------------- | ----------------------- | ------- |
| TRILIUM_DATA_DIR | /home/node/trilium-data | trilium |
| TZ               | America/Sao_Paulo       | trilium |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8107/`.

- O primeiro boot em http://SEU_IP:8107 pede para configurar a senha mestra (usada para notas criptografadas).
- Clientes desktop (builds electron) sincronizam com este servidor — instale de https://github.com/TriliumNext/Notes/releases no Windows/macOS/Linux.
- Obs: o original `zadam/trilium` está arquivado. Usamos `triliumnext/notes` (fork ativo da comunidade) como sucessor em desenvolvimento.

## Imagens

| Serviço | Imagem                    |
| ------- | ------------------------- |
| trilium | triliumnext/notes:v0.95.0 |

## Fonte oficial

Projeto original: **TriliumNext**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
