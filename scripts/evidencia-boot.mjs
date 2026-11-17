#!/usr/bin/env node
// Junta a evidencia de boot dos runs do CI num arquivo versionado.
//
// O workflow Boot sobe cada container num runner Linux e grava um JSON por app
// em .boot/, que vai para o CI como artefato e some em 90 dias. Uma pagina de
// qualidade que cita "N apps de pe" precisa de fonte no repo, entao este script
// le os artefatos baixados e escreve docs/evidence/boot.json: o resultado mais
// recente de cada app que ainda esta na loja, com o run e a data que o provam.
//
//   gh run download <run> -n boot -D /tmp/boot-<run>
//   node scripts/evidencia-boot.mjs <run>@<data-iso>@/tmp/boot-<run> [...]
//
// Os runs entram em ordem: um run posterior sobrescreve o resultado do anterior.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
export const ARQUIVO = join(RAIZ, 'docs', 'evidence', 'boot.json')

/** O resultado de um app num run, no formato curto da evidencia versionada. */
export function resumo(r, run, quando) {
  const resultado = r.ok ? 'ok' : r.inconclusivo ? 'inconclusivo' : 'falha'
  const out = { resultado, segundos: r.segundos ?? null, run, quando }
  if (r.inconclusivo) out.motivo = r.inconclusivo
  if (!r.ok && !r.inconclusivo) out.etapa = r.etapa || null
  return out
}

/** Junta os runs (em ordem) e fica com o ultimo resultado de cada app da loja. */
export function junta(runs, appsDaLoja) {
  const apps = {}
  for (const { run, quando, resultados } of runs) {
    for (const r of resultados) {
      if (!r?.app || !appsDaLoja.has(r.app)) continue
      apps[r.app] = resumo(r, run, quando)
    }
  }
  const ordenado = Object.fromEntries(Object.keys(apps).sort().map((k) => [k, apps[k]]))
  return {
    origem: 'workflow Boot (.github/workflows/boot.yml), runner Linux do GitHub',
    runs: runs.map(({ run, quando }) => ({ run, quando })),
    apps: ordenado,
  }
}

function leDir(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json') && f !== 'resumo.json')
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')))
}

const isCli = import.meta.url === pathToFileURL(process.argv[1] || '').href
if (isCli) {
  const args = process.argv.slice(2)
  if (!args.length) {
    console.error('uso: node scripts/evidencia-boot.mjs <run>@<data-iso>@<pasta> [...]')
    process.exit(2)
  }
  const appsDaLoja = new Set(
    readdirSync(join(RAIZ, 'Apps'), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name),
  )
  const runs = args.map((a) => {
    const [run, quando, ...resto] = a.split('@')
    const dir = resto.join('@')
    if (!existsSync(dir)) throw new Error(`pasta nao existe: ${dir}`)
    return { run: Number(run), quando, resultados: leDir(dir) }
  })
  const evid = junta(runs, appsDaLoja)
  mkdirSync(dirname(ARQUIVO), { recursive: true })
  writeFileSync(ARQUIVO, JSON.stringify(evid, null, 2) + '\n')
  const n = Object.values(evid.apps)
  console.log(
    `${n.length} apps com evidencia: ${n.filter((x) => x.resultado === 'ok').length} ok, ` +
      `${n.filter((x) => x.resultado === 'inconclusivo').length} inconclusivos, ` +
      `${n.filter((x) => x.resultado === 'falha').length} falhas`,
  )
}
