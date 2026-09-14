import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.mjs"],
    coverage: {
      provider: "v8",
      include: ["scripts/**/*.mjs"],
      exclude: [
        "node_modules/",
        "tests/",
        "scripts/audit-enrichment.mjs",
        // Migracoes de uma vez so do Goal 18 (14/09/2026). Rodaram, o
        // resultado esta no catalogo e no historico do git, e nao voltam a
        // rodar em CI. Ficam versionadas porque explicam COMO o catalogo
        // chegou onde esta; testa-las seria testar o passado, e deixa-las no
        // denominador derrubou a cobertura global de 35%+ para 9,23% e
        // quebrou o Test em doze pushes seguidos.
        //
        // O que NAO esta aqui, de proposito: revisao-container.mjs e
        // gera-readme.mjs. Esses dois sao ferramenta permanente (`yarn
        // revisao`, `yarn readme`), o primeiro bloqueia a CI, e ambos tem
        // teste.
        "scripts/goal18-passada-mecanica.mjs",
        "scripts/goal18-normaliza-idioma.mjs",
        "scripts/goal18-fixa-tags.mjs",
        "scripts/goal18-fixa-digest.mjs",
        "scripts/goal18-portas.mjs",
        "scripts/goal18-icones.mjs",
        "scripts/goal18-importa.mjs",
        "scripts/goal18-importa-bigbear.mjs",
        "scripts/goal18-descricoes.mjs",
        "scripts/goal18-permissao.mjs",
      ],
      reporter: ["text", "json", "html"],
      // Realistic thresholds — we test the pure helpers and core logic.
      // The remaining uncovered lines are top-level CLI driver code (the
      // `if (isCli) { ... }` blocks at the bottom of each script: readdir
      // + per-app loop + console.log summary). Unit-testing those would
      // require subprocess execution and wouldn't catch bugs the helper
      // tests don't already catch.
      //
      // Bumping these thresholds is welcome as new tests land. The numbers
      // below are conservative gates against regression, not aspirations.
      thresholds: {
        statements: 35,
        branches: 40,
        functions: 40,
        lines: 35,
      },
    },
  },
});
