# BeaverHabitTracker

> Uma ferramenta de rastreamento de hábitos auto-hospedada e sem objetivos.

## O que é

O Beaver Habit Tracker é uma ferramenta de rastreamento de hábitos auto-hospedada concebida para utilizadores que querem monitorizar facilmente comportamentos diários sem o stress de definir objetivos. A sua interface Web intuitiva oferece uma experiência de rastreamento sem pressão, ideal para aqueles focados na observação de comportamento e crescimento pessoal.

As características principais da ferramenta incluem rastreamento de hábitos sem objetivos e uma interface minimalista. Permite aos utilizadores registar facilmente múltiplos hábitos, sem focar em sequências ou metas, e fornece visualizações simples para compreender padrões de comportamento. Os utilizadores podem adicionar notas diárias para registar atividades específicas ou reflexões, com uma interface suave e de baixo esforço.

Utiliza uma abordagem auto-hospedada, garantindo privacidade de dados e controlo total, com um design leve e eficiente que requer recursos mínimos do servidor. Os utilizadores podem reordenar manualmente os hábitos para uma experiência otimizada. A observação sem stress e operação intuitiva da ferramenta ajudam os utilizadores a melhorar gradualmente os hábitos, fornecendo uma solução moderna de gestão de hábitos.

**Características Principais:**
- Rastreamento de hábitos sem objetivos focado na consciência, não na conquista
- Interface limpa e minimalista para registo diário sem esforço
- Leve e eficiente, requer recursos mínimos do servidor
- Visualizações simples para compreender padrões de comportamento
- Notas diárias para registar atividades ou reflexões

**Saiba Mais:**
- [Site Oficial Beaver Habit Tracker](https://beaverhabits.com/)
- [Beaver Habit Tracker GitHub](https://github.com/daya0576/beaverhabits)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço            |
| ----- | --------- | --------- | ---------------- | ------------------ |
| 15580 | 8080      | tcp       | Porta HTTP WebUI | beaverhabittracker |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host               | No container | Serviço            |
| --------------------- | ------------ | ------------------ |
| /DATA/AppData/$AppID/ | /app/.user   | beaverhabittracker |

## Variáveis de ambiente

| Variável                 | Valor padrão   | Serviço            |
| ------------------------ | -------------- | ------------------ |
| HABITS_STORAGE           | USER_DISK      | beaverhabittracker |
| TRUSTED_LOCAL_EMAIL      | your@email.com | beaverhabittracker |
| INDEX_HABIT_DATE_COLUMNS | 5              | beaverhabittracker |
| ENABLE_IOS_STANDALONE    | true           | beaverhabittracker |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:15580/`.

## Imagens

| Serviço            | Imagem                      |
| ------------------ | --------------------------- |
| beaverhabittracker | daya0576/beaverhabits:0.7.3 |

## Fonte oficial

Projeto original: **daya0576**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
