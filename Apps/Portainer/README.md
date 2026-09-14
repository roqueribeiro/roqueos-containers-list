# Portainer

> Interface leve de gestão Docker

## O que é

Portainer Community Edition (CE) é uma ferramenta leve de gestão de contentores que oferece uma interface Web intuitiva para simplificar a construção, gestão e monitorização de aplicações contentorizadas. Com mais de 500.000 utilizadores activos, é amplamente apreciado pela sua facilidade de uso e funcionalidade robusta, ideal para programadores individuais, utilizadores de laboratórios domésticos e pequenas equipas.

As características principais da ferramenta incluem suporte multi-plataforma, gestão de recursos e monitorização em tempo real. Suporta a gestão de várias plataformas de contentores, cobrindo contentores, imagens, volumes e redes. Os utilizadores podem rapidamente criar, implementar e gerir contentores através de uma interface gráfica "inteligente" ou API abrangente, sem necessitar de conhecimento profundo de linha de comandos. Proporciona monitorização em tempo real do estado dos contentores, visualização de registos e gestão de configuração, garantindo controlo eficiente das operações das aplicações.

A sua filosofia de design é "simplificar a complexidade dos contentores" com uma interface intuitiva e configurações predefinidas que reduzem a barreira técnica. Os utilizadores podem gerir aplicações contentorizadas sem configurações complexas, poupando tempo e aumentando a eficiência. É completamente gratuito, com dados armazenados localmente, garantindo controlo total do utilizador. O suporte da comunidade através de GitHub Discussions e Slack, juntamente com documentação rica e actualizações regulares, melhora a experiência do utilizador, tornando-o adequado para aprender tecnologia de contentores ou gerir pequenos projectos.

**Características Principais:**
- Interface Web intuitiva para gestão simplificada de aplicações contentorizadas
- Suporta múltiplas plataformas de contentores para gestão unificada de recursos
- Monitorização em tempo real do estado dos contentores e registos
- Implementação e gestão rápida de contentores através de API
- Suporte da comunidade com documentação extensa e assistência

**Saiba Mais:**
- [Site Oficial Portainer](https://www.portainer.io/)
- [Repositório GitHub Portainer](https://github.com/portainer/portainer)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                            | Serviço   |
| ---- | --------- | --------- | --------------------------------------------------------- | --------- |
| 8000 | 8000      | tcp       | Edge agent tunnel: how remote agents reach this Portainer | portainer |
| 9000 | 9000      | tcp       | Porta Interface Web Portainer                             | portainer |
| 9443 | 9443      | tcp       | Porta Interface Web Portainer(https)                      | portainer |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço   |
| -------------------- | -------------------- | --------- |
| /DATA/AppData/$AppID | /data                | portainer |
| /var/run/docker.sock | /var/run/docker.sock | portainer |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9000/`.

## Imagens

| Serviço   | Imagem                        |
| --------- | ----------------------------- |
| portainer | portainer/portainer-ce:2.31.3 |

## Fonte oficial

Projeto original: **Portainer**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
