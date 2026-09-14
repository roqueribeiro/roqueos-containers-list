#!/usr/bin/env node
// Le o USER declarado na imagem falando direto com o registry: pega o
// manifesto, acha o blob de config e devolve `.config.User` por plataforma.
//
// Nao baixa camada, nao precisa de docker e nao precisa de login. Roda igual na
// CI, na maquina do founder e num container da nuvem. A versao anterior disto
// usava `docker buildx imagetools inspect`, que exige docker e faz duas vezes
// mais requisicao no registry — com 313 imagens isso virava 429.

const ACEITA = [
  'application/vnd.oci.image.index.v1+json',
  'application/vnd.docker.distribution.manifest.list.v2+json',
  'application/vnd.oci.image.manifest.v1+json',
  'application/vnd.docker.distribution.manifest.v2+json',
].join(', ')

export function parseRef(ref) {
  let resto = ref
  let registro = 'registry-1.docker.io'
  const barra = resto.indexOf('/')
  const primeiro = barra < 0 ? '' : resto.slice(0, barra)
  if (primeiro.includes('.') || primeiro.includes(':') || primeiro === 'localhost') {
    registro = primeiro
    resto = resto.slice(barra + 1)
  }
  let repo = resto
  let referencia = 'latest'
  const arroba = resto.indexOf('@')
  if (arroba >= 0) {
    // repo:tag@sha256:... — a tag sai quando existe digest. Se ficar, ela entra
    // no nome do repositorio e o registry devolve 404.
    repo = resto.slice(0, arroba)
    referencia = resto.slice(arroba + 1)
    const dp = repo.lastIndexOf(':')
    if (dp > repo.lastIndexOf('/')) repo = repo.slice(0, dp)
  } else {
    const dp = resto.lastIndexOf(':')
    if (dp > resto.lastIndexOf('/')) {
      repo = resto.slice(0, dp)
      referencia = resto.slice(dp + 1)
    }
  }
  if (registro === 'docker.io' || registro === 'index.docker.io') registro = 'registry-1.docker.io'
  if (registro === 'registry-1.docker.io' && !repo.includes('/')) repo = `library/${repo}`
  return { registro, repo, referencia }
}

const tokens = new Map()
// O registry diz sozinho onde pegar o token, no cabecalho WWW-Authenticate de
// um 401. Seguir isso vale para docker.io, ghcr.io, lscr.io, quay.io e o resto,
// sem lista de casos especiais.
async function token(registro, repo) {
  const chave = `${registro}/${repo}`
  if (tokens.has(chave)) return tokens.get(chave)
  let t = ''
  try {
    const sonda = await fetch(`https://${registro}/v2/${repo}/manifests/latest`, { method: 'HEAD' })
    const desafio = sonda.headers.get('www-authenticate') || ''
    const realm = /realm="([^"]+)"/.exec(desafio)?.[1]
    if (realm) {
      const service = /service="([^"]+)"/.exec(desafio)?.[1]
      const url = new URL(realm)
      if (service) url.searchParams.set('service', service)
      url.searchParams.set('scope', `repository:${repo}:pull`)
      const r = await fetch(url)
      if (r.ok) {
        const j = await r.json()
        t = j.token || j.access_token || ''
      }
    }
  } catch {}
  tokens.set(chave, t)
  return t
}

async function manifesto(registro, repo, referencia) {
  const t = await token(registro, repo)
  const r = await fetch(`https://${registro}/v2/${repo}/manifests/${referencia}`, {
    headers: { Accept: ACEITA, ...(t ? { Authorization: `Bearer ${t}` } : {}) },
  })
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} em ${repo}:${referencia}`)
  return r.json()
}

async function blob(registro, repo, digest) {
  const t = await token(registro, repo)
  const r = await fetch(`https://${registro}/v2/${repo}/blobs/${digest}`, {
    headers: t ? { Authorization: `Bearer ${t}` } : {},
  })
  if (!r.ok) throw new Error(`blob ${r.status} em ${repo}`)
  return r.json()
}

export async function userDaImagem(ref) {
  const { registro, repo, referencia } = parseRef(ref)
  const m = await manifesto(registro, repo, referencia)
  if (m.manifests) {
    const fora = {}
    for (const sub of m.manifests) {
      const p = sub.platform || {}
      if (p.os !== 'linux' || !p.architecture) continue
      const nome = `linux/${p.architecture}${p.variant ? '/' + p.variant : ''}`
      try {
        const mm = await manifesto(registro, repo, sub.digest)
        const cfg = await blob(registro, repo, mm.config.digest)
        fora[nome] = cfg.config?.User || ''
      } catch {
        fora[nome] = ''
      }
    }
    return fora
  }
  const cfg = await blob(registro, repo, m.config.digest)
  return { 'linux/unica': cfg.config?.User || '' }
}
