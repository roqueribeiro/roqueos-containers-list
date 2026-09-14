# Monica

> Uma ferramenta de gestão de relacionamentos pessoais para ajudá-lo a documentar a sua vida social.

## O que é

Monica é uma ferramenta de gestão de relacionamentos pessoais auto-hospedada que ajuda os utilizadores a documentar e organizar interações com família e amigos através de uma interface Web intuitiva, criando uma base de dados de contactos personalizada. É ideal para utilizadores que equilibram trabalho e vida, garantindo que as conexões pessoais importantes nunca sejam perdidas.

As funcionalidades principais da ferramenta incluem gestão abrangente de contactos e lembretes inteligentes. Suporta a criação de perfis detalhados de contactos, registo de detalhes pessoais, relacionamentos (ex: família, amigos) e como os contactos foram conhecidos. Os utilizadores podem definir lembretes automáticos para aniversários, datas comemorativas e outras datas importantes, enquanto acompanham conversas, atividades e ideias de presentes. Uma funcionalidade de diário regista humores diários e momentos significativos, mantendo um registo de vida claro.

Oferece gestão de tarefas e dívidas para acompanhar afazeres ou interações financeiras. Os utilizadores podem carregar fotografias e documentos, marcar contactos como favoritos e organizar relacionamentos com etiquetas para gestão de dados simplificada. O controlo total sobre dados locais garante privacidade. O funcionamento intuitivo e alta flexibilidade da ferramenta proporcionam uma solução moderna de gestão de relacionamentos.

**Características Principais:**
- Gestão abrangente de contactos com perfis detalhados
- Lembretes automáticos para aniversários, datas comemorativas e datas importantes
- Acompanhar conversas, atividades e ideias de presentes
- Funcionalidade de diário para registar humores e momentos diários
- Gestão de tarefas e dívidas para afazeres e finanças
- Carregar fotografias e documentos, contactos favoritos
- Organizar contactos com etiquetas
- Armazenamento de dados local para garantia de privacidade

**Saiba Mais:**
- [Website Oficial Monica](https://www.monicahq.com)
- [Repositório GitHub Monica](https://github.com/monicahq/monica)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço |
| ----- | --------- | --------- | ---------------- | ------- |
| 18930 | 80        | tcp       | Porta HTTP WebUI | monica  |


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
