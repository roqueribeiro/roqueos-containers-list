# OpenHAB

> Empoderando o lar inteligente

## O que é

O Open Home Automation Bus (openHAB, pronunciado ˈəʊpənˈhæb) é uma plataforma de automação residencial de código aberto e tecnologia agnóstica que funciona como o centro da sua casa inteligente. Sua capacidade de integrar uma multidão de outros dispositivos e sistemas. openHAB inclui outros sistemas de automação residencial, dispositivos (inteligentes) e outras tecnologias em uma única solução. Para fornecer uma interface de usuário uniforme e uma abordagem comum às regras de automação em todo o sistema, independentemente do número de fabricantes e sub-sistemas envolvidos. Você dá a você a ferramenta mais flexível disponível para realizar quase todos os seus desejos de automação residencial; se você pode pensar nisso, é provável que você possa implementá-lo com openHAB.

Categoria na App Store do RoqueOS: **Home Automation**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container      | Serviço |
| ----------------------------- | ----------------- | ------- |
| /etc/localtime                | /etc/localtime    | openhab |
| /etc/timezone                 | /etc/timezone     | openhab |
| /DATA/AppData/$AppID/addons   | /openhab/addons   | openhab |
| /DATA/AppData/$AppID/conf     | /openhab/conf     | openhab |
| /DATA/AppData/$AppID/userdata | /openhab/userdata | openhab |

## Variáveis de ambiente

| Variável      | Valor padrão | Serviço |
| ------------- | ------------ | ------- |
| CRYPTO_POLICY | unlimited    | openhab |
| PGID          | $PGID        | openhab |
| PUID          | $PUID        | openhab |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8080/`.

### Por que este app pede privilégio

- `networkHost`: descoberta de dispositivos por mDNS e UPnP na rede local

## Imagens

| Serviço | Imagem                |
| ------- | --------------------- |
| openhab | openhab/openhab:4.3.3 |

## Fonte oficial

Projeto original: **openHAB**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
