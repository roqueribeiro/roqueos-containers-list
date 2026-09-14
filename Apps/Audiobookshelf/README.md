# Audiobookshelf

> O Audiobookshelf é um servidor auto-hospedado de audiolivros e podcasts.

## O que é

O Audiobookshelf é um servidor multimédia auto-hospedado concebido para gerir e transmitir audiolivros, podcasts e e-books, oferecendo uma solução segura e flexível para bibliotecas multimédia pessoais. A sua arquitetura leve e interface web intuitiva (disponível como Progressive Web App, PWA) permitem um acesso fácil a partir de qualquer navegador, enquanto as aplicações beta para Android e iOS suportam audição offline, ideal para utilizadores preocupados com a privacidade.

A aplicação suporta streaming instantâneo de todos os formatos de áudio e oferece ferramentas de gestão robustas, incluindo obtenção automática de metadados e capas de várias fontes, carregamentos em massa por arrastar e largar para livros e podcasts, e edição de capítulos com pesquisa via API Audnexus. Os utilizadores podem pesquisar e subscrever podcasts com episódios de download automático ou gerir conteúdos através de feeds RSS abertos. Suporta acesso multiutilizador com permissões personalizadas, garantindo que o progresso de reprodução individual é sincronizado entre dispositivos. Além disso, oferece ferramentas de áudio (como juntar ficheiros em m4b ou incorporar metadados) e suporte experimental para e-books (epub, pdf, cbr, cbz), com a possibilidade de enviar e-books para dispositivos como o Kindle.

Deteta automaticamente atualizações da biblioteca, eliminando a necessidade de novas digitalizações manuais, e inclui cópias de segurança automáticas diárias para proteger os metadados. O suporte Chromecast (na Web e em aplicações Android) melhora as capacidades de streaming, enquanto uma comunidade ativa fornece documentação de suporte para melhorias contínuas. Seja para coleções pessoais ou partilha familiar, a interface intuitiva e as funcionalidades versáteis da aplicação oferecem uma plataforma moderna de gestão multimédia, respondendo a diversas necessidades.

**Funcionalidades Principais:**
- Suporte multi-utilizador com permissões personalizadas
- Mantém o progresso por utilizador e sincroniza entre dispositivos
- Pesquisa e aplica metadados e capas de vários fornecedores
- Editor de capítulos de audiolivros com pesquisa de capítulos
- Ferramentas de audiolivros: Incorpora metadados em ficheiros de áudio e une múltiplos ficheiros de áudio num único m4b
- Pesquisa e adiciona podcasts para descarregar episódios com descarga automática
- Feeds RSS abertos para audiolivros e episódios de podcast
- Cópias de segurança com agendamento automatizado de cópias de segurança
- Suporte básico de ebook e leitor eletrónico (epub, pdf, cbr, cbz) + envio para dispositivo (ex. Kindle)

**Saiba mais:**
- [Site oficial do Audiobookshelf](https://audiobookshelf.org)
- [Repositório GitHub do Audiobookshelf](https://github.com/advplyr/audiobookshelf)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço        |
| ----- | --------- | --------- | ---------------- | -------------- |
| 13378 | 80        | tcp       | Porta HTTP WebUI | audiobookshelf |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container | Serviço        |
| ----------------------------- | ------------ | -------------- |
| /DATA/Media/Audiobooks        | /audiobooks  | audiobookshelf |
| /DATA/Media/Podcasts          | /podcasts    | audiobookshelf |
| /DATA/AppData/$AppID/config   | /config      | audiobookshelf |
| /DATA/AppData/$AppID/metadata | /metadata    | audiobookshelf |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:13378/`.

## Imagens

| Serviço        | Imagem                                |
| -------------- | ------------------------------------- |
| audiobookshelf | ghcr.io/advplyr/audiobookshelf:2.30.0 |

## Fonte oficial

Projeto original: **advplyr**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
