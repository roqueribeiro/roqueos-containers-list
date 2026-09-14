# Kopia

> Backup rápido e seguro com dedup, criptografia e 10+ backends

## O que é

Kopia é uma ferramenta de backup open-source rápida e segura com deduplicação, compressão, criptografia (AES-256-GCM) e uma UI web bonita. Faz backup para disco local, S3, B2, GCS, Azure, SFTP, WebDAV, rclone — para qualquer lugar. Baseada em snapshots com armazenamento content-addressable. Clientes multiplataforma (Linux/macOS/Windows) podem compartilhar repositórios.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                  | Serviço |
| ----- | --------- | --------- | ------------------------------- | ------- |
| 51515 | 51515     | tcp       | Porta da interface web do Kopia | kopia   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /app/config  | kopia   |
| /DATA/AppData/$AppID/cache  | /app/cache   | kopia   |
| /DATA/AppData/$AppID/logs   | /app/logs    | kopia   |
| /DATA                       | /data        | kopia   |

## Variáveis de ambiente

| Variável       | Valor padrão                      | Serviço |
| -------------- | --------------------------------- | ------- |
| KOPIA_PASSWORD | change-me-to-a-long-random-string | kopia   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:51515/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA o valor de `--server-password` E KOPIA_PASSWORD por strings aleatórias longas.
- 2. KOPIA_PASSWORD criptografa o repositório — perdê-la significa perder todos os backups.
- 3. Após boot, configure um repositório em http://SEU_IP:51515 (path filesystem /data, bucket S3, etc.).
- 4. /data está montado em modo leitura a partir de /DATA no host — Kopia lê os arquivos de origem dali.

## Imagens

| Serviço | Imagem             |
| ------- | ------------------ |
| kopia   | kopia/kopia:0.18.2 |

## Fonte oficial

Projeto original: **kopia**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
