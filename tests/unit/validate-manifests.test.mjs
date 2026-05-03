import { describe, expect, it } from "vitest";
import {
  crossFieldChecks,
  findComposePath,
} from "../../scripts/validate-manifests.mjs";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  validMinimalManifest,
  multiServiceWithMain,
  multiServiceMissingMain,
  mainPointingToMissingService,
  networkModeHostNoPorts,
  multiPortMissingPortMap,
  portMapNotInPublishedPorts,
  mountSharedNonBoolean,
} from "../fixtures/manifests.mjs";

describe("crossFieldChecks", () => {
  describe("1. main → must reference a real service", () => {
    it("passes when main points to an existing service", () => {
      expect(crossFieldChecks(validMinimalManifest())).toEqual([]);
    });

    it("fails when main points to a non-existent service", () => {
      const errors = crossFieldChecks(mainPointingToMissingService());
      expect(errors).toContain(
        'x-casaos.main "ghost-service" does not match any service',
      );
    });

    it("passes when main is undefined and there is only one service", () => {
      const doc = validMinimalManifest();
      delete doc["x-casaos"].main;
      expect(crossFieldChecks(doc)).toEqual([]);
    });
  });

  describe("2. multi-service stacks need x-casaos.main", () => {
    it("passes when multi-service has main declared", () => {
      expect(crossFieldChecks(multiServiceWithMain())).toEqual([]);
    });

    it("fails when multi-service is missing main", () => {
      const errors = crossFieldChecks(multiServiceMissingMain());
      expect(errors.some((e) => e.includes("multi-service compose"))).toBe(
        true,
      );
      expect(errors.some((e) => e.includes("without x-casaos.main"))).toBe(
        true,
      );
    });

    it("error message includes the service count", () => {
      const errors = crossFieldChecks(multiServiceMissingMain());
      // Fixture has 3 services
      expect(errors.find((e) => e.includes("multi-service"))).toMatch(
        /\(3 services\)/,
      );
    });
  });

  describe("3. port_map matches published HOST port", () => {
    it('passes when port_map matches the host side of "host:container" string', () => {
      // multiServiceWithMain has nginx with `'3000:80'` and port_map '3000'
      expect(crossFieldChecks(multiServiceWithMain())).toEqual([]);
    });

    it("fails when port_map is not in published ports", () => {
      const errors = crossFieldChecks(portMapNotInPublishedPorts());
      // Error message lists the actual published HOST ports — should be ['3000']
      expect(errors[0]).toContain('x-casaos.port_map="8080"');
      expect(errors[0]).toContain('not in published ports of "app"');
      expect(errors[0]).toContain("[3000]");
    });

    it('extracts host port from "host:container" shorthand correctly', () => {
      const doc = {
        services: {
          app: { image: "x:1", ports: ["8080:80"] },
        },
        "x-casaos": { main: "app", port_map: "8080" },
      };
      expect(crossFieldChecks(doc)).toEqual([]);
    });

    it('extracts host port from "ip:host:container" 3-part shorthand', () => {
      const doc = {
        services: {
          app: { image: "x:1", ports: ["127.0.0.1:8080:80"] },
        },
        "x-casaos": { main: "app", port_map: "8080" },
      };
      expect(crossFieldChecks(doc)).toEqual([]);
    });

    it("extracts host port from object form { target, published }", () => {
      const doc = {
        services: {
          app: {
            image: "x:1",
            ports: [{ target: 80, published: "9000", protocol: "tcp" }],
          },
        },
        "x-casaos": { main: "app", port_map: "9000" },
      };
      expect(crossFieldChecks(doc)).toEqual([]);
    });

    it("exempts apps with network_mode: host AND empty ports list", () => {
      // Plex / HomeAssistant / Tailscale pattern
      expect(crossFieldChecks(networkModeHostNoPorts())).toEqual([]);
    });

    it('error message annotates "(network_mode: host)" when host mode is set but check still fails', () => {
      const doc = networkModeHostNoPorts();
      doc.services.app.ports = ["80:80"]; // now has ports — but port_map=8080 doesn't match
      const errors = crossFieldChecks(doc);
      expect(errors[0]).toContain("(network_mode: host)");
    });

    it("also strips /protocol suffix (tcp/udp) before extracting port", () => {
      const doc = {
        services: {
          app: { image: "x:1", ports: ["9000:80/tcp"] },
        },
        "x-casaos": { main: "app", port_map: "9000" },
      };
      expect(crossFieldChecks(doc)).toEqual([]);
    });
  });

  describe("4. multi-port principal services need port_map", () => {
    it("fails when multi-port has no port_map", () => {
      const errors = crossFieldChecks(multiPortMissingPortMap());
      expect(
        errors.some((e) =>
          e.includes("exposes 2 ports but x-casaos.port_map is missing"),
        ),
      ).toBe(true);
    });

    it("passes when multi-port declares port_map", () => {
      const doc = multiPortMissingPortMap();
      doc["x-casaos"].port_map = "443";
      expect(crossFieldChecks(doc)).toEqual([]);
    });

    it("skips the multi-port check when network_mode: host is set", () => {
      const doc = multiPortMissingPortMap();
      doc.services.app.network_mode = "host";
      delete doc["x-casaos"].port_map;
      const errors = crossFieldChecks(doc);
      // Multi-port complaint should NOT trigger (host mode skips it)
      expect(
        errors.some((e) =>
          e.includes("exposes 2 ports but x-casaos.port_map is missing"),
        ),
      ).toBe(false);
    });

    it("passes when single-port and no port_map (no obligation)", () => {
      const doc = validMinimalManifest();
      delete doc["x-casaos"].port_map;
      expect(crossFieldChecks(doc)).toEqual([]);
    });
  });

  describe("5. x-roqueos.mountShared must be boolean", () => {
    it("passes when mountShared is true", () => {
      const doc = validMinimalManifest();
      doc["x-roqueos"] = { mountShared: true };
      expect(crossFieldChecks(doc)).toEqual([]);
    });

    it("passes when mountShared is false", () => {
      const doc = validMinimalManifest();
      doc["x-roqueos"] = { mountShared: false };
      expect(crossFieldChecks(doc)).toEqual([]);
    });

    it("passes when mountShared is undefined (optional field)", () => {
      expect(crossFieldChecks(validMinimalManifest())).toEqual([]);
    });

    it('fails when mountShared is a string ("yes")', () => {
      const errors = crossFieldChecks(mountSharedNonBoolean());
      expect(errors[0]).toContain("x-roqueos.mountShared must be a boolean");
      expect(errors[0]).toContain("got string");
    });

    it("fails when mountShared is a number (1)", () => {
      const doc = validMinimalManifest();
      doc["x-roqueos"] = { mountShared: 1 };
      const errors = crossFieldChecks(doc);
      expect(errors[0]).toContain("got number");
    });
  });

  describe("edge cases", () => {
    it("handles completely empty doc gracefully (no crash, returns empty errors)", () => {
      expect(crossFieldChecks({})).toEqual([]);
    });

    it("handles missing services and x-casaos", () => {
      expect(crossFieldChecks({ name: "foo" })).toEqual([]);
    });

    it("returns multiple errors when multiple invariants fail", () => {
      const doc = mainPointingToMissingService();
      doc["x-roqueos"] = { mountShared: "no" };
      const errors = crossFieldChecks(doc);
      expect(errors.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe("findComposePath", () => {
  it("returns the .yml path when only docker-compose.yml exists", async () => {
    const dir = await mkdtemp(join(tmpdir(), "roqueos-test-"));
    try {
      await writeFile(join(dir, "docker-compose.yml"), "name: test");
      const result = await findComposePath(dir);
      expect(result).toBe(join(dir, "docker-compose.yml"));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("returns the .yaml path when only docker-compose.yaml exists", async () => {
    const dir = await mkdtemp(join(tmpdir(), "roqueos-test-"));
    try {
      await writeFile(join(dir, "docker-compose.yaml"), "name: test");
      const result = await findComposePath(dir);
      expect(result).toBe(join(dir, "docker-compose.yaml"));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("prefers .yml over .yaml when both exist", async () => {
    const dir = await mkdtemp(join(tmpdir(), "roqueos-test-"));
    try {
      await writeFile(join(dir, "docker-compose.yml"), "name: yml");
      await writeFile(join(dir, "docker-compose.yaml"), "name: yaml");
      const result = await findComposePath(dir);
      expect(result).toBe(join(dir, "docker-compose.yml"));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("returns null when neither exists", async () => {
    const dir = await mkdtemp(join(tmpdir(), "roqueos-test-"));
    try {
      const result = await findComposePath(dir);
      expect(result).toBeNull();
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("returns null for nonexistent directory", async () => {
    const result = await findComposePath(
      "/nonexistent/path/that/does/not/exist",
    );
    expect(result).toBeNull();
  });
});
