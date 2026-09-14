#!/usr/bin/env node
// Goal 18: uma grafia só por idioma, a que o consumidor lê.
//
// O catálogo escrevia português de três jeitos (pt_br 117, pt_PT 55, pt_BR 1) e
// inglês de quatro (en_us 148, en_US 55, en_GB 55, en_uk 1). O roqueos-server lê
// UMA: `casaos.title?.en_us` e `casaos.description?.en_us`, minúsculo. O que não
// bate com essa grafia não existe para ele, e o app cai no fallback:
//
//   name:        casaos.title?.en_us       || appName
//   description: casaos.description?.en_us || `${appName} Docker application`
//
// Medido em 14/09/2026: 44 apps apareciam na App Store com o nome da PASTA no
// lugar do título, e 56 com a frase "<app> Docker application" no lugar da
// descrição. Nenhum relatório do repo mostrava isso, porque todos conferiam se
// o campo existe, não se o consumidor o encontra.
//
// A regra: minúsculo com sublinhado (en_us, pt_br), que é a convenção do CasaOS.
// Quem já tem a grafia certa manda; as outras entram só onde há buraco. pt_PT é
// português europeu e vira pt_br apenas quando não há pt_br — texto de gente em
// outra variante é melhor que inglês, e é honesto dizer de onde veio.
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const seco = process.argv.includes('--dry-run')
const APPS = 'Apps'

/** De onde para onde, na ordem de preferência da origem. */
const ALVO = {
  en_us: ['en_us', 'en_US', 'en_GB', 'en_uk', 'en_UK'],
  pt_br: ['pt_br', 'pt_BR', 'pt_PT', 'pt_pt'],
  zh_cn: ['zh_cn', 'zh_CN'],
  es_es: ['es_es', 'es_ES'],
  fr_fr: ['fr_fr', 'fr_FR'],
  de_de: ['de_de', 'de_DE'],
  it_it: ['it_it', 'it_IT'],
  ru_ru: ['ru_ru', 'ru_RU'],
  ja_jp: ['ja_jp', 'ja_JP'],
  ar_sa: ['ar_sa', 'ar_SA'],
}

/** Devolve {mudou, obj} com as chaves canônicas preenchidas. */
function normalizar(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return { mudou: false, obj }
  let mudou = false
  for (const [canon, fontes] of Object.entries(ALVO)) {
    if (obj[canon]?.trim?.()) continue
    for (const f of fontes) {
      if (f === canon) continue
      if (obj[f]?.trim?.()) {
        obj[canon] = obj[f]
        mudou = true
        break
      }
    }
  }
  return { mudou, obj }
}

/** Percorre todo objeto de i18n do manifesto e normaliza no lugar. */
function varrer(no, contador) {
  if (!no || typeof no !== 'object') return
  if (Array.isArray(no)) {
    for (const i of no) varrer(i, contador)
    return
  }
  // Um objeto é "de i18n" quando toda chave dele parece um locale.
  const chaves = Object.keys(no)
  const pareceI18n =
    chaves.length && chaves.every((k) => /^[a-z]{2}_[a-zA-Z]{2}$/.test(k))
  if (pareceI18n) {
    const { mudou } = normalizar(no)
    if (mudou) contador.n++
    return
  }
  for (const v of Object.values(no)) varrer(v, contador)
}

const nomes = fs.readdirSync(APPS).filter((n) => fs.statSync(path.join(APPS, n)).isDirectory())
let apps = 0
let blocos = 0
const ganhou = { titulo: [], descricao: [], taglinePt: [], descricaoPt: [] }

for (const n of nomes) {
  const arq = path.join(APPS, n, 'docker-compose.yml')
  if (!fs.existsSync(arq)) continue
  const doc = yaml.load(fs.readFileSync(arq, 'utf8'))
  const antesTitulo = !!doc['x-casaos']?.title?.en_us
  const antesDesc = !!doc['x-casaos']?.description?.en_us
  const antesTagPt = !!doc['x-casaos']?.tagline?.pt_br
  const antesDescPt = !!doc['x-casaos']?.description?.pt_br

  const contador = { n: 0 }
  varrer(doc, contador)
  if (!contador.n) continue

  if (!antesTitulo && doc['x-casaos']?.title?.en_us) ganhou.titulo.push(n)
  if (!antesDesc && doc['x-casaos']?.description?.en_us) ganhou.descricao.push(n)
  if (!antesTagPt && doc['x-casaos']?.tagline?.pt_br) ganhou.taglinePt.push(n)
  if (!antesDescPt && doc['x-casaos']?.description?.pt_br) ganhou.descricaoPt.push(n)

  apps++
  blocos += contador.n
  if (!seco)
    fs.writeFileSync(arq, yaml.dump(doc, { lineWidth: -1, noRefs: true, quotingType: '"' }))
}

console.log(`\nGoal 18 — grafia de idioma ${seco ? '(DRY RUN)' : '(aplicado)'}`)
console.log(`  apps tocados:                 ${apps}`)
console.log(`  blocos de i18n normalizados:  ${blocos}`)
console.log(`\n  deixam de cair no fallback do server:`)
console.log(`    título (era o nome da pasta):        ${ganhou.titulo.length}`)
console.log(`    descrição (era "<app> Docker app"):  ${ganhou.descricao.length}`)
console.log(`\n  ganham português sem tradução de máquina (vem de pt_PT):`)
console.log(`    tagline.pt_br:      ${ganhou.taglinePt.length}`)
console.log(`    description.pt_br:  ${ganhou.descricaoPt.length}`)
