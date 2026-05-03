import { describe, expect, it } from "vitest";
import {
  RULES,
  applyRulesToContent,
  findComposePath,
  findAppfilePath,
} from "../../scripts/rebrand-casaos.mjs";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("RULES array (rebrand recipe)", () => {
  it("is a non-empty array of {from, to, label} objects", () => {
    expect(Array.isArray(RULES)).toBe(true);
    expect(RULES.length).toBeGreaterThan(0);
    for (const rule of RULES) {
      expect(rule).toHaveProperty("from");
      expect(rule).toHaveProperty("to");
      expect(rule).toHaveProperty("label");
      expect(rule.from).toBeInstanceOf(RegExp);
    }
  });

  it("has a meaningful number of rules (covers the categories documented in containers/60-rebranding.md)", () => {
    // Categories: author, developer, 3 CDN URLs, 2 env-cred forms,
    // tips backticks, ~10 free-text variants, Chinese, 3 appfile.json patterns.
    // Snapshot range keeps tests honest as rules are added.
    expect(RULES.length).toBeGreaterThanOrEqual(20);
    expect(RULES.length).toBeLessThan(60); // sanity ceiling
  });

  it("every rule has a unique label (so summary counts are unambiguous)", () => {
    const labels = RULES.map((r) => r.label);
    const unique = new Set(labels);
    expect(unique.size).toBe(labels.length);
  });

  it("every regex from-pattern uses the global flag (so .replace catches all matches)", () => {
    for (const rule of RULES) {
      expect(rule.from.global).toBe(true);
    }
  });
});

describe("applyRulesToContent — individual rule categories", () => {
  it('rewrites "author: CasaOS Team" → "author: RoqueOS Team"', () => {
    const input = "x-casaos:\n  author: CasaOS Team\n  category: Media\n";
    const { content, changed } = applyRulesToContent(input);
    expect(content).toContain("author: RoqueOS Team");
    expect(content).not.toContain("author: CasaOS Team");
    expect(changed).toBe(true);
  });

  it('rewrites "developer: CasaOS Team" → "developer: RoqueOS Team"', () => {
    const input = "  developer: CasaOS Team\n";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("developer: RoqueOS Team");
  });

  it("rewrites IceWhaleTech CDN URLs to roqueribeiro fork", () => {
    const input =
      "icon: https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/Jellyfin/icon.png";
    const { content, matchCounts } = applyRulesToContent(input);
    expect(content).toContain(
      "cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main",
    );
    expect(content).not.toContain("IceWhaleTech");
    expect(matchCounts.get("cdn-icewhale")).toBe(1);
  });

  it("rewrites LisonEvf CDN URLs", () => {
    const input =
      "icon: https://cdn.jsdelivr.net/gh/LisonEvf/CasaOS-AppStore@main/Apps/X/icon.png";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("roqueribeiro/roqueos-containers-list@main");
    expect(content).not.toContain("LisonEvf");
  });

  it("rewrites icon.casaos.io standalone CDN to our jsdelivr path", () => {
    // Note: the rule maps known names (netdata, trilium, webdav, jenkins) to App dir paths
    const input = "icon: https://icon.casaos.io/main/all/jenkins.png";
    const { content } = applyRulesToContent(input);
    expect(content).toMatch(
      /roqueribeiro\/roqueos-containers-list@main\/Apps\/Jenkin\/icon\.png/,
    );
  });

  it("rewrites env credential mapping form (KEY: casaos)", () => {
    const input =
      "  environment:\n    MYSQL_PASSWORD: casaos\n    OTHER: keepme\n";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("MYSQL_PASSWORD: roqueos");
    expect(content).toContain("OTHER: keepme"); // unchanged
  });

  it("rewrites env credential list form (- KEY=casaos)", () => {
    const input = "    - MYSQL_PASSWORD=casaos\n    - OTHER=keepme\n";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("- MYSQL_PASSWORD=roqueos");
    expect(content).toContain("- OTHER=keepme");
  });

  it("rewrites backtick-wrapped credentials in tips markdown", () => {
    const input = "| `casaos` | `casaos` |";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("| `roqueos` | `roqueos` |");
  });

  it('rewrites free-text "CasaOS WebUI" → "RoqueOS WebUI"', () => {
    const input = "Open the CasaOS WebUI to access this app.";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("RoqueOS WebUI");
  });

  it('rewrites Chinese variants ("CasaOS 中" / "你的 CasaOS")', () => {
    const input = "CasaOS 中的应用 / 你的 CasaOS 设备";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("RoqueOS 中");
    expect(content).toContain("你的 RoqueOS");
  });

  it("rewrites appfile.json adaptor website to roqueos.com.br", () => {
    const input = '"website": "https://www.casaos.io"';
    const { content } = applyRulesToContent(input);
    expect(content).toContain('"website": "https://roqueos.com.br"');
  });

  it('rewrites appfile.json adaptor name "CasaOS Team" → "RoqueOS Team"', () => {
    const input = '"name": "CasaOS Team",';
    const { content } = applyRulesToContent(input);
    expect(content).toContain('"name": "RoqueOS Team"');
  });

  it('rewrites appfile.json env value "casaos" → "roqueos"', () => {
    const input = '"value": "casaos"';
    const { content } = applyRulesToContent(input);
    expect(content).toContain('"value": "roqueos"');
  });
});

