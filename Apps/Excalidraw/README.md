# Excalidraw

> Virtual whiteboard for sketching hand-drawn like diagrams

## O que é

Excalidraw is a virtual hand-drawn style whiteboard platform supporting infinite canvas and end-to-end encrypted collaboration. An intuitive interface offers a hand-drawn experience, ideal for brainstorming, design sketches, or educational scenarios, meeting diverse creative needs.

Core features include an infinite canvas whiteboard and end-to-end encrypted collaboration. Hand-drawn style with shape library support allows creating rich graphics, enhanced by image insertion capabilities. Dark mode improves user experience, catering to diverse users.

It provides export options including PNG, SVG, and clipboard for easy content sharing. Drawing capabilities cover rectangle, circle, diamond, arrow, line, free-draw, and eraser, with arrow-binding and labeled arrow support. Undo, redo, zoom, and panning functionalities optimize operations. With creativity and security at the core, the platform delivers a modern whiteboard design solution.

**Key Features:**
- Infinite canvas whiteboard supporting hand-drawn style
- Shape library support for creating rich graphics
- Image insertion capability
- Dark mode
- Export to PNG, SVG, and clipboard
- Open format - export drawings as an `.excalidraw` json file
- Wide range of tools - rectangle, circle, diamond, arrow, line, free-draw, eraser...
- Arrow-binding & labeled arrows
- Undo and redo
- Zoom and panning support

**Learn More:**
- [Excalidraw Official Website](https://excalidraw.com/)
- [Excalidraw GitHub](https://github.com/excalidraw/excalidraw)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço    |
| ----- | --------- | --------- | --------------- | ---------- |
| 17638 | 80        | tcp       | WebUI HTTP Port | excalidraw |


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
