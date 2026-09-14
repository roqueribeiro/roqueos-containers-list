# Uptime Kuma

> Uma ferramenta de monitorização elegante

## O que é

Uptime Kuma é uma ferramenta de monitorização auto-hospedada gratuita e fácil de usar, projetada para o rastreamento em tempo real de serviços de rede e infraestrutura, oferecendo uma interface moderna e funcionalidade robusta。Fornece um painel Web intuitivo para gerir serviços, ideal para programadores individuais, utilizadores de laboratórios domésticos e equipas pequenas。

As funcionalidades principais da ferramenta incluem monitorização abrangente e canais de notificação diversificados。Monitoriza HTTP/HTTPS, portas TCP, registos DNS, bases de dados, Ping e servidores de jogos Steam, com gráficos Ping interativos que exibem visualmente tempos de resposta e estado。Os utilizadores podem receber alertas em tempo real via Telegram, Discord, Slack, Email (SMTP) e mais de 95 outros serviços de notificação。A monitorização de certificados SSL verifica a validade e expiração dos certificados, auxiliando renovações atempadas。

Suporta intervalos de monitorização de 20 segundos para deteção rápida de tempo de inatividade e oferece múltiplas páginas de estado para partilhar o estado dos serviços em tempo real com clientes。O suporte proxy permite acesso remoto via Cloudflare, Nginx ou serviços similares, melhorando a flexibilidade。A autenticação de dois fatores (2FA) e chaves API reforçam a segurança, garantindo controlo total do utilizador sobre dados locais。A ferramenta fornece uma solução de monitorização eficiente com operação intuitiva e apoio da comunidade。

**Funcionalidades Principais：**
- Monitorizar HTTP/HTTPS, TCP, DNS, bases de dados e outros serviços
- Notificações via Telegram, Discord, Slack e mais de 95 outros canais
- Gráficos Ping interativos exibindo tempos de resposta e estado
- Monitorização de certificados SSL para validade e expiração
- Intervalos de monitorização de 20 segundos para deteção rápida de tempo de inatividade
- Múltiplas páginas de estado para partilha do estado dos serviços
- Suporte proxy compatível com Cloudflare, Nginx e mais
- Autenticação de dois fatores (2FA) e chaves API para segurança melhorada

**Saiba Mais：**
- [Site Oficial Uptime Kuma](https://uptimekuma.org)
- [Repositório GitHub Uptime Kuma](https://github.com/louislam/uptime-kuma)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço    |
| ---- | --------- | --------- | -------------- | ---------- |
| 3001 | 3001      | tcp       | Porta WebUI    | uptimekuma |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container | Serviço    |
| ----------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/app/data | /app/data    | uptimekuma |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3001/`.

## Imagens

| Serviço    | Imagem                              |
| ---------- | ----------------------------------- |
| uptimekuma | louislam/uptime-kuma:1.23.16-alpine |

## Fonte oficial

Projeto original: **Louis Lam**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
