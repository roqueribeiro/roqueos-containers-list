# Lychee

> Gerenciamento de fotos auto-hospedado com álbuns, compartilhamento e mapa EXIF

## O que é

Lychee é uma ferramenta gratuita e open-source de gerenciamento de fotos que roda no seu servidor. Suba, organize e compartilhe fotos como em qualquer outro app — mas com a vantagem de estar no seu servidor. Organização por álbuns, compartilhamento por link, exibição de EXIF/GPS, mapa de geotagging, slideshow e UI responsiva e limpa.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 8086 | 80        | tcp       | Porta da interface web | lychee  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço |
| ---------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/conf    | /conf        | lychee  |
| /DATA/AppData/$AppID/uploads | /uploads     | lychee  |
| /DATA/AppData/$AppID/sym     | /sym         | lychee  |
| /DATA/AppData/$AppID/logs    | /logs        | lychee  |

## Variáveis de ambiente

| Variável      | Valor padrão                                    | Serviço |
| ------------- | ----------------------------------------------- | ------- |
| DB_CONNECTION | sqlite                                          | lychee  |
| APP_KEY       | replace-with-output-of-php-artisan-key-generate | lychee  |
| APP_NAME      | Lychee                                          | lychee  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8086/`.

- SUBSTITUA APP_KEY antes do primeiro boot. Gere com `docker run --rm lycheeorg/lychee php artisan key:generate --show`.
- Default usa SQLite — para 1000+ fotos, mude para MySQL/PostgreSQL via variável DB_CONNECTION.

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| lychee  | lycheeorg/lychee:v6.6.4 |

## Fonte oficial

Projeto original: **LycheeOrg**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
