#!/usr/bin/env node
// A ficha de loja de cada app, gerada do manifesto.
//
// O README não é texto livre: cada linha dele sai do docker-compose.yml, que é
// o que o usuário vai de fato rodar. Porta, volume, variável e imagem vêm do
// YAML; descrição e tagline vêm do x-casaos; a fonte oficial vem do developer ou
// de scripts/dados/links-upstream.json. Nada é inventado, e por isso o arquivo
// pode ser regerado quando o manifesto mudar, sem perder revisão humana.
//
//   node scripts/gera-readme.mjs --dry-run
//   node scripts/gera-readme.mjs --app Frigate
//   node scripts/gera-readme.mjs
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const APPS = 'Apps'
const seco = process.argv.includes('--dry-run')
const um = process.argv.includes('--app') ? process.argv[process.argv.indexOf('--app') + 1] : null
const LINKS = fs.existsSync('scripts/dados/links-upstream.json')
  ? JSON.parse(fs.readFileSync('scripts/dados/links-upstream.json', 'utf8'))
  : {}

/** Texto do x-casaos no idioma pedido, com a cadeia de fallback do catálogo. */
const txt = (campo, l) => campo?.[l] || campo?.en_us || campo?.en_US || ''

function tabela(cabecalho, linhas) {
  if (!linhas.length) return '_Nenhum._\n'
  const larg = cabecalho.map((c, i) => Math.max(c.length, ...linhas.map((l) => String(l[i]).length)))
  const linha = (cols) => '| ' + cols.map((c, i) => String(c).padEnd(larg[i])).join(' | ') + ' |'
  return [
    linha(cabecalho),
    '| ' + larg.map((n) => '-'.repeat(n)).join(' | ') + ' |',
    ...linhas.map(linha),
  ].join('\n')
}

function gerar(nome) {
  const dir = path.join(APPS, nome)
  const arq = path.join(dir, 'docker-compose.yml')
  if (!fs.existsSync(arq)) return null
  const doc = yaml.load(fs.readFileSync(arq, 'utf8'))
  const x = doc['x-casaos'] || {}
  const xr = doc['x-roqueos'] || {}
  const servicos = Object.entries(doc.services || {})
  const principal = x.main ? doc.services?.[x.main] : servicos[0]?.[1]

  const titulo = txt(x.title, 'en_us') || nome
  const tagline = txt(x.tagline, 'pt_br') || txt(x.tagline, 'en_us')
  const descricao = txt(x.description, 'pt_br') || txt(x.description, 'en_us')
  const categoria = Array.isArray(x.category) ? x.category[0] : x.category

  const portas = []
  for (const [ns, s] of servicos) {
    const desc = new Map(
      (s['x-casaos']?.ports || []).map((d) => [String(d.container), txt(d.description, 'pt_br')]),
    )
    for (const p of s.ports || []) {
      const alvo = String(p.target ?? String(p).split(':').slice(-1)[0]).split('/')[0]
      const host = String(p.published ?? String(p).split(':')[0]).split('/')[0]
      portas.push([host, alvo, p.protocol || 'tcp', desc.get(alvo) || '—', ns])
    }
  }

  const volumes = []
  for (const [ns, s] of servicos)
    for (const v of s.volumes || []) {
      const src = typeof v === 'string' ? v.split(':')[0] : v.source
      const dst = typeof v === 'string' ? v.split(':')[1] : v.target
      volumes.push([src || '—', dst || '—', ns])
    }

  const envs = []
  for (const [ns, s] of servicos) {
    const lista = Array.isArray(s.environment)
      ? s.environment.map((e) => String(e).split(/=(.*)/s).slice(0, 2))
      : Object.entries(s.environment || {})
    for (const [k, v] of lista) if (k) envs.push([k, String(v ?? '').slice(0, 60) || '—', ns])
  }

  const imagens = servicos.map(([ns, s]) => [ns, s.image || '—'])
  const upstream = LINKS[nome]?.website || x.developer || ''
  const porta = x.port_map || portas[0]?.[0] || ''
  const esquema = x.scheme || 'http'
  const caminho = x.index || '/'

  const motivos = Object.entries(xr.motivo || {})
  // `tips.before_install` tem duas formas no catálogo: lista de {content,value}
  // em 37 apps, e objeto de i18n com um texto corrido em 103. As duas vieram do
  // upstream e nenhuma vai sumir, então o gerador entende as duas.
  const bi = x.tips?.before_install
  const tips = Array.isArray(bi)
    ? bi.map((t) => (t.content || '').trim() + (t.value ? ` \`${t.value}\`` : '')).filter(Boolean)
    : bi && typeof bi === 'object'
      ? txt(bi, 'pt_br')
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
      : []

  return `# ${titulo}

${tagline ? `> ${tagline}\n` : ''}
## O que é

${descricao || '_Descrição ainda não escrita para este app._'}

Categoria na App Store do RoqueOS: **${categoria || 'Other'}**.
Arquiteturas suportadas: ${(x.architectures || []).join(', ') || '_não declaradas_'}.

## Portas

${tabela(['Host', 'Container', 'Protocolo', 'Para que serve', 'Serviço'], portas)}

${
  xr.portaCompartilhada
    ? '> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.\n'
    : ''
}
## Volumes

Onde os dados deste app ficam no seu servidor.

${tabela(['No host', 'No container', 'Serviço'], volumes)}

## Variáveis de ambiente

${tabela(['Variável', 'Valor padrão', 'Serviço'], envs)}

## Primeiro acesso

${
  porta
    ? `Depois de instalar, abra \`${esquema}://<endereço-do-servidor>:${porta}${caminho}\`.`
    : 'Abra o app pelo ícone no RoqueOS depois de instalar.'
}
${tips.length ? '\n' + tips.map((t) => `- ${t}`).join('\n') + '\n' : ''}${
    motivos.length
      ? '\n### Por que este app pede privilégio\n\n' +
        motivos.map(([k, v]) => `- \`${k}\`: ${v}`).join('\n') +
        '\n'
      : ''
  }
## Imagens

${tabela(['Serviço', 'Imagem'], imagens)}

## Fonte oficial

${upstream ? `Projeto original: ${upstream.startsWith('http') ? upstream : `**${upstream}**`}` : '_Não declarada no manifesto._'}

---

_Ficha gerada de \`docker-compose.yml\` por \`scripts/gera-readme.mjs\`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
`
}

const nomes = um
  ? [um]
  : fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
let n = 0
for (const nome of nomes) {
  const md = gerar(nome)
  if (!md) continue
  if (um && seco) {
    console.log(md)
    process.exit(0)
  }
  if (!seco) fs.writeFileSync(path.join(APPS, nome, 'README.md'), md)
  n++
}
console.log(`${seco ? '(dry run) ' : ''}README gerado para ${n} app(s)`)
