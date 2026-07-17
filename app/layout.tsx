import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CustomCursor } from "@/components/cursor";
import { NoiseOverlay } from "@/components/noise-overlay";
import { SiteFooter } from "@/components/site-footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinit Marbles | Masterpieces in Stone & Granite",
  description:
    "Vinit Marbles - premium Indian and imported marble, Black Galaxy granite, and bespoke natural stone for architects, builders, and homeowners across Delhi NCR.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Vinit Marbles | Masterpieces in Stone & Granite",
    description:
      "Premium Indian and imported marble, Black Galaxy granite, and bespoke natural stone in Delhi NCR.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-obsidian text-white antialiased selection:bg-gold/30 selection:text-white">
        <NoiseOverlay />
        <CustomCursor />
        <LenisProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
