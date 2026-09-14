# ttydBridge

> Terminal do servidor, aberto no navegador

## O que é

ttydbridge expõe um shell do servidor dentro do navegador, pelo ttyd. É um acesso poderoso e deliberado: quem abre esta janela tem o mesmo alcance de quem está sentado na máquina, então mantenha fora da internet e atrás de autenticação.

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
