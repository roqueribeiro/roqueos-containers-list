# Jellyseerr

> Gerenciador de solicitações para Jellyfin/Emby/Plex (fork do Overseerr)

## O que é

Jellyseerr é um fork do Overseerr que adiciona suporte a Jellyfin e Emby além do Plex. Permite que seus usuários (ou convidados) solicitem filmes, séries e conteúdo 4K direto pelo navegador. Auto-aprova com regras, integra com Sonarr/Radarr para baixar o conteúdo automaticamente, envia notificações via Discord/Telegram/Pushover/email.

Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço    |
| ---- | --------- | --------- | ---------------------- | ---------- |
| 5055 | 5055      | tcp       | Porta da interface web | jellyseerr |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço    |
| -------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID | /app/config  | jellyseerr |

## Variáveis de ambiente

| Variável  | Valor padrão      | Serviço    |
| --------- | ----------------- | ---------- |
| LOG_LEVEL | debug             | jellyseerr |
| TZ        | America/Sao_Paulo | jellyseerr |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5055/`.

- O primeiro boot em http://SEU_IP:5055 te guia por:
- 1. Escolha Plex/Jellyfin/Emby e autentique.
- 2. Conecte ao Sonarr (séries) e Radarr (filmes) para downloads automáticos.
- 3. Configure permissões de usuário e cotas de solicitação.
- Combine com Sonarr (já no catálogo) e Jellyfin/Plex (também no catálogo).

## Imagens

| Serviço    | Imagem                       |
| ---------- | ---------------------------- |
| jellyseerr | fallenbagel/jellyseerr:2.4.1 |

## Fonte oficial

Projeto original: **Fallenbagel**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
