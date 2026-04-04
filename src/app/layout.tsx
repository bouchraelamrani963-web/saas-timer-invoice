import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://www.salarisradar.nl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SalarisRadar.nl — Weet wat je waard bent",
    template: "%s | SalarisRadar.nl",
  },
  description:
    "Vergelijk jouw salaris anoniem met duizenden Nederlandse professionals. Gratis salarischeck, AI onderhandelcoach en salaristransparantie voor iedereen.",
  keywords: [
    "salaris vergelijken",
    "salarisradar",
    "gemiddeld salaris nederland",
    "salaris check",
    "loon vergelijken",
    "salaris onderhandelen",
    "brutosalaris",
    "marktconform salaris",
    "salaris per sector",
  ],
  authors: [{ name: "SalarisRadar.nl" }],
  creator: "SalarisRadar.nl",
  publisher: "SalarisRadar.nl",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: BASE_URL,
    siteName: "SalarisRadar.nl",
    title: "SalarisRadar.nl — Weet wat je waard bent",
    description:
      "Vergelijk jouw salaris anoniem met duizenden Nederlandse professionals. Volledig gratis en GDPR-compliant.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SalarisRadar.nl" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SalarisRadar.nl — Weet wat je waard bent",
    description: "Vergelijk jouw salaris anoniem met duizenden Nederlandse professionals.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SalarisRadar.nl",
  url: BASE_URL,
  description:
    "Vergelijk jouw salaris anoniem met duizenden Nederlandse professionals.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/checken?functie={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SalarisRadar.nl",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: ["https://www.linkedin.com/company/salarisradar"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "Dutch",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
      </head>
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
