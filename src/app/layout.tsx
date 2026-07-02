import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollProgress from "@/components/motion/ScrollProgress";
import BackToTop from "@/components/motion/BackToTop";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name}: construtora e incorporadora de alto padrão em ${site.city} e litoral de Santa Catarina. Arquitetura autoral, obra própria e acabamento de exceção.`,
  keywords: [
    "construtora Navegantes",
    "incorporadora alto padrão",
    site.city,
    "empreendimentos de luxo",
    "residências de alto padrão",
    "arquitetura autoral",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-cream text-ink">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
      </body>
    </html>
  );
}
