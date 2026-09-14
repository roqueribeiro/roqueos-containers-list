# Ntfy.sh

> Notificação no celular por uma linha de comando

## O que é

ntfy manda notificação para o seu celular ou desktop com um simples curl, sem cadastro e sem app de terceiro no meio. Bom para avisar que o backup terminou ou que o disco encheu.

Categoria na App Store do RoqueOS: **Communication**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço |
| ---- | --------- | --------- | ------------------ | ------- |
| 7200 | 80        | tcp       | Container Port: 80 | app     |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container    | Serviço |
| --------------------------- | --------------- | ------- |
| /DATA/AppData/$AppID/cache  | /var/cache/ntfy | app     |
| /DATA/AppData/$AppID/config | /etc/ntfy       | app     |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| TZ       | UTC          | app     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7200/`.

## Imagens

| Serviço | Imagem                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------- |
| app     | binwiederhier/ntfy:v2.27.0@sha256:f2419f405127afa868f10985c1a41449e673477cee1eb19994339a5ae8b592e7 |

## Fonte oficial

Projeto original: **binwiederhier**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
