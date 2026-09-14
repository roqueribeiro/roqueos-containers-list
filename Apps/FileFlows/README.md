# FileFlows

> Processamento de arquivos facilitado!

## O que é

Economize espaço de armazenamento com o processamento eficiente de arquivos.

O FileFlows permite monitorar e processar qualquer tipo de arquivo com fluxos personalizados. Vídeos, áudios, imagens, arquivos, quadrinhos, eBooks – tudo o que você precisar!


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve              | Serviço   |
| ----- | --------- | --------- | --------------------------- | --------- |
| 19200 | 5000      | tcp       | Web interface for FileFlows | fileflows |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container         | Serviço   |
| --------------------------- | -------------------- | --------- |
| /DATA/AppData/$AppID/data   | /app/Data            | fileflows |
| /DATA/AppData/$AppID/logs   | /app/Logs            | fileflows |
| /DATA/AppData/$AppID/common | /app/common          | fileflows |
| /DATA/AppData/$AppID/temp   | /temp                | fileflows |
| /DATA/Media                 | /Media               | fileflows |
| /var/run/docker.sock        | /var/run/docker.sock | fileflows |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço   |
| -------- | ------------ | --------- |
| PGID     | $PGID        | fileflows |
| PUID     | $PUID        | fileflows |
| TZ       | $TZ          | fileflows |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:19200/`.

## Imagens

| Serviço   | Imagem                  |
| --------- | ----------------------- |
| fileflows | revenz/fileflows:stable |

## Fonte oficial

Projeto original: **FileFlows**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
