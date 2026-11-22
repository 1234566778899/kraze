import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Oswald, Space_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ShippingToast } from "@/components/shipping-toast";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID } from "@/lib/analytics";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import { site } from "@/lib/site";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const spaceMono = Space_Mono({ variable: "--font-spacemono", weight: ["400", "700"], subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KRAZE® — Polos boxy fit en Pucallpa y todo el Perú",
    template: "%s · KRAZE®",
  },
  description: site.description,
  applicationName: "KRAZE",
  keywords: [
    "polos boxy fit",
    "polo boxy fit Perú",
    "polos oversize",
    "streetwear Perú",
    "ropa urbana Pucallpa",
    "polos Pucallpa",
    "KRAZE",
    "kraze peru",
  ],
  authors: [{ name: "KRAZE", url: site.url }],
  creator: "KRAZE",
  publisher: "KRAZE",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "KRAZE",
    title: "KRAZE® — Polos boxy fit en Perú",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "KRAZE® — Polos boxy fit en Perú",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: algunas extensiones del navegador agregan atributos a html y body
    <html lang="es-PE" className={`${archivo.variable} ${spaceMono.variable} ${oswald.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <ShippingToast />
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </body>
      {/* Google Analytics 4 solo en producción, para no mezclar visitas de desarrollo. */}
      {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
