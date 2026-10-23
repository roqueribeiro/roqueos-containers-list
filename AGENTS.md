# RoqueOS containers-list: Codex

Catálogo Docker Compose/CasaOS consumido pelo server e loja, com validadores, revisão e testes de boot.

**Ferramentas:** Yarn. Use `yarn enrichment` para relatório de traduções, evitando colisão com yarn audit.

**Validação:** `yarn validate`, `yarn revisao`, `yarn test:coverage`. Boot de containers por `yarn boot`/`yarn boot:todos` exige Linux e é operacional, não leitura pura. Docker Desktop não comprova permissões de bind no Linux. Validação de manifestos não prova login/persistência/instalação real.

**Fontes:** [Core do catálogo](../roqueos-ecosystem/rules/containers/00-catalog-core.md) e [contrato de schema](../roqueos-ecosystem/rules/containers/10-schema-contract.md).

**Contratos:** Mudanças de schema, idiomas, volumes e portas afetam parser/installer do server e UI do front. Preserve dados de apps; avalie contratos e teste caminho real de instalação quando aplicável.

## Protocolo Codex

Leia [CLAUDE.md](CLAUDE.md) como documentação de produto e engenharia. Regras, hooks,
`@imports`, ferramentas e autoload do Claude não são executados automaticamente pelo Codex.
Use a skill `roqueos-codex:context` antes de editar: descubra o repo real, informe os caminhos
planejados por `--files` e leia as regras retornadas, inclusive seus links canônicos.
Reavalie o contexto após ampliar escopo e antes da integração; checkout limpo não revela
arquivos futuros pelo diff. Se o plugin faltar, leia os índices e regras correspondentes manualmente.

Prefira GPT-6 Astra; `.codex/config.toml` solicita esforço `ultra`. O runtime e a configuração
da tarefa determinam o modelo efetivo; não alegue troca do modelo por editar arquivo.
Trabalho substancial independente autoriza subagentes limitados com modelo herdado, escopos
exclusivos e revisão integrada. Não abrir agentes para tarefas triviais nem presumir slots extras.
Respeite análise somente leitura. Rode testes relevantes durante implementação e o gate exigido
na entrega; registre resultados reais e limitações. Produção, publicação e mensagens externas
seguem a autorização do usuário. Preserve `.claude/`, credenciais, alterações do usuário e hooks.

O [mapa da família](../roqueos-ecosystem/README.md) e o
[protocolo Codex](../roqueos-ecosystem/docs/CODEX.md) são fontes compartilhadas.
Em worktree isolado, resolva a localização real do ecosystem pelo workspace/discover,
sem assumir que os links relativos a irmãos existem nem copiar suas regras.
