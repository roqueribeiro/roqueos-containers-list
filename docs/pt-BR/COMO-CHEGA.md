# Como uma mudança chega à loja

*Tradução de [HOW-IT-SHIPS.md](../HOW-IT-SHIPS.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

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
