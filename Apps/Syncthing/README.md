# Syncthing

> Sincronização de ficheiros aberta e descentralizada

## O que é

# Desbloquear o verdadeiro potencial do backup de dados

Diga adeus às limitações dos backups tradicionais na nuvem e abrace o futuro com o Syncthing. Ao contrário dos serviços de nuvem convencionais, que frequentemente trazem preocupações com privacidade e restrições de armazenamento, o Syncthing oferece uma solução segura de sincronização de ficheiros em tempo real que mantém os seus dados exclusivamente nas suas mãos. Quer esteja a sincronizar documentos de trabalho ou fotos pessoais, tem controlo total sobre onde e como os seus ficheiros são armazenados e partilhados.

# Funcionalidades que fazem a diferença

O Syncthing proporciona uma experiência fluida e fácil de usar com funcionalidades poderosas desenhadas para utilizadores do dia-a-dia. Desfrute de sincronização contínua de ficheiros entre múltiplos dispositivos sem custos de subscrição. Sinta a tranquilidade de saber que os seus dados estão encriptados e protegidos contra acessos não autorizados. A natureza de código aberto do Syncthing significa que não há custos ocultos, oferecendo uma solução verdadeiramente transparente e económica para as suas necessidades de gestão de ficheiros.

# O poder do Syncthing no Zima

Implementar o Syncthing em dispositivos de nuvem privada Zima proporciona uma conveniência incomparável: desfrute de capacidade de armazenamento ilimitada, garanta a privacidade dos seus dados e beneficie de velocidades de rede local extremamente rápidas. Transforme a gestão e sincronização dos seus dados com a combinação perfeita das capacidades do Syncthing e da infraestrutura poderosa do Zima.


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
