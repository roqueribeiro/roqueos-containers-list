# Arte do banner (padrão RoqueOS)

O banner do README é **arte + overlay de texto**, o mesmo processo do `roqueos-shield` e do
`aidlc-harness`. O overlay (eyebrow, wordmark, lema, descritor, chips) é desenhado por
`gen.py`; a arte da direita é a única parte que pode vir de fora.

Hoje `gen.py` desenha a arte em SVG: uma pirâmide de contêineres de vidro, com o do topo
aceso, um visto e o pulso de boot, e o feixe de dados chegando nele. Para trocar por uma
arte fotoreal:

1. Gere a arte no ChatGPT com o prompt abaixo (proporção 3:2, ~1536×1024).
2. Salve como `docs/assets/marca/arte.jpg`.
3. Regere os banners com a arte por baixo e o mesmo texto por cima:

   ```bash
   python docs/assets/marca/gen.py --art docs/assets/marca/arte.jpg --out docs/assets/marca
   ```

## Prompt do ChatGPT (imagem)

> A 3:2 cinematic 3D render for a software catalog banner, on a near-black deep-navy
> background (#07090f to #0b1018), lit from the right. Center-right: a small isometric
> pyramid of translucent frosted dark-blue glass cubes (shipping containers abstracted as
> cubes), each with a thin glowing azure rim (#2f8bff), standing on a dark reflective floor
> with a soft blue reflection. The single cube on top glows brighter, with a subtle check
> mark of light on its front face and two faint concentric rings pulsing around it. A thin
> horizontal beam of azure light made of small glowing data particles enters from the left
> and reaches the top cube. Minimal, premium, lots of negative space on the left half (text
> goes there, keep it empty and dark). No text, no logos, no words anywhere in the image.
> Subtle depth of field, clean studio lighting, high detail. Palette: black, deep navy, and
> a single azure blue accent only.

Regras: sem texto na imagem (o texto é overlay), metade esquerda vazia e escura, só o azul
`#2f8bff` como cor de destaque, para casar com as outras marcas da família.
