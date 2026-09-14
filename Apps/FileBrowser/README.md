# FileBrowser

> Faça upload, exclua, visualize, renomeie, edite e compartilhe seus arquivos.

## O que é

File Browser - Navegador de arquivos Webbased que inclui funções de compartilhamento, etc.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host  | Container | Protocolo | Para que serve | Serviço     |
| ----- | --------- | --------- | -------------- | ----------- |
| 10180 | 80        | tcp       | WebUI Port     | filebrowser |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                 | No container | Serviço     |
| ----------------------- | ------------ | ----------- |
| /DATA/AppData/$AppID/db | /db          | filebrowser |
| /DATA                   | /srv         | filebrowser |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço     |
| -------- | ------------ | ----------- |
| PGID     | $PGID        | filebrowser |
| PUID     | $PUID        | filebrowser |
| TZ       | $TZ          | filebrowser |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:10180/`.

- Default Account
- | Username | Password |
- | -------- | -------- |
- | `admin`    | `admin`    |

## Imagens

| Serviço     | Imagem                          |
| ----------- | ------------------------------- |
| filebrowser | filebrowser/filebrowser:v2.49.0 |

## Fonte oficial

Projeto original: **File Browser**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
