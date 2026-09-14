# Nextcloud

> A plataforma de produtividade que mantém você sob controle

## O que é

O Nextcloud coloca seus dados nas suas mãos, sob o seu controle. Armazene seus documentos, calendário, contatos e fotos em um servidor em casa, em um de nossos provedores ou em um centro de dados que você confia.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm, arm64, 386, mips64le, ppc64le, s390x.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço   |
| ----- | --------- | --------- | ---------------- | --------- |
| 10081 | 80        | tcp       | WebUI HTTP Port  | nextcloud |
| 10443 | 443       | tcp       | WebUI HTTPS Port | nextcloud |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                           | No container  | Serviço   |
| --------------------------------- | ------------- | --------- |
| /DATA/AppData/$AppID/var/www/html | /var/www/html | nextcloud |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:10081/`.

## Imagens

| Serviço   | Imagem         |
| --------- | -------------- |
| nextcloud | nextcloud:32.0 |

## Fonte oficial

Projeto original: **Nextcloud**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
