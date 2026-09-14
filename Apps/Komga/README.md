# Komga

> O Komga é um servidor multimédia para as suas bandas desenhadas, mangas, revistas e eBooks.

## O que é

O Komga é uma aplicação auto-hospedada concebida para gerir bandas desenhadas, manga, revistas e e-books (suporta os formatos CBZ, CBR, PDF e EPUB), oferecendo uma solução segura e conveniente para bibliotecas multimédia pessoais. A sua interface Web responsiva permite aos utilizadores aceder e gerir conteúdos facilmente através de qualquer navegador, sem instalações locais complexas – ideal para entusiastas de banda desenhada e e-books.

As principais funcionalidades da aplicação incluem organização versátil de conteúdos e diversas opções de leitura. Os utilizadores podem organizar a sua biblioteca com coleções e listas de leitura, editar metadados de séries ou livros e manter o conteúdo bem organizado. Integra um leitor Web incorporado, suporta extensões Mihon SDK ou liga-se a leitores OPDS de terceiros, respondendo a diferentes preferências de leitura. Quer esteja a gerir uma coleção pessoal de banda desenhada ou a partilhar e-books com a família, suporta acesso multiutilizador e proporciona uma experiência de navegação fluida. A importação em massa simplifica a gestão de grandes bibliotecas multimédia, perfeita para uma organização eficiente de conteúdos.

Pode ser implementada de forma flexível em servidores pessoais ou dispositivos NAS, com uma comunidade ativa a fornecer documentação de suporte, permitindo aos utilizadores expandir as funcionalidades através de recursos comunitários. Quer esteja a construir uma biblioteca digital pessoal ou um hub privado de partilha de multimédia, a interface intuitiva e a elevada personalização da aplicação oferecem uma plataforma de gestão multimédia segura e moderna, adequada desde a leitura casual até às coleções profissionais.

**Funcionalidades Principais:**
- Organize a sua biblioteca com coleções e listas de leitura
- Edite metadados para as suas séries e livros
- Importe metadados incorporados automaticamente
- Leitor web com múltiplos modos de leitura
- Gira múltiplos utilizadores, com controlo de acesso por biblioteca, restrições de idade e restrições de etiquetas
- Oferece uma API REST, muitas ferramentas e scripts da comunidade podem interagir com o Komga
- Suporte OPDS v1 e v2
- Sincronização Kobo com o seu eReader Kobo
- Sincronização KOReader
- Descarregue ficheiros de livros, séries completas ou listas de leitura
- Deteção de ficheiros duplicados
- Deteção e remoção de páginas duplicadas
- Importe livros de fora das suas bibliotecas diretamente para a pasta da série
- Importe listas de leitura ComicRack cbl

**Saiba mais:**
- [Site oficial do Komga](https://komga.org)
- [Repositório GitHub do Komga](https://github.com/gotson/komga)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço |
| ----- | --------- | --------- | ---------------- | ------- |
| 25600 | 25600     | tcp       | Porta HTTP WebUI | komga   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container  | Serviço |
| --------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/config | /config       | komga   |
| /DATA/AppData/$AppID/data   | /data         | komga   |
| /etc/timezone               | /etc/timezone | komga   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | 1000         | komga   |
| PUID     | 1000         | komga   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:25600/`.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| komga   | gotson/komga:1.23.6 |

## Fonte oficial

Projeto original: **gotson**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
