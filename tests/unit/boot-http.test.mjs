// "De pe" nao e "funciona": um container fica running com o processo morto por
// dentro, ou escutando em lugar nenhum. Estes casos travam a escolha da porta
// que o teste vai bater, que e a mesma que a ficha da loja promete ao usuario.
import { describe, it, expect } from 'vitest'
import { alvoHttp } from '../../scripts/boot-container.mjs'

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
