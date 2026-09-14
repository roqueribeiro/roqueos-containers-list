#!/usr/bin/env node
// Goal 18, passada mecânica: o que fecha por regra, não por julgamento de app.
//
// Decisões do founder em 14/09/2026, registradas no plano:
//   appfile.json -> apagar os 51 (conferido antes: nenhuma tip se perde)
//   categorias   -> remapear os 57 para as 14 que o server já conhece
//   segredo      -> o literal fraco sai
//   privilégio   -> declarar o motivo, nunca remover a capacidade
//
//   node scripts/goal18-passada-mecanica.mjs --dry-run   # mostra, não escreve
//   node scripts/goal18-passada-mecanica.mjs             # aplica
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const seco = process.argv.includes('--dry-run')
const APPS = 'Apps'

/**
 * As 14 categorias do CATEGORY_MAP do server, e para onde vai cada uma das que
 * ele não conhece. Sem isto, 57 apps aparecem em "other" na App Store.
 */
const REMAPA = {
  Downloader: 'Utilities',
  Chat: 'Communication',
  Cloud: 'Storage',
  Notes: 'Productivity',
  Gallery: 'Media',
  Database: 'Developer',
  Games: 'Gaming',
  Backup: 'Storage',
  Documents: 'Productivity',
  VPN: 'Network',
  Utility: 'Utilities',
  WEB: 'Network',
  Other: 'Utilities',
  'File Sync': 'Storage',
  Development: 'Developer',
  HomeAutomation: 'Home Automation',
}

/**
 * Onde a regra por categoria erra, o app manda.
 *
 * `Chat` juntava duas coisas diferentes: mensageiro entre pessoas (Databag,
 * VoceChat) e front-end de LLM (Ollama, OpenWebUI, Dify). Mandar os dois para
 * Communication esconderia sete ferramentas de IA numa seção de mensageria.
 * `HoloPlay` está marcado `WEB` mas é um player de áudio do YouTube.
 */
const OVERRIDE = {
  Ollama: 'AI',
  Ollama_Nvidia: 'AI',
  OpenWebUI: 'AI',
  AnythingLLM: 'AI',
  ChatbotUI: 'AI',
  Dify: 'AI',
  TaskingAI: 'AI',
  HoloPlay: 'Media',
  Mealie: 'Productivity',
}

/** Por que cada app precisa do privilégio. Declarar, não remover. */
const MOTIVOS = {
  privileged: {
    EmulatorJS: 'acesso direto a dispositivos de entrada (gamepad) via /dev/input',
    Frigate: 'acesso ao acelerador de inferência (Coral TPU / GPU) em /dev',
    Handbrake: 'acesso a /dev/dri para transcodificação por hardware',
    HoloPlay: 'acesso a /dev/dri e ao display para renderização',
    HomeAssistant: 'acesso a rádios USB (Zigbee, Z-Wave) e descoberta na rede local',
    RagFlow: 'sandbox de execução de código do RagFlow exige isolamento por namespace próprio',
    V2rayA: 'manipula tabelas de roteamento do host para o modo transparente',
    Zigbee2MQTT: 'acesso ao adaptador Zigbee em /dev/ttyACM ou /dev/ttyUSB',
    ttydbridge: 'expõe um shell do host, que é a função declarada do container',
  },
  networkHost: {
    Cloudflared: 'o túnel precisa alcançar serviços em qualquer porta do host',
    DuckDNS: 'precisa do IP público real do host, não do IP da bridge',
    ESPHome: 'descoberta mDNS e flash OTA de dispositivos na rede local',
    Firefly: 'compose herdado do upstream; a interface é publicada direto na rede do host',
    'Gateway-go': 'atua como gateway de rede do host',
    HomeAssistant: 'descoberta de dispositivos por mDNS, SSDP e DHCP na rede local',
    Homebridge: 'o HomeKit exige mDNS na mesma rede física dos acessórios',
    Lucky: 'faz port forwarding e DDNS a partir do IP do host',
    'Node-RED': 'descoberta e controle de dispositivos IoT na rede local',
    OpenHAB: 'descoberta de dispositivos por mDNS e UPnP na rede local',
    Plex: 'descoberta por GDM e DLNA exige a mesma rede física dos clientes',
    Plex_Nvidia: 'descoberta por GDM e DLNA exige a mesma rede física dos clientes',
    Tailscale: 'cria a interface de rede da VPN no host',
    V2rayA: 'manipula tabelas de roteamento do host para o modo transparente',
  },
  capAdd: {
    padrao: 'capacidade exigida pelo upstream para a função declarada do container',
  },
}

const FRACO = /^(admin|password|123456|changeme|secret|root|toor|test|guest|pass|1234)$/i
const SEGREDO = /(PASSWORD|PASSWD|SECRET|TOKEN|API_KEY|APIKEY|ROOT_PASSWORD|ADMIN_PASS)/i

const nomes = fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
const feito = { categoria: [], appfile: [], segredo: [], motivo: [], links: {} }

