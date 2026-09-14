# Emby

> O Emby reúne os seus vídeos pessoais, música, fotografias e televisão ao vivo.

## O que é

O Emby é uma plataforma de gestão de mídia pessoal que reúne vídeos domésticos, música e fotografias, convertendo automaticamente e transmitindo para qualquer dispositivo. Um design intuitivo torna-o ideal para os utilizadores desfrutarem de conteúdo multimédia a qualquer momento, em qualquer lugar, atendendo às necessidades de entretenimento familiar e gestão de mídia.

As funcionalidades principais incluem transmissão de mídia entre dispositivos e acesso fácil. Suporta conversão em tempo real e transmissão de mídia pessoal para qualquer dispositivo para reprodução sem falhas. Um serviço de ligação permite acesso fácil à mídia enquanto se está longe de casa. A funcionalidade TV ao Vivo suporta transmissão, gestão de DVR e acesso a uma biblioteca de gravações. A sincronização móvel fornece mídia a smartphones e tablets para acesso offline, actualizando automaticamente novo conteúdo.

Oferece controlos parentais para restringir o acesso de crianças ao conteúdo, definir horários e limites de tempo, e monitorizar sessões remotamente. O suporte Chromecast permite transmissão fácil de vídeos, música, fotografias e TV ao Vivo. O conteúdo é apresentado elegantemente, melhorando a experiência visual. A sincronização na nuvem suporta cópia de segurança, arquivo e armazenamento multi-resolução para transmissão optimizada. A gestão de mídia baseada na web facilita a edição de metadados, imagens e pesquisa de legendas, enquanto a integração DLNA detecta automaticamente dispositivos de rede para transmissão de conteúdo.

**Funcionalidades Principais:**
- Conversão automática e transmissão de mídia para qualquer dispositivo
- Acesso fácil via serviço de ligação enquanto se está longe de casa
- Transmissão TV ao Vivo, gestão DVR e acesso biblioteca de gravações
- Sincronização móvel para smartphones e tablets para acesso offline
- Controlos parentais com restrições de conteúdo, horários e monitorização remota
- Suporte Chromecast para transmissão de vídeos, música, fotografias e TV ao Vivo
- Sincronização na nuvem para cópia de segurança e armazenamento multi-resolução
- Gestão de mídia baseada na web para edição de metadados e pesquisa de legendas
- Integração DLNA para detecção automática de dispositivos de rede e transmissão de conteúdo

**Saber Mais:**
- [Website Oficial Emby](https://emby.media/)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve            | Serviço |
| ---- | --------- | --------- | ------------------------- | ------- |
| 8096 | 8096      | tcp       | Web interface for Emby    | emby    |
| 8920 | 8920      | tcp       | Service port 8920 of emby | emby    |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container  | Serviço |
| --------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/config | /config       | emby    |
| /DATA/Media/TV Shows        | /data/tvshows | emby    |
| /DATA/Media/Movies          | /data/movies  | emby    |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | 1000         | emby    |
| PUID     | 1000         | emby    |
| TZ       | $TZ          | emby    |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8096/`.

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| emby    | linuxserver/emby:4.9.1 |

## Fonte oficial

Projeto original: **linuxserver**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
