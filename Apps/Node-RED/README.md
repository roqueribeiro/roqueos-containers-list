# Node-RED

> Low-code programming for event-driven applications

## O que é

Node-RED is a flow-based low-code development platform that enables creating automation tasks and applications by connecting various nodes. A browser-based editor, simple to use, makes it ideal for users in home automation, industrial control, or other fields to quickly build data processing flows.

Core features include a low-code flow editor and robust data handling. Built on Node.js with an event-driven, non-blocking model, the platform supports real-time data collection, transformation, and visualization. A palette with over 5000 nodes allows users to construct flows via drag-and-drop. A rich text editor enables creating JavaScript functions for enhanced customization.

It stores flows in JSON format, facilitating easy import and export for sharing. A built-in library allows saving useful functions, templates, or flows for reuse, and an online flow library supports sharing top flows globally. With ease of use and efficiency at the core, the platform delivers a modern solution for diverse automation needs.

**Key Features:**
- Browser-based low-code flow editor with drag-and-drop node connections
- Real-time data collection, transformation, and visualization
- Event-driven, non-blocking model with Node.js
- Palette with over 5000 nodes for extended functionality
- Rich text editor for creating JavaScript functions
- JSON-based flow storage for easy sharing
- Built-in library for saving functions, templates, and flows
- Online flow library for sharing top flows

**Learn More:**
- [Node-RED Official Website](https://nodered.org/)
- [Node-RED GitHub](https://github.com/node-red/node-red)


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64, s390x, arm.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço  |
| ---- | --------- | --------- | --------------- | -------- |
| 1880 | 1880      | tcp       | WebUI HTTP Port | node-red |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço  |
| ------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/data | /data        | node-red |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1880/`.

### Por que este app pede privilégio

- `networkHost`: descoberta e controle de dispositivos IoT na rede local

## Imagens

| Serviço  | Imagem                 |
| -------- | ---------------------- |
| node-red | nodered/node-red:4.1.2 |

## Fonte oficial

Projeto original: **Node-RED**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
