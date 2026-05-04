# Manual de Generación de Assets por IA (Nivel PhD MIT)

Este documento es una guía técnica de *Prompt Engineering* avanzado para generar los assets visuales de la Home Page utilizando IA (Midjourney v6, Luma, Runway Gen-3).

> **Aclaración Estratégica Fundamental:**
> El producto **NO es lienzo tradicional (canvas) ni pintura con textura**. Son cuadros de **impresión digital de alta definición sobre madera o plástico especial**, con bordes limpios (sin marco o *frameless*), a menudo presentados en formatos de paneles múltiples (trípticos o 5 piezas). La IA debe reflejar esta materialidad lisa, rígida, moderna y de colores vibrantes.

## 1. Dirección de Arte Global y Colorometría

Para que los assets se integren con nuestro diseño web (Dark Editorial):
- **Paleta de Colores (Generación):**
  - Predominancia de **negros profundos** (`#0a0a0a`) y sombras absolutas.
  - Tonos medios: **Grises grafito** (`#1a1a1a`) y **Beiges ceniza**.
  - Luces: **Blanco galería** suave (`#e6e6e6`).
- **Iluminación:** "Chiaroscuro contemporáneo", luz volumétrica direccional dramática.
- **Materialidad a destacar:** Superficies lisas, rígidas, bordes perfectos, colores de impresión vibrantes (HD print), acabados mate sedoso o acrílico brillante.
- **Mood:** Sofisticado, inmersivo, lujo moderno.

---

## 2. Acto 1: The Canvas (Video Hero)

Dado que el producto es impresión HD sobre panel rígido, el video del Hero debe enfocarse en revelar esa perfección moderna. La idea es que la luz barra suavemente a través de un panel múltiple (ej. 3 piezas), revelando la nitidez de la impresión desde la oscuridad.

### Paso 2.1: El Concepto de la Animación (Start Frame y End Frame)

**Imagen Inicial (Start Frame) - Generar en Midjourney:**
> `/imagine prompt: A hyper-realistic macro shot of a sleek, borderless, rigid 3-panel wall art piece (triptych) hanging on a dark concrete wall. The art itself is a highly detailed, vibrant abstract design printed on smooth, flat wood or acrylic. Deep, cinematic shadows. A single, sharp beam of warm volumetric sunlight cuts across the surface from the FAR LEFT, revealing the flawless HD print quality and the clean edges of the panels. Color palette: strictly deep obsidian black (#0a0a0a) and vivid accent colors in the art. Shot on ARRI Alexa 65, 100mm macro lens, chiaroscuro lighting, architectural digest aesthetic, 8k --ar 16:9 --style raw --stylize 250 --v 6.0`

**Imagen Final (End Frame) - Generar en Midjourney:**
> `/imagine prompt: A hyper-realistic macro shot of a sleek, borderless, rigid 3-panel wall art piece (triptych) hanging on a dark concrete wall. The art itself is a highly detailed, vibrant abstract design printed on smooth, flat wood or acrylic. Deep, cinematic shadows. A single, sharp beam of warm volumetric sunlight cuts across the surface from the FAR RIGHT, revealing the flawless HD print quality and the clean edges of the panels. Color palette: strictly deep obsidian black (#0a0a0a) and vivid accent colors in the art. Shot on ARRI Alexa 65, 100mm macro lens, chiaroscuro lighting, architectural digest aesthetic, 8k --ar 16:9 --style raw --stylize 250 --v 6.0`

### Paso 2.2: Generación del Video
Sube ambas imágenes (Start y End) a tu generador de video de IA (Luma/Kling).

**Prompt de Movimiento (Motion Prompt):**
> `Slow motion, highly cinematic. The beam of light slowly glides across the smooth, rigid surface of the multi-panel art from the left side to the right side. The vibrant colors of the HD print reveal themselves as the light passes. The camera pushes in extremely slowly. No sudden movements, perfectly smooth, hypnotic transition.`

---

## 3. Acto 3: La Transformación (Pared Vacía ⟷ Pared con Arte)

### Pieza 1: La Pared Vacía (Midjourney v6)
> `/imagine prompt: A high-end modern living room with a completely empty, large, dark grey concrete wall in the exact center of the frame. The room is dimly lit, feeling somewhat cold and incomplete. Subtle, dull natural light coming from out of frame. A low-profile luxury sofa sits at the bottom, mostly in shadow. Architectural photography, extreme symmetry, perfectly flat wall perspective (orthographic feel), shot on Hasselblad X1D II --ar 16:9 --style raw --stylize 150 --v 6.0`

### Pieza 2: El Arte en Múltiples Paneles (Midjourney v6)
> `/imagine prompt: A stunning, vibrant piece of modern wall art printed on 5 sleek, rigid, frameless panels (5-piece split art). The design features a highly detailed, hyper-realistic roaring lion fading into dark shadows. Flat, edge-to-edge printing with no borders. Isolated perfectly straight against a pure solid white background. Studio lighting, high contrast, crisp edges, 8k --ar 3:4 --v 6.0`
*(Recorta el fondo blanco para obtener los 5 paneles con transparencia en formato PNG).*

---

## 4. El Gallery Walk (Acto 4)

Dado que implementamos el **Motor de Corte CSS** y queremos arte en su estado puro, los prompts para la galería deben generar imágenes planas sin pared, ni marcos, ni bordes. La IA debe enfocarse 100% en la textura y el diseño. 

Aquí tienes un prompt maestro para cada categoría del Acto 4:

### 1. Abstracto (Ethereal Neon Smoke)
> `/imagine prompt: A hyper-detailed abstract fluid art painting, macro photography style. Ethereal neon crimson and deep cyan blending into obsidian black smoke, rich textures, extreme high contrast, luminescent metallic veins glowing, premium gallery art, 8k resolution, flat composition, edge-to-edge, pure abstract texture, no borders, no frames, no background --ar 16:9 --style raw --stylize 300 --v 6.0`

### 2. Minimalista (Japandi Wabi-Sabi)
> `/imagine prompt: A striking minimalist modern art piece. Japandi aesthetic, wabi-sabi style. A single sweeping, highly textured charcoal brush stroke forming a perfect enso circle on a raw, warm beige linen textured background. Extreme negative space, elegant, sophisticated, high-end gallery art, flat composition, edge-to-edge, no borders, no frames --ar 16:9 --style raw --stylize 100 --v 6.0`

### 3. Fotografía (Monochrome Brutalism)
> `/imagine prompt: A breathtaking, dramatic architectural photograph. A stark, brutalist geometric dark concrete structure emerging from dense, moody fog. Cinematic monochrome, deep blacks, striking chiaroscuro lighting cutting through the mist, contemporary Ansel Adams style, 8k resolution, flat composition, edge-to-edge, no borders, no frames --ar 16:9 --style raw --stylize 250 --v 6.0`

### 4. Clásico (Contemporary Baroque)
> `/imagine prompt: A contemporary reimagining of a Baroque classic painting. A lush, dramatic arrangement of dark crimson and wilted black roses in the style of Caravaggio. Intense chiaroscuro lighting, deep shadows fading to pure black, rich oil paint textures visible but highly detailed, modern gothic aesthetic, 8k resolution, flat composition, edge-to-edge, no borders, no frames --ar 16:9 --style raw --stylize 200 --v 6.0`
