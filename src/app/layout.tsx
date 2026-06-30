import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/hooks/useCart";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// ─── Metadata ─────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Doce Arte | Confeitaria Artesanal",
  description:
    "Bolos de pote na pronta entrega e encomendas de bolos confeitados e papelaria de festa. Feito com amor no seu condomínio.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Doce Arte",
  },
  openGraph: {
    title: "Doce Arte | Confeitaria Artesanal",
    description: "Bolos de pote e encomendas com entrega no condomínio.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#C4826A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ─── Layout ───────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FFF8F3] font-body antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
