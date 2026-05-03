import { describe, expect, it } from "vitest";
import { isImagePinned } from "../../scripts/fix-manifests.mjs";
import {
  imagePinningCheck,
  UNPINNED_IMAGE_ALLOWLIST,
} from "../../scripts/validate-manifests.mjs";

/**
 * Image pinning regression spec — guards the supply-chain rule in
 * `validate-manifests.mjs`. Adding `:latest` or untagged images to the
 * catalog (apart from the documented allowlist) MUST fail CI.
 *
 * Background: the audit on 2026-05-03 found 21 apps shipping `:latest`
 * because the validator never checked image pinning. `fix-manifests.mjs`
 * exported `isImagePinned` but no caller invoked it from the validate
 * path. Wave 2 of the audit wired pinning into the validate pipeline +
 * froze the existing 21 apps in an allowlist. This spec freezes that
 * contract.
 */

describe("isImagePinned (helper)", () => {
  it("rejects undefined / empty / non-string inputs", () => {
    expect(isImagePinned(undefined)).toBe(false);
    expect(isImagePinned(null)).toBe(false);
    expect(isImagePinned("")).toBe(false);
    expect(isImagePinned(123)).toBe(false);
  });

  it("rejects bare names without a tag", () => {
    expect(isImagePinned("nginx")).toBe(false);
    expect(isImagePinned("vendor/image")).toBe(false);
    expect(isImagePinned("ghcr.io/owner/image")).toBe(false);
  });

  it("rejects :latest suffix", () => {
    expect(isImagePinned("nginx:latest")).toBe(false);
    expect(isImagePinned("vendor/app:latest")).toBe(false);
    expect(isImagePinned("ghcr.io/owner/image:latest")).toBe(false);
  });

  it("accepts pinned semver tags", () => {
    expect(isImagePinned("nginx:1.27")).toBe(true);
    expect(isImagePinned("postgres:16-alpine")).toBe(true);
    expect(isImagePinned("vendor/app:v2.3.4")).toBe(true);
  });

  it("accepts digest pinning", () => {
    expect(isImagePinned("nginx@sha256:abcdef0123456789".padEnd(78, "0"))).toBe(
      true,
    );
  });
});

describe("imagePinningCheck", () => {
  it("returns no errors for a doc with all images pinned", () => {
    const doc = {
      services: {
        web: { image: "nginx:1.27" },
        db: { image: "postgres:16-alpine" },
      },
    };
    expect(imagePinningCheck(doc)).toEqual([]);
  });

  it("flags every service that uses :latest", () => {
    const doc = {
      services: {
        web: { image: "nginx:latest" },
        db: { image: "postgres:16" },
        cache: { image: "redis:latest" },
      },
    };
    const errors = imagePinningCheck(doc);
    expect(errors).toHaveLength(2);
    expect(errors[0]).toContain('service "web"');
    expect(errors[0]).toContain('"nginx:latest"');
    expect(errors[1]).toContain('service "cache"');
  });

  it("flags bare image names (no tag at all)", () => {
    const doc = { services: { app: { image: "vendor/image" } } };
    const errors = imagePinningCheck(doc);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('"vendor/image"');
  });

  it("skips services that use `build:` instead of `image:`", () => {
    // Local-build services aren't a catalog supply-chain risk — they
    // exist in the compose file but the catalog never ships an image
    // reference for them.
    const doc = {
      services: {
        app: { build: { context: "./app" } },
      },
    };
    expect(imagePinningCheck(doc)).toEqual([]);
  });

  it("returns empty for an empty/missing services object", () => {
    expect(imagePinningCheck({})).toEqual([]);
    expect(imagePinningCheck({ services: {} })).toEqual([]);
  });
});

describe("UNPINNED_IMAGE_ALLOWLIST contract", () => {
  it("contains the 21 apps frozen on 2026-05-03 — adding to this set is a regression", () => {
    // This test exists to make any addition to the allowlist visible in
    // PR review. The number on the right is intentional: if you remove
    // an entry (good!) the count drops. Update the assertion to match.
    expect(UNPINNED_IMAGE_ALLOWLIST.size).toBe(21);
  });

  it("includes the known offenders from the 2026-05-03 audit", () => {
    // Spot-check a handful — full list lives in the source. If the audit
    // rediscovers an app and it's missing from this allowlist, adding it
    // here AND landing the spec change in the same PR forces awareness.
    expect(UNPINNED_IMAGE_ALLOWLIST.has("AnythingLLM")).toBe(true);
    expect(UNPINNED_IMAGE_ALLOWLIST.has("Excalidraw")).toBe(true);
    expect(UNPINNED_IMAGE_ALLOWLIST.has("LibreChat")).toBe(true);
    expect(UNPINNED_IMAGE_ALLOWLIST.has("StableDiffusionWebUI")).toBe(true);
    expect(UNPINNED_IMAGE_ALLOWLIST.has("VirtualMachineManager")).toBe(true);
  });

  it("does NOT include apps that are already pinned (smoke check)", () => {
    // If somebody adds e.g. "Immich" or "Petio" to this allowlist by
    // accident, the test will catch it. These two were specifically
    // verified pinned in the audit.
    expect(UNPINNED_IMAGE_ALLOWLIST.has("Immich")).toBe(false);
    expect(UNPINNED_IMAGE_ALLOWLIST.has("Petio")).toBe(false);
    expect(UNPINNED_IMAGE_ALLOWLIST.has("Jellyfin")).toBe(false);
  });
});
