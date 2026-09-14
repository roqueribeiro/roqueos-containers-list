# V2rayA

> Um cliente GUI web do Project V que suporta protocolos VMess, VLESS, SS, SSR, Trojan, Tuic e Juicity

## O que é

O v2rayA é um cliente V2Ray que suporta proxy transparente global, compatível com protocolos SS, SSR, Trojan (trojan-go), Tuic e Juicity. Concebido para simplicidade, atende à maioria das necessidades dos utilizadores, ideal para cenários que requerem serviços de proxy eficientes.

As funcionalidades principais incluem proxy transparente global e balanceamento de carga multi-saída com divisão de tráfego. Fornece serviços de proxy para quase todas as aplicações sem requerer suporte de proxy específico da aplicação. O suporte para criar e conectar múltiplos nós de saída garante balanceamento de carga e divisão eficiente de tráfego para desempenho de rede óptimo.

Oferece RoutingA, uma linguagem de encaminhamento personalizada para V2Ray, fornecendo suporte poderoso e conveniente para divisão de tráfego. Múltiplas estratégias abordam a poluição DNS, com configurações avançadas que permitem configurações personalizadas. Com simplicidade e funcionalidade no núcleo, a plataforma entrega uma solução moderna para gestão de proxy.

**Funcionalidades Principais:**
- GUI baseada na web para configuração e gestão fáceis
- Suporte para múltiplos protocolos: VMess, VLESS, SS, SSR, Trojan, Tuic, Juicity
- Proxy transparente global para serviços de proxy de aplicações sem emendas
- Balanceamento de carga multi-saída e divisão de tráfego
- RoutingA encaminhamento personalizado para divisão de tráfego conveniente
- Múltiplas estratégias de mitigação de poluição DNS com configurações personalizadas avançadas

**Saber Mais:**
- [Website Oficial V2rayA](https://v2raya.org/)
- [V2rayA GitHub](https://github.com/v2rayA/v2rayA)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container     | Serviço |
| -------------------- | ---------------- | ------- |
| /lib/modules         | /lib/modules     | v2raya  |
| /etc/resolv.conf     | /etc/resolv.conf | v2raya  |
| /DATA/AppData/$AppID | /etc/v2raya      | v2raya  |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:2017/`.

### Por que este app pede privilégio

- `privileged`: manipula tabelas de roteamento do host para o modo transparente
- `networkHost`: o proxy transparente só intercepta o tráfego que passa pela rede do host

## Imagens

| Serviço | Imagem                  |
| ------- | ----------------------- |
| v2raya  | mzz2017/v2raya:v2.2.6.7 |

## Fonte oficial

Projeto original: **v2rayA**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
