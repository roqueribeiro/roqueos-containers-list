# Memos

> Memos is a lightweight, self-hosted memo hub. Open Source and Free forever.

## O que é

Memos is a lightweight, open-source, self-hosted note-taking application that offers a secure and streamlined solution for users prioritizing privacy and data control. All notes are stored on the user’s own server, eliminating risks associated with third-party cloud services. Its minimalist Web interface supports Markdown syntax and tag-based organization, enabling effortless capture of ideas, personal knowledge management, or small-scale team collaboration. The open-source design ensures transparency, long-term maintainability, and no subscription costs, making it ideal for users seeking data ownership and cost efficiency.

Designed for simplicity and efficiency, Memos caters to a variety of use cases. Whether jotting down daily thoughts, organizing study notes, or sharing task memos in small teams, Memos delivers a seamless experience through its intuitive tag system and Markdown formatting. Accessible via any web browser, it requires no proprietary clients or complex setup, allowing users to manage notes anytime, anywhere.

Whether used for long-term personal knowledge archiving or as a lightweight tool for team collaboration, Memos offers a secure, flexible, and user-friendly solution, empowering users to maintain full control over their data while enjoying a streamlined note-taking experience.


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 5230 | 5230      | tcp       | WebUI HTTP Port | memos   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container   | Serviço |
| ------------------------- | -------------- | ------- |
| /DATA/AppData/memos/memos | /var/opt/memos | memos   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | $PGID        | memos   |
| PUID     | $PUID        | memos   |
| TZ       | $TZ          | memos   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5230/`.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| memos   | neosmemo/memos:0.25 |

## Fonte oficial

Projeto original: **usememos Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
