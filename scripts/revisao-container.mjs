#!/usr/bin/env node
// REVISÃO CONTAINER A CONTAINER — o critério de aceite do Goal 18.
//
// `yarn validate` prova que o YAML é um compose. Este script prova que o app
// está pronto para a loja: nove premissas, uma por dimensão que o founder pediu
// em 14/09/2026, cada uma verificável sem opinião.
//
//   node scripts/revisao-container.mjs --todos        # varre os 205, grava .revisao/
//   node scripts/revisao-container.mjs --app Frigate  # um só, saída no terminal
//   node scripts/revisao-container.mjs --pendentes    # a fila, um nome por linha
//
// Sai 1 quando há pendente. É isso que faz o loop do Goal 18 parar sozinho.
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const APPS = 'Apps'
const SAIDA = '.revisao'

/**
 * Cópia do CATEGORY_MAP de roqueos-server/src/modules/catalog/catalog.service.ts.
 *
 * O server faz `CATEGORY_MAP[categoria] || 'other'`. Categoria fora desta lista
 * não erra em lugar nenhum: o app simplesmente aparece em "other" na App Store,
 * em silêncio. Eram 57 apps assim quando este script nasceu. A cópia é conferida
 * contra o server por `conferirMapaDoServer()` quando ele está ao lado.
 */
const CATEGORIAS = new Set([
  'Utilities',
  'Media',
  'Network',
  'Developer',
  'Development',
  'Home Automation',
  'HomeAutomation',
  'Productivity',
  'Storage',
  'Security',
  'AI',
  'Gaming',
  'Communication',
  'Finance',
])

const SERVER = '../roqueos-server/src/modules/catalog/catalog.service.ts'

