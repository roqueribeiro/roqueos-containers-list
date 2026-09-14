# Homepage

> Dashboard moderno e customizável para seus serviços auto-hospedados

## O que é

Homepage é um dashboard moderno, totalmente estático, rápido, seguro e via proxy para seus serviços. Altamente customizável via YAML — suporta 100+ integrações (Plex, Sonarr, Radarr, Pi-hole, Home Assistant, etc.) e mostra dados ao vivo de cada serviço.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço  |
| ---- | --------- | --------- | ---------------------- | -------- |
| 3000 | 3000      | tcp       | Porta da interface web | homepage |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container         | Serviço  |
| --------------------------- | -------------------- | -------- |
| /DATA/AppData/$AppID/config | /app/config          | homepage |
| /var/run/docker.sock        | /var/run/docker.sock | homepage |

## Variáveis de ambiente

| Variável               | Valor padrão                           | Serviço  |
| ---------------------- | -------------------------------------- | -------- |
| HOMEPAGE_ALLOWED_HOSTS | localhost:3000,homepage.local,homepage | homepage |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

- Edite /app/config/services.yaml após o primeiro boot para adicionar seus serviços.
- Configure HOMEPAGE_ALLOWED_HOSTS com os domínios pelos quais vai acessar (recurso de segurança adicionado em v0.9+).
- Ver https://gethomepage.dev/configs/services/ para a sintaxe de integração.

## Imagens

| Serviço  | Imagem                               |
| -------- | ------------------------------------ |
| homepage | ghcr.io/gethomepage/homepage:v0.10.7 |

## Fonte oficial

Projeto original: **gethomepage**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
