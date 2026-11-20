import type { Metadata } from "next";
import { Archivo, Inter, Oswald, Space_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ShippingToast } from "@/components/shipping-toast";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const spaceMono = Space_Mono({ variable: "--font-spacemono", weight: ["400", "700"], subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KRAZE® — Streetwear boxy fit en Perú",
    template: "%s · KRAZE®",
  },
  description:
    "Polos boxy fit en ediciones limitadas. Hecho en Perú. Delivery en Pucallpa y Huánuco, envíos a todo el Perú.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: algunas extensiones del navegador agregan atributos a html y body
    <html lang="es-PE" className={`${archivo.variable} ${spaceMono.variable} ${oswald.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <ShippingToast />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
