# OnlyOffice Document Server

> Editor online open-source compatível com MS Office (DOCX/XLSX/PPTX)

## O que é

OnlyOffice Document Server é um suite de escritório online gratuita e open-source que oferece conversão e edição server-side de documentos, planilhas e apresentações com compatibilidade completa com Microsoft Office (DOCX, XLSX, PPTX). Combina nativamente com Nextcloud e ownCloud — coloca no seu stack e edita arquivos MS Office direto do navegador.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                 | Serviço    |
| ---- | --------- | --------- | ------------------------------ | ---------- |
| 8084 | 80        | tcp       | WebUI / API do Document Server | onlyoffice |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container             | Serviço    |
| ------------------------- | ------------------------ | ---------- |
| /DATA/AppData/$AppID/data | /var/www/onlyoffice/Data | onlyoffice |
| /DATA/AppData/$AppID/log  | /var/log/onlyoffice      | onlyoffice |
| /DATA/AppData/$AppID/lib  | /var/lib/onlyoffice      | onlyoffice |
| /DATA/AppData/$AppID/db   | /var/lib/postgresql      | onlyoffice |

## Variáveis de ambiente

| Variável    | Valor padrão                               | Serviço    |
| ----------- | ------------------------------------------ | ---------- |
| JWT_ENABLED | true                                       | onlyoffice |
| JWT_SECRET  | replace-with-output-of-openssl-rand-hex-32 | onlyoffice |
| JWT_HEADER  | Authorization                              | onlyoffice |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8084/`.

- SUBSTITUA JWT_SECRET antes do primeiro boot — exigido pelos conectores Nextcloud/ownCloud.
- Configure WOPI_URL no painel admin do Nextcloud (ou ownCloud) apontando para http://SEU_IP:8084 com o mesmo JWT_SECRET acima. Depois disso, arquivos abrem inline no OnlyOffice.

## Imagens

| Serviço    | Imagem                          |
| ---------- | ------------------------------- |
| onlyoffice | onlyoffice/documentserver:8.2.2 |

## Fonte oficial

Projeto original: **ONLYOFFICE**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
