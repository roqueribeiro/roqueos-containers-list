# Tailscale

> Conecte os seus dispositivos e utilizadores numa rede privada virtual segura.

## O que é

Uma aplicação de rede auto-hospedada moderna construída sobre WireGuard®, fornecendo ligações seguras e encriptadas entre dispositivos independentemente da sua localização. A sua rede de configuração zero elimina a necessidade de regras complexas de firewall, redirecionamento de portas ou administração de rede, tornando-a ideal para empresas e indivíduos que criam ambientes de rede eficientes e seguros.

As funcionalidades principais da aplicação incluem conectividade de dispositivos sem interrupções e segurança robusta. Utiliza WireGuard® para encriptação ponto-a-ponto, garantindo que o tráfego não pode ser interceptado, com chaves privadas armazenadas exclusivamente nos dispositivos do utilizador. A travessia NAT automática permite ligações entre computadores, telefones, servidores e dispositivos IoT em diferentes tipos de rede, formando uma rede privada unificada. Oferece também controlo de acesso baseado em identidade, integrando-se com Google, Microsoft, GitHub ou soluções SSO personalizadas para autenticação simples, substituindo as restrições tradicionais baseadas em IP para melhorar a segurança.

Destaca-se na entrega de acesso remoto seguro a serviços e infraestrutura. Os utilizadores podem aceder facilmente a servidores domésticos, ligar-se a redes de escritório durante viagens ou estabelecer ligações seguras entre serviços de nuvem. O encaminhamento de sub-redes permite acesso a redes inteiras, os nós de saída permitem navegação segura na internet, e o MagicDNS simplifica a descoberta de dispositivos. Estas funcionalidades garantem acesso eficiente e seguro a recursos de qualquer localização.

Suporta quase todas as plataformas, incluindo Linux, Windows, macOS, iOS, Android e vários firmwares de router, com implementação flexível em ambientes de nuvem ou no local. Uma interface Web amigável fornece monitorização em tempo real da topologia de rede, estado dos dispositivos e controlos de acesso, com documentação da comunidade ajudando na otimização da configuração. Seja configurando acesso seguro para pequenas equipas ou gerindo redes à escala empresarial, a operação intuitiva e alta flexibilidade da aplicação fornecem uma solução de rede moderna.

**Características principais:**
- Encriptação ponto-a-ponto via WireGuard®, garantindo tráfego não interceptável
- Rede de configuração zero, eliminando configuração complexa de firewall ou redirecionamento de portas
- Travessia NAT automática para conectividade perfeita de dispositivos entre tipos de rede
- Controlo de acesso baseado em identidade com integração SSO (Google, Microsoft, GitHub)
- Encaminhamento de sub-redes para acesso seguro a toda a rede
- Nós de saída para navegação segura na internet
- MagicDNS para descoberta simplificada de dispositivos

**Saiba mais:**
- [Site oficial Tailscale](https://tailscale.com)
- [Repositório GitHub Tailscale](https://github.com/tailscale/tailscale)


Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm, arm64, 386.

## Portas

_Nenhum._



## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container       | Serviço   |
| -------------------- | ------------------ | --------- |
| /DATA/AppData/$AppID | /var/lib/tailscale | tailscale |
| /dev/net/tun         | /dev/net/tun       | tailscale |

## Variáveis de ambiente

| Variável     | Valor padrão       | Serviço   |
| ------------ | ------------------ | --------- |
| TS_STATE_DIR | /var/lib/tailscale | tailscale |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5252/`.

### Por que este app pede privilégio

- `capAdd`: NET_ADMIN e NET_RAW para criar e configurar a interface de rede da VPN
- `networkHost`: cria a interface de rede da VPN no host, e ela precisa existir no host

## Imagens

| Serviço   | Imagem                      |
| --------- | --------------------------- |
| tailscale | tailscale/tailscale:v1.90.8 |

## Fonte oficial

Projeto original: **Tailscale Inc.**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
