# Stirling-PDF

> Conjunto de ferramentas PDF auto-hospedado (50+ operações, OCR, assinatura, redação)

## O que é

Stirling-PDF é uma ferramenta web poderosa e auto-hospedada de manipulação de PDF com 50+ operações — dividir, juntar, comprimir, watermark, OCR, assinar, redigir, converter de/para imagens e formatos Office. Todo processamento é local, seus arquivos nunca saem do seu servidor.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço     |
| ---- | --------- | --------- | -------------------------------------------------- | ----------- |
| 8085 | 8080      | tcp       | Porta da interface web (mapeada para 8085 no host) | stirlingpdf |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container        | Serviço     |
| ---------------------------- | ------------------- | ----------- |
| /DATA/AppData/$AppID/data    | /usr/share/tessdata | stirlingpdf |
| /DATA/AppData/$AppID/configs | /configs            | stirlingpdf |
| /DATA/AppData/$AppID/logs    | /logs               | stirlingpdf |

## Variáveis de ambiente

| Variável                           | Valor padrão | Serviço     |
| ---------------------------------- | ------------ | ----------- |
| DOCKER_ENABLE_SECURITY             | false        | stirlingpdf |
| INSTALL_BOOK_AND_ADVANCED_HTML_OPS | false        | stirlingpdf |
| LANGS                              | en_US,pt_BR  | stirlingpdf |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8085/`.

- O primeiro boot baixa os language packs do OCR em /usr/share/tessdata — pode demorar alguns minutos.
- Configure DOCKER_ENABLE_SECURITY=true e adicione backend de autenticação (LDAP/OAuth) se for expor publicamente.

## Imagens

| Serviço     | Imagem                |
| ----------- | --------------------- |
| stirlingpdf | frooodle/s-pdf:0.40.1 |

## Fonte oficial

Projeto original: **Stirling-Tools**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
