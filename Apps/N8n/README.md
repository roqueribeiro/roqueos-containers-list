# n8n

> Ferramenta de automação de fluxos de trabalho

## O que é

O n8n é uma poderosa plataforma de código aberto para automação de fluxos de trabalho e inteligência artificial conversacional que combina a flexibilidade da codificação com a simplicidade do desenvolvimento sem código, permitindo aos utilizadores criar fluxos de trabalho de automação eficientes e seguros. Integra-se perfeitamente com qualquer aplicação através de uma API, aproveitando capacidades de IA nativas (como fluxos de trabalho de agentes de IA baseados no LangChain) para processar dados personalizados, ideal para gestão de tarefas pessoais, colaboração em equipa ou automação de nível empresarial. A sua vibrante comunidade oferece mais de 400 integrações e mais de 900 modelos prontos a usar, permitindo aos utilizadores implementar automações rapidamente.

A plataforma suporta um design de fluxos de trabalho altamente personalizável, permitindo aos utilizadores escrever JavaScript/Python, adicionar pacotes npm ou utilizar uma interface visual intuitiva para gerir dados, atendendo tanto a tarefas simples como a processos complexos. Funcionalidades de nível empresarial, como permissões avançadas e implementações isoladas, garantem segurança, enquanto o suporte multilingue a torna acessível globalmente. O n8n oferece uma solução de automação versátil e fácil de usar.

Descubra os Cenários de Automação do n8n
Os recursos da comunidade do n8n fornecem suporte extensivo e inspiração, ajudando os utilizadores a explorar o seu valor baseado em cenários e a criar facilmente fluxos de trabalho de automação. Abaixo estão dois recursos principais que mostram as capacidades do n8n em vários casos de uso:

1. [Fórum Oficial da Comunidade n8n](https://community.n8n.io/): 
O fórum é um centro de colaboração e aprendizagem para os utilizadores, oferecendo recursos que vão desde guias para iniciantes até designs de fluxos de trabalho avançados. Os casos de uso partilhados incluem a automação de publicações em redes sociais ou a sincronização de dados em tempo real, como o uso do n8n para extrair dados do Google Sheets e enviar notificações no Slack, melhorando a colaboração em equipa e a eficiência dos dados.

2. [Biblioteca Oficial de Modelos n8n](https://n8n.io/workflows/): 
A biblioteca de modelos oferece mais de 900 fluxos de trabalho prontos a usar para cenários como automação de marketing, análise de dados e suporte ao cliente. Por exemplo, um modelo pode conectar o Shopify ao Mailchimp, adicionando automaticamente novos clientes a listas de e-mails e enviando e-mails de boas-vindas, tornando a automação acessível a utilizadores não técnicos. Fluxos de trabalho orientados por IA, como o tratamento de consultas de clientes com o LangChain, destacam a força do n8n em interações inteligentes.


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço |
| ---- | --------- | --------- | -------------- | ------- |
| 5678 | 5678      | tcp       | web port       | n8n     |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container    | Serviço |
| -------------------- | --------------- | ------- |
| /DATA/AppData/$AppID | /home/node/.n8n | n8n     |

## Variáveis de ambiente

| Variável          | Valor padrão | Serviço |
| ----------------- | ------------ | ------- |
| TZ                | $TZ          | n8n     |
| N8N_SECURE_COOKIE | false        | n8n     |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5678/`.

## Imagens

| Serviço | Imagem            |
| ------- | ----------------- |
| n8n     | n8nio/n8n:1.123.0 |

## Fonte oficial

Projeto original: https://n8n.io

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
