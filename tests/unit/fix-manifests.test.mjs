import { describe, expect, it } from "vitest";
import {
  pickScheme,
  isImagePinned,
  MOUNT_SHARED_APPS,
  findComposePath,
} from "../../scripts/fix-manifests.mjs";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("pickScheme", () => {
  it('returns "https" when port 443 is published as object form', () => {
    const services = {
      app: {
        ports: [
          { target: 80, published: "8080" },
          { target: 443, published: "443" },
        ],
      },
    };
    expect(pickScheme(services, "app")).toBe("https");
  });

  it('returns "https" when port 443 is in "host:container" string form', () => {
    const services = {
      app: { ports: ["8080:80", "443:443"] },
    };
    expect(pickScheme(services, "app")).toBe("https");
  });

  it('returns "http" when port 443 is NOT published', () => {
    const services = {
      app: { ports: [{ target: 80, published: "80" }] },
    };
    expect(pickScheme(services, "app")).toBe("http");
  });

  it('returns "http" when service has no ports', () => {
    const services = { app: {} };
    expect(pickScheme(services, "app")).toBe("http");
  });

  it('returns "http" when service does not exist (defensive)', () => {
    expect(pickScheme({}, "nonexistent")).toBe("http");
  });

  it("strips protocol suffix /tcp before checking port", () => {
    const services = {
      app: { ports: ["443:443/tcp"] },
    };
    expect(pickScheme(services, "app")).toBe("https");
  });

  it("checks the CONTAINER port for 443 (not the host port)", () => {
    const services = {
      app: { ports: ["80:443"] }, // host=80, container=443
    };
    // Container port is what the script splits to, takes last token
    expect(pickScheme(services, "app")).toBe("https");
  });
});

describe("isImagePinned", () => {
  it('returns true for "vendor/image:1.2.3"', () => {
    expect(isImagePinned("vendor/image:1.2.3")).toBe(true);
  });

  it('returns true for tag with digest "vendor/image:1.0.0@sha256:abc"', () => {
    expect(isImagePinned("vendor/image:1.0.0@sha256:abc")).toBe(true);
  });

  it('returns true for "vendor/image:nightly"', () => {
    expect(isImagePinned("vendor/image:nightly")).toBe(true);
  });

  it('returns false for "vendor/image:latest"', () => {
    expect(isImagePinned("vendor/image:latest")).toBe(false);
  });

  it('returns false for bare "vendor/image" (no tag)', () => {
    expect(isImagePinned("vendor/image")).toBe(false);
  });

  it("returns false for null / undefined / empty string", () => {
    expect(isImagePinned(null)).toBe(false);
    expect(isImagePinned(undefined)).toBe(false);
    expect(isImagePinned("")).toBe(false);
  });

  it("returns false for non-string types (numbers, objects)", () => {
    expect(isImagePinned(42)).toBe(false);
    expect(isImagePinned({})).toBe(false);
    expect(isImagePinned([])).toBe(false);
  });
});

describe("MOUNT_SHARED_APPS curated set", () => {
  it("is a Set with at least 49 entries (matches the documented curated count)", () => {
    expect(MOUNT_SHARED_APPS).toBeInstanceOf(Set);
    expect(MOUNT_SHARED_APPS.size).toBeGreaterThanOrEqual(49);
  });

  it("contains canonical media servers", () => {
    expect(MOUNT_SHARED_APPS.has("Jellyfin")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("Plex")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("Emby")).toBe(true);
  });

  it("contains canonical downloaders", () => {
    expect(MOUNT_SHARED_APPS.has("qBittorrent")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("Transmission")).toBe(true);
  });

  it("contains the *arr stack", () => {
    expect(MOUNT_SHARED_APPS.has("Sonarr")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("Radarr")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("Lidarr")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("Bazarr")).toBe(true);
  });

  it("contains canonical file managers", () => {
    expect(MOUNT_SHARED_APPS.has("FileBrowser")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("Nextcloud")).toBe(true);
  });

  it("contains game library managers (special non-Media category)", () => {
    expect(MOUNT_SHARED_APPS.has("RomM")).toBe(true);
    expect(MOUNT_SHARED_APPS.has("EmulatorJS")).toBe(true);
  });

  it("does NOT contain streaming clients (not media servers)", () => {
    // Stremio, Tautulli are documented as excluded — they don't need /shared
    expect(MOUNT_SHARED_APPS.has("Stremio")).toBe(false);
    expect(MOUNT_SHARED_APPS.has("Tautulli")).toBe(false);
  });

  it("case-sensitive matches exact directory name", () => {
    // 'jellyfin' (lowercase) should NOT match — uses Apps/ dir name casing
    expect(MOUNT_SHARED_APPS.has("jellyfin")).toBe(false);
    expect(MOUNT_SHARED_APPS.has("JELLYFIN")).toBe(false);
  });
});

describe("findComposePath (re-exported)", () => {
  it("returns null when neither file exists", async () => {
    const dir = await mkdtemp(join(tmpdir(), "fix-test-"));
    try {
      expect(await findComposePath(dir)).toBeNull();
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("finds .yaml fallback when only .yaml exists", async () => {
    const dir = await mkdtemp(join(tmpdir(), "fix-test-"));
    try {
      await writeFile(join(dir, "docker-compose.yaml"), "name: x");
      const result = await findComposePath(dir);
      expect(result).toBe(join(dir, "docker-compose.yaml"));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
