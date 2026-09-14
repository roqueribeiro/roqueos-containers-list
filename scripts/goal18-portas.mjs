#!/usr/bin/env node
// Goal 18, P2: toda porta publicada diz para que serve, e todo conflito é declarado.
//
// A descrição não é enfeite: é ela que a App Store mostra quando o usuário
// decide se abre aquela porta no roteador. Porta sem descrição vira um número
// que ninguém sabe se pode fechar.
//
// O que a descrição diz sai de três lugares, nesta ordem, e nunca de invenção:
//   1. a porta é a do `x-casaos.port_map` -> é a interface web do app
//   2. a porta é conhecida (PORTAS abaixo) -> o protocolo que roda nela
//   3. nenhum dos dois -> diz o serviço e o número, sem fingir que sabe mais
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const seco = process.argv.includes('--dry-run')
const APPS = 'Apps'

/** Portas com significado de protocolo, não de app. */
const PORTAS = {
  22: 'SSH',
  53: 'DNS',
  67: 'DHCP',
  80: 'HTTP',
  123: 'NTP',
  143: 'IMAP',
  443: 'HTTPS',
  445: 'compartilhamento SMB',
  587: 'envio de e-mail (SMTP)',
  993: 'IMAP sobre TLS',
  1883: 'MQTT',
  2049: 'NFS',
  3306: 'banco MySQL',
  5353: 'descoberta mDNS',
  5432: 'banco PostgreSQL',
  6379: 'cache Redis',
  8554: 'streaming RTSP',
  8883: 'MQTT sobre TLS',
  9090: 'métricas Prometheus',
  27017: 'banco MongoDB',
  51820: 'túnel WireGuard',
}

const nomes = fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())

/** Mapa porta-host -> apps, para saber quem disputa com quem. */
const disputa = new Map()
for (const n of nomes) {
  const f = path.join(APPS, n, 'docker-compose.yml')
  if (!fs.existsSync(f)) continue
  const doc = yaml.load(fs.readFileSync(f, 'utf8'))
  for (const [, s] of Object.entries(doc.services || {}))
    for (const p of s.ports || []) {
      const h = String(p.published ?? String(p).split(':')[0]).split('/')[0]
      if (!h || h === 'undefined') continue
      if (!disputa.has(h)) disputa.set(h, new Set())
      disputa.get(h).add(n)
    }
}

const feito = { preenchidas: 0, acrescentadas: 0, apps: 0, compartilhada: [], semCasar: [] }

/** A frase, pelas três fontes da ordem documentada no cabeçalho. */
function frase(alvo, host, portMap, titulo, nomeSvc) {
  if (host === portMap || alvo === portMap) return `Web interface for ${titulo}`
  if (PORTAS[alvo]) return `${PORTAS[alvo]} (port ${alvo})`
  return `Service port ${alvo} of ${nomeSvc}`
}

