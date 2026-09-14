#!/usr/bin/env node
// P10 — a premissa que liga o container.
//
// P1..P9 leem o manifesto. Nenhuma delas sobe nada, e por isso deixaram passar
// o Grafana: manifesto impecavel, container que nunca sobe porque o Docker cria
// o diretorio do bind como root:root 0755 e a imagem escreve como uid 472.
//
// Esta premissa liga de verdade e olha o estado depois de esperar.
//
// ONDE RODA: so em host Linux. No Docker Desktop do macOS o compartilhamento de
// arquivo entrega o diretorio com permissao frouxa e o Grafana quebrado SOBE,
// ou seja, o teste daria verde falso exatamente na falha que ele existe para
// pegar. Medido em 14/09/2026: mesmo manifesto, mesma imagem, verde no macOS e
// "Restarting (1)" no Linux. Por isso o script recusa rodar fora do Linux.

import { execFileSync } from 'node:child_process'
import yaml from 'js-yaml'
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { todosOsApps } from './uid-imagem.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = join(AQUI, '..')
const APPS = join(RAIZ, 'Apps')
const EVID = join(RAIZ, '.boot')

const ESPERA_MS = Number(process.env.BOOT_ESPERA_MS || 45000)
const INTERVALO_MS = 3000

export function hostLinux() {
  try {
    const os = execFileSync('docker', ['info', '--format', '{{.OperatingSystem}}'], {
      encoding: 'utf8',
    }).trim()
    return { os, linux: !/Docker Desktop/i.test(os) }
  } catch (e) {
    return { os: `indisponivel: ${String(e.message || e).split('\n')[0]}`, linux: false }
  }
}

function sh(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts })
}

// O compose do catalogo usa $AppID. O instalador troca pelo id do app; aqui
// fazemos o mesmo, para o teste rodar o mesmo texto que o usuario instala.
export function renderiza(texto, appId) {
  return texto.replaceAll('$AppID', appId).replaceAll('${AppID}', appId)
}

export function veredito(estados) {
  const ruins = estados.filter((s) => {
    if (/Restarting/i.test(s.status) || s.restarts > 0) return true
    if (s.state === 'running') return false
    // Serviço de semente termina e fica assim de propósito: ele copia o
    // arquivo de configuração que a imagem traz para dentro do bind vazio que o
    // instalador criou, e sai. Sair com 0 é o sucesso dele.
    return !/Exited \(0\)/.test(s.status)
  })
  return { ok: ruins.length === 0, ruins }
}

// O teste NUNCA escreve em /DATA. O caminho do bind e reescrito para dentro de
// uma caixa de areia em /tmp, que e o unico lugar que o script apaga. Numa
// maquina RoqueOS de verdade /DATA/AppData e o dado do usuario.
export function caixa(texto, raiz) {
  return texto.replaceAll('/DATA/', `${raiz}/DATA/`)
}

export function semPortas(texto) {
  const doc = yaml.load(texto)
  for (const s of Object.values(doc?.services || {})) if (s) delete s.ports
  return yaml.dump(doc)
}

function estados(projeto) {
  const txt = sh('docker', [
    'compose',
    '-p',
    projeto,
    'ps',
    '-a',
    '--format',
    '{{.Service}}\t{{.State}}\t{{.Status}}',
  ])
  return txt
    .split('\n')
    .filter(Boolean)
    .map((l) => {
      const [service, state, status = ''] = l.split('\t')
      const m = /Restarting \((\d+)\)/.exec(status)
      return { service, state, status, restarts: m ? Number(m[1]) : 0 }
    })
}

function logs(projeto, servico) {
  try {
    return sh('docker', ['compose', '-p', projeto, 'logs', '--tail', '25', servico]).trim()
  } catch {
    return ''
  }
}

// Nem toda falha do laboratório é falha do app. Um sandbox sem IPv6 no kernel
// derruba qualquer nginx que escute em [::], e um sandbox que não deixa subir
// rlimit derruba qualquer stack que peça ulimit. Chamar isso de app quebrado
// seria mentir na direção contrária à do Grafana — e gate que mente em qualquer
// direção ensina a ignorar gate.
export const LIMITE_DO_LABORATORIO = [
  { re: /Address family not supported by protocol/i, motivo: 'kernel do laboratório sem IPv6' },
  { re: /error setting rlimit/i, motivo: 'laboratório não permite levantar rlimit' },
  { re: /operation not permitted.*rlimit/i, motivo: 'laboratório não permite levantar rlimit' },
  { re: /no space left on device/i, motivo: 'disco do laboratório acabou durante o pull' },
  { re: /toomanyrequests|rate limit/i, motivo: 'registry recusou por limite de pull' },
  // Um proxy que intercepta TLS envenena qualquer app que busque algo ao subir.
  // Isso nao acontece na rede de casa de ninguem: e o laboratorio, nao o app.
  {
    re: /SELF_SIGNED_CERT_IN_CHAIN|self-signed certificate in certificate chain|CERTIFICATE_VERIFY_FAILED|unable to get local issuer certificate/i,
    motivo: 'proxy do laboratório intercepta TLS',
  },
]

export function inconclusivo(erro) {
  for (const l of LIMITE_DO_LABORATORIO) if (l.re.test(erro || '')) return l.motivo
  return null
}

