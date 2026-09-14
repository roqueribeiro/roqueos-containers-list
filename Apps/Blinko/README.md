# Blinko

> O Blinko é um projeto de notas em cartões alimentado por IA. Foi concebido para indivíduos que desejam capturar e organizar rapidamente os seus pensamentos fugazes. O Blinko permite aos utilizadores anotar ideias sem esforço no momento em que surgem, garantindo que nenhuma centelha de criatividade se perde.

## O que é

Blinko é uma plataforma open-source de gestão de conhecimento pessoal e gravação de informações, focada em proporcionar aos utilizadores uma experiência leve, eficiente e escalável de tomada de notas e organização de conhecimento. Através de design modular e stack tecnológico moderno, permite aos utilizadores capturar rapidamente ideias, organizar conhecimento e construir o seu próprio sistema de informação.

O projeto enfatiza simplicidade e personalização, suportando combinações flexíveis de vários tipos de conteúdo (texto, tags, links, etc.), enquanto o seu design estruturado claro ajuda os utilizadores a alcançar recuperação e associação eficientes em grandes quantidades de informação. Blinko também fornece excelente extensibilidade, facilitando o desenvolvimento personalizado e melhoria de funcionalidades pelos programadores de acordo com as suas necessidades.

Na utilização prática, Blinko equilibra usabilidade e funcionalidade, oferecendo uma experiência fluida tanto para notas diárias, acumulação de conhecimento como gestão de documentação de projetos – uma ferramenta de conhecimento ideal para crescimento pessoal a longo prazo.

**Funcionalidades principais:**

- Sistema de notas leve para gravação e edição rápida de conteúdo
- Tags e organização estruturada para melhorar a eficiência de pesquisa de informação
- Suporte para múltiplos tipos de conteúdo (texto, links, etc.)
- Arquitetura extensível para funcionalidade personalizada e desenvolvimento de plugins
- Design de interface limpo focado no conteúdo

**Saiba mais:**

- [Blinko GitHub](https://github.com/blinkospace/blinko)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                  | Serviço |
| ---- | --------- | --------- | --------------------------------------------------------------- | ------- |
| 1111 | 1111      | tcp       | Principal porta da interface web para acesso à aplicação Blinko | blinko  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                            | No container             | Serviço         |
| ---------------------------------- | ------------------------ | --------------- |
| /DATA/AppData/$AppID/blinko_data   | /app/.blinko             | blinko          |
| /DATA/AppData/$AppID/postgres_data | /var/lib/postgresql/data | blinko-postgres |

## Variáveis de ambiente

| Variável             | Valor padrão                                                 | Serviço         |
| -------------------- | ------------------------------------------------------------ | --------------- |
| NODE_ENV             | production                                                   | blinko          |
| NEXTAUTH_URL         | http://localhost:1111                                        | blinko          |
| NEXT_PUBLIC_BASE_URL | http://localhost:1111                                        | blinko          |
| NEXTAUTH_SECRET      | 22PhaGVvvBTEC5E5G+U+5O1xqdmuzZKzjLeDMvdvB7I=                 | blinko          |
| DATABASE_URL         | postgresql://postgres:JWD9bxUR7Um9PaGg7FQZ@blinko-postgres:5 | blinko          |
| POSTGRES_DB          | postgres                                                     | blinko-postgres |
| POSTGRES_USER        | postgres                                                     | blinko-postgres |
| POSTGRES_PASSWORD    | JWD9bxUR7Um9PaGg7FQZ                                         | blinko-postgres |
| TZ                   | $TZ                                                          | blinko-postgres |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1111/`.

## Imagens

| Serviço         | Imagem                   |
| --------------- | ------------------------ |
| blinko          | blinkospace/blinko:1.8.7 |
| blinko-postgres | postgres:14              |

## Fonte oficial

Projeto original: **blinkospace**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
