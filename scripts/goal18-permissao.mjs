#!/usr/bin/env node
// Fecha a P10: servico cuja imagem larga privilegio para um uid fixo e escreve
// num bind que o instalador cria root:root 0755.
//
// A correcao e `user: "0:0"`. As alternativas foram medidas em 14/09/2026 num
// daemon Linux, nao escolhidas por gosto:
//
//   sem nada          -> Restarting (1), "GF_PATHS_DATA is not writable"
//   user: "472"       -> mesma coisa: o diretorio continua root:root
//   volume nomeado    -> funciona, mas tira o dado de /DATA/AppData e quebra
//                        a convencao de backup do RoqueOS
//   volume local com  -> "failed to populate volume: no such file or directory"
//   type=none,o=bind     quando o diretorio nao existe, que e sempre no
//                        primeiro install
//   user: "0:0"       -> "Up", plugin instalado, dado em /DATA
//
// O preco e real e esta escrito aqui para nao virar folclore: o processo roda
// como root dentro do container e o dado do usuario fica com dono root. Num
// servidor de casa com um dono so, e o que o ecossistema CasaOS ja faz.
//
// Quem apaga esta escolha tem que trocar o instalador: criar o diretorio do
// bind com o dono certo antes do `compose up` resolveria sem abrir mao do
// privilegio reduzido, mas exige mexer no roqueos-server e deixaria o catalogo
// quebrado em qualquer outro host CasaOS.

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { carregaCache, risco, servicos, todosOsApps } from './uid-imagem.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const APPS = join(AQUI, '..', 'Apps')

const NOTA = '# roda como root: o instalador cria o bind root:root e a imagem escreve como uid'

// Insere `user: "0:0"` logo abaixo da linha `image:` do servico, preservando
// comentario e ordem do arquivo. Reescrever com js-yaml perderia os dois.
export function aplica(texto, servico, uid) {
  const linhas = texto.split('\n')
  const alvo = new RegExp(`^  ${servico}:\\s*$`)
  let i = linhas.findIndex((l) => alvo.test(l))
  if (i < 0) return { texto, mudou: false, razao: 'servico nao encontrado' }
  for (i += 1; i < linhas.length; i += 1) {
    if (/^  \S/.test(linhas[i])) return { texto, mudou: false, razao: 'image nao encontrada' }
    if (/^    image:/.test(linhas[i])) break
  }
  if (i >= linhas.length) return { texto, mudou: false, razao: 'image nao encontrada' }
  linhas.splice(i + 1, 0, `    user: "0:0" ${NOTA} ${uid}`)
  return { texto: linhas.join('\n'), mudou: true, razao: null }
}

// Troca um `user:` nao-root ja existente por "0:0".
export function troca(texto, servico, uid) {
  const linhas = texto.split('\n')
  const alvo = new RegExp(`^  ${servico}:\\s*$`)
  let i = linhas.findIndex((l) => alvo.test(l))
  if (i < 0) return { texto, mudou: false, razao: 'servico nao encontrado' }
  for (i += 1; i < linhas.length; i += 1) {
    if (/^  \S/.test(linhas[i])) return { texto, mudou: false, razao: 'user nao encontrado' }
    if (/^    user:/.test(linhas[i])) break
  }
  if (i >= linhas.length) return { texto, mudou: false, razao: 'user nao encontrado' }
  linhas[i] = `    user: "0:0" ${NOTA} ${uid}`
  return { texto: linhas.join('\n'), mudou: true, razao: null }
}

const isCli = import.meta.url === pathToFileURL(process.argv[1] || '').href
if (isCli) {
  const seco = !process.argv.includes('--aplica')
  const filtro = process.argv.filter((a) => !a.startsWith('--')).slice(2)
  const cache = carregaCache()
  const apps = (filtro.length ? filtro : todosOsApps()).sort()
  let n = 0
  const problemas = []
  for (const app of apps) {
    const arq = join(APPS, app, 'docker-compose.yml')
    let texto
    try {
      texto = readFileSync(arq, 'utf8')
    } catch {
      continue
    }
    let mudouAlgo = false
    for (const svc of servicos(app)) {
      const r = risco(svc, cache)
      if (!r) continue
      const fn = r.origem === 'manifesto' ? troca : aplica
      const out = fn(texto, svc.servico, r.uid)
      if (!out.mudou) {
        problemas.push(`${app}/${svc.servico}: ${out.razao}`)
        continue
      }
      texto = out.texto
      mudouAlgo = true
      console.log(`${app}/${svc.servico}  uid=${r.uid} (${r.origem})`)
    }
    if (mudouAlgo) {
      n += 1
      if (!seco) writeFileSync(arq, texto)
    }
  }
  console.log(`\n${n} apps ${seco ? 'a corrigir (ensaio; use --aplica)' : 'corrigidos'}`)
  if (problemas.length) {
    console.log('\nnao deu para aplicar sozinho:')
    for (const p of problemas) console.log(`  ${p}`)
  }
}
