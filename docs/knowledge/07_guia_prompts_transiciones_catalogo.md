# Guía de Prompts: Transiciones del Catálogo de Formatos (Fase 3)

Esta guía contiene los prompts para generar la experiencia del catálogo estructurada por **Formato del Cuadro**. 
A diferencia de los estilos de "museo brutalista", estos espacios están diseñados para ser **altamente realistas, cotidianos (lived-in), acogedores y con un toque ecléctico/pop**. Son paredes de color neutro cálido, diseñadas para que CUALQUIER estilo de arte (desde pop-art hasta clásico) vibre y se vea espectacular.

## Arquitectura de Formatos

1. **Sala 1 Pieza:** Una sala de estar de apartamento real, acogedora, con luz de ventana.
2. *Transición 1: Pasillo luminoso de casa hacia un comedor.*
3. **Sala Trípticos:** Un comedor / área de credenza moderno, con objetos cotidianos.
4. *Transición 2: Movimiento hacia una habitación principal.*
5. **Sala 5 Piezas:** Una habitación principal amplia, cama con sábanas de lino, espacio gigante en la pared.

---

## 1. Sala "1 Pieza" (Inicio - Sala de Estar)
**Prompt de Imagen (Midjourney):**
> `/imagine prompt: A realistic, cozy, and highly aesthetic modern apartment living room in a dark editorial style. A completely empty, clean, deep charcoal-grey painted wall in the exact center of the frame. Below the wall is a comfortable dark graphite linen sofa with a few messy throw pillows, a dark vintage rug on a dark walnut wooden floor, and a potted Monstera plant. Moody, cinematic golden hour sunlight filtering through window blinds, casting soft striped shadows on the dark floor. Lived-in, eclectic, everyday lifestyle photography, shot on 35mm film, highly realistic, perfect symmetry, flat orthographic wall view --ar 16:9 --style raw --stylize 100 --v 6.0`

## 2. Transición a "Trípticos"
**Prompt de Movimiento (Luma / Runway Gen-3):**
*(Usar la imagen de Sala 1 Pieza como Start Frame, y Sala Trípticos como End Frame)*
> `Smooth continuous cinematic camera movement. The camera pushes forward through the cozy dark apartment living room, entering a moody hallway. As the camera travels, the environment seamlessly morphs from the living room into a stylish, lived-in dark dining area. The camera settles perfectly centered on the wide obsidian wall above the credenza.`

## 3. Sala "Trípticos" (Comedor / Credenza)
**Prompt de Imagen (Midjourney):**
> `/imagine prompt: A highly realistic, stylish everyday dining area in a modern moody home. A completely empty, wide, matte obsidian-black wall in the exact center of the frame. Below the wall is a mid-century dark walnut credenza and a dining table with a bowl of fresh fruit and scattered lifestyle magazines. Soft, warm, dramatic diffused daylight from off-camera. A vibrant, lived-in eclectic interior design but strictly dark and moody. Welcoming, relatable lifestyle photography, shot on 35mm film, perfect symmetry, flat orthographic wall view --ar 16:9 --style raw --stylize 120 --v 6.0`

## 4. Transición a "5 Piezas"
**Prompt de Movimiento (Luma / Runway Gen-3):**
*(Usar la imagen de Sala Trípticos como Start Frame, y Sala 5 Piezas como End Frame)*
> `Smooth continuous cinematic camera movement. The camera pushes through the dark dining room, sliding smoothly past a dark wooden door into a spacious, moody master bedroom. The lighting shifts softly to a calm cinematic evening light. The camera settles perfectly centered on the massive dark concrete wall above the bed.`

## 5. Sala "5 Piezas" (Habitación Principal)
**Prompt de Imagen (Midjourney):**
> `/imagine prompt: A spacious, realistic, cozy master bedroom in a contemporary dark home. A completely empty, massive, soft warm dark-grey textured concrete wall in the exact center of the frame. Below the wall is a comfortable king-size bed with slightly messy deep grey linen sheets and a dark wooden headboard. A warm bedside lamp casting a cinematic moody glow. Highly realistic, everyday lived-in aesthetic, cozy but dark editorial interior design. Perfect backdrop for large multi-panel art, lifestyle photography, shot on 35mm film, perfect symmetry, flat orthographic wall view --ar 16:9 --style raw --stylize 100 --v 6.0`
