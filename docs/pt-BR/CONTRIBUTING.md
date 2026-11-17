# Contribuindo com o RoqueOS Containers List

*Tradução de [CONTRIBUTING.md](../../CONTRIBUTING.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

Obrigado por considerar uma contribuição. O catálogo ganha com apps novos, consertos de apps que quebraram, fichas da loja melhores, traduções e relatos do que não funciona.

## Código de Conduta

Este projeto segue o [Contributor Covenant 2.1](../../CODE_OF_CONDUCT.md) (em inglês). Ao participar, você concorda com ele.

## Achou uma vulnerabilidade?

Não abra issue pública. Siga o [SECURITY.md](../../SECURITY.md) (em inglês).

## A regra do projeto

**Um app está na loja porque alguma coisa provou que ele funciona, não porque o manifesto dele é lido sem erro.** Toda checagem deste repositório existe porque um app quebrado já passou pelas checagens que vieram antes dela. Um pull request que enfraquece uma checagem, aumenta uma allowlist ou pula uma premissa para deixar o CI verde volta, mesmo quando o app está certo.

## Jeitos de contribuir

| Você quer | Faça isto |
| --- | --- |
| Sugerir um app | abra uma issue **New app**; os critérios de encaixe estão no [ADICIONAR-UM-APP.md](ADICIONAR-UM-APP.md) |
| Adicionar um app | siga o [ADICIONAR-UM-APP.md](ADICIONAR-UM-APP.md) passo a passo |
| Relatar um app que não sobe ou não funciona | abra uma issue **Broken app**; o [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md) talvez já tenha o conserto |
| Relatar um bug nas ferramentas (um falso positivo, um crash) | abra uma issue **Bug report** |
| Melhorar uma ficha da loja ou uma tradução | edite o manifesto e depois rode `yarn readme --app <App>` |
| Propor a aposentadoria de um app | abra uma issue **Broken app** com a evidência (repositório arquivado, imagem sumida, data da última release) |

## Ambiente de desenvolvimento

Node 24 (a versão do [`.nvmrc`](../../.nvmrc)) e Yarn. **Só Yarn**: nada de `npm`, nada de `npx`, nada de `package-lock.json`.

```bash
git clone https://github.com/roqueribeiro/roqueos-containers-list.git
cd roqueos-containers-list
yarn install
```

As checagens em que um pull request precisa passar:

```bash
yarn validate
yarn revisao
yarn test
yarn docs:check
```

No Linux, `yarn boot <App>` sobe um app de verdade. Em qualquer outro sistema, o pull request roda isso num runner Linux do GitHub. Todos os comandos estão no [REFERENCIA.md](REFERENCIA.md).

## Convenções

- **Imagens fixadas**, nunca `:latest`. Prefira a imagem que o projeto original publica.
- **Nenhum segredo no manifesto.** Declare em `x-roqueos.gerar` ([ADICIONAR-UM-APP.md](ADICIONAR-UM-APP.md#3-segredos)).
- **Dois idiomas.** `tagline` e `description` em `en_us` e `pt_br`, o português escrito como se fala no Brasil. Outros idiomas que o projeto original já traz são mantidos.
- **`author: RoqueOS Team`** e `developer:` com o nome do mantenedor do projeto original.
- **A ficha da loja é gerada.** Nunca edite `Apps/<App>/README.md` à mão.
- **Pasta compartilhada.** `x-roqueos.mountShared: true` só para servidores de mídia, downloaders, gerenciadores de arquivos e gerenciadores de biblioteca; adicione o app também ao `MOUNT_SHARED_APPS` em [`scripts/fix-manifests.mjs`](../../scripts/fix-manifests.mjs), para que o `yarn fix` mantenha a configuração.
- **Documentação sem travessão.** O Markdown da raiz do repositório e de `docs/` não usa travessão (em dash) nem meia-risca (en dash); o `yarn docs:check` reprova quando acha um.
- **Todo número da documentação vem do repositório.** As contagens do README são checadas contra `Apps/`, e o [QUALIDADE.md](QUALIDADE.md) é gerado.

## Mudanças nas ferramentas

Uma mudança em `scripts/` ou `schema/` vem com um teste em `tests/unit/` que reprova sem a mudança. Uma checagem nova entra com um teste que reprova quando a checagem é removida. Atualize o [CHANGELOG.md](../../CHANGELOG.md) (em inglês) e a página correspondente em `docs/`, em inglês e em português.

Um campo novo no manifesto é um contrato com o `roqueos-server`: leia o [COMO-CHEGA.md](COMO-CHEGA.md#uma-mudança-que-atravessa-repositórios) antes de usá-lo num app.

## Importando um app da loja do CasaOS

```bash
cp -r path/to/CasaOS-AppStore/Apps/<AppName> Apps/
yarn rebrand
yarn fix
yarn validate
yarn revisao:app <AppName>
```

O `yarn rebrand` reescreve o autor, as URLs de CDN e as menções no texto; ele nunca mexe no namespace `x-casaos`. Um app importado ainda precisa fechar as dez premissas como qualquer outro.

## Fluxo de pull request

1. Faça o fork e crie uma branch a partir da `main`.
2. Um assunto por pull request: um app, ou uma mudança nas ferramentas.
3. Escreva o título como um [Conventional Commit](https://www.conventionalcommits.org/): `feat(catalog): add <App>`, `fix(<App>): ...`, `docs: ...`, `chore(release): vX.Y.Z`.
4. Preencha o template, incluindo como você testou e em qual arquitetura.
5. O CI precisa estar verde. Um mantenedor do [CODEOWNERS](../../.github/CODEOWNERS) revisa todo merge.

Depois do merge, a mudança chega à loja do RoqueOS a partir da `main` em até um dia ([COMO-CHEGA.md](COMO-CHEGA.md)).

## Publicando uma release (só mantenedores)

Mova a seção **Unreleased** do [CHANGELOG](../../CHANGELOG.md) para baixo da versão nova e depois faça o push de uma tag `vX.Y.Z`. O workflow `Build AppStore` checa os manifestos e publica o `appstore.zip` como release. A política de versão está no [COMO-CHEGA.md](COMO-CHEGA.md#releases).

## Marcas e créditos

"RoqueOS" e o logo são marcas registradas da LEVELHARD; veja o [TRADEMARK.md](../../TRADEMARK.md) (em inglês). O formato de manifesto `x-casaos` vem do [CasaOS-AppStore](https://github.com/IceWhaleTech/CasaOS-AppStore), da IceWhaleTech.