for (const n of nomes) {
  const arq = path.join(APPS, n, 'docker-compose.yml')
  if (!fs.existsSync(arq)) continue
  let txt = fs.readFileSync(arq, 'utf8')
  const doc = yaml.load(txt)
  const x = doc['x-casaos'] || {}
  const portMap = String(x.port_map || '')
  const titulo = x.title?.en_us || x.title?.en_US || n
  let mudou = false

  for (const [nomeSvc, s] of Object.entries(doc.services || {})) {
    const lista = s['x-casaos']?.ports || []
    const comEntrada = new Set(lista.map((p) => String(p.container)))
    const publicadas = []
    for (const p of s.ports || []) {
      const alvo = String(p.target ?? String(p).split(':').slice(-1)[0]).split('/')[0]
      const host = String(p.published ?? String(p).split(':')[0]).split('/')[0]
      if (!publicadas.some((q) => q.alvo === alvo)) publicadas.push({ alvo, host })
    }

    // 1. entrada existe e a descrição está vazia -> preenche NO LUGAR.
    //    Acrescentar outra entrada não resolve: o parser monta um mapa e a
    //    última entrada do mesmo container vence, então a vazia continuava
    //    ganhando. Foi o que aconteceu na primeira rodada desta passada.
    for (const p of lista) {
      if (p.description?.en_us) continue
      const alvo = String(p.container)
      const pub = publicadas.find((q) => q.alvo === alvo)
      const texto = frase(alvo, pub?.host ?? alvo, portMap, titulo, nomeSvc)
      const re = new RegExp(
        `(- container: ['"]?${alvo}['"]?\\n\\s+description:\\n\\s+en_us: )(''|""|)(\\s*\\n)`,
      )
      if (re.test(txt)) {
        txt = txt.replace(re, `$1${JSON.stringify(texto)}$3`)
        feito.preenchidas++
        mudou = true
      } else feito.semCasar.push(`${n}/${nomeSvc}/${alvo} (preencher)`)
    }

    // 2. porta publicada sem entrada nenhuma -> acrescenta.
    const faltam = publicadas.filter((p) => !comEntrada.has(p.alvo))
    if (!faltam.length) continue
    const linhas = faltam
      .map(
        (p) =>
          `        - container: '${p.alvo}'\n          description:\n            en_us: ${JSON.stringify(frase(p.alvo, p.host, portMap, titulo, nomeSvc))}\n`,
      )
      .join('')
    const ini = txt.indexOf(`  ${nomeSvc}:`)
    if (ini < 0) {
      feito.semCasar.push(`${n}/${nomeSvc} (serviço não casou)`)
      continue
    }
    const trecho = txt.slice(ini)
    const antes = txt
    if (/^\s{6}ports:\n/m.test(trecho))
      txt = txt.slice(0, ini) + trecho.replace(/^(\s{6}ports:\n)/m, `$1${linhas}`)
    else if (/^\s{4}x-casaos:\n/m.test(trecho))
      txt =
        txt.slice(0, ini) +
        trecho.replace(/^(\s{4}x-casaos:\n)/m, `$1      ports:\n${linhas}`)
    else
      txt =
        txt.slice(0, ini) +
        trecho.replace(new RegExp(`^(\\s{2}${nomeSvc}:\\n)`), `$1    x-casaos:\n      ports:\n${linhas}`)
    if (txt !== antes) {
      feito.acrescentadas += faltam.length
      mudou = true
    } else feito.semCasar.push(`${n}/${nomeSvc} (acrescentar)`)
  }

  // Conflito de porta host: o instalador realoca, mas a loja precisa avisar.
  const disputadas = new Set()
  for (const [, s] of Object.entries(doc.services || {}))
    for (const p of s.ports || []) {
      const h = String(p.published ?? String(p).split(':')[0]).split('/')[0]
      if ((disputa.get(h)?.size || 0) > 1) disputadas.add(h)
    }
  if (disputadas.size && !doc['x-roqueos']?.portaCompartilhada) {
    const corpo = `  portaCompartilhada: true\n`
    if (/^x-roqueos:/m.test(txt)) txt = txt.replace(/^x-roqueos:\n/m, `x-roqueos:\n${corpo}`)
    else txt = txt.replace(/\n*$/, '\n') + `\nx-roqueos:\n${corpo}`
    feito.compartilhada.push(`${n} (:${[...disputadas].join(', :')})`)
    mudou = true
  }

  if (mudou) {
    feito.apps++
    if (!seco) fs.writeFileSync(arq, txt)
  }
}

console.log(`\nGoal 18 — P2 ${seco ? '(DRY RUN)' : '(aplicado)'}`)
console.log(`  apps tocados:              ${feito.apps}`)
console.log(`  descrições preenchidas:    ${feito.preenchidas}`)
console.log(`  entradas acrescentadas:    ${feito.acrescentadas}`)
console.log(`  portaCompartilhada:        ${feito.compartilhada.length}`)
console.log(`  não casaram:               ${feito.semCasar.length}`)
for (const s of feito.semCasar.slice(0, 10)) console.log(`    ${s}`)
