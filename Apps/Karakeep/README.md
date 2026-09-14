# Karakeep

> A aplicação para guardar tudo

## O que é

O Karakeep é um gestor de marcadores open-source e auto-hospedado para ligações, notas, imagens, PDFs e destaques, criado para reunir num só lugar tudo o que quer guardar.
Obtém automaticamente títulos, descrições e pré-visualizações e depois ajuda a organizar a biblioteca com etiquetagem por IA, pesquisa em texto completo, listas e automação baseada em regras.
Com extensões de navegador, aplicações móveis, ingestão RSS e arquivamento de páginas, o Karakeep funciona bem tanto como ferramenta de leitura posterior como arquivo pessoal duradouro de conteúdos.

**Principais Funcionalidades:**
- Guarda ligações, notas, imagens, PDFs e destaques de texto numa única biblioteca
- Obtém automaticamente títulos, descrições, imagens e páginas arquivadas para leitura posterior
- Usa etiquetagem por IA, resumos, OCR e pesquisa em texto completo para reencontrar conteúdos rapidamente
- Organiza conteúdos com etiquetas, listas colaborativas, feeds RSS e fluxos de trabalho baseados em regras
- Dá acesso à coleção através da aplicação web, aplicações móveis, extensões de navegador, API REST e CLI

**Saiba Mais:**
- [Site Oficial Karakeep](https://karakeep.app/)
- [Karakeep GitHub](https://github.com/karakeep-app/karakeep)
- [Documentação do Karakeep](https://docs.karakeep.app/)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve      | Serviço  |
| ----- | --------- | --------- | ------------------- | -------- |
| 14592 | 3000      | tcp       | Porta HTTP da WebUI | karakeep |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                          | No container | Serviço              |
| -------------------------------- | ------------ | -------------------- |
| /DATA/AppData/$AppID/data        | /data        | karakeep             |
| /DATA/AppData/$AppID/meilisearch | /meili_data  | karakeep-meilisearch |

## Variáveis de ambiente

| Variável           | Valor padrão                        | Serviço              |
| ------------------ | ----------------------------------- | -------------------- |
| MEILI_ADDR         | http://karakeep-meilisearch:7700    | karakeep             |
| BROWSER_WEB_URL    | http://karakeep-chrome:9222         | karakeep             |
| DATA_DIR           | /data                               | karakeep             |
| NEXTAUTH_URL       | http://localhost:14592              | karakeep             |
| NEXTAUTH_SECRET    | change_this_to_a_long_random_string | karakeep             |
| MEILI_MASTER_KEY   | change_this_to_a_long_random_string | karakeep             |
| OPENAI_API_KEY     | —                                   | karakeep             |
| MEILI_MASTER_KEY   | change_this_to_a_long_random_string | karakeep-meilisearch |
| MEILI_NO_ANALYTICS | true                                | karakeep-meilisearch |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:14592/`.

- Defina `NEXTAUTH_URL` para o endereço que vai usar para aceder ao Karakeep.
- Use cadeias aleatórias longas para `NEXTAUTH_SECRET` e `MEILI_MASTER_KEY`, e mantenha o mesmo `MEILI_MASTER_KEY` em `karakeep` e `meilisearch`.
- O primeiro utilizador a registar-se na sua instância torna-se administrador.

## Imagens

| Serviço              | Imagem                                       |
| -------------------- | -------------------------------------------- |
| karakeep             | ghcr.io/karakeep-app/karakeep:0.33.2         |
| karakeep-chrome      | ghcr.io/karakeep-app/karakeep-chrome:release |
| karakeep-meilisearch | getmeili/meilisearch:v1.41.0                 |

## Fonte oficial

Projeto original: **karakeep-app**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
