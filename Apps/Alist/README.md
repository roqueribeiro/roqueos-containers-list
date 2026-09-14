# Alist

> Monte o seu disco na nuvem no seu NAS doméstico

## O que é

O Alist transforma a forma como gere e acede aos seus ficheiros em casa, seja na sua televisão, telemóvel ou qualquer outro dispositivo. Ao contrário do armazenamento em nuvem tradicional, o Alist oferece uma experiência unificada em várias plataformas, tornando simples manter os seus média e documentos ao seu alcance.

Com funcionalidades como instalação fácil, suporte para vários fornecedores de armazenamento (local, Aliyundrive, Onedrive, Google Drive), suporte WebDAV, modo escuro, rotas protegidas com autenticação por palavra-passe, pré-visualização de ficheiros para vídeos, áudio, ficheiros de escritório, PDFs, código, imagens, downloads em pacote e em lote, autenticação única, downloads de torrents offline, encriptação de ficheiros e ferramentas adicionais como um editor de texto e proxy de trabalhadores Cloudflare, o Alist garante uma experiência de gestão de ficheiros fluida e segura.

A implementação do Alist em dispositivos de nuvem privada como o Zima proporciona uma conveniência inigualável com acesso multi-dispositivo, garantindo que os seus ficheiros estejam sempre acessíveis e seguros, onde quer que esteja.


Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 5244 | 5244      | tcp       | WebUI HTTP Port | alist   |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container    | Serviço |
| ------------------------- | --------------- | ------- |
| /DATA/AppData/$AppID/data | /opt/alist/data | alist   |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5244/`.

- Após a instalação, verifique a senha inicial no log do contêiner (Configurações - Canto superior direito - Terminal e Registos - Registos).

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
