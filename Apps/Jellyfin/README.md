# Jellyfin

> O sistema de media pessoal

## O que é

O Jellyfin destaca-se entre as aplicações de servidor de media pelo seu design completamente open-source, gratuito e focado na privacidade. Ao contrário do Emby e do Plex, o Jellyfin oferece uma gestão de media robusta, transcodificação em tempo real e permissões granulares para múltiplos utilizadores sem custos de subscrição, operando independentemente de serviços na cloud para garantir o controlo total dos dados pelo utilizador. O seu desenvolvimento orientado para a comunidade e a utilização eficiente de recursos permitem um desempenho suave em dispositivos de baixo custo, tornando-o a escolha ideal para utilizadores preocupados com a privacidade e com o orçamento.

Imagine os seus filmes, programas de TV e música ao alcance dos seus dedos, acessíveis em qualquer dispositivo. O Jellyfin transforma a sua coleção de media num centro de entretenimento personalizado, superando os álbuns de fotos tradicionais com uma experiência de navegação e reprodução perfeita.
O Jellyfin oferece streaming de alta qualidade, obtenção automática de metadados e recomendações personalizadas, tudo sem custos. Suporta múltiplos utilizadores, cada um com a sua própria biblioteca de media, atendendo às diversas necessidades de famílias ou equipas.
Implementar o Jellyfin em dispositivos de cloud privada como o Zima proporciona armazenamento quase ilimitado, streaming suave e acesso seguro a vários dispositivos. Para entusiastas de NAS ou qualquer pessoa que queira elevar a sua configuração de media doméstica, o Jellyfin é a solução perfeita.


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço  |
| ---- | --------- | --------- | ---------------------------- | -------- |
| 8097 | 8096      | tcp       | WebUI HTTP Port              | jellyfin |
| 8921 | 8920      | tcp       | WebUI HTTPS Port             | jellyfin |
| 7359 | 7359      | tcp       | Jellyfin auto-discovery Port | jellyfin |
| 1901 | 1900      | tcp       | Jellyfin DLNA Port           | jellyfin |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço  |
| --------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/config | /config      | jellyfin |
| /DATA/Media                 | /Media       | jellyfin |
| /opt/vc/lib                 | /opt/vc/lib  | jellyfin |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço  |
| -------- | ------------ | -------- |
| PGID     | $PGID        | jellyfin |
| PUID     | $PUID        | jellyfin |
| TZ       | $TZ          | jellyfin |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8097/`.

## Imagens

| Serviço  | Imagem                       |
| -------- | ---------------------------- |
| jellyfin | linuxserver/jellyfin:10.10.7 |

## Fonte oficial

Projeto original: **Jellyfin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
