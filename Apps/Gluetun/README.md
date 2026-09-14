# Gluetun

> Cliente VPN que faz o tráfego dos outros containers passar por ele

## O que é

Gluetun é um cliente VPN leve que fala com dezenas de provedores. Outros containers passam a rede por ele, então o tráfego deles sai pelo túnel sem cada um precisar saber disso.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                    | Serviço |
| ---- | --------- | --------- | ----------------------------------------------------------------- | ------- |
| 8888 | 8888      | tcp       | Web interface for Gluetun                                         | gluetun |
| 8388 | 8388      | tcp       | Shadowsocks proxy: point other apps here to route through the VPN | gluetun |
| 8388 | 8388      | tcp       | Shadowsocks proxy: point other apps here to route through the VPN | gluetun |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /gluetun     | gluetun |

## Variáveis de ambiente

| Variável             | Valor padrão | Serviço |
| -------------------- | ------------ | ------- |
| VPN_SERVICE_PROVIDER | custom       | gluetun |
| VPN_TYPE             | openvpn      | gluetun |
| OPENVPN_USER         | —            | gluetun |
| OPENVPN_PASSWORD     | —            | gluetun |
| TZ                   | —            | gluetun |
| UPDATER_PERIOD       | —            | gluetun |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8888/`.

- You will need to configure the providers in the environment variables. See: a documentação do Gluetun Docs no projeto original

### Por que este app pede privilégio

- `capAdd`: NET_ADMIN para criar a interface do tunel VPN e as rotas dela

## Imagens

| Serviço | Imagem                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------- |
| gluetun | qmcgaw/gluetun:v3.41.3@sha256:fa19cc76b2af13d57a8d3dc3066f2ada061b1c761b8aecf989b3877c0486e027 |

## Fonte oficial

Projeto original: **portainer**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
