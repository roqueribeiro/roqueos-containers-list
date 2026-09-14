# Unifi-controller [legacy]

> O software Unifi-controller é um poderoso motor de software sem fio corporativo ideal para implantações de clientes de alta densidade que exigem baixa latência e alto desempenho de disponibilidade.

## O que é

Para que o Unifi aceite outros dispositivos, como um ponto de acesso, é necessário modificar o endereço IP inform. Como o Unifi é executado por padrão no Docker, ele usa um endereço IP não acessível por outros dispositivos. Para modificá-lo, vá para Configurações> Configurações do sistema> Configuração do controlador e defina o nome do host / IP do controlador em um nome de host ou um endereço IP acessível por seus dispositivos. Além disso, a caixa de seleção "Substituir host inform pelo nome do host / IP do controlador" deve ser marcada para permitir que os dispositivos se conectem ao controlador durante a adoção (os dispositivos usam o ponto de extremidade inform durante a adoção).

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve | Serviço          |
| ----- | --------- | --------- | -------------- | ---------------- |
| 3478  | 3478      | udp       | —              | unifi-controller |
| 10001 | 10001     | udp       | —              | unifi-controller |
| 8383  | 8080      | tcp       | —              | unifi-controller |
| 8443  | 8443      | tcp       | —              | unifi-controller |
| 1900  | 1900      | udp       | —              | unifi-controller |
| 8843  | 8843      | tcp       | —              | unifi-controller |
| 8880  | 8880      | tcp       | —              | unifi-controller |
| 6789  | 6789      | tcp       | —              | unifi-controller |
| 5514  | 5514      | udp       | —              | unifi-controller |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço          |
| --------------------------- | ------------ | ---------------- |
| /DATA/AppData/$AppID/config | /config      | unifi-controller |

## Variáveis de ambiente

| Variável    | Valor padrão | Serviço          |
| ----------- | ------------ | ---------------- |
| MEM_LIMIT   | 1024         | unifi-controller |
| MEM_STARTUP | 1024         | unifi-controller |
| PGID        | 1000         | unifi-controller |
| PUID        | 1000         | unifi-controller |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8383/`.

## Imagens

| Serviço          | Imagem                             |
| ---------------- | ---------------------------------- |
| unifi-controller | linuxserver/unifi-controller:8.0.7 |

## Fonte oficial

Projeto original: **LinuxServer.io**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
