#!/usr/bin/env node
// Descobre o USER declarado na imagem sem baixar camada nenhuma, usando o
// indice do registry (docker buildx imagetools inspect).
//
// Por que isto existe: o Docker cria o diretorio de origem de um bind que nao
// existe como root:root 0755. Se a imagem larga o privilegio para um uid fixo
// (Grafana = 472), o container nao consegue escrever no proprio dado e fica
// reiniciando para sempre. Nenhuma das premissas P1..P9 enxerga isso, porque
// todas leem o manifesto e nenhuma liga o container.
//
// O resultado fica em scripts/dados/uid-imagens.json para o gate rodar offline
// e dar o mesmo veredito na CI e aqui.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import yaml from 'js-yaml'
import { userDaImagem } from './registry-user.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = join(AQUI, '..')
const APPS = join(RAIZ, 'Apps')
export const CACHE = join(AQUI, 'dados', 'uid-imagens.json')

// Um uid que nao e root. "root", "0", "0:0" e vazio significam que o processo
// comeca como root e pode consertar a permissao sozinho.
export function naoRoot(user) {
  if (!user) return null
  const u = String(user).split(':')[0].trim()
  if (!u || u === 'root' || u === '0') return null
  return u
}

export const consultaAsync = userDaImagem

export function carregaCache() {
  if (!existsSync(CACHE)) return {}
  return JSON.parse(readFileSync(CACHE, 'utf8'))
}

// Le um manifesto e devolve, por servico, o que a premissa precisa saber.
export function servicos(nome, appsDir = APPS) {
  const arq = join(appsDir, nome, 'docker-compose.yml')
  if (!existsSync(arq)) return []
  const doc = yaml.load(readFileSync(arq, 'utf8')) || {}
  const out = []
  for (const [id, s] of Object.entries(doc.services || {})) {
    if (!s || typeof s !== 'object') continue
    const vols = Array.isArray(s.volumes) ? s.volumes : []
    const binds = vols
      .map((v) => (typeof v === 'string' ? { type: 'bind', source: v.split(':')[0] } : v))
      .filter((v) => v && (v.type === 'bind' || !v.type) && typeof v.source === 'string')
      .filter((v) => v.source.startsWith('/'))
    const env = s.environment || {}
    const chaves = Array.isArray(env)
      ? env.map((e) => String(e).split('=')[0])
      : Object.keys(env)
    out.push({
      app: nome,
      servico: id,
      imagem: s.image,
      user: s.user == null ? null : String(s.user),
      binds: binds.map((b) => b.source),
      puid: chaves.some((k) => /^(PUID|UID|USER_ID)$/i.test(k)),
      arranque: [s.entrypoint, s.command].flat().filter(Boolean).join(' '),
    })
  }
  return out
}

export function todosOsApps(appsDir = APPS) {
  return readdirSync(appsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
}

// O veredito. Risco = a imagem larga privilegio para um uid fixo, o servico
// escreve num bind que o instalador cria root:root, e o manifesto nao diz
// nada sobre usuario. Nesse caso o container nunca sobe.
// Um servico de arranque que roda como root e faz chown no mesmo bind resolve o
// problema sem tirar o privilegio reduzido do servico principal. E o conserto do
// Whoogle, que com cap_drop: ALL quebra quando roda como root. A checagem e
// mecanica: mesmo caminho de bind, usuario root, e chown na linha de comando.
export function tratadoPorInit(svc, irmaos) {
  return irmaos.some(
    (o) =>
      o.servico !== svc.servico &&
      naoRoot(o.user) === null &&
      o.user != null &&
      /chown/.test(o.arranque || '') &&
      o.binds.some((b) => svc.binds.includes(b)),
  )
}

export function risco(svc, cache, irmaos = []) {
  if (!svc.imagem) return null
  if (!svc.binds.length) return null
  if (svc.puid) return null
  if (tratadoPorInit(svc, irmaos)) return null

  // `user:` escrito no manifesto vale mais que o USER da imagem — e quando ele
  // aponta para um uid nao-root a falha e a mesma. Sete apps do catalogo ja
  // traziam user: "1000:1000" e afins sobre bind que o instalador cria root.
  if (svc.user != null) {
    const u = naoRoot(svc.user)
    return u ? { ...svc, uid: u, origem: 'manifesto' } : null
  }

  const registro = cache[svc.imagem]
  // Sem consulta, ou consulta que falhou ("?motivo"), nao ha veredito.
  // Acusar sem dado seria pior que nao checar.
  if (registro == null || registro.startsWith('?')) return null
  const uids = [...new Set(registro.split('|').map(naoRoot).filter(Boolean))]
  if (!uids.length) return null
  return { ...svc, uid: uids.join('/'), origem: 'imagem' }
}

// O cache guarda uma linha por imagem: "" = comeca como root, "472" ou
// "node|1000" = larga privilegio (uniao das plataformas linux, que e a leitura
// conservadora), "?motivo" = a consulta falhou.
export function compacta(porPlataforma) {
  const us = [
    ...new Set(
      Object.entries(porPlataforma)
        .filter(([p]) => p.startsWith('linux/'))
        .map(([, u]) => u || '')
        .filter(Boolean),
    ),
  ]
  return us.join('|')
}

const isCli = import.meta.url === pathToFileURL(process.argv[1] || '').href
if (isCli) {
  const atualiza = process.argv.includes('--atualiza')
  const apps = todosOsApps()
  const svcs = apps.flatMap((a) => servicos(a))
  let cache = carregaCache()

  if (atualiza) {
    const tudo = process.argv.includes('--tudo')
    const imagens = [...new Set(svcs.map((s) => s.imagem).filter(Boolean))]
      .sort()
      .filter((img) => tudo || cache[img] == null || cache[img].startsWith('?'))
    let n = 0
    const fila = [...imagens]
    const trabalhador = async () => {
      for (;;) {
        const img = fila.shift()
        if (!img) return
        // O registry devolve 429 quando apertamos. Errar por aperto nosso e
        // ruido, nao dado: insiste com espera crescente antes de desistir.
        for (let tentativa = 1; ; tentativa += 1) {
          try {
            cache[img] = compacta(await consultaAsync(img))
            break
          } catch (e) {
            const msg = String(e.stderr || e.message || e).split('\n')[0].slice(0, 160)
            if (tentativa >= 5) {
              cache[img] = `?${msg}`
              break
            }
            await new Promise((r) => setTimeout(r, tentativa * 8000 + Math.random() * 4000))
          }
        }
        n += 1
        process.stderr.write(`${n}/${imagens.length} ${img}\n`)
      }
    }
    await Promise.all(Array.from({ length: 4 }, trabalhador))
    const ordenado = {}
    for (const k of Object.keys(cache).sort()) ordenado[k] = cache[k]
    writeFileSync(CACHE, JSON.stringify(ordenado, null, 2) + '\n')
    cache = carregaCache()
  }

  const achados = svcs.map((s) => risco(s, cache)).filter(Boolean)
  const semCache = svcs.filter((s) => s.imagem && cache[s.imagem] == null).length
  console.log(`servicos: ${svcs.length}  sem cache: ${semCache}  em risco: ${achados.length}`)
  for (const a of achados) {
    console.log(`${a.app}/${a.servico}  uid=${a.uid}  ${a.imagem}  ${a.binds.join(' ')}`)
  }
}
