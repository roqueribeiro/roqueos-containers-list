# Como uma mudança chega à loja

*Tradução de [HOW-IT-SHIPS.md](../HOW-IT-SHIPS.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

> **Para quem:** quem mantém o catálogo: faz merge de pull request, mantém a evidência em dia, corta uma release ou precisa desfazer uma.
> **O que tem aqui:** como um merge chega à loja, quem lê o quê, releases, mudanças que atravessam repositórios, a rotina, como atualizar a evidência, como desfazer cada passo, backup, e o que vigiar.
> **Onde ir para o resto:** o que cada checagem prova nos [CRITERIOS-DE-TESTE.md](CRITERIOS-DE-TESTE.md); o que fazer quando um app falha no [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md); cada comando na [REFERENCIA.md](REFERENCIA.md).

Não existe etapa de build para o catálogo. Um manifesto mergeado na `main` é o que os usuários instalam, então a `main` é produção.

## O caminho

1. **Um pull request** muda `Apps/<App>/`. O CI roda o schema, as dez premissas, os testes unitários, a checagem da documentação e o teste de boot dos apps que ele mexe ([CRITERIOS-DE-TESTE.md](CRITERIOS-DE-TESTE.md)).
2. **Um mantenedor revisa** ([CODEOWNERS](../../.github/CODEOWNERS)) e faz o merge na `main`.
3. **O servidor do RoqueOS lê a `main`** pela API de conteúdo do GitHub e guarda por 24 horas. Um servidor que subiu ou renovou o cache depois do merge mostra a ficha nova; os outros mostram em até um dia.
4. **Uma pessoa instala.** O servidor renderiza as variáveis de sistema e os segredos gerados, e depois sobe todos os serviços do manifesto como uma stack só.

## Quem lê o quê

| Leitor | Fonte | Atualização |
| --- | --- | --- |
| App Store do RoqueOS (pelo `roqueos-server`) | a `main`, pela API de conteúdo do GitHub | em até 24 horas depois do merge |
| Um painel compatível com o CasaOS apontado para o arquivo | `https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip` | no ritmo de atualização do próprio painel |
| Um painel fixado numa release | o `appstore.zip` anexado a uma release do GitHub | congelado naquela release |

## Releases

O workflow `Build AppStore` monta o `appstore.zip` em todo push e pull request para a `main`, como artefato de CI. Uma tag `vX.Y.Z` (ou `vX.Y.Z-pre`) também publica o arquivo como release do GitHub, depois que a checagem de schema passa.

**Estado atual, lido do repositório:** nenhuma tag de versão semântica foi criada ainda. A última release é a `v20260421-224749`, do esquema de timestamp usado antes da política de versão semântica; toda mudança depois dela está em **Unreleased** no [CHANGELOG](../../CHANGELOG.md) (em inglês). O RoqueOS não depende de releases, porque lê a `main`. A política para a primeira tag e para todas as seguintes:

| Incremento | Quando |
| --- | --- |
| PATCH | um app adicionado, consertado ou removido; uma mudança de documentação |
| MINOR | um campo novo em `x-casaos` ou `x-roqueos`, uma premissa ou invariante nova, uma categoria nova |
| MAJOR | um campo renomeado ou removido, um valor de enum alterado: qualquer coisa que um leitor existente leria errado |

## Uma mudança que atravessa repositórios

O catálogo é o produtor, o `roqueos-server` interpreta e o `roqueos-front` desenha. Um manifesto que usa um campo que o servidor publicado não entende chega aos usuários no momento em que entra na `main`, então um contrato novo sai nesta ordem:

1. **`roqueos-server`** aprende o campo, é mergeado e tem a imagem publicada.
2. **`roqueos-front`** mostra o campo, e é implantado.
3. **Só então** o catálogo começa a usar o campo na `main`.

O `x-roqueos.gerar` é o exemplo: um servidor que não gerasse segredos teria instalado o texto literal `${DB_PASSWORD}` como senha de banco. Ele só chegou à `main` depois que o `roqueos-server` 1.38.0 foi publicado. O mapa dos repositórios e dos contratos entre eles é mantido pelos mantenedores.

## Remover um app

Remover uma pasta tira a ficha para novas instalações; não mexe num app que alguém já roda. A decisão e a evidência vão para o [APOSENTADOS.md](APOSENTADOS.md) no mesmo pull request.

## A rotina

| O quê | Quando | Onde roda | Fonte |
| --- | --- | --- | --- |
| Schema, premissas, testes unitários, checagem da documentação | todo pull request, e todo push na `main` que mexe no que cada workflow observa | GitHub Actions | [`.github/workflows/`](../../.github/workflows/) |
| Boot dos apps que um pull request mexe | todo pull request que muda um `Apps/*/docker-compose.yml` | runner `ubuntu-latest` do GitHub | [`boot.yml`](../../.github/workflows/boot.yml) |
| Boot do catálogo inteiro | semanal, domingo às 04:17 UTC (`17 4 * * 0`); para em 90 minutos | runner `ubuntu-latest` do GitHub | [`boot.yml`](../../.github/workflows/boot.yml) |
| Evidência de boot no repositório | à mão, depois de runs de boot que valem guardar | a máquina do mantenedor | [`scripts/evidencia-boot.mjs`](../../scripts/evidencia-boot.mjs) |
| O usuário com que cada imagem roda | à mão, quando a tag de uma imagem muda | a máquina do mantenedor | [`scripts/uid-imagem.mjs`](../../scripts/uid-imagem.mjs) |

## Atualizar a evidência

O workflow `Boot` sobe um JSON por app como o artefato `boot`, e o artefato expira. Para guardar um resultado, baixe e incorpore no [`evidence/boot.json`](../evidence/boot.json), depois regere a página de qualidade para os números acompanharem:

```bash
gh run download <run> -n boot -D /tmp/boot-<run>
node scripts/evidencia-boot.mjs <run>@<date-iso>@/tmp/boot-<run>
yarn docs:quality
yarn docs:check
```

Os runs entram na ordem dada: um run posterior sobrescreve o resultado de um anterior. Quando a tag de uma imagem muda, atualize o usuário que a P10 lê, offline, de [`scripts/dados/uid-imagens.json`](../../scripts/dados/uid-imagens.json):

```bash
yarn uid:atualiza
yarn revisao:app <App>
```

## Cortar uma release

Nenhuma tag semver foi criada ainda. Quando for, a tag é o único gatilho de que o workflow `Build AppStore` precisa para publicar o `appstore.zip` como release:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Uma tag com sufixo (`v1.0.0-beta.1`) sai como pre-release. Mova as entradas de **Unreleased** do [CHANGELOG](../../CHANGELOG.md) para a versão nova na mesma mudança.

## Desfazer

| Passo | Como desfazer | O que fica |
| --- | --- | --- |
| Um merge na `main` | um pull request com `git revert -m 1 <merge-commit>`, pela mesma revisão | servidores que já renovaram ficam com a ficha ruim até o cache de 24 horas vencer |
| Uma instalação que alguém já fez | nada neste repositório desfaz: remover ou reverter um app não mexe numa stack rodando | o container continua rodando naquele servidor |
| Um app removido | reverta o commit da remoção; o manifesto antigo está no histórico, no commit anterior à remoção ([APOSENTADOS.md](APOSENTADOS.md)) | |
| Uma release | apague a release e a tag no GitHub; um painel que já baixou o arquivo continua com ele | o arquivo nos leitores que o fixaram |
| Uma atualização da evidência de boot | reverta o commit que mudou o [`evidence/boot.json`](../evidence/boot.json) e rode `yarn docs:quality` | |

## Backup e restauração

O catálogo é o repositório git: todo manifesto, ícone, ficha da loja e a evidência de boot são versionados, e o GitHub guarda a cópia que a loja lê. O que **não** está no git é regerável: `.revisao/` (rode `yarn revisao`), `.boot/` (rode `yarn boot` em Linux) e `node_modules/` (rode `yarn install`). Os artefatos de boot do CI são a única coisa que se perde quando expiram, e é por isso que os resultados que valem guardar vão para o `evidence/boot.json`.

O dado que os apps das pessoas gravam mora nos servidores delas, em `/DATA/AppData/<app>/`, fora deste repositório.

## O que vigiar

| Sinal | Saudável | Onde |
| --- | --- | --- |
| Os selos de `Validate Manifests`, `Test` e `Boot` | verdes na `main` | [README.pt-BR.md](../../README.pt-BR.md) |
| Apps com as dez premissas fechadas | todo app de `Apps/` | [QUALIDADE.md](QUALIDADE.md), `yarn revisao` sai 0 |
| A checagem da documentação | `docs ok: ...` e saída 0 | `yarn docs:check` |
| Apps sem boot registrado | caindo com o tempo | [QUALIDADE.md](QUALIDADE.md) |
| Boots inconclusivos | cada um com motivo de laboratório, nunca falha de app disfarçada | [`evidence/boot.json`](../evidence/boot.json) |
