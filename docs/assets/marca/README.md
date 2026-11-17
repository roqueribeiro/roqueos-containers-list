# Marca da RoqueOS App Store

Identidade visual do repositório, no mesmo padrão do `roqueos-shield` e do `aidlc-harness`:
mesma paleta, mesmas fontes, mesma grade. Tudo aqui sai de um gerador só, `gen.py`, a partir
de `carimbo.json` (textos) e do `package.json` (versão).

| Arquivo | O que é |
| --- | --- |
| `banner.en.jpg`, `banner.pt.jpg` | Herói dos READMEs (3200×1120): arte à direita, texto à esquerda |
| `social-preview.en.jpg`, `social-preview.pt.jpg` | Prévia de link do GitHub (1280×640) |
| `logo.svg` | O contêiner com o visto, em vetor |
| `logo-1024.png`, `logo-512.png` | Ícone quadrado (avatar, app) |
| `logo-horizontal.claro.png`, `logo-horizontal.escuro.png` | Ícone + nome, fundo transparente, para fundo claro e escuro |
| `carimbo.json` | Eyebrow, chips, lema e descrição em EN e PT; `versao_gerada` é escrito pelo gerador |
| `gen.py` | O gerador |
| `PROMPT.md` | Como trocar a arte por uma fotoreal gerada no ChatGPT, sem mexer no texto |
| `fontes/` | Inter Tight (títulos) e Geist Mono (mono), OFL, com as licenças |

## Regerar

```bash
python docs/assets/marca/gen.py --out docs/assets/marca              # tudo
python docs/assets/marca/gen.py --so-marca --out docs/assets/marca   # sem o banner
python docs/assets/marca/gen.py --art docs/assets/marca/arte.jpg --out docs/assets/marca
```

Precisa de Python com `playwright` e `Pillow` (o Chromium do playwright já basta). Nenhum
dos dois é dependência do catálogo: instale num ambiente à parte.

**O banner não carrega a contagem de apps.** Ela muda a cada PR e a imagem ficaria velha
calada; a contagem viva está no README e na [docs/QUALITY.md](../../QUALITY.md), conferidas
pelo `yarn docs:check`. A versão nos chips vem do `package.json`: subiu a versão, regere a
marca no mesmo commit.

**O social preview não sobe sozinho.** O GitHub não tem API para ele: em *Settings →
General → Social preview*, envie `social-preview.en.jpg`.

Paleta: fundo `#07090f` a `#0b1018`, azul `#2f8bff` / `#007aff`, texto `#e9eef5`,
apagado `#9aa7b4`.
