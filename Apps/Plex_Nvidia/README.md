# Plex(Nvidia GPU)

> Seus filmes e séries, servidos da sua casa, com transcodificação por GPU

## O que é

A mesma coisa do Plex, com aceleração por GPU Nvidia para transcodificar vários fluxos ao mesmo tempo sem derrubar o servidor. Mantém o material na qualidade original de Blu-ray e além.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | plex    |
| /DATA/Media                 | /Media       | plex    |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço |
| ---------------------- | ------------ | ------- |
| PGID                   | $PGID        | plex    |
| PUID                   | $PUID        | plex    |
| VERSION                | docker       | plex    |
| CPU_FALLBACK           | true         | plex    |
| NVIDIA_VISIBLE_DEVICES | all          | plex    |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:32400/web/index.html`.

- ## Plex
- #### Stream Movies & TV Shows <br>
- *FAQ*
- Authorized Files and Data to Plex
- 1. Click setting via top right menu of App icon
- 2. map your device's media location in 'Host Path' and link it to Plex's 'Container Path' at /Media for seamless access.
- To add a media library in Plex
- 3. Go to Plex settings
- 4. click 'Add Library'
- 5. select your media type, and specify the path, such as /Media, where your media files are stored for Plex to catalog and include in your library.

### Por que este app pede privilégio

- `networkHost`: descoberta por GDM e DLNA exige a mesma rede física dos clientes

## Imagens

| Serviço | Imagem                          |
| ------- | ------------------------------- |
| plex    | lscr.io/linuxserver/plex:1.41.3 |

## Fonte oficial

Projeto original: **Plex**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
