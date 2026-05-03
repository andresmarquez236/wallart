# Stack tecnológico recomendado

**Stack ganador:** Next.js + TypeScript + Tailwind CSS + GSAP ScrollTrigger + Lenis + Headless CMS + Headless Commerce + Cloudinary/Sanity/Strapi + Vercel.

**¿Por qué Next.js?** Control total sobre experiencia visual, performance, SEO técnico. Optimización de imágenes nativa (vital en e-commerce de arte).

**Stack visual:**
- **GSAP ScrollTrigger:** Animaciones avanzadas, scroll narrativo, pinning, transiciones tipo Apple.
- **Lenis:** Smooth scrolling premium.
- **Framer Motion / Motion:** Microinteracciones en React.
- **Three.js (opcional):** Solo si se usan modelos 3D a futuro.
- **Lottie/Rive:** Animaciones ligeras de marca.

**Stack de contenido:**
- **Sanity / Strapi:** Administrar colecciones, productos, blogs.
- **Cloudinary:** Transformar y servir imágenes optimizadas.
- Herramientas de tracking: Merchant Center, Search Console, GA4, GTM, Meta Pixel, Hotjar/Clarity.

**Stack e-commerce (A definir detalle, inicialmente Next.js Frontend + Shopify):**
1. Shopify Headless (Recomendado)
2. WooCommerce Headless
3. Commerce custom (solo si es estrictamente necesario)

# Performance: no sacrificar velocidad por efectos
- Reglas obligatorias (Core Web Vitals: LCP, CLS, INP):
  - Imágenes en WebP/AVIF.
  - Lazy loading.
  - Videos comprimidos.
  - Hero optimizado.
  - No 3D pesado en mobile.
  - Cargar animaciones por sección.
  - Skeletons / placeholders.
  - Mobile first (Lighthouse > 85 en mobile).

# Accesibilidad y Confianza (WCAG 2.2)
- Botones grandes, buen contraste.
- `prefers-reduced-motion` para animaciones.
- `alt` text en imágenes.
- Navegación clara, checkout claro, WhatsApp visible pero no invasivo.
