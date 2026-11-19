#!/usr/bin/env node
// O gate da documentacao. Uma pagina que mente sobre o catalogo e pior que
// pagina nenhuma, e cada regra abaixo pega um jeito que ela ja mentiu ou podia
// mentir sem ninguem ver:
//
//   1. contagem: "N apps" no README e no CLAUDE.md bate com as pastas de Apps/;
//   2. links: todo link relativo aponta para um arquivo que existe, e toda
//      ancora (#secao) para um titulo que existe nele;
//   3. pares: cada pagina em ingles tem o par em docs/pt-BR/, e os dois se citam;
//   4. travessao: nenhum em dash (U+2014) nem en dash (U+2013) no texto;
//   5. qualidade: docs/QUALITY.md e o par sao iguais ao que o gerador escreve hoje.
//
//   node scripts/check-docs.mjs     sai 1 e lista cada problema

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Pagina principal (ingles) -> traducao. Toda pagina de docs/ precisa estar aqui. */
export const PARES = {
  'README.md': 'README.pt-BR.md',
  'CONTRIBUTING.md': 'docs/pt-BR/CONTRIBUTING.md',
  'docs/INDEX.md': 'docs/pt-BR/INDEX.md',
  'docs/GETTING-STARTED.md': 'docs/pt-BR/COMECAR.md',
  'docs/ARCHITECTURE.md': 'docs/pt-BR/ARQUITETURA.md',
  'docs/INTEGRATIONS.md': 'docs/pt-BR/INTEGRACOES.md',
  'docs/ADDING-AN-APP.md': 'docs/pt-BR/ADICIONAR-UM-APP.md',
  'docs/TESTING.md': 'docs/pt-BR/CRITERIOS-DE-TESTE.md',
  'docs/REFERENCE.md': 'docs/pt-BR/REFERENCIA.md',
  'docs/HOW-IT-SHIPS.md': 'docs/pt-BR/COMO-CHEGA.md',
  'docs/WHEN-IT-BREAKS.md': 'docs/pt-BR/QUANDO-QUEBRA.md',
  'docs/GLOSSARY.md': 'docs/pt-BR/GLOSSARIO.md',
  'docs/RETIRED.md': 'docs/pt-BR/APOSENTADOS.md',
  'docs/QUALITY.md': 'docs/pt-BR/QUALIDADE.md',
}

/** Arquivos em que a contagem de apps tem de bater com o disco. */
export const COM_CONTAGEM = ['README.md', 'README.pt-BR.md', 'CLAUDE.md']

const TRAVESSAO = /[–—]/

function lista(dir, filtro) {
  if (!existsSync(dir)) return []
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...lista(p, filtro))
    else if (filtro(e.name)) out.push(p)
  }
  return out
}

/** Os arquivos de texto que o gate le, relativos a raiz. */
export function arquivos(raiz = RAIZ) {
  const md = (n) => n.endsWith('.md')
  const raizMd = readdirSync(raiz).filter((n) => md(n) && statSync(join(raiz, n)).isFile())
  return [
    ...raizMd.map((n) => join(raiz, n)),
    ...lista(join(raiz, 'docs'), md),
    ...lista(join(raiz, '.github'), (n) => md(n) || n.endsWith('.yml')),
    ...lista(join(raiz, '.claude', 'rules'), md),
  ]
    .map((p) => relative(raiz, p))
    .sort()
}

/** Tira blocos de codigo e codigo em linha, onde link e travessao nao contam. */
export function semCodigo(texto) {
  return texto
    .replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length))
}

/** O slug que o GitHub da a um titulo. */
export function slug(titulo) {
  return titulo
    .trim()
    .toLowerCase()
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-')
}

