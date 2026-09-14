# Goal 18 — revisão container a container, com evidência por app

> Medido em 14/09/2026 no `main` `f9ba6a2`, 205 apps. Nenhum número aqui é
> estimativa: cada um sai de uma varredura sobre os 205 `docker-compose.yml`.

## O que o gate de hoje enxerga, e o que ele não enxerga

`yarn validate` devolve **205 ok, 0 failed**. O repo está verde e, ainda assim,
todas as premissas deste goal estão em aberto. O schema atual exige `name` e
`services`, e mais nada: ele prova que o YAML é um compose, não que o app está
pronto para uma loja.

Dois detalhes que atrapalham quem confia nos atalhos:

- `yarn audit` **não roda** `scripts/audit-enrichment.mjs`. O yarn tem um
  subcomando `audit` próprio e ele ganha. O audit do repo só roda por
  `node scripts/audit-enrichment.mjs`.
- `scripts/validate-manifests.mjs` valida o `docker-compose.yml`. O
  `appfile.json` não passa por validação nenhuma.

## O estado medido

| Dimensão                             | Estado                          |
| ------------------------------------ | ------------------------------- |
| README por app                       | **0 de 205**                    |
| `thumbnail.png`                      | 138 faltando                    |
| screenshots                          | 63 sem nenhuma                  |
| `description.pt_br`                  | 89 faltando                     |
| `tagline.pt_br`                      | 88 faltando                     |
| imagem em `:latest`                  | 24 serviços                     |
| imagem sem tag                       | 0                               |
| `privileged: true`                   | 9 serviços                      |
| `network_mode: host`                 | 14 serviços                     |
| `cap_add` não vazio                  | 9 serviços                      |
| volume fora de `/DATA/`              | 46 serviços                     |
| segredo literal fraco em env         | 1 (`MineOS/USER_PASSWORD=root`) |
| `appfile.json` ausente               | **154 de 205**                  |
| `appfile.json` divergente do compose | 44 dos 51 que existem           |
| `appfile.json` com JSON inválido     | 1                               |
| portas host em conflito              | 40 portas, até 9 apps na mesma  |
| apps que caem em `other` na loja     | **57 de 205**                   |

### Os quatro achados que valem mais que a tabela

**1. Três listas de categoria que discordam.** O `category-list.json` deste
repo, o `CATEGORY_MAP` do `roqueos-server` e as categorias realmente usadas nos
205 composes são três conjuntos diferentes. O server faz
`CATEGORY_MAP[rawCategory] || 'other'`, então **57 apps caem em "other"** na App
Store, em silêncio. `Downloader` (11 apps), `Chat` (9), `Cloud` (8), `Notes`
(7), `Gallery` (5), `Database` (4), `Games` (4 — perto de `Gaming`, que é
mapeada), `Backup` (2), `Documents` (2), e mais sete categorias com 1 app cada.

**2. O `appfile.json` é um formato morto que ninguém consome.** Busca no
`roqueos-server/src` e no `roqueos-front/src`: nenhuma referência. O server lê
`docker-compose.yml` + `x-casaos`. Mesmo assim o repo carrega 51 appfiles, 44
deles apontando imagem diferente da do compose (`2FAuth` diz `:latest`, o
compose diz `5.4.3`), um com vírgula sobrando e JSON inválido. Ou some, ou passa
a ser gerado do compose. Manter à mão as duas cópias é como elas divergiram.

**3. Zero README em 205 apps.** É a premissa da loja e é a que está em 0%.

**3b. 54 apps estão com o ícone quebrado na loja, agora.** O manifesto aponta
`cdn.jsdelivr.net/.../Apps/<app>/icon.png`, e o arquivo não existe no repo.
Conferido no ar, não deduzido:

```
Activepieces -> .../Apps/Activepieces/icon.png   HTTP/2 404
Authentik    -> .../Apps/Authentik/icon.png      HTTP/2 404
Frigate      -> .../Apps/Frigate/icon.png        HTTP/2 404
```

O `audit-enrichment.mjs` diz `icon present 205 / 205 (100.0%)` porque confere se
o CAMPO existe no manifesto, não se o ARQUIVO existe. É o mesmo erro de método
que deixou 40 descrições rasas passarem no site: medir o campo em vez da coisa.
Além desses 54, 4 ícones estão abaixo de 192 px (LabelStudio e oPodSync têm 48)
e 9 não são quadrados (Jellyseerr 1024x984, Monica 512x513, Petio 256x257).

**4. `privileged`, `host` e `cap_add` não são defeito por si.** Frigate,
HomeAssistant, Zigbee2MQTT e ESPHome precisam. O defeito é não haver declaração
de por quê. A regra que falta não é "remover", é "declarar e justificar", do
mesmo jeito que o `roqueos-front` faz com as portas abertas no pre-push.

## As premissas, como critério executável

Cada premissa vira uma checagem de `scripts/revisao-container.mjs`, que roda por
app e devolve veredito. Sem isso, "passou" é opinião, e o loop não teria como
parar.

| #   | Premissa                     | Checagem                                                                                            |
| --- | ---------------------------- | --------------------------------------------------------------------------------------------------- |
| P1  | Compatibilidade com o RoqueOS | `x-casaos.main` resolve um serviço; categoria existe no `CATEGORY_MAP` do server; `architectures` não vazio |
| P2  | Portas                       | toda porta publicada tem descrição; conflito de porta host declarado no manifesto                   |
| P3  | Variáveis                    | env com nome de segredo nunca tem literal fraco; todo env tem descrição                             |
| P4  | Configuração                 | imagem com tag fixa, nunca `:latest`; volume sob `/DATA/`; `restart` presente                       |
| P5  | Privilégio                   | `privileged`, `network_mode: host` e `cap_add` só com justificativa em `x-roqueos.motivo`            |
| P6  | README                       | existe e cobre: o quê, portas, volumes, envs, primeiro acesso, fonte oficial                        |
| P7  | Texto da loja                | `tagline` e `description` em `en_us` e `pt_br`                                                      |
| P8  | Imagens                      | ícone quadrado de no mínimo 192 px, thumbnail presente, ao menos uma screenshot                     |
| P9  | Coerência                    | `appfile.json` ausente ou idêntico ao compose — nunca divergente                                    |

## Como o loop para

O loop roda `node scripts/revisao-container.mjs --todos`, que escreve
`.revisao/<app>.json` com o veredito de P1 a P9 e um `resumo.json` com a
contagem. Ele só termina quando **os 205 apps fecham as nove premissas**, e a
evidência é o `resumo.json` com `pendentes: 0`, colado no chat sem resumo.

Rodadas parciais são esperadas: o loop pega a fila de pendentes, trabalha um
lote, roda o gate de novo e repete. O que ele nunca faz é declarar um app pronto
sem o veredito do script.

## Decisões que são do founder, e travam o loop até serem respondidas

1. **`appfile.json`**: apagar os 51, ou gerar os 205 a partir do compose?
2. **Categorias**: abrir o `CATEGORY_MAP` do server para as 12 categorias novas
   (mexe em outro repo, onda 1 do blast), ou remapear os 57 apps para as 14 que
   já existem?
3. **`:latest` nos 24 serviços**: fixar a tag da versão que está no ar hoje
   (aceitando que a atualização passa a ser manual), ou manter nos que são de
   infraestrutura e declarar isso?
4. **Assets faltando**: 138 thumbnails e 63 telas. De onde vêm?
