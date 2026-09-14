# OpenList

> Monte o seu disco na nuvem no seu NAS doméstico

## O que é

O OpenList é um serviço auto-hospedado e orientado pela comunidade para listagem de ficheiros e montagem de discos na nuvem, com suporte para vários backends de armazenamento num só local.
Reúne armazenamento local e serviços como OneDrive, Google Drive, S3, WebDAV, SMB e muitos outros fornecedores num único centro de ficheiros baseado no navegador.
Com pré-visualizações, carregamentos, partilha, WebDAV, downloads offline e downloads em pacote integrados, adapta-se bem a NAS domésticos, bibliotecas cloud pessoais e portais de ficheiros leves para equipas.

**Principais Funcionalidades:**
- Liga discos locais, discos na nuvem, armazenamento de objetos e endpoints WebDAV ou SMB num só local
- Pré-visualiza documentos, imagens, áudio, vídeo, código, Markdown e ficheiros Office diretamente no navegador
- Permite carregar, mover, renomear, copiar, apagar e descarregar em lote ficheiros e pastas a partir de uma única interface
- Ativa WebDAV, rotas protegidas, partilha, modo escuro e suporte multilingue
- Suporta downloads offline, cópia de ficheiros entre armazenamentos e aceleração multithread

**Saiba Mais:**
- [Site Oficial OpenList](https://oplist.org/)
- [OpenList GitHub](https://github.com/OpenListTeam/OpenList)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve      | Serviço  |
| ---- | --------- | --------- | ------------------- | -------- |
| 5244 | 5244      | tcp       | Porta HTTP da WebUI | openlist |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container       | Serviço  |
| ------------------------- | ------------------ | -------- |
| /DATA/AppData/$AppID/data | /opt/openlist/data | openlist |

## Variáveis de ambiente

| Variável                | Valor padrão | Serviço  |
| ----------------------- | ------------ | -------- |
| UMASK                   | 022          | openlist |
| OPENLIST_ADMIN_PASSWORD | casaos       | openlist |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5244/`.

- Nome de utilizador predefinido: `admin`
- Palavra-passe predefinida: `roqueos`
- Se quiser alterar a palavra-passe, faça-o na WebUI do OpenList.

## Imagens

| Serviço  | Imagem                       |
| -------- | ---------------------------- |
| openlist | openlistteam/openlist:v4.2.2 |

## Fonte oficial

Projeto original: **OpenListTeam**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
