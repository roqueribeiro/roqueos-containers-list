# Grafana

> Grafana é uma pilha de observabilidade completa que permite monitorar e analisar métricas, registros e trilhas. Permite que você consulte, visualize, alerte e entenda seus dados, independentemente de onde eles estejam armazenados.


## O que é

Grafana Open Source é um software de visualização e análise de código aberto. Visualização: Gráficos rápidos e flexíveis do lado do cliente com uma variedade de opções. Os plugins do painel oferecem muitas maneiras diferentes de exibir métricas e registros. Painéis dinâmicos: Crie painéis dinâmicos e reutilizáveis com variáveis de modelo que são exibidas como menus suspensos no topo do painel. Explorar métricas: Explore seus dados com consultas ad hoc e perfuração dinâmica. Divida a visão e compare diferentes intervalos de tempo, consultas e fontes de dados lado a lado. Explorar registros: Explore a magia de passar de métricas para registros com filtros de rótulo salvos. Encontre rapidamente todos os registros ou transmita-os ao vivo. Alertas: Defina regras de alerta visuais para suas métricas mais importantes. O Grafana continuará avaliando e enviando notificações para sistemas como Slack, PagerDuty, VictorOps, OpsGenie. Fontes de dados mistas: Fontes de dados mistas em gráficos! Você pode especificar uma fonte de dados para cada consulta. Isso também funciona para fontes de dados personalizadas.


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve            | Serviço |
| ---- | --------- | --------- | ------------------------- | ------- |
| 3003 | 3000      | tcp       | Web interface for Grafana | grafana |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container     | Serviço |
| ------------------------- | ---------------- | ------- |
| /DATA/AppData/$AppID/data | /var/lib/grafana | grafana |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3003/`.

- | username | password |
- | -------- | -------- |
- | `admin`    | `admin`    |

## Imagens

| Serviço | Imagem                 |
| ------- | ---------------------- |
| grafana | grafana/grafana:12.1.4 |

## Fonte oficial

Projeto original: **grafana**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
