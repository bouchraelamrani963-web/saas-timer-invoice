import { MetadataRoute } from "next";

const BASE_URL = "https://www.salarisradar.nl";

const blogSlugs = [
  "wat-verdient-een-software-developer-2025",
  "gemiddeld-salaris-nederland-2025",
  "salaris-onderhandelen-7-tips",
  "wat-verdient-een-verpleegkundige-2025",
  "salaris-vergelijken-hoe-weet-je-of-je-genoeg-verdient",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/checken`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/invullen`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/onderhandelen`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/prijzen`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/voor-recruiters`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/vergelijking`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: new Date("2025-01-01"),
  }));

  return [...staticPages, ...blogPages];
}
