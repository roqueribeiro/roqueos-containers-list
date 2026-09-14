#!/usr/bin/env node
// Goal 18, P8: o ícone que a loja mostra existe de verdade.
//
// 54 apps apontavam `cdn.jsdelivr.net/.../Apps/<app>/icon.png` e o arquivo não
// estava no repo: 404 no CDN, ícone quebrado na App Store. Outros 4 eram
// pequenos demais (48 px) e 9 não eram quadrados, o que a grade da loja corta.
//
// De onde vem o ícone: homarr-labs/dashboard-icons, a coleção que os painéis de
// self-hosted usam. Apache 2.0, com a ressalva que este catálogo também precisa
// fazer: "todos os nomes de produto e marcas pertencem a seus donos; os ícones
// servem para identificação e não implicam endosso". É o mesmo princípio do
// TRADEMARK.md deste repo.
//
// O que NÃO se faz aqui: inventar ícone. App que a coleção não tem fica sem, e
// o gate continua acusando, porque um quadrado colorido com uma letra dentro
// mente sobre o que o usuário vai instalar.
//
//   node scripts/goal18-icones.mjs --dry-run
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const seco = process.argv.includes('--dry-run')
const APPS = 'Apps'
const BASE = 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/png'
const MINIMO = 192
const ALVO = 512

/** Nome de pasta -> slug da coleção. Só o que a regra automática erra. */
const SLUG = {
  'ChatGPT-Next-Web': 'chatgpt',
  CodeServer: 'code-server',
  'Alist-Sync': 'alist',
  Ollama_Nvidia: 'ollama',
  Plex_Nvidia: 'plex',
  'LLaMA-Factory_Nvidia': 'llama-factory',
  'DeepSeek-OCR_Nvidia': 'deepseek',
  Jenkin: 'jenkins',
  'Unifi-controller': 'unifi',
  'Unifi-Network-Application': 'unifi',
  Siyuan_Note: 'siyuan',
  'Siyuan-Note': 'siyuan',
  oPodSync: 'opodsync',
  Ddns_go: 'ddns-go',
  'Gateway-go': 'gateway',
  Motioneye: 'motioneye',
  Ztnet: 'zerotier',
  StableDiffusionWebUI: 'stable-diffusion',
  'Calibre-web': 'calibre-web',
  'Node-RED': 'node-red',
  PaperlessNgx: 'paperless-ngx',
  'playit-agent': 'playit-gg',
  ttydbridge: 'ttyd',
  VirtualMachineManager: 'virt-manager',
  'Pingvin-Share': 'pingvin-share',
  'Resilio-sync': 'resilio-sync',
  LibreChat: 'librechat',
  BeaverHabitTracker: 'beaverhabits',
  Collabora: 'collabora-online',
  MatrixSynapse: 'matrix-synapse',
  StirlingPDF: 'stirling-pdf',
  ItTools: 'it-tools',
  KiwixServe: 'kiwix',
  MusicAssistant: 'music-assistant',
  Ntfysh: 'ntfy',
  Pocketid: 'pocket-id',
  SpeedtestTracker: 'speedtest-tracker',
}

/** Candidatos de slug, do mais provável ao menos. */
function candidatos(nome) {
  const base = nome.toLowerCase()
  const c = new Set()
  if (SLUG[nome]) c.add(SLUG[nome])
  c.add(base)
  c.add(base.replace(/[_\s]+/g, '-'))
  c.add(base.replace(/[-_\s]+/g, ''))
  c.add(base.replace(/_nvidia$/, '').replace(/[_\s]+/g, '-'))
  c.add(base.replace(/\d+$/, ''))
  return [...c].filter(Boolean)
}

function dimensoes(arquivo) {
  const b = fs.readFileSync(arquivo)
  if (b.length < 24 || b.toString('ascii', 1, 4) !== 'PNG') return null
  return { largura: b.readUInt32BE(16), altura: b.readUInt32BE(20) }
}

/** Deixa o PNG quadrado e com pelo menos ALVO px, sem distorcer: pad transparente. */
function normalizar(arquivo) {
  const d = dimensoes(arquivo)
  if (!d) return 'não é PNG'
  const lado = Math.max(d.largura, d.altura, ALVO)
  try {
    // sips existe em todo macOS. padToHeightWidth centraliza e preenche.
    execFileSync('sips', ['-s', 'format', 'png', '--padToHeightWidth', String(lado), String(lado), arquivo, '--out', arquivo], {
      stdio: 'ignore',
    })
    const depois = dimensoes(arquivo)
    return depois && depois.largura === depois.altura && depois.largura >= MINIMO
      ? null
      : `normalização não bateu (${depois?.largura}x${depois?.altura})`
  } catch (e) {
    return `sips falhou: ${e.message.slice(0, 40)}`
  }
}

const nomes = fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
const baixados = []
const normalizados = []
const semFonte = []

for (const n of nomes) {
  const destino = path.join(APPS, n, 'icon.png')
  const existe = fs.existsSync(destino)
  const d = existe ? dimensoes(destino) : null
  const precisa = !existe || !d || d.largura !== d.altura || d.largura < MINIMO
  if (!precisa) continue

  let achou = null
  for (const slug of candidatos(n)) {
    try {
      const r = await fetch(`${BASE}/${slug}.png`, { signal: AbortSignal.timeout(20000) })
      if (!r.ok) continue
      const buf = Buffer.from(await r.arrayBuffer())
      if (buf.length < 500) continue
      achou = { slug, buf }
      break
    } catch {
      /* tenta o próximo candidato */
    }
  }

  if (!achou) {
    // Não achou fonte: se já existe um ícone só mal dimensionado, conserta ele.
    if (existe && d) {
      if (!seco) {
        const erro = normalizar(destino)
        if (erro) {
          semFonte.push(`${n}: ${erro}`)
          continue
        }
      }
      normalizados.push(`${n}: ${d.largura}x${d.altura} -> quadrado ${Math.max(d.largura, d.altura, ALVO)}`)
    } else semFonte.push(`${n}: sem ícone e sem fonte na coleção`)
    continue
  }

  if (!seco) {
    fs.writeFileSync(destino, achou.buf)
    const erro = normalizar(destino)
    if (erro) {
      semFonte.push(`${n}: baixou de ${achou.slug} mas ${erro}`)
      continue
    }
  }
  baixados.push(`${n} <- ${achou.slug}`)
}

console.log(`\nGoal 18 — ícones ${seco ? '(DRY RUN)' : '(aplicado)'}`)
console.log(`\nbaixados da coleção: ${baixados.length}`)
for (const l of baixados) console.log(`  ${l}`)
console.log(`\nsó redimensionados (já tinham ícone): ${normalizados.length}`)
for (const l of normalizados) console.log(`  ${l}`)
console.log(`\nsem fonte, ficam como estão: ${semFonte.length}`)
for (const l of semFonte) console.log(`  ${l}`)
