# Heimdall

> Dashboard de aplicações para self-hosters (clássico open-source)

## O que é

Heimdall é um dashboard de aplicações lindamente projetado. Uma forma de organizar todos os seus sites e apps mais usados. Categorias de apps embutidas, reordenamento drag-and-drop, backgrounds customizados, busca, integrações API opcionais (Sonarr, Radarr, Plex) para status ao vivo. O dashboard open-source clássico para self-hosters.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve                                | Serviço  |
| ---- | --------- | --------- | --------------------------------------------- | -------- |
| 8093 | 80        | tcp       | Porta WebUI HTTP (mapeada para 8093 no host)  | heimdall |
| 8493 | 443       | tcp       | Porta WebUI HTTPS (mapeada para 8493 no host) | heimdall |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço  |
| -------------------- | ------------ | -------- |
| /DATA/AppData/$AppID | /config      | heimdall |

## Variáveis de ambiente

| Variável | Valor padrão      | Serviço  |
| -------- | ----------------- | -------- |
| PUID     | 1000              | heimdall |
| PGID     | 1000              | heimdall |
| TZ       | America/Sao_Paulo | heimdall |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8093/`.

- No primeiro boot, sem autenticação — qualquer um com a URL acessa. Habilite autenticação em Settings > Users.
- Adicione tiles de apps pelo botão "+" — Heimdall tem 200+ ícones embutidos.
- Use junto com Homepage (também no catálogo) se quiser dashboard com widgets ao vivo — coexistem bem.

## Imagens

| Serviço  | Imagem                     |
| -------- | -------------------------- |
| heimdall | linuxserver/heimdall:2.6.3 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
