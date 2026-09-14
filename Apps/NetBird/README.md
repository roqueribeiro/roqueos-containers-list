# NetBird

> Rede privada WireGuard entre seus aparelhos, com SSO e MFA

## O que é

NetBird junta uma rede sobreposta baseada em WireGuard com acesso de confiança zero, numa plataforma aberta para conectar seus aparelhos com segurança e sem abrir porta no roteador.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container     | Serviço |
| -------------------- | ---------------- | ------- |
| /DATA/AppData/$AppID | /var/lib/netbird | netbird |

## Variáveis de ambiente

| Variável            | Valor padrão | Serviço |
| ------------------- | ------------ | ------- |
| NB_SETUP_KEY        | —            | netbird |
| NB_MANAGEMENT_URL   | —            | netbird |
| NB_HOSTNAME         | Zima         | netbird |
| NB_ENABLE_SSH_ROOT  | true         | netbird |
| NB_ALLOW_SERVER_SSH | true         | netbird |

## Primeiro acesso

Abra o app pelo ícone no RoqueOS depois de instalar.

- ### Getting Started
- 1. Visit your NetBird dashboard ([app.netbird.io](https://app.netbird.io) or your self-hosted instance) and log in or create a new account
- 2. Navigate to the **Setup Keys** page
- 3. Click **Create Setup Key** to create a new key
- 4. Give your key a name (e.g., "Zima Server") and copy the generated setup key
- 5. In ZimaOS, click the settings icon in the top-right corner of the app tile
- 6. Paste the setup key in the **NB_SETUP_KEY** field
- 7. (Optional) If using a self-hosted NetBird dashboard, enter the URL in **NB_MANAGEMENT_URL**
- 8. (Optional) Customize the hostname in **NB_HOSTNAME** (default: Zima)
- 9. Save and restart the app
- Your device will now appear in your NetBird dashboard and can connect to other devices in your mesh network.

### Por que este app pede privilégio

- `networkHost`: cria a interface WireGuard da rede sobreposta no host
- `capAdd`: NET_ADMIN, SYS_ADMIN e SYS_RESOURCE para criar a interface de rede e ajustar limites do túnel

## Imagens

| Serviço | Imagem                   |
| ------- | ------------------------ |
| netbird | netbirdio/netbird:0.62.3 |

## Fonte oficial

Projeto original: **NetBird GmbH**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
