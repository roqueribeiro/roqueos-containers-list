# Wallabag

> Save and classify articles. Read them later. Freely.

## O que é

Wallabag is a web page saving app that allows users to save articles for offline reading, extracting content for a distraction-free experience. Its intuitive Web interface enables saving articles with a click, ensuring users can read them at their convenience.

The app's core features include convenient web page saving, optimized reading, and flexible content organization. It extracts only the article's content, removing pop-ups and ads, and displays it in a clean, comfortable view. Users can organize saved articles with tags and automatic tagging rules, creating a personalized content library accessible on demand. Browser extensions enable quick saving, compatible with Chrome, Firefox, Opera, and more. Cross-platform clients cover Android, iOS, and other devices, ensuring a seamless reading experience. It also supports multi-user collaboration for sharing saved articles.

It enables importing data from services like Pocket, Readability, Instapaper, or Pinboard, simplifying content library migration. RSS generation allows users to access saved articles in RSS readers. Community documentation enhances usability, and the app's high flexibility and intuitive operation deliver a modern web content management solution.

**Key Features:**
- Save web pages for offline reading
- Extract pure content for a distraction-free reading view
- Article classification with automatic tagging rules for a personalized content library
- Browser extensions for quick web page saving
- Cross-platform clients (Android, iOS, Chrome, Firefox, Opera)
- Multi-user collaboration for sharing saved articles
- Import data from Pocket, Readability, Instapaper, Pinboard and other services
- RSS generation for accessing saved articles in readers

**Learn More:**
- [Wallabag Official Website](https://wallabag.org)
- [Wallabag GitHub Repository](https://github.com/wallabag/wallabag)
- [Wallabag Documentation](https://doc.wallabag.org)
- [Wallabag Docker Image](https://hub.docker.com/r/wallabag/wallabag)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve     | Serviço  |
| ----- | --------- | --------- | ------------------ | -------- |
| 25661 | 80        | tcp       | Wallabag HTTP Port | wallabag |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container                        | Serviço  |
| --------------------------- | ----------------------------------- | -------- |
| /DATA/AppData/$AppID/images | /var/www/wallabag/web/assets/images | wallabag |

## Variáveis de ambiente

| Variável                  | Valor padrão      | Serviço  |
| ------------------------- | ----------------- | -------- |
| SYMFONY__ENV__DOMAIN_NAME | http://<IP>:25661 | wallabag |
| SYMFONY__ENV__SERVER_NAME | Wallabag          | wallabag |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:25661/`.

- You need to set the environment variable `SYMFONY__ENV__DOMAIN_NAME` to your domain name or IP address, which can be modified through the Wallabag settings page.
- **Default Account**
- | Username | Password |
- |----------|----------|
- | `wallabag`    | `wallabag` |

## Imagens

| Serviço  | Imagem                   |
| -------- | ------------------------ |
| wallabag | wallabag/wallabag:2.6.13 |

## Fonte oficial

Projeto original: **wallabag**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