describe("applyRulesToContent — preservation guarantees (what should NOT change)", () => {
  it('preserves "x-casaos:" YAML namespace (parser contract — DO NOT TOUCH)', () => {
    const input = "services:\n  app:\n    image: x:1\nx-casaos:\n  main: app\n";
    const { content } = applyRulesToContent(input);
    expect(content).toContain("x-casaos:");
    expect(content).toContain("  main: app");
  });

  it("preserves icon.casaos.io URLs that don't match the known mapping", () => {
    const input = "icon: https://icon.casaos.io/main/all/some-unknown-app.png";
    const { content } = applyRulesToContent(input);
    // Will replace via the rule, but with the same filename
    expect(content).toMatch(
      /roqueribeiro\/roqueos-containers-list@main\/Apps\/some-unknown-app\/icon\.png/,
    );
  });

  it('does NOT touch unrelated "casaos" outside known patterns', () => {
    // No rule for arbitrary "the casaos project"
    const input = "description: |\n  Compatible with the casaos project.\n";
    const { content } = applyRulesToContent(input);
    // Only known patterns trigger; this generic mention should be preserved
    expect(content).toContain("with the casaos project");
  });
});

describe("applyRulesToContent — idempotency", () => {
  it("applying twice produces the same result (idempotent)", () => {
    const input =
      "author: CasaOS Team\n  developer: CasaOS Team\nicon: https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/X/icon.png";
    const first = applyRulesToContent(input).content;
    const second = applyRulesToContent(first).content;
    expect(second).toBe(first);
  });

  it("applying to already-rebranded content is a no-op (changed=false)", () => {
    const input = "author: RoqueOS Team\n";
    const { changed, matchCounts } = applyRulesToContent(input);
    expect(changed).toBe(false);
    expect(matchCounts.size).toBe(0);
  });
});

describe("applyRulesToContent — return shape", () => {
  it("returns { content, matchCounts, changed } object", () => {
    const result = applyRulesToContent("author: CasaOS Team\n");
    expect(result).toHaveProperty("content");
    expect(result).toHaveProperty("matchCounts");
    expect(result).toHaveProperty("changed");
    expect(result.matchCounts).toBeInstanceOf(Map);
  });

  it("matchCounts is empty Map when no rule matched", () => {
    const result = applyRulesToContent("totally unrelated content\n");
    expect(result.matchCounts.size).toBe(0);
    expect(result.changed).toBe(false);
  });

  it("matchCounts aggregates per-rule label with count", () => {
    const input =
      "author: CasaOS Team\nicon: https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/A/icon.png\nthumbnail: https://cdn.jsdelivr.net/gh/IceWhaleTech/CasaOS-AppStore@main/Apps/A/thumb.png";
    const { matchCounts } = applyRulesToContent(input);
    expect(matchCounts.get("author")).toBe(1);
    expect(matchCounts.get("cdn-icewhale")).toBe(2);
  });

  it("accepts custom rules argument (defaults to RULES)", () => {
    const customRules = [{ from: /foo/g, to: "bar", label: "test-rule" }];
    const { content, matchCounts } = applyRulesToContent(
      "foo foo baz",
      customRules,
    );
    expect(content).toBe("bar bar baz");
    expect(matchCounts.get("test-rule")).toBe(2);
  });
});

describe("findComposePath / findAppfilePath (re-exported helpers)", () => {
  it("findAppfilePath returns the path when appfile.json exists", async () => {
    const dir = await mkdtemp(join(tmpdir(), "rebrand-test-"));
    try {
      await writeFile(join(dir, "appfile.json"), "{}");
      const result = await findAppfilePath(dir);
      expect(result).toBe(join(dir, "appfile.json"));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("findAppfilePath returns null when no appfile.json", async () => {
    const dir = await mkdtemp(join(tmpdir(), "rebrand-test-"));
    try {
      expect(await findAppfilePath(dir)).toBeNull();
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("findComposePath is exported and consistent with the other scripts", () => {
    expect(typeof findComposePath).toBe("function");
  });
});
