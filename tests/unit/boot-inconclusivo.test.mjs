// Gate que mente para o lado do vermelho ensina a ignorar gate do mesmo jeito
// que o que mente para o lado do verde. Estes dois casos sao limitacao do
// laboratorio, medidos em 14/09/2026 num sandbox sem IPv6 no kernel e sem
// permissao para levantar rlimit.
import { describe, it, expect } from 'vitest'
import { inconclusivo } from '../../scripts/boot-container.mjs'

describe('inconclusivo', () => {
  it('nao acusa o Penpot quando o kernel do laboratorio nao tem IPv6', () => {
    const log = 'nginx: [emerg] socket() [::]:8080 failed (97: Address family not supported by protocol)'
    expect(inconclusivo(log)).toMatch(/IPv6/)
  })

  it('nao acusa o RagFlow quando o laboratorio nao deixa levantar rlimit', () => {
    const log = 'error during container init: error setting rlimit type 7: operation not permitted'
    expect(inconclusivo(log)).toMatch(/rlimit/)
  })

  // O erro do Grafana nao pode virar inconclusivo nunca: ele e o motivo de a
  // P10 existir.
  it('acusa permissao de escrita, que e falha de verdade', () => {
    expect(inconclusivo("GF_PATHS_DATA='/var/lib/grafana' is not writable.")).toBe(null)
  })

  it('acusa configuracao ausente, que e falha de verdade', () => {
    expect(inconclusivo('open /etc/prometheus/prometheus.yml: no such file or directory')).toBe(null)
  })

  it('nao engasga com erro vazio', () => {
    expect(inconclusivo(null)).toBe(null)
    expect(inconclusivo('')).toBe(null)
  })
})
