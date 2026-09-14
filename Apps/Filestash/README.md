# Filestash

> Gerenciador universal de arquivos para S3, SFTP, WebDAV, Drive, Dropbox, etc.

## O que é

Filestash é um gerenciador de arquivos auto-hospedado que conecta a S3, FTP, SFTP, WebDAV, Google Drive, Dropbox, OneDrive, Backblaze B2, Storj, Nextcloud, MySQL, MongoDB e dezenas de outros backends. UI unificada para todos os storages — drag-drop, preview de vídeo, viewer de documentos, galeria de imagens, suporte a ZIP, browsing tipo terminal via SSH/SFTP.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço   |
| ---- | --------- | --------- | -------------------------------------------------- | --------- |
| 8104 | 8334      | tcp       | Porta da interface web (mapeada para 8104 no host) | filestash |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container    | Serviço   |
| -------------------- | --------------- | --------- |
| /DATA/AppData/$AppID | /app/data/state | filestash |

## Variáveis de ambiente

| Variável        | Valor padrão          | Serviço   |
| --------------- | --------------------- | --------- |
| APPLICATION_URL | http://localhost:8104 | filestash |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8104/`.

- O primeiro boot em http://SEU_IP:8104 pede para criar a senha admin (sem bootstrap por env var — interativo).
- Após setup do admin, configure backends em Settings → Connect para seu S3/SFTP/Drive/etc.
- Útil como "painel único" sobre uma combinação MinIO + SFTPGo + Nextcloud existente (também no catálogo).

## Imagens

| Serviço   | Imagem                                                                                     |
| --------- | ------------------------------------------------------------------------------------------ |
| filestash | machines/filestash@sha256:dabc04f09e6dedebaf667042f840e5117abc616004fafdfa20aea064ca59bbdb |

## Fonte oficial

Projeto original: **mickael-kerjean**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
