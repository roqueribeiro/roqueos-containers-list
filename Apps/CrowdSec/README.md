# CrowdSec

> Sistema colaborativo open-source de prevenção a intrusão

## O que é

CrowdSec é um IPS (sistema de prevenção a intrusão) gratuito, open-source e colaborativo — como um fail2ban turbinado. Detecta ataques em seus serviços usando parsers e cenários curados pela comunidade, e compartilha sinais globalmente. Bouncers (Nginx, Cloudflare, iptables, etc.) aplicam as decisões.

Categoria na App Store do RoqueOS: **Security**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve               | Serviço  |
| ---- | --------- | --------- | ---------------------------- | -------- |
| 8081 | 8080      | tcp       | Porta da API local           | crowdsec |
| 6060 | 6060      | tcp       | Porta de métricas Prometheus | crowdsec |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container           | Serviço  |
| --------------------------- | ---------------------- | -------- |
| /DATA/AppData/$AppID/db     | /var/lib/crowdsec/data | crowdsec |
| /DATA/AppData/$AppID/config | /etc/crowdsec          | crowdsec |
| /var/log                    | /var/log/host          | crowdsec |

## Variáveis de ambiente

| Variável    | Valor padrão                                                 | Serviço  |
| ----------- | ------------------------------------------------------------ | -------- |
| COLLECTIONS | crowdsecurity/linux crowdsecurity/sshd crowdsecurity/iptable | crowdsec |
| GID         | 1000                                                         | crowdsec |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8081/`.

- Porta padrão mapeada para 8081 para evitar conflito com outros serviços na 8080.
- Monte /var/log do host em modo leitura para o CrowdSec analisar logs (sshd, iptables, etc.).
- Após o boot, registre em https://app.crowdsec.net para o console opcional (gratuito) e configure bouncers no Nginx/Cloudflare.

## Imagens

| Serviço  | Imagem                        |
| -------- | ----------------------------- |
| crowdsec | crowdsecurity/crowdsec:v1.6.4 |

## Fonte oficial

Projeto original: **crowdsecurity**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
