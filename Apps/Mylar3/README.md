# Mylar3

> Download automático de quadrinhos (cbr/cbz)

## O que é

Mylar é um programa de download automático de quadrinhos (cbr / cbz) para uso com NZB e torrents. Mylar permite que você crie uma lista de acompanhamento de séries que monitora várias coisas (novos problemas, informações atualizadas, etc.). Ele coletará, classificará e renomeará os problemas baixados. Ele também permitirá que você monitore listas de extração semanais para baixar itens que pertencem às séries da lista de acompanhamento, bem como monitorar e manter arcos da história.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 8090 | 8090      | tcp       | —              | mylar3  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/mylar3/config | /config      | mylar3  |
| /DATA/Media/Comics          | /comics      | mylar3  |
| /DATA/Downloads             | /downloads   | mylar3  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | $PGID        | mylar3  |
| PUID     | $PUID        | mylar3  |
| TZ       | $TZ          | mylar3  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8090/`.

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| mylar3  | linuxserver/mylar3:0.8.3 |

## Fonte oficial

Projeto original: **Mylar3 Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
