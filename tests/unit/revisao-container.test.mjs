import { describe, expect, it } from "vitest";
import {
  CATEGORIAS,
  FRACO,
  PLACEHOLDER_MORTO,
  SECOES,
  SEGREDO,
  SISTEMA,
  mapaDeConflitos,
  premissas,
} from "../../scripts/revisao-container.mjs";

/**
 * Spec do gate de revisao container a container (Goal 18).
 *
 * Este gate bloqueia a CI e entrou no manifesto `compose-catalog` do
 * roqueos-kit. Gate bloqueante sem teste e gate em que ninguem confia: se ele
 * afrouxar sozinho, o repo volta a ficar verde com icone quebrado em producao,
 * que foi exatamente o estado de 14/09/2026 antes dele existir.
 *
 * Cada caso abaixo congela um defeito REAL encontrado naquele dia.
 */

/** Monta um app minimo em memoria, no formato que `premissas` espera. */
function app(overrides = {}) {
  const compose = {
    services: {
      web: {
        image: "exemplo/app:1.2.3",
        restart: "unless-stopped",
        ports: [{ target: 8080, published: "8080", protocol: "tcp" }],
        "x-casaos": {
          ports: [{ container: "8080", description: { en_us: "Web interface" } }],
        },
        volumes: [{ source: "/DATA/AppData/$AppID", target: "/data" }],
        ...overrides.servico,
      },
    },
    "x-casaos": {
      main: "web",
      category: "Utilities",
      architectures: ["amd64", "arm64"],
      tagline: { en_us: "A thing", pt_br: "Uma coisa" },
      description: { en_us: "Does a thing.", pt_br: "Faz uma coisa." },
      ...overrides.casaos,
    },
    "x-roqueos": overrides.roqueos ?? {},
  };
  return { dir: overrides.dir ?? "/naoexiste", nome: overrides.nome ?? "Exemplo", compose, x: compose["x-casaos"], xr: compose["x-roqueos"] };
}

const conflitosVazios = new Map();

describe("P1 — compatibilidade com o RoqueOS", () => {
  it("reprova categoria que o CATEGORY_MAP do server nao conhece", () => {
    const p = premissas(app({ casaos: { category: "Downloader" } }), conflitosVazios);
    expect(p.P1.join(" ")).toMatch(/Downloader.*other/);
  });

  it("aceita as 14 categorias que o server mapeia", () => {
    for (const cat of CATEGORIAS) {
      const p = premissas(app({ casaos: { category: cat } }), conflitosVazios);
      expect(p.P1, `categoria ${cat}`).toEqual([]);
    }
  });

  it("reprova x-casaos.main que nao resolve nenhum servico", () => {
    const p = premissas(app({ casaos: { main: "naoexiste" } }), conflitosVazios);
    expect(p.P1.join(" ")).toMatch(/nao resolve|não resolve/);
  });

  it("reprova architectures vazio", () => {
    const p = premissas(app({ casaos: { architectures: [] } }), conflitosVazios);
    expect(p.P1.join(" ")).toMatch(/architectures/);
  });
});

describe("P2 — portas", () => {
  it("reprova porta publicada sem descricao", () => {
    const p = premissas(app({ servico: { "x-casaos": { ports: [] } } }), conflitosVazios);
    expect(p.P2.join(" ")).toMatch(/8080 sem descrição/);
  });

  it("reprova descricao VAZIA, nao so descricao ausente", () => {
    // O defeito real: 104 entradas existiam com `en_us: ''`. Uma checagem que
    // so olha se a entrada existe da tudo verde com a loja mostrando nada.
    const p = premissas(
      app({ servico: { "x-casaos": { ports: [{ container: "8080", description: { en_us: "" } }] } } }),
      conflitosVazios,
    );
    expect(p.P2.join(" ")).toMatch(/sem descrição/);
  });

  it("reprova conflito de porta host nao declarado, e aceita quando declarado", () => {
    const conflito = new Map([["8080", ["Exemplo", "Outro"]]]);
    expect(premissas(app(), conflito).P2.join(" ")).toMatch(/disputada/);
    expect(premissas(app({ roqueos: { portaCompartilhada: true } }), conflito).P2).toEqual([]);
  });
});

describe("P3 — variaveis", () => {
  it("pega MONGO_PASS=pass, que a primeira versao do regex deixou passar", () => {
    const p = premissas(app({ servico: { environment: ["MONGO_PASS=pass"] } }), conflitosVazios);
    expect(p.P3.join(" ")).toMatch(/MONGO_PASS/);
  });

  it("pega placeholder que ninguem substitui", () => {
    // $default_pwd foi inventado numa passada deste goal e nada o resolvia:
    // pior que a senha fraca que ele trocou.
    const p = premissas(app({ servico: { environment: ["ADMIN_PASSWORD=$default_pwd"] } }), conflitosVazios);
    expect(p.P3.join(" ")).toMatch(/placeholder/);
  });

  it("aceita o padrao da casa e substituicao de verdade", () => {
    for (const valor of ["change-me-on-first-boot", "$SENHA_DO_INSTALADOR"]) {
      const p = premissas(app({ servico: { environment: [`ADMIN_PASSWORD=${valor}`] } }), conflitosVazios);
      expect(p.P3, valor).toEqual([]);
    }
  });

  it("SEGREDO e FRACO cobrem os nomes e valores que ja apareceram no catalogo", () => {
    for (const k of ["USER_PASSWORD", "MONGO_PASS", "AP_API_KEY", "JWT_SECRET", "AUTH_TOKEN"])
      expect(SEGREDO.test(k), k).toBe(true);
    for (const v of ["root", "pass", "admin", "changeme", "1234"]) expect(FRACO.test(v), v).toBe(true);
    expect(PLACEHOLDER_MORTO.test("$default_pwd")).toBe(true);
  });
});

