# Roon Server

> O servidor do Roon, para quem leva música a sério

## O que é

O Roon transforma a experiência de ouvir música com metadados ricos, descoberta de acervo e som de qualidade audiófila. Funciona tanto com serviços de streaming quanto com os arquivos que você já tem.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container | Serviço    |
| -------------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/Roon        | /Roon        | roonserver |
| /DATA/Media/Music                | /Music       | roonserver |
| /DATA/AppData/$AppID/RoonBackups | /RoonBackups | roonserver |
| /run/udev                        | /run/udev    | roonserver |

## Variáveis de ambiente

| Variável            | Valor padrão | Serviço    |
| ------------------- | ------------ | ---------- |
| ROON_INSTALL_BRANCH | production   | roonserver |
| TZ                  | $TZ          | roonserver |

## Primeiro acesso

Abra o app pelo ícone no RoqueOS depois de instalar.

- RoonServer has no WebUI. After installation, use the Roon app on a device on the same LAN to discover and configure this server.

### Por que este app pede privilégio

- `networkHost`: o Roon descobre e controla aparelhos de áudio na rede local por broadcast
- `capAdd`: SYS_ADMIN e DAC_READ_SEARCH para montar e ler o acervo de música do host

## Imagens

| Serviço    | Imagem                            |
| ---------- | --------------------------------- |
| roonserver | ghcr.io/roonlabs/roonserver:1.0.8 |

## Fonte oficial

Projeto original: **Roon Labs**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
