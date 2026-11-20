import type { Metadata } from "next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const spaceMono = Space_Mono({ variable: "--font-spacemono", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KRAZE® — Polos boxy fit · Ediciones limitadas",
    template: "%s · KRAZE®",
  },
  description:
    "Polos boxy fit en ediciones limitadas. Hecho en Perú. Delivery en Pucallpa y Huánuco, envíos a todo el Perú.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${anton.variable} ${grotesk.variable} ${spaceMono.variable}`}>
      {/* suppressHydrationWarning: algunas extensiones del navegador agregan atributos al body */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <AnnouncementBar />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
