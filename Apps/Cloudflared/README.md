# Cloudflared

> Um daemon de tunneling da Cloudflare que expõe com segurança os seus servidores web à internet.

## O que é

O Cloudflare Tunnel oferece uma forma fácil de expor servidores web de forma segura à internet, sem abrir portas de firewall e configurar ACLs. O Cloudflare Tunnel também garante que os pedidos são encaminhados através do Cloudflare antes de chegarem ao servidor web, para que possa ter a certeza de que o tráfego de ataque é interrompido com o WAF do Cloudflare e a mitigação DDoS ilimitada, e autenticado com o Access se tiver ativado essas funcionalidades para a sua conta.

O software fornece uma forma transparente de expor servidores web de forma segura à internet sem configurar portas de firewall ou listas de controlo de acesso (ACLs). Todos os pedidos são encaminhados através do Cloudflare antes de chegarem ao seu servidor web, aproveitando o Web Application Firewall (WAF) do Cloudflare e a mitigação DDoS ilimitada para bloquear o tráfego de ataque, com autenticação opcional através do Cloudflare Access se ativada. Com a sua interface Web intuitiva e gestão eficiente de túneis, esta ferramenta é a solução perfeita para implementar serviços web de forma segura.

**Descubra como ligar o ZimaOS ao Cloudflare Tunnel**
Integrar o ZimaOS com o Cloudflare Tunnel permite-lhe expor serviços locais de forma segura à internet sem abrir portas de firewall, permitindo um acesso remoto transparente. Abaixo estão dois recursos práticos para o guiar através do processo de configuração:
1. [**Tutorial oficial do Cloudflare**](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/): 
  Este tutorial fornece passos detalhados para criar e gerir um Cloudflare Tunnel.
2. [**Guia prático da Phiptech**](https://phiptech.com/how-to-setup-cloudflare-tunnel-and-expose-your-local-service-or-application/): 
  Este guia oferece um passo a passo conciso para configurar o Cloudflare Tunnel em dispositivos locais como o ZimaOS, com exemplos práticos para ajudar os utilizadores a expor facilmente serviços à internet pública.


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                         | Serviço     |
| ----- | --------- | --------- | -------------------------------------- | ----------- |
| 14333 | 14333     | tcp       | Interface Web de Configuração de Token | cloudflared |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                 | No container | Serviço     |
| --------------------------------------- | ------------ | ----------- |
| /DATA/AppData/casaos-cloudflared/config | /config      | cloudflared |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:14333/`.

### Por que este app pede privilégio

- `networkHost`: o túnel precisa alcançar serviços em qualquer porta do host

## Imagens

| Serviço     | Imagem                             |
| ----------- | ---------------------------------- |
| cloudflared | wisdomsky/cloudflared-web:2025.2.1 |

## Fonte oficial

Projeto original: **Cloudflare Inc.**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