for (const n of nomes) {
  const dir = path.join(APPS, n)
  const arq = path.join(dir, 'docker-compose.yml')
  if (!fs.existsSync(arq)) continue
  let txt = fs.readFileSync(arq, 'utf8')
  const doc = yaml.load(txt)
  const x = doc['x-casaos'] || {}
  let mudou = false

  // 1. categoria que cai em other
  const cat = Array.isArray(x.category) ? x.category[0] : x.category
  if (cat && (OVERRIDE[n] || REMAPA[cat])) {
    const novo = OVERRIDE[n] || REMAPA[cat]
    // Edita o texto, não o objeto: preserva comentários e ordem do YAML.
    const re = new RegExp(`^(\\s*category:\\s*)${cat.replace(/[.*+?^$()|[\\]\\\\]/g, '\\\\$&')}\\s*$`, 'm')
    if (re.test(txt)) {
      txt = txt.replace(re, `$1${novo}`)
      feito.categoria.push(`${n}: ${cat} -> ${novo}`)
      mudou = true
    } else {
      feito.categoria.push(`${n}: ${cat} -> ${novo}  (NÃO CASOU o padrão, revisar à mão)`)
    }
  }

  // 2. segredo literal fraco
  for (const [nomeSvc, s] of Object.entries(doc.services || {})) {
    const envs = Array.isArray(s.environment)
      ? s.environment.map((e) => String(e).split('='))
      : Object.entries(s.environment || {})
    for (const [k, v] of envs) {
      const valor = String(v ?? '').trim()
      if (!k || !SEGREDO.test(k) || !valor || valor.startsWith('$') || !FRACO.test(valor)) continue
      const re = new RegExp(`^(\\s*-?\\s*${k}[:=]\\s*)['"]?${valor}['"]?\\s*$`, 'm')
      if (re.test(txt)) {
        txt = txt.replace(re, `$1$default_pwd`)
        feito.segredo.push(`${n}/${nomeSvc}: ${k}=${valor} -> $default_pwd`)
        mudou = true
      } else {
        feito.segredo.push(`${n}/${nomeSvc}: ${k}=${valor}  (NÃO CASOU, revisar à mão)`)
      }
    }
  }

  // 3. motivo do privilégio, em x-roqueos
  const motivo = {}
  for (const [, s] of Object.entries(doc.services || {})) {
    if (s.privileged === true && MOTIVOS.privileged[n]) motivo.privileged = MOTIVOS.privileged[n]
    if (s.network_mode === 'host' && MOTIVOS.networkHost[n])
      motivo.networkHost = MOTIVOS.networkHost[n]
    if (Array.isArray(s.cap_add) && s.cap_add.length) motivo.capAdd = MOTIVOS.capAdd.padrao
  }
  if (Object.keys(motivo).length && !doc['x-roqueos']?.motivo) {
    const corpo =
      `  motivo:\n` +
      Object.entries(motivo)
        .map(([k, v]) => `    ${k}: ${JSON.stringify(v)}`)
        .join('\n') +
      '\n'
    // Já existe um x-roqueos? Entra DENTRO dele. Anexar outro bloco com a mesma
    // chave de topo produz "duplicated mapping key" e quebra o YAML inteiro —
    // foi o que aconteceu com o EmulatorJS na primeira rodada.
    if (/^x-roqueos:/m.test(txt)) txt = txt.replace(/^x-roqueos:\n/m, `x-roqueos:\n${corpo}`)
    else txt = txt.replace(/\n*$/, '\n') + `\nx-roqueos:\n${corpo}`
    feito.motivo.push(`${n}: ${Object.keys(motivo).join(', ')}`)
    mudou = true
  }

  if (mudou && !seco) fs.writeFileSync(arq, txt)
}

// 4. appfile.json: guarda o que é único, depois some.
//
// Conferido antes de apagar: nenhuma tip se perde, porque todo compose que tem
// appfile com tips já tem as suas próprias em x-casaos.tips. O que só existe no
// appfile são 6 links upstream de verdade, e esses viram a seção "fonte oficial"
// do README de cada um.
const NOSSO = /discord\.gg\/knqAbbBbeX|roqueos\.com\.br/
for (const n of nomes) {
  const fa = path.join(APPS, n, 'appfile.json')
  if (!fs.existsSync(fa)) continue
  let a
  try {
    a = JSON.parse(fs.readFileSync(fa, 'utf8'))
  } catch {
    a = null
  }
  const s = a?.support || ''
  const w = a?.website || ''
  if ((s && !NOSSO.test(s)) || (w && !NOSSO.test(w)))
    feito.links[n] = { support: s || null, website: w || null }
  if (!seco) fs.rmSync(fa)
  feito.appfile.push(n)
}

if (!seco && Object.keys(feito.links).length) {
  fs.mkdirSync('scripts/dados', { recursive: true })
  fs.writeFileSync(
    'scripts/dados/links-upstream.json',
    JSON.stringify(feito.links, null, 2) + '\n',
  )
}

const cab = seco ? '(DRY RUN, nada escrito)' : '(aplicado)'
console.log(`\nGoal 18 — passada mecânica ${cab}\n`)
console.log(`categorias remapeadas: ${feito.categoria.length}`)
for (const l of feito.categoria) console.log(`  ${l}`)
console.log(`\nsegredo literal: ${feito.segredo.length}`)
for (const l of feito.segredo) console.log(`  ${l}`)
console.log(`\nmotivo de privilégio declarado: ${feito.motivo.length}`)
for (const l of feito.motivo) console.log(`  ${l}`)
console.log(`\nappfile.json removidos: ${feito.appfile.length}`)
console.log(`links upstream guardados: ${Object.keys(feito.links).length}`)
for (const [k, v] of Object.entries(feito.links)) console.log(`  ${k}: ${v.website || v.support}`)
