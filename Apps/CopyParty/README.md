# CopyParty

> Um servidor de ficheiros simples e privado.

## O que é

**CopyParty** é um servidor de partilha de ficheiros rápido e focado na privacidade, utilizando uma arquitetura de ficheiro único, "local-first", garantindo controlo total sobre os dados sem dependências da cloud. A sua interface intuitiva suporta o uso offline, com compatibilidade multiplataforma e acesso multi-protocolo, proporcionando uma experiência de gestão de ficheiros segura e eficiente, ideal para utilizadores que procuram propriedade direta dos dados e uma solução leve.

As principais funcionalidades da aplicação incluem uploads acelerados e retomáveis (via protocolo up2k), garantindo transferências fiáveis de ficheiros grandes, e deduplicação automática para otimizar o armazenamento. Ajuda os utilizadores a organizar pastas e multimédia sem esforço, com um gestor de ficheiros baseado na web que inclui um indexador de multimédia integrado e um gerador de miniaturas para pré-visualizações rápidas. Os controlos de permissões granulares permitem regras de acesso de utilizador específicas. A funcionalidade "upload-while-downloading" (carregar enquanto descarrega) melhora a eficiência da partilha, e o design de zero dependências garante que funciona em quase qualquer hardware.

Integra múltiplos protocolos de acesso, incluindo HTTP, WebDAV, FTP e TFTP, suportando ligações de navegadores web padrão, clientes de ficheiros dedicados e hardware legado (como PSP). A aplicação suporta Docker e Python para implementação, simplificando a configuração em vários ambientes de servidor. Facilita o acesso contínuo a ficheiros locais sem configuração complexa. A documentação da comunidade melhora a usabilidade, e a operação simples e alta flexibilidade da aplicação oferecem uma solução moderna de serviço de ficheiros locais.

**Funcionalidades Chave:**
- Partilha de ficheiros local focada na privacidade
- Arquitetura de ficheiro único com zero dependências
- Uploads acelerados e retomáveis
- Suporte multi-protocolo (HTTP, WebDAV, FTP, etc.)
- Compatibilidade multiplataforma
- Indexação e streaming de multimédia
- Deduplicação inteligente
- Gestão de permissões de utilizador

**Saber Mais:**
- [CopyParty GitHub Repository](https://github.com/9001/copyparty)


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve                                               | Serviço   |
| ----- | --------- | --------- | ------------------------------------------------------------ | --------- |
| 29708 | 3923      | tcp       | Porta da interface Web para aceder ao servidor de ficheiros. | copyparty |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                    | No container | Serviço   |
| -------------------------- | ------------ | --------- |
| /DATA/AppData/$AppID/w     | /w           | copyparty |
| /DATA/AppData/$AppID/confg | /cfg         | copyparty |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:29708/`.

- ## Conta Padrão
- - Nome de utilizador: casaos
- - Palavra-passe: casaos
- ## Modificar Nome de Utilizador e Palavra-passe
- Para modificar o nome de utilizador e a palavra-passe predefinidos, pode configurá-lo mapeando o caminho `/cfg/` e adicionando um ficheiro de configuração `copyparty.conf` nesse diretório.
- Para a configuração específica, consulte: [example](https://github.com/9001/copyparty/blob/hovudstraum/docs/example.conf)

## Imagens

| Serviço   | Imagem                         |
| --------- | ------------------------------ |
| copyparty | icewhaletech/copyparty:1.20.13 |

## Fonte oficial

Projeto original: **CopyParty**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
