# PeaNUT

> Sistema de monitorização UPS e notificação de interrupção de energia

## O que é

PeaNUT é um sistema de monitorização UPS baseado na web, especificamente projetado para monitorizar Fontes de Alimentação Ininterrupta (UPS). Fornece uma interface amigável para monitorizar o estado UPS, a vida útil da bateria e notificações de interrupção de energia para garantir que os seus sistemas estejam sempre protegidos.

**Funcionalidades Principais:**
- Monitorização e controlo do estado UPS em tempo real
- Monitorização da vida útil da bateria e nível de carga
- Notificações automáticas de interrupção de energia via email/webhook
- Registo de dados históricos e relatórios
- Suporte para vários fabricantes e modelos UPS
- Interface web responsiva amigável para acesso remoto
- Limiares de aviso configuráveis e alertas
- Implementação baseada em Docker para fácil instalação

**Saiba Mais:**
- [Repositório GitHub PeaNUT](https://github.com/brandawg93/peanut)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                | Serviço |
| ---- | --------- | --------- | ----------------------------- | ------- |
| 8084 | 8080      | tcp       | Porta da interface web PeaNUT | peanut  |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | peanut  |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| WEB_PORT | 8080         | peanut  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8084/`.

- Os parâmetros do serviço UPS do ZimaOS são os seguintes:
- | Endereço do servidor | Porta | Nome de utilizador | Palavra-passe |
- |----------------------|-------|-------------------|---------------|
- | ZimaOS IP            | `3493` | `monuser` | `secret` |

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| peanut  | brandawg93/peanut:5.19.1 |

## Fonte oficial

Projeto original: **brandawg93**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