/** As ancoras de uma pagina: os titulos (com o sufixo -1, -2 do GitHub) e os id/name explicitos. */
export function ancoras(texto) {
  const vistos = new Map()
  const out = new Set()
  const limpo = texto.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '')
  for (const l of limpo.split('\n')) {
    const m = /^#{1,6}\s+(.+?)\s*#*\s*$/.exec(l)
    if (!m) continue
    const base = slug(m[1].replace(/`/g, ''))
    const n = vistos.get(base) || 0
    out.add(n ? `${base}-${n}` : base)
    vistos.set(base, n + 1)
  }
  for (const m of texto.matchAll(/<a\s+(?:id|name)="([^"]+)"/g)) out.add(m[1])
  return out
}

/** Os alvos de link de uma pagina, fora de codigo. */
export function links(texto) {
  const t = semCodigo(texto)
  const out = []
  for (const m of t.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) out.push(m[1])
  for (const m of t.matchAll(/\b(?:href|src)="([^"]+)"/g)) out.push(m[1])
  return out
}

/** Linhas (1-based) com travessao, fora de codigo. */
export function travessoes(texto) {
  return semCodigo(texto)
    .split('\n')
    .flatMap((l, i) => (TRAVESSAO.test(l) ? [i + 1] : []))
}

/** As contagens de apps que um texto afirma. */
export function contagens(texto) {
  const t = semCodigo(texto)
  const out = []
  for (const m of t.matchAll(/\b(\d{2,4})(?: [\w-]+)? apps\b/g)) out.push(Number(m[1]))
  for (const m of t.matchAll(/\bapps-(\d{2,4})\b/g)) out.push(Number(m[1]))
  return [...new Set(out)]
}

function ehExterno(alvo) {
  return /^[a-z][a-z0-9+.-]*:/i.test(alvo) || alvo.startsWith('//')
}

/** Todos os problemas da documentacao. Vazio quer dizer verde. */
export function verifica(raiz = RAIZ, { qualidade = true } = {}) {
  const erros = []
  const nApps = readdirSync(join(raiz, 'Apps'), { withFileTypes: true }).filter((d) => d.isDirectory()).length
  const todos = arquivos(raiz)
  const cache = new Map()
  const ler = (rel) => {
    if (!cache.has(rel)) cache.set(rel, readFileSync(join(raiz, rel), 'utf8'))
    return cache.get(rel)
  }

  for (const rel of todos) {
    const texto = ler(rel)
    for (const l of travessoes(texto)) erros.push(`${rel}:${l}: travessao (use virgula, dois-pontos ou parenteses)`)
    if (!rel.endsWith('.md')) continue
    for (const alvo of links(texto)) {
      if (ehExterno(alvo)) continue
      const [caminho, ancora] = alvo.split('#')
      const destino = caminho ? resolve(join(raiz, dirname(rel)), decodeURI(caminho)) : join(raiz, rel)
      if (!destino.startsWith(raiz)) continue
      if (!existsSync(destino)) {
        erros.push(`${rel}: link quebrado para ${alvo}`)
        continue
      }
      if (ancora && destino.endsWith('.md')) {
        const relDestino = relative(raiz, destino)
        const conteudo = cache.get(relDestino) ?? readFileSync(destino, 'utf8')
        if (!ancoras(conteudo).has(decodeURIComponent(ancora))) erros.push(`${rel}: ancora #${ancora} nao existe em ${relDestino}`)
      }
    }
  }

  for (const rel of COM_CONTAGEM) {
    if (!existsSync(join(raiz, rel))) continue
    for (const n of contagens(ler(rel))) {
      if (n !== nApps) erros.push(`${rel}: diz ${n} apps, Apps/ tem ${nApps}`)
    }
  }

  const docsEn = readdirSync(join(raiz, 'docs')).filter((n) => n.endsWith('.md')).map((n) => `docs/${n}`)
  for (const rel of docsEn) if (!PARES[rel]) erros.push(`${rel}: sem par em docs/pt-BR/ (registre em PARES)`)
  const ptDir = join(raiz, 'docs', 'pt-BR')
  const docsPt = existsSync(ptDir) ? readdirSync(ptDir).filter((n) => n.endsWith('.md')).map((n) => `docs/pt-BR/${n}`) : []
  const valores = new Set(Object.values(PARES))
  for (const rel of docsPt) if (!valores.has(rel)) erros.push(`${rel}: traducao sem pagina em ingles (registre em PARES)`)
  for (const [en, pt] of Object.entries(PARES)) {
    const temEn = existsSync(join(raiz, en))
    const temPt = existsSync(join(raiz, pt))
    if (!temEn) erros.push(`${en}: falta (par de ${pt})`)
    if (!temPt) erros.push(`${pt}: falta (traducao de ${en})`)
    if (!temEn || !temPt) continue
    const cita = (de, para) =>
      links(ler(de)).some((a) => !ehExterno(a) && a.split('#')[0] && resolve(join(raiz, dirname(de)), a.split('#')[0]) === join(raiz, para))
    if (!cita(en, pt)) erros.push(`${en}: nao aponta para a traducao ${pt}`)
    if (!cita(pt, en)) erros.push(`${pt}: nao aponta para a versao principal ${en}`)
  }

  return { erros, nApps, arquivos: todos.length, qualidade }
}

const isCli = import.meta.url === pathToFileURL(process.argv[1] || '').href
if (isCli) {
  const r = verifica()
  const { retrato, pagina, SAIDAS } = await import('./gera-qualidade.mjs')
  const ret = retrato()
  for (const l of ['en', 'pt']) {
    const atual = existsSync(SAIDAS[l]) ? readFileSync(SAIDAS[l], 'utf8') : ''
    if (atual !== pagina(ret, l)) r.erros.push(`${relative(RAIZ, SAIDAS[l])}: desatualizado (rode yarn docs:quality)`)
  }
  for (const e of r.erros) console.error(e)
  if (r.erros.length) {
    console.error(`\n${r.erros.length} problema(s) em ${r.arquivos} arquivo(s).`)
    process.exit(1)
  }
  console.log(`docs ok: ${r.arquivos} arquivos, ${Object.keys(PARES).length} pares, ${r.nApps} apps, pagina de qualidade em dia`)
}
