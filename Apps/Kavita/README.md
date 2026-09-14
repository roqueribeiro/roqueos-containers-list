# Kavita

> O Kavita é um servidor de banda desenhada e livros baseado na Web, gratuito e de código aberto.

## O que é

O Kavita é uma aplicação de biblioteca digital auto-hospedada, concebida para gerir e ler banda desenhada, light novels e e-books (suporta CBZ, CBR, EPUB, PDF, entre outros), oferecendo uma solução segura e conveniente para coleções de leitura pessoais. A sua interface Web responsiva permite aos utilizadores aceder facilmente ao conteúdo através de qualquer navegador, com leitura em ecrã inteiro e suporte total de localização, ideal para entusiastas de banda desenhada e e-books que pretendem construir bibliotecas digitais personalizadas.

As principais funcionalidades da aplicação incluem uma gestão robusta da biblioteca e uma experiência de leitura melhorada. Os utilizadores podem organizar o conteúdo com coleções, listas de leitura e etiquetas personalizadas, editando metadados para manter as bibliotecas organizadas. O leitor de manga incorporado suporta modo de página dupla, scroll Webtoon e divisão de imagens, enquanto o leitor de e-books oferece fontes, espaçamento e temas personalizáveis, com sincronização de progresso linha a linha entre dispositivos. O leitor de PDF oferece modos claro/escuro e várias definições. Suporta gestão multiutilizador, permitindo permissões personalizadas para partilhar bibliotecas ou restringir o acesso a conteúdos, perfeito para famílias ou equipas. Importações em massa e pesquisa de texto integral simplificam a gestão de grandes coleções.

Pode ser implementado de forma flexível em servidores pessoais ou dispositivos NAS, com uma comunidade ativa que fornece documentação extensa para melhorar a funcionalidade. A monitorização de pastas deteta automaticamente alterações de ficheiros sem análises manuais, e o envio de conteúdo para Kindle ou outros dispositivos melhora o acesso entre dispositivos. Quer esteja a criar um centro de leitura pessoal ou a partilhar media com outros, a interface intuitiva e a elevada personalização da aplicação oferecem uma plataforma de gestão moderna, satisfazendo necessidades desde a leitura casual até coleções profissionais.

**Funcionalidades Principais:**
- Serve Manga/Webtoons/Banda Desenhada (cbr, cbz, zip/rar/rar5, 7zip, imagens brutas) e Livros (epub, pdf)
- Leitores responsivos de primeira classe que funcionam perfeitamente em qualquer dispositivo (telefone, tablet, desktop)
- Suporte de temas personalizáveis: [Repositório de Temas](https://github.com/Kareadita/Themes) e [Documentação](https://wiki.kavitareader.com/guides/themes/)
- Integração de metadados externos e scrobbling para estado de leitura, classificações e críticas (disponível via Kavita+)
- Suporte rico de metadados com filtragem e pesquisa
- Formas de agrupar material de leitura: Coleções, Listas de Leitura (Importação CBL), Quero Ler
- Capacidade de gerir utilizadores com gestão rica baseada em funções para restrições de idade, capacidades dentro da aplicação, etc
- Leitores web ricos que suportam webtoon, modo de leitura contínua (continuar sem sair do leitor), páginas virtuais (epub), etc
- Capacidade de personalizar o seu painel e navegação lateral com filtros inteligentes, ordem personalizada e alternadores de visibilidade
- Capacidade de descarregar metadados (disponível via Kavita+)

**Saiba mais:**
- [Site oficial do Kavita](https://www.kavitareader.com)
- [Repositório GitHub do Kavita](https://github.com/Kareadita/Kavita)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço |
| ---- | --------- | --------- | ---------------- | ------- |
| 5150 | 5000      | tcp       | Porta HTTP WebUI | kavita  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container   | Serviço |
| --------------------------- | -------------- | ------- |
| /DATA/AppData/$AppID/config | /kavita/config | kavita  |
| /DATA/Media/Manga           | /manga         | kavita  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | $TZ          | kavita  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5150/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| kavita  | jvmilazz0/kavita:0.8.8 |

## Fonte oficial

Projeto original: **jvmilazz0**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
