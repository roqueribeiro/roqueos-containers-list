import { describe, expect, it } from "vitest";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// x-roqueos.gerar e contrato com o roqueos-server: o que o schema aceitar, o
// instalador tenta gerar. Formato que ele nao conhece vira segredo que nao existe.
const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const schema = JSON.parse(readFileSync(join(RAIZ, "schema/casaos-app.schema.json"), "utf8"));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const valida = ajv.compile(schema);
const manifesto = (gerar) => ({
  name: "app",
  services: { app: { image: "x:1" } },
  "x-roqueos": { gerar },
});

describe("x-roqueos.gerar no schema", () => {
  it("aceita os cinco formatos que o server gera", () => {
    for (const formato of ["hex", "base64", "senha", "uuid", "laravel"])
      expect(valida(manifesto({ SEGREDO: { formato } })), formato).toBe(true);
  });

  it("aceita mostrar e descricao por idioma", () => {
    const ok = valida(
      manifesto({ ADMIN: { formato: "senha", tamanho: 24, mostrar: true, descricao: { pt_br: "Senha", en_us: "Password" } } }),
    );
    expect(ok).toBe(true);
  });

  it("recusa formato que o server nao conhece", () => {
    expect(valida(manifesto({ SEGREDO: { formato: "md5" } }))).toBe(false);
  });

  it("recusa nome que nao e variavel em maiusculas", () => {
    expect(valida(manifesto({ minha_senha: { formato: "senha" } }))).toBe(false);
  });

  it("recusa tamanho curto demais para ser segredo", () => {
    expect(valida(manifesto({ SEGREDO: { formato: "hex", tamanho: 4 } }))).toBe(false);
  });
});
