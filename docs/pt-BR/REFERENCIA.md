# Referência

*Tradução de [REFERENCE.md](../REFERENCE.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

O contrato de um manifesto, os comandos do repositório e os workflows. A fonte de verdade do manifesto é o [`schema/casaos-app.schema.json`](../../schema/casaos-app.schema.json); esta página explica o que ele diz.

## O manifesto

### `x-casaos` (nível de cima)

| Campo | Obrigatório | Significado |
| --- | --- | --- |
| `main` | sim (schema) | o serviço que a loja abre e apresenta como o app |
| `architectures` | sim | as plataformas que a imagem publica (`amd64`, `arm64`, `arm`, `386`, `ppc64le`, `s390x`, `mips64le`, `riscv64`) |
| `category` | sim | uma das categorias da loja abaixo |
| `scheme` | sim | `http` ou `https` da porta que a loja abre |
| `port_map` | com mais de uma porta publicada (não é cobrado com rede do host) | a porta do host que a loja abre |
| `title`, `tagline`, `description` | `en_us` e `pt_br` | o texto da ficha da loja, chaves em minúsculas |
| `icon` | por convenção (a P8 confere o arquivo, não o campo) | URL de `Apps/<App>/icon.png` pela CDN |
| `developer`, `author` | por convenção | o mantenedor do projeto original, e `RoqueOS Team` |
| `tips.before_install` | quando há algo para saber | primeiro acesso, o que configurar, o que é gerado |
| `index` | não | o caminho a abrir, `/` por padrão |

**Categorias da loja** (as que o servidor do RoqueOS mapeia; qualquer outra cai em "other"): AI, Communication, Developer, Development, Finance, Gaming, Home Automation, HomeAutomation, Media, Network, Productivity, Security, Storage, Utilities.

### `x-casaos` (por serviço)

`ports`, `volumes` e `envs`, cada um uma lista de `container` mais uma `description` em `en_us` e `pt_br`. Eles alimentam a ficha da loja e o README gerado.

### `x-roqueos`

Extensões do RoqueOS. Os clientes CasaOS ignoram.

| Campo | Formato | Significado |
| --- | --- | --- |
| `gerar` | mapa de `NAME` para `{ formato, tamanho?, mostrar?, descricao? }` | segredos que o servidor gera em cada instalação; o manifesto usa `${NAME}` |
| `gerar.*.formato` | `hex`, `base64`, `senha`, `uuid`, `laravel` | como o valor é gerado |
| `gerar.*.tamanho` | inteiro de 8 a 128 | tamanho: dígitos hex, bytes de base64 ou caracteres da senha |
| `gerar.*.mostrar` | booleano | mostrar o valor para a pessoa uma vez, depois da instalação (uma senha de login) |
| `gerar.*.descricao` | `en_us`, `pt_br` | o rótulo que aparece ao lado do valor |
| `senhaPadraoDaImagem` | texto, no mínimo 20 caracteres | o login que vem com a imagem e o que fazer com ele; aparece na ficha da loja |
| `mountShared` | booleano | monta a pasta compartilhada do RoqueOS em `/shared` (servidores de mídia, downloaders, gerenciadores de arquivos) |
| `motivo` | `privileged`, `networkHost`, `capAdd`, `volumeHost`: texto | por que o app precisa de acesso elevado; exigido pela P5 |
| `portaCompartilhada` | booleano | sabe-se que a porta do host colide com outro app |

### Variáveis de sistema

O instalador substitui estas em todo manifesto; qualquer outra tem que vir de `x-roqueos.gerar`.

| Variável | Valor num servidor RoqueOS |
| --- | --- |
| `$AppID` | o identificador do app na loja, usado em `/DATA/AppData/$AppID/` |
| `$PUID`, `$PGID` | o `PUID` e o `PGID` do servidor, `1000` por padrão |
| `$TZ` | o `TZ` do servidor, `America/Sao_Paulo` por padrão |

`$$` é o escape do compose para um `$` literal e fica como está.

## Comandos

**Só Yarn.** Nada de `npm`, nada de `npx`, nada de `package-lock.json`.

| Comando | O que faz |
| --- | --- |
| `yarn validate` | schema e invariantes entre campos de todo manifesto (gate de CI) |
| `yarn revisao` | as dez premissas, app a app (gate de CI) |
| `yarn revisao:app <App>` | o veredito de um app, com os motivos |
| `yarn revisao:pendentes` | os apps com premissa aberta, um por linha |
| `yarn boot <App> [...]` | sobe apps de verdade e checa (só Linux) |
| `yarn boot:todos` | sobe o catálogo inteiro (horas) |
| `yarn readme --app <App>` | gera de novo a ficha de um app a partir do manifesto |
| `yarn docs:quality` | gera de novo o [QUALIDADE.md](QUALIDADE.md) e o par em inglês |
| `yarn docs:check` | checa a documentação: números contra o disco, links, pares de idioma, nenhum travessão (gate de CI) |
| `yarn test` | Vitest sobre as ferramentas |
| `yarn uid` / `yarn uid:atualiza` | lê ou atualiza o usuário com que cada imagem roda, usado pela P10 |
| `yarn enrichment` | relatório de traduções faltando em outros idiomas (informativo) |
| `yarn fix:dry` / `yarn fix` | prévia ou aplicação de consertos mecânicos |
| `yarn rebrand:dry` / `yarn rebrand` | prévia ou aplicação da varredura CasaOS para RoqueOS ao importar apps do projeto original |

O `yarn audit` **não** roda o relatório de enriquecimento: o Yarn tem um comando `audit` próprio, e ele ganha. Use `yarn enrichment`.

## Workflows

| Workflow | Quando | O quê |
| --- | --- | --- |
| `Validate Manifests` | pull request e push para a `main` que mexem em manifestos, schema ou scripts de revisão | `yarn validate` e `yarn revisao` |
| `Test` | todo pull request e push para a `main` | `yarn test` com cobertura, e `yarn docs:check` |
| `Boot` | pull request que mexe num manifesto, manual, semanal | o teste de boot dos apps mexidos, de uma lista, ou de todos |
| `Build AppStore` | push para a `main`, pull request, tags `vX.Y.Z` e `vX.Y.Z-*` | monta o `appstore.zip`; numa tag, publica como release |
| `roqueos` | push para a `main` e pull request | o gate compartilhado dos repositórios RoqueOS |

## Arquivos na raiz

| Arquivo | Significado |
| --- | --- |
| `category-list.json` | as categorias e os ícones delas |
| `featured-apps.json` | apps em destaque na home da loja |
| `recommend-list.json` | apps recomendados no primeiro uso |
| `scripts/dados/uid-imagens.json` | o usuário com que cada imagem roda, lido pela P10 |
