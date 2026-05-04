import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-fallback",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif-fallback",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wall Art Studio | Convierte tus espacios en una galería",
  description: "Creamos piezas visuales que transforman paredes, espacios y recuerdos en arte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Header />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
