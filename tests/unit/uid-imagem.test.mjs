// Cada caso aqui congela um erro real de 14/09/2026. A P10 nasceu porque o
// Grafana passou nas nove premissas anteriores e mesmo assim nunca subiu na
// casa do founder.
import { describe, it, expect } from 'vitest'
import { naoRoot, risco, compacta } from '../../scripts/uid-imagem.mjs'
import { parseRef } from '../../scripts/registry-user.mjs'

const svc = (extra = {}) => ({
  app: 'X',
  servico: 'x',
  imagem: 'img:1',
  user: null,
  binds: ['/DATA/AppData/$AppID/data'],
  puid: false,
  ...extra,
})

describe('naoRoot', () => {
  it('trata vazio, root e 0 como root', () => {
    for (const v of ['', null, undefined, 'root', '0', '0:0']) expect(naoRoot(v)).toBe(null)
  })
  it('devolve o uid quando a imagem larga privilegio', () => {
    expect(naoRoot('472')).toBe('472')
    expect(naoRoot('1000:1000')).toBe('1000')
    expect(naoRoot('node')).toBe('node')
  })
})

describe('risco', () => {
  it('acusa o Grafana: uid 472 sobre bind que o instalador cria root', () => {
    const r = risco(svc(), { 'img:1': '472' })
    expect(r?.uid).toBe('472')
    expect(r?.origem).toBe('imagem')
  })

  it('nao acusa imagem que comeca como root', () => {
    expect(risco(svc(), { 'img:1': '' })).toBe(null)
  })

  it('nao acusa servico sem bind: volume nomeado nasce com o dono certo', () => {
    expect(risco(svc({ binds: [] }), { 'img:1': '472' })).toBe(null)
  })

  it('nao acusa imagem linuxserver, que comeca root e cai para o PUID', () => {
    expect(risco(svc({ puid: true }), { 'img:1': '911' })).toBe(null)
  })

  // Sete apps do catalogo ja traziam user: "1000:1000" e afins. A falha e a
  // mesma do Grafana e a versao anterior desta funcao passava batido.
  it('acusa user: nao-root escrito no proprio manifesto, sem precisar de cache', () => {
    const r = risco(svc({ user: '1000:1000' }), {})
    expect(r?.uid).toBe('1000')
    expect(r?.origem).toBe('manifesto')
  })

  it('aceita user: root e user: 0 como conserto', () => {
    expect(risco(svc({ user: '0:0' }), { 'img:1': '472' })).toBe(null)
    expect(risco(svc({ user: 'root' }), { 'img:1': '472' })).toBe(null)
  })

  // Consulta que falhou nao e veredito. Acusar sem dado ensina a ignorar gate.
  it('fica calada quando a consulta ao registry falhou', () => {
    expect(risco(svc(), { 'img:1': '?429 Too Many Requests' })).toBe(null)
  })

  it('fica calada quando a imagem nao esta no cache', () => {
    expect(risco(svc(), {})).toBe(null)
  })
})

describe('compacta', () => {
  it('ignora plataforma windows, onde o usuario e sempre ContainerUser', () => {
    expect(compacta({ 'linux/amd64': '', 'windows/amd64': 'ContainerUser' })).toBe('')
  })
  it('ignora o atestado de build em unknown/unknown', () => {
    expect(compacta({ 'linux/amd64': '472', 'unknown/unknown': '' })).toBe('472')
  })
  // Seis imagens do catalogo divergem entre arquiteturas. A leitura
  // conservadora e a uniao: se em alguma linux ela larga privilegio, ha risco.
  it('une os uid quando as arquiteturas divergem', () => {
    expect(compacta({ 'linux/amd64': 'node', 'linux/arm64': '' })).toBe('node')
  })
})

describe('parseRef', () => {
  it('separa registro, repositorio e tag', () => {
    expect(parseRef('grafana/grafana:12.1.4')).toEqual({
      registro: 'registry-1.docker.io',
      repo: 'grafana/grafana',
      referencia: '12.1.4',
    })
  })

  it('prefixa library nas imagens oficiais', () => {
    expect(parseRef('postgres:15-alpine').repo).toBe('library/postgres')
  })

  it('normaliza docker.io para o host que atende /v2', () => {
    expect(parseRef('docker.io/library/postgres:16-alpine').registro).toBe('registry-1.docker.io')
  })

  // 60 imagens do catalogo sao pinadas assim. Deixar a tag no nome do
  // repositorio dava 404 e a P10 ficava cega justamente nelas.
  it('tira a tag quando existe digest', () => {
    const r = parseRef('aceberg/watchyourlan:2.1.4@sha256:f77532ca7c3c')
    expect(r.repo).toBe('aceberg/watchyourlan')
    expect(r.referencia).toBe('sha256:f77532ca7c3c')
  })

  it('entende registro proprio com porta e com caminho', () => {
    expect(parseRef('lscr.io/linuxserver/sonarr:4.0.16')).toEqual({
      registro: 'lscr.io',
      repo: 'linuxserver/sonarr',
      referencia: '4.0.16',
    })
  })
})
