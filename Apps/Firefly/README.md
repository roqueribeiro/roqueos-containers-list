# Firefly

> Servidor WireGuard fácil de instalar, a versão turbinada do wg-easy

## O que é

Firefly é um servidor WireGuard simples de instalar, útil para ligar redes remotas, trabalhar de fora e expor um servidor local que está atrás de NAT ou firewall. Tem interface web de administração.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container  | Serviço |
| -------------------------- | ------------- | ------- |
| /lib/modules               | /lib/modules  | firefly |
| /DATA/AppData/firefly/conf | /firefly/conf | firefly |

## Variáveis de ambiente

| Variável         | Valor padrão        | Serviço |
| ---------------- | ------------------- | ------- |
| FIREFLY_PASSWORD | ${FIREFLY_PASSWORD} | firefly |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:50121/`.

- A senha do admin é gerada pelo RoqueOS na instalação, única para este servidor, e aparece uma vez logo depois de instalar: guarde-a.

> **Senha gerada.** O RoqueOS gera a senha de acesso para o seu servidor na instalação e a mostra uma vez, logo depois de instalar. Guarde.

### Por que este app pede privilégio

- `networkHost`: compose herdado do upstream; a interface é publicada direto na rede do host
- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem            |
| ------- | ----------------- |
| firefly | uusec/firefly:4.4 |

## Fonte oficial

Projeto original: **Safe3**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
