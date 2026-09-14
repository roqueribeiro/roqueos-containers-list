# BentoPDF

> Caixa de ferramentas de PDF que não sai do seu navegador

## O que é

Seu PDF nunca sai do aparelho. O BentoPDF junta, divide, converte e edita PDF inteiramente dentro do navegador, sem mandar arquivo para servidor nenhum.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve    | Serviço  |
| ---- | --------- | --------- | ----------------- | -------- |
| 3000 | 8080      | tcp       | Web UI HTTP port. | bentopdf |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável     | Valor padrão | Serviço  |
| ------------ | ------------ | -------- |
| PUID         | $PUID        | bentopdf |
| PGID         | $PGID        | bentopdf |
| DISABLE_IPV6 | false        | bentopdf |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

- ## Getting Started
- Open the Web UI at `http://<your-zima-ip>:3000`. BentoPDF is ready to use immediately — there is no account or setup, and files are processed entirely in your browser, never uploaded to a server.
- ## HTTPS for Office conversions
- Converting Office files (Word, Excel, PowerPoint) relies on the browser feature `SharedArrayBuffer`, which is only available in a secure context. When you access BentoPDF over a LAN IP or hostname (anything other than `localhost`), serve it behind HTTPS — for example through CasaOS's reverse proxy — to enable these conversions.

## Imagens

| Serviço  | Imagem                                  |
| -------- | --------------------------------------- |
| bentopdf | ghcr.io/alam00000/bentopdf-simple:2.8.8 |

## Fonte oficial

Projeto original: **BentoPDF**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
