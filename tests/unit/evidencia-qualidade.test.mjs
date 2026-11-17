import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { junta, resumo } from "../../scripts/evidencia-boot.mjs";
import { SAIDAS, pagina, retrato } from "../../scripts/gera-qualidade.mjs";

/*
 * A evidencia de boot versionada e a pagina de qualidade gerada dela. O numero
 * "N apps de pe" da pagina so vale se sair de um run de CI citado, e se um app
 * que saiu da loja nao continuar contando.
 */

describe("evidencia-boot: resumo", () => {
  it("separa ok, inconclusivo e falha, e guarda a etapa so da falha", () => {
    expect(resumo({ app: "A", ok: true, segundos: 12 }, 1, "d")).toEqual({ resultado: "ok", segundos: 12, run: 1, quando: "d" });
    expect(resumo({ app: "B", ok: false, inconclusivo: "sem GPU" }, 1, "d")).toEqual({
      resultado: "inconclusivo", segundos: null, run: 1, quando: "d", motivo: "sem GPU",
    });
    expect(resumo({ app: "C", ok: false, etapa: "porta" }, 1, "d")).toMatchObject({ resultado: "falha", etapa: "porta" });
  });
});

describe("evidencia-boot: junta", () => {
  const runs = [
    { run: 1, quando: "2026-11-17T10:00:00Z", resultados: [{ app: "A", ok: false, etapa: "porta" }, { app: "Saiu", ok: true }] },
    { run: 2, quando: "2026-11-17T11:00:00Z", resultados: [{ app: "A", ok: true }, { app: "B", ok: true }] },
  ];

  it("fica com o resultado do run mais recente de cada app", () => {
    expect(junta(runs, new Set(["A", "B"])).apps.A).toMatchObject({ resultado: "ok", run: 2 });
  });

  it("descarta app que nao esta mais na loja", () => {
    expect(Object.keys(junta(runs, new Set(["A", "B"])).apps)).toEqual(["A", "B"]);
  });

  it("cita cada run de onde veio a evidencia", () => {
    expect(junta(runs, new Set(["A"])).runs).toEqual([
      { run: 1, quando: "2026-11-17T10:00:00Z" },
      { run: 2, quando: "2026-11-17T11:00:00Z" },
    ]);
  });
});

describe("gera-qualidade, no repo de verdade", () => {
  const r = retrato();

  it("conta as pastas de Apps/ e as saidas pelos nomes do registro, nao pelas linhas", () => {
    const aposentados = readFileSync("docs/pt-BR/APOSENTADOS.md", "utf8");
    expect(aposentados).toContain("| Logseq, InvoiceNinja, Authelia |");
    expect(r.saidas).toBeGreaterThanOrEqual(3);
    expect(r.apps.length).toBeGreaterThan(0);
  });

  it("so usa boot de app que ainda esta na loja", () => {
    const nomes = new Set(r.apps.map((a) => a.nome));
    const evid = JSON.parse(readFileSync("docs/evidence/boot.json", "utf8"));
    for (const app of Object.keys(evid.apps)) expect(nomes.has(app)).toBe(true);
  });

  it("a pagina commitada e a que o gerador escreve hoje (yarn docs:quality)", () => {
    for (const l of ["en", "pt"]) expect(readFileSync(SAIDAS[l], "utf8")).toBe(pagina(r, l));
  });

  it("as duas linguas citam a outra e nao tem travessao", () => {
    expect(pagina(r, "en")).toContain("pt-BR/QUALIDADE.md");
    expect(pagina(r, "pt")).toContain("../QUALITY.md");
    for (const l of ["en", "pt"]) expect(pagina(r, l)).not.toMatch(/[–—]/);
  });
});
