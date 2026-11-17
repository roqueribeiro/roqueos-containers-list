import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import {
  PARES,
  ancoras,
  contagens,
  links,
  slug,
  travessoes,
  verifica,
} from "../../scripts/check-docs.mjs";

/*
 * O gate da documentacao. Cada bloco monta um repo minimo e verde, quebra uma
 * coisa so e confere que o gate reprova exatamente ela: um gate que so diz
 * "ok" no repo de verdade nao prova que olha para alguma coisa.
 */

let raiz;
const escreve = (rel, texto) => {
  mkdirSync(dirname(join(raiz, rel)), { recursive: true });
  writeFileSync(join(raiz, rel), texto);
};

function repoVerde(nApps = 2) {
  for (let i = 0; i < nApps; i++) mkdirSync(join(raiz, "Apps", `App${i}`), { recursive: true });
  for (const [en, pt] of Object.entries(PARES)) {
    const relPt = en.startsWith("docs/") ? pt.replace("docs/", "") : pt;
    const relEn = pt.startsWith("docs/pt-BR/") ? (en.startsWith("docs/") ? "../" + en.replace("docs/", "") : "../../" + en) : en;
    escreve(en, `# ${en}\n\n*Also in [pt](${relPt}).*\n\n## Uma seção\n`);
    escreve(pt, `# ${pt}\n\n*Tradução de [en](${relEn}).*\n\n## Uma seção\n`);
  }
  escreve("README.md", `# Readme\n\n[pt](README.pt-BR.md) ${nApps} apps <img src="https://img.shields.io/badge/apps-${nApps}-blue">\n`);
  escreve("README.pt-BR.md", `# Leia-me\n\n[en](README.md) ${nApps} apps\n`);
}

beforeEach(() => {
  raiz = mkdtempSync(join(tmpdir(), "check-docs-"));
  repoVerde();
});
afterEach(() => rmSync(raiz, { recursive: true, force: true }));

describe("o repo minimo e verde", () => {
  it("nao acusa nada", () => {
    expect(verifica(raiz).erros).toEqual([]);
  });
});

describe("contagem de apps", () => {
  it("reprova o README que diz um numero diferente das pastas de Apps/", () => {
    escreve("README.md", "# R\n\n[pt](README.pt-BR.md) 221 apps\n");
    expect(verifica(raiz).erros).toEqual(["README.md: diz 221 apps, Apps/ tem 2"]);
  });

  it("le o badge e o numero com adjetivo no meio", () => {
    expect(contagens("![b](https://img.shields.io/badge/apps-220-blue) e 219 ready-to-deploy apps").sort()).toEqual([219, 220]);
  });

  it("nao conta numero dentro de codigo", () => {
    expect(contagens("`10 apps` e\n```\n30 apps\n```\n")).toEqual([]);
  });
});

describe("links", () => {
  it("reprova link relativo para arquivo que nao existe", () => {
    escreve("docs/INDEX.md", "# I\n\n[pt](pt-BR/INDEX.md) [x](NAO-EXISTE.md)\n");
    expect(verifica(raiz).erros).toEqual(["docs/INDEX.md: link quebrado para NAO-EXISTE.md"]);
  });

  it("reprova ancora que nao existe no destino, e aceita a que existe", () => {
    escreve("docs/INDEX.md", "# I\n\n[pt](pt-BR/INDEX.md) [ok](TESTING.md#uma-seção) [ruim](TESTING.md#outra)\n");
    expect(verifica(raiz).erros).toEqual(["docs/INDEX.md: ancora #outra nao existe em docs/TESTING.md"]);
  });

  it("ignora URL externa e link dentro de codigo", () => {
    expect(links("[a](https://x.y/z) `[b](c.md)` [d](mailto:a@b.c)")).toEqual(["https://x.y/z", "mailto:a@b.c"]);
  });
});

describe("slug do GitHub", () => {
  it("mantem acento, tira pontuacao e troca espaco por hifen", () => {
    expect(slug("Fora da loja até voltar (Goal 30, 17/11/2026)")).toBe("fora-da-loja-até-voltar-goal-30-17112026");
    expect(slug("Before you start: is it a fit?")).toBe("before-you-start-is-it-a-fit");
  });

  it("numera titulo repetido como o GitHub", () => {
    expect([...ancoras("# A\n## A\n## A\n")]).toEqual(["a", "a-1", "a-2"]);
  });
});

describe("pares de idioma", () => {
  it("reprova pagina nova em docs/ sem par registrado", () => {
    escreve("docs/NOVA.md", "# Nova\n");
    expect(verifica(raiz).erros).toEqual(["docs/NOVA.md: sem par em docs/pt-BR/ (registre em PARES)"]);
  });

  it("reprova a traducao que sumiu", () => {
    rmSync(join(raiz, "docs/pt-BR/GLOSSARIO.md"));
    expect(verifica(raiz).erros).toContain("docs/pt-BR/GLOSSARIO.md: falta (traducao de docs/GLOSSARY.md)");
  });

  it("reprova o par que nao aponta de volta", () => {
    escreve("docs/pt-BR/GLOSSARIO.md", "# G\n\nsem link\n");
    expect(verifica(raiz).erros).toEqual(["docs/pt-BR/GLOSSARIO.md: nao aponta para a versao principal docs/GLOSSARY.md"]);
  });
});

describe("travessao", () => {
  it("reprova em dash e en dash no texto, com a linha", () => {
    escreve("SECURITY.md", "# S\n\nok\nisto — aquilo\n1–2\n");
    expect(verifica(raiz).erros).toEqual([
      "SECURITY.md:4: travessao (use virgula, dois-pontos ou parenteses)",
      "SECURITY.md:5: travessao (use virgula, dois-pontos ou parenteses)",
    ]);
  });

  it("le tambem os templates do .github", () => {
    escreve(".github/ISSUE_TEMPLATE/x.yml", "name: a — b\n");
    expect(verifica(raiz).erros).toEqual([".github/ISSUE_TEMPLATE/x.yml:1: travessao (use virgula, dois-pontos ou parenteses)"]);
  });

  it("nao conta travessao dentro de codigo", () => {
    expect(travessoes("`a — b`\n```\nc — d\n```\n")).toEqual([]);
  });
});
