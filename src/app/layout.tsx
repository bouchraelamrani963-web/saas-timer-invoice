import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalarisRadar.nl — Weet wat je waard bent",
  description:
    "Vergelijk jouw salaris anoniem met duizenden Nederlandse professionals. Gratis salarisradar, onderhandelcoach en transparantie voor iedereen.",
  keywords: "salaris, salarisradar, salaris vergelijken, Nederland, loon, brutosalaris",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full">
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
