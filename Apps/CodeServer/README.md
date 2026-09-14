# code-server

> VS Code no navegador, hospedado no seu próprio servidor

## O que é

code-server é o VS Code rodando no navegador, hospedado no seu servidor. Edite código, abra terminais, debug, instale qualquer extensão do VS Code — mas acessível de qualquer dispositivo com navegador. Mesma engine Code-OSS do VS Code Desktop, sem telemetria Microsoft. Forma recomendada de rodar IDE remota em home labs e VMs de dev.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                      | Serviço    |
| ---- | --------- | --------- | ------------------------------------------------------------------- | ---------- |
| 8443 | 8443      | tcp       | Porta da interface web (HTTP — use reverse proxy https em produção) | codeserver |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço    |
| --------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/config | /config      | codeserver |
| /DATA/Workspaces            | /workspaces  | codeserver |

## Variáveis de ambiente

| Variável          | Valor padrão            | Serviço    |
| ----------------- | ----------------------- | ---------- |
| PUID              | 1000                    | codeserver |
| PGID              | 1000                    | codeserver |
| TZ                | America/Sao_Paulo       | codeserver |
| PASSWORD          | change-me-on-first-boot | codeserver |
| SUDO_PASSWORD     | change-me-on-first-boot | codeserver |
| DEFAULT_WORKSPACE | /workspaces             | codeserver |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8443/`.

- SUBSTITUA PASSWORD e SUDO_PASSWORD antes do primeiro boot — ambos defaults são placeholders inseguros.
- Para produção, exponha apenas atrás de reverse proxy com HTTPS (Nginx Proxy Manager já está no catálogo).
- Mount padrão de workspaces é /DATA/Workspaces — ajuste se você guarda código em outro lugar.

## Imagens

| Serviço    | Imagem                         |
| ---------- | ------------------------------ |
| codeserver | linuxserver/code-server:4.96.4 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
