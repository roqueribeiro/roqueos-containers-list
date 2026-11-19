# Documentação do RoqueOS Containers List

*Tradução de [INDEX.md](../INDEX.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

> **Para quem:** quem chega na documentação e quer a página que responde a sua pergunta.
> **O que tem aqui:** cada documento do repositório pelo que ele responde, os arquivos de evidência, e os diagramas com as fontes.
> **Onde ir para o resto:** a visão geral é o [README](../../README.pt-BR.md); o manifesto deste conjunto é o [`docs.json`](../docs.json).

Por onde começar depende do que você quer. Todo documento abaixo tem um par em inglês em [`docs/`](../INDEX.md); o em inglês é a versão principal.

| Eu quero... | Leia |
| --- | --- |
| **Instalar um app, ou usar o catálogo em outro painel** | [COMECAR.md](COMECAR.md): a App Store do RoqueOS, um painel compatível com o CasaOS e as checagens na sua própria máquina |
| **Adicionar um app** | [ADICIONAR-UM-APP.md](ADICIONAR-UM-APP.md): a pasta, o manifesto, os segredos, o README, as checagens e o pull request |
| **Contribuir de forma geral** | [CONTRIBUTING.md](CONTRIBUTING.md) |
| **Saber o que está provado e como** | [CRITERIOS-DE-TESTE.md](CRITERIOS-DE-TESTE.md): as dez premissas, o teste de boot, o que ainda não tem cobertura automática |
| **Ver o estado de cada app** | [QUALIDADE.md](QUALIDADE.md): gerado a partir do repositório, app a app |
| **Entender como o catálogo é feito por dentro** | [ARQUITETURA.md](ARQUITETURA.md): quem lê, as ferramentas, os fluxos, as decisões e os limites |
| **Consultar um campo do manifesto, um comando ou um workflow** | [REFERENCIA.md](REFERENCIA.md) |
| **Ler o catálogo a partir de outro sistema** | [INTEGRACOES.md](INTEGRACOES.md): as URLs, o que o servidor do RoqueOS lê, como sai uma mudança de contrato |
| **Entender como uma mudança chega à loja, ou operar** | [COMO-CHEGA.md](COMO-CHEGA.md): a `main`, o cache do servidor, releases, a rotina, desfazer, backup, o que vigiar |
| **Consertar um app que não sobe** | [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md): sintoma, causa, o que fazer |
| **Saber por que um app saiu da loja** | [APOSENTADOS.md](APOSENTADOS.md) |
| **Achar um termo** | [GLOSSARIO.md](GLOSSARIO.md) |
| **Relatar uma vulnerabilidade** | [SECURITY.md](../../SECURITY.md) (em inglês) |
| **Ver o que mudou** | [CHANGELOG.md](../../CHANGELOG.md) (em inglês) |

## Evidência guardada no repositório

| Arquivo | O que guarda | Quem escreve |
| --- | --- | --- |
| [`evidence/boot.json`](../evidence/boot.json) | o último resultado de boot de cada app que ainda está na loja, com a execução do CI e a data | `node scripts/evidencia-boot.mjs`, a partir dos artefatos do workflow `Boot` |
| [`QUALITY.md`](../QUALITY.md) e [`pt-BR/QUALIDADE.md`](QUALIDADE.md) | o estado da loja e de cada app | `yarn docs:quality` |
| `Apps/<App>/README.md` | a ficha de cada app na loja | `yarn readme` |

O `yarn docs:check` regenera as páginas geradas em memória e reprova quando a versão commitada é diferente, então esses arquivos não conseguem se afastar dos manifestos.

## Diagramas

| Diagrama | Fonte | Explicado em |
| --- | --- | --- |
| Contexto: quem lê o catálogo | Mermaid na [ARQUITETURA.md](ARQUITETURA.md#2-contexto-quem-lê-e-do-que-depende) | a mesma seção |
| Sequência: do pull request à loja | Mermaid na [ARQUITETURA.md](ARQUITETURA.md#5-fluxo-do-pull-request-à-loja) | a mesma seção |
| Sequência: o teste de boot | Mermaid na [ARQUITETURA.md](ARQUITETURA.md#6-fluxo-o-teste-de-boot) | a mesma seção e os [CRITERIOS-DE-TESTE.md](CRITERIOS-DE-TESTE.md) |
| Banner e marca do README | `docs/assets/marca/gen.py`, a partir do `carimbo.json` | `docs/assets/marca/README.md` (só em português) |
