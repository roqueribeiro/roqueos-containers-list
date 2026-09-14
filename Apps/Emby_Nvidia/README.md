# Emby(Nvidia GPU)

> LEVE SEUS MÍDIAS PARA QUALQUER LUGAR COM EMBY

## O que é

Juntar todos os seus vídeos, músicas e fotos em um só lugar nunca foi tão fácil. Seu servidor Emby pessoal converte e transmite seus arquivos de mídia em tempo real para reproduzi-los em qualquer dispositivo.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                     | Serviço |
| ---- | --------- | --------- | ---------------------------------- | ------- |
| 8096 | 8096      | tcp       | Web interface for Emby(Nvidia GPU) | emby    |
| 8920 | 8920      | tcp       | HTTPS web interface                | emby    |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container  | Serviço |
| --------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/config | /config       | emby    |
| /DATA/Media/TV Shows        | /data/tvshows | emby    |
| /DATA/Media/Movies          | /data/movies  | emby    |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço |
| ---------------------- | ------------ | ------- |
| PGID                   | 1000         | emby    |
| PUID                   | 1000         | emby    |
| TZ                     | $TZ          | emby    |
| CPU_FALLBACK           | true         | emby    |
| NVIDIA_VISIBLE_DEVICES | all          | emby    |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8096/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| emby    | linuxserver/emby:4.9.1 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
