# WireGuard Easy

> WEB UI para gerenciar o WireGuard VPN.

## O que é

Você encontrou a maneira mais fácil de instalar e gerenciar o WireGuard em qualquer host Linux!

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve     | Serviço |
| ----- | --------- | --------- | ------------------ | ------- |
| 51820 | 51820     | udp       | Wireguard VPN port | wg-easy |
| 51821 | 51821     | tcp       | WEB UI port        | wg-easy |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container   | Serviço |
| ------------------------------ | -------------- | ------- |
| /DATA/AppData/$AppID/wireguard | /etc/wireguard | wg-easy |

## Variáveis de ambiente

| Variável       | Valor padrão  | Serviço |
| -------------- | ------------- | ------- |
| PASSWORD       | ${PASSWORD}   | wg-easy |
| WG_HOST        | roqueos.local | wg-easy |
| WG_PORT        | 51820         | wg-easy |
| WG_DEFAULT_DNS | 1.1.1.1       | wg-easy |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:51821/`.

- 🔧 Configurações
- A senha da interface web é gerada pelo RoqueOS na instalação, única para este servidor, e aparece uma vez logo depois de instalar: guarde-a.
- ⚠️ Atenção!
- Você precisa ajustar pelo menos o parâmetro obrigatório `WG_HOST` para o app funcionar.
- O valor tem que ser um domínio (ou um endereço IP) que aponte para este servidor (acessível pela internet).
- O mesmo vale para o parâmetro `WG_PORT`. Troque pela porta acessível de fora da sua rede local se ela for diferente da padrão 51820.

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem                     |
| ------- | -------------------------- |
| wg-easy | ghcr.io/wg-easy/wg-easy:13 |

## Fonte oficial

Projeto original: **WeejeWel**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
