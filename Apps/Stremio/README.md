# Stremio

> Stremio é um centro de mídia moderno que lhe dá a liberdade de assistir a tudo o que você quiser.

## O que é

Stremio oferece uma experiência de entretenimento segura, moderna e perfeita. Com sua interface fácil de usar e uma biblioteca de conteúdo diversificada, incluindo suporte a 4K HDR, os usuários podem curtir seus filmes e programas de TV favoritos em todos os seus dispositivos. E com seu compromisso com a segurança, o Stremio é a escolha definitiva para uma experiência de streaming sem preocupações e de alta qualidade.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço |
| ----- | --------- | --------- | --------------- | ------- |
| 11470 | 11470     | tcp       | Porta do Server | stremio |
| 8100  | 8080      | tcp       | —               | stremio |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container          | Serviço |
| --------------------------- | --------------------- | ------- |
| /DATA/AppData/$AppID/config | /root/.stremio-server | stremio |

## Variáveis de ambiente

| Variável        | Valor padrão | Serviço |
| --------------- | ------------ | ------- |
| NO_CORS         | 1            | stremio |
| AUTO_SERVER_URL | 1            | stremio |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8100/`.

## Imagens

| Serviço | Imagem                         |
| ------- | ------------------------------ |
| stremio | tsaridas/stremio-docker:v1.2.5 |

## Fonte oficial

Projeto original: **Andreas Tsarida / Stremio**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
