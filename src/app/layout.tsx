import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalarisRadar.nl — Weet wat je waard bent",
  description:
    "Vergelijk jouw salaris anoniem met duizenden Nederlandse professionals. Gratis salarisradar, onderhandelcoach en transparantie voor iedereen.",
  keywords: "salaris, salarisradar, salaris vergelijken, Nederland, loon, brutosalaris",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Budgetplanner",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
