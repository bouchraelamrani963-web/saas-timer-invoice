import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/login", "/registreer"],
    },
    sitemap: "https://www.salarisradar.nl/sitemap.xml",
  };
}
