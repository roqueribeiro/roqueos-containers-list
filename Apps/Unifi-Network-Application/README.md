# Unifi Network Application

> The Unifi network application software is a powerful, enterprise wireless software engine ideal for high-density client deployments requiring low latency and high uptime performance.

## O que é

Only mandatory ports are enabled by default, to extend functionality consider exposing 1900:1900/udp, 8843:8843, 8880:8880, 6789:6789, 5514:5514/udp.
Other ports specifications [here](https://docs.linuxserver.io/images/docker-unifi-network-application/#ports-p).

Because the network application runs inside Docker by default it uses an IP address not accessible by other devices.
So, for it to adopt other devices, it is required to use port `8080` and change the inform IP address. To do so, go in settings and search for the `Inform Host` option, there select override and set the address to that of the host.
Often, it is also needed to ssh into the devices you want to adopt and manually set the inform IP address, the command needed for doing so is `set-inform http://HOST-ADDRESS:8080/inform`.

For more [information](https://docs.linuxserver.io/images/docker-unifi-network-application/)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço                   |
| ----- | --------- | --------- | --------------- | ------------------------- |
| 8443  | 8443      | tcp       | WebUI HTTP Port | unifi-network-application |
| 3478  | 3478      | udp       | —               | unifi-network-application |
| 10001 | 10001     | udp       | —               | unifi-network-application |
| 8080  | 8080      | tcp       | —               | unifi-network-application |
| 27017 | 27017     | tcp       | —               | unifi-db                  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                                 | No container | Serviço                   |
| --------------------------------------- | ------------ | ------------------------- |
| /DATA/AppData/unifi-network-application | /config      | unifi-network-application |
| /DATA/AppData/unifi-db                  | /data/db     | unifi-db                  |

## Variáveis de ambiente

| Variável     | Valor padrão | Serviço                   |
| ------------ | ------------ | ------------------------- |
| MONGO_DBNAME | unifi-db     | unifi-network-application |
| MONGO_HOST   | unifi-db     | unifi-network-application |
| MONGO_PASS   | pass         | unifi-network-application |
| MONGO_PORT   | 27017        | unifi-network-application |
| MONGO_USER   | unifi        | unifi-network-application |
| PGID         | $PGID        | unifi-network-application |
| PUID         | $PUID        | unifi-network-application |
| TZ           | $TZ          | unifi-network-application |
| PGID         | $PGID        | unifi-db                  |
| PUID         | $PUID        | unifi-db                  |
| TZ           | $TZ          | unifi-db                  |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:8443/`.

- Only mandatory ports are enabled by default, to extend functionality consider exposing 1900:1900/udp, 8843:8843, 8880:8880, 6789:6789, 5514:5514/udp.
- Other ports specifications [here](https://docs.linuxserver.io/images/docker-unifi-network-application/#ports-p).
- Because the network application runs inside Docker by default it uses an IP address not accessible by other devices.
- So, for it to adopt other devices, it is required to use port `8080` and change the inform IP address. To do so, go in settings and search for the `Inform Host` option, there select override and set the address to that of the host.
- Often, it is also needed to ssh into the devices you want to adopt and manually set the inform IP address, the command needed for doing so is `set-inform http://HOST-ADDRESS:8080/inform`.
- For more [information](https://docs.linuxserver.io/images/docker-unifi-network-application/)

## Imagens

| Serviço                   | Imagem                                               |
| ------------------------- | ---------------------------------------------------- |
| unifi-network-application | lscr.io/linuxserver/unifi-network-application:latest |
| unifi-db                  | docker.io/mongo:3.6                                  |

## Fonte oficial

Projeto original: **Ubiquiti and Linuxserver.io**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
