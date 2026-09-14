# Collabora Online

> Suite de escritório online baseada em LibreOffice (compatível Nextcloud)

## O que é

Collabora Online (CODE) é o suite de escritório online open-source baseado no LibreOffice. Edite documentos, planilhas e apresentações direto no navegador via Nextcloud, ownCloud ou qualquer host compatível WOPI. Nativo em ODF com suporte round-trip a Microsoft Office.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço   |
| ---- | --------- | --------- | ---------------------- | --------- |
| 9980 | 9980      | tcp       | Porta WOPI / WebSocket | collabora |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável     | Valor padrão                                  | Serviço   |
| ------------ | --------------------------------------------- | --------- |
| domain       | cloud\\.example\\.com                         | collabora |
| username     | admin                                         | collabora |
| password     | change-me-on-first-boot                       | collabora |
| extra_params | --o:ssl.enable=false --o:ssl.termination=true | collabora |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9980/`.

- ANTES DO PRIMEIRO BOOT:
- 1. SUBSTITUA `domain` (regex) com o host Nextcloud/ownCloud escapado (ex: `nextcloud\\.example\\.com`).
- 2. SUBSTITUA `password` do console admin em /browser/dist/admin/admin.html.
- 3. No admin do Nextcloud: instale o app "Nextcloud Office", configure URL do Collabora para http://SEU_IP:9980.

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço   | Imagem                      |
| --------- | --------------------------- |
| collabora | collabora/code:24.04.10.1.1 |

## Fonte oficial

Projeto original: **CollaboraOnline**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
