// Inline test manifests as JS objects (the parsed shape — skip the YAML
// load step since cross-field tests work on the doc directly). Each
// builder returns a fresh object so tests can mutate without polluting.

export function validMinimalManifest() {
  return {
    name: "my-app",
    services: {
      "my-app": {
        image: "vendor/my-app:1.0.0",
        ports: ["8080:8080"],
      },
    },
    "x-casaos": {
      architectures: ["amd64"],
      main: "my-app",
      category: "Productivity",
      scheme: "http",
      port_map: "8080",
    },
  };
}

export function multiServiceWithMain() {
  return {
    name: "multi",
    services: {
      web: { image: "vendor/web:1.0" },
      nginx: {
        image: "nginx:1.25",
        ports: ["3000:80"],
      },
      db: { image: "postgres:15" },
    },
    "x-casaos": {
      architectures: ["amd64"],
      main: "nginx",
      category: "Productivity",
      scheme: "http",
      port_map: "3000",
    },
  };
}

export function multiServiceMissingMain() {
  const doc = multiServiceWithMain();
  delete doc["x-casaos"].main;
  return doc;
}

export function mainPointingToMissingService() {
  const doc = validMinimalManifest();
  doc["x-casaos"].main = "ghost-service";
  return doc;
}

export function networkModeHostNoPorts() {
  return {
    name: "host-app",
    services: {
      app: {
        image: "vendor/host-app:1.0",
        network_mode: "host",
        // No ports declared — host network publishes everything
      },
    },
    "x-casaos": {
      architectures: ["amd64"],
      main: "app",
      category: "Network",
      scheme: "http",
      port_map: "8080", // valid even without ports[] when network_mode: host
    },
  };
}

export function multiPortMissingPortMap() {
  return {
    name: "multiport",
    services: {
      app: {
        image: "vendor/app:1.0",
        ports: ["80:80", "443:443"],
      },
    },
    "x-casaos": {
      architectures: ["amd64"],
      main: "app",
      category: "Network",
      scheme: "http",
      // port_map missing!
    },
  };
}

export function portMapNotInPublishedPorts() {
  return {
    name: "wrong",
    services: {
      app: {
        image: "vendor/app:1.0",
        ports: ["3000:80"], // host=3000, container=80
      },
    },
    "x-casaos": {
      architectures: ["amd64"],
      main: "app",
      category: "Network",
      scheme: "http",
      port_map: "8080", // not in published ports
    },
  };
}

export function mountSharedNonBoolean() {
  const doc = validMinimalManifest();
  doc["x-roqueos"] = { mountShared: "yes" }; // wrong type
  return doc;
}

export function manifestWithUntaggedImages() {
  return {
    name: "untagged",
    services: {
      app: { image: "vendor/app" }, // no tag
      worker: { image: "vendor/worker:latest" }, // :latest
      good: { image: "vendor/good:1.0" }, // valid
    },
    "x-casaos": {
      architectures: ["amd64"],
      main: "app",
      category: "Other",
      scheme: "http",
    },
  };
}

export function manifestForI18nAudit() {
  return {
    name: "i18n-app",
    services: {
      app: { image: "vendor/app:1.0" },
    },
    "x-casaos": {
      architectures: ["amd64"],
      main: "app",
      category: "Productivity",
      scheme: "http",
      title: { en_US: "I18n App" },
      tagline: {
        en_US: "English tagline",
        pt_BR: "Tagline em português",
      },
      description: {
        en_US: "English description",
        // pt_BR missing on purpose for audit gap test
      },
      icon: "https://example.com/icon.png",
      thumbnail: "https://example.com/thumb.png",
      screenshot_link: ["https://example.com/s1.png"],
    },
  };
}
