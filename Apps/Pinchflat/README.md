# Pinchflat

> O seu próximo gestor multimédia YouTube

## O que é

Pinchflat é uma aplicação auto-hospedada para descarregar conteúdo do YouTube construída usando yt-dlp. Foi concebida para ser leve, auto-contida e fácil de usar. Define regras para como descarregar conteúdo de canais ou listas de reprodução do YouTube e fará o resto, verificando periodicamente novo conteúdo.

As funcionalidades principais incluem:
- Auto-contida - apenas um contentor Docker sem dependências externas
- Sistema de nomenclatura poderoso para que o conteúdo seja armazenado onde e como deseja
- Interface web fácil de usar com predefinições para começar imediatamente
- Suporte de primeira classe para aplicações de centro multimédia como Plex, Jellyfin e Kodi
- Suporta servir feeds RSS para a sua aplicação de podcast favorita
- Descarrega automaticamente novo conteúdo de canais e listas de reprodução
- Suporta descarregar conteúdo áudio
- Regras personalizadas para lidar com YouTube Shorts e livestreams
- Suporte Apprise para notificações
- Opcionalmente elimina automaticamente conteúdo antigo
- Opções avançadas como definir datas de corte e filtrar por título
- Operação fiável sem intervenção
- Pode passar cookies para o YouTube para descarregar as suas listas de reprodução privadas
- Integração Sponsorblock
- Suporta executar scripts personalizados após descarregar/eliminar multimédia

Perfeito para pessoas que querem descarregar conteúdo para usar com uma aplicação de centro multimédia ou para aqueles que querem arquivar multimédia!


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço   |
| ---- | --------- | --------- | ---------------- | --------- |
| 8945 | 8945      | tcp       | Porta HTTP WebUI | pinchflat |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço   |
| --------------------------- | ------------ | --------- |
| /DATA/AppData/$AppID/config | /config      | pinchflat |
| /DATA/Media/Downloads       | /downloads   | pinchflat |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço   |
| -------- | ------------ | --------- |
| TZ       | $TZ          | pinchflat |
| PUID     | $PUID        | pinchflat |
| PGID     | $PGID        | pinchflat |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8945/`.

- Pinchflat criará automaticamente os diretórios necessários e começará a descarregar conteúdo baseado nas suas fontes configuradas.
- Certifique-se de que tem espaço de armazenamento suficiente para os seus downloads. A aplicação usa /downloads como diretório de download padrão.
- Após a instalação, aceda à interface web para configurar os seus canais YouTube e listas de reprodução para download automático.

## Imagens

| Serviço   | Imagem                               |
| --------- | ------------------------------------ |
| pinchflat | ghcr.io/kieraneglin/pinchflat:latest |

## Fonte oficial

Projeto original: **kieraneglin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
