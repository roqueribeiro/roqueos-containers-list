# oPodSync

> Serviço de sincronização de podcasts

## O que é

O oPodSync é um serviço de sincronização de podcasts que permite aos utilizadores sincronizar as suas subscrições de podcasts e progresso de audição em múltiplos dispositivos. Fornece uma solução do lado do servidor para gerir dados de podcasts e garante que os utilizadores possam alternar sem problemas entre os seus dispositivos.

**Funcionalidades Principais:**
- Sincronizar subscrições de podcasts
- Acompanhar o progresso de audição em múltiplos dispositivos
- Interface de gestão baseada na web
- Suporte para múltiplos clientes de podcasts
- Armazenamento de dados centralizado
- Configuração e instalação fáceis

**Saiba Mais:**
- [oPodSync GitHub Repo](https://github.com/kd2org/oPodSync)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço  |
| ---- | --------- | --------- | ---------------------- | -------- |
| 8086 | 8080      | tcp       | Porta da interface web | opodsync |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container         | Serviço  |
| -------------------- | -------------------- | -------- |
| /DATA/AppData/$AppID | /var/www/server/data | opodsync |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8086/`.

## Imagens

| Serviço  | Imagem                                                                                     |
| -------- | ------------------------------------------------------------------------------------------ |
| opodsync | ganeshlab/opodsync@sha256:f4eca588a5893e7700fcd8e4c019a62dd98e79298d5ca6b842d7900e71112c8c |

## Fonte oficial

Projeto original: **ganeshlab**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
