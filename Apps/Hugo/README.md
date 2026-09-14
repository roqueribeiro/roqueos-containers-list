# Hugo

> The world's fastest framework for building websites

## O que é

Hugo is a high-speed static site generation platform written in Go, optimized for speed and designed for flexibility. Advanced templating system and fast asset pipelines render a complete website in seconds, ideal for creating documentation sites, landing pages, and various project websites.

Core features include optimized speed and a flexible framework. Concurrency in Go enables rapid rendering, supporting image processing (convert, resize, crop, rotate, adjust colors, apply filters, overlay text/images, extract EXIF data), JavaScript bundling (tree shaking, code splitting), Sass processing, and TailwindCSS support. Multilingual support and taxonomy system make it suitable for diverse sites like documentation, news, or events.

It includes an embedded web server for real-time previews of content, structure, and style changes during development. Frequent releases ensure ongoing feature enhancements, keeping it cutting-edge. With efficiency and flexibility at the core, the platform delivers a modern static site generation solution.

**Key Features:**
- High-speed rendering, generating sites in seconds
- Fast asset pipelines: image processing, JavaScript bundling, Sass, and TailwindCSS support
- Flexible framework with multilingual and taxonomy systems
- Embedded web server for real-time development previews
- Rich ecosystem of themes and plugins


**Prerequisites for Using Hugo:**

1. Open command line, navigate to `/DATA/AppData/hugo/project` directory

```cd /DATA/AppData/hugo/project```

2. Initialize the `project` directory as an empty Git repository

```git init```

3. Download the Ananke theme

```git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke```

4. Specify the current theme

```echo "theme = 'ananke'" >> hugo.toml```

5. Restart Hugo


**Learn More:**
- [Hugo Official Website](https://gohugo.io/)
- [Hugo GitHub](https://github.com/gohugoio/hugo)


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 1313 | 1313      | tcp       | WebUI HTTP Port | hugo    |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço |
| ---------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/project | /project     | hugo    |
| /DATA/AppData/$AppID/cache   | /cache       | hugo    |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1313/`.

- We recommend reviewing the [Quick Start](https://gohugo.io/getting-started/quick-start/) documentation to learn how to use Hugo.

## Imagens

| Serviço | Imagem                         |
| ------- | ------------------------------ |
| hugo    | ghcr.io/gohugoio/hugo:v0.152.2 |

## Fonte oficial

Projeto original: **gohugoio**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
