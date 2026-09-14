# BeaverHabitTracker

> A self-hosted, goal-free habit tracking tool.

## O que é

Beaver Habit Tracker is a self-hosted habit tracking tool designed for users who want to effortlessly monitor daily behaviors without the stress of goal-setting. Its intuitive Web interface offers a pressure-free tracking experience, ideal for those focused on behavior observation and personal growth.

The tool's core features include goal-free habit tracking and a minimalist interface. It allows users to log multiple habits easily, without focusing on streaks or targets, and provides simple visualizations to understand behavior patterns. Users can add daily notes to record specific activities or reflections, with a smooth, low-effort interface.

It uses a self-hosted approach, ensuring data privacy and full control, with a lightweight, efficient design requiring minimal server resources. Users can manually reorder habits for an optimized experience. The tool's stress-free observation and intuitive operation help users gradually improve habits, delivering a modern habit management solution.

**Key Features:**
- Goal-free habit tracking focused on awareness, not achievement
- Clean, minimalist interface for effortless daily logging
- Lightweight and efficient, requiring minimal server resources
- Simple visualizations to understand behavior patterns
- Daily notes for recording activities or reflections

**Learn More:**
- [Beaver Habit Tracker Official Website](https://beaverhabits.com/)
- [Beaver Habit Tracker GitHub](https://github.com/daya0576/beaverhabits)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço            |
| ----- | --------- | --------- | --------------- | ------------------ |
| 15580 | 8080      | tcp       | WebUI HTTP Port | beaverhabittracker |


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
