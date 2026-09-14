# JDownloader2

> Free & open-source download management tool

## O que é

JDownloader is a free, open-source download management tool with a huge community that makes downloading as easy and fast as it should be. Users can start, stop or pause downloads, set bandwith limitations, auto-extract archives and much more. It's an easy-to-extend framework that can save hours of your valuable time every day!

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                                                                                                                                                                                                                                                                                                                                                    | Serviço      |
| ---- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 5800 | 5800      | tcp       | Port to access the application's GUI via the web interface. Mapping to the host is optional if access through the web interface is not wanted. For a container not using the default bridge network, the port can be changed with the WEB_LISTENING_PORT environment variable.                                                                                                                    | jdownloader2 |
| 5900 | 5900      | tcp       | Port to access the application's GUI via the VNC protocol. Mapping to the host is optional if access through the VNC protocol is not wanted. For a container not using the default bridge network, the port can be changed with the VNC_LISTENING_PORT environment variable.                                                                                                                      | jdownloader2 |
| 3129 | 3129      | tcp       | Port used by MyJDownloader mobile applications and browser extensions to establish a direct connect to the JDownloader Docker container instance. Port needs to be exposed only if MyJDownloader is enabled and configured in Direct Connection mode. NOTE: Since this port is being reported to the MyJDownloader online service, the port mapped on the host side must be the same (i.e. 3129). | jdownloader2 |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                           | No container | Serviço      |
| --------------------------------- | ------------ | ------------ |
| /DATA/AppData/jdownloader2/config | /config      | jdownloader2 |
| /DATA/Downloads                   | /output      | jdownloader2 |

## Variáveis de ambiente

| Variável                  | Valor padrão               | Serviço      |
| ------------------------- | -------------------------- | ------------ |
| USER_ID                   | $PUID                      | jdownloader2 |
| GROUP_ID                  | $PGID                      | jdownloader2 |
| TZ                        | $TZ                        | jdownloader2 |
| MYJDOWNLOADER_EMAIL       | $MYJDOWNLOADER_EMAIL       | jdownloader2 |
| MYJDOWNLOADER_PASSWORD    | $MYJDOWNLOADER_PASSWORD    | jdownloader2 |
| MYJDOWNLOADER_DEVICE_NAME | $MYJDOWNLOADER_DEVICE_NAME | jdownloader2 |
| JDOWNLOADER_HEADLESS      | $JDOWNLOADER_HEADLESS      | jdownloader2 |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5800/`.

## Imagens

| Serviço      | Imagem                       |
| ------------ | ---------------------------- |
| jdownloader2 | jlesage/jdownloader-2:latest |

## Fonte oficial

Projeto original: **jdownloader**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
