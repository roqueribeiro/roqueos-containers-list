#!/usr/bin/env node
// Importa app do catálogo Big Bear (MIT, formato CasaOS).
//
// O manifesto do Big Bear é bom — imagem já fixada com digest, portas e volumes
// descritos — mas ele carimba a marca deles em tudo: `name: big-bear-dockge`,
// `container_name: big-bear-dockge`, e caminhos de volume com
// `/DATA/AppData/big-bear-dockge/...` escritos à mão em vez de `$AppID`.
//
// Copiar sem tratar isso significaria instalar um app chamado "big-bear-x" no
// servidor de quem usa RoqueOS, com dados numa pasta de outra marca. Este
// script tira o carimbo e devolve o `$AppID`, que é o que o instalador resolve.
//
//   node scripts/goal18-importa-bigbear.mjs dockge dozzle gluetun
import fs from 'node:fs'
import path from 'node:path'

const API = 'https://api.github.com/repos/bigbeartechworld/big-bear-casaos/contents/Apps'
const RAW = 'https://raw.githubusercontent.com/bigbeartechworld/big-bear-casaos/master/Apps'
const alvos = process.argv.slice(2).filter((a) => !a.startsWith('--'))
if (!alvos.length) {
  console.error('uso: node scripts/goal18-importa-bigbear.mjs <app> [app...]')
  process.exit(2)
}

/** Nome da pasta no nosso catálogo: `dockge` -> `Dockge`, `it-tools` -> `ItTools`. */
export function nomeDaPasta(slug) {
  return slug
    .replace(/^big-bear-/, '')
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')
}

/** Tira o carimbo do Big Bear e devolve `$AppID` onde o caminho era da marca. */
export function limpar(texto, slug) {
  const marca = `big-bear-${slug.replace(/^big-bear-/, '')}`
  return texto
    .replace(new RegExp(`/DATA/AppData/${marca}`, 'g'), '/DATA/AppData/$AppID')
    .replace(new RegExp(`\\b${marca}\\b`, 'g'), slug.replace(/^big-bear-/, ''))
    .replace(/^# .*big-bear.*$/gim, '')
    .replace(/\bBig Bear\b/g, 'RoqueOS')
    .replace(/bigbeartechworld\/big-bear-casaos/g, 'roqueribeiro/roqueos-containers-list')
}

const ok = []
const falhou = []

for (const slug of alvos) {
  const nome = nomeDaPasta(slug)
  const destino = path.join('Apps', nome)
  if (fs.existsSync(destino)) {
    falhou.push(`${slug} -> ${nome}: já existe`)
    continue
  }
  try {
    const lista = await fetch(`${API}/${slug}`, { signal: AbortSignal.timeout(25000) })
    if (!lista.ok) {
      falhou.push(`${slug}: HTTP ${lista.status}`)
      continue
    }
    const arquivos = (await lista.json()).filter((f) => f.type === 'file')
    if (!arquivos.some((f) => f.name === 'docker-compose.yml')) {
      falhou.push(`${slug}: sem docker-compose.yml`)
      continue
    }
    fs.mkdirSync(destino, { recursive: true })
    // Só o manifesto: `config.json` é formato interno do Big Bear e não é lido
    // por ninguém aqui, do mesmo jeito que o appfile.json não era.
    const r = await fetch(`${RAW}/${slug}/docker-compose.yml`, { signal: AbortSignal.timeout(30000) })
    fs.writeFileSync(path.join(destino, 'docker-compose.yml'), limpar(await r.text(), slug))
    ok.push(`${slug} -> ${nome}`)
  } catch (e) {
    falhou.push(`${slug}: ${e.message.slice(0, 60)}`)
  }
}

console.log(`\nimportados: ${ok.length}`)
for (const l of ok) console.log(`  ${l}`)
console.log(`\nnão importados: ${falhou.length}`)
for (const l of falhou) console.log(`  ${l}`)
