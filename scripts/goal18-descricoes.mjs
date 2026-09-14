#!/usr/bin/env node
// Goal 18: descricao que repete o proprio campo nao e descricao.
//
// 46 apps importados de upstream traziam 326 descricoes geradas por maquina no
// formato `Container Path: /app/data` para o volume `/app/data`, `Container
// Variable: TZ` para a variavel `TZ`. Isso passa em qualquer checagem de "tem
// descricao?" e nao informa nada a quem vai instalar — pior, entrou nos 252
// READMEs de ficha de loja, onde a coluna "Para que serve" repetia a coluna ao
// lado.
//
// Aqui a descricao sai do SIGNIFICADO do caminho, da porta ou do nome da
// variavel. O que nao casa nenhuma regra fica apontado no relatorio em vez de
// ganhar outra frase vazia: e melhor saber que faltam dez do que ter 326
// tautologias que parecem preenchidas.
//
//   node scripts/goal18-descricoes.mjs --dry-run
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const seco = process.argv.includes('--dry-run')
const APPS = 'Apps'

/** A descricao gerada por maquina que precisa sair. */
const TAUTOLOGIA = /^(Container (Path|Variable|Port)\s*:|Service port \d+ of )/i

const PORTAS = {
  22: 'SSH access',
  53: 'DNS queries',
  80: 'HTTP',
  443: 'HTTPS',
  445: 'SMB file sharing',
  1883: 'MQTT broker',
  3306: 'MySQL database',
  5432: 'PostgreSQL database',
  6379: 'Redis cache',
  8554: 'RTSP streaming',
  9090: 'Prometheus metrics',
  27017: 'MongoDB database',
  51820: 'WireGuard tunnel',
}

