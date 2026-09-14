# CyberChef

> Canivete suíço cyber — criptografia, encoding, análise de dados

## O que é

CyberChef é o Canivete Suíço Cyber — um app web para criptografia, encoding, compressão e análise de dados. 300+ operações encadeáveis em receitas (base64 → AES decrypt → JSON parse → regex extract). Open-source do GCHQ, usado diariamente por profissionais de infosec. Roda totalmente client-side — seus dados nunca saem do navegador.

Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                              | Serviço   |
| ---- | --------- | --------- | ----------------------------------------------------------- | --------- |
| 8099 | 8000      | tcp       | Porta da interface web (SPA estática, sem state no backend) | cyberchef |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8099/`.

- 100% client-side — sem auth, banco ou state. Pode ser exposto publicamente mas considere allowlist de IP se hospedar em escala.
- Receitas podem ser exportadas como fragmentos de URL e compartilhadas com colegas.

## Imagens

| Serviço   | Imagem                         |
| --------- | ------------------------------ |
| cyberchef | mpepping/cyberchef:latest-2025 |

## Fonte oficial

Projeto original: **gchq**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
