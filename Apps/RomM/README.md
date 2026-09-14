# RomM

> O RomM é um gestor de ROM auto-hospedado para gerir e jogar coleções de jogos.

## O que é

O RomM é uma aplicação de gestão de coleções de jogos auto-hospedada, concebida para entusiastas de emuladores, oferecendo uma forma conveniente de digitalizar, enriquecer, navegar e jogar jogos. A sua interface Web responsiva permite aos utilizadores gerir coleções através de qualquer navegador moderno, suportando mais de 400 plataformas – ideal para fãs de jogos retro que constroem bibliotecas pessoais.

As principais funcionalidades incluem uma gestão robusta da biblioteca e uma jogabilidade fluida. Obtém metadados do IGDB, Screenscraper e MobyGames, e arte personalizada do SteamGridDB, melhorando o aspeto visual das coleções. Os utilizadores podem jogar diretamente no navegador usando EmulatorJS e RuffleRS, com suporte para jogos multi-disco, DLCs, patches e manuais. Permite também a análise e filtragem por tags de nomes de ficheiros para organização personalizada. Além disso, suporta contas multiutilizador com permissões de acesso limitadas, permitindo a partilha da biblioteca com amigos e a exibição de RetroAchievements.

Pode ser implementado de forma flexível em servidores pessoais ou dispositivos NAS, com aplicações oficiais para Playnite e muOS que melhoram o acesso entre dispositivos. Os utilizadores podem carregar, atualizar ou eliminar jogos através da interface Web, com documentação de suporte da comunidade que expande a funcionalidade. Quer esteja a gerir uma biblioteca pessoal de jogos retro ou a partilhá-la com outros, a interface intuitiva e a elevada personalização da aplicação oferecem uma plataforma de gestão de jogos moderna que responde a diversas necessidades.

**Funcionalidades Principais:**
- Digitalize e melhore a sua biblioteca de jogos com metadados do IGDB, Screenscraper e MobyGames
- Obtenha arte personalizada do SteamGridDB
- Exiba as suas conquistas do Retroachievements
- Metadados disponíveis para mais de 400 plataformas
- Jogue jogos diretamente do navegador usando EmulatorJS e RuffleRS
- Partilhe a sua biblioteca com amigos com acesso e permissões limitadas
- Aplicações oficiais para Playnite e muOS
- Suporta jogos multi-disco, DLCs, mods, hacks, patches e manuais
- Analise e filtre por tags em nomes de ficheiros
- Visualize, carregue, atualize e elimine jogos de qualquer navegador moderno

**Saiba mais:**
- [Site oficial do RomM](https://romm.app)
- [Repositório GitHub do RomM](https://github.com/rommapp/romm)


Categoria na App Store do RoqueOS: **Gaming**.
Arquiteturas suportadas: amd64, arm, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço |
| ---- | --------- | --------- | ---------------- | ------- |
| 8285 | 8080      | tcp       | Porta HTTP WebUI | romm    |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                         | No container    | Serviço |
| ------------------------------- | --------------- | ------- |
| /DATA/AppData/$AppID/resources  | /romm/resources | romm    |
| /DATA/AppData/$AppID/redis-data | /redis-data     | romm    |
| /DATA/AppData/$AppID/library    | /romm/library   | romm    |
| /DATA/AppData/$AppID/assets     | /romm/assets    | romm    |
| /DATA/AppData/$AppID/config     | /romm/config    | romm    |
| /DATA/AppData/$AppID/mysql      | /var/lib/mysql  | romm-db |

## Variáveis de ambiente

| Variável               | Valor padrão | Serviço |
| ---------------------- | ------------ | ------- |
| DB_HOST                | romm-db      | romm    |
| DB_NAME                | romm         | romm    |
| DB_USER                | romm-user    | romm    |
| DB_PASSWD              | roqueos      | romm    |
| ROMM_AUTH_SECRET_KEY   | ""           | romm    |
| IGDB_CLIENT_ID         | ""           | romm    |
| IGDB_CLIENT_SECRET     | ""           | romm    |
| SCREENSCRAPER_USER     | ""           | romm    |
| SCREENSCRAPER_PASSWORD | ""           | romm    |
| STEAMGRIDDB_API_KEY    | ""           | romm    |
| MARIADB_ROOT_PASSWORD  | roqueos      | romm-db |
| MARIADB_DATABASE       | romm         | romm-db |
| MARIADB_USER           | romm-user    | romm-db |
| MARIADB_PASSWORD       | roqueos      | romm-db |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8285/`.

## Imagens

| Serviço | Imagem             |
| ------- | ------------------ |
| romm    | rommapp/romm:4.0.1 |
| romm-db | mariadb:11.8.2     |

## Fonte oficial

Projeto original: **rommapp**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