/** O que o caminho DENTRO do container significa. */
const VOLUMES = [
  [/^\/var\/run\/docker\.sock$/, "The host's Docker socket, so the app can see and manage containers"],
  [/^\/etc\/(localtime|timezone)$/, "The host's clock, so timestamps match the server"],
  [/^\/(config|etc\/[a-z]+\/conf)/i, 'Configuration files, kept between updates'],
  [/^\/(data|app\/data|var\/lib)/i, 'Application data: this is what you back up'],
  [/^\/(media|movies|tv|music|photos|library)/i, 'Your media library'],
  [/^\/(downloads?|incomplete)/i, 'Where finished downloads land'],
  [/^\/(backups?|snapshots?)/i, 'Backup files'],
  [/^\/(logs?|var\/log)/i, 'Log files'],
  [/^\/(cache|tmp|temp)/i, 'Temporary cache, safe to discard'],
  [/^\/(certs?|ssl|letsencrypt)/i, 'TLS certificates'],
  [/^\/(uploads?|files?|storage)/i, 'Files uploaded through the app'],
  [/^\/dev\//, 'Hardware device the app needs direct access to'],
  [/^\/(proc|sys)/, 'Host kernel information the app reads'],
  [/^\/(rootfs|mnt\/host|host)$/i, "The host filesystem, mounted read-only so the app can inspect it"],
  [/\/(data|db|database)$/i, 'Application data: this is what you back up'],
  [/^\/root\/\./, 'Per-user settings the app writes'],
  [/^\/(var\/run|run)$/i, 'Runtime sockets the app talks to'],
]

/** O que o nome da variavel significa. */
const ENVS = [
  [/^(TZ|TIMEZONE)$/i, 'Timezone, e.g. America/Sao_Paulo'],
  [/^PUID$/i, 'User ID that owns the files the app writes'],
  [/^PGID$/i, 'Group ID that owns the files the app writes'],
  [/^UMASK$/i, 'Permission mask for files the app creates'],
  [/PASSWORD|PASSWD|_PASS$/i, 'Password: change it before the first boot'],
  [/SECRET|_KEY$|API_KEY|TOKEN/i, 'Secret: generate a long random value, never ship the default'],
  [/^(DB|DATABASE|POSTGRES|MYSQL|MONGO)_?(HOST|NAME|USER|PORT|URL)?/i, 'Database connection setting'],
  [/MAIL|SMTP/i, 'Outgoing e-mail setting'],
  [/URL$|_URI$|BASE_URL|PUBLIC_URL/i, 'Public address the app answers on'],
  [/PORT$/i, 'Port the app listens on inside the container'],
  [/^LOG_?LEVEL$/i, 'How verbose the log is'],
  [/LANG|LOCALE/i, 'Interface language'],
  [/PATH$|_DIR$|DIRECTORY/i, 'Path the app reads from or writes to'],
  [/ENABLE|DISABLE|^ALLOW|^USE_/i, 'Feature switch'],
  [/^NODE_ENV$/i, 'Runtime mode: production or development'],
  [/SCHEDULE|CRON|INTERVAL|_EVERY$/i, 'How often the job runs'],
  [/WORKERS|CONCURRENCY|THREADS|JITTER/i, 'How much work runs at the same time'],
  [/^VPN_|WIREGUARD|OPENVPN|SERVER_COUNTRIES|SERVER_CITIES/i, 'VPN provider setting: see the app docs for the accepted values'],
  [/^(HOST|HOSTNAME)$/i, 'Address the app binds to inside the container'],
  [/_USER$|USERNAME/i, 'Account name the app uses'],
  [/PROVIDER|BACKEND|DRIVER/i, 'Which backend the app talks to'],
  [/SIZE|LIMIT|MAX_|MIN_/i, 'Size or limit the app enforces'],
  [/^[A-Z0-9]+_(HOST|PORT|USER|PASSWORD|DB|NAME|URL)$/i, 'Connection setting for a service this app depends on'],
]

function frasePorta(container, host, portMap, titulo) {
  if (String(container) === String(portMap) || String(host) === String(portMap))
    return `Web interface for ${titulo}`
  return PORTAS[container] ? `${PORTAS[container]} (port ${container})` : null
}

const acharVolume = (p) => VOLUMES.find(([re]) => re.test(p))?.[1] ?? null
const acharEnv = (k) => ENVS.find(([re]) => re.test(k))?.[1] ?? null

const nomes = fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
const trocadas = { ports: 0, volumes: 0, envs: 0 }
const semRegra = []
let apps = 0

for (const n of nomes) {
  const arq = path.join(APPS, n, 'docker-compose.yml')
  if (!fs.existsSync(arq)) continue
  const doc = yaml.load(fs.readFileSync(arq, 'utf8'))
  const x = doc['x-casaos'] || {}
  const portMap = String(x.port_map || '')
  const titulo = x.title?.en_us || x.title?.en_US || n
  let mudou = false

  for (const [, s] of Object.entries(doc.services || {})) {
    const xc = s['x-casaos']
    if (!xc) continue

    for (const p of xc.ports || []) {
      const atual = p.description?.en_us ?? p.description?.en_US ?? ''
      if (!TAUTOLOGIA.test(atual)) continue
      const host = (s.ports || [])
        .map((q) => ({
          alvo: String(q.target ?? String(q).split(':').slice(-1)[0]).split('/')[0],
          host: String(q.published ?? String(q).split(':')[0]).split('/')[0],
        }))
        .find((q) => q.alvo === String(p.container))?.host
      const nova = frasePorta(p.container, host, portMap, titulo)
      if (!nova) {
        semRegra.push(`${n} porta ${p.container}`)
        continue
      }
      p.description = { ...(p.description || {}), en_us: nova }
      delete p.description.en_US
      trocadas.ports++
      mudou = true
    }

    for (const v of xc.volumes || []) {
      const atual = v.description?.en_us ?? v.description?.en_US ?? ''
      if (!TAUTOLOGIA.test(atual)) continue
      const nova = acharVolume(String(v.container || ''))
      if (!nova) {
        semRegra.push(`${n} volume ${v.container}`)
        continue
      }
      v.description = { ...(v.description || {}), en_us: nova }
      delete v.description.en_US
      trocadas.volumes++
      mudou = true
    }

    for (const e of xc.envs || []) {
      const atual = e.description?.en_us ?? e.description?.en_US ?? ''
      if (!TAUTOLOGIA.test(atual)) continue
      const nova = acharEnv(String(e.container || ''))
      if (!nova) {
        semRegra.push(`${n} env ${e.container}`)
        continue
      }
      e.description = { ...(e.description || {}), en_us: nova }
      delete e.description.en_US
      trocadas.envs++
      mudou = true
    }
  }

  if (mudou) {
    apps++
    if (!seco) fs.writeFileSync(arq, yaml.dump(doc, { lineWidth: -1, noRefs: true, quotingType: '"' }))
  }
}

console.log(`\nGoal 18 — descrições ${seco ? '(DRY RUN)' : '(aplicado)'}`)
console.log(`  apps tocados:            ${apps}`)
console.log(`  portas:                  ${trocadas.ports}`)
console.log(`  volumes:                 ${trocadas.volumes}`)
console.log(`  variáveis:               ${trocadas.envs}`)
console.log(`  total:                   ${trocadas.ports + trocadas.volumes + trocadas.envs}`)
console.log(`\n  sem regra, ficam como estão e aparecem aqui: ${semRegra.length}`)
for (const s of semRegra.slice(0, 25)) console.log(`    ${s}`)
if (semRegra.length > 25) console.log(`    ... e mais ${semRegra.length - 25}`)
