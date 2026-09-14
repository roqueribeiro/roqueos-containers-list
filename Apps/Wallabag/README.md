# Wallabag

> Guarde e classifique artigos. Leia-os mais tarde. Livremente.

## O que é

Wallabag é uma aplicação de poupança de páginas web que permite aos utilizadores guardar artigos para leitura offline, extraindo conteúdo para uma experiência livre de distrações. A sua interface web intuitiva permite guardar artigos com um clique, assegurando que os utilizadores podem lê-los quando for conveniente.

As funcionalidades principais da aplicação incluem poupança conveniente de páginas web, leitura optimizada e organização flexível de conteúdo. Extrai apenas o conteúdo do artigo, removendo pop-ups e anúncios, e exibe-o numa visualização limpa e confortável. Os utilizadores podem organizar artigos guardados com etiquetas e regras de etiquetagem automática, criando uma biblioteca de conteúdo personalizada acessível sob demanda. As extensões do navegador permitem poupança rápida, compatível com Chrome, Firefox, Opera e mais. Os clientes multiplataforma cobrem Android, iOS e outros dispositivos, assegurando uma experiência de leitura perfeita. Também suporta colaboração multi-utilizador para partilha de artigos guardados.

Permite importar dados de serviços como Pocket, Readability, Instapaper ou Pinboard, simplificando a migração da biblioteca de conteúdo. A geração RSS permite aos utilizadores aceder a artigos guardados em leitores RSS. A documentação da comunidade melhora a usabilidade, e a alta flexibilidade e funcionamento intuitivo da aplicação entregam uma solução moderna de gestão de conteúdo web.

**Funcionalidades Principais:**
- Guardar páginas web para leitura offline
- Extrair conteúdo puro para uma visualização de leitura livre de distrações
- Classificação de artigos com regras de etiquetagem automática para uma biblioteca de conteúdo personalizada
- Extensões do navegador para poupança rápida de páginas web
- Clientes multiplataforma (Android, iOS, Chrome, Firefox, Opera)
- Colaboração multi-utilizador para partilha de artigos guardados
- Importar dados do Pocket, Readability, Instapaper, Pinboard e outros serviços
- Geração RSS para acesso a artigos guardados em leitores

**Saiba Mais:**
- [Website Oficial Wallabag](https://wallabag.org)
- [Repositório GitHub Wallabag](https://github.com/wallabag/wallabag)
- [Documentação Wallabag](https://doc.wallabag.org)
- [Imagem Docker Wallabag](https://hub.docker.com/r/wallabag/wallabag)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host  | Container | Protocolo | Para que serve         | Serviço  |
| ----- | --------- | --------- | ---------------------- | -------- |
| 25661 | 80        | tcp       | Porta HTTP do Wallabag | wallabag |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container                        | Serviço  |
| --------------------------- | ----------------------------------- | -------- |
| /DATA/AppData/$AppID/images | /var/www/wallabag/web/assets/images | wallabag |

## Variáveis de ambiente

| Variável                  | Valor padrão      | Serviço  |
| ------------------------- | ----------------- | -------- |
| SYMFONY__ENV__DOMAIN_NAME | http://<IP>:25661 | wallabag |
| SYMFONY__ENV__SERVER_NAME | Wallabag          | wallabag |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:25661/`.

- Precisa de definir a variável de ambiente `SYMFONY__ENV__DOMAIN_NAME` para o seu nome de domínio ou endereço IP, que pode ser modificado através da página de configurações do Wallabag.
- **Conta Predefinida**
- | Nome de Utilizador | Palavra-passe |
- |-------------------|---------------|
- | `wallabag`        | `wallabag`    |

## Imagens

| Serviço  | Imagem                   |
| -------- | ------------------------ |
| wallabag | wallabag/wallabag:2.6.13 |

## Fonte oficial

Projeto original: **wallabag**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
