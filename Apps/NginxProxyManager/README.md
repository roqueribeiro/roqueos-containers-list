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

| Variável               | Valor padrão          | Serviço           |
| ---------------------- | --------------------- | ----------------- |
| INITIAL_ADMIN_EMAIL    | admin@example.com     | nginxproxymanager |
| INITIAL_ADMIN_PASSWORD | ${NPM_ADMIN_PASSWORD} | nginxproxymanager |

## Primeiro acesso

Depois de instalar, abra `https://<endereço-do-servidor>:81/`.

- Atenção: este é um app técnico.
- O Nginx Proxy Manager usa as portas 80 e 443 para o Nginx embutido, e a 81 para a página de administração. Troque a porta da interface do RoqueOS para uma que não seja 80, 81 ou 443, e confira se não há conflito com outros apps.
- Usuário administrador: `admin@example.com`. A senha é gerada pelo RoqueOS para o seu servidor e aparece uma vez, logo depois de instalar: guarde.

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
