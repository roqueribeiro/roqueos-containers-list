import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.mjs"],
    coverage: {
      provider: "v8",
      include: ["scripts/**/*.mjs"],
      exclude: ["node_modules/", "tests/", "scripts/audit-enrichment.mjs"],
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
