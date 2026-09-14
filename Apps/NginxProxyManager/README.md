# Nginx Proxy Manager

> Gerenciando hosts proxy do Nginx com uma interface simples e poderosa.

## O que é

O Nginx Proxy Manager é uma ferramenta simples e poderosa para ajudá-lo a hospedar vários sites em um único servidor.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço           |
| ---- | --------- | --------- | ---------------- | ----------------- |
| 80   | 80        | tcp       | Nginx HTTP Port  | nginxproxymanager |
| 443  | 443       | tcp       | Nginx HTTPS Port | nginxproxymanager |
| 81   | 81        | tcp       | WebUI Port       | nginxproxymanager |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                              | No container     | Serviço           |
| ------------------------------------ | ---------------- | ----------------- |
| /DATA/AppData/$AppID/data            | /data            | nginxproxymanager |
| /DATA/AppData/$AppID/etc/letsencrypt | /etc/letsencrypt | nginxproxymanager |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:81/`.

- ⚠️ Warning!
- This is a technical app, please make sure you know what you are doing.
- Nginx Proxy Manager occupies ports 80 and 443 by default for built-in Nginx use. It occupies port 81 for the admin page.
- Please change the RoqueOS WebUI port to a port other than 80/81/443. And pay attention to whether the ports conflict with other apps. Otherwise, it may cause your RoqueOS to run abnormally.
- Default Administrator User
- | Username | Password |
- | -------- | -------- |
- | `admin@example.com` | `changeme` |

## Imagens

| Serviço           | Imagem                          |
| ----------------- | ------------------------------- |
| nginxproxymanager | jc21/nginx-proxy-manager:2.13.5 |

## Fonte oficial

Projeto original: **Nginx Proxy Manager**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
