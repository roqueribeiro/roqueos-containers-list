# phpMyAdmin

> A interface clássica de administração de MySQL e MariaDB

## O que é

phpMyAdmin é a interface web mais conhecida para administrar MySQL e MariaDB: roda consulta, edita tabela, importa e exporta dump.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço    |
| ---- | --------- | --------- | ---------------------------- | ---------- |
| 8080 | 80        | tcp       | Web interface for phpMyAdmin | phpmyadmin |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável     | Valor padrão            | Serviço    |
| ------------ | ----------------------- | ---------- |
| PMA_HOST     | [YOUR-CASAOS-IP]        | phpmyadmin |
| PMA_PORT     | 3306                    | phpmyadmin |
| PMA_USER     | bigbear                 | phpmyadmin |
| PMA_PASSWORD | change-me-on-first-boot | phpmyadmin |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

## Imagens

| Serviço    | Imagem                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------- |
| phpmyadmin | phpmyadmin/phpmyadmin:5.2.3@sha256:42a200db07b4e70fbf32c594ad4521cf16399b8e54bbb5adceae98e7566dfbeb |

## Fonte oficial

Projeto original: **phpMyAdmin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
