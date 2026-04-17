import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Budgetplanner — SalarisRadar.nl",
    short_name: "Budgetplanner",
    description: "Verdeel jouw netto maandloon over uitgavencategorieën",
    start_url: "/dashboard/budgetteren",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#4f46e5",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  };
}
