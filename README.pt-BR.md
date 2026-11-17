<p align="center">
  <a href="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/validate-schema.yml"><img alt="Validate Manifests" src="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/validate-schema.yml/badge.svg"></a>
  <a href="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/test.yml"><img alt="Test" src="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/test.yml/badge.svg"></a>
  <a href="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/boot.yml"><img alt="Boot" src="https://github.com/roqueribeiro/roqueos-containers-list/actions/workflows/boot.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-007aff"></a>
  <a href="docs/pt-BR/QUALIDADE.md"><img alt="220 apps" src="https://img.shields.io/badge/apps-220-007aff"></a>
  <img alt="amd64 e arm64" src="https://img.shields.io/badge/arch-amd64%20%C2%B7%20arm64-5856d6">
  <a href="#estado-do-projeto"><img alt="Estado: curado" src="https://img.shields.io/badge/status-curated-34c759"></a>
</p>

<p align="center">
  <a href="docs/pt-BR/COMECAR.md"><b>Começar</b></a> ·
  <a href="docs/pt-BR/ADICIONAR-UM-APP.md"><b>Adicionar um app</b></a> ·
  <a href="docs/pt-BR/QUALIDADE.md">Qualidade da loja</a> ·
  <a href="docs/pt-BR/INDEX.md">Documentação</a> ·
  <a href="docs/pt-BR/REFERENCIA.md">Referência</a> ·
  <a href="README.md">English</a>
</p>

---

> [!TIP]
> **Chegou agora?** O [COMECAR.md](docs/pt-BR/COMECAR.md) mostra como instalar um app pela App Store do RoqueOS, como usar este catálogo em qualquer painel compatível com o CasaOS e como rodar as checagens na sua própria máquina.

**O RoqueOS Containers List é o catálogo curado de apps self-hosted por trás da App Store do RoqueOS: 220 apps, cada um um manifesto Docker Compose que precisa passar por dez premissas estáticas antes de chegar ao servidor de alguém, e que sobe de verdade num runner Linux, e tem de responder na porta que a ficha da loja promete, sempre que um pull request mexe nele.** É só dado e ferramenta: os manifestos ficam em [`Apps/`](Apps/), e os scripts Node em [`scripts/`](scripts/) validam, revisam, sobem e documentam cada um.

> [!NOTE]
> **A loja lê a branch `main`.** Um pull request mergeado aparece na App Store do RoqueOS dentro do cache de 24 horas do catálogo no servidor, então a `main` segue o mesmo padrão de uma release. O estado de cada app é gerado a partir deste repositório em [docs/pt-BR/QUALIDADE.md](docs/pt-BR/QUALIDADE.md), e o gate de documentação reprova quando essa página está desatualizada ou quando a contagem de apps do README discorda de `Apps/`.

## Sumário

