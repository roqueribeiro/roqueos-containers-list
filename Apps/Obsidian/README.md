# Obsidian

> Obsidian é uma aplicação de gestão de conhecimento para criar, ligar e organizar visualmente notas Markdown.

## O que é

Obsidian é uma aplicação de gestão de conhecimento auto-hospedada concebida para criar, ligar e organizar notas, operando em ficheiros Markdown locais, aproveitando a tecnologia de ambiente de trabalho remoto WebDAV e kasmVNC para proporcionar uma experiência quase nativa em navegadores. A sua interface intuitiva suporta o armazenamento e edição de notas em dispositivos, garantindo propriedade total dos dados, ideal para criar um segundo cérebro duradouro.

As funcionalidades principais da aplicação incluem gestão robusta de notas e conectividade, adequadas para vários cenários. A ligação bidirecional conecta notas relacionadas, formando uma rede de conhecimento, enquanto a Vista de Gráfico visualiza relacionamentos de notas, ajudando utilizadores a descobrir ligações ocultas. Suporta edição Markdown com pré-visualização ao vivo para formatação e estruturação fáceis. Centenas de plugins e temas da comunidade oferecem funcionalidade estendida como calendários, quadros kanban, anotação PDF e pesquisa avançada, permitindo fluxos de trabalho personalizados. A funcionalidade Canvas fornece espaço infinito de organização visual, ajudando estudantes a organizar investigação, escritores a desenvolver histórias, ou profissionais a gerir projetos. As notas são armazenadas como ficheiros Markdown padrão, abríveis com qualquer editor de texto, garantindo portabilidade à prova de futuro.

Melhora a usabilidade através de documentação fornecida pela comunidade, e seja para bases de conhecimento pessoais ou colaboração em equipa, a alta flexibilidade e operação intuitiva da aplicação oferecem uma solução moderna de gestão de conhecimento.

**Características Principais:**
- Armazenamento local, garantindo propriedade total dos dados
- Ligação bidirecional de notas para uma rede de conhecimento
- Vista de Gráfico para visualizar ligações de notas
- Sistema de plugins extensível para necessidades personalizadas
- Suporte Markdown com pré-visualização ao vivo
- Canvas infinito para organização visual
- Personalização de temas para visuais melhorados

**Saiba mais:**
- [Site Oficial Obsidian](https://obsidian.md)
- [DockerHub](https://hub.docker.com/r/linuxserver/obsidian)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                            | Serviço  |
| ----- | --------- | --------- | ----------------------------------------- | -------- |
| 15323 | 3000      | tcp       | Porta da interface desktop Obsidian HTTP  | obsidian |
| 15324 | 3001      | tcp       | Porta da interface desktop Obsidian HTTPS | obsidian |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço  |
| --------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/config | /config      | obsidian |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| PUID     | 1000         | obsidian |
| PGID     | 1000         | obsidian |
| TZ       | $TZ          | obsidian |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:15324/`.

## Imagens

| Serviço  | Imagem                              |
| -------- | ----------------------------------- |
| obsidian | lscr.io/linuxserver/obsidian:1.8.10 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
