# PdfDing

> Gestor, visualizador e editor PDF auto-hospedado

## O que é

PdfDing é um gestor, visualizador e editor PDF auto-hospedado que oferece uma experiência de utilizador perfeita em múltiplos dispositivos. Foi concebido para ser mínimo, rápido e fácil de configurar usando Docker.

Com funcionalidades como visualização PDF baseada em navegador que lembra a sua posição atual, etiquetagem multi-nível, funcionalidades de favoritos e arquivo, edição PDF com comentários, realces e desenhos, interface de utilizador limpa e intuitiva com modo escuro, suporte SSO via OIDC, partilha de PDF com audiência externa, notas markdown e barras de progresso que mostram o progresso de leitura, PdfDing garante uma excelente experiência de gestão PDF.

Implementar PdfDing em dispositivos cloud privados como Zima traz conveniência incomparável com acesso multi-dispositivo, garantindo que a sua coleção PDF está sempre ao alcance e segura, não importa onde esteja.


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço |
| ---- | --------- | --------- | ---------------- | ------- |
| 8000 | 8000      | tcp       | Porta HTTP WebUI | pdfding |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container                | Serviço |
| -------------------------- | --------------------------- | ------- |
| /DATA/AppData/$AppID/db    | /home/nonroot/pdfding/db    | pdfding |
| /DATA/AppData/$AppID/media | /home/nonroot/pdfding/media | pdfding |

## Variáveis de ambiente

| Variável              | Valor padrão         | Serviço |
| --------------------- | -------------------- | ------- |
| HOST_NAME             | *                    | pdfding |
| SECRET_KEY            | your_secret_key_here | pdfding |
| CSRF_COOKIE_SECURE    | FALSE                | pdfding |
| SESSION_COOKIE_SECURE | FALSE                | pdfding |
| DEBUG                 | FALSE                | pdfding |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8000/`.

- Após a instalação, pode aceder ao PdfDing em http://your-server-ip:8000. Crie a sua primeira conta de administrador durante a configuração inicial.
- Nota: Se encontrar problemas de acesso, poderá precisar de editar manualmente o ficheiro docker-compose.yml e substituir a variável de ambiente HOST_NAME pelo seu endereço IP real do servidor.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| pdfding | mrmn/pdfding:v1.3.1 |

## Fonte oficial

Projeto original: **mrmn2**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