/** Avisa (sem reprovar) quando a cópia acima ficou para trás do server. */
function conferirMapaDoServer() {
  if (!fs.existsSync(SERVER)) return null
  const txt = fs.readFileSync(SERVER, 'utf8')
  const bloco = txt.match(/CATEGORY_MAP[^{]*\{([\s\S]*?)\}/)
  if (!bloco) return null
  const doServer = new Set([...bloco[1].matchAll(/^\s*'?([^':\n]+)'?\s*:/gm)].map((m) => m[1].trim()))
  const faltando = [...doServer].filter((c) => !CATEGORIAS.has(c))
  const sobrando = [...CATEGORIAS].filter((c) => !doServer.has(c))
  return faltando.length || sobrando.length ? { faltando, sobrando } : null
}

const SEGREDO = /(PASSWORD|PASSWD|SECRET|TOKEN|API_KEY|APIKEY|ROOT_PASSWORD|ADMIN_PASS)/i
const FRACO = /^(admin|password|123456|changeme|secret|root|toor|test|guest|pass|1234)$/i

/** Largura e altura de um PNG pelo cabeçalho IHDR. Sem dependência de imagem. */
export function dimensoesPng(arquivo) {
  const b = fs.readFileSync(arquivo)
  if (b.length < 24 || b.toString('ascii', 1, 4) !== 'PNG') return null
  return { largura: b.readUInt32BE(16), altura: b.readUInt32BE(20) }
}

/** As seções que a ficha da loja precisa ter no README. */
const SECOES = [
  { chave: 'oque', re: /^##+\s*(o que é|what is|sobre)/im },
  { chave: 'portas', re: /^##+\s*(portas?|ports?)/im },
  { chave: 'volumes', re: /^##+\s*(volumes?|dados|data)/im },
  { chave: 'envs', re: /^##+\s*(vari[áa]veis|environment|envs?)/im },
  { chave: 'primeiroAcesso', re: /^##+\s*(primeiro acesso|first run|come[çc]ando)/im },
  { chave: 'fonte', re: /^##+\s*(fonte oficial|upstream|projeto original)/im },
]

/** Lê o app do disco. Devolve null quando não há compose (não é um app). */
function carregar(nome) {
  const dir = path.join(APPS, nome)
  const arq = path.join(dir, 'docker-compose.yml')
  if (!fs.existsSync(arq)) return null
  let compose
  try {
    compose = yaml.load(fs.readFileSync(arq, 'utf8'))
  } catch (e) {
    return { dir, nome, yamlQuebrado: e.message }
  }
  return { dir, nome, compose, x: compose['x-casaos'] || {}, xr: compose['x-roqueos'] || {} }
}

/** Uma premissa fechada devolve []; aberta devolve as razões. */
function premissas(app, conflitos) {
  const { dir, compose, x, xr } = app
  const servicos = Object.entries(compose.services || {})
  const principal = x.main ? compose.services?.[x.main] : null
  const p = {}

  // P1 — compatibilidade com o RoqueOS
  p.P1 = []
  if (!x.main) p.P1.push('x-casaos.main ausente')
  else if (!principal) p.P1.push(`x-casaos.main "${x.main}" não resolve nenhum serviço`)
  const cat = Array.isArray(x.category) ? x.category[0] : x.category
  if (!cat) p.P1.push('x-casaos.category ausente')
  else if (!CATEGORIAS.has(cat)) p.P1.push(`categoria "${cat}" cai em other na loja`)
  if (!Array.isArray(x.architectures) || !x.architectures.length)
    p.P1.push('x-casaos.architectures vazio')

  // P2 — portas
  p.P2 = []
  for (const [nomeSvc, s] of servicos) {
    const descritas = new Map(
      (s['x-casaos']?.ports || []).map((d) => [String(d.container), d.description?.en_us || '']),
    )
    for (const porta of s.ports || []) {
      const alvo = String(porta.target ?? String(porta).split(':').slice(-1)[0]).split('/')[0]
      const host = String(porta.published ?? String(porta).split(':')[0]).split('/')[0]
      if (!descritas.has(alvo) || !descritas.get(alvo))
        p.P2.push(`${nomeSvc}: porta ${alvo} sem descrição em x-casaos.ports`)
      const outros = (conflitos.get(host) || []).filter((a) => a !== app.nome)
      if (outros.length && !xr.portaCompartilhada)
        p.P2.push(
          `${nomeSvc}: porta host ${host} disputada com ${outros.length} app(s) (${outros.slice(0, 3).join(', ')}) e não declarada em x-roqueos.portaCompartilhada`,
        )
    }
  }

  // P3 — variáveis
  p.P3 = []
  for (const [nomeSvc, s] of servicos) {
    const envs = Array.isArray(s.environment)
      ? s.environment.map((e) => String(e).split('='))
      : Object.entries(s.environment || {})
    for (const [k, v] of envs) {
      if (!k) continue
      const valor = String(v ?? '').trim()
      if (SEGREDO.test(k) && valor && !valor.startsWith('$') && FRACO.test(valor))
        p.P3.push(`${nomeSvc}: ${k} com segredo literal fraco`)
    }
  }

  // P4 — configuração
  p.P4 = []
  for (const [nomeSvc, s] of servicos) {
    const img = String(s.image || '')
    if (!img) p.P4.push(`${nomeSvc}: sem image`)
    else if (/:latest$/.test(img)) p.P4.push(`${nomeSvc}: imagem em :latest`)
    else if (!img.includes(':') && !img.includes('@')) p.P4.push(`${nomeSvc}: imagem sem tag`)
    if (!s.restart) p.P4.push(`${nomeSvc}: sem restart`)
    for (const v of s.volumes || []) {
      const src = typeof v === 'string' ? v.split(':')[0] : v.source
      if (src && src.startsWith('/') && !src.startsWith('/DATA/'))
        p.P4.push(`${nomeSvc}: volume ${src} fora de /DATA/`)
    }
  }

  // P5 — privilégio: não é para remover, é para justificar
  p.P5 = []
  const motivo = xr.motivo || {}
  for (const [nomeSvc, s] of servicos) {
    if (s.privileged === true && !motivo.privileged)
      p.P5.push(`${nomeSvc}: privileged sem x-roqueos.motivo.privileged`)
    if (s.network_mode === 'host' && !motivo.networkHost)
      p.P5.push(`${nomeSvc}: network_mode host sem x-roqueos.motivo.networkHost`)
    if (Array.isArray(s.cap_add) && s.cap_add.length && !motivo.capAdd)
      p.P5.push(`${nomeSvc}: cap_add ${s.cap_add.join(',')} sem x-roqueos.motivo.capAdd`)
  }

  // P6 — README da loja
  p.P6 = []
  const readme = path.join(dir, 'README.md')
  if (!fs.existsSync(readme)) p.P6.push('sem README.md')
  else {
    const txt = fs.readFileSync(readme, 'utf8')
    if (txt.length < 400) p.P6.push(`README com ${txt.length} caracteres, curto demais para ficha`)
    for (const s of SECOES) if (!s.re.test(txt)) p.P6.push(`README sem seção: ${s.chave}`)
  }

  // P7 — texto da loja
  p.P7 = []
  for (const campo of ['tagline', 'description']) {
    for (const idioma of ['en_us', 'pt_br']) {
      if (!x[campo]?.[idioma]?.trim()) p.P7.push(`x-casaos.${campo}.${idioma} vazio`)
    }
  }

  // P8 — imagens
  p.P8 = []
  const icone = path.join(dir, 'icon.png')
  if (!fs.existsSync(icone)) p.P8.push('sem icon.png')
  else {
    const d = dimensoesPng(icone)
    if (!d) p.P8.push('icon.png não é PNG válido')
    else if (d.largura !== d.altura) p.P8.push(`ícone não quadrado (${d.largura}x${d.altura})`)
    else if (d.largura < 192) p.P8.push(`ícone de ${d.largura}px, mínimo 192`)
  }
  if (!fs.existsSync(path.join(dir, 'thumbnail.png'))) p.P8.push('sem thumbnail.png')
  if (!fs.readdirSync(dir).some((f) => /^screenshot-\d+\.(png|jpg|jpeg|webp)$/.test(f)))
    p.P8.push('sem nenhuma screenshot')

  // P9 — coerência entre appfile.json e o compose
  p.P9 = []
  const arqApp = path.join(dir, 'appfile.json')
  if (fs.existsSync(arqApp)) {
    let a
    try {
      a = JSON.parse(fs.readFileSync(arqApp, 'utf8'))
    } catch (e) {
      p.P9.push(`appfile.json com JSON inválido: ${e.message.slice(0, 50)}`)
    }
    if (a) {
      const imgCompose = principal?.image || servicos[0]?.[1]?.image || ''
      const imgApp = a.container?.image || ''
      if (imgApp && imgCompose && imgApp !== imgCompose)
        p.P9.push(`appfile diz ${imgApp}, compose diz ${imgCompose}`)
    }
  }

  return p
}

/** Mapa porta-host -> apps, para a checagem de conflito da P2. */
function mapaDeConflitos(nomes) {
  const portas = new Map()
  for (const n of nomes) {
    const app = carregar(n)
    if (!app?.compose) continue
    for (const [, s] of Object.entries(app.compose.services || {})) {
      for (const porta of s.ports || []) {
        const host = String(porta.published ?? String(porta).split(':')[0]).split('/')[0]
        if (!host || host === 'undefined') continue
        if (!portas.has(host)) portas.set(host, new Set())
        portas.get(host).add(n)
      }
    }
  }
  return new Map([...portas].map(([k, v]) => [k, [...v]]))
}

const args = process.argv.slice(2)
const nomes = fs
  .readdirSync(APPS)
  .filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
  .sort()
const conflitos = mapaDeConflitos(nomes)

const alvo = args.includes('--app') ? [args[args.indexOf('--app') + 1]] : nomes
const vereditos = []

for (const n of alvo) {
  const app = carregar(n)
  if (!app) continue
  if (app.yamlQuebrado) {
    vereditos.push({ app: n, fechado: false, abertas: { YAML: [app.yamlQuebrado] } })
    continue
  }
  const p = premissas(app, conflitos)
  const abertas = Object.fromEntries(Object.entries(p).filter(([, v]) => v.length))
  vereditos.push({ app: n, fechado: !Object.keys(abertas).length, premissas: p, abertas })
}

if (args.includes('--pendentes')) {
  for (const v of vereditos) if (!v.fechado) console.log(v.app)
  process.exit(0)
}

if (args.includes('--app')) {
  const v = vereditos[0]
  if (!v) {
    console.error(`app não encontrado`)
    process.exit(2)
  }
  console.log(`\n${v.app}: ${v.fechado ? '✓ fechado' : '✗ aberto'}`)
  for (const [k, razoes] of Object.entries(v.abertas))
    for (const r of razoes) console.log(`  ${k}  ${r}`)
  process.exit(v.fechado ? 0 : 1)
}

// --todos: grava a evidência por app e o resumo
fs.mkdirSync(SAIDA, { recursive: true })
for (const v of vereditos)
  fs.writeFileSync(path.join(SAIDA, `${v.app}.json`), JSON.stringify(v, null, 1) + '\n')

const porPremissa = {}
for (const v of vereditos)
  for (const k of Object.keys(v.abertas || {})) porPremissa[k] = (porPremissa[k] || 0) + 1

const pendentes = vereditos.filter((v) => !v.fechado).map((v) => v.app)
const drift = conferirMapaDoServer()
const resumo = {
  medidoEm: new Date().toISOString(),
  apps: vereditos.length,
  fechados: vereditos.length - pendentes.length,
  pendentes: pendentes.length,
  abertasPorPremissa: porPremissa,
  portasEmConflito: [...conflitos].filter(([, a]) => a.length > 1).length,
  mapaDeCategoriasDivergeDoServer: drift,
  fila: pendentes,
}
fs.writeFileSync(path.join(SAIDA, 'resumo.json'), JSON.stringify(resumo, null, 1) + '\n')

console.log(`\nrevisão container a container — ${resumo.apps} apps`)
console.log(`  fechados:  ${resumo.fechados}`)
console.log(`  pendentes: ${resumo.pendentes}`)
console.log(`\n  abertas por premissa:`)
for (const [k, n] of Object.entries(porPremissa).sort())
  console.log(`    ${k}  ${String(n).padStart(3)} app(s)`)
if (drift) console.log(`\n  ATENÇÃO: CATEGORIAS diverge do server:`, JSON.stringify(drift))
console.log(`\n  evidência em ${SAIDA}/<app>.json e ${SAIDA}/resumo.json`)
process.exit(resumo.pendentes ? 1 : 0)
