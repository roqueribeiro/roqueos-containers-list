# Actual Budget

> Aplicação financeira que prioriza privacidade com orçamentação por envelopes e sincronização multi-dispositivos.

## O que é

Actual Budget é uma aplicação de gestão financeira rápida e focada na privacidade que utiliza orçamentação por envelopes local-primeiro, garantindo controlo total sobre os dados. A sua interface intuitiva suporta utilização offline, com sincronização multi-dispositivos e encriptação ponta-a-ponta opcional, proporcionando uma experiência de gestão financeira segura e eficiente, ideal para utilizadores que procuram supervisão financeira clara.

As funcionalidades principais da aplicação incluem orçamentação por envelopes baseada em rendimento real, processamento rápido de transacções e relatórios financeiros intuitivos. Ajuda os utilizadores a rastrear despesas e monitorizar claramente as poupanças mensais, com um editor de transacções simplificado para categorização rápida, transacções divididas e transferências. Relatórios integrados de património líquido e fluxo de caixa fornecem insights financeiros, e um motor de relatórios personalizado permite relatórios adaptados para necessidades específicas. A funcionalidade de desfazer e refazer garante que os utilizadores podem facilmente corrigir erros, mantendo flexibilidade operacional.

Integra contas bancárias via goCardless (EU/UK) ou SimpleFIN (US/Canadá), suporta sincronização multi-dispositivos para privacidade de dados, e permite importação de dados de transacções de YNAB4, nYNAB, e ficheiros QIF, OFX, QFX, CAMT.053, CSV, simplificando a migração de registos financeiros existentes. A documentação da comunidade melhora a usabilidade, e a operação simples e alta flexibilidade da aplicação entregam uma solução moderna de gestão financeira.

**Características Principais:**
- Gestão financeira pessoal focada na privacidade
- Metodologia de orçamentação por envelopes
- Sincronização multi-dispositivos
- Suporte a encriptação ponta-a-ponta
- Propriedade local dos dados
- Interface rápida e responsiva
- Código aberto e auto-hospedado
- Sincronização de contas bancárias
- Relatórios financeiros detalhados
- Rastreamento e análise de orçamento

**Saiba Mais:**
- [Site Oficial Actual Budget](https://actualbudget.org)
- [Repositório GitHub Actual Budget](https://github.com/actualbudget/actual)
- [Imagem Docker Actual Budget](https://hub.docker.com/r/actualbudget/actual-server)


Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                    | Serviço      |
| ----- | --------- | --------- | --------------------------------- | ------------ |
| 15006 | 5006      | tcp       | Porta Interface Web Actual Budget | actualbudget |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço      |
| -------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID | /data        | actualbudget |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:15006/`.

- Após abrir a página web pela primeira vez, você verá uma janela de erro. Clique na opção `Opções avançadas` para acessar com sucesso a página web do Actual Budget.

## Imagens

| Serviço      | Imagem                            |
| ------------ | --------------------------------- |
| actualbudget | actualbudget/actual-server:25.7.1 |

## Fonte oficial

Projeto original: **ActualBudget**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
