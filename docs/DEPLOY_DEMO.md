# 🚀 Deploy Demo a Vercel

## Variables de Entorno en Vercel

En el dashboard de Vercel → Settings → Environment Variables, configura:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `NEXT_PUBLIC_DEMO_MODE` | `true` | Production (Demo) |

> Si quieres subir la versión COMPLETA con IA real, cambia el valor a `false` y agrega `OPENAI_API_KEY=sk-...`

## Pasos para Deploy

```bash
# 1. Desde la carpeta del proyecto:
cd wall-art-studio

# 2. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 3. Login
vercel login

# 4. Deploy
vercel --prod
```

## Checklist antes del deploy

- [ ] `NEXT_PUBLIC_DEMO_MODE=true` está en Vercel env vars
- [ ] `OPENAI_API_KEY` NO está configurada (demo mode)
- [ ] Los assets `/public/assets/fondo-generico.png`, `fondo_2.png`, `fondo_3.png`, `fondo_4.png` están en el repo
- [ ] Las imágenes del catálogo están en `/public/assets/`

## Diferencia Demo vs Producción

| Feature | Demo | Producción |
|---------|------|------------|
| IA generación de arte | Mock (imágenes del catálogo) | DALL-E 3 real |
| Catálogo | ✅ Completo | ✅ Completo |
| Lightbox + Slicing | ✅ Completo | ✅ Completo |
| Cambio de fondos | ✅ Completo | ✅ Completo |
| Modo Claro/Oscuro | ✅ Completo | ✅ Completo |
| Header nav | ✅ Completo | ✅ Completo |
