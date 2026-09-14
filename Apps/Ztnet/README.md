# ZTnet

> Controlador de rede ZeroTier auto-hospedado com interface web para gestão centralizada.

## O que é

O ZTNET é uma ferramenta poderosa de gestão de rede ZeroTier que simplifica a configuração e gestão de rede através de uma interface Web intuitiva, ideal para equipas e utilizadores individuais. O seu design moderno e funcionalidades ricas fornecem uma solução eficiente para construir redes virtuais seguras e escaláveis.

A ferramenta centra-se numa interface Web intuitiva e organização com suporte multi-utilizador. Desenvolvida em TypeScript, actua como intermediário entre utilizadores e a API do ZeroTier Controller, permitindo gestão colaborativa de rede dentro de organizações para simplificar tarefas de equipa. A integração com a API ZeroTier Central permite gestão directa de redes, nós e membros através de uma interface amigável ao utilizador, melhorando a eficiência de configuração.

Suporta servidores root privados personalizados para criar ambientes de rede isolados, melhorando privacidade e controlo. Espaços de utilizador personalizados permitem aos utilizadores criar e gerir redes independentemente. O suporte para endereçamento IPv6 6plane e rfc4193 enriquece as capacidades de rede empresarial ou pessoal. A compatibilidade com arquitecturas ARM64 e AMD64 garante amplo suporte de dispositivos. A ferramenta foca-se em design amigável ao utilizador e flexível para entregar uma experiência moderna de gestão de rede.

**Funcionalidades Principais:**
- Interface Web intuitiva para gestão simplificada de rede ZeroTier
- Organização e suporte multi-utilizador para colaboração de equipa
- Integração com API ZeroTier Central para gerir redes e nós
- Servidor root privado personalizado para privacidade e controlo melhorados
- Espaços de utilizador personalizados para criação e gestão independente de rede
- Suporte para endereçamento IPv6 6plane e rfc4193
- Compatibilidade com arquitecturas ARM64 e AMD64 para dispositivos diversos

**Saiba mais:**
- [Website Oficial ZTnet](https://ztnet.network/)
- [ZTnet GitHub](https://github.com/sinamics/ztnet)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço |
| ---- | --------- | --------- | ---------------- | ------- |
| 3050 | 3000      | tcp       | Porta HTTP WebUI | ztnet   |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                            | No container             | Serviço        |
| ---------------------------------- | ------------------------ | -------------- |
| /var/lib/zerotier-one              | /var/lib/zerotier-one    | ztnet          |
| /DATA/AppData/$AppID/postgres-data | /var/lib/postgresql/data | ztnet-postgres |

## Variáveis de ambiente

| Variável              | Valor padrão            | Serviço        |
| --------------------- | ----------------------- | -------------- |
| ZT_ADDR               | http://172.17.0.1:9993  | ztnet          |
| POSTGRES_HOST         | ztnet-postgres          | ztnet          |
| POSTGRES_PORT         | 5432                    | ztnet          |
| POSTGRES_USER         | ztnet                   | ztnet          |
| POSTGRES_PASSWORD     | ztnetbl5hbv98wl89x9v    | ztnet          |
| POSTGRES_DB           | ztnet                   | ztnet          |
| NEXTAUTH_URL          | http://0.0.0.0:3050     | ztnet          |
| NEXTAUTH_SECRET       | mn6vor005ncgnu9iuqxn8bg | ztnet          |
| NEXTAUTH_URL_INTERNAL | http://ztnet:3000       | ztnet          |
| POSTGRES_USER         | ztnet                   | ztnet-postgres |
| POSTGRES_PASSWORD     | ztnetbl5hbv98wl89x9v    | ztnet-postgres |
| POSTGRES_DB           | ztnet                   | ztnet-postgres |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3050/`.

- Pré-requisitos para usar ZTnet:
- 1. Permitir que ZTNET gira a sua instância ZeroTier local, consulte [Passo 2 da documentação: Configurar ZeroTier](https://ztnet.network/usage/migrate)
- 2. (Utilizadores ZimaOS não precisam de executar este passo) Modificar a variável de ambiente `ZT_ADDR` para o seu endereço de controlador ZeroTier

## Imagens

| Serviço        | Imagem               |
| -------------- | -------------------- |
| ztnet          | sinamics/ztnet:0.7.5 |
| ztnet-postgres | postgres:15.2-alpine |

## Fonte oficial

Projeto original: **sinamics**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
