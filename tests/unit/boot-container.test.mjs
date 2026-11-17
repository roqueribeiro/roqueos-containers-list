import { describe, it, expect } from 'vitest'
import { renderiza, caixa, semPortas, veredito, sementesDe } from '../../scripts/boot-container.mjs'

describe('renderiza', () => {
  it('troca $AppID como o instalador troca', () => {
    expect(renderiza('source: /DATA/AppData/$AppID/data', 'grafana')).toBe(
      'source: /DATA/AppData/grafana/data',
    )
  })
  it('entende a forma com chaves', () => {
    expect(renderiza('/DATA/AppData/${AppID}/x', 'loki')).toBe('/DATA/AppData/loki/x')
  })
  it('troca as variaveis de sistema do contrato CasaOS: PUID, PGID e TZ', () => {
    expect(renderiza('PUID: $PUID\nPGID: ${PGID}\nTZ: $TZ', 'jellyfin')).toBe(
      'PUID: 1000\nPGID: 1000\nTZ: America/Sao_Paulo',
    )
  })
  it('nao mexe em variavel que so comeca igual', () => {
    expect(renderiza('$TZDATA $PUIDX', 'a')).toBe('$TZDATA $PUIDX')
  })
})

describe('caixa', () => {
  // O teste nunca pode escrever em /DATA: numa maquina RoqueOS de verdade isso
  // e o dado de quem mora na casa.
  it('desvia todo caminho /DATA para a caixa de areia', () => {
    expect(caixa('source: /DATA/AppData/x', '/tmp/lab')).toBe('source: /tmp/lab/DATA/AppData/x')
  })
  it('nao deixa nenhum /DATA de fora', () => {
    const fora = caixa('a: /DATA/one\nb: /DATA/two\n', '/tmp/lab')
    expect(fora).toBe('a: /tmp/lab/DATA/one\nb: /tmp/lab/DATA/two\n')
  })
})

describe('semPortas', () => {
  // O 2FAuth falhou no laboratorio com "port is already allocated" na 8000, que
  // era de outro processo da maquina. Conflito de porta e assunto da P2.
  it('tira a porta publicada e mantem o resto', () => {
    const fora = semPortas('services:\n  a:\n    image: x\n    ports: [1]\n    restart: always\n')
    expect(fora).not.toMatch(/ports/)
    expect(fora).toMatch(/image: x/)
    expect(fora).toMatch(/restart: always/)
  })
})

describe('veredito', () => {
  it('fecha quando todo servico esta running sem reinicio', () => {
    expect(veredito([{ state: 'running', status: 'Up 30 seconds', restarts: 0 }]).ok).toBe(true)
  })
  // Este e o estado exato que o founder viu na tela do Grafana.
  it('abre quando o container esta reiniciando', () => {
    const v = veredito([{ state: 'restarting', status: 'Restarting (1) 6 seconds ago', restarts: 1 }])
    expect(v.ok).toBe(false)
    expect(v.ruins).toHaveLength(1)
  })
  it('abre quando o container saiu', () => {
    expect(veredito([{ state: 'exited', status: 'Exited (1)', restarts: 0 }]).ok).toBe(false)
  })
  it('semente que saiu com 0 e o sucesso dela', () => {
    const v = veredito(
      [
        { service: 'glance-semente', state: 'exited', status: 'Exited (0) 5 seconds ago', restarts: 0 },
        { service: 'glance', state: 'running', status: 'Up 40 seconds', restarts: 0 },
      ],
      new Set(['glance-semente']),
    )
    expect(v.ok).toBe(true)
  })
  it('o app principal que saiu com 0 nao esta de pe', () => {
    const v = veredito(
      [{ service: 'glance', state: 'exited', status: 'Exited (0) 5 seconds ago', restarts: 0 }],
      new Set(['glance-semente']),
    )
    expect(v.ok).toBe(false)
  })
  it('acha a semente pelo restart "no"', () => {
    const c = { services: { s: { restart: 'no' }, app: { restart: 'unless-stopped' }, x: {} } }
    expect([...sementesDe(c)]).toEqual(['s'])
  })
  // "Up" com contador de reinicio nao e saude: e um laco de falha mais lento.
  it('abre quando esta de pe mas ja reiniciou', () => {
    expect(veredito([{ state: 'running', status: 'Restarting (2) 1s ago', restarts: 2 }]).ok).toBe(
      false,
    )
  })
})
