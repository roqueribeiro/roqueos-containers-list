# LyrionMusicServer

> O Lyrion Music Server é um servidor de áudio streaming para reprodutores de áudio Squeezebox.

## O que é

O Lyrion Music Server é uma aplicação de gestão musical auto-hospedada concebida para controlar uma variedade de dispositivos de reprodução áudio, suportando streaming de coleções musicais locais, rádio internet e múltiplos serviços de streaming (com ou sem subscrições). A sua interface Web intuitiva permite aos utilizadores aceder e controlar música sem esforço através de qualquer navegador, ideal para entusiastas da música que criam experiências áudio personalizadas.

As funcionalidades principais da aplicação incluem streaming musical versátil e personalização extensiva. Os utilizadores podem reproduzir sem problemas bibliotecas musicais locais, ouvir rádio internet global ou conectar-se a serviços de streaming, atendendo a diversas necessidades de audição. Oferece opções de controlo flexíveis, permitindo personalização da funcionalidade do servidor, métodos de interação e aparência da interface. Além disso, suporta uma interface unificada em múltiplos dispositivos, garantindo uma experiência consistente em telefones, computadores ou outros reprodutores, com a capacidade de selecionar o dispositivo de reprodução ideal para qualquer cenário.

Pode ser implementado de forma flexível em servidores pessoais ou dispositivos NAS, com documentação fornecida pela comunidade ajudando os utilizadores a otimizar configurações e estender funcionalidades. Seja gerindo coleções musicais pessoais ou criando um centro áudio partilhado para a família, a operação intuitiva e alta flexibilidade da aplicação oferecem uma plataforma moderna de gestão musical, atendendo necessidades desde audição casual até gestão áudio profissional.

**Funcionalidades Principais:**
- Streaming musical para coleções locais, rádio internet e múltiplos serviços de streaming
- Interface Web intuitiva para acesso e controlo musical sem esforço através de qualquer navegador
- Opções extensivas de personalização para funcionalidade do servidor, métodos de interação e aparência da interface
- Interface multi-dispositivo unificada garantindo experiência consistente em telefones, computadores e outros reprodutores
- Suporte de documentação comunitária para otimizar configurações e estender funcionalidades

**Saiba mais:**
- [Site oficial do Lyrion Music Server](https://www.lyrion.org)
- [Repositório GitHub do Lyrion Music Server](https://github.com/lms-community/slimserver)


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve        | Serviço           |
| ---- | --------- | --------- | --------------------- | ----------------- |
| 9000 | 9000      | tcp       | Porta HTTP WebUI      | lyrionmusicserver |
| 9090 | 9090      | tcp       | Porta CLI             | lyrionmusicserver |
| 3483 | 3483      | tcp       | Porta Discovery (UDP) | lyrionmusicserver |
| 3483 | 3483      | udp       | Porta Discovery (UDP) | lyrionmusicserver |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container   | Serviço           |
| ------------------------------ | -------------- | ----------------- |
| /DATA/AppData/$AppID/config    | /config        | lyrionmusicserver |
| /DATA/Media/Music              | /music         | lyrionmusicserver |
| /DATA/AppData/$AppID/playlists | /playlist      | lyrionmusicserver |
| /etc/localtime                 | /etc/localtime | lyrionmusicserver |
| /etc/timezone                  | /etc/timezone  | lyrionmusicserver |

## Variáveis de ambiente

| Variável  | Valor padrão | Serviço           |
| --------- | ------------ | ----------------- |
| HTTP_PORT | 9000         | lyrionmusicserver |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9000/`.

## Imagens

| Serviço           | Imagem                               |
| ----------------- | ------------------------------------ |
| lyrionmusicserver | lmscommunity/lyrionmusicserver:9.1.0 |

## Fonte oficial

Projeto original: **LMS-Community**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
