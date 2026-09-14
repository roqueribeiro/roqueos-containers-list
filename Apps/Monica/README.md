# Monica

> A Personal Relationship Management tool to help you document your social life.

## O que é

Monica is a self-hosted personal relationship management tool that helps users document and organize interactions with family and friends via an intuitive Web interface, creating a personalized contact database. It is ideal for users balancing work and life, ensuring key personal connections are never missed.

The tool's core features include comprehensive contact management and smart reminders. It supports creating detailed contact profiles, logging personal details, relationships (e.g., family, friends), and how contacts were met. Users can set automatic reminders for birthdays, anniversaries, and other key dates, while tracking conversations, activities, and gift ideas. A diary feature records daily moods and significant moments, maintaining a clear life record.

It offers task and debt management to track to-dos or financial interactions. Users can upload photos and documents, favorite contacts, and organize relationships with labels for streamlined data management. Full control over local data ensures privacy. The tool’s intuitive operation and high flexibility deliver a modern relationship management solution.

**Key Features:**
- Comprehensive contact management with detailed profiles
- Automatic reminders for birthdays, anniversaries, and key dates
- Track conversations, activities, and gift ideas
- Diary feature to record daily moods and moments
- Task and debt management for to-dos and finances
- Upload photos and documents, favorite contacts
- Organize contacts with labels
- Local data storage for privacy assurance

**Learn More:**
- [Monica Official Website](https://www.monicahq.com)
- [Monica GitHub Repository](https://github.com/monicahq/monica)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve  | Serviço |
| ----- | --------- | --------- | --------------- | ------- |
| 18930 | 80        | tcp       | WebUI HTTP Port | monica  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container          | Serviço   |
| ---------------------------- | --------------------- | --------- |
| /DATA/AppData/$AppID/storage | /var/www/html/storage | monica    |
| /DATA/AppData/$AppID/mysql   | /var/lib/mysql        | monica-db |

## Variáveis de ambiente

| Variável                     | Valor padrão                     | Serviço   |
| ---------------------------- | -------------------------------- | --------- |
| APP_KEY                      | ChangeMeBy32KeyLengthOrGenerated | monica    |
| DB_HOST                      | monica-db                        | monica    |
| DB_USERNAME                  | monicauser                       | monica    |
| DB_PASSWORD                  | monicasecret                     | monica    |
| MARIADB_RANDOM_ROOT_PASSWORD | true                             | monica-db |
| MARIADB_DATABASE             | monica                           | monica-db |
| MARIADB_USER                 | monicauser                       | monica-db |
| MARIADB_PASSWORD             | monicasecret                     | monica-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:18930/`.

## Imagens

| Serviço   | Imagem         |
| --------- | -------------- |
| monica    | monica:4.1.2   |
| monica-db | mariadb:11.8.2 |

## Fonte oficial

Projeto original: **monica**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
