# Node-RED

> Programação de baixo código para aplicações baseadas em eventos

## O que é

O Node-RED é uma plataforma de desenvolvimento de baixo código baseada em fluxos que permite criar tarefas de automação e aplicações conectando vários nós. Um editor baseado no browser, simples de usar, torna-o ideal para utilizadores em automação doméstica, controlo industrial ou outros campos para construir rapidamente fluxos de processamento de dados.

As funcionalidades principais incluem um editor de fluxos de baixo código e tratamento robusto de dados. Construído em Node.js com um modelo orientado a eventos e não-bloqueante, a plataforma suporta recolha, transformação e visualização de dados em tempo real. Uma paleta com mais de 5000 nós permite aos utilizadores construir fluxos via arrastar-e-largar. Um editor de texto rico permite criar funções JavaScript para personalização melhorada.

Armazena fluxos em formato JSON, facilitando importação e exportação fáceis para partilha. Uma biblioteca incorporada permite guardar funções úteis, modelos ou fluxos para reutilização, e uma biblioteca de fluxos online suporta partilha dos melhores fluxos globalmente. Com facilidade de uso e eficiência no centro, a plataforma oferece uma solução moderna para diversas necessidades de automação.

**Funcionalidades Principais:**
- Editor de fluxos de baixo código baseado no browser com ligações de nós arrastar-e-largar
- Recolha, transformação e visualização de dados em tempo real
- Modelo orientado a eventos, não-bloqueante com Node.js
- Paleta com mais de 5000 nós para funcionalidade estendida
- Editor de texto rico para criar funções JavaScript
- Armazenamento de fluxos baseado em JSON para partilha fácil
- Biblioteca incorporada para guardar funções, modelos e fluxos
- Biblioteca de fluxos online para partilhar os melhores fluxos

**Saber Mais:**
- [Website Oficial Node-RED](https://nodered.org/)
- [Node-RED GitHub](https://github.com/node-red/node-red)


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64, s390x, arm.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço  |
| ---- | --------- | --------- | ---------------- | -------- |
| 1880 | 1880      | tcp       | Porta HTTP WebUI | node-red |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço  |
| ------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/data | /data        | node-red |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1880/`.

### Por que este app pede privilégio

- `networkHost`: descoberta e controle de dispositivos IoT na rede local

## Imagens

| Serviço  | Imagem                 |
| -------- | ---------------------- |
| node-red | nodered/node-red:4.1.2 |

## Fonte oficial

Projeto original: **Node-RED**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
