#!/usr/bin/env node
// Goal 18, P4: `:latest` vira a versão que está no ar hoje.
//
// `:latest` significa que o servidor de duas pessoas roda software diferente com
// o mesmo manifesto, e que uma atualização de terceiro quebra a instalação de
// quem já tinha. O preço de fixar é ter que subir a versão de vez em quando; o
// preço de não fixar é não saber o que quebrou.
//
// A tag sai do registro, não de chute: consulta a API do Docker Hub (ou do
// ghcr/quay/lscr quando é lá que a imagem mora), pega as tags que parecem
// versão e escolhe a maior. Imagem que não resolve fica como está e aparece no
// relatório: melhor um :latest declarado que uma tag inventada.
//
//   node scripts/goal18-fixa-tags.mjs --dry-run
//   node scripts/goal18-fixa-tags.mjs
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const seco = process.argv.includes('--dry-run')
const APPS = 'Apps'

/**
 * Versão limpa: `v1.2.3`, `1.2.3`, `2024.10.1`, `1.2`. Sem sufixo.
 *
 * A primeira versão aceitava `-sufixo` e escolheu `opodsync:0.5.3-arm64v8`, uma
 * tag de UMA arquitetura, que quebraria em amd64, e `threadfin:1.2.37-nvidia`,
 * uma variante com driver. Tag de catálogo tem que servir todas as
 * arquiteturas que o manifesto declara, então sufixo só entra quando não existe
 * nenhuma versão limpa — e aí o relatório diz qual foi.
 */
const VERSAO = /^v?\d+(\.\d+){1,3}$/
const VERSAO_COM_SUFIXO = /^v?\d+(\.\d+){1,3}-[a-z0-9.]+$/i
const RUIM = /(nightly|beta|alpha|rc\d|dev|edge|canary|test|unstable|pre|arm|amd64|386|nvidia|cuda|rocm|gpu)/i

function comparar(a, b) {
  const na = a.replace(/^v/, '').split(/[.-]/).map((x) => parseInt(x) || 0)
  const nb = b.replace(/^v/, '').split(/[.-]/).map((x) => parseInt(x) || 0)
  for (let i = 0; i < Math.max(na.length, nb.length); i++) {
    if ((na[i] || 0) !== (nb[i] || 0)) return (nb[i] || 0) - (na[i] || 0)
  }
  return 0
}

async function tagsDoHub(repo) {
  const caminho = repo.includes('/') ? repo : `library/${repo}`
  const url = `https://hub.docker.com/v2/repositories/${caminho}/tags?page_size=100&ordering=last_updated`
  const r = await fetch(url, { signal: AbortSignal.timeout(20000) })
  if (!r.ok) return null
  const j = await r.json()
  return (j.results || []).map((t) => t.name)
}

async function tagsDoGhcr(repo) {
  // ghcr precisa de token anônimo para listar tags.
  const t = await fetch(`https://ghcr.io/token?scope=repository:${repo}:pull&service=ghcr.io`, {
    signal: AbortSignal.timeout(20000),
  })
  if (!t.ok) return null
  const { token } = await t.json()
  const r = await fetch(`https://ghcr.io/v2/${repo}/tags/list?n=200`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(20000),
  })
  if (!r.ok) return null
  return (await r.json()).tags || []
}

/** Devolve a maior tag de versão, ou null quando o registro não responde. */
async function melhorTag(imagem) {
  const semTag = imagem.replace(/:[^:/]+$/, '')
  try {
    let tags = null
    if (semTag.startsWith('ghcr.io/')) tags = await tagsDoGhcr(semTag.slice('ghcr.io/'.length))
    else if (semTag.startsWith('lscr.io/')) tags = await tagsDoHub(semTag.slice('lscr.io/'.length))
    else if (semTag.startsWith('docker.io/')) tags = await tagsDoHub(semTag.slice('docker.io/'.length))
    else if (!semTag.includes('.') || semTag.split('/')[0].indexOf('.') < 0)
      tags = await tagsDoHub(semTag)
    if (!tags) return null
    const limpas = tags.filter((t) => VERSAO.test(t)).sort(comparar)
    if (limpas[0]) return limpas[0]
    const comSufixo = tags.filter((t) => VERSAO_COM_SUFIXO.test(t) && !RUIM.test(t)).sort(comparar)
    return comSufixo[0] || null
  } catch {
    return null
  }
}

const nomes = fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
const fixadas = []
const naoResolvidas = []
const restart = []

for (const n of nomes) {
  const arq = path.join(APPS, n, 'docker-compose.yml')
  if (!fs.existsSync(arq)) continue
  let txt = fs.readFileSync(arq, 'utf8')
  const doc = yaml.load(txt)
  let mudou = false

  for (const [nomeSvc, s] of Object.entries(doc.services || {})) {
    // restart ausente: unless-stopped é o que 190 dos 205 já usam.
    if (!s.restart) {
      const re = new RegExp(`^(\\s{4}image:.*\\n)`, 'm')
      const ini = txt.indexOf(`\n  ${nomeSvc}:\n`)
      if (ini >= 0) {
        const trecho = txt.slice(ini)
        if (re.test(trecho)) {
          txt = txt.slice(0, ini) + trecho.replace(re, `$1    restart: unless-stopped\n`)
          restart.push(`${n}/${nomeSvc}`)
          mudou = true
        }
      }
    }

    const img = String(s.image || '')
    if (!/:latest$/.test(img)) continue
    const tag = await melhorTag(img)
    if (!tag) {
      naoResolvidas.push(`${n}/${nomeSvc}: ${img}`)
      continue
    }
    const nova = img.replace(/:latest$/, `:${tag}`)
    const re = new RegExp(`(image:\\s*)${img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s*$)`, 'm')
    if (re.test(txt)) {
      txt = txt.replace(re, `$1${nova}$2`)
      fixadas.push(`${n}/${nomeSvc}: ${img} -> ${nova}`)
      mudou = true
    } else naoResolvidas.push(`${n}/${nomeSvc}: ${img} (linha não casou)`)
  }

  if (mudou && !seco) fs.writeFileSync(arq, txt)
}

console.log(`\nGoal 18 — P4 ${seco ? '(DRY RUN)' : '(aplicado)'}`)
console.log(`\ntags fixadas: ${fixadas.length}`)
for (const l of fixadas) console.log(`  ${l}`)
console.log(`\nrestart acrescentado: ${restart.length}`)
for (const l of restart) console.log(`  ${l}`)
console.log(`\nnão resolvidas (ficam :latest, e o gate continua acusando): ${naoResolvidas.length}`)
for (const l of naoResolvidas) console.log(`  ${l}`)
