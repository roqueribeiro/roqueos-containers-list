# MinIO

> Servidor de object storage de alta performance compatível com S3

## O que é

MinIO é um servidor de object storage de alta performance, compatível com S3. A escolha de fato para S3 auto-hospedado — usado por operadores Kubernetes, pipelines IA/ML, ferramentas de backup (Restic, Duplicati), galerias de fotos (Immich, PhotoPrism) e qualquer aplicação que fale S3. Binário único, escala horizontalmente para clusters multi-petabyte.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                   | Serviço |
| ---- | --------- | --------- | ------------------------------------------------ | ------- |
| 9100 | 9000      | tcp       | Porta da API S3 (mapeada para 9100 no host)      | minio   |
| 9101 | 9001      | tcp       | Porta do console web (mapeada para 9101 no host) | minio   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /data        | minio   |

## Variáveis de ambiente

| Variável                   | Valor padrão                      | Serviço |
| -------------------------- | --------------------------------- | ------- |
| MINIO_ROOT_USER            | roqueos-admin                     | minio   |
| MINIO_ROOT_PASSWORD        | change-me-to-a-long-random-string | minio   |
| MINIO_BROWSER_REDIRECT_URL | http://localhost:9101             | minio   |
| MINIO_SERVER_URL           | http://localhost:9100             | minio   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9101/`.

- SUBSTITUA MINIO_ROOT_PASSWORD antes do primeiro boot.
- API S3 na porta 9100 (use com `aws-cli`, CLI mc, SDKs S3). Console web na porta 9101.
- Após boot, login no console, crie access keys, depois aponte seus clientes S3 para http://SEU_IP:9100.

## Imagens

| Serviço | Imagem                                           |
| ------- | ------------------------------------------------ |
| minio   | quay.io/minio/minio:RELEASE.2025-06-13T11-33-47Z |

## Fonte oficial

Projeto original: **minio**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
