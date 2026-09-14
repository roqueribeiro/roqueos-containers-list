# ttydBridge

> Easy access to the host terminal in web

## O que é

ttydBridge acts as a "bridge" to the host environment, allowing you to easily access and use the host terminal in a web. It is built on ttyd and runs in a containerized manner, providing a secure and convenient remote endpoint experience.


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço    |
| ---- | --------- | --------- | ---------------------------- | ---------- |
| 2222 | 2222      | tcp       | Web interface for ttydBridge | ttydbridge |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host | No container | Serviço    |
| ------- | ------------ | ---------- |
| /opt    | /opt         | ttydbridge |

## Variáveis de ambiente

| Variável      | Valor padrão | Serviço    |
| ------------- | ------------ | ---------- |
| EXEC_DIR      | /opt         | ttydbridge |
| PORT          | 2222         | ttydbridge |
| START_COMMAND | login        | ttydbridge |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:2222/`.

- 1. Default to using Linux system user authentication.
- 2. You can increase HTTP authentication by setting the `HTTP_USERNAME` and `HTTP_PASSWORD` variables.
- [Official DOC](https://hub.docker.com/r/cp0204/ttydbridge)

### Por que este app pede privilégio

- `privileged`: expõe um shell do host, que é a função declarada do container
- `volumeHost`: monta /opt do host porque o shell exposto precisa enxergar o que está instalado lá

## Imagens

| Serviço    | Imagem                   |
| ---------- | ------------------------ |
| ttydbridge | cp0204/ttydbridge:v0.0.3 |

## Fonte oficial

Projeto original: **Cp0204**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
