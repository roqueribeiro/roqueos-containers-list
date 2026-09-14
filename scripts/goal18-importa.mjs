#!/usr/bin/env node
// Goal 18, ampliação: importa app da loja oficial do CasaOS.
//
// O formato é o mesmo (x-casaos), então o manifesto entra quase direto. O que
// NÃO entra direto é a qualidade: o app importado chega com categoria que o
// nosso server não conhece, sem português, com `:latest` e sem README. Por isso
// o import termina chamando a mesma esteira do Goal 18, e o `yarn revisao` é
// quem diz se o app pode ficar.
//
//   node scripts/goal18-importa.mjs OpenClaw NetBird Teable
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'https://raw.githubusercontent.com/IceWhaleTech/CasaOS-AppStore/main/Apps'
const API = 'https://api.github.com/repos/IceWhaleTech/CasaOS-AppStore/contents/Apps'
const alvos = process.argv.slice(2).filter((a) => !a.startsWith('--'))
if (!alvos.length) {
  console.error('uso: node scripts/goal18-importa.mjs <App> [App...]')
  process.exit(2)
}

const ok = []
const falhou = []

for (const app of alvos) {
  const destino = path.join('Apps', app)
  if (fs.existsSync(destino)) {
    falhou.push(`${app}: já existe em Apps/`)
    continue
  }
  try {
    const lista = await fetch(`${API}/${app}`, { signal: AbortSignal.timeout(25000) })
    if (!lista.ok) {
      falhou.push(`${app}: não achei na loja do CasaOS (HTTP ${lista.status})`)
      continue
    }
    const arquivos = (await lista.json()).filter((f) => f.type === 'file')
    const compose = arquivos.find((f) => f.name === 'docker-compose.yml')
    if (!compose) {
      falhou.push(`${app}: sem docker-compose.yml no upstream`)
      continue
    }
    fs.mkdirSync(destino, { recursive: true })
    let n = 0
    for (const f of arquivos) {
      // Só o manifesto e as imagens. appfile.json não entra: formato morto.
      if (f.name !== 'docker-compose.yml' && !/\.(png|jpg|jpeg|webp)$/i.test(f.name)) continue
      const r = await fetch(`${BASE}/${app}/${f.name}`, { signal: AbortSignal.timeout(30000) })
      if (!r.ok) continue
      fs.writeFileSync(path.join(destino, f.name), Buffer.from(await r.arrayBuffer()))
      n++
    }
    ok.push(`${app} (${n} arquivo(s))`)
  } catch (e) {
    falhou.push(`${app}: ${e.message.slice(0, 60)}`)
  }
}

console.log(`\nimportados: ${ok.length}`)
for (const l of ok) console.log(`  ${l}`)
console.log(`\nnão importados: ${falhou.length}`)
for (const l of falhou) console.log(`  ${l}`)
console.log(
  `\nAgora rode, nesta ordem:\n` +
    `  node scripts/rebrand-casaos.mjs\n` +
    `  node scripts/goal18-normaliza-idioma.mjs\n` +
    `  node scripts/goal18-fixa-tags.mjs && node scripts/goal18-fixa-digest.mjs\n` +
    `  node scripts/goal18-portas.mjs && node scripts/goal18-icones.mjs\n` +
    `  node scripts/gera-readme.mjs && yarn revisao`,
)
