# Syncthing

> Open decentralized file synchronization

## O que é

# Unlocking the True Potential of Data Backup

Say goodbye to traditional cloud backup limitations and embrace the future with Syncthing. Unlike conventional cloud services that often come with privacy concerns and storage restrictions, Syncthing provides a secure, real-time file synchronization solution that keeps your data exclusively in your hands. Whether you're syncing work documents or personal photos, you have complete control over where and how your files are stored and shared.

# Features That Make a Difference

Syncthing offers a seamless, user-friendly experience with powerful features designed for everyday users. Enjoy continuous file synchronization between multiple devices without any subscription fees. Experience peace of mind knowing that your data is encrypted and protected from unauthorized access. Syncthing’s open-source nature means no hidden costs, providing a truly transparent and cost-effective solution for your file management needs.

# The Power of Syncthing on Zima

Deploying Syncthing on Zima private cloud devices unlocks unparalleled convenience: enjoy unlimited storage capacity, ensure the privacy of your data, and benefit from blazing local network speeds. Transform your data management and synchronization with the perfect combination of Syncthing’s capabilities and Zima’s powerful infrastructure.


Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                          | Serviço   |
| ----- | --------- | --------- | --------------------------------------- | --------- |
| 8384  | 8384      | tcp       | WebUI HTTP Port                         | syncthing |
| 22000 | 22000     | tcp       | Syncthing listening Port (UDP)          | syncthing |
| 22000 | 22000     | udp       | Syncthing listening Port (UDP)          | syncthing |
| 21027 | 21027     | udp       | Syncthing protocol discovery Port (TCP) | syncthing |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço   |
| --------------------------- | ------------ | --------- |
| /DATA/AppData/$AppID/config | /config      | syncthing |
| /DATA                       | /DATA        | syncthing |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço   |
| -------- | ------------ | --------- |
| PGID     | $PGID        | syncthing |
| PUID     | $PUID        | syncthing |
| TZ       | $TZ          | syncthing |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8384/`.

## Imagens

| Serviço   | Imagem                       |
| --------- | ---------------------------- |
| syncthing | linuxserver/syncthing:1.29.7 |

## Fonte oficial

Projeto original: **Syncthing**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
