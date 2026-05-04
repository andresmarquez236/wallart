import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Demo mode: skip real API calls, return a mock image
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

// Catalog images to cycle through in demo mode
const DEMO_IMAGES = [
  "/assets/galery_1.png",
  "/assets/galery_2.png",
  "/assets/galery_3.png",
  "/assets/galery_4.png",
];
let demoIdx = 0;

const openai = DEMO_MODE ? null : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // ── Demo Mode ────────────────────────────────────────────────────────────
  if (DEMO_MODE) {
    await new Promise(r => setTimeout(r, 1800)); // Simulate generation delay
    const mockUrl = DEMO_IMAGES[demoIdx % DEMO_IMAGES.length];
    demoIdx++;
    // Return an absolute URL the client can use as img src
    const baseUrl = req.nextUrl.origin;
    return NextResponse.json({ url: `${baseUrl}${mockUrl}`, demo: true });
  }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
    }

    // Enrich the prompt with our brand aesthetic
    const enrichedPrompt = `
      Fine art print for premium acrylic wall panel, museum quality.
      Subject: ${prompt}.
      Style: dark editorial, high contrast, ultra minimal, gallery-grade composition.
      No text, no watermarks, no borders. Landscape crop.
      16:9 aspect ratio, ultra detailed, cinematic lighting.
    `.trim();

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enrichedPrompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      style: "vivid",
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      return NextResponse.json({ error: "No se pudo generar la imagen" }, { status: 500 });
    }

    // Proxy the image: fetch from OpenAI and return as base64 data URL
    // This prevents expiry issues and bypasses Next.js image domain restrictions
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      return NextResponse.json({ error: "No se pudo descargar la imagen generada" }, { status: 500 });
    }
    const arrayBuffer = await imageRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ url: dataUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    console.error("[DALL-E API Error]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
