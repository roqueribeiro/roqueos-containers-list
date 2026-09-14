# FileDrop

> O FileDrop é um serviço de partilha de ficheiros gratuito e de código aberto.

## O que é

O FileDrop é um serviço de partilha de ficheiros auto-hospedado que lhe permite partilhar facilmente ficheiros com a família, amigos ou colegas. Foi concebido para ser fácil de utilizar e com poucos recursos.


Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço  |
| ---- | --------- | --------- | -------------- | -------- |
| 8000 | 8000      | tcp       | —              | filedrop |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container         | Serviço  |
| --------------------------- | -------------------- | -------- |
| /DATA/AppData/filedrop/data | /var/file_drop_files | filedrop |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| PGID     | $PGID        | filedrop |
| PUID     | $PUID        | filedrop |
| TZ       | $TZ          | filedrop |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

## Imagens

| Serviço  | Imagem               |
| -------- | -------------------- |
| filedrop | noecl/filedrop:1.0.1 |

## Fonte oficial

Projeto original: **Noé Favier (noe.favier@outlook.com)**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
