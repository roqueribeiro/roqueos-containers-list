# LibrePhotos

> Clone auto-hospedado do Google Fotos com reconhecimento facial por IA

## O que é

LibrePhotos é uma alternativa auto-hospedada e open-source ao Google Fotos. Reconhecimento facial com IA, detecção automática de eventos, mapas de localização, geração inteligente de álbuns, detecção de objetos (pets, comida, paisagens) e UI moderna em React. Pesado em RAM/CPU pela inferência ML — recomendamos 4 GB+ de RAM e CPU recente.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve                                          | Serviço |
| ---- | --------- | --------- | ------------------------------------------------------- | ------- |
| 3000 | 3000      | tcp       | Porta da interface web (frontend + backend mesma porta) | backend |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                              | No container             | Serviço |
| ------------------------------------ | ------------------------ | ------- |
| /DATA/AppData/$AppID/db              | /var/lib/postgresql/data | db      |
| /DATA/Photos/librephotos             | /data                    | backend |
| /DATA/AppData/$AppID/protected_media | /protected_media         | backend |
| /DATA/AppData/$AppID/logs            | /logs                    | backend |
| /DATA/AppData/$AppID/cache           | /root/.cache             | backend |

## Variáveis de ambiente

| Variável          | Valor padrão                               | Serviço |
| ----------------- | ------------------------------------------ | ------- |
| POSTGRES_USER     | librephotos                                | db      |
| POSTGRES_PASSWORD | change-me-to-a-long-random-string          | db      |
| POSTGRES_DB       | librephotos                                | db      |
| DB_BACKEND        | postgresql                                 | backend |
| DB_NAME           | librephotos                                | backend |
| DB_USER           | librephotos                                | backend |
| DB_PASS           | change-me-to-a-long-random-string          | backend |
| DB_HOST           | db                                         | backend |
| DB_PORT           | 5432                                       | backend |
| REDIS_HOST        | redis                                      | backend |
| REDIS_PORT        | 6379                                       | backend |
| MAPBOX_API_KEY    | —                                          | backend |
| ADMIN_EMAIL       | admin@example.com                          | backend |
| ADMIN_USERNAME    | admin                                      | backend |
| ADMIN_PASSWORD    | change-me-on-first-boot                    | backend |
| DEBUG             | 0                                          | backend |
| SECRET_KEY        | replace-with-output-of-openssl-rand-hex-32 | backend |
| BACKEND_HOST      | backend                                    | backend |
| FRONTEND_HOST     | localhost                                  | backend |
| WORKERS           | 2                                          | backend |
| WEB_CONCURRENCY   | 2                                          | backend |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3000/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA POSTGRES_PASSWORD E DB_PASS (devem ser iguais) por uma string aleatória longa.
- 2. SUBSTITUA ADMIN_PASSWORD e SECRET_KEY.
- 3. Monte sua biblioteca de fotos em /data — LibrePhotos vai escanear no primeiro boot (pode levar horas para bibliotecas grandes).
- 4. (Opcional) Configure MAPBOX_API_KEY para mapas mais bonitos; usa OpenStreetMap como fallback se vazio.

## Imagens

| Serviço | Imagem                              |
| ------- | ----------------------------------- |
| db      | postgres:13-alpine                  |
| redis   | redis:6-alpine                      |
| backend | reallibrephotos/librephotos:2024w52 |

## Fonte oficial

Projeto original: **LibrePhotos**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
