import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { NavBar } from "@/components/nav/NavBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pokédex Explorer",
  description: "Explora Pokémon, tipos, hábitats, objetos, movimientos y ubicaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-page text-text-primary">
        <NavBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
