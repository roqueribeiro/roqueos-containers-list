# Radarr

> O gerenciador de coleções de filmes para usuários de Usenet e BitTorrent

## O que é

Radarr é um gerenciador de coleções de filmes para usuários de Usenet e BitTorrent. Ele pode monitorar vários feeds RSS para encontrar novos filmes e interagir com clientes e indexadores para classificá-los, renomeá-los e baixá-los. Ele também pode ser configurado para atualizar automaticamente a qualidade dos arquivos existentes na biblioteca quando uma qualidade melhor estiver disponível. Observe que apenas um tipo de filme específico é suportado. Se você deseja uma versão 4k e uma versão 1080p de um filme específico, você precisará de várias instâncias.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 7878 | 7878      | tcp       | WebUI HTTP Port | radarr  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | radarr  |
| /DATA/Media/Movies          | /movies      | radarr  |
| /DATA/Downloads             | /downloads   | radarr  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | $PGID        | radarr  |
| PUID     | $PUID        | radarr  |
| TZ       | $TZ          | radarr  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7878/`.

## Imagens

| Serviço | Imagem                    |
| ------- | ------------------------- |
| radarr  | linuxserver/radarr:5.26.2 |

## Fonte oficial

Projeto original: **Radarr**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