describe("P4 — configuracao", () => {
  it("reprova :latest", () => {
    const p = premissas(app({ servico: { image: "exemplo/app:latest" } }), conflitosVazios);
    expect(p.P4.join(" ")).toMatch(/:latest/);
  });

  it("aceita digest, que e como as 15 sem versao foram fixadas", () => {
    const p = premissas(app({ servico: { image: "exemplo/app@sha256:" + "a".repeat(64) } }), conflitosVazios);
    expect(p.P4).toEqual([]);
  });

  it("reprova servico sem restart", () => {
    const p = premissas(app({ servico: { restart: undefined } }), conflitosVazios);
    expect(p.P4.join(" ")).toMatch(/sem restart/);
  });

  it("aceita montagem de sistema e reprova caminho da maquina de quem empacotou", () => {
    // A primeira versao da regra acusou 46 volumes, sendo 7 o socket do Docker
    // que o Portainer precisa e 9 fuso horario. O que interessa e o caminho que
    // so existe numa maquina: o Jenkin montava um hash de volume.
    for (const src of ["/var/run/docker.sock", "/etc/localtime", "/dev/dri", "/proc", "/DATA", "/DATA/AppData/x"]) {
      const p = premissas(app({ servico: { volumes: [{ source: src, target: "/x" }] } }), conflitosVazios);
      expect(p.P4, src).toEqual([]);
    }
    const ruim = premissas(
      app({ servico: { volumes: [{ source: "/var/lib/docker/volumes/abc123/_data", target: "/x" }] } }),
      conflitosVazios,
    );
    expect(ruim.P4.join(" ")).toMatch(/não é \/DATA/);
  });

  it("SISTEMA nao abre a mao para um caminho qualquer sob /var", () => {
    expect(SISTEMA.some((re) => re.test("/var/lib/qualquer-coisa"))).toBe(false);
  });
});

describe("P5 — privilegio declarado, nunca removido", () => {
  it("reprova privileged, host e cap_add sem motivo", () => {
    const p = premissas(
      app({ servico: { privileged: true, network_mode: "host", cap_add: ["NET_ADMIN"] } }),
      conflitosVazios,
    );
    expect(p.P5).toHaveLength(3);
  });

  it("aceita quando o motivo esta escrito", () => {
    const p = premissas(
      app({
        servico: { privileged: true, network_mode: "host", cap_add: ["NET_ADMIN"] },
        roqueos: {
          motivo: {
            privileged: "acesso ao acelerador de inferencia em /dev",
            networkHost: "descoberta de dispositivos por mDNS na rede local",
            capAdd: "NET_ADMIN para criar a interface de rede",
          },
        },
      }),
      conflitosVazios,
    );
    expect(p.P5).toEqual([]);
  });
});

describe("P7 — texto da loja na grafia que o server le", () => {
  it("reprova en_US maiusculo, que para o roqueos-server nao existe", () => {
    // 44 apps apareciam na App Store com o NOME DA PASTA por causa disto.
    const p = premissas(
      app({ casaos: { tagline: { en_US: "A thing", pt_br: "Uma coisa" } } }),
      conflitosVazios,
    );
    expect(p.P7.join(" ")).toMatch(/tagline\.en_us/);
  });

  it("reprova falta de pt_br", () => {
    const p = premissas(app({ casaos: { description: { en_us: "Does a thing." } } }), conflitosVazios);
    expect(p.P7.join(" ")).toMatch(/description\.pt_br/);
  });
});

describe("P8 — icone", () => {
  it("reprova quando o arquivo nao existe, mesmo com o campo preenchido", () => {
    // O audit dizia `icon present 205/205` enquanto 54 apps davam 404 no CDN.
    const p = premissas(app({ dir: "/pasta/que/nao/existe" }), conflitosVazios);
    expect(p.P8.join(" ")).toMatch(/sem icon\.png/);
  });

  it("nao cobra thumbnail nem screenshot: a loja nao os desenha", () => {
    const p = premissas(app({ dir: "/pasta/que/nao/existe" }), conflitosVazios);
    expect(p.P8.join(" ")).not.toMatch(/thumbnail|screenshot/);
  });
});

describe("P6 — README de ficha", () => {
  it("exige as seis secoes que a loja precisa", () => {
    expect(SECOES.map((s) => s.chave)).toEqual([
      "oque",
      "portas",
      "volumes",
      "envs",
      "primeiroAcesso",
      "fonte",
    ]);
  });

  it("reprova app sem README", () => {
    const p = premissas(app({ dir: "/pasta/que/nao/existe" }), conflitosVazios);
    expect(p.P6.join(" ")).toMatch(/sem README/);
  });
});

describe("mapaDeConflitos", () => {
  it("devolve mapa vazio quando nao ha Apps/ para ler", () => {
    expect(mapaDeConflitos([])).toBeInstanceOf(Map);
    expect(mapaDeConflitos([]).size).toBe(0);
  });
});

describe("um app completo fecha as nove premissas", () => {
  it("so o README e o icone sobram, porque dependem de arquivo no disco", () => {
    const p = premissas(app(), conflitosVazios);
    for (const chave of ["P1", "P2", "P3", "P4", "P5", "P7", "P9"]) {
      expect(p[chave], chave).toEqual([]);
    }
  });
});
