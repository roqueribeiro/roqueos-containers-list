import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gerar, tabela, txt } from "../../scripts/gera-readme.mjs";

/**
 * Spec do gerador de ficha de loja (`yarn readme`, Goal 18).
 *
 * A ficha nao e texto livre: cada linha dela sai do docker-compose.yml, que e o
 * que o usuario vai de fato rodar. Se o gerador inventar, o README passa a
 * mentir sobre porta, volume e variavel — e e justamente por isso que ele
 * existe, em vez de 217 READMEs escritos a mao.
 */

let raiz;

const COMPOSE = `
name: exemplo
services:
  web:
    image: exemplo/app:1.2.3
    restart: unless-stopped
    ports:
      - target: 8080
        published: '9090'
        protocol: tcp
    environment:
      - ADMIN_PASSWORD=change-me-on-first-boot
    volumes:
      - type: bind
        source: /DATA/AppData/$AppID
        target: /data
    x-casaos:
      ports:
        - container: '8080'
          description:
            en_us: Web interface
            pt_br: Interface web
x-casaos:
  main: web
  category: Utilities
  architectures: [amd64, arm64]
  port_map: '9090'
  scheme: http
  index: /
  developer: Fulano
  title:
    en_us: Exemplo
  tagline:
    en_us: A thing
    pt_br: Uma coisa
  description:
    en_us: Does a thing.
    pt_br: Faz uma coisa.
  tips:
    before_install:
      pt_br: |
        Troque a senha antes do primeiro boot.
        Monte o config em /data.
x-roqueos:
  portaCompartilhada: true
  motivo:
    privileged: acesso ao acelerador de inferencia em /dev
`;

beforeAll(() => {
  raiz = mkdtempSync(join(tmpdir(), "gera-readme-"));
  mkdirSync(join(raiz, "Exemplo"), { recursive: true });
  writeFileSync(join(raiz, "Exemplo", "docker-compose.yml"), COMPOSE);
});

afterAll(() => rmSync(raiz, { recursive: true, force: true }));

describe("txt — a cadeia de fallback de idioma", () => {
  it("prefere o idioma pedido", () => {
    expect(txt({ pt_br: "oi", en_us: "hi" }, "pt_br")).toBe("oi");
  });

  it("cai no en_us quando o idioma nao existe", () => {
    expect(txt({ en_us: "hi" }, "pt_br")).toBe("hi");
  });

  it("aceita en_US maiusculo como ultimo recurso, e devolve vazio sem nada", () => {
    expect(txt({ en_US: "hi" }, "pt_br")).toBe("hi");
    expect(txt(undefined, "pt_br")).toBe("");
  });
});

describe("tabela", () => {
  it("diz 'Nenhum' em vez de desenhar cabecalho vazio", () => {
    expect(tabela(["A", "B"], [])).toMatch(/Nenhum/);
  });

  it("alinha pela coluna mais larga", () => {
    const t = tabela(["Host", "Porta"], [["8080", "web"]]);
    const linhas = t.split("\n");
    expect(linhas[0]).toContain("Host");
    expect(linhas[1]).toMatch(/^\| -+ \| -+ \|$/);
    expect(linhas[2]).toContain("8080");
  });
});

describe("gerar — a ficha sai do manifesto, nao de invencao", () => {
  let md;
  beforeAll(() => {
    md = gerar("Exemplo", raiz);
  });

  it("devolve null para pasta sem compose", () => {
    expect(gerar("NaoExiste", raiz)).toBeNull();
  });

  it("usa o titulo e o texto em portugues", () => {
    expect(md).toMatch(/^# Exemplo/);
    expect(md).toContain("Uma coisa");
    expect(md).toContain("Faz uma coisa.");
  });

  it("publica a porta do HOST, que e a que o usuario abre, e a descricao dela", () => {
    expect(md).toContain("9090");
    expect(md).toContain("Interface web");
  });

  it("lista volume, variavel e imagem exatamente como estao no compose", () => {
    expect(md).toContain("/DATA/AppData/$AppID");
    expect(md).toContain("ADMIN_PASSWORD");
    expect(md).toContain("exemplo/app:1.2.3");
  });

  it("monta o endereco do primeiro acesso com scheme, port_map e index", () => {
    expect(md).toContain("http://<endereço-do-servidor>:9090/");
  });

  it("entende tips.before_install no formato de objeto de i18n", () => {
    // O catalogo tem as duas formas: lista de {content,value} em 37 apps e
    // objeto de i18n em 103. Escolher uma perderia a outra.
    expect(md).toContain("Troque a senha antes do primeiro boot.");
    expect(md).toContain("Monte o config em /data.");
  });

  it("avisa sobre porta disputada quando o app declara", () => {
    expect(md).toMatch(/disputada/);
  });

  it("mostra por que o app pede privilegio", () => {
    expect(md).toContain("acesso ao acelerador de inferencia em /dev");
  });

  it("aponta a fonte oficial", () => {
    expect(md).toMatch(/Fonte oficial[\s\S]*Fulano/);
  });

  it("fecha as seis secoes que a P6 do gate exige", () => {
    for (const re of [
      /^##+\s*O que é/im,
      /^##+\s*Portas/im,
      /^##+\s*Volumes/im,
      /^##+\s*Variáveis/im,
      /^##+\s*Primeiro acesso/im,
      /^##+\s*Fonte oficial/im,
    ]) {
      expect(md, String(re)).toMatch(re);
    }
  });

  it("passa dos 400 caracteres que a P6 exige", () => {
    expect(md.length).toBeGreaterThan(400);
  });
});
