# ArchiveBox

> Solução de Arquivamento de Internet Auto-hospedada

## O que é

ArchiveBox é uma poderosa solução de arquivamento de internet auto-hospedada que lhe permite criar o seu próprio arquivo pessoal de páginas web, PDFs, vídeos e mais. Funciona como um arquivo de internet pessoal, guardando conteúdo em múltiplos formatos para preservação a longo prazo.

O sistema consiste em múltiplos componentes:
- **ArchiveBox**: A aplicação principal que fornece a interface web e capacidades de arquivamento
- **Sonic**: Um backend de pesquisa rápido para pesquisa de texto completo em conteúdo arquivado
- **ArchiveBox Scheduler**: Um serviço de fundo para tarefas de arquivamento agendadas
- **NoVNC**: Um cliente VNC baseado na web para arquivamento baseado em navegador

**Características Principais:**
- Guardar páginas web em múltiplos formatos (HTML, PDF, capturas de ecrã, etc.)
- Pesquisa de texto completo em todo o conteúdo arquivado
- Arquivamento agendado de websites e feeds RSS
- Arquivamento baseado em navegador com NoVNC
- Autenticação de utilizador e controlo de acesso
- Extrair e guardar ficheiros multimédia (vídeos, áudio, PDFs, etc.)

**Saiba Mais:**
- [Website Oficial ArchiveBox](https://archivebox.io)
- [Repositório GitHub ArchiveBox](https://github.com/ArchiveBox/ArchiveBox)
- [ArchiveBox Documentação](https://github.com/ArchiveBox/ArchiveBox/wiki)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve                    | Serviço          |
| ----- | --------- | --------- | --------------------------------- | ---------------- |
| 18010 | 8000      | tcp       | Porta da Interface Web ArchiveBox | archivebox       |
| 18082 | 8080      | tcp       | Porta da Interface Web NoVNC      | archivebox_novnc |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                         | No container         | Serviço              |
| ------------------------------- | -------------------- | -------------------- |
| /DATA/AppData/$AppID/data       | /data                | archivebox           |
| /DATA/AppData/$AppID/data       | /data                | archivebox_scheduler |
| /DATA/AppData/$AppID/data/sonic | /var/lib/sonic/store | archivebox_sonic     |

## Variáveis de ambiente

| Variável                 | Valor padrão       | Serviço              |
| ------------------------ | ------------------ | -------------------- |
| ADMIN_USERNAME           | roqueos            | archivebox           |
| ADMIN_PASSWORD           | roqueos            | archivebox           |
| ALLOWED_HOSTS            | *                  | archivebox           |
| CSRF_TRUSTED_ORIGINS     | *                  | archivebox           |
| PUBLIC_INDEX             | True               | archivebox           |
| PUBLIC_SNAPSHOTS         | True               | archivebox           |
| PUBLIC_ADD_VIEW          | False              | archivebox           |
| SEARCH_BACKEND_ENGINE    | sonic              | archivebox           |
| SEARCH_BACKEND_HOST_NAME | archivebox_sonic   | archivebox           |
| SEARCH_BACKEND_PASSWORD  | SomeSecretPassword | archivebox           |
| TIMEOUT                  | 120                | archivebox_scheduler |
| SEARCH_BACKEND_ENGINE    | sonic              | archivebox_scheduler |
| SEARCH_BACKEND_HOST_NAME | archivebox_sonic   | archivebox_scheduler |
| SEARCH_BACKEND_PASSWORD  | SomeSecretPassword | archivebox_scheduler |
| SEARCH_BACKEND_PASSWORD  | SomeSecretPassword | archivebox_sonic     |
| DISPLAY_WIDTH            | 1920               | archivebox_novnc     |
| DISPLAY_HEIGHT           | 1080               | archivebox_novnc     |
| RUN_XTERM                | no                 | archivebox_novnc     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:18010/`.

- **Conta Padrão**
- | Nome de Utilizador | Palavra-passe |
- |--------------------|----------------|
- | `roqueos`           | `roqueos`       |

## Imagens

| Serviço              | Imagem                      |
| -------------------- | --------------------------- |
| archivebox           | archivebox/archivebox:0.7.3 |
| archivebox_scheduler | archivebox/archivebox:0.7.3 |
| archivebox_sonic     | archivebox/sonic:1.4.9      |
| archivebox_novnc     | theasp/novnc:latest         |

## Fonte oficial

Projeto original: **ArchiveBox**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
