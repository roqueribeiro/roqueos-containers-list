# Integrações

*Tradução de [INTEGRATIONS.md](../INTEGRATIONS.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

> **Para quem:** quem escreve um leitor deste catálogo (o servidor do RoqueOS, um painel compatível com o CasaOS, um script), ou muda um campo de que um leitor depende.
> **O que tem aqui:** os caminhos pelos quais outro sistema chega ao catálogo, o que o servidor do RoqueOS lê de cada manifesto, e a ordem em que uma mudança de contrato sai.
> **Onde ir para o resto:** cada campo do manifesto na [REFERENCIA.md](REFERENCIA.md); como as peças se encaixam na [ARQUITETURA.md](ARQUITETURA.md); o caminho de um merge no [COMO-CHEGA.md](COMO-CHEGA.md).

Este repositório não tem API, nem CLI para uso de fora, nem webhook. A superfície dele são os próprios arquivos, servidos pelo GitHub.

## Sumário

1. [Os caminhos de entrada](#1-os-caminhos-de-entrada)
2. [O que o servidor do RoqueOS lê](#2-o-que-o-servidor-do-roqueos-lê)
3. [Clientes compatíveis com o CasaOS](#3-clientes-compatíveis-com-o-casaos)
4. [Mudar o contrato](#4-mudar-o-contrato)

## 1. Os caminhos de entrada

| Superfície | Endereço | Quem usa | Atualização |
| --- | --- | --- | --- |
| API de conteúdo do GitHub, lista de pastas | `https://api.github.com/repos/roqueribeiro/roqueos-containers-list/contents/Apps` | a loja padrão do `roqueos-server` | o cache do servidor, 24 horas |
| Compose cru de um app | `https://raw.githubusercontent.com/roqueribeiro/roqueos-containers-list/main/Apps/<App>/docker-compose.yml` | o `roqueos-server`, depois da lista de pastas | idem |
| Arquivo da `main` | `https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip` | painéis compatíveis com o CasaOS; o `roqueos-server` também, para uma loja cuja URL termina em `.zip` | a atualização do próprio leitor |
| Arquivo de release | o `appstore.zip` anexado a uma release `vX.Y.Z` | um painel fixado numa release | congelado; ainda não existe release semver ([COMO-CHEGA.md](COMO-CHEGA.md)) |
| Ícone | `x-casaos.icon`, por convenção `https://cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main/Apps/<App>/icon.png` | a tela da loja | o cache do CDN; não medido aqui |

O arquivo de release leva `Apps/`, `category-list.json`, `recommend-list.json` e `featured-apps.json` ([`.github/workflows/build-appstore.yml`](../../.github/workflows/build-appstore.yml)).

## 2. O que o servidor do RoqueOS lê

Lido em 18/11/2026 no `roqueos-server` 1.39.0, `src/modules/catalog/catalog.service.ts`. O servidor é outro repositório; esta tabela o descreve como estava naquele dia, e o código do servidor vale se os dois divergirem.

| Do manifesto | O que o servidor faz com isso | Quando falta ou está errado |
| --- | --- | --- |
| `x-casaos.main` | escolhe o serviço principal | cai no primeiro serviço e registra um aviso quando há mais de um |
| `image` do serviço principal | obrigatório | o app é pulado |
| `x-casaos.title.en_us` | o nome do app | o nome da pasta |
| `x-casaos.description.en_us` | a descrição | `<App> Docker application` |
| `x-casaos.tagline`, `x-casaos.description` (todos os idiomas) | guardados para a tela da loja | |
| `x-casaos.category` | mapeada para os ids da loja pelo `CATEGORY_MAP` | `other`, em silêncio |
| `ports` do serviço principal, com o `x-casaos.ports[].description` do serviço | a lista de portas da ficha | |
| `x-casaos.port_map` | a porta que a loja abre, só se uma porta publicada no host bater | ignorada, com aviso |
| `x-casaos.scheme` | `https` se disser isso, senão `http` | `http` |
| `x-casaos.architectures` | guardado como declarado | |
| `x-casaos.icon` | o ícone | `Apps/<App>/icon.png` em `raw.githubusercontent.com` |
| `x-casaos.developer` | o link do site | |
| `x-roqueos.mountShared` | monta a pasta compartilhada só quando é exatamente `true` | não monta |
| o texto inteiro do compose | guardado, e usado na instalação | |

As chaves de idioma passam pelo `normalizeLocaleMap` do servidor, mas o catálogo escreve `en_us` e `pt_br` em minúsculas mesmo assim, porque a P7 exige essa grafia ([CRITERIOS-DE-TESTE.md](CRITERIOS-DE-TESTE.md)). As categorias que o servidor mapeia estão na [REFERENCIA.md](REFERENCIA.md#x-casaos-nível-de-cima).

## 3. Clientes compatíveis com o CasaOS

Os manifestos ficam no namespace `x-casaos` para um cliente CasaOS ler como estão. O que ele não recebe:

| Extensão do RoqueOS | Efeito num cliente CasaOS |
| --- | --- |
| `x-roqueos.gerar` | nenhum segredo é gerado: as variáveis `${NOME}` chegam vazias e precisam ser preenchidas à mão |
| `x-roqueos.mountShared` | sem bind de `/shared` |
| `x-roqueos.senhaPadraoDaImagem` | não aparece; a ficha em `Apps/<App>/README.md` continua dizendo |

Como cada versão do CasaOS se comporta com essas extensões não foi testado aqui.

## 4. Mudar o contrato

Um campo que o servidor publicado não entende chega aos usuários no momento em que entra na `main`. Uma mudança que renomeia, remove ou acrescenta um campo, ou muda um enum, sai nesta ordem ([COMO-CHEGA.md](COMO-CHEGA.md#uma-mudança-que-atravessa-repositórios)):

1. **`roqueos-server`** aprende o campo, é mergeado e tem a imagem publicada.
2. **`roqueos-front`** mostra o campo, e é implantado.
3. **Só então** o catálogo usa o campo na `main`.

O schema em [`schema/casaos-app.schema.json`](../../schema/casaos-app.schema.json) muda no mesmo pull request do primeiro manifesto que usa o campo, com uma entrada no [CHANGELOG.md](../../CHANGELOG.md) (em inglês) e o incremento de versão da política de lá (MINOR para campo novo, MAJOR para campo renomeado ou removido).
