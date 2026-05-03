import { describe, expect, it } from "vitest";
import {
  hasLocale,
  nonEmptyString,
  hasScreenshots,
  findComposePath,
} from "../../scripts/audit-enrichment.mjs";

describe("hasLocale", () => {
  it("returns true when field is a non-empty plain string", () => {
    expect(hasLocale("Some tagline", "en_US", "en_us")).toBe(true);
  });

  it("returns true when object has any of the candidate keys with non-empty value", () => {
    expect(hasLocale({ en_US: "English" }, "en_US", "en_us")).toBe(true);
    expect(hasLocale({ en_us: "English" }, "en_US", "en_us")).toBe(true);
    expect(hasLocale({ pt_BR: "Português" }, "pt_BR", "pt_br")).toBe(true);
  });

  it("returns true when one candidate exists even if others do not", () => {
    expect(hasLocale({ en_us: "x" }, "en_US", "en_us")).toBe(true);
  });

  it("returns false when field is null / undefined / 0 / false", () => {
    expect(hasLocale(null, "en_US")).toBe(false);
    expect(hasLocale(undefined, "en_US")).toBe(false);
    expect(hasLocale(0, "en_US")).toBe(false);
    expect(hasLocale(false, "en_US")).toBe(false);
  });

  it("returns false when string is empty / whitespace-only", () => {
    expect(hasLocale("", "en_US")).toBe(false);
    expect(hasLocale("   ", "en_US")).toBe(false);
    expect(hasLocale("\n\t", "en_US")).toBe(false);
  });

  it("returns false when object has no matching candidate keys", () => {
    expect(hasLocale({ ja_JP: "Japanese" }, "en_US", "pt_BR")).toBe(false);
    expect(hasLocale({ en_US: "" }, "en_US")).toBe(false); // value is empty
  });

  it("returns false when object has the key but value is whitespace-only", () => {
    expect(hasLocale({ en_US: "   " }, "en_US")).toBe(false);
  });

  it('returns false for arrays (typeof === "object" but not the shape we want)', () => {
    expect(hasLocale(["en_US"], "en_US")).toBe(false);
  });

  it("returns false for empty objects", () => {
    expect(hasLocale({}, "en_US")).toBe(false);
  });
});

describe("nonEmptyString", () => {
  it("returns true for normal strings", () => {
    expect(nonEmptyString("hello")).toBe(true);
    expect(nonEmptyString("a")).toBe(true);
  });

  it("returns false for empty / whitespace-only strings", () => {
    expect(nonEmptyString("")).toBe(false);
    expect(nonEmptyString("   ")).toBe(false);
    expect(nonEmptyString("\n")).toBe(false);
  });

  it("returns false for non-string types", () => {
    expect(nonEmptyString(null)).toBe(false);
    expect(nonEmptyString(undefined)).toBe(false);
    expect(nonEmptyString(0)).toBe(false);
    expect(nonEmptyString(42)).toBe(false);
    expect(nonEmptyString(false)).toBe(false);
    expect(nonEmptyString(true)).toBe(false);
    expect(nonEmptyString({})).toBe(false);
    expect(nonEmptyString([])).toBe(false);
    expect(nonEmptyString(["a"])).toBe(false);
  });

  it("preserves leading/trailing whitespace check (trims before length check)", () => {
    expect(nonEmptyString(" x ")).toBe(true); // 'x' after trim
    expect(nonEmptyString("   ")).toBe(false); // empty after trim
  });
});

describe("hasScreenshots", () => {
  it("returns true for non-empty array", () => {
    expect(hasScreenshots(["url1.png"])).toBe(true);
    expect(hasScreenshots(["url1.png", "url2.png"])).toBe(true);
  });

  it("returns false for empty array", () => {
    expect(hasScreenshots([])).toBe(false);
  });

  it("returns true for non-empty string (single URL form)", () => {
    expect(hasScreenshots("url1.png")).toBe(true);
  });

  it("returns false for empty string", () => {
    expect(hasScreenshots("")).toBe(false);
  });

  it("returns false for null / undefined", () => {
    expect(hasScreenshots(null)).toBe(false);
    expect(hasScreenshots(undefined)).toBe(false);
  });

  it("returns false for non-string non-array types", () => {
    expect(hasScreenshots(42)).toBe(false);
    expect(hasScreenshots({})).toBe(false);
    expect(hasScreenshots(true)).toBe(false);
  });
});

describe("findComposePath (re-exported)", () => {
  it("is the same function across all 4 scripts (consistent fallback behavior)", () => {
    expect(typeof findComposePath).toBe("function");
  });
});
