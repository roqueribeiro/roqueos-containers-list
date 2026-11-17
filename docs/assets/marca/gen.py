#!/usr/bin/env python3
"""Gera banner.en.jpg / banner.pt.jpg no padrão RoqueOS, tema RoqueOS App Store.

Uso:
  python gen.py                      # arte desenhada em SVG (padrão, on-brand)
  python gen.py --art arte.jpg       # usa a arte fotoreal gerada no ChatGPT
                                     # (ver PROMPT.md) no lugar do motivo SVG,
                                     # mantendo o mesmo overlay de texto.
  python gen.py --out <dir>          # onde salvar (padrão: aqui)

Mesmo processo do roqueos-shield e do aidlc-harness: arte à direita + overlay de
texto à esquerda. Só a arte e o nome mudam; paleta, fontes e grade são as mesmas."""

import argparse
import base64
import json
import mimetypes
import pathlib

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent
FON = HERE / "fontes"


def b64(p):
    return base64.b64encode(p.read_bytes()).decode()


INTER = b64(FON / "InterTight.ttf")
GEIST = b64(FON / "GeistMono.ttf")

RAIZ = HERE.parents[2]
CARIMBO = HERE / "carimbo.json"


def _versao() -> str:
    versao = json.loads((RAIZ / "package.json").read_text(encoding="utf-8")).get("version")
    if not versao:
        raise SystemExit("não achei a versão no package.json")
    return versao


def _textos() -> dict:
    """Textos do banner vêm do carimbo.json; a versão, do package.json.

    Nenhum chip carrega a contagem de apps: ela muda a cada PR, e o banner ficaria velho
    calado. A contagem viva está no README e na docs/QUALITY.md, conferida pelo gate."""
    import html

    c = json.loads(CARIMBO.read_text(encoding="utf-8"))
    sep = "&nbsp;&nbsp;·&nbsp;&nbsp;"
    out = {}
    for lang in ("en", "pt"):
        chips = [html.escape(x.upper()) for x in c["chips"][lang]] + [f"v{_versao()}"]
        out[lang] = {
            "eyebrow": html.escape(c["eyebrow"][lang]),
            "m1": html.escape(c["lema"][lang][0]).replace("&#x27;", "&#8217;"),
            "m2": html.escape(c["lema"][lang][1]).replace("&#x27;", "&#8217;"),
            "desc": html.escape(c["descricao"][lang]),
            "chips": sep.join(chips),
        }
    return out


TXT = _textos()


