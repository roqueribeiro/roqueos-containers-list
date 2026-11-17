// "De pe" nao e "funciona": um container fica running com o processo morto por
// dentro, ou escutando em lugar nenhum. Estes casos travam a escolha da porta
// que o teste vai bater, que e a mesma que a ficha da loja promete ao usuario.
import { describe, it, expect } from 'vitest'
import { alvoHttp, argsCurl, falaOutraCoisa } from '../../scripts/boot-container.mjs'

const compose = (extra = {}, xcasaos = {}) => ({
  services: {
    app: { image: 'x:1', ports: [{ target: 3000, published: '3003' }], ...extra },
    db: { image: 'postgres:16' },
  },
  'x-casaos': { main: 'app', scheme: 'http', ...xcasaos },
})

describe('alvoHttp', () => {
  it('escolhe a porta interna do servico principal', () => {
    expect(alvoHttp(compose())).toEqual({ servico: 'app', porta: '3000', scheme: 'http' })
  })

  // O port_map existe justamente para dizer qual das portas e a da interface
  // quando o app publica mais de uma. Ignorar ele seria bater na porta errada.
  it('respeita port_map quando o app publica mais de uma porta', () => {
    const c = compose(
      { ports: [{ target: 9000, published: '9001' }, { target: 80, published: '8080' }] },
      { port_map: '8080' },
    )
    expect(alvoHttp(c).porta).toBe('80')
  })

  it('usa o scheme declarado, porque tem app que so atende em https', () => {
    expect(alvoHttp(compose({}, { scheme: 'https' })).scheme).toBe('https')
  })

  it('entende porta na forma curta "8080:80"', () => {
    expect(alvoHttp(compose({ ports: ['8080:80'] })).porta).toBe('80')
  })

  it('devolve null quando o app nao publica porta nenhuma', () => {
    expect(alvoHttp(compose({ ports: [] }))).toBe(null)
  })

  it('devolve null quando x-casaos.main nao resolve servico', () => {
    expect(alvoHttp(compose({}, { main: 'nao-existe' }))).toBe(null)
  })

  it('nao escolhe a porta de um servico que nao e o principal', () => {
    const c = compose()
    c.services.db.ports = [{ target: 5432, published: '5432' }]
    expect(alvoHttp(c).servico).toBe('app')
  })
})

describe('argsCurl', () => {
  it('tenta a porta ate o prazo, de 5 em 5 s, e nao para no primeiro 000', () => {
    const a = argsCurl('http://10.0.0.2:8000/', 180000)
    expect(a.at(-1)).toBe('http://10.0.0.2:8000/')
    expect(a[a.indexOf('--retry-max-time') + 1]).toBe('180')
    expect(a[a.indexOf('--retry-delay') + 1]).toBe('5')
    expect(Number(a[a.indexOf('--retry') + 1])).toBe(36)
    expect(a).toContain('--retry-all-errors')
  })

  it('nunca encolhe o prazo abaixo de 15 s', () => {
    const a = argsCurl('http://x/', 1000)
    expect(a[a.indexOf('--retry-max-time') + 1]).toBe('15')
  })
})

describe('argsCurl e o arquivo de saida', () => {
  it('nunca escreve em /dev/null: na segunda tentativa o curl trunca a saida e sai com 23', () => {
    const a = argsCurl('http://x/', 60000)
    expect(a[a.indexOf('-o') + 1]).not.toBe('/dev/null')
  })
})

describe('falaOutraCoisa', () => {
  it('banco que atende sem falar HTTP conta como servidor na porta', () => {
    expect(falaOutraCoisa(1, 'http')).toBe(true) // MariaDB: HTTP/0.9
    expect(falaOutraCoisa(52, 'http')).toBe(true) // Postgres: resposta vazia
  })
  it('conexao recusada, timeout e TLS errado continuam reprovando', () => {
    expect(falaOutraCoisa(7, 'http')).toBe(false)
    expect(falaOutraCoisa(28, 'http')).toBe(false)
    expect(falaOutraCoisa(35, 'https')).toBe(false)
  })
})
