# Plex(Nvidia GPU)

> Stream Movies & TV Shows

## O que é

Transform your home into a cinematic oasis with your very own media server. Unlike streaming platforms that compress and limit the quality of your content, a Plex server in your home allows you to maintain the pristine, high-bitrate glory of Blu-ray and beyond. Imagine pairing this high-fidelity, uninterrupted media access with cutting-edge home theater tech like VR headsets, 75-inch UHD TVs, or 100-inch laser projectors. The result? A breathtaking visual and auditory experience that streams seamlessly across TVs and mobile devices alike, right from the comfort of your couch. 

Deploy Plex on a Zima devices and unlock the ultimate in home entertainment convenience. Enjoy ALMOST limitless storage capacity for your entire media library, lightning-fast local network speeds, and the ability to stream content effortlessly to any device in your home. Experience a world where your favorite shows and movies are always just a click away, stored securely and privately on your own terms.


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
