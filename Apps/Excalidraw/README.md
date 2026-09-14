# Excalidraw

> Quadro branco virtual para esboçar diagramas estilo desenho à mão

## O que é

O Excalidraw é uma plataforma de quadro branco virtual de estilo desenhado à mão que suporta tela infinita e colaboração encriptada ponto-a-ponto. Uma interface intuitiva oferece experiência desenhada à mão, ideal para brainstorming, esboços de design ou cenários educacionais, atendendo diversas necessidades criativas.

As funcionalidades principais incluem quadro branco de tela infinita e colaboração encriptada ponto-a-ponto. Estilo desenhado à mão com suporte de biblioteca de formas permite criar gráficos ricos, melhorado por capacidades de inserção de imagens. O modo escuro melhora a experiência do utilizador, atendendo utilizadores diversos.

Fornece opções de exportação incluindo PNG, SVG e área de transferência para partilha fácil de conteúdo. As capacidades de desenho cobrem rectângulo, círculo, diamante, seta, linha, desenho livre e borracha, com suporte de ligação de seta e setas etiquetadas.

**Funcionalidades Principais:**
- Quadro branco de tela infinita suporta estilo desenhado à mão
- Suporte de biblioteca de formas para criar gráficos ricos
- Capacidade de inserção de imagens
- Modo escuro
- Exportação para PNG, SVG e área de transferência
- Formato aberto - exportar desenhos como ficheiro json `.excalidraw`
- Ampla gama de ferramentas - rectângulo, círculo, diamante, seta, linha, desenho livre, borracha...
- Ligação de setas e setas etiquetadas
- Desfazer e refazer
- Suporte de zoom e panorâmica

**Saber Mais:**
- [Website Oficial Excalidraw](https://excalidraw.com/)
- [Excalidraw GitHub](https://github.com/excalidraw/excalidraw)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço    |
| ----- | --------- | --------- | ---------------- | ---------- |
| 17638 | 80        | tcp       | Porta HTTP WebUI | excalidraw |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:17638/`.

## Imagens

| Serviço    | Imagem                       |
| ---------- | ---------------------------- |
| excalidraw | excalidraw/excalidraw:latest |

## Fonte oficial

Projeto original: **excalidraw**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
