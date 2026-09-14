#!/usr/bin/env node
// Goal 18, P4, segunda parte: quem só publica `latest` é fixado por digest.
//
// 15 imagens do catálogo não publicam tag de versão nenhuma: theasp/novnc,
// excalidraw/excalidraw, homebridge/homebridge e outras só têm `latest`. Para
// essas, inventar uma tag seria mentira e deixar `:latest` mantém o problema.
//
// A saída honesta é o digest: `imagem@sha256:...` aponta um conteúdo exato,
// reproduz igual em qualquer máquina e em qualquer dia, e não depende de o
// upstream resolver versionar. O custo é que a atualização passa a ser
// deliberada — que é exatamente o que se quer num catálogo de loja.
//
//   node scripts/goal18-fixa-digest.mjs --dry-run
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const seco = process.argv.includes('--dry-run')
const APPS = 'Apps'
const ACEITA = [
  'application/vnd.oci.image.index.v1+json',
  'application/vnd.docker.distribution.manifest.list.v2+json',
  'application/vnd.oci.image.manifest.v1+json',
  'application/vnd.docker.distribution.manifest.v2+json',
].join(',')

/** Digest atual de `imagem:tag`, pelo registro que hospeda ela. */
async function digest(imagem) {
  const [semTag, tag = 'latest'] = imagem.split(/:(?![^/]*\/)/)
  let host = 'registry-1.docker.io'
  let repo = semTag
  let tokenUrl = `https://auth.docker.io/token?service=registry.docker.io&scope=repository:REPO:pull`

  if (semTag.startsWith('ghcr.io/')) {
    host = 'ghcr.io'
    repo = semTag.slice('ghcr.io/'.length)
    tokenUrl = `https://ghcr.io/token?service=ghcr.io&scope=repository:REPO:pull`
  } else if (semTag.startsWith('lscr.io/')) {
    repo = semTag.slice('lscr.io/'.length)
  } else if (semTag.startsWith('docker.io/')) {
    repo = semTag.slice('docker.io/'.length)
  } else if (semTag.includes('.') && semTag.split('/')[0].includes('.')) {
    return null // registro próprio: não sei falar com ele, e chutar seria pior
  }
  if (!repo.includes('/')) repo = `library/${repo}`

  try {
    const t = await fetch(tokenUrl.replace('REPO', repo), { signal: AbortSignal.timeout(20000) })
    if (!t.ok) return null
    const { token } = await t.json()
    const r = await fetch(`https://${host}/v2/${repo}/manifests/${tag}`, {
      method: 'HEAD',
      headers: { Authorization: `Bearer ${token}`, Accept: ACEITA },
      signal: AbortSignal.timeout(20000),
    })
    if (!r.ok) return null
    return r.headers.get('docker-content-digest')
  } catch {
    return null
  }
}

const nomes = fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
const fixadas = []
const falhou = []

for (const n of nomes) {
  const arq = path.join(APPS, n, 'docker-compose.yml')
  if (!fs.existsSync(arq)) continue
  let txt = fs.readFileSync(arq, 'utf8')
  const doc = yaml.load(txt)
  let mudou = false
  for (const [nomeSvc, s] of Object.entries(doc.services || {})) {
    const img = String(s.image || '')
    if (!/:latest$/.test(img)) continue
    const d = await digest(img)
    if (!d) {
      falhou.push(`${n}/${nomeSvc}: ${img}`)
      continue
    }
    const nova = `${img.replace(/:latest$/, '')}@${d}`
    const re = new RegExp(`(image:\\s*)${img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s*$)`, 'm')
    if (re.test(txt)) {
      txt = txt.replace(re, `$1${nova}$2`)
      fixadas.push(`${n}/${nomeSvc}: ${img} -> @${d.slice(0, 19)}…`)
      mudou = true
    } else falhou.push(`${n}/${nomeSvc}: ${img} (linha não casou)`)
  }
  if (mudou && !seco) fs.writeFileSync(arq, txt)
}

console.log(`\nGoal 18 — P4 digest ${seco ? '(DRY RUN)' : '(aplicado)'}`)
console.log(`\nfixadas por digest: ${fixadas.length}`)
for (const l of fixadas) console.log(`  ${l}`)
console.log(`\nnão resolvidas: ${falhou.length}`)
for (const l of falhou) console.log(`  ${l}`)
