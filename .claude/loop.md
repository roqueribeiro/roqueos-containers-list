Rotina de manutenção. Uma coisa por iteração, com a evidência no chat. Para na primeira que tiver trabalho.

1. **Gate vermelho.** `roqueos-gate`. Conserta e cola a saída.
2. **Manifesto fora do schema.** `yarn validate` nos 205+ manifestos. Schema Draft-07 é gate duro.
3. **Lacuna de i18n no catálogo.** `node scripts/audit-enrichment.mjs`. Preenche o que dá com fonte, não inventa tradução.
4. **PR da branch atual.** CI, review, conflito.
5. **Raio de impacto.** Este repo é o PRODUTOR da cadeia: mudança de schema vai para o parser do server e depois para a UI do front, nessa ordem. `roqueos-graph blast Apps/**`.

Mudança em `Apps/**` só fecha com o schema verde nos manifestos todos e o `appstore.zip` gerado.
