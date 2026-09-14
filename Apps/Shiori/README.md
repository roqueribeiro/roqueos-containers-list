# Shiori

> Gerenciador de bookmarks leve em Go (alternativa auto-hospedada ao Pocket)

## O que é

Shiori é um gerenciador de bookmarks simples escrito em Go, pensado como um clone auto-hospedado do Pocket. Interface web limpa, busca full-text, snapshots arquivados de páginas, CLI opcional para power users e baixíssimo consumo de RAM (~30 MB). Ideal para uso pessoal/familiar.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8083 | 8080      | tcp       | Porta da interface web (mapeada para 8083 no host) | shiori  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço |
| -------------------- | ------------ | ------- |
| /DATA/AppData/$AppID | /shiori      | shiori  |

## Variáveis de ambiente

| Variável   | Valor padrão | Serviço |
| ---------- | ------------ | ------- |
| SHIORI_DIR | /shiori      | shiori  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8083/`.

- No primeiro boot, as credenciais padrão são usuário "shiori" e senha "gopher". TROQUE AMBAS após login em http://SEU_IP:8083.
- Extensões para Chrome e Firefox: ver docs oficiais em https://github.com/go-shiori/shiori

## Imagens

| Serviço | Imagem                          |
| ------- | ------------------------------- |
| shiori  | ghcr.io/go-shiori/shiori:v1.7.4 |

## Fonte oficial

Projeto original: **go-shiori**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
