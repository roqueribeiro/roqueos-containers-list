# Pingvin-Share

> Partilha de ficheiros auto-hospedada com uma interface web moderna

## O que é

Pingvin-Share é uma aplicação de partilha de ficheiros auto-hospedada compatível com aplicações Nextcloud, oferecendo uma interface web moderna e intuitiva. Permite aos utilizadores armazenar, organizar e partilhar ficheiros de forma segura sem depender de serviços cloud externos. A aplicação suporta vários métodos de autenticação e fornece funcionalidades como links de partilha, contas de utilizador e uma interface responsiva.

**Funcionalidades principais:**
- Interface web moderna e responsiva
- Contas de utilizador com sistema de permissões
- Links de partilha seguros para ficheiros
- Carregamento de ficheiros com arrastar e largar
- Partilhas protegidas por palavra-passe
- Vários métodos de autenticação
- Implementação baseada em Docker para fácil instalação

**Saiba mais:**
- [Pingvin-Share GitHub](https://github.com/stonith404/pingvin-share)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                       | Serviço       |
| ---- | --------- | --------- | ------------------------------------ | ------------- |
| 3410 | 3000      | tcp       | Porta da interface web Pingvin-Share | pingvin-share |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container                 | Serviço       |
| --------------------------- | ---------------------------- | ------------- |
| /DATA/AppData/$AppID/data   | /opt/app/backend/data        | pingvin-share |
| /DATA/AppData/$AppID/images | /opt/app/frontend/public/img | pingvin-share |

## Variáveis de ambiente

| Variável    | Valor padrão | Serviço       |
| ----------- | ------------ | ------------- |
| TRUST_PROXY | false        | pingvin-share |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3410/`.

## Imagens

| Serviço       | Imagem                          |
| ------------- | ------------------------------- |
| pingvin-share | stonith404/pingvin-share:latest |

## Fonte oficial

Projeto original: **stonith404**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
