# DIUN

> Avisa quando sai imagem nova dos seus containers

## O que é

Diun acompanha os registros das imagens que você usa e avisa quando sai versão nova, por e-mail, Telegram, ntfy e outros. Escrito em Go e entregue como binário único.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container         | Serviço |
| ------------------------- | -------------------- | ------- |
| /DATA/AppData/$AppID/data | /data                | diun    |
| /var/run/docker.sock      | /var/run/docker.sock | diun    |

## Variáveis de ambiente

| Variável              | Valor padrão | Serviço |
| --------------------- | ------------ | ------- |
| TZ                    | UTC          | diun    |
| DIUN_WATCH_WORKERS    | 20           | diun    |
| DIUN_WATCH_SCHEDULE   | 0 */6 * * *  | diun    |
| DIUN_WATCH_JITTER     | 30s          | diun    |
| DIUN_PROVIDERS_DOCKER | true         | diun    |

## Primeiro acesso

Abra o app pelo ícone no RoqueOS depois de instalar.

## Imagens

| Serviço | Imagem                                                                                       |
| ------- | -------------------------------------------------------------------------------------------- |
| diun    | crazymax/diun:4.33.0@sha256:e324b793eb32dfb7f74d3a39421ebf090141caaadee69b8f78da63112408ee25 |

## Fonte oficial

Projeto original: **crazymax**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
