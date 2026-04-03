import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoOffer — Professionele offertes in 10 seconden",
  description:
    "AI-gestuurde offerte generator voor aannemers, schilders, loodgieters en andere vakmensen. Maak in 10 seconden een professionele offerte.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full">
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
