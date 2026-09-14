# Pi-hole

> Bloqueio de Anúncios ao Nível da Rede

## O que é

O Pi-hole é uma plataforma de bloqueio de anúncios ao nível da rede para hardware Linux, usando tecnologia DNS sinkhole para proteger dispositivos de conteúdo indesejado sem requerer software do lado do cliente. Concebido para redes domésticas ou empresariais, oferece bloqueio eficiente de anúncios e optimização de rede.

As funcionalidades principais incluem bloqueio de anúncios ao nível da rede e bloqueio de conteúdo em ambientes não-navegador. Usa DNS sinkhole para bloquear anúncios, cobrindo aplicações móveis e smart TVs. O cache de consultas DNS acelera a navegação quotidiana. Uma interface de linha de comandos garante interoperabilidade com opções de controlo fiáveis.

Fornece um painel de interface web intuitivo para visualizar e gerir o estado do sistema. Uma função de servidor DHCP opcional protege automaticamente todos os dispositivos. Capaz de lidar com volumes elevados de consultas em hardware de nível servidor, suporta bloqueio de anúncios sobre IPv4 e IPv6.

**Funcionalidades Principais:**
- Bloqueio de anúncios ao nível da rede via tecnologia DNS sinkhole
- Bloqueio de conteúdo em ambientes não-navegador, incluindo aplicações móveis e smart TVs
- Cache de consultas DNS para acelerar navegação
- Interface de linha de comandos para interoperabilidade
- Painel de interface web intuitivo para visualização e controlo do sistema
- Função de servidor DHCP opcional para protecção automática de dispositivos
- Suporte de bloqueio de anúncios para IPv4 e IPv6

**Saber Mais:**
- [Website Oficial Pi-hole](https://pi-hole.net/)
- [Pi-hole GitHub](https://github.com/pi-hole/pi-hole)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, 386, arm.

## Portas

| Host | Container | Protocolo | Para que serve      | Serviço |
| ---- | --------- | --------- | ------------------- | ------- |
| 8800 | 80        | tcp       | Porta HTTP WebUI    | pihole  |
| 53   | 53        | tcp       | Porta DNS Pi-hole   | pihole  |
| 53   | 53        | udp       | Porta DNS Pi-hole   | pihole  |
| 8443 | 443       | tcp       | Porta HTTPS Pi-hole | pihole  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container | Serviço |
| -------------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/etc/pihole/ | /etc/pihole  | pihole  |

## Variáveis de ambiente

| Variável                       | Valor padrão | Serviço |
| ------------------------------ | ------------ | ------- |
| TZ                             | $TZ          | pihole  |
| FTLCONF_webserver_api_password | roqueos      | pihole  |
| FTLCONF_dns_listeningMode      | all          | pihole  |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:8800/admin`.

- Palavra-passe padrão: `roqueos`

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| pihole  | pihole/pihole:2025.11.1 |

## Fonte oficial

Projeto original: **Pi-hole**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
