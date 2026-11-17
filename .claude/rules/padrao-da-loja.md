---
paths:
  - 'Apps/**'
  - 'schema/**'
  - 'scripts/revisao-container.mjs'
  - 'scripts/boot-container.mjs'
  - 'scripts/validate-manifests.mjs'
---

# O padrão da loja: as dez premissas

`yarn validate` prova que o YAML é um compose. **`yarn revisao` prova que o app
está pronto para a loja.** Em 14/09/2026 o repo estava `205 ok, 0 failed` no
primeiro e `0 de 205 fechado` no segundo — verde e, ainda assim, com 54 ícones
quebrados em produção e 56 apps mostrando "\<app\> Docker application" como
descrição.

| # | Premissa | O que o gate exige |
|---|----------|--------------------|
| P1 | Compatibilidade | `x-casaos.main` resolve um serviço, `architectures` não vazio, e a categoria existe no `CATEGORY_MAP` do `roqueos-server` — o que não existe lá cai em `other` na loja, em silêncio |
| P2 | Portas | toda porta publicada tem descrição; porta host disputada com outro app é declarada em `x-roqueos.portaCompartilhada` |
| P3 | Variáveis | segredo só gerado: declarado em `x-roqueos.gerar` e usado como `${NOME}`, que o server gera por instalação. Nenhum literal em nome de segredo, nenhum placeholder (`change-me`, `[YOUR_…]`), nenhuma senha em URL ou em `command`, e nenhuma `$VAR` que não seja do sistema (`AppID`, `PUID`, `PGID`, `TZ`) ou de `gerar`. Tip que mostra senha padrão da imagem exige `x-roqueos.senhaPadraoDaImagem` |
| P4 | Configuração | imagem com tag exata ou digest, nunca `:latest`; volume sob `/DATA/` ou montagem de sistema conhecida; `restart` presente |
| P5 | Privilégio | `privileged`, `network_mode: host`, `cap_add` e volume de host só com motivo escrito em `x-roqueos.motivo` — a regra não é remover de quem precisa, é obrigar a dizer por quê |
| P6 | README | a ficha da loja, com o quê, portas, volumes, variáveis, primeiro acesso e fonte oficial |
| P7 | Texto | `tagline` e `description` em `en_us` **e** `pt_br`, nessa grafia |
| P8 | Ícone | PNG quadrado de no mínimo 192px que **existe no repo** |
| P9 | Coerência | sem `appfile.json`: formato morto que ninguém consome |
| P10 | Permissão do dado | imagem que larga privilégio para um uid fixo **não** pode escrever em bind sem `user:` ou `PUID` — o instalador cria esse diretório `root:root 0755` e o container reinicia para sempre |

`yarn boot` é a décima premissa executada de verdade: sobe o container, espera,
olha o estado e **bate na porta que a ficha promete** — qualquer status HTTP
conta como resposta, inclusive 401 e 302, porque o que se mede é "tem servidor
atendendo ali". **Só vale em Linux** (veja a quarta armadilha).

O que o `yarn boot` NÃO mede, e que continua sem cobertura automática: a tela
abrir, o login funcionar, o dado sobreviver a um restart, e o caminho real de
instalação do RoqueOS — o laboratório roda `docker compose up` direto, não o
instalador do `roqueos-server`.

## Armadilhas que já custaram caro aqui

**Confira a coisa, não o campo.** O `audit-enrichment.mjs` dizia `icon present
205/205` enquanto 54 apps davam 404 no CDN: ele conferia se o campo existia no
manifesto, não se o arquivo existia. O mesmo erro deixou 56 descrições caírem no
fallback do server.

**A grafia do idioma é contrato.** O catálogo escrevia `pt_br`, `pt_PT` e
`pt_BR`; o server lê `en_us` e `pt_br`, minúsculo. O que não bate não existe
para ele. Ao importar app de upstream, rode `yarn revisao` antes de achar que
está pronto.

**Campo preenchido com tautologia é pior que campo vazio.** 46 apps importados
traziam 326 descrições no formato `Container Path: /app/data` para o volume
`/app/data`. Passava em toda checagem de "tem descrição?" e não informava nada.
A P2 agora reprova isso, não só a descrição ausente.

**Gate que só lê manifesto não sabe se o app sobe.** Em 14/09/2026 o Grafana
estava fechado nas nove premissas e nunca subiu na casa do founder:
`GF_PATHS_DATA='/var/lib/grafana' is not writable`. O Docker cria a origem de um
bind inexistente como `root:root 0755`; a imagem do Grafana escreve como uid
472. Nenhuma das nove ligava um container. Daí vieram a P10 e o `yarn boot`.

**Teste de boot no macOS dá verde falso.** O mesmo manifesto quebrado sobe
normalmente no Docker Desktop, porque o compartilhamento de arquivo da VM
entrega o bind com permissão frouxa. Medido nos dois lados no mesmo dia: `Up` no
macOS, `Restarting (1)` no Linux. Por isso `scripts/boot-container.mjs` se
recusa a rodar fora de Linux, e o workflow `Boot` roda no runner do GitHub.

**Repo público não guarda segredo.** Até o Goal 31 o padrão da casa era
`change-me-on-first-boot` mais uma tip mandando trocar, e a P3 só reprovava
senha óbvia como `admin`. Em 17/11/2026, 62 apps traziam JWT, chave de sessão ou
senha de banco literal, iguais em toda instalação; em cinco deles, ler o repo
bastava para forjar a sessão de qualquer servidor. Ninguém troca o que a
instalação não pede. Segredo agora é `${NOME}` em `x-roqueos.gerar`, e o
`roqueos-server` gera, guarda e, com `mostrar: true`, mostra uma vez.

**Gate que cobra o invisível ensina a ignorar gate.** `thumbnail` e
`screenshot` saíram da P8 porque o server não os lê e a loja não os desenha.
Quando passar a desenhar, a checagem volta — com significado.
