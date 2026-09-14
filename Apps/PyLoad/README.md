# PyLoad

> Gerenciador de download gratuito.

## O que é

pyLoad é um gerenciador de download gratuito e de código aberto escrito em Python e projetado para ser extremamente leve, facilmente extensível e totalmente gerenciável via web.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve              | Serviço |
| ---- | --------- | --------- | --------------------------- | ------- |
| 8000 | 8000      | tcp       | WebUI HTTP Port             | pyload  |
| 9666 | 9666      | tcp       | PyLoad listening Port (TCP) | pyload  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | pyload  |
| /DATA/Downloads             | /downloads   | pyload  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | $PGID        | pyload  |
| PUID     | $PUID        | pyload  |
| TZ       | $TZ          | pyload  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

- Conta Padrão
- | Usuário | Senha |
- |----------|----------|
- | `pyload`    | `pyload` |
- Diretório padrão no Pyload
- | Nome | Valor |
- | ---- | ----- |
- | Diretório de Download | `/DATA/Downloads` |

## Imagens

| Serviço | Imagem                      |
| ------- | --------------------------- |
| pyload  | linuxserver/pyload-ng:0.5.0 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