function espera(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

const SANDBOX = process.env.BOOT_SANDBOX || '/tmp/boot-roqueos'

export function testa(app) {
  const projeto = `bt-${app.toLowerCase().replace(/[^a-z0-9]/g, '')}`
  const dir = join(SANDBOX, projeto)
  const origem = join(APPS, app, 'docker-compose.yml')
  const inicio = Date.now()
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  const texto = caixa(renderiza(readFileSync(origem, 'utf8'), app.toLowerCase()), dir)
  // A porta publicada não faz parte do que a P10 mede, e no laboratório ela só
  // colide com o que já escuta na máquina — o 2FAuth falhou assim, por causa da
  // 8000 ocupada, e não por causa do app. Conflito de porta entre apps do
  // catálogo é assunto da P2, que é estática e não depende de subir nada.
  writeFileSync(join(dir, 'docker-compose.yml'), semPortas(texto))

  const res = {
    app,
    projeto,
    ok: false,
    inconclusivo: null,
    etapa: null,
    erro: null,
    servicos: [],
    segundos: 0,
  }
  try {
    try {
      sh('docker', ['compose', '-p', projeto, 'up', '-d', '--quiet-pull'], {
        cwd: dir,
        timeout: 15 * 60 * 1000,
      })
    } catch (e) {
      res.etapa = 'up'
      res.erro = String(e.stderr || e.message || e)
        .trim()
        .split('\n')
        .slice(-6)
        .join('\n')
      res.inconclusivo = inconclusivo(res.erro)
      return res
    }

    let v = { ok: false, ruins: [] }
    const limite = Date.now() + ESPERA_MS
    for (;;) {
      res.servicos = estados(projeto)
      v = veredito(res.servicos)
      if (Date.now() > limite) break
      espera(INTERVALO_MS)
    }
    res.ok = v.ok
    if (!v.ok) {
      res.etapa = 'estado'
      res.erro = v.ruins
        .map((s) => `${s.service}: ${s.status}\n${logs(projeto, s.service)}`)
        .join('\n---\n')
    }
    res.inconclusivo = res.ok ? null : inconclusivo(res.erro)
    return res
  } finally {
    res.segundos = Math.round((Date.now() - inicio) / 1000)
    try {
      sh('docker', ['compose', '-p', projeto, 'down', '-v', '-t', '5'], { cwd: dir })
    } catch {}
    rmSync(dir, { recursive: true, force: true })
    // Sem isto uma varredura do catálogo inteiro enche o disco do runner por
    // volta do vigésimo app, e a partir daí toda falha é falha de disco.
    if (process.env.BOOT_SEM_PODA !== '1') {
      try {
        sh('docker', ['image', 'prune', '-af'])
      } catch {}
    }
  }
}

const isCli = import.meta.url === pathToFileURL(process.argv[1] || '').href
if (isCli) {
  const forca = process.argv.includes('--forca')
  const host = hostLinux()
  if (!host.linux && !forca) {
    console.error(`P10 so vale em host Linux. Aqui: ${host.os}`)
    console.error('No Docker Desktop do macOS a permissao do bind e frouxa e o teste da verde falso.')
    process.exit(2)
  }
  const alvo = process.argv.includes('--todos')
    ? todosOsApps()
    : process.argv.slice(2).filter((a) => !a.startsWith('--'))
  if (!alvo.length) {
    console.error('uso: node scripts/boot-container.mjs <App> [App...] | --todos')
    process.exit(2)
  }
  mkdirSync(EVID, { recursive: true })
  const resumo = {
    host: host.os,
    quando: new Date().toISOString(),
    total: alvo.length,
    ok: 0,
    inconclusivos: [],
    falhas: [],
  }
  for (const app of alvo) {
    if (!existsSync(join(APPS, app, 'docker-compose.yml'))) {
      console.log(`SKIP ${app} (sem manifesto)`)
      continue
    }
    const r = testa(app)
    writeFileSync(join(EVID, `${app}.json`), JSON.stringify(r, null, 2) + '\n')
    if (r.ok) resumo.ok += 1
    else if (r.inconclusivo) resumo.inconclusivos.push({ app, motivo: r.inconclusivo })
    else resumo.falhas.push({ app, etapa: r.etapa, erro: (r.erro || '').slice(0, 400) })
    const marca = r.ok ? 'OK   ' : r.inconclusivo ? '?    ' : 'FALHA'
    console.log(`${marca} ${app} (${r.segundos}s)${r.inconclusivo ? ' — ' + r.inconclusivo : ''}`)
    if (!r.ok && !r.inconclusivo) console.log((r.erro || '').split('\n').slice(0, 8).join('\n'))
  }
  writeFileSync(join(EVID, 'resumo.json'), JSON.stringify(resumo, null, 2) + '\n')
  console.log(
    `\nP10: ${resumo.ok}/${resumo.total} subiram. ` +
      `Falhas: ${resumo.falhas.length}. Inconclusivos: ${resumo.inconclusivos.length}`,
  )
  for (const i of resumo.inconclusivos) console.log(`  ? ${i.app}: ${i.motivo}`)
  process.exit(resumo.falhas.length ? 1 : 0)
}
