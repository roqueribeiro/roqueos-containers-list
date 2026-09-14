# Alist

> Mount your cloud drive on your home NAS

## O que é

Alist transforms how you manage and access your files at home, whether on your TV, phone, or any other device. Unlike traditional cloud storage, Alist offers a unified experience across multiple platforms, making it a breeze to keep your media and documents at your fingertips.

With features like easy installation, support for multiple storage providers (local, Aliyundrive, Onedrive, Google Drive), WebDAV support, dark mode, protected routes with password authentication, file previews for videos, audio, office files, PDFs, code, images, package and batch downloads, single sign-on, offline torrent downloads, file encryption, and additional tools like a text editor and Cloudflare workers proxy, Alist ensures a seamless and secure file management experience.

Deploying Alist on private cloud devices like Zima brings unmatched convenience with multi-device access, ensuring your files are always within reach and secure, no matter where you are.


Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 5244 | 5244      | tcp       | WebUI HTTP Port | alist   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container    | Serviço |
| ------------------------- | --------------- | ------- |
| /DATA/AppData/$AppID/data | /opt/alist/data | alist   |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5244/`.

- After installation, please check the initial password in the container log (Settings - TopRight - Terminal and Logs - Logs).

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| alist   | xhofe/alist:v3.40.0 |

## Fonte oficial

Projeto original: **Xhofe**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