def _marcar_versao() -> None:
    c = json.loads(CARIMBO.read_text(encoding="utf-8"))
    c["versao_gerada"] = _versao()
    CARIMBO.write_text(json.dumps(c, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


# --- arte: pirâmide de contêineres de vidro, o do topo aceso (subiu e respondeu) ---
ARESTA = 150
COS = 0.866


def _cubo(cx, cy, e, aceso=False):
    """Cubo isométrico: topo, face esquerda e face direita, em vidro."""
    w = e * COS
    topo = f"{cx},{cy - e} {cx + w},{cy - e / 2} {cx},{cy} {cx - w},{cy - e / 2}"
    esq = f"{cx - w},{cy - e / 2} {cx},{cy} {cx},{cy + e} {cx - w},{cy + e / 2}"
    dir_ = f"{cx},{cy} {cx + w},{cy - e / 2} {cx + w},{cy + e / 2} {cx},{cy + e}"
    aro = "#8fc2ff" if aceso else "#4d9fff"
    op = "0.95" if aceso else "0.5"
    filtro = ' filter="url(#glow)"' if aceso else ""
    partes = [
        f'<g{filtro}>',
        f'<polygon points="{esq}" fill="url(#vidro-esq)" stroke="#2a3a5a" stroke-width="2"/>',
        f'<polygon points="{dir_}" fill="url(#vidro-dir)" stroke="#2a3a5a" stroke-width="2"/>',
        f'<polygon points="{topo}" fill="url(#vidro-topo)" stroke="#2a3a5a" stroke-width="2"/>',
        f'<polygon points="{topo}" fill="none" stroke="{aro}" stroke-width="2.5" opacity="{op}"/>',
        f'<polyline points="{cx - w},{cy - e / 2} {cx},{cy} {cx + w},{cy - e / 2}" fill="none" stroke="{aro}" stroke-width="2.5" opacity="{op}"/>',
        f'<line x1="{cx}" y1="{cy}" x2="{cx}" y2="{cy + e}" stroke="{aro}" stroke-width="2.5" opacity="{op}"/>',
        "</g>",
    ]
    if aceso:
        # o "visto" na face direita: o app subiu e respondeu na porta prometida
        partes.append(
            f'<path d="M{cx + w * 0.28},{cy + e * 0.30} L{cx + w * 0.46},{cy + e * 0.46} L{cx + w * 0.76},{cy + e * 0.05}" '
            'fill="none" stroke="#8fc2ff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>'
        )
    return "".join(partes)


def _piramide():
    # (i, j, k): k é a altura. Desenha de trás para a frente e de baixo para cima.
    celulas = [
        (0, 0, 0), (1, 0, 0), (0, 1, 0), (2, 0, 0), (1, 1, 0), (0, 2, 0),
        (0, 0, 1), (1, 0, 1), (0, 1, 1),
        (0, 0, 2),
    ]
    celulas.sort(key=lambda c: (c[0] + c[1] + c[2], c[2]))
    e = ARESTA
    out = []
    for i, j, k in celulas:
        x = (i - j) * e * COS
        y = (i + j) * e / 2 - k * e
        out.append(_cubo(round(x, 1), round(y, 1), e, aceso=(k == 2)))
    return "".join(out)


ARTE = f"""
<g id="arte" transform="translate(2200,610)">
  <!-- feixe de dados chegando ao contêiner do topo: o manifesto que entra para ser testado -->
  <g opacity="0.9">
    <rect x="-760" y="-304" width="630" height="8" fill="url(#beam)"/>
    <g fill="#7fb6ff">
      <rect x="-720" y="-305" width="26" height="6" opacity=".9"/>
      <rect x="-650" y="-311" width="10" height="10" opacity=".7"/>
      <rect x="-590" y="-304" width="34" height="5" opacity=".9"/>
      <rect x="-520" y="-313" width="12" height="12" opacity=".6"/>
      <rect x="-450" y="-305" width="20" height="6" opacity=".85"/>
    </g>
  </g>
  <!-- chão reflexivo, logo abaixo da base -->
  <ellipse cx="0" cy="330" rx="640" ry="72" fill="url(#floor)"/>
  {_piramide()}
  <!-- pulso de boot em volta do contêiner aceso -->
  <g fill="none" stroke="#4d9fff" transform="translate(0,-375)">
    <ellipse rx="190" ry="96" stroke-width="3.5" opacity="0.5"/>
    <ellipse rx="270" ry="136" stroke-width="2.5" opacity="0.28"/>
  </g>
</g>
"""


def arte_raster(art_path):
    """Arte fotoreal do ChatGPT ocupando a metade direita, com fade pra esquerda."""
    p = pathlib.Path(art_path)
    mime = mimetypes.guess_type(p.name)[0] or "image/jpeg"
    data = base64.b64encode(p.read_bytes()).decode()
    return f"""
<g id="arte">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#07090f" stop-opacity="1"/>
      <stop offset="0.28" stop-color="#07090f" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <image href="data:{mime};base64,{data}" x="1360" y="0" width="1840" height="1120"
         preserveAspectRatio="xMidYMid slice"/>
  <rect x="1360" y="0" width="1840" height="1120" fill="url(#fade)"/>
</g>
"""


# Marca pequena do wordmark: um contêiner isométrico em traço, com o visto.
MARCA = (
    '<polygon points="0,-6 34,12 34,58 0,76 -34,58 -34,12" fill="none" stroke="#007aff" '
    'stroke-width="7" stroke-linejoin="round"/>'
    '<polyline points="-34,12 0,30 34,12" fill="none" stroke="#007aff" stroke-width="7" stroke-linejoin="round"/>'
    '<line x1="0" y1="30" x2="0" y2="76" stroke="#007aff" stroke-width="7"/>'
    '<path d="M8,50 L15,58 L28,40" fill="none" stroke="#4d9fff" stroke-width="6" '
    'stroke-linecap="round" stroke-linejoin="round"/>'
)


def svg(lang, art):
    t = TXT[lang]
    arte = arte_raster(art) if art else ARTE
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="3200" height="1120" viewBox="0 0 3200 1120">
  <defs>
    <style>
      @font-face {{ font-family:'Inter Tight'; src:url(data:font/ttf;base64,{INTER}) format('truetype'); }}
      @font-face {{ font-family:'Geist Mono'; src:url(data:font/ttf;base64,{GEIST}) format('truetype'); }}
      .eye {{ font-family:'Geist Mono'; font-size:30px; letter-spacing:7px; fill:#4d9fff; }}
      .wm  {{ font-family:'Inter Tight'; font-weight:800; font-size:132px; }}
      .m   {{ font-family:'Inter Tight'; font-weight:700; font-size:66px; }}
      .desc{{ font-family:'Inter Tight'; font-weight:400; font-size:34px; fill:#8b97a6; }}
      .chip{{ font-family:'Geist Mono'; font-size:28px; letter-spacing:4px; fill:#6e7c8a; }}
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0d13"/><stop offset="0.55" stop-color="#0b1018"/><stop offset="1" stop-color="#07090f"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.68" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#143055" stop-opacity="0.7"/><stop offset="1" stop-color="#143055" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vidro-topo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1b3358" stop-opacity="0.95"/><stop offset="1" stop-color="#12203a" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="vidro-esq" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#12203a" stop-opacity="0.9"/><stop offset="1" stop-color="#0b1424" stop-opacity="0.75"/>
    </linearGradient>
    <linearGradient id="vidro-dir" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0e1a2f" stop-opacity="0.9"/><stop offset="1" stop-color="#08101d" stop-opacity="0.75"/>
    </linearGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4d9fff" stop-opacity="0"/><stop offset="0.5" stop-color="#8fc2ff" stop-opacity="1"/><stop offset="1" stop-color="#4d9fff" stop-opacity="0.9"/>
    </linearGradient>
    <radialGradient id="floor" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#2060c0" stop-opacity="0.5"/><stop offset="1" stop-color="#2060c0" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <g id="mark">{MARCA}</g>
  </defs>

  <rect width="3200" height="1120" fill="url(#bg)"/>
  <rect width="3200" height="1120" fill="url(#halo)"/>
  {arte}

  <!-- coluna esquerda -->
  <g transform="translate(170,300)">
    <line x1="0" y1="-14" x2="54" y2="-14" stroke="#007aff" stroke-width="4"/>
    <text class="eye" x="74" y="-2">{t["eyebrow"]}</text>

    <g transform="translate(36,80)"><use href="#mark" transform="scale(1.15)"/></g>
    <text class="wm" x="100" y="168"><tspan fill="#e9eef5">RoqueOS </tspan><tspan fill="#2f8bff">App Store</tspan></text>

    <text class="m" x="2" y="300" fill="#e9eef5">{t["m1"]}</text>
    <text class="m" x="2" y="378" fill="#9aa7b4">{t["m2"]}</text>

    <text class="desc" x="2" y="452">{t["desc"]}</text>

    <text class="chip" x="2" y="604">{t["chips"]}</text>
  </g>
</svg>"""


def render(lang, outdir, art):
    html = f"<!doctype html><html><head><meta charset='utf-8'><style>html,body{{margin:0}}</style></head><body>{svg(lang, art)}</body></html>"
    hp = HERE / f"_banner.{lang}.html"
    hp.write_text(html, encoding="utf-8")
    png = HERE / f"_banner.{lang}.png"
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 3200, "height": 1120}, device_scale_factor=1)
        pg.goto(hp.as_uri())
        pg.wait_for_timeout(400)
        pg.screenshot(path=str(png), clip={"x": 0, "y": 0, "width": 3200, "height": 1120})
        b.close()
    hp.unlink()
    from PIL import Image

    im = Image.open(png).convert("RGB")
    png.unlink()
    jpg = pathlib.Path(outdir) / f"banner.{lang}.jpg"
    im.save(jpg, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{jpg} {jpg.stat().st_size // 1024}K {im.size}")


# --- marca: logo, logo horizontal e social preview, da mesma fonte do banner ----
FONTES = (
    f"@font-face{{font-family:'Inter Tight';src:url(data:font/ttf;base64,{INTER}) format('truetype')}}"
    f"@font-face{{font-family:'Geist Mono';src:url(data:font/ttf;base64,{GEIST}) format('truetype')}}"
)


def _png(svg_txt, w, h, destino, fundo_transparente=True):
    html = (
        "<!doctype html><html><head><meta charset='utf-8'><style>html,body{margin:0;"
        + ("background:transparent" if fundo_transparente else "")
        + "}</style></head><body>"
        + svg_txt
        + "</body></html>"
    )
    hp = HERE / "_marca.html"
    hp.write_text(html, encoding="utf-8")
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        pg.goto(hp.as_uri())
        pg.wait_for_timeout(300)
        pg.screenshot(
            path=str(destino),
            clip={"x": 0, "y": 0, "width": w, "height": h},
            omit_background=fundo_transparente,
        )
        b.close()
    hp.unlink()
    print(f"{destino} {destino.stat().st_size // 1024}K {w}x{h}")


def marca(outdir):
    out = pathlib.Path(outdir)
    (out / "logo.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-44 -16 88 102" width="88" height="102">'
        + MARCA
        + "</svg>\n",
        encoding="utf-8",
    )
    print(out / "logo.svg")
    for lado in (1024, 512):
        svg_txt = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{lado}" height="{lado}" viewBox="0 0 1024 1024">'
            '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
            '<stop offset="0" stop-color="#0b1018"/><stop offset="1" stop-color="#07090f"/></linearGradient>'
            '<radialGradient id="h" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stop-color="#143055" stop-opacity="0.8"/>'
            '<stop offset="1" stop-color="#143055" stop-opacity="0"/></radialGradient></defs>'
            '<rect width="1024" height="1024" rx="224" fill="url(#g)"/>'
            '<rect width="1024" height="1024" rx="224" fill="url(#h)"/>'
            f'<g transform="translate(512,{512 - 35 * 6.0:.0f}) scale(6.0)">{MARCA}</g></svg>'
        )
        _png(svg_txt, lado, lado, out / f"logo-{lado}.png")
    for tema, cor_roque, cor_loja in (
        ("claro", "#0d1117", "#007aff"),
        ("escuro", "#e9eef5", "#2f8bff"),
    ):
        svg_txt = (
            '<svg xmlns="http://www.w3.org/2000/svg" width="1460" height="208" viewBox="0 0 1460 208">'
            f"<defs><style>{FONTES}</style></defs>"
            f'<g transform="translate(92,62) scale(1.2)">{MARCA}</g>'
            '<text x="186" y="146" font-family="Inter Tight" font-weight="800" font-size="124">'
            f'<tspan fill="{cor_roque}">RoqueOS </tspan><tspan fill="{cor_loja}">App Store</tspan></text></svg>'
        )
        _png(svg_txt, 1460, 208, out / f"logo-horizontal.{tema}.png")
    from PIL import Image

    for lang in ("en", "pt"):
        im = Image.open(out / f"banner.{lang}.jpg").convert("RGB")
        _, h = im.size
        prev = im.crop((0, 0, h * 2, h)).resize((1280, 640), Image.LANCZOS)
        destino = out / f"social-preview.{lang}.jpg"
        prev.save(destino, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"{destino} {destino.stat().st_size // 1024}K 1280x640")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--art", help="arte raster (ex.: arte.jpg gerada no ChatGPT)")
    ap.add_argument("--out", default=str(HERE), help="diretório de saída")
    ap.add_argument(
        "--so-marca", action="store_true", help="só logo, logo horizontal e social preview"
    )
    a = ap.parse_args()
    if not a.so_marca:
        for lang in ("en", "pt"):
            render(lang, a.out, a.art)
    marca(a.out)
    _marcar_versao()
