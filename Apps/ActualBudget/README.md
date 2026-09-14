# Actual Budget

> Privacy-first finance app with envelope budgeting and multi-device sync.

## O que é

Actual Budget is a fast, privacy-focused finance management app using local-first envelope budgeting, ensuring full control over data. Its intuitive interface supports offline use, with multi-device sync and optional end-to-end encryption, delivering a secure, efficient financial management experience, ideal for users seeking clear financial oversight.

The app's core features include envelope budgeting based on real income, rapid transaction handling, and intuitive financial reporting. It helps users track spending and monitor monthly savings clearly, with a streamlined transaction editor for quick categorization, split transactions, and transfers. Built-in net worth and cash flow reports provide financial insights, and a custom report engine allows tailored reports for specific needs. Undo and redo functionality ensures users can easily correct mistakes, maintaining operational flexibility.

It integrates bank accounts via goCardless (EU/UK) or SimpleFIN (US/Canada), supports multi-device syncing for data privacy, and enables importing transaction data from YNAB4, nYNAB, and QIF, OFX, QFX, CAMT.053, CSV files, simplifying migration of existing financial records. Community documentation enhances usability, and the app's simple operation and high flexibility deliver a modern finance management solution.

**Key Features:**
- Privacy-focused personal finance management
- Envelope budgeting methodology
- Multi-device synchronization
- End-to-end encryption support
- Local data ownership
- Fast and responsive interface
- Open source and self-hosted
- Bank account synchronization
- Detailed financial reporting
- Budget tracking and analysis

**Learn More:**
- [Actual Budget Official Website](https://actualbudget.org)
- [Actual Budget GitHub Repository](https://github.com/actualbudget/actual)
- [Actual Budget Docker Image](https://hub.docker.com/r/actualbudget/actual-server)


Categoria na App Store do RoqueOS: **Finance**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve                   | Serviço      |
| ----- | --------- | --------- | -------------------------------- | ------------ |
| 15006 | 5006      | tcp       | Actual Budget Web Interface Port | actualbudget |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host              | No container | Serviço      |
| -------------------- | ------------ | ------------ |
| /DATA/AppData/$AppID | /data        | actualbudget |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:15006/`.

- After opening the web page for the first time, you will see an error popup. Click the `Advanced options` option to successfully enter the Actual Budget web page.

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
