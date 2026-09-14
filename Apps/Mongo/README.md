# MongoDB

> Um programa de banco de dados orientado a documentos, gratuito e de código aberto, multiplataforma. O MongoDB é classificado como um programa de banco de dados NoSQL e utiliza documentos semelhantes a JSON com esquemas.

## O que é

O MongoDB é um programa de banco de dados orientado a documentos, gratuito e de código aberto, multiplataforma. Classificado como um programa de banco de dados NoSQL, o MongoDB utiliza documentos semelhantes a JSON com esquemas. O MongoDB é desenvolvido pela MongoDB Inc. e é publicado sob uma combinação da Licença Pública do Lado do Servidor e da Licença Apache.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve | Serviço |
| ----- | --------- | --------- | -------------- | ------- |
| 27017 | 27017     | tcp       | MongoDB Port   | mongo   |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                           | No container   | Serviço |
| --------------------------------- | -------------- | ------- |
| /DATA/AppData/mongo/data/configdb | /data/configdb | mongo   |
| /DATA/AppData/mongo/data/db       | /data/db       | mongo   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PUID     | $PUID        | mongo   |
| PGID     | $PGID        | mongo   |
| TZ       | $TZ          | mongo   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:27017/`.

- Esta versão do MongoDB requer uma CPU com suporte AVX. Esta versão do MongoDB não funcionará com ZimaBoard.

## Imagens

| Serviço | Imagem      |
| ------- | ----------- |
| mongo   | mongo:8.2.2 |

## Fonte oficial

Projeto original: **MongoDB Inc.**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