- [Começar](#começar)
- [Por que existe](#por-que-existe)
- [Como um app entra na loja](#como-um-app-entra-na-loja)
- [O que mantém tudo honesto](#o-que-mantém-tudo-honesto)
- [Segredo é gerado, nunca escrito](#segredo-é-gerado-nunca-escrito)
- [Quando um app sai](#quando-um-app-sai)
- [Estado do projeto](#estado-do-projeto)
- [Limites conhecidos](#limites-conhecidos)
- [Documentação](#documentação)
- [Contribuição, segurança e licença](#contribuição-segurança-e-licença)
- [Idiomas](#idiomas)

## Começar

**No RoqueOS**, abra a App Store: este catálogo é a loja padrão dela. Escolha um app, aperte **Install**, e o servidor sobe todos os serviços do manifesto (o app, o banco, o cache), com as pastas em `/DATA/AppData/<app>` e os segredos gerados para o seu servidor. Quando o app precisa de senha de login, ela aparece uma vez só, logo depois da instalação.

**Num painel compatível com o CasaOS**, adicione este catálogo como loja de apps com o arquivo da `main`:

```text
https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip
```

Os manifestos usam o namespace `x-casaos`, então os clientes CasaOS leem tudo como está e ignoram as extensões do RoqueOS em `x-roqueos`.

**Para trabalhar no catálogo**, com Node 24 e Yarn:

```bash
yarn install
yarn validate && yarn revisao && yarn test
```

O caminho completo, incluindo o teste de boot que só roda em Linux, está no [COMECAR.md](docs/pt-BR/COMECAR.md).

## Por que existe

Numa loja curada, um app quebrado é pior que um app que falta. Quem instala confia na loja, e um app que reinicia para sempre, escreve na pasta errada ou vem com uma senha que todo mundo conhece causa estrago numa máquina que é de outra pessoa.

O catálogo começou como uma importação grande de manifestos da comunidade. Na medição de 17/11/2026, ele trazia apps cujo projeto original tinha sido arquivado, imagens que não existiam mais, dispositivos que só existem num Raspberry Pi e chaves de sessão escritas no repositório público. Todos eles passavam na checagem de schema. A regra desde então:

> **Um app está na loja porque alguma coisa provou que ele funciona, não porque nada provou que ele está quebrado.**

## Como um app entra na loja

| Etapa | O que acontece | Onde |
| --- | --- | --- |
| **Manifesto** | Um `docker-compose.yml` com metadados `x-casaos`, um `icon.png` e um `README.md` gerado a partir do manifesto | `Apps/<App>/` |
| **Schema** | JSON Schema Draft-07 mais invariantes entre campos: imagem fixada, serviço `main` real, `port_map` batendo com uma porta publicada, categoria canônica | `yarn validate` |
| **Dez premissas** | Compatibilidade, portas, segredos, configuração, privilégio, README, texto em inglês e em português do Brasil, ícone, coerência, permissão de escrita na pasta de dados | `yarn revisao` |
| **Boot no Linux** | O compose sobe num runner Linux do GitHub, nenhum serviço reinicia, e a porta que a ficha da loja promete responde | workflow `Boot` |
| **Revisão** | Um mantenedor lê o diff; o arquivo CODEOWNERS diz quem | pull request |
| **Loja** | Mergeado na `main`, é o que o servidor do RoqueOS entrega | [COMO-CHEGA.md](docs/pt-BR/COMO-CHEGA.md) |

O passo a passo para um app novo, com um manifesto de exemplo e o checklist que o pull request pede, está no [ADICIONAR-UM-APP.md](docs/pt-BR/ADICIONAR-UM-APP.md).

## O que mantém tudo honesto

O `yarn validate` prova que um arquivo é um compose. O `yarn revisao` prova que o app está pronto para uma loja, uma premissa de cada vez, e grava a evidência de cada app em `.revisao/<App>.json`. Os dois são gates de CI em todo pull request que mexe num manifesto, no schema ou nos scripts de revisão.

| Situação | O que o gate faz |
| --- | --- |
| Uma senha, um JWT ou uma chave de sessão escrita no manifesto | **reprova**: segredo tem que vir de `x-roqueos.gerar` |
| Um placeholder que ninguém troca (`change-me`, `[YOUR_IP]`) | **reprova** |
| Uma variável que não é de sistema nem gerada | **reprova**: ela chegaria vazia |
| Uma imagem cujo usuário fixo não consegue escrever na pasta que o instalador cria | **reprova**: o app reiniciaria para sempre |
| `privileged`, rede do host ou capabilities extras sem um motivo escrito | **reprova** |
| Uma dica da loja que ensina uma senha padrão sem declará-la | **reprova** |
| A imagem sobe, mas a porta prometida não responde | **reprova** no teste de boot |
| Um serviço reinicia, ou um seed sai com erro | **reprova** no teste de boot |
| O laboratório não consegue testar (sem GPU no runner) | aparece como **inconclusivo**, nunca como aprovado |

O que cada premissa checa, como, e o que ainda não tem cobertura automática está no [CRITERIOS-DE-TESTE.md](docs/pt-BR/CRITERIOS-DE-TESTE.md).

## Segredo é gerado, nunca escrito

Este repositório é público, então uma senha num manifesto é a mesma senha em todo servidor que instala o app. Por isso os manifestos declaram os segredos em vez de escrevê-los:

```yaml
services:
  app:
    environment:
      DB_PASSWORD: ${DB_PASSWORD}
x-roqueos:
  gerar:
    DB_PASSWORD:
      formato: senha
      tamanho: 24
```

O servidor do RoqueOS gera cada valor na instalação, guarda esse valor para aquele servidor, para que uma reinstalação sobre os dados mantidos continue entrando, e mostra uma vez só, logo depois de instalar, os que estão marcados com `mostrar: true`. Quando uma imagem vem com um login próprio que nenhuma variável consegue mudar, o manifesto diz isso em `x-roqueos.senhaPadraoDaImagem`, e a ficha do app na loja mostra. O contrato completo está no [REFERENCIA.md](docs/pt-BR/REFERENCIA.md).

## Quando um app sai

Um app sai da loja quando o projeto original é arquivado, a imagem para de ser publicada ou ele não faz mais o que a ficha promete. Sair não mexe em quem já instalou: o container continua rodando. Cada saída fica registrada com a data, o motivo, a evidência e o que instalar no lugar, no [APOSENTADOS.md](docs/pt-BR/APOSENTADOS.md). Apps que estão vivos no projeto original, mas ainda não instalam com um clique, também estão listados lá, com a condição para voltar.

## Estado do projeto

| Item | Estado | Como foi medido |
| --- | --- | --- |
| Schema de todos os manifestos | 220 de 220 passam | `yarn validate`, CI em todo pull request |
| As dez premissas | todos os apps fechados | `yarn revisao`, CI em todo pull request |
| Testes unitários das ferramentas | verde | `yarn test` (Vitest), CI em todo pull request e push para a `main` |
| Boot no Linux | por app, com execução e data | [docs/pt-BR/QUALIDADE.md](docs/pt-BR/QUALIDADE.md), a partir de [`docs/evidence/boot.json`](docs/evidence/boot.json) |
| Instalação pelo servidor do RoqueOS | o compose inteiro como uma stack só, segredos gerados | `roqueos-server` 1.38.0, instalado num daemon Docker Linux em 17/11/2026 |
| Documentação | números, links e pares de idioma checados | `yarn docs:check`, CI em todo pull request |

## Limites conhecidos

- **O boot semanal não termina.** Ele roda todos os apps em sequência e o job para em 90 minutos, então a maioria dos apps só é provada quando um pull request mexe neles. O [QUALIDADE.md](docs/pt-BR/QUALIDADE.md) lista quais apps têm boot registrado e quais ainda não têm.
- **O laboratório roda `docker compose up`, não o instalador do RoqueOS.** O instalador foi provado à parte, mas o teste de boot não passa por ele.
- **Só amd64 sobe no boot.** O arm64 é o que o manifesto declara: nenhuma checagem compara isso com as plataformas que a imagem publica, e nada sobe o app num runner ARM.
- **Sem teste de atualização.** Uma versão nova da imagem sobe do zero, não por cima dos dados da anterior.
- **Alguns apps precisam do endereço do servidor e usam `localhost` por enquanto** (Baserow, Healthchecks, Rallly): eles abrem no próprio servidor até o instalador oferecer essa variável.
- **O teste de boot se recusa a rodar no macOS**, porque o Docker Desktop esconde justamente as falhas de permissão que ele existe para pegar.

## Documentação

Tudo começa no [docs/pt-BR/INDEX.md](docs/pt-BR/INDEX.md). Todo documento existe em inglês e em português do Brasil.

| Eu quero... | Leia |
| --- | --- |
| Instalar um app, ou usar o catálogo em outro painel | [COMECAR.md](docs/pt-BR/COMECAR.md) |
| Adicionar um app ou consertar um | [ADICIONAR-UM-APP.md](docs/pt-BR/ADICIONAR-UM-APP.md) e [CONTRIBUTING.md](docs/pt-BR/CONTRIBUTING.md) |
| Saber o que está provado e como | [CRITERIOS-DE-TESTE.md](docs/pt-BR/CRITERIOS-DE-TESTE.md) |
| Ver o estado de cada app | [QUALIDADE.md](docs/pt-BR/QUALIDADE.md) |
| Consultar um campo do manifesto, um comando ou um workflow | [REFERENCIA.md](docs/pt-BR/REFERENCIA.md) |
| Entender como uma mudança chega à loja | [COMO-CHEGA.md](docs/pt-BR/COMO-CHEGA.md) |
| Consertar um app que não sobe | [QUANDO-QUEBRA.md](docs/pt-BR/QUANDO-QUEBRA.md) |
| Saber por que um app saiu | [APOSENTADOS.md](docs/pt-BR/APOSENTADOS.md) |
| Achar um termo | [GLOSSARIO.md](docs/pt-BR/GLOSSARIO.md) |

## Contribuição, segurança e licença

Issue e pull request são bem-vindos: leia antes o [CONTRIBUTING.md](docs/pt-BR/CONTRIBUTING.md) e o [Código de Conduta](CODE_OF_CONDUCT.md) (em inglês). Uma imagem maliciosa, um padrão exposto ou um segredo vazado vai pelo canal privado do [SECURITY.md](SECURITY.md) (em inglês), nunca por issue pública.

Os manifestos e as ferramentas estão sob a [Licença MIT](LICENSE). Cada app é distribuído pelo próprio projeto original, sob a própria licença; este catálogo só descreve como rodá-lo. "RoqueOS" e "LEVELHARD" são marcas: veja o [TRADEMARK.md](TRADEMARK.md) (em inglês).

## Idiomas

Este README e todo documento em [`docs/`](docs/pt-BR/INDEX.md) existem em inglês (a versão principal, [README.md](README.md)) e em português do Brasil. A ficha de cada app na loja também é escrita nos dois idiomas.
